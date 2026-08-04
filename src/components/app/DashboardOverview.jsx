import React, { useState, useEffect } from 'react';
import { LayoutDashboard, TrendingUp, Zap, Globe2, AlertCircle, CheckCircle2, Loader2, Sparkles, ExternalLink } from 'lucide-react';
import { useAgents } from '../../context/AgentContext';
import { getBackendUrl } from '../../config';
import { gscService } from '../../services/gscService';

function ScoreRing({ score, color, label }) {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
      <svg width="72" height="72" viewBox="0 0 72 72">
        <circle cx="36" cy="36" r={r} fill="none" stroke="#1f1f1f" strokeWidth="6" />
        <circle
          cx="36" cy="36" r={r} fill="none"
          stroke={color} strokeWidth="6"
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%', transition: 'stroke-dashoffset 1s ease' }}
        />
        <text x="36" y="40" textAnchor="middle" fontSize="15" fontWeight="700" fill={color}>{score}</text>
      </svg>
      <span style={{ fontSize: '13px', fontWeight: 600, color: '#a1a1aa' }}>{label}</span>
    </div>
  );
}

function AgentEmptyState({ setActiveTab }) {
  const { setSettingsOpen, hasApiKey, isAnyRunning } = useAgents();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{
        background: '#171717', border: '1px solid #262626', borderRadius: '16px',
        padding: '36px 28px', textAlign: 'center',
      }}>
        <div style={{
          width: '56px', height: '56px', borderRadius: '16px',
          background: 'rgba(62,207,142,0.1)', border: '1px solid rgba(62,207,142,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px',
        }}>
          <LayoutDashboard size={24} color="#3ECF8E" />
        </div>
        <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#fff', margin: '0 0 8px' }}>
          Welcome to RankTop Autonomous AI Platform
        </h2>
        <p style={{ fontSize: '14px', color: '#a1a1aa', margin: '0 0 24px', maxWidth: '560px', marginInline: 'auto', lineHeight: 1.5 }}>
          {!hasApiKey()
            ? 'Add your free Gemini API key to activate your 9 autonomous AI agents. Simply type your website URL in the top bar to begin.'
            : isAnyRunning
            ? 'Your AI team is analyzing your website and generating recommendations. Results will populate automatically.'
            : 'Type your website URL in the top search bar above and press Enter to launch your 9 AI agents.'
          }
        </p>

        {/* Non-Technical Plain English Explainer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left max-w-3xl mx-auto mb-6">
          <div style={{ background: '#121212', border: '1px solid #242424', borderRadius: '12px', padding: '16px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#3ECF8E', margin: '0 0 6px' }}>📈 Google SEO</h4>
            <p style={{ fontSize: '13px', color: '#71717a', margin: 0, lineHeight: 1.4 }}>
              Helps your website rank on page 1 of Google search results for valuable keywords.
            </p>
          </div>
          <div style={{ background: '#121212', border: '1px solid #242424', borderRadius: '12px', padding: '16px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#60a5fa', margin: '0 0 6px' }}>🤖 ChatGPT & AI Answers (AEO)</h4>
            <p style={{ fontSize: '13px', color: '#71717a', margin: 0, lineHeight: 1.4 }}>
              Ensures ChatGPT, Perplexity, and Gemini recommend your website when users ask questions.
            </p>
          </div>
          <div style={{ background: '#121212', border: '1px solid #242424', borderRadius: '12px', padding: '16px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#f59e0b', margin: '0 0 6px' }}>🌟 Google AI Overviews (GEO)</h4>
            <p style={{ fontSize: '13px', color: '#71717a', margin: 0, lineHeight: 1.4 }}>
              Optimizes content so Google's AI Overview snapshot boxes highlight and link to your website.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {!hasApiKey() ? (
            <button
              onClick={() => setSettingsOpen(true)}
              style={{
                padding: '10px 22px', background: '#3ECF8E', color: '#000',
                borderRadius: '10px', border: 'none', cursor: 'pointer',
                fontSize: '14px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px',
              }}
            >
              <Sparkles size={15} /> Add API Key to Start
            </button>
          ) : (
            <button
              onClick={() => setActiveTab('swarm')}
              style={{
                padding: '10px 22px', background: '#3ECF8E', color: '#000',
                borderRadius: '10px', border: 'none', cursor: 'pointer',
                fontSize: '14px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px',
              }}
            >
              <Sparkles size={15} /> Open AI Swarm Team
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function DashboardOverview({ setActiveTab }) {
  const { agentResults, agentStatus, isAnyRunning, websiteUrl } = useAgents();
  const data = agentResults.dashboard;
  const status = agentStatus.dashboard;
  const domain = websiteUrl || 'your website';

  const [gscConnected, setGscConnected] = useState(gscService.isConnected());
  const [gscData, setGscData] = useState(null);
  const [gscLoading, setGscLoading] = useState(false);
  const [gscError, setGscError] = useState(null);

  useEffect(() => {
    if (gscConnected && domain && domain !== 'your website') {
      loadGscData();
    }
  }, [gscConnected, domain]);

  const loadGscData = async () => {
    try {
      setGscLoading(true);
      setGscError(null);
      const res = await gscService.fetchGscAnalytics(domain);
      setGscData(res);
    } catch (err) {
      console.warn('[GSC Load Warn]', err);
      setGscError(err.message);
    } finally {
      setGscLoading(false);
    }
  };

  const handleConnectGsc = () => {
    setGscLoading(true);
    gscService.connectGsc(
      (token) => {
        setGscConnected(true);
        setGscLoading(false);
        if (domain && domain !== 'your website') {
          loadGscData();
        }
      },
      (err) => {
        setGscLoading(false);
        setGscError(err);
      }
    );
  };

  if (status === 'idle' || (!data && status !== 'running')) {
    return (
      <div className="w-full space-y-6 font-sans">
        <AgentEmptyState setActiveTab={setActiveTab} />
      </div>
    );
  }

  if (status === 'running') {
    return (
      <div className="w-full space-y-6 font-sans">
        <div style={{
          background: '#171717', border: '1px solid #262626', borderRadius: '16px',
          padding: '48px 32px', textAlign: 'center',
        }}>
          <Loader2 size={36} color="#3ECF8E" style={{ margin: '0 auto 16px', animation: 'spin 1s linear infinite' }} />
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#fff', margin: '0 0 8px' }}>
            Analyzing {domain}…
          </h3>
          <p style={{ fontSize: '14px', color: '#71717a', margin: 0 }}>
            Gemini AI is auditing your SEO, AEO & GEO standing.
          </p>
        </div>
      </div>
    );
  }

  if (status === 'error' || !data) {
    return (
      <div className="w-full space-y-6 font-sans">
        <div style={{
          background: '#171717', border: '1px solid #3f1515', borderRadius: '16px',
          padding: '32px', textAlign: 'center',
        }}>
          <AlertCircle size={32} color="#ef4444" style={{ margin: '0 auto 12px' }} />
          <p style={{ fontSize: '14px', color: '#ef4444', margin: 0 }}>
            Analysis failed. Check your Gemini API key and try again.
          </p>
        </div>
      </div>
    );
  }

  const seoScore = data.seoScore ?? 0;
  const aeoScore = data.aeoScore ?? 0;
  const geoScore = data.geoScore ?? 0;

  return (
    <div className="w-full space-y-6 font-sans">

      <div style={{
        background: '#171717', border: '1px solid #262626', borderRadius: '16px',
        padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '4px 10px', borderRadius: '99px',
              background: 'rgba(62,207,142,0.1)', border: '1px solid rgba(62,207,142,0.2)',
              fontSize: '13px', fontWeight: 700, color: '#3ECF8E',
            }}>
              <Globe2 size={12} /> {domain}
            </span>
          </div>
          <p style={{ fontSize: '14px', color: '#71717a', margin: 0 }}>{data.summary}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {gscConnected ? (
            <span style={{
              padding: '6px 14px', background: 'rgba(62,207,142,0.1)', color: '#3ECF8E', border: '1px solid rgba(62,207,142,0.3)',
              borderRadius: '8px', fontSize: '13px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px',
            }}>
              <CheckCircle2 size={14} color="#3ECF8E" /> Search Console Connected
            </span>
          ) : (
            <button
              onClick={handleConnectGsc}
              disabled={gscLoading}
              style={{
                padding: '8px 16px', background: '#4285F4', color: '#fff', border: 'none',
                borderRadius: '8px', fontSize: '13px', fontWeight: 700, cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 12px rgba(66,133,244,0.3)',
              }}
            >
              {gscLoading ? <Loader2 size={14} className="animate-spin" /> : <Globe2 size={14} color="#fff" />}
              Connect Search Console (Instant Popup)
            </button>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3ECF8E', animation: 'pulse 2s infinite' }} />
            <span style={{ fontSize: '13px', color: '#3ECF8E', fontWeight: 600 }}>Analysis Complete</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div style={{
          background: '#171717', border: '1px solid #262626', borderRadius: '16px', padding: '24px',
        }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#fff', margin: '0 0 20px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Visibility Scores
          </h3>
          <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '16px' }}>
            <ScoreRing score={seoScore} color="#3ECF8E" label="SEO Score" />
            <ScoreRing score={aeoScore} color="#60a5fa" label="AEO Score" />
            <ScoreRing score={geoScore} color="#a78bfa" label="GEO Score" />
          </div>
        </div>

        {/* Quick Stats */}
        <div style={{
          background: '#171717', border: '1px solid #262626', borderRadius: '16px', padding: '24px',
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px',
        }}>
          {[
            {
              label: gscData ? 'Live Google Clicks' : 'Est. Monthly Clicks',
              value: gscData?.overview?.clicks ?? data.organicClicks ?? '—',
              icon: TrendingUp,
              color: '#3ECF8E'
            },
            {
              label: gscData ? 'Live Avg Position' : 'Avg. Position',
              value: gscData?.overview?.avgPosition ?? data.avgPosition ?? '—',
              icon: Zap,
              color: '#60a5fa'
            },
            {
              label: gscData ? 'Live Impressions' : 'Indexed Pages',
              value: gscData?.overview?.impressions ?? data.indexedPages ?? '—',
              icon: Globe2,
              color: '#a78bfa'
            },
            {
              label: 'AI Brand Mention',
              value: data.brandMentionedInAI ? 'Yes ✓' : 'Not Found',
              icon: Sparkles,
              color: data.brandMentionedInAI ? '#3ECF8E' : '#f59e0b'
            },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} style={{
              background: '#121212', borderRadius: '12px', border: '1px solid #1f1f1f',
              padding: '16px', display: 'flex', flexDirection: 'column', gap: '6px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Icon size={14} color={color} />
                <span style={{ fontSize: '12px', color: '#71717a', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</span>
              </div>
              <span style={{ fontSize: '22px', fontWeight: 800, color: '#fff' }}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Live Google Search Console Top Queries */}
      {gscData && gscData.topQueries && gscData.topQueries.length > 0 && (
        <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '16px', padding: '24px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Globe2 size={16} color="#4285F4" /> Live Google Search Console Ranking Queries ({gscData.domain})
          </h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #262626', color: '#71717a' }}>
                  <th style={{ padding: '8px 12px' }}>Search Query</th>
                  <th style={{ padding: '8px 12px' }}>Clicks</th>
                  <th style={{ padding: '8px 12px' }}>Impressions</th>
                  <th style={{ padding: '8px 12px' }}>CTR</th>
                  <th style={{ padding: '8px 12px' }}>Avg Position</th>
                </tr>
              </thead>
              <tbody>
                {gscData.topQueries.map((q, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #1a1a1a', color: '#e4e4e7' }}>
                    <td style={{ padding: '10px 12px', fontWeight: 600, color: '#3ECF8E' }}>{q.query}</td>
                    <td style={{ padding: '10px 12px' }}>{q.clicks}</td>
                    <td style={{ padding: '10px 12px' }}>{q.impressions}</td>
                    <td style={{ padding: '10px 12px' }}>{q.ctr}</td>
                    <td style={{ padding: '10px 12px', fontWeight: 700, color: '#60a5fa' }}>#{q.position}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}


      {/* Issues + Quick Wins */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '16px', padding: '24px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#ef4444', margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <AlertCircle size={14} /> Top Issues
          </h3>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {(data.topIssues ?? []).map((issue, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: '#d4d4d8' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ef4444', marginTop: '6px', flexShrink: 0 }} />
                {issue}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '16px', padding: '24px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#3ECF8E', margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CheckCircle2 size={14} /> Quick Wins
          </h3>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {(data.quickWins ?? []).map((win, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: '#d4d4d8' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#3ECF8E', marginTop: '6px', flexShrink: 0 }} />
                {win}
              </li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  );
}
