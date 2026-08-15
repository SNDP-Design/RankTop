import React from 'react';
import { Search, Loader2, AlertCircle, Sparkles, TrendingUp, Shield } from 'lucide-react';
import { useAgents } from '../../context/AgentContext';

const threatColors = { High: '#ef4444', Medium: '#f59e0b', Low: '#3ECF8E' };

export default function CompetitorSpy({ onGenerateArticle }) {
  const { agentResults, agentStatus, websiteUrl } = useAgents();
  const data = agentResults.competitors;
  const status = agentStatus.competitors;
  const domain = websiteUrl || 'your website';

  return (
    <div className="w-full space-y-6 font-sans">

      {/* Header */}
      <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '16px', padding: '24px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: '99px', background: 'rgba(62,207,142,0.1)', border: '1px solid rgba(62,207,142,0.2)', fontSize: '14px', fontWeight: 700, color: '#3ECF8E', marginBottom: '8px' }}>
          <Search size={14} /> Competitor Intelligence
        </div>
        <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#fff', margin: '0 0 4px' }}>AI Competitor Analysis</h1>
        <p style={{ fontSize: '14px', color: '#71717a', margin: 0 }}>
          {status === 'done'
            ? `Gemini identified ${Array.isArray(data) ? data.length : 0} key competitors for ${domain} and their content gaps.`
            : 'Enter your website URL above to run competitor intelligence.'}
        </p>
      </div>

      {status === 'idle' && (
        <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '16px', padding: '48px', textAlign: 'center' }}>
          <Search size={32} color="#3ECF8E" style={{ margin: '0 auto 12px' }} />
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', margin: '0 0 8px' }}>No Competitor Data Yet</h3>
          <p style={{ fontSize: '14px', color: '#71717a', margin: 0 }}>Enter your website URL in the top bar to activate the Competitor Agent.</p>
        </div>
      )}

      {status === 'running' && (
        <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '16px', padding: '48px', textAlign: 'center' }}>
          <Loader2 size={32} color="#3ECF8E" style={{ margin: '0 auto 12px', animation: 'spin 1s linear infinite' }} />
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', margin: '0 0 8px' }}>Scouting competitors for {domain}…</h3>
          <p style={{ fontSize: '14px', color: '#71717a', margin: 0 }}>Gemini is profiling your top competitors and their content gaps.</p>
        </div>
      )}

      {status === 'error' && (
        <div style={{ background: '#171717', border: '1px solid #3f1515', borderRadius: '16px', padding: '32px', textAlign: 'center' }}>
          <AlertCircle size={28} color="#ef4444" style={{ margin: '0 auto 10px' }} />
          <p style={{ fontSize: '14px', color: '#ef4444', margin: 0 }}>Competitor analysis failed. Check your Gemini API key.</p>
        </div>
      )}

      {status === 'done' && Array.isArray(data) && data.map((comp, i) => (
        <div key={i} style={{ background: '#171717', border: '1px solid #262626', borderRadius: '16px', padding: '24px' }}>
          {/* Competitor header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#1f1f1f', border: '1px solid #2d2d2d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '16px', fontWeight: 800, color: '#3ECF8E' }}>{i + 1}</span>
              </div>
              <div>
                <p style={{ fontSize: '16px', fontWeight: 800, color: '#fff', margin: '0 0 2px' }}>{comp.domain}</p>
                <p style={{ fontSize: '14px', color: '#71717a', margin: 0 }}>{comp.strength}</p>
              </div>
            </div>
            <span style={{
              padding: '4px 12px', borderRadius: '8px', fontSize: '14px', fontWeight: 700,
              background: `${threatColors[comp.threatLevel] || '#71717a'}15`,
              border: `1px solid ${threatColors[comp.threatLevel] || '#71717a'}30`,
              color: threatColors[comp.threatLevel] || '#71717a',
            }}>
              <Shield size={14} style={{ display: 'inline', marginRight: '4px' }} />
              {comp.threatLevel} Threat
            </span>
          </div>

          {/* Top keywords */}
          <div style={{ marginBottom: '14px' }}>
            <p style={{ fontSize: '14px', fontWeight: 700, color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 8px' }}>Their Top Keywords</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {(comp.topKeywords ?? []).map((kw, j) => (
                <span key={j} style={{ padding: '4px 10px', background: '#1f1f1f', border: '1px solid #2d2d2d', borderRadius: '6px', fontSize: '14px', color: '#d4d4d8', fontWeight: 500 }}>
                  {kw}
                </span>
              ))}
            </div>
          </div>

          {/* Content gap opportunity */}
          <div style={{ background: 'rgba(62,207,142,0.06)', border: '1px solid rgba(62,207,142,0.15)', borderRadius: '10px', padding: '14px 16px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
            <div>
              <p style={{ fontSize: '14px', fontWeight: 700, color: '#3ECF8E', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 4px' }}>
                <TrendingUp size={14} style={{ display: 'inline', marginRight: '4px' }} /> Content Gap Opportunity
              </p>
              <p style={{ fontSize: '14px', color: '#d4d4d8', margin: 0 }}>{comp.contentGap}</p>
            </div>
            <button
              onClick={() => onGenerateArticle && onGenerateArticle(comp.contentGap)}
              style={{ padding: '8px 16px', background: '#3ECF8E', color: '#000', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', flexShrink: 0 }}
            >
              <Sparkles size={14} /> Write Article
            </button>
          </div>
        </div>
      ))}

    </div>
  );
}
