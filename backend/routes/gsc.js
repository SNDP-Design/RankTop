const express = require('express');
const router = express.Router();
const { google } = require('googleapis');
const { saveGscTokens, getGscTokens } = require('../db');

function getOAuth2Client() {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    `${process.env.BACKEND_URL}/api/gsc/callback`
  );
}

// GET /api/gsc/auth?domain=example.com
// Redirects user to Google OAuth consent screen
router.get('/auth', (req, res) => {
  const { domain } = req.query;
  if (!domain) return res.status(400).json({ error: 'domain is required' });

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || clientId.includes('xxxx') || !clientSecret || clientSecret.includes('xxxx')) {
    return res.status(400).send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Google Search Console Setup — RankTop</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0f0f0f; color: #fff; padding: 40px 20px; }
          .card { max-width: 580px; margin: 0 auto; background: #171717; border: 1px solid #262626; border-radius: 16px; padding: 32px; box-shadow: 0 16px 40px rgba(0,0,0,0.5); }
          h2 { color: #f59e0b; margin-top: 0; font-size: 20px; }
          p { color: #a1a1aa; font-size: 14px; line-height: 1.6; }
          ol { color: #d4d4d8; font-size: 14px; line-height: 1.8; padding-left: 20px; }
          code { background: #222; color: #3ECF8E; padding: 2px 6px; border-radius: 4px; font-family: monospace; font-size: 13px; }
          .btn { display: inline-block; background: #3ECF8E; color: #000; font-weight: 700; padding: 10px 18px; border-radius: 10px; text-decoration: none; margin-top: 16px; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="card">
          <h2>⚠️ Google OAuth Client ID Required</h2>
          <p>The Google error <code>Missing required parameter: client_id</code> occurs because your <code>GOOGLE_CLIENT_ID</code> has not been added to <code>backend/.env</code> yet.</p>
          <p><strong>To connect live Google Search Console data:</strong></p>
          <ol>
            <li>Go to <a href="https://console.cloud.google.com/apis/credentials" target="_blank" style="color: #3ECF8E;">Google Cloud Console Credentials</a>.</li>
            <li>Create an <strong>OAuth 2.0 Client ID</strong> (Application type: <em>Web Application</em>).</li>
            <li>Set Authorized Redirect URI: <code>http://localhost:3001/api/gsc/callback</code></li>
            <li>Add your <code>GOOGLE_CLIENT_ID</code> and <code>GOOGLE_CLIENT_SECRET</code> to <code>backend/.env</code>.</li>
          </ol>
          <a href="http://localhost:5173" class="btn">← Back to RankTop Dashboard</a>
        </div>
      </body>
      </html>
    `);
  }

  const oauth2Client = getOAuth2Client();
  req.session.gscDomain = domain;

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/webmasters.readonly',
      'email',
      'profile',
    ],
  });

  res.redirect(authUrl);
});


// GET /api/gsc/callback — Google redirects here after user consents
router.get('/callback', async (req, res) => {
  const { code, error } = req.query;
  const domain = req.session.gscDomain;

  if (error) {
    return res.redirect(`${process.env.FRONTEND_URL}/#gsc-error=${encodeURIComponent(error)}`);
  }
  if (!code || !domain) {
    return res.status(400).json({ error: 'Missing OAuth code or domain session' });
  }

  try {
    const oauth2Client = getOAuth2Client();
    const { tokens } = await oauth2Client.getToken(code);
    saveGscTokens(domain, tokens);

    // Redirect back to the frontend with success signal
    res.redirect(`${process.env.FRONTEND_URL}/#gsc-connected=${encodeURIComponent(domain)}`);
  } catch (err) {
    console.error('[GSC OAuth Callback]', err.message);
    res.redirect(`${process.env.FRONTEND_URL}/#gsc-error=${encodeURIComponent(err.message)}`);
  }
});

// GET /api/gsc/data?domain=example.com&startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
// Returns real clicks, impressions, avg position, top queries from Search Console
router.get('/data', async (req, res) => {
  const { domain, startDate, endDate } = req.query;
  if (!domain) return res.status(400).json({ error: 'domain is required' });

  const savedTokens = getGscTokens(domain);
  if (!savedTokens) {
    return res.status(401).json({ error: 'GSC not connected for this domain. Visit /api/gsc/auth?domain=...' });
  }

  try {
    const oauth2Client = getOAuth2Client();
    oauth2Client.setCredentials({
      access_token: savedTokens.access_token,
      refresh_token: savedTokens.refresh_token,
      expiry_date: savedTokens.expiry_date,
    });

    // Auto-refresh token if expired
    oauth2Client.on('tokens', (tokens) => {
      saveGscTokens(domain, { ...savedTokens, ...tokens });
    });

    const searchConsole = google.searchconsole({ version: 'v1', auth: oauth2Client });

    const siteUrl = domain.startsWith('http') ? domain : `https://${domain}`;
    const end = endDate || new Date().toISOString().slice(0, 10);
    const start = startDate || new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

    // Fetch overall performance
    const [overallResp, queryResp] = await Promise.allSettled([
      searchConsole.searchanalytics.query({
        siteUrl,
        requestBody: {
          startDate: start, endDate: end,
          dimensions: [],
        },
      }),
      searchConsole.searchanalytics.query({
        siteUrl,
        requestBody: {
          startDate: start, endDate: end,
          dimensions: ['query'],
          rowLimit: 10,
        },
      }),
    ]);

    const overall = overallResp.status === 'fulfilled' ? overallResp.value.data?.rows?.[0] : null;
    const queries = queryResp.status === 'fulfilled'
      ? (queryResp.value.data?.rows || []).map(r => ({
          query: r.keys[0],
          clicks: r.clicks,
          impressions: r.impressions,
          ctr: (r.ctr * 100).toFixed(1) + '%',
          position: r.position.toFixed(1),
        }))
      : [];

    res.json({
      connected: true,
      domain,
      dateRange: { start, end },
      overview: overall ? {
        clicks: overall.clicks,
        impressions: overall.impressions,
        ctr: (overall.ctr * 100).toFixed(2) + '%',
        avgPosition: overall.position.toFixed(1),
      } : null,
      topQueries: queries,
    });
  } catch (err) {
    console.error('[GSC Data]', err.message);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/gsc/status?domain=example.com — Check if connected
router.get('/status', (req, res) => {
  const { domain } = req.query;
  if (!domain) return res.status(400).json({ error: 'domain is required' });
  const tokens = getGscTokens(domain);
  res.json({ connected: Boolean(tokens), domain });
});

module.exports = router;
