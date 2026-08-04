import React, { useState, useEffect } from 'react';
import { LayoutDashboard, TrendingUp, Zap, Globe2, AlertCircle, CheckCircle2, Loader2, Sparkles, ExternalLink, ShieldCheck, Calendar, BarChart3, ArrowUpRight } from 'lucide-react';
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

function DailyGrowthChart({ domain, gscConnected, gscData, onConnectGsc, gscLoading, gscError }) {
  const [range, setRange] = useState('30d'); // 'today' | '7d' | '30d'
  const [hoverIndex, setHoverIndex] = useState(null);

  const daysCount = range === 'today' ? 1 : range === '7d' ? 7 : 30;

  // Build authentic dataset (from Search Console or real zeros if not connected)
  const chartData = React.useMemo(() => {
    if (gscData?.dailyBreakdown && gscData.dailyBreakdown.length > 0) {
      const slice = gscData.dailyBreakdown.slice(-daysCount);
      return slice.map((item) => ({
        date: new Date(item.date).toLocaleDateString([], { month: 'short', day: 'numeric' }),
        clicks: item.clicks ?? 0,
        impressions: item.impressions ?? 0,
        position: item.position ?? '0',
      }));
    }

    // Honest zero state array for the selected timeframe (No fake numbers)
    const list = [];
    const now = new Date();
    for (let i = daysCount - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(now.getDate() - i);
      list.push({
        date: d.toLocaleDateString([], { month: 'short', day: 'numeric' }),
        clicks: 0,
        impressions: 0,
        position: '—',
      });
    }
    return list;
  }, [gscData, daysCount]);

  const isConnected = gscConnected || Boolean(gscData?.connected);
  const maxClicks = Math.max(...chartData.map(d => d.clicks), 1);
  const totalClicks = chartData.reduce((acc, d) => acc + d.clicks, 0);
  const totalImpressions = chartData.reduce((acc, d) => acc + d.impressions, 0);
  const activeHover = hoverIndex !== null ? chartData[hoverIndex] : chartData[chartData.length - 1];

  return (
    <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '16px', padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BarChart3 size={18} color="#3ECF8E" />
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#fff', margin: 0 }}>Day-by-Day Organic Growth & Traffic Trend</h3>
          </div>
          <p style={{ fontSize: '13px', color: '#71717a', margin: '4px 0 0' }}>
            Live daily clicks, impression growth, and search position for <span style={{ color: '#3ECF8E', fontWeight: 600 }}>{domain}</span>
          </p>
          {gscError && (
            <p style={{ fontSize: '12px', color: '#f87171', margin: '4px 0 0', fontWeight: 600 }}>
              ⚠️ {gscError}
            </p>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          {isConnected ? (
            <span style={{
              padding: '6px 14px', background: 'rgba(62,207,142,0.1)', color: '#3ECF8E', border: '1px solid rgba(62,207,142,0.3)',
              borderRadius: '8px', fontSize: '12px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px'
            }}>
              <CheckCircle2 size={14} color="#3ECF8E" /> Search Console Connected
            </span>
          ) : (
            <button
              onClick={onConnectGsc}
              disabled={gscLoading}
              style={{
                padding: '6px 14px', background: '#4285F4', color: '#fff', border: 'none',
                borderRadius: '8px', fontSize: '12px', fontWeight: 700, cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: '6px'
              }}
            >
              {gscLoading ? <Loader2 size={13} className="animate-spin" /> : <Globe2 size={13} />}
              Connect Search Console (Instant Popup)
            </button>
          )}

          <div style={{ display: 'flex', background: '#121212', padding: '4px', borderRadius: '10px', border: '1px solid #262626' }}>
            {[
              { id: 'today', label: 'Today' },
              { id: '7d',    label: '7 Days' },
              { id: '30d',   label: '30 Days Growth' }
            ].map(t => (
              <button
                key={t.id}
                onClick={() => { setRange(t.id); setHoverIndex(null); }}
                style={{
                  padding: '6px 14px', borderRadius: '8px', border: 'none', fontSize: '12px', fontWeight: 700, cursor: 'pointer',
                  background: range === t.id ? '#3ECF8E' : 'transparent',
                  color: range === t.id ? '#000' : '#71717a', transition: 'all 0.15s'
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6" style={{ background: '#121212', padding: '16px', borderRadius: '12px', border: '1px solid #222' }}>
        <div>
          <div style={{ fontSize: '11px', color: '#71717a', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {range === '30d' ? '30-Day Clicks' : range === '7d' ? '7-Day Clicks' : 'Today Clicks'}
          </div>
          <div style={{ fontSize: '22px', fontWeight: 800, color: '#3ECF8E', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
            {totalClicks.toLocaleString()}
          </div>
        </div>
        <div>
          <div style={{ fontSize: '11px', color: '#71717a', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Impressions</div>
          <div style={{ fontSize: '22px', fontWeight: 800, color: '#60a5fa', marginTop: '2px' }}>
            {totalImpressions.toLocaleString()}
          </div>
        </div>
        <div>
          <div style={{ fontSize: '11px', color: '#71717a', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Selected Date</div>
          <div style={{ fontSize: '15px', fontWeight: 700, color: '#fff', marginTop: '4px' }}>
            {activeHover?.date || '—'}
          </div>
        </div>
        <div>
          <div style={{ fontSize: '11px', color: '#71717a', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Selected Clicks & Pos</div>
          <div style={{ fontSize: '15px', fontWeight: 700, color: '#3ECF8E', marginTop: '4px' }}>
            {activeHover?.clicks ?? 0} clicks <span style={{ color: '#a78bfa', fontWeight: 600 }}>({activeHover?.position !== '—' ? `#${activeHover?.position}` : '—'})</span>
          </div>
        </div>
      </div>

      <div style={{ position: 'relative', height: '180px', width: '100%', marginTop: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', height: '140px', gap: range === '30d' ? '4px' : '16px', paddingBottom: '8px', borderBottom: '1px solid #262626' }}>
          {chartData.map((d, idx) => {
            const heightPercent = totalClicks > 0 ? Math.max(8, (d.clicks / maxClicks) * 100) : 4;
            const isHovered = hoverIndex === idx || (hoverIndex === null && idx === chartData.length - 1);
            return (
              <div
                key={idx}
                onMouseEnter={() => setHoverIndex(idx)}
                style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end', cursor: 'pointer' }}
              >
                <div
                  style={{
                    width: '100%',
                    height: `${heightPercent}%`,
                    background: isHovered ? 'linear-gradient(180deg, #3ECF8E 0%, rgba(62,207,142,0.3) 100%)' : 'rgba(62,207,142,0.15)',
                    borderRadius: '4px 4px 0 0',
                    transition: 'all 0.15s ease',
                    boxShadow: isHovered && totalClicks > 0 ? '0 0 12px rgba(62,207,142,0.4)' : 'none'
                  }}
                />
              </div>
            );
          })}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '11px', color: '#71717a' }}>
          <span>{chartData[0]?.date}</span>
          {chartData.length > 10 && <span>{chartData[Math.floor(chartData.length / 2)]?.date}</span>}
          <span>{chartData[chartData.length - 1]?.date} (Today)</span>
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

  const handleConnectGsc = async () => {
    try {
      setGscLoading(true);
      setGscError(null);
      await gscService.connect();
      setGscConnected(true);
      if (domain && domain !== 'your website') {
        const res = await gscService.fetchGscAnalytics(domain);
        setGscData(res);
      }
    } catch (err) {
      console.error('[GSC Login Error]', err);
      setGscError(err.message || 'Google Search Console login failed.');
    } finally {
      setGscLoading(false);
    }
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

      {/* Day-by-Day Organic Growth & Traffic Trend Component */}
      <DailyGrowthChart
        domain={domain}
        gscConnected={gscConnected}
        gscData={gscData}
        onConnectGsc={handleConnectGsc}
        gscLoading={gscLoading}
        gscError={gscError}
      />

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

      {/* LLM Visibility Section (ChatGPT, Perplexity, Gemini AI Engines) */}
      <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '16px', padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#fff', margin: '0 0 4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={18} color="#a78bfa" /> LLM Visibility & AI Recommendation Scores
            </h3>
            <p style={{ fontSize: '13px', color: '#71717a', margin: 0 }}>
              Discoverability of {domain} across ChatGPT, Perplexity, and Google Gemini AI answer engines.
            </p>
          </div>
          <span style={{ fontSize: '12px', fontWeight: 700, padding: '4px 10px', borderRadius: '99px', background: 'rgba(167,139,250,0.1)', color: '#a78bfa', border: '1px solid rgba(167,139,250,0.2)' }}>
            GEO Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              name: 'ChatGPT (OpenAI)',
              score: agentResults.geo?.engines?.[0]?.score ?? 0,
              visibility: agentResults.geo?.engines?.[0]?.visibility ?? (agentResults.geo ? 'None' : 'Pending'),
              color: '#3ECF8E',
              queries: agentResults.geo?.engines?.[0]?.queriesFound ? `${agentResults.geo.engines[0].queriesFound} target queries` : 'Run Swarm to analyze'
            },
            {
              name: 'Perplexity AI',
              score: agentResults.geo?.engines?.[1]?.score ?? 0,
              visibility: agentResults.geo?.engines?.[1]?.visibility ?? (agentResults.geo ? 'None' : 'Pending'),
              color: '#60a5fa',
              queries: agentResults.geo?.engines?.[1]?.queriesFound ? `${agentResults.geo.engines[1].queriesFound} target queries` : 'Run Swarm to analyze'
            },
            {
              name: 'Google Gemini AI',
              score: agentResults.geo?.engines?.[2]?.score ?? 0,
              visibility: agentResults.geo?.engines?.[2]?.visibility ?? (agentResults.geo ? 'None' : 'Pending'),
              color: '#a78bfa',
              queries: agentResults.geo?.engines?.[2]?.queriesFound ? `${agentResults.geo.engines[2].queriesFound} target queries` : 'Run Swarm to analyze'
            },
          ].map((engine) => (
            <div key={engine.name} style={{ background: '#121212', borderRadius: '12px', border: '1px solid #1f1f1f', padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#fff' }}>{engine.name}</span>
                <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', background: `${engine.color}15`, color: engine.color, border: `1px solid ${engine.color}30` }}>
                  {engine.visibility}
                </span>
              </div>
              <div style={{ fontSize: '28px', fontWeight: 800, color: engine.color, marginBottom: '6px' }}>
                {engine.score}%
              </div>
              <div style={{ height: '4px', background: '#1f1f1f', borderRadius: '99px', overflow: 'hidden', marginBottom: '8px' }}>
                <div style={{ width: `${engine.score}%`, height: '100%', background: engine.color, borderRadius: '99px' }} />
              </div>
              <div style={{ fontSize: '12px', color: '#71717a' }}>{engine.queries}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
