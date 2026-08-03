import React, { useState, useEffect } from 'react';
import { Sparkles, Globe, Search, Check, Settings } from 'lucide-react';
import { useAgents } from '../context/AgentContext';

export default function Navbar() {
  const { triggerAllAgents, isAnyRunning, agentStatus, setSettingsOpen, hasApiKey } = useAgents();
  const [inputUrl, setInputUrl] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [apiActive, setApiActive] = useState(false);

  // Check API key status on mount and when modal closes
  useEffect(() => {
    setApiActive(hasApiKey());
  }, [hasApiKey]);

  // Re-check after modal might have saved a key
  useEffect(() => {
    const interval = setInterval(() => {
      setApiActive(hasApiKey());
    }, 500);
    return () => clearInterval(interval);
  }, [hasApiKey]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
    await triggerAllAgents(inputUrl.trim());
  };

  const runningCount = Object.values(agentStatus).filter((s) => s === 'running').length;
  const doneCount = Object.values(agentStatus).filter((s) => s === 'done').length;

  return (
    <header
      role="banner"
      className="bg-[#121212]/95 backdrop-blur-xl border-b border-[#262626] w-full"
      style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '64px', zIndex: 50 }}
    >
      <div className="w-full px-6 flex items-center justify-between h-16 gap-4">

        {/* Left: Brand Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-[#3ECF8E]/10 border border-[#3ECF8E]/30 flex items-center justify-center shadow-lg shadow-[#3ECF8E]/20">
            <Sparkles className="w-5 h-5 text-[#3ECF8E]" aria-hidden="true" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-xl tracking-tight text-white font-sans">
              RankTop
            </span>
            <span className="text-[#3ECF8E] text-xs font-bold bg-[#3ECF8E]/10 px-2 py-0.5 rounded border border-[#3ECF8E]/20">
              .ai
            </span>
          </div>
        </div>

        {/* Center: Agent status ticker (only when running) */}
        {isAnyRunning && (
          <div className="hidden sm:flex items-center gap-2 text-sm text-zinc-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-[#3ECF8E] animate-pulse shrink-0" />
            {runningCount > 0
              ? <span>{runningCount} agent{runningCount !== 1 ? 's' : ''} running…</span>
              : <span className="text-[#3ECF8E]">{doneCount} agents complete ✓</span>
            }
          </div>
        )}

        {/* Right: URL input + Settings */}
        <div className="flex items-center gap-2">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-[#171717] border border-[#262626] rounded-xl px-3 py-1.5 text-sm w-64 sm:w-80 focus-within:border-zinc-500 transition-all">
              <Globe className="w-4 h-4 text-zinc-500 shrink-0" aria-hidden="true" />
              <input
                type="text"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                placeholder="Enter your website URL"
                aria-label="Website URL — triggers all AI agents"
                className="bg-transparent text-zinc-300 placeholder-zinc-500 text-sm focus:outline-none w-full font-sans font-medium"
              />
              {submitted && (
                <Check className="w-3.5 h-3.5 text-[#3ECF8E] shrink-0" />
              )}
              <button
                type="submit"
                aria-label="Run all AI agents"
                disabled={isAnyRunning || !inputUrl.trim()}
                className="p-1.5 bg-[#262626] hover:bg-[#333] text-zinc-400 hover:text-white rounded-lg border border-[#333] shrink-0 transition-all focus-visible:ring-2 focus-visible:ring-[#3ECF8E] focus-visible:outline-none disabled:opacity-40"
              >
                {isAnyRunning
                  ? <span className="w-3.5 h-3.5 border-2 border-zinc-500 border-t-[#3ECF8E] rounded-full animate-spin block" />
                  : <Search className="w-3.5 h-3.5" aria-hidden="true" />
                }
              </button>
            </div>
          </form>

          {/* Settings / API Key Button */}
          <button
            onClick={() => setSettingsOpen(true)}
            aria-label="API Key Settings"
            title={apiActive ? 'Gemini API Key Active' : 'Add Gemini API Key to activate agents'}
            style={{
              position: 'relative',
              width: '36px', height: '36px', borderRadius: '10px',
              background: '#1a1a1a', border: `1px solid ${apiActive ? 'rgba(62,207,142,0.3)' : '#2d2d2d'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'all 0.15s', flexShrink: 0,
              color: apiActive ? '#3ECF8E' : '#71717a',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#222'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#1a1a1a'; }}
          >
            <Settings size={15} />
            {/* Green dot when API key is active */}
            {apiActive && (
              <span style={{
                position: 'absolute', top: '6px', right: '6px',
                width: '7px', height: '7px', borderRadius: '50%',
                background: '#3ECF8E', border: '1.5px solid #121212',
              }} />
            )}
            {/* Pulsing amber dot when no key */}
            {!apiActive && (
              <span style={{
                position: 'absolute', top: '6px', right: '6px',
                width: '7px', height: '7px', borderRadius: '50%',
                background: '#f59e0b', border: '1.5px solid #121212',
                animation: 'pulse 2s infinite',
              }} />
            )}
          </button>
        </div>

      </div>
    </header>
  );
}
