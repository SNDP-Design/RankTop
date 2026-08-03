import React from 'react';
import { Bot, CheckCircle2, Loader2, AlertCircle, Clock, Zap, TrendingUp } from 'lucide-react';
import { useAgents } from '../../context/AgentContext';

const AGENTS = [
  { id: 'dashboard', name: 'SEO Analyst Agent',        desc: 'Auditing domain health & scoring SEO/AEO/GEO',        color: '#3ECF8E' },
  { id: 'keywords',  name: 'Keyword Scout Agent',       desc: 'Finding low-KD, high-volume keyword clusters',         color: '#60a5fa' },
  { id: 'competitors',name: 'Competitor Intel Agent',   desc: 'Profiling top competitors & content gaps',             color: '#f97316' },
  { id: 'aeo',       name: 'AI Overview Agent',         desc: 'Simulating Google AI Overview citation tests',          color: '#a78bfa' },
  { id: 'geo',       name: 'GEO Visibility Agent',      desc: 'Checking brand presence across Gemini, ChatGPT, Perplexity', color: '#fb923c' },
  { id: 'faq',       name: 'Voice & FAQ Agent',         desc: 'Generating voice-optimized FAQ pairs with schema',     color: '#fbbf24' },
  { id: 'swarm',     name: 'Swarm Orchestrator',        desc: 'Coordinating agents & building strategic action plan', color: '#3ECF8E' },
];

function StatusBadge({ status }) {
  const map = {
    idle:    { label: 'Idle',     bg: '#1f1f1f', border: '#2d2d2d', color: '#71717a' },
    running: { label: 'Running',  bg: 'rgba(62,207,142,0.08)', border: 'rgba(62,207,142,0.25)', color: '#3ECF8E' },
    done:    { label: 'Complete', bg: 'rgba(62,207,142,0.08)', border: 'rgba(62,207,142,0.25)', color: '#3ECF8E' },
    error:   { label: 'Error',    bg: 'rgba(239,68,68,0.08)',  border: 'rgba(239,68,68,0.25)',  color: '#ef4444' },
  };
  const s = map[status] ?? map.idle;
  return (
    <span style={{ padding: '3px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 700, background: s.bg, border: `1px solid ${s.border}`, color: s.color, display: 'flex', alignItems: 'center', gap: '5px', whiteSpace: 'nowrap' }}>
      {status === 'running' && <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#3ECF8E', animation: 'pulse 1s infinite', flexShrink: 0 }} />}
      {status === 'done'    && <CheckCircle2 size={11} />}
      {status === 'error'   && <AlertCircle  size={11} />}
      {status === 'idle'    && <Clock size={11} />}
      {s.label}
    </span>
  );
}

export default function SwarmOrchestratorView() {
  const { agentStatus, agentResults, isAnyRunning, websiteUrl, triggerAllAgents, setSettingsOpen, hasApiKey } = useAgents();

  const totalDone    = Object.values(agentStatus).filter((s) => s === 'done').length;
  const totalRunning = Object.values(agentStatus).filter((s) => s === 'running').length;
  const totalError   = Object.values(agentStatus).filter((s) => s === 'error').length;
  const totalAgents  = AGENTS.length;
  const swarmData    = agentResults.swarm;

  return (
    <div className="w-full space-y-6 font-sans">

      {/* Header */}
      <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '16px', padding: '24px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: '99px', background: 'rgba(62,207,142,0.1)', border: '1px solid rgba(62,207,142,0.2)', fontSize: '13px', fontWeight: 700, color: '#3ECF8E', marginBottom: '8px' }}>
            <Bot size={13} /> AI Swarm Orchestrator
          </div>
          <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#fff', margin: '0 0 4px' }}>Multi-Agent Swarm Control Panel</h1>
          <p style={{ fontSize: '14px', color: '#71717a', margin: 0 }}>
            {websiteUrl
              ? `Managing ${totalAgents} agents for ${websiteUrl} — ${totalDone} complete, ${totalRunning} running`
              : 'Enter your website URL above to launch all 7 AI agents simultaneously.'}
          </p>
        </div>
        {!hasApiKey() && (
          <button
            onClick={() => setSettingsOpen(true)}
            style={{ padding: '10px 20px', background: '#3ECF8E', color: '#000', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Zap size={15} /> Add API Key to Start
          </button>
        )}
      </div>

      {/* Progress bar (only when active) */}
      {(isAnyRunning || totalDone > 0) && (
        <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '16px', padding: '20px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '14px', fontWeight: 700, color: '#fff' }}>Swarm Progress</span>
            <span style={{ fontSize: '14px', fontWeight: 700, color: '#3ECF8E' }}>{totalDone}/{totalAgents} agents</span>
          </div>
          <div style={{ height: '8px', background: '#1f1f1f', borderRadius: '99px', overflow: 'hidden' }}>
            <div style={{ width: `${(totalDone / totalAgents) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #3ECF8E, #60a5fa)', borderRadius: '99px', transition: 'width 0.5s ease' }} />
          </div>
          {totalDone === totalAgents && (
            <p style={{ fontSize: '13px', color: '#3ECF8E', fontWeight: 600, margin: '8px 0 0' }}>✓ All agents complete — check each module tab for results</p>
          )}
        </div>
      )}

      {/* Agent Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {AGENTS.map(({ id, name, desc, color }) => {
          const status = agentStatus[id] ?? 'idle';
          return (
            <div key={id} style={{
              background: '#171717', border: `1px solid ${status === 'running' ? 'rgba(62,207,142,0.25)' : status === 'error' ? 'rgba(239,68,68,0.25)' : '#262626'}`,
              borderRadius: '14px', padding: '18px 20px',
              display: 'flex', alignItems: 'center', gap: '14px',
              transition: 'border-color 0.3s',
            }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `${color}15`, border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {status === 'running' ? (
                  <Loader2 size={18} color={color} style={{ animation: 'spin 1s linear infinite' }} />
                ) : status === 'done' ? (
                  <CheckCircle2 size={18} color={color} />
                ) : status === 'error' ? (
                  <AlertCircle size={18} color="#ef4444" />
                ) : (
                  <Bot size={18} color={color} />
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: '14px', fontWeight: 700, color: '#fff', margin: '0 0 2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</p>
                <p style={{ fontSize: '13px', color: '#71717a', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{desc}</p>
              </div>
              <StatusBadge status={status} />
            </div>
          );
        })}
      </div>

      {/* Strategic Action Plan (from swarm agent) */}
      {swarmData && !swarmData._raw && (
        <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '16px', padding: '24px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#3ECF8E', margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Zap size={14} /> AI Strategic Action Plan
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
            {[swarmData.priority1, swarmData.priority2, swarmData.priority3].filter(Boolean).map((p, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: '#d4d4d8' }}>
                <span style={{ width: '22px', height: '22px', borderRadius: '6px', background: 'rgba(62,207,142,0.1)', border: '1px solid rgba(62,207,142,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 800, color: '#3ECF8E', flexShrink: 0 }}>{i + 1}</span>
                {p}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {swarmData.estimatedImpact && (
              <div style={{ background: '#121212', borderRadius: '10px', border: '1px solid #1f1f1f', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <TrendingUp size={16} color="#3ECF8E" />
                <div>
                  <p style={{ fontSize: '12px', color: '#71717a', margin: '0 0 2px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Estimated Traffic Lift</p>
                  <p style={{ fontSize: '15px', fontWeight: 800, color: '#3ECF8E', margin: 0 }}>{swarmData.estimatedImpact}</p>
                </div>
              </div>
            )}
            {swarmData.timeToResults && (
              <div style={{ background: '#121212', borderRadius: '10px', border: '1px solid #1f1f1f', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Clock size={16} color="#60a5fa" />
                <div>
                  <p style={{ fontSize: '12px', color: '#71717a', margin: '0 0 2px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Time to Results</p>
                  <p style={{ fontSize: '15px', fontWeight: 800, color: '#60a5fa', margin: 0 }}>{swarmData.timeToResults}</p>
                </div>
              </div>
            )}
          </div>
          {swarmData.agentInsight && (
            <div style={{ marginTop: '16px', background: 'rgba(62,207,142,0.06)', border: '1px solid rgba(62,207,142,0.15)', borderRadius: '10px', padding: '14px 16px' }}>
              <p style={{ fontSize: '14px', color: '#d4d4d8', margin: 0, lineHeight: 1.6 }}>
                <span style={{ color: '#3ECF8E', fontWeight: 700 }}>Swarm Insight: </span>
                {swarmData.agentInsight}
              </p>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
