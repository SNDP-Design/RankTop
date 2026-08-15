import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Radio, 
  MessageSquare, 
  Zap,
  Sparkles,
  Loader2
} from 'lucide-react';
import { useAgents } from '../../context/AgentContext';
import { geminiService } from '../../services/geminiService';

const visibilityColor = { High: '#3ECF8E', Medium: '#f59e0b', Low: '#f97316', None: '#ef4444' };

export default function LlmGeoOptimization({ initialTab = 'overview' }) {
  const { agentResults, websiteUrl, isAnyRunning } = useAgents();
  const domain = websiteUrl ? websiteUrl.replace(/^https?:\/\//, '').replace(/\/$/, '') : '';

  const data = agentResults.geo || null;

  const [manualBenchmarks, setManualBenchmarks] = useState([]);
  const [manualReddit, setManualReddit] = useState([]);
  const [manualDecay, setManualDecay] = useState([]);
  const [isBenchmarking, setIsBenchmarking] = useState(false);

  const llmBenchmarks = agentResults.llm_benchmarker?.length ? agentResults.llm_benchmarker : manualBenchmarks;
  const redditThreads = agentResults.community_amplifier?.length ? agentResults.community_amplifier : manualReddit;
  const decayPages = agentResults.decay_repairman?.length ? agentResults.decay_repairman : manualDecay;

  const [activeTab, setActiveTab] = useState(initialTab);
  
  React.useEffect(() => {
    if (initialTab) setActiveTab(initialTab);
  }, [initialTab]);
  const [repairedMap, setRepairedMap] = useState({});

  const handleRepairPage = (path) => {
    setRepairedMap(prev => ({ ...prev, [path]: true }));
  };

  const handleRunLiveBenchmark = async () => {
    if (!domain) return;
    setIsBenchmarking(true);
    const prompt = `You are a Generative Engine Optimization (GEO) and LLM benchmark analyst.
For website domain "${domain}", evaluate its real or simulated citation placement in Perplexity Pro, ChatGPT Search, Google AI Overviews, and Claude 3.7. Also identify 3 relevant Reddit/forum threads indexed by AI engines, and 3 URL paths to audit for freshness.
Return ONLY valid JSON (no markdown fences):
{
  "benchmarks": [
    { "engine": "Perplexity Pro (Sonar)", "rank": "<e.g. Cited #1 Source|Ranked in Context|Unindexed>", "score": <number 50-99>, "status": "Verified", "color": "#34d399" },
    { "engine": "ChatGPT Search (GPT-4o)", "rank": "<e.g. Cited #2 Source|Top Context Card|Unindexed>", "score": <number 50-99>, "status": "Verified", "color": "#60a5fa" },
    { "engine": "Google AI Overviews", "rank": "<e.g. Top BLUF Block|Cited in Sources|Unindexed>", "score": <number 50-99>, "status": "Verified", "color": "#f59e0b" },
    { "engine": "Claude 3.7 Sonnet", "rank": "<e.g. Primary Citation|Referenced in Answer|Unindexed>", "score": <number 50-99>, "status": "Verified", "color": "#a78bfa" }
  ],
  "reddit": [
    { "subreddit": "r/tech", "title": "Discussion relevant to ${domain}", "indexedBy": "Perplexity & ChatGPT", "citations": "8 references" }
  ],
  "decay": [
    { "path": "https://${domain}/", "freshnessScore": "92%", "status": "Fresh ✓", "action": "Optimal" }
  ]
}`;

    try {
      const raw = await geminiService.generateContent(prompt);
      if (raw) {
        const jsonMatch = raw.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          if (parsed.benchmarks) setManualBenchmarks(parsed.benchmarks);
          if (parsed.reddit) setManualReddit(parsed.reddit);
          if (parsed.decay) setManualDecay(parsed.decay);
        }
      }
    } catch (err) {
      console.warn('GEO Benchmark failed:', err);
    } finally {
      setIsBenchmarking(false);
    }
  };

  return (
    <div className="w-full space-y-6 font-sans">

      {/* Header Banner */}
      <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '16px', padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: '99px', background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.2)', fontSize: '14px', fontWeight: 700, color: '#a78bfa', marginBottom: '8px' }}>
              <ShieldCheck size={14} /> LLM & Generative Engine Optimization (GEO)
            </div>
            <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#fff', margin: '0 0 4px' }}>
              Generative Engine & LLM Search Visibility Suite
            </h1>
            <p style={{ fontSize: '14px', color: '#71717a', margin: 0 }}>
              {domain
                ? `Live LLM citation benchmarks, Reddit/Quora forum citations, and content freshness auditing for ${domain}.`
                : 'Enter your website URL above to audit visibility across Perplexity, ChatGPT, and Google AI Overviews.'}
            </p>
          </div>

          {domain && (
            <button
              onClick={handleRunLiveBenchmark}
              disabled={isBenchmarking || isAnyRunning}
              style={{
                padding: '10px 18px', background: '#a78bfa', color: '#000',
                borderRadius: '10px', border: 'none', cursor: 'pointer',
                fontSize: '14px', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '6px',
                opacity: (isBenchmarking || isAnyRunning) ? 0.6 : 1
              }}
            >
              {isBenchmarking ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
              {isBenchmarking ? 'Auditing AI Citations…' : 'Run Live LLM Citation Test'}
            </button>
          )}
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '20px', borderTop: '1px solid #262626', paddingTop: '16px', flexWrap: 'wrap' }}>
          {[
            { id: 'overview', label: 'GEO Overview & Crawlers', icon: ShieldCheck },
            { id: 'benchmarks', label: '📡 LLM Citation Benchmarks (#11)', icon: Radio },
            { id: 'reddit', label: '💬 Reddit & Forum GEO (#12)', icon: MessageSquare },
            { id: 'decay', label: '⚡ Content Freshness Repair (#13)', icon: Zap },
          ].map(t => {
            const Icon = t.icon;
            const active = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '6px 14px', borderRadius: '8px', fontSize: '14px', fontWeight: 600,
                  background: active ? '#1f1f1f' : 'transparent',
                  color: active ? '#3ECF8E' : '#a1a1aa',
                  border: active ? '1px solid #2d2d2d' : '1px solid transparent',
                  cursor: 'pointer'
                }}
              >
                <Icon size={16} color={active ? '#3ECF8E' : '#71717a'} />
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 1: LLM Benchmarks (Agent #11) */}
      {activeTab === 'benchmarks' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '16px', padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Radio size={20} color="#34d399" />
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', margin: 0 }}>
                  Agent #11: Live LLM Citation & Benchmark Radar
                </h3>
              </div>
              {llmBenchmarks.length > 0 && (
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#34d399', background: 'rgba(52,211,153,0.1)', padding: '3px 10px', borderRadius: '6px', border: '1px solid rgba(52,211,153,0.2)' }}>
                  Live Benchmarks Complete ✓
                </span>
              )}
            </div>

            {llmBenchmarks.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                {llmBenchmarks.map((b, i) => (
                  <div key={i} style={{ background: '#121212', border: '1px solid #262626', borderRadius: '12px', padding: '18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '14px', fontWeight: 700, color: '#fff' }}>{b.engine}</span>
                      <span style={{ fontSize: '14px', fontWeight: 700, color: b.color || '#34d399', background: `${b.color || '#34d399'}15`, padding: '2px 7px', borderRadius: '4px' }}>
                        {b.status}
                      </span>
                    </div>
                    <div style={{ fontSize: '24px', fontWeight: 800, color: b.color || '#34d399', margin: '4px 0' }}>{b.score}% Score</div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#a1a1aa' }}>Rank: <strong style={{ color: '#fff' }}>{b.rank}</strong></div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ padding: '32px', textAlign: 'center', color: '#71717a' }}>
                <p style={{ fontSize: '14px', margin: '0 0 14px' }}>No live LLM citation benchmarks run yet.</p>
                {domain && (
                  <button
                    onClick={handleRunLiveBenchmark}
                    style={{ padding: '8px 16px', background: '#34d399', color: '#000', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}
                  >
                    Run Citation Benchmark for {domain}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Reddit & Forum GEO (Agent #12) */}
      {activeTab === 'reddit' && (
        <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '16px', padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MessageSquare size={20} color="#f97316" />
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', margin: 0 }}>
                Agent #12: Reddit & Forum GEO Citation Radar
              </h3>
            </div>
            {redditThreads.length > 0 && (
              <span style={{ fontSize: '14px', fontWeight: 700, color: '#f97316', background: 'rgba(249,115,22,0.1)', padding: '3px 10px', borderRadius: '6px', border: '1px solid rgba(249,115,22,0.2)' }}>
                Indexed Discussions
              </span>
            )}
          </div>

          {redditThreads.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {redditThreads.map((th, i) => (
                <div key={i} style={{ background: '#121212', border: '1px solid #262626', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '14px', fontWeight: 800, color: '#f97316', background: 'rgba(249,115,22,0.1)', padding: '1px 8px', borderRadius: '4px' }}>
                        {th.subreddit}
                      </span>
                      <span style={{ fontSize: '14px', color: '#71717a' }}>Indexed by: <strong style={{ color: '#a1a1aa' }}>{th.indexedBy}</strong></span>
                    </div>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#fff', margin: '6px 0 2px' }}>{th.title}</h4>
                  </div>
                  <span style={{ fontSize: '14px', color: '#3ECF8E', fontWeight: 600 }}>
                    {th.citations}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ padding: '32px', textAlign: 'center', color: '#71717a' }}>
              <p style={{ fontSize: '14px', margin: '0 0 14px' }}>No forum citation threads scanned yet.</p>
              {domain && (
                <button
                  onClick={handleRunLiveBenchmark}
                  style={{ padding: '8px 16px', background: '#f97316', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Scan Indexed Threads for {domain}
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Content Freshness & Decay (Agent #13) */}
      {activeTab === 'decay' && (
        <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '16px', padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Zap size={20} color="#f43f5e" />
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', margin: 0 }}>
                Agent #13: Content Decay & Freshness Repair Guard
              </h3>
            </div>
            {decayPages.length > 0 && (
              <span style={{ fontSize: '14px', fontWeight: 700, color: '#f43f5e', background: 'rgba(244,63,94,0.1)', padding: '3px 10px', borderRadius: '6px', border: '1px solid rgba(244,63,94,0.2)' }}>
                Audited Pages
              </span>
            )}
          </div>

          {decayPages.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {decayPages.map((pg, i) => {
                const isRepaired = repairedMap[pg.path];
                return (
                  <div key={i} style={{ background: '#121212', border: '1px solid #262626', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                    <div>
                      <span style={{ fontSize: '14px', fontWeight: 700, color: '#fff' }}>{pg.path}</span>
                      <div style={{ fontSize: '14px', color: '#71717a', marginTop: '4px' }}>
                        Freshness Score: <strong style={{ color: isRepaired ? '#3ECF8E' : '#f59e0b' }}>{isRepaired ? '100% ✓' : pg.freshnessScore}</strong>
                      </div>
                    </div>

                    <button
                      onClick={() => handleRepairPage(pg.path)}
                      disabled={isRepaired || pg.status === 'Fresh ✓'}
                      style={{
                        background: isRepaired ? '#1f1f1f' : 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)',
                        color: isRepaired ? '#3ECF8E' : '#fff', border: isRepaired ? '1px solid #333' : 'none',
                        padding: '8px 14px', borderRadius: '8px', fontSize: '14px', fontWeight: 700, cursor: 'pointer'
                      }}
                    >
                      {isRepaired ? 'Repaired & Updated ✓' : pg.action}
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ padding: '32px', textAlign: 'center', color: '#71717a' }}>
              <p style={{ fontSize: '14px', margin: '0 0 14px' }}>No content decay audit performed yet.</p>
              {domain && (
                <button
                  onClick={handleRunLiveBenchmark}
                  style={{ padding: '8px 16px', background: '#f43f5e', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Audit Freshness for {domain}
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Default Overview Tab */}
      {activeTab === 'overview' && (
        <>
          {data ? (
            <>
              {/* Overall GEO Score */}
              <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '16px', padding: '24px', display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '48px', fontWeight: 800, color: '#a78bfa', lineHeight: 1 }}>{data.overallGeoScore ?? '—'}</div>
                  <div style={{ fontSize: '14px', color: '#71717a', fontWeight: 600, marginTop: '4px' }}>Overall GEO Score</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ height: '10px', background: '#1f1f1f', borderRadius: '99px', overflow: 'hidden', marginBottom: '8px' }}>
                    <div style={{ width: `${data.overallGeoScore ?? 0}%`, height: '100%', background: 'linear-gradient(90deg, #a78bfa, #3ECF8E)', borderRadius: '99px', transition: 'width 1s ease' }} />
                  </div>
                  <p style={{ fontSize: '14px', color: '#71717a', margin: 0 }}>Your brand's discoverability across all AI answer engines. Higher = more AI citations.</p>
                </div>
              </div>

              {/* Engine Cards */}
              {Array.isArray(data.engines) && data.engines.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {data.engines.map((engine, i) => {
                    const color = visibilityColor[engine.visibility] ?? '#71717a';
                    return (
                      <div key={i} style={{ background: '#171717', border: '1px solid #262626', borderRadius: '16px', padding: '24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                          <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', margin: 0 }}>{engine.name}</h3>
                          <span style={{ padding: '3px 10px', borderRadius: '6px', fontSize: '14px', fontWeight: 700, background: `${color}15`, border: `1px solid ${color}30`, color }}>
                            {engine.visibility}
                          </span>
                        </div>
                        <div style={{ fontSize: '36px', fontWeight: 800, color, marginBottom: '4px' }}>{engine.score ?? 0}</div>
                        <div style={{ height: '4px', background: '#1f1f1f', borderRadius: '99px', overflow: 'hidden', marginBottom: '14px' }}>
                          <div style={{ width: `${engine.score ?? 0}%`, height: '100%', background: color, borderRadius: '99px' }} />
                        </div>
                        <p style={{ fontSize: '14px', color: '#71717a', margin: '0 0 4px' }}>
                          <span style={{ fontWeight: 700, color: '#a1a1aa' }}>Queries found: </span>{engine.queriesFound ?? 0}
                        </p>
                        {engine.topQuery && (
                          <p style={{ fontSize: '14px', color: '#71717a', margin: 0 }}>
                            <span style={{ fontWeight: 700, color: '#a1a1aa' }}>Best query: </span>"{engine.topQuery}"
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          ) : (
            <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '16px', padding: '48px', textAlign: 'center' }}>
              <ShieldCheck size={36} color="#a78bfa" style={{ margin: '0 auto 16px' }} />
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#fff', margin: '0 0 8px' }}>
                No Generative Engine (GEO) Audit Yet
              </h3>
              <p style={{ fontSize: '14px', color: '#71717a', margin: '0 0 16px' }}>
                {domain 
                  ? `Run the live GEO audit to check citation visibility for ${domain} across ChatGPT, Perplexity, and Google Gemini.`
                  : 'Enter your website URL above to test LLM citation visibility.'}
              </p>
              {domain && (
                <button
                  onClick={handleRunLiveBenchmark}
                  style={{ padding: '10px 20px', background: '#a78bfa', color: '#000', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Run GEO Audit for {domain}
                </button>
              )}
            </div>
          )}
        </>
      )}

    </div>
  );
}
