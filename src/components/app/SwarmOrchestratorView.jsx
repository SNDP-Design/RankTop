import React, { useState, useEffect } from 'react';
import { Bot, CheckCircle2, Loader2, AlertCircle, Clock, Zap, TrendingUp, Settings2, Mail, Globe, KeyRound, Power, ExternalLink, Play } from 'lucide-react';
import { useAgents } from '../../context/AgentContext';
import { backendPost, backendGet, getBackendUrl } from '../../config';

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
  const { agentStatus, agentResults, isAnyRunning, websiteUrl, setSettingsOpen, hasApiKey } = useAgents();

  const [backendUrl, setBackendUrl] = useState(getBackendUrl());
  const [email, setEmail] = useState('');
  const [wpUrl, setWpUrl] = useState('');
  const [wpUser, setWpUser] = useState('');
  const [wpPass, setWpPass] = useState('');
  
  const [isLoopActive, setIsLoopActive] = useState(false);
  const [loopHistory, setLoopHistory] = useState([]);
  const [loadingLoop, setLoadingLoop] = useState(false);
  const [msg, setMsg] = useState(null);

  const totalDone    = Object.values(agentStatus).filter((s) => s === 'done').length;
  const totalAgents  = AGENTS.length;
  const swarmData    = agentResults.swarm;
  const domain       = websiteUrl || 'yourwebsite.com';

  useEffect(() => {
    if (!backendUrl || !domain) return;
    backendGet(`/api/agent-loop/status?domain=${encodeURIComponent(domain)}`)
      .then((data) => {
        if (data) {
          setIsLoopActive(Boolean(data.active));
          if (data.history) setLoopHistory(data.history);
          if (data.emailNotifications) setEmail(data.emailNotifications);
        }
      })
      .catch(() => {});
  }, [backendUrl, domain]);

  const handleSaveBackendUrl = (e) => {
    e.preventDefault();
    localStorage.setItem('RANKTOP_BACKEND_URL', backendUrl.trim());
    setMsg({ type: 'success', text: 'Backend URL updated!' });
    setTimeout(() => setMsg(null), 3000);
  };

  const handleToggleAutonomy = async () => {
    if (!backendUrl) {
      setMsg({ type: 'error', text: 'Please configure and save Backend URL first!' });
      return;
    }
    if (!email.trim()) {
      setMsg({ type: 'error', text: 'Please provide an email for notifications!' });
      return;
    }

    setLoadingLoop(true);
    try {
      if (isLoopActive) {
        await backendPost('/api/agent-loop/stop', { domain });
        setIsLoopActive(false);
        setMsg({ type: 'success', text: 'Autonomous loop paused.' });
      } else {
        await backendPost('/api/agent-loop/start', {
          domain,
          email: email.trim(),
          wpSiteUrl: wpUrl.trim(),
          wpUsername: wpUser.trim(),
          wpAppPassword: wpPass.trim(),
        });
        setIsLoopActive(true);
        setMsg({ type: 'success', text: 'Autonomous loop activated! First run triggered.' });
      }
    } catch (err) {
      setMsg({ type: 'error', text: err.message || 'Failed to toggle autonomy.' });
    } finally {
      setLoadingLoop(false);
      setTimeout(() => setMsg(null), 4000);
    }
  };

  const handleRunNow = async () => {
    if (!backendUrl) return;
    setLoadingLoop(true);
    try {
      await backendPost('/api/agent-loop/run-now', { domain });
      setMsg({ type: 'success', text: 'Manual run triggered!' });
    } catch (err) {
      setMsg({ type: 'error', text: err.message || 'Run failed' });
    } finally {
      setLoadingLoop(false);
      setTimeout(() => setMsg(null), 3000);
    }
  };

  return (
    <div className="w-full space-y-6 font-sans">

      {/* Header */}
      <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '16px', padding: '24px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: '99px', background: 'rgba(62,207,142,0.1)', border: '1px solid rgba(62,207,142,0.2)', fontSize: '13px', fontWeight: 700, color: '#3ECF8E', marginBottom: '8px' }}>
            <Bot size={13} /> AI Swarm Orchestrator
          </div>
          <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#fff', margin: '0 0 4px' }}>Autonomous Multi-Agent Swarm</h1>
          <p style={{ fontSize: '14px', color: '#71717a', margin: 0 }}>
            {websiteUrl
              ? `Managing ${totalAgents} agents for ${websiteUrl} — ${totalDone} complete`
              : 'Enter your website URL above to launch all 7 AI agents simultaneously.'}
          </p>
        </div>
        {!hasApiKey() && (
          <button
            onClick={() => setSettingsOpen(true)}
            style={{ padding: '10px 20px', background: '#3ECF8E', color: '#000', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Zap size={15} /> Add Gemini API Key
          </button>
        )}
      </div>

      {/* Message Banner */}
      {msg && (
        <div style={{
          padding: '12px 16px', borderRadius: '12px', fontSize: '14px', fontWeight: 600,
          background: msg.type === 'success' ? 'rgba(62,207,142,0.1)' : 'rgba(239,68,68,0.1)',
          border: `1px solid ${msg.type === 'success' ? 'rgba(62,207,142,0.3)' : 'rgba(239,68,68,0.3)'}`,
          color: msg.type === 'success' ? '#3ECF8E' : '#ef4444',
          display: 'flex', alignItems: 'center', gap: '8px',
        }}>
          {msg.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
          {msg.text}
        </div>
      )}

      {/* Autonomy & Backend Configuration Panel */}
      <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '16px', padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Settings2 size={18} color="#3ECF8E" />
            <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', margin: 0 }}>Full Autonomy & Server Settings</h2>
          </div>
          <button
            onClick={handleToggleAutonomy}
            disabled={loadingLoop}
            style={{
              padding: '10px 20px', borderRadius: '10px', border: 'none', cursor: 'pointer',
              background: isLoopActive ? '#ef4444' : '#3ECF8E', color: isLoopActive ? '#fff' : '#000',
              fontSize: '14px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px',
              opacity: loadingLoop ? 0.7 : 1, transition: 'all 0.15s',
            }}
          >
            {loadingLoop ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Power size={16} />
            )}
            {isLoopActive ? 'Pause Autonomy Loop' : 'Enable 24/7 Full Autonomy'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Backend URL & Email Config */}
          <div className="space-y-4">
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#a1a1aa', marginBottom: '6px' }}>
                Backend Server URL (Render / Railway)
              </label>
              <form onSubmit={handleSaveBackendUrl} style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="url"
                  value={backendUrl}
                  onChange={(e) => setBackendUrl(e.target.value)}
                  placeholder="https://ranktop-backend.onrender.com"
                  style={{ flex: 1, background: '#121212', border: '1px solid #2d2d2d', borderRadius: '8px', padding: '8px 12px', fontSize: '14px', color: '#fff', outline: 'none' }}
                />
                <button type="submit" style={{ padding: '8px 14px', background: '#262626', color: '#fff', border: '1px solid #333', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                  Save
                </button>
              </form>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#a1a1aa', marginBottom: '6px' }}>
                Weekly Email Reports & Alerts Address
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#121212', border: '1px solid #2d2d2d', borderRadius: '8px', padding: '0 12px' }}>
                <Mail size={15} color="#71717a" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@domain.com"
                  style={{ flex: 1, background: 'transparent', border: 'none', padding: '10px 0', fontSize: '14px', color: '#fff', outline: 'none' }}
                />
              </div>
            </div>
          </div>

          {/* WordPress Auto-Publish Credentials */}
          <div className="space-y-3" style={{ background: '#121212', border: '1px solid #222', borderRadius: '12px', padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 700, color: '#3ECF8E', textTransform: 'uppercase' }}>
              <Globe size={14} /> WordPress Auto-Publishing Integration
            </div>
            <input
              type="text"
              value={wpUrl}
              onChange={(e) => setWpUrl(e.target.value)}
              placeholder="WordPress Site URL (https://myblog.com)"
              style={{ width: '100%', background: '#171717', border: '1px solid #2d2d2d', borderRadius: '8px', padding: '8px 12px', fontSize: '13px', color: '#fff', outline: 'none' }}
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={wpUser}
                onChange={(e) => setWpUser(e.target.value)}
                placeholder="WP Username"
                style={{ background: '#171717', border: '1px solid #2d2d2d', borderRadius: '8px', padding: '8px 12px', fontSize: '13px', color: '#fff', outline: 'none' }}
              />
              <input
                type="password"
                value={wpPass}
                onChange={(e) => setWpPass(e.target.value)}
                placeholder="App Password"
                style={{ background: '#171717', border: '1px solid #2d2d2d', borderRadius: '8px', padding: '8px 12px', fontSize: '13px', color: '#fff', outline: 'none' }}
              />
            </div>
          </div>
        </div>

        {isLoopActive && (
          <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #222', display: 'flex', alignItems: 'center', justifyBetween: 'space-between' }}>
            <span style={{ fontSize: '13px', color: '#3ECF8E', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="w-2 h-2 rounded-full bg-[#3ECF8E] animate-pulse" /> Autonomous agent is active and running weekly cron loops.
            </span>
            <button
              onClick={handleRunNow}
              disabled={loadingLoop}
              style={{ padding: '6px 14px', background: '#262626', color: '#3ECF8E', border: '1px solid rgba(62,207,142,0.3)', borderRadius: '6px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <Play size={12} /> Run Loop Now
            </button>
          </div>
        )}
      </div>

      {/* Progress bar (only when active) */}
      {(isAnyRunning || totalDone > 0) && (
        <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '16px', padding: '20px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '14px', fontWeight: 700, color: '#fff' }}>Swarm Execution Progress</span>
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

      {/* Execution History */}
      {loopHistory.length > 0 && (
        <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '16px', padding: '24px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#fff', margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Autonomous Execution History
          </h3>
          <div className="space-y-2">
            {loopHistory.map((item, i) => (
              <div key={i} style={{ background: '#121212', border: '1px solid #222', borderRadius: '8px', padding: '10px 14px', display: 'flex', alignItems: 'center', justifyBetween: 'space-between', fontSize: '13px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: item.result === 'success' ? '#3ECF8E' : '#ef4444', fontWeight: 700 }}>
                    {item.action_type?.toUpperCase()}
                  </span>
                  <span style={{ color: '#a1a1aa' }}>{item.ran_at}</span>
                </div>
                {item.result_url && (
                  <a href={item.result_url} target="_blank" rel="noopener noreferrer" style={{ color: '#3ECF8E', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    View <ExternalLink size={12} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Strategic Action Plan */}
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
