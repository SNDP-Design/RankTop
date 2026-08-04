/**
 * Client-Side Google Search Console Integration Service
 * Uses Google Identity Services (GIS) OAuth JS SDK for instant 0-second popup authorization.
 * Eliminates backend servers & Render loading delays.
 */

const CLIENT_ID = '355281164290-vip37fermqsme5uipq8ou6bunebhd8oh.apps.googleusercontent.com';
const GSC_SCOPE = 'https://www.googleapis.com/auth/webmasters.readonly';
const LS_TOKEN_KEY = 'ranktop_gsc_token';
const LS_TOKEN_EXPIRY = 'ranktop_gsc_token_expiry';

class GscClientService {
  constructor() {
    this.tokenClient = null;
    this.gisLoaded = false;
  }

  /**
   * Dynamically loads Google Identity Services script if not already in document
   */
  async loadGisScript() {
    if (window.google?.accounts?.oauth2) {
      this.gisLoaded = true;
      return true;
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        this.gisLoaded = true;
        resolve(true);
      };
      script.onerror = () => reject(new Error('Failed to load Google Identity script'));
      document.head.appendChild(script);
    });
  }

  /**
   * Promise wrapper for 1-click Google Sign-in Popup
   */
  connect() {
    return new Promise((resolve, reject) => {
      this.connectGsc(
        (token) => resolve(token),
        (err) => reject(new Error(typeof err === 'string' ? err : err?.message || 'Google login failed'))
      );
    });
  }

  /**
   * Initializes 1-click Google Sign-in Popup
   */
  async connectGsc(onSuccess, onError) {
    try {
      await this.loadGisScript();

      if (!window.google?.accounts?.oauth2) {
        throw new Error('Google Identity Services unavailable');
      }

      this.tokenClient = window.google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: GSC_SCOPE,
        callback: async (response) => {
          if (response.error) {
            console.error('[GIS Error]', response);
            if (onError) onError(response.error);
            return;
          }

          if (response.access_token) {
            const expiryTime = Date.now() + (response.expires_in || 3600) * 1000;
            localStorage.setItem(LS_TOKEN_KEY, response.access_token);
            localStorage.setItem(LS_TOKEN_EXPIRY, expiryTime.toString());

            if (onSuccess) onSuccess(response.access_token);
          }
        },
      });

      this.tokenClient.requestAccessToken({ prompt: 'consent' });
    } catch (err) {
      console.error('[GSC Connect]', err);
      if (onError) onError(err.message);
    }
  }

  /**
   * Returns saved access token if valid
   */
  getToken() {
    const token = localStorage.getItem(LS_TOKEN_KEY);
    const expiry = localStorage.getItem(LS_TOKEN_EXPIRY);
    if (!token || !expiry) return null;
    if (Date.now() > parseInt(expiry, 10)) {
      this.disconnectGsc();
      return null;
    }
    return token;
  }

  isConnected() {
    return Boolean(this.getToken());
  }

  disconnectGsc() {
    localStorage.removeItem(LS_TOKEN_KEY);
    localStorage.removeItem(LS_TOKEN_EXPIRY);
  }

  /**
   * Fetches list of all verified site properties in user's Google Search Console account
   */
  async getVerifiedSites() {
    const token = this.getToken();
    if (!token) return [];
    try {
      const res = await fetch('https://www.googleapis.com/webmasters/v3/sites', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) return [];
      const data = await res.json();
      return (data.siteEntry || []).map(s => s.siteUrl);
    } catch (err) {
      console.warn('[GSC Sites Fetch Error]', err);
      return [];
    }
  }

  /**
   * Queries Google Search Analytics API directly from browser using fetch
   */
  async fetchGscAnalytics(domain, days = 28) {
    const token = this.getToken();
    if (!token) throw new Error('Search Console not connected');

    const rawDomain = domain.replace(/^https?:\/\//, '').replace(/\/$/, '').toLowerCase();
    const coreDomain = rawDomain.replace(/^www\./, '');

    // 0. Auto-detect exact property format from user's verified sites list
    const verifiedSites = await this.getVerifiedSites();
    let siteUrl = null;

    if (verifiedSites.length > 0) {
      // Look for sc-domain:xgrowth.uno, https://www.xgrowth.uno/, https://xgrowth.uno/, etc.
      siteUrl = verifiedSites.find(s => {
        const lower = s.toLowerCase();
        return lower === `sc-domain:${coreDomain}` ||
               lower.includes(rawDomain) ||
               lower.includes(coreDomain);
      });
    }

    if (!siteUrl) {
      // Fallback format
      siteUrl = rawDomain.startsWith('http') ? rawDomain : `https://${rawDomain}/`;
    }

    const endDate = new Date().toISOString().slice(0, 10);
    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

    const apiUrl = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`;

    try {
      // 1. Fetch Overall Aggregated Metrics
      const overviewRes = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startDate,
          endDate,
          dimensions: [],
        }),
      });

      // 2. Fetch Top Query Keywords
      const queryRes = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startDate,
          endDate,
          dimensions: ['query'],
          rowLimit: 10,
        }),
      });

      // 3. Fetch Real Daily Performance Breakdown
      const dateRes = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startDate,
          endDate,
          dimensions: ['date'],
        }),
      });

      if (!overviewRes.ok) {
        const err = await overviewRes.json().catch(() => ({}));
        throw new Error(err.error?.message || `Search Console API error (${overviewRes.status})`);
      }

      const overviewData = await overviewRes.json();
      const queryData = await queryRes.json();
      const dateData = await dateRes.json().catch(() => ({}));

      const overall = overviewData.rows?.[0] || null;
      const queries = (queryData.rows || []).map((r) => ({
        query: r.keys[0],
        clicks: r.clicks,
        impressions: r.impressions,
        ctr: (r.ctr * 100).toFixed(1) + '%',
        position: r.position.toFixed(1),
      }));

      const dailyBreakdown = (dateData.rows || []).map((r) => ({
        date: r.keys[0],
        clicks: r.clicks,
        impressions: r.impressions,
        position: r.position ? r.position.toFixed(1) : '0',
      }));

      return {
        connected: true,
        domain: cleanDomain,
        startDate,
        endDate,
        overview: overall ? {
          clicks: overall.clicks,
          impressions: overall.impressions,
          ctr: (overall.ctr * 100).toFixed(2) + '%',
          avgPosition: overall.position.toFixed(1),
        } : { clicks: 0, impressions: 0, ctr: '0%', avgPosition: '0' },
        topQueries: queries,
        dailyBreakdown,
      };
    } catch (err) {
      console.error('[GSC Analytics Fetch]', err);
      throw err;
    }
  }
}

export const gscService = new GscClientService();
