import React, { useState, useEffect } from 'react';
import { Bot, CheckCircle2, Loader2, AlertCircle, Clock, Zap, TrendingUp, Settings2, Mail, Globe, Power, ExternalLink, Play, ShieldAlert, Check, X, Sliders, Database, Link, Share2 } from 'lucide-react';
import { useAgents } from '../../context/AgentContext';
import { backendPost, backendGet, getBackendUrl } from '../../config';
import { SwarmOrchestrator } from '../../agents/SwarmOrchestrator';

const AGENTS = [
  { id: 'orchestrator', name: 'Swarm Orchestrator Manager', desc: 'Coordinating multi-agent DAG workflow & governance', color: '#3ECF8E' },
  { id: 'research',     name: 'Research & Keyword Scout',   desc: 'Finding low-KD, high-intent keyword targets',      color: '#60a5fa' },
  { id: 'competitor',   name: 'Competitor Gap Analyst',     desc: 'Profiling rival domains & missing topic gaps',    color: '#f97316' },
  { id: 'writer',       name: 'Content Creator & Schema Agent',desc: 'Drafting 2,400+ word articles with H2/H3 BLUF',   color: '#a78bfa' },
  { id: 'aeo',          name: 'AEO & LLM Citation Specialist',desc: 'Auditing BLUF answer block density for AI Overviews', color: '#10b981' },
  { id: 'data_citation',name: 'Statistical Data & GEO Injector',desc: 'Injecting verified research stats to boost LLM citations', color: '#06b6d4' },
  { id: 'entity_graph', name: 'Knowledge Graph & Schema Agent',desc: 'Linking entities to Wikidata & Knowledge Graph IDs', color: '#f59e0b' },
  { id: 'link_architect',name: 'Topic Cluster & Link Architect',desc: 'Building pillar-cluster link silos & internal anchors', color: '#ec4899' },
  { id: 'dispatcher',   name: 'CMS Publishing Dispatcher',   desc: 'Pushing payloads to WordPress, Webflow & Ghost APIs', color: '#f43f5e' },
];

function StatusBadge({ status }) {
  const map = {
    IDLE:       { label: 'Idle',       bg: '#1f1f1f', border: '#2d2d2d', color: '#71717a' },
    RUNNING:    { label: 'Working',    bg: 'rgba(62,207,142,0.08)', border: 'rgba(62,207,142,0.25)', color: '#3ECF8E' },
    RESEARCHING:{ label: 'Researching',bg: 'rgba(96,165,250,0.08)', border: 'rgba(96,165,250,0.25)', color: '#60a5fa' },
    CRAWLING:   { label: 'Crawling',   bg: 'rgba(249,115,22,0.08)', border: 'rgba(249,115,22,0.25)', color: '#f97316' },
    DRAFTING:   { label: 'Drafting',   bg: 'rgba(167,139,250,0.08)', border: 'rgba(167,139,250,0.25)', color: '#a78bfa' },
    AUDITING:   { label: 'Auditing',   bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.25)', color: '#10b981' },
    INJECTING:  { label: 'Injecting',  bg: 'rgba(6,182,212,0.08)',  border: 'rgba(6,182,212,0.25)',  color: '#06b6d4' },
    SYNTHESIZING:{label: 'Synthesizing',bg:'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.25)', color: '#f59e0b' },
    ANALYZING:  { label: 'Analyzing',  bg: 'rgba(236,72,153,0.08)', border: 'rgba(236,72,153,0.25)', color: '#ec4899' },
    DISPATCHING:{ label: 'Dispatching',bg: 'rgba(244,63,94,0.08)',  border: 'rgba(244,63,94,0.25)',  color: '#f43f5e' },
    COMPLETED:  { label: 'Completed',  bg: 'rgba(62,207,142,0.08)', border: 'rgba(62,207,142,0.25)', color: '#3ECF8E' },
    PAUSED:     { label: 'Paused',     bg: 'rgba(239,68,68,0.08)',  border: 'rgba(239,68,68,0.25)',  color: '#ef4444' },
  };
  const s = map[status] ?? map.IDLE;
  return (
    <span style={{ padding: '3px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 700, background: s.bg, border: `1px solid ${s.border}`, color: s.color, display: 'flex', alignItems: 'center', gap: '5px', whiteSpace: 'nowrap' }}>
      {['RUNNING','RESEARCHING','CRAWLING','DRAFTING','AUDITING','INJECTING','SYNTHESIZING','ANALYZING','DISPATCHING'].includes(status) && (
        <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: s.color, animation: 'pulse 1s infinite', flexShrink: 0 }} />
      )}
      {status === 'COMPLETED' && <CheckCircle2 size={11} />}
      {status === 'PAUSED' && <AlertCircle size={11} />}
      {status === 'IDLE' && <Clock size={11} />}
      {s.label}
    </span>
  );
}

export default function SwarmOrchestratorView() {
  const { websiteUrl, setSettingsOpen, hasApiKey } = useAgents();

  const [backendUrl, setBackendUrl] = useState(getBackendUrl());
  const [email, setEmail] = useState('');
  const [wpUrl, setWpUrl] = useState('');
  const [wpUser, setWpUser] = useState('');
  const [wpPass, setWpPass] = useState('');

  const [swarmState, setSwarmState] = useState({
    status: 'IDLE',
    mode: 'hitl',
    currentStepIndex: 0,
    agents: {},
    logs: [],
    pendingApproval: null,
  });

  const [orchestratorInstance] = useState(() => new SwarmOrchestrator((state) => setSwarmState(state)));

  const [isLoopActive, setIsLoopActive] = useState(false);
  const [loopHistory, setLoopHistory] = useState([]);
  const [loadingLoop, setLoadingLoop] = useState(false);
  const [msg, setMsg] = useState(null);

  const domain = websiteUrl || 'yourwebsite.com';

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

  const handleStartInteractiveSwarm = () => {
    orchestratorInstance.runFullAutopilotSwarm(domain);
  };

  const handleApproveGate = () => {
    orchestratorInstance.approvePendingTask();
  };

  const handleRejectGate = () => {
    orchestratorInstance.rejectPendingTask('User requested revision');
  };

  const handleToggleMode = (newMode) => {
    orchestratorInstance.setMode(newMode);
  };

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

  const pendingApproval = swarmState.pendingApproval;

  return (
    <div className="w-full space-y-6 font-sans">

      {/* Header */}
      <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '16px', padding: '24px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: '99px', background: 'rgba(62,207,142,0.1)', border: '1px solid rgba(62,207,142,0.2)', fontSize: '13px', fontWeight: 700, color: '#3ECF8E', marginBottom: '8px' }}>
            <Bot size={13} /> Autonomous Swarm Platform
          </div>
          <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#fff', margin: '0 0 4px' }}>Autonomous Swarm AI Agents (SEO / AEO / GEO)</h1>
          <p style={{ fontSize: '14px', color: '#71717a', margin: 0 }}>
            9 specialized AI agents continuously audit, research, draft, optimize, and publish for {domain}.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={handleStartInteractiveSwarm}
            disabled={swarmState.status === 'RUNNING' || swarmState.status === 'AWAITING_APPROVAL'}
            style={{
              padding: '10px 20px', background: '#3ECF8E', color: '#000', border: 'none', borderRadius: '10px',
              fontSize: '14px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
              opacity: (swarmState.status === 'RUNNING' || swarmState.status === 'AWAITING_APPROVAL') ? 0.6 : 1
            }}
          >
            <Play size={15} /> Launch Swarm Cycle
          </button>

          {!hasApiKey() && (
            <button
              onClick={() => setSettingsOpen(true)}
              style={{ padding: '10px 16px', background: '#262626', color: '#3ECF8E', border: '1px solid #333', borderRadius: '10px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Zap size={15} /> API Key
            </button>
          )}
        </div>
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

      {/* Governance Mode & Control Panel */}
      <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '16px', padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Sliders size={18} color="#3ECF8E" />
          <div>
            <p style={{ fontSize: '14px', fontWeight: 700, color: '#fff', margin: 0 }}>Human-in-the-Loop Governance Control</p>
            <p style={{ fontSize: '12px', color: '#71717a', margin: 0 }}>Choose how much control the human operator retains during swarm execution.</p>
          </div>
        </div>

        <div style={{ display: 'flex', background: '#121212', padding: '4px', borderRadius: '10px', border: '1px solid #282828' }}>
          <button
            onClick={() => handleToggleMode('hitl')}
            style={{
              padding: '6px 14px', borderRadius: '8px', border: 'none', fontSize: '13px', fontWeight: 700, cursor: 'pointer',
              background: swarmState.mode === 'hitl' ? '#3ECF8E' : 'transparent',
              color: swarmState.mode === 'hitl' ? '#000' : '#71717a', transition: 'all 0.15s'
            }}
          >
            🛡️ HITL Guardrail Mode
          </button>
          <button
            onClick={() => handleToggleMode('autopilot')}
            style={{
              padding: '6px 14px', borderRadius: '8px', border: 'none', fontSize: '13px', fontWeight: 700, cursor: 'pointer',
              background: swarmState.mode === 'autopilot' ? '#3ECF8E' : 'transparent',
              color: swarmState.mode === 'autopilot' ? '#000' : '#71717a', transition: 'all 0.15s'
            }}
          >
            ⚡ Full Autopilot Mode
          </button>
        </div>
      </div>

      {/* PENDING HITL APPROVAL GATE CARD */}
      {pendingApproval && (
        <div style={{
          background: 'linear-gradient(135deg, rgba(62,207,142,0.08) 0%, rgba(16,185,129,0.02) 100%)',
          border: '1.5px solid rgba(62,207,142,0.4)', borderRadius: '16px', padding: '24px',
          boxShadow: '0 8px 32px rgba(62,207,142,0.08)', animation: 'fadeIn 0.3s ease'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldAlert size={20} color="#3ECF8E" />
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#3ECF8E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Human-in-the-Loop Review Required
              </span>
            </div>
            <span style={{ fontSize: '12px', background: 'rgba(62,207,142,0.15)', color: '#3ECF8E', padding: '2px 8px', borderRadius: '6px', fontWeight: 700 }}>
              Gate: {pendingApproval.gate}
            </span>
          </div>

          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#fff', margin: '0 0 6px' }}>{pendingApproval.title}</h3>
          <p style={{ fontSize: '14px', color: '#a1a1aa', margin: '0 0 16px', lineHeight: 1.5, whitespace: 'pre-line' }}>
            {pendingApproval.description}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={handleApproveGate}
              style={{
                padding: '10px 22px', background: '#3ECF8E', color: '#000', border: 'none', borderRadius: '10px',
                fontSize: '14px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px'
              }}
            >
              <Check size={16} /> Approve & Continue Swarm
            </button>
            <button
              onClick={handleRejectGate}
              style={{
                padding: '10px 18px', background: '#262626', color: '#ef4444', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '10px',
                fontSize: '14px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px'
              }}
            >
              <X size={16} /> Reject & Pause
            </button>
          </div>
        </div>
      )}

      {/* 9 Agent Grid Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {AGENTS.map(({ id, name, desc, color }) => {
          const agentObj = swarmState.agents[id] || {};
          const status = agentObj.state ?? 'IDLE';
          const activeTask = agentObj.activeTask || desc;
          const isWorking = ['RUNNING','RESEARCHING','CRAWLING','DRAFTING','AUDITING','INJECTING','SYNTHESIZING','ANALYZING','DISPATCHING'].includes(status);

          return (
            <div key={id} style={{
              background: '#171717', border: `1px solid ${isWorking ? 'rgba(62,207,142,0.3)' : status === 'COMPLETED' ? 'rgba(62,207,142,0.2)' : '#262626'}`,
              borderRadius: '14px', padding: '16px 18px', display: 'flex', flexDirection: 'column', justifyBetween: 'space-between', gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: `${color}15`, border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {isWorking ? (
                    <Loader2 size={16} color={color} style={{ animation: 'spin 1s linear infinite' }} />
                  ) : status === 'COMPLETED' ? (
                    <CheckCircle2 size={16} color={color} />
                  ) : (
                    <Bot size={16} color={color} />
                  )}
                </div>
                <StatusBadge status={status} />
              </div>

              <div>
                <p style={{ fontSize: '13px', fontWeight: 700, color: '#fff', margin: '0 0 2px' }}>{name}</p>
                <p style={{ fontSize: '12px', color: '#71717a', margin: 0, lineHeight: 1.4 }}>{activeTask}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Swarm Live Telemetry Log */}
      {swarmState.logs.length > 0 && (
        <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '16px', padding: '20px 24px' }}>
          <h3 style={{ fontSize: '13px', fontWeight: 800, color: '#3ECF8E', margin: '0 0 14px', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Zap size={14} /> Live Swarm Telemetry & Inter-Agent Bus
          </h3>

          <div style={{ maxHeight: '260px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', paddingRight: '4px' }}>
            {swarmState.logs.map((log) => (
              <div key={log.id} style={{ background: '#121212', border: '1px solid #222', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{ fontSize: '11px', color: '#71717a', fontFamily: 'monospace', flexShrink: 0 }}>{log.timestamp}</span>
                <span style={{ fontWeight: 700, color: '#3ECF8E', flexShrink: 0 }}>[{log.senderName}] → [{log.receiverName}]</span>
                <span style={{ color: log.type === 'warning' ? '#ef4444' : log.type === 'success' ? '#3ECF8E' : '#d4d4d8', flex: 1 }}>{log.message}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Server & Backend Connection Panel */}
      <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '16px', padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Settings2 size={18} color="#3ECF8E" />
            <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', margin: 0 }}>Continuous Autonomy Engine & Server Integrations</h2>
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
            {loadingLoop ? <Loader2 size={16} className="animate-spin" /> : <Power size={16} />}
            {isLoopActive ? 'Pause Continuous Loop' : 'Enable 24/7 Continuous Loop'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#a1a1aa', marginBottom: '6px' }}>
                Backend Server URL
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
                Email Reports & HITL Notifications Address
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

          <div className="space-y-3" style={{ background: '#121212', border: '1px solid #222', borderRadius: '12px', padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 700, color: '#3ECF8E', textTransform: 'uppercase' }}>
              <Globe size={14} /> Direct CMS Auto-Publishing (WordPress)
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
      </div>

    </div>
  );
}

