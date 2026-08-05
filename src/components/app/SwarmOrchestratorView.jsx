import React, { useState, useEffect } from 'react';
import { Bot, CheckCircle2, Loader2, AlertCircle, Clock, Zap, Settings2, Mail, Globe, Power, ExternalLink, Play, ShieldAlert, Check, X, Sliders, HelpCircle, ArrowRight, Sparkles, Layers, FileText, Search } from 'lucide-react';
import { useAgents } from '../../context/AgentContext';
import { backendPost, backendGet, getBackendUrl } from '../../config';
import { SwarmOrchestrator } from '../../agents/SwarmOrchestrator';

// Beginner-friendly non-technical agent definitions
const AGENTS = [
  { id: 'orchestrator', name: '👑 Swarm Manager Agent',    desc: 'Coordinates all subagents & manages approval gates', color: '#3ECF8E' },
  { id: 'research',     name: '🔍 Keyword Finder Agent',   desc: 'Discovers high-traffic, low-competition target topics', color: '#60a5fa' },
  { id: 'competitor',   name: '🕵️‍♂️ Competitor Spy Agent',   desc: 'Finds missing topics that rival websites missed',    color: '#f97316' },
  { id: 'writer',       name: '✍️ Content Writer Agent',   desc: 'Drafts comprehensive 2,400+ word guides & articles',  color: '#a78bfa' },
  { id: 'aeo',          name: '🤖 AI Answer Specialist',   desc: 'Optimizes answers for ChatGPT, Gemini & Perplexity',   color: '#10b981' },
  { id: 'data_citation',name: '📈 Facts & Stats Injector', desc: 'Adds verified research stats to boost AI citation rate',color: '#06b6d4' },
  { id: 'entity_graph', name: '🕸️ Knowledge Graph Agent', desc: 'Connects your brand topics to Wikidata & Google Graphs',color: '#f59e0b' },
  { id: 'link_architect',name: '🔗 Topic Link Architect',  desc: 'Creates smart internal links between related posts',   color: '#ec4899' },
  { id: 'dispatcher',   name: '🚀 WordPress Publisher',   desc: 'Publishes finalized articles directly to your website', color: '#f43f5e' },
  { id: 'backlinker',   name: '🧲 Backlink & Outreach Agent', desc: 'Prospects high-DR blogs & crafts personalized outreach pitches', color: '#8b5cf6' },
  { id: 'llm_benchmarker',name: '📡 Live LLM Citation Agent', desc: 'Simulates ChatGPT, Perplexity & Gemini query citation rank', color: '#34d399' },
  { id: 'community_amplifier',name: '💬 Reddit & Forum GEO Agent', desc: 'Finds Reddit/Quora threads cited in LLM search cards', color: '#f97316' },
  { id: 'decay_repairman',name: '⚡ Content Freshness Agent', desc: 'Fixes content decay & auto-updates dateModified schema', color: '#f43f5e' },
  { id: 'som_tracker',   name: '🏆 Share of Model (SoM) Agent', desc: 'Tracks LLM recommendation share across commercial buyer queries', color: '#f59e0b' },
  { id: 'silo_architect',name: '🏰 Autonomous Silo Agent', desc: 'Builds tight topic silos & injects contextual internal anchor links', color: '#10b981' },
  { id: 'schema_engineer',name: '📜 Deep RAG Schema Agent', desc: 'Synthesizes nested JSON-LD schema engineered for RAG vectorization', color: '#6366f1' },
];

function StatusBadge({ status }) {
  const map = {
    IDLE:       { label: 'Ready',       bg: '#1f1f1f', border: '#2d2d2d', color: '#71717a' },
    RUNNING:    { label: 'Working',     bg: 'rgba(62,207,142,0.08)', border: 'rgba(62,207,142,0.25)', color: '#3ECF8E' },
    RESEARCHING:{ label: 'Finding Topics',bg:'rgba(96,165,250,0.08)', border: 'rgba(96,165,250,0.25)', color: '#60a5fa' },
    CRAWLING:   { label: 'Auditing Rivals',bg:'rgba(249,115,22,0.08)', border: 'rgba(249,115,22,0.25)', color: '#f97316' },
    DRAFTING:   { label: 'Writing Article',bg:'rgba(167,139,250,0.08)', border: 'rgba(167,139,250,0.25)', color: '#a78bfa' },
    AUDITING:   { label: 'AI Overview Test',bg:'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.25)', color: '#10b981' },
    INJECTING:  { label: 'Adding Facts', bg: 'rgba(6,182,212,0.08)',  border: 'rgba(6,182,212,0.25)',  color: '#06b6d4' },
    SYNTHESIZING:{label: 'Building Schema',bg:'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.25)', color: '#f59e0b' },
    ANALYZING:  { label: 'Mapping Links',bg: 'rgba(236,72,153,0.08)', border: 'rgba(236,72,153,0.25)', color: '#ec4899' },
    DISPATCHING:{ label: 'Publishing',  bg: 'rgba(244,63,94,0.08)',  border: 'rgba(244,63,94,0.25)',  color: '#f43f5e' },
    PROSPECTING:{ label: 'Finding Links',bg: 'rgba(139,92,246,0.08)', border: 'rgba(139,92,246,0.25)', color: '#8b5cf6' },
    OUTREACHING:{ label: 'Drafting Emails',bg:'rgba(168,85,247,0.08)', border: 'rgba(168,85,247,0.25)', color: '#a855f7' },
    BENCHMARKING:{label: 'Testing LLM Citation',bg:'rgba(52,211,153,0.08)', border:'rgba(52,211,153,0.25)', color: '#34d399' },
    AMPLIFYING: { label: 'Reddit GEO Post',bg:'rgba(249,115,22,0.08)', border:'rgba(249,115,22,0.25)', color: '#f97316' },
    REPAIRING:  { label: 'Freshness Repair',bg:'rgba(244,63,94,0.08)', border:'rgba(244,63,94,0.25)', color: '#f43f5e' },
    TRACKING_SOM:{label: 'Tracking SoM Share',bg:'rgba(245,158,11,0.08)', border:'rgba(245,158,11,0.25)', color: '#f59e0b' },
    SILOING:    { label: 'Interlinking Silos',bg:'rgba(16,185,129,0.08)', border:'rgba(16,185,129,0.25)', color: '#10b981' },
    ENGINEERING_SCHEMA:{label:'Vector RAG Schema',bg:'rgba(99,102,241,0.08)', border:'rgba(99,102,241,0.25)', color: '#6366f1' },
    COMPLETED:  { label: 'Done ✓',      bg: 'rgba(62,207,142,0.08)', border: 'rgba(62,207,142,0.25)', color: '#3ECF8E' },
    PAUSED:     { label: 'Waiting Review',bg:'rgba(239,68,68,0.08)',  border: 'rgba(239,68,68,0.25)',  color: '#ef4444' },
  };
  const s = map[status] ?? map.IDLE;
  return (
    <span style={{ padding: '3px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 700, background: s.bg, border: `1px solid ${s.border}`, color: s.color, display: 'flex', alignItems: 'center', gap: '5px', whiteSpace: 'nowrap' }}>
      {['RUNNING','RESEARCHING','CRAWLING','DRAFTING','AUDITING','INJECTING','SYNTHESIZING','ANALYZING','DISPATCHING','PROSPECTING','OUTREACHING','BENCHMARKING','AMPLIFYING','REPAIRING','TRACKING_SOM','SILOING','ENGINEERING_SCHEMA'].includes(status) && (
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
  const { websiteUrl, triggerAllAgents, setSettingsOpen, hasApiKey } = useAgents();

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

  const [customGoal, setCustomGoal] = useState('Outrank rival domains in Perplexity Pro & ChatGPT Search for high-intent queries');
  const [orchestratorInstance] = useState(() => new SwarmOrchestrator((state) => setSwarmState(state)));

  const [isLoopActive, setIsLoopActive] = useState(false);
  const [loadingLoop, setLoadingLoop] = useState(false);
  const [msg, setMsg] = useState(null);

  const domain = websiteUrl || 'yourwebsite.com';

  useEffect(() => {
    if (!backendUrl || !domain) return;
    backendGet(`/api/agent-loop/status?domain=${encodeURIComponent(domain)}`)
      .then((data) => {
        if (data) {
          setIsLoopActive(Boolean(data.active));
          if (data.emailNotifications) setEmail(data.emailNotifications);
        }
      })
      .catch(() => {});
  }, [backendUrl, domain]);

  const handleStartInteractiveSwarm = (targetDomain = domain) => {
    orchestratorInstance.runFullAutopilotSwarm(targetDomain);
  };

  const handleRunGoal = (e) => {
    e.preventDefault();
    if (!customGoal.trim()) return;
    orchestratorInstance.runCustomStrategicGoal(customGoal.trim(), domain);
  };

  const handleSampleClick = (sampleDomain) => {
    triggerAllAgents(sampleDomain);
    handleStartInteractiveSwarm(sampleDomain);
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
    setMsg({ type: 'success', text: 'Server connection updated successfully!' });
    setTimeout(() => setMsg(null), 3000);
  };

  const handleToggleAutonomy = async () => {
    if (!backendUrl) {
      setMsg({ type: 'error', text: 'Please save your Backend Server URL first!' });
      return;
    }
    if (!email.trim()) {
      setMsg({ type: 'error', text: 'Please enter your email address for updates!' });
      return;
    }

    setLoadingLoop(true);
    try {
      if (isLoopActive) {
        await backendPost('/api/agent-loop/stop', { domain });
        setIsLoopActive(false);
        setMsg({ type: 'success', text: 'Automated 24/7 loop paused.' });
      } else {
        await backendPost('/api/agent-loop/start', {
          domain,
          email: email.trim(),
          wpSiteUrl: wpUrl.trim(),
          wpUsername: wpUser.trim(),
          wpAppPassword: wpPass.trim(),
        });
        setIsLoopActive(true);
        setMsg({ type: 'success', text: '24/7 Autopilot activated! First automated cycle started.' });
      }
    } catch (err) {
      setMsg({ type: 'error', text: err.message || 'Failed to toggle autopilot.' });
    } finally {
      setLoadingLoop(false);
      setTimeout(() => setMsg(null), 4000);
    }
  };

  const pendingApproval = swarmState.pendingApproval;

  return (
    <div className="w-full space-y-6 font-sans">

      {/* Beginner Header */}
      <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '16px', padding: '24px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: '99px', background: 'rgba(62,207,142,0.1)', border: '1px solid rgba(62,207,142,0.2)', fontSize: '13px', fontWeight: 700, color: '#3ECF8E', marginBottom: '8px' }}>
            <Sparkles size={13} /> 16-Agent Autonomous AI Engine
          </div>
          <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#fff', margin: '0 0 4px' }}>16-Agent Autonomous Engine for {domain}</h1>
          <p style={{ fontSize: '14px', color: '#71717a', margin: 0, maxWidth: '640px', lineHeight: 1.5 }}>
            16 specialized AI agents research target topics, analyze rivals, draft articles, optimize for Google & Perplexity, and execute 24/7 off-page link building.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => handleStartInteractiveSwarm(domain)}
            disabled={swarmState.status === 'RUNNING' || swarmState.status === 'AWAITING_APPROVAL'}
            style={{
              padding: '10px 20px', background: '#3ECF8E', color: '#000', border: 'none', borderRadius: '10px',
              fontSize: '14px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
              opacity: (swarmState.status === 'RUNNING' || swarmState.status === 'AWAITING_APPROVAL') ? 0.6 : 1
            }}
          >
            <Play size={15} /> Launch Full 16-Agent Swarm
          </button>

          {!hasApiKey() && (
            <button
              onClick={() => setSettingsOpen(true)}
              style={{ padding: '10px 16px', background: '#262626', color: '#3ECF8E', border: '1px solid #333', borderRadius: '10px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Zap size={15} /> Add API Key
            </button>
          )}
        </div>
      </div>

      {/* Strategic AI Goal Dispatcher Card */}
      <div style={{ background: 'linear-gradient(135deg, rgba(62,207,142,0.06) 0%, rgba(139,92,246,0.06) 100%)', border: '1px solid rgba(62,207,142,0.25)', borderRadius: '16px', padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <Sparkles size={18} color="#3ECF8E" />
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#fff', margin: 0 }}>
            Assign Custom Strategic Goal to the 16-Agent Engine
          </h3>
        </div>
        <p style={{ fontSize: '13px', color: '#a1a1aa', margin: '0 0 14px' }}>
          Prompt the Manager Agent with any objective. The 16 agents will autonomously decompose it into subtasks and execute across SEO, GEO, and AEO.
        </p>

        <form onSubmit={handleRunGoal} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input
            type="text"
            value={customGoal}
            onChange={(e) => setCustomGoal(e.target.value)}
            placeholder="e.g. Outrank rival domains in Perplexity Pro & ChatGPT Search for high-intent AI queries"
            style={{
              flex: 1, minWidth: '280px', background: '#121212', border: '1px solid #333',
              borderRadius: '10px', padding: '10px 14px', color: '#fff', fontSize: '13px', outline: 'none'
            }}
          />
          <button
            type="submit"
            disabled={swarmState.status === 'RUNNING'}
            style={{
              background: 'linear-gradient(135deg, #3ECF8E 0%, #059669 100%)', color: '#000',
              border: 'none', padding: '10px 18px', borderRadius: '10px', fontWeight: 800, fontSize: '13px',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px'
            }}
          >
            <Zap size={14} /> Dispatch Strategic Goal
          </button>
        </form>
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



      {/* Human Approval vs Autopilot Governance Switch */}
      <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '16px', padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Sliders size={18} color="#3ECF8E" />
          <div>
            <p style={{ fontSize: '14px', fontWeight: 700, color: '#fff', margin: 0 }}>Publishing Guardrail Control</p>
            <p style={{ fontSize: '12px', color: '#71717a', margin: 0 }}>Choose if the AI should ask for your approval before publishing content.</p>
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
            🛡️ Human Review Mode (Ask Me First)
          </button>
          <button
            onClick={() => handleToggleMode('autopilot')}
            style={{
              padding: '6px 14px', borderRadius: '8px', border: 'none', fontSize: '13px', fontWeight: 700, cursor: 'pointer',
              background: swarmState.mode === 'autopilot' ? '#3ECF8E' : 'transparent',
              color: swarmState.mode === 'autopilot' ? '#000' : '#71717a', transition: 'all 0.15s'
            }}
          >
            ⚡ Hands-Free Autopilot Mode
          </button>
        </div>
      </div>

      {/* PENDING HUMAN APPROVAL CARD */}
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
                Human Approval Gate Active
              </span>
            </div>
            <span style={{ fontSize: '12px', background: 'rgba(62,207,142,0.15)', color: '#3ECF8E', padding: '2px 8px', borderRadius: '6px', fontWeight: 700 }}>
              Action Required
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
              <Check size={16} /> YES, Approve & Execute Next Step
            </button>
            <button
              onClick={handleRejectGate}
              style={{
                padding: '10px 18px', background: '#262626', color: '#ef4444', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '10px',
                fontSize: '14px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px'
              }}
            >
              <X size={16} /> NO, Make Changes First
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

      {/* Swarm Live Log Activity */}
      {swarmState.logs.length > 0 && (
        <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '16px', padding: '20px 24px' }}>
          <h3 style={{ fontSize: '13px', fontWeight: 800, color: '#3ECF8E', margin: '0 0 14px', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Zap size={14} /> Live AI Team Activity Log
          </h3>

          <div style={{ maxHeight: '240px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', paddingRight: '4px' }}>
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



    </div>
  );
}


