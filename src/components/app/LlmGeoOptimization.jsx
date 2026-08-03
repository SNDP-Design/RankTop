import React from 'react';
import { ShieldCheck, Loader2, AlertCircle } from 'lucide-react';
import { useAgents } from '../../context/AgentContext';

const visibilityColor = { High: '#3ECF8E', Medium: '#f59e0b', Low: '#f97316', None: '#ef4444' };

export default function LlmGeoOptimization() {
  const { agentResults, agentStatus, websiteUrl } = useAgents();
  const data = agentResults.geo;
  const status = agentStatus.geo;
  const domain = websiteUrl || 'your website';

  return (
    <div className="w-full space-y-6 font-sans">

      {/* Header */}
      <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '16px', padding: '24px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: '99px', background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.2)', fontSize: '13px', fontWeight: 700, color: '#a78bfa', marginBottom: '8px' }}>
          <ShieldCheck size={13} /> LLM Visibility
        </div>
        <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#fff', margin: '0 0 4px' }}>Generative Engine Optimization (GEO)</h1>
        <p style={{ fontSize: '14px', color: '#71717a', margin: 0 }}>
          {status === 'done'
            ? `Brand visibility analysis across AI engines for ${domain}.`
            : 'Enter your website URL above to check your brand visibility in AI engines.'}
        </p>
      </div>

      {status === 'idle' && (
        <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '16px', padding: '48px', textAlign: 'center' }}>
          <ShieldCheck size={32} color="#a78bfa" style={{ margin: '0 auto 12px' }} />
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', margin: '0 0 8px' }}>GEO Analysis Ready</h3>
          <p style={{ fontSize: '14px', color: '#71717a', margin: 0 }}>Enter your website URL in the top bar to activate the GEO Agent.</p>
        </div>
      )}

      {status === 'running' && (
        <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '16px', padding: '48px', textAlign: 'center' }}>
          <Loader2 size={32} color="#a78bfa" style={{ margin: '0 auto 12px', animation: 'spin 1s linear infinite' }} />
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', margin: '0 0 8px' }}>Testing AI engine visibility for {domain}…</h3>
          <p style={{ fontSize: '14px', color: '#71717a', margin: 0 }}>Checking Gemini, ChatGPT, and Perplexity AI presence.</p>
        </div>
      )}

      {status === 'error' && (
        <div style={{ background: '#171717', border: '1px solid #3f1515', borderRadius: '16px', padding: '32px', textAlign: 'center' }}>
          <AlertCircle size={28} color="#ef4444" style={{ margin: '0 auto 10px' }} />
          <p style={{ fontSize: '14px', color: '#ef4444', margin: 0 }}>GEO analysis failed. Check your Gemini API key.</p>
        </div>
      )}

      {status === 'done' && data && (
        <>
          {/* Overall GEO Score */}
          <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '16px', padding: '24px', display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '48px', fontWeight: 800, color: '#a78bfa', lineHeight: 1 }}>{data.overallGeoScore ?? 0}</div>
              <div style={{ fontSize: '13px', color: '#71717a', fontWeight: 600, marginTop: '4px' }}>Overall GEO Score</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ height: '10px', background: '#1f1f1f', borderRadius: '99px', overflow: 'hidden', marginBottom: '8px' }}>
                <div style={{ width: `${data.overallGeoScore ?? 0}%`, height: '100%', background: 'linear-gradient(90deg, #a78bfa, #3ECF8E)', borderRadius: '99px', transition: 'width 1s ease' }} />
              </div>
              <p style={{ fontSize: '14px', color: '#71717a', margin: 0 }}>Your brand's discoverability across all AI answer engines. Higher = more AI citations.</p>
            </div>
          </div>

          {/* Engine Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(data.engines ?? []).map((engine, i) => {
              const color = visibilityColor[engine.visibility] ?? '#71717a';
              return (
                <div key={i} style={{ background: '#171717', border: '1px solid #262626', borderRadius: '16px', padding: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', margin: 0 }}>{engine.name}</h3>
                    <span style={{ padding: '3px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 700, background: `${color}15`, border: `1px solid ${color}30`, color }}>
                      {engine.visibility}
                    </span>
                  </div>
                  <div style={{ fontSize: '36px', fontWeight: 800, color, marginBottom: '4px' }}>{engine.score ?? 0}</div>
                  <div style={{ height: '4px', background: '#1f1f1f', borderRadius: '99px', overflow: 'hidden', marginBottom: '14px' }}>
                    <div style={{ width: `${engine.score ?? 0}%`, height: '100%', background: color, borderRadius: '99px' }} />
                  </div>
                  <p style={{ fontSize: '13px', color: '#71717a', margin: '0 0 4px' }}>
                    <span style={{ fontWeight: 700, color: '#a1a1aa' }}>Queries found: </span>{engine.queriesFound ?? 0}
                  </p>
                  {engine.topQuery && (
                    <p style={{ fontSize: '13px', color: '#71717a', margin: 0 }}>
                      <span style={{ fontWeight: 700, color: '#a1a1aa' }}>Best query: </span>"{engine.topQuery}"
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Recommendations */}
          {data.recommendations?.length > 0 && (
            <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '16px', padding: '24px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#a78bfa', margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>GEO Recommendations</h3>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {data.recommendations.map((rec, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: '#d4d4d8' }}>
                    <span style={{ width: '20px', height: '20px', borderRadius: '6px', background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 800, color: '#a78bfa', flexShrink: 0 }}>{i + 1}</span>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}

    </div>
  );
}
