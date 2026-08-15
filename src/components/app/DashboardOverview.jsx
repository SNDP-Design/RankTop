import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Globe2, 
  Sparkles, 
  Bot, 
  Award, 
  Radio, 
  Target, 
  LayoutDashboard, 
  ArrowRight,
  ShieldCheck,
  Search,
  Globe,
  Loader2
} from 'lucide-react';
import { useAgents } from '../../context/AgentContext';
import { gscService } from '../../services/gscService';

export default function DashboardOverview({ setActiveTab }) {
  const { websiteUrl, agentResults, agentStatus, setSettingsOpen, hasApiKey, isAnyRunning, triggerAllAgents } = useAgents();
  const domain = websiteUrl ? websiteUrl.replace(/^https?:\/\//, '').replace(/\/$/, '') : '';

  const [gscConnected, setGscConnected] = useState(gscService.isConnected());
  const [gscLoading, setGscLoading] = useState(false);
  const [gscData, setGscData] = useState(null);
  const [gscError, setGscError] = useState(null);

  // Load real Google Search Console data if connected
  useEffect(() => {
    if (gscConnected && domain) {
      setGscLoading(true);
      gscService.fetchGscAnalytics(domain, 28)
        .then((res) => {
          setGscData(res);
          setGscError(null);
        })
        .catch((err) => {
          console.warn('[GSC Dashboard Error]', err);
          setGscError(err.message || 'Unable to fetch GSC data for this domain');
        })
        .finally(() => {
          setGscLoading(false);
        });
    }
  }, [gscConnected, domain]);

  const handleConnectGsc = () => {
    setGscLoading(true);
    gscService.connectGsc(
      () => {
        setGscConnected(true);
        setGscLoading(false);
      },
      (err) => {
        setGscLoading(false);
        setGscError(typeof err === 'string' ? err : err?.message || 'Google Search Console authorization failed');
      }
    );
  };

  const dashData = agentResults.dashboard || null;
  const kwData = Array.isArray(agentResults.keywords) ? agentResults.keywords : [];
  const compData = Array.isArray(agentResults.competitors) ? agentResults.competitors : [];
  const aeoData = Array.isArray(agentResults.aeo) ? agentResults.aeo : [];
  const geoData = agentResults.geo || null;
  const backlinkData = agentResults.backlinks || null;

  const hasAnyData = Boolean(dashData || kwData.length > 0 || compData.length > 0 || aeoData.length > 0 || geoData || gscData);

  const AGENTS_LIST = [
    { id: 'dashboard', name: 'Dashboard Synthesis Agent', avatar: '👑', category: 'Core Executive', tab: 'dashboard', resultCount: dashData ? 1 : 0 },
    { id: 'keywords', name: 'Keyword Strategy Agent', avatar: '🔍', category: 'Keyword Intelligence', tab: 'strategy', resultCount: kwData.length },
    { id: 'competitors', name: 'Competitor Intelligence Agent', avatar: '🕵️‍♂️', category: 'Competitive Intelligence', tab: 'competitors', resultCount: compData.length },
    { id: 'aeo', name: 'AI Overview Simulator Agent', avatar: '🤖', category: 'AEO / Citations', tab: 'aeo', resultCount: aeoData.length },
    { id: 'geo', name: 'LLM & GEO Visibility Agent', avatar: '📡', category: 'GEO Analytics', tab: 'geo', resultCount: geoData?.engines?.length || 0 },
    { id: 'backlinks', name: 'Backlink & Outreach Agent', avatar: '🧲', category: 'Off-Page SEO', tab: 'backlinks', resultCount: backlinkData?.prospects?.length || 0 },
    { id: 'studio', name: 'AI Blog & Content Studio', avatar: '✍️', category: 'Content Production', tab: 'studio', resultCount: 0 },
    { id: 'freetools', name: '26 Technical Micro-Tools', avatar: '🛠️', category: 'Technical SEO', tab: 'freetools', resultCount: 26 },
  ];

  return (
    <div className="w-full space-y-6 font-sans">

      {/* Header Banner */}
      <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '16px', padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: '99px', background: 'rgba(62,207,142,0.1)', border: '1px solid rgba(62,207,142,0.2)', fontSize: '14px', fontWeight: 700, color: '#3ECF8E', marginBottom: '8px' }}>
              <LayoutDashboard size={14} /> Executive SEO & GEO Dashboard
            </div>
            <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#fff', margin: '0 0 4px' }}>
              {domain ? `Live Telemetry for ${domain}` : 'Real-Time SEO & Generative Engine Workspace'}
            </h1>
            <p style={{ fontSize: '14px', color: '#71717a', margin: 0 }}>
              {domain 
                ? 'Displaying verified data from Gemini AI Agent audits and connected Google Search Console properties.'
                : 'Enter your website URL in the top bar to run real live audits with 16 autonomous AI agents.'}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {domain && (
              <button
                onClick={() => triggerAllAgents(domain)}
                disabled={isAnyRunning}
                style={{
                  padding: '10px 18px', background: '#3ECF8E', color: '#000',
                  borderRadius: '10px', border: 'none', cursor: 'pointer',
                  fontSize: '14px', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '6px',
                  opacity: isAnyRunning ? 0.6 : 1
                }}
              >
                {isAnyRunning ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                {isAnyRunning ? 'Running Live Analysis…' : 'Re-Run Live Analysis'}
              </button>
            )}

            {!hasApiKey() && (
              <button
                onClick={() => setSettingsOpen(true)}
                style={{
                  padding: '10px 16px', background: '#262626', color: '#3ECF8E',
                  borderRadius: '10px', border: '1px solid #333', cursor: 'pointer',
                  fontSize: '14px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px'
                }}
              >
                <Sparkles size={15} /> Add Gemini API Key
              </button>
            )}
          </div>
        </div>
      </div>

      {/* When no domain or analysis data is available */}
      {!hasAnyData && !isAnyRunning && (
        <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '16px', padding: '56px 28px', textAlign: 'center' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: 'rgba(62,207,142,0.1)', border: '1px solid rgba(62,207,142,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <Globe2 size={28} color="#3ECF8E" />
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#fff', margin: '0 0 8px' }}>
            No Analysis Data Yet
          </h2>
          <p style={{ fontSize: '14px', color: '#a1a1aa', margin: '0 0 24px', maxWidth: '520px', marginInline: 'auto', lineHeight: 1.5 }}>
            Enter your target domain in the top search bar (e.g., <code style={{ background: '#121212', padding: '2px 8px', borderRadius: '6px', color: '#3ECF8E' }}>xgrowth.uno</code>) to launch real AI analysis across Google Search, AEO, and LLM visibility.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={handleConnectGsc}
              disabled={gscLoading}
              style={{
                padding: '10px 20px', background: '#4285F4', color: '#fff',
                borderRadius: '10px', border: 'none', cursor: 'pointer',
                fontSize: '14px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '8px'
              }}
            >
              {gscLoading ? <Loader2 size={16} className="animate-spin" /> : <Globe size={16} />}
              Connect Google Search Console
            </button>
          </div>
        </div>
      )}

      {/* Loading state while agents are executing */}
      {isAnyRunning && !hasAnyData && (
        <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '16px', padding: '56px 28px', textAlign: 'center' }}>
          <Loader2 size={36} color="#3ECF8E" style={{ margin: '0 auto 16px', animation: 'spin 1s linear infinite' }} />
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#fff', margin: '0 0 8px' }}>
            Analyzing {domain} with AI Swarm…
          </h2>
          <p style={{ fontSize: '14px', color: '#71717a', margin: 0 }}>
            Collecting live search rankings, keyword opportunities, competitor gaps, and citation benchmarks.
          </p>
        </div>
      )}

      {/* Real Data Section */}
      {hasAnyData && (
        <>
          {/* Top Real KPI Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            
            {/* KPI 1: SEO Score */}
            <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '14px', padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#a1a1aa', fontSize: '14px', fontWeight: 600 }}>
                <span>SEO Score</span>
                <TrendingUp size={18} color="#60a5fa" />
              </div>
              <div style={{ fontSize: '32px', fontWeight: 900, color: '#fff', marginTop: '6px' }}>
                {dashData?.seoScore !== undefined ? `${dashData.seoScore}/100` : '—'}
              </div>
              <div style={{ fontSize: '14px', color: '#60a5fa', marginTop: '4px', fontWeight: 700 }}>
                {dashData ? 'Gemini Technical & On-Page Score' : 'Awaiting Analysis'}
              </div>
            </div>

            {/* KPI 2: AEO Citation Probability */}
            <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '14px', padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#a1a1aa', fontSize: '14px', fontWeight: 600 }}>
                <span>AEO Citation Rate</span>
                <Bot size={18} color="#10b981" />
              </div>
              <div style={{ fontSize: '32px', fontWeight: 900, color: '#fff', marginTop: '6px' }}>
                {dashData?.aeoScore !== undefined ? `${dashData.aeoScore}%` : '—'}
              </div>
              <div style={{ fontSize: '14px', color: '#10b981', marginTop: '4px', fontWeight: 700 }}>
                {dashData ? 'Google AI Overview Citation Rate' : 'Awaiting Analysis'}
              </div>
            </div>

            {/* KPI 3: GEO / Share of Model */}
            <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '14px', padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#a1a1aa', fontSize: '14px', fontWeight: 600 }}>
                <span>GEO Share of Model</span>
                <Radio size={18} color="#f59e0b" />
              </div>
              <div style={{ fontSize: '32px', fontWeight: 900, color: '#fff', marginTop: '6px' }}>
                {dashData?.geoScore !== undefined ? `${dashData.geoScore}%` : geoData?.overallGeoScore !== undefined ? `${geoData.overallGeoScore}%` : '—'}
              </div>
              <div style={{ fontSize: '14px', color: '#f59e0b', marginTop: '4px', fontWeight: 700 }}>
                {dashData || geoData ? 'Perplexity & ChatGPT Visibility' : 'Awaiting Analysis'}
              </div>
            </div>

            {/* KPI 4: Search Position / Clicks */}
            <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '14px', padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#a1a1aa', fontSize: '14px', fontWeight: 600 }}>
                <span>Search Position</span>
                <Award size={18} color="#3ECF8E" />
              </div>
              <div style={{ fontSize: '32px', fontWeight: 900, color: '#fff', marginTop: '6px' }}>
                {gscData?.overview?.avgPosition ? `Pos #${gscData.overview.avgPosition}` : dashData?.avgPosition ? `Pos #${dashData.avgPosition}` : '—'}
              </div>
              <div style={{ fontSize: '14px', color: '#3ECF8E', marginTop: '4px', fontWeight: 700 }}>
                {gscData ? 'Verified Google Search Console' : dashData?.avgPosition ? 'Estimated Organic Position' : 'Connect GSC for Live Data'}
              </div>
            </div>

          </div>

          {/* Google Search Console Live Card */}
          <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '16px', padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Globe size={20} color="#4285F4" />
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#fff', margin: 0 }}>
                  Google Search Console Performance
                </h3>
              </div>
              {gscConnected ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: '#3ECF8E', background: 'rgba(62,207,142,0.1)', padding: '3px 10px', borderRadius: '6px', border: '1px solid rgba(62,207,142,0.2)' }}>
                    Connected ✓
                  </span>
                  <button
                    onClick={() => { gscService.disconnectGsc(); setGscConnected(false); setGscData(null); }}
                    style={{ background: '#262626', color: '#a1a1aa', border: '1px solid #333', padding: '4px 10px', borderRadius: '6px', fontSize: '14px', cursor: 'pointer' }}
                  >
                    Disconnect
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleConnectGsc}
                  disabled={gscLoading}
                  style={{
                    padding: '6px 14px', background: '#4285F4', color: '#fff',
                    borderRadius: '8px', border: 'none', cursor: 'pointer',
                    fontSize: '14px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px'
                  }}
                >
                  {gscLoading ? <Loader2 size={14} className="animate-spin" /> : <Globe size={14} />}
                  Connect GSC (Live Data)
                </button>
              )}
            </div>

            {gscConnected && gscData?.overview ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '14px' }}>
                <div style={{ background: '#121212', border: '1px solid #222', borderRadius: '10px', padding: '14px' }}>
                  <div style={{ fontSize: '14px', color: '#71717a' }}>Total Clicks (28d)</div>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: '#4285F4', marginTop: '4px' }}>{gscData.overview.clicks}</div>
                </div>
                <div style={{ background: '#121212', border: '1px solid #222', borderRadius: '10px', padding: '14px' }}>
                  <div style={{ fontSize: '14px', color: '#71717a' }}>Total Impressions</div>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: '#3ECF8E', marginTop: '4px' }}>{gscData.overview.impressions}</div>
                </div>
                <div style={{ background: '#121212', border: '1px solid #222', borderRadius: '10px', padding: '14px' }}>
                  <div style={{ fontSize: '14px', color: '#71717a' }}>Average CTR</div>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: '#f59e0b', marginTop: '4px' }}>{gscData.overview.ctr}</div>
                </div>
                <div style={{ background: '#121212', border: '1px solid #222', borderRadius: '10px', padding: '14px' }}>
                  <div style={{ fontSize: '14px', color: '#71717a' }}>Avg Position</div>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: '#a78bfa', marginTop: '4px' }}>#{gscData.overview.avgPosition}</div>
                </div>
              </div>
            ) : (
              <p style={{ fontSize: '14px', color: '#71717a', margin: 0 }}>
                {gscError ? (
                  <span style={{ color: '#ef4444' }}>{gscError}</span>
                ) : (
                  'Connect Google Search Console above to import verified clicks, impressions, and exact Google search query rankings.'
                )}
              </p>
            )}
          </div>

          {/* Real AI Executive Summary & Quick Wins */}
          {dashData && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
              
              {/* Executive Summary */}
              <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldCheck size={18} color="#3ECF8E" />
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#fff', margin: 0 }}>
                    AI Executive Summary
                  </h3>
                </div>
                <p style={{ fontSize: '14px', color: '#d4d4d8', lineHeight: 1.6, margin: 0 }}>
                  {dashData.summary}
                </p>
                {dashData.brandMentionedInAI !== undefined && (
                  <div style={{ marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid #222', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '14px', color: '#a1a1aa' }}>AI Brand Visibility:</span>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: dashData.brandMentionedInAI ? '#3ECF8E' : '#f59e0b' }}>
                      {dashData.brandMentionedInAI ? '✓ Brand Cited in AI Models' : '⚠️ Citation Opportunity Available'}
                    </span>
                  </div>
                )}
              </div>

              {/* Actionable Quick Wins */}
              <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={18} color="#60a5fa" />
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#fff', margin: 0 }}>
                    AI Recommended Quick Wins
                  </h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {(dashData.quickWins || []).map((win, i) => (
                    <div key={i} style={{ background: '#121212', border: '1px solid #222', borderRadius: '8px', padding: '10px 14px', fontSize: '14px', color: '#e4e4e7', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <span style={{ color: '#3ECF8E', fontWeight: 800 }}>#{i + 1}</span>
                      <span>{win}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* Real Discovered Keywords Table */}
          {kwData.length > 0 && (
            <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '16px', overflow: 'hidden' }}>
              <div style={{ padding: '20px 24px', borderBottom: '1px solid #262626', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Target size={18} color="#3ECF8E" />
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#fff', margin: 0 }}>
                    Discovered Keyword Opportunities ({kwData.length})
                  </h3>
                </div>
                <button
                  onClick={() => setActiveTab('strategy')}
                  style={{ background: 'transparent', border: 'none', color: '#3ECF8E', fontSize: '14px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  View All in Keyword Strategy <ArrowRight size={14} />
                </button>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                  <thead>
                    <tr style={{ background: '#121212', borderBottom: '1px solid #262626', color: '#71717a', fontSize: '14px' }}>
                      <th style={{ padding: '12px 24px' }}>Target Keyword</th>
                      <th style={{ padding: '12px 20px' }}>Est. Volume</th>
                      <th style={{ padding: '12px 20px' }}>Difficulty (KD)</th>
                      <th style={{ padding: '12px 20px' }}>Search Intent</th>
                      <th style={{ padding: '12px 24px' }}>Opportunity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {kwData.slice(0, 5).map((kw, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #222' }}>
                        <td style={{ padding: '12px 24px', fontWeight: 700, color: '#fff' }}>{kw.keyword}</td>
                        <td style={{ padding: '12px 20px', color: '#d4d4d8' }}>{kw.volume}</td>
                        <td style={{ padding: '12px 20px' }}>
                          <span style={{
                            padding: '2px 8px', borderRadius: '4px', fontSize: '14px', fontWeight: 700,
                            background: kw.kd <= 20 ? 'rgba(62,207,142,0.1)' : 'rgba(245,158,11,0.1)',
                            color: kw.kd <= 20 ? '#3ECF8E' : '#f59e0b',
                          }}>
                            KD {kw.kd}
                          </span>
                        </td>
                        <td style={{ padding: '12px 20px', color: '#a1a1aa' }}>{kw.intent}</td>
                        <td style={{ padding: '12px 24px', color: '#71717a' }}>{kw.opportunity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Real Competitor Gaps */}
          {compData.length > 0 && (
            <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '16px', overflow: 'hidden' }}>
              <div style={{ padding: '20px 24px', borderBottom: '1px solid #262626', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Search size={18} color="#f97316" />
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#fff', margin: 0 }}>
                    Direct Competitors & Content Gaps ({compData.length})
                  </h3>
                </div>
                <button
                  onClick={() => setActiveTab('competitors')}
                  style={{ background: 'transparent', border: 'none', color: '#3ECF8E', fontSize: '14px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  Open Competitor Spy <ArrowRight size={14} />
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', padding: '20px 24px' }}>
                {compData.map((comp, i) => (
                  <div key={i} style={{ background: '#121212', border: '1px solid #262626', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '15px', fontWeight: 800, color: '#fff' }}>{comp.domain}</span>
                      <span style={{ fontSize: '14px', fontWeight: 700, color: comp.threatLevel === 'High' ? '#ef4444' : '#f59e0b', background: 'rgba(239,68,68,0.1)', padding: '2px 8px', borderRadius: '4px' }}>
                        {comp.threatLevel} Threat
                      </span>
                    </div>
                    <p style={{ fontSize: '14px', color: '#71717a', margin: 0 }}>{comp.strength}</p>
                    <div style={{ marginTop: '4px', background: 'rgba(62,207,142,0.06)', border: '1px solid rgba(62,207,142,0.15)', borderRadius: '6px', padding: '8px 10px' }}>
                      <span style={{ fontSize: '14px', fontWeight: 700, color: '#3ECF8E' }}>Content Gap: </span>
                      <span style={{ fontSize: '14px', color: '#d4d4d8' }}>{comp.contentGap}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Autonomous AI Agents Status Grid */}
          <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '16px', overflow: 'hidden' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #262626', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Bot size={20} color="#3ECF8E" />
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#fff', margin: 0 }}>
                  Autonomous AI Agents Status Matrix
                </h3>
              </div>
              <span style={{ fontSize: '14px', fontWeight: 700, color: '#3ECF8E', background: 'rgba(62,207,142,0.1)', padding: '4px 12px', borderRadius: '8px', border: '1px solid rgba(62,207,142,0.2)' }}>
                Live Execution State
              </span>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                <thead>
                  <tr style={{ background: '#121212', borderBottom: '1px solid #262626', color: '#71717a', fontSize: '14px' }}>
                    <th style={{ padding: '14px 24px' }}>Agent Name</th>
                    <th style={{ padding: '14px 20px' }}>Category</th>
                    <th style={{ padding: '14px 20px' }}>Discovered Outputs</th>
                    <th style={{ padding: '14px 24px' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {AGENTS_LIST.map((ag) => {
                    const status = agentStatus[ag.id] || (ag.resultCount > 0 ? 'done' : 'idle');
                    return (
                      <tr
                        key={ag.id}
                        onClick={() => setActiveTab(ag.tab)}
                        style={{
                          borderBottom: '1px solid #222',
                          cursor: 'pointer',
                          transition: 'background 0.15s ease'
                        }}
                      >
                        <td style={{ padding: '14px 24px', fontWeight: 700, color: '#fff' }}>
                          <span style={{ marginRight: '8px', fontSize: '16px' }}>{ag.avatar}</span>
                          {ag.name}
                        </td>
                        <td style={{ padding: '14px 20px', color: '#a1a1aa' }}>
                          {ag.category}
                        </td>
                        <td style={{ padding: '14px 20px', color: '#d4d4d8', fontWeight: 600 }}>
                          {ag.resultCount > 0 ? `${ag.resultCount} items generated` : '—'}
                        </td>
                        <td style={{ padding: '14px 24px' }}>
                          <span style={{
                            fontSize: '14px', fontWeight: 700, padding: '3px 10px', borderRadius: '6px',
                            background: status === 'done' ? 'rgba(62,207,142,0.1)' : status === 'running' ? 'rgba(96,165,250,0.1)' : 'rgba(255,255,255,0.05)',
                            color: status === 'done' ? '#3ECF8E' : status === 'running' ? '#60a5fa' : '#71717a',
                            border: `1px solid ${status === 'done' ? 'rgba(62,207,142,0.2)' : status === 'running' ? 'rgba(96,165,250,0.2)' : '#2d2d2d'}`
                          }}>
                            {status === 'done' ? 'Completed ✓' : status === 'running' ? 'Running…' : 'Idle'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

    </div>
  );
}
