import React from 'react';
import { Sparkles, Globe, Cpu, Bot } from 'lucide-react';

export default function Navbar({ activeAppTab, setActiveAppTab }) {
  return (
    <header className="sticky top-0 z-50 bg-[#0B0F17]/90 backdrop-blur-xl border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo - RankTop */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveAppTab('swarm')}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-brand-400 flex items-center justify-center shadow-lg shadow-brand-500/25">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1 font-outfit">
                RankTop<span className="text-brand-500 font-mono text-xs font-semibold bg-brand-500/10 px-1.5 py-0.5 rounded border border-brand-500/20">.ai</span>
              </span>
            </div>
          </div>

          {/* Active Workspace Banner */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-full px-3 py-1 text-xs">
              <span className="text-slate-400">Workspace:</span>
              <span className="text-white font-semibold flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-brand-500" /> mywebsite.com
              </span>
              <span className="bg-emerald-500/10 text-emerald-400 text-[10px] px-2 py-0.5 rounded-full border border-emerald-500/20 font-medium">ADK Swarm Active</span>
            </div>

            <button
              onClick={() => setActiveAppTab('swarm')}
              className="px-3.5 py-1.5 bg-brand-500 hover:bg-brand-400 text-white font-bold text-xs rounded-lg shadow flex items-center gap-1.5 transition-all"
            >
              <Bot className="w-3.5 h-3.5" />
              <span>AI Swarm Engine</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
