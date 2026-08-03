import React from 'react';
import { Sparkles, Globe, Bot, RefreshCw } from 'lucide-react';

export default function Navbar({ activeWebsiteUrl, onResetWebsiteUrl, activeAppTab, setActiveAppTab }) {
  return (
    <header role="banner" className="sticky top-0 z-50 bg-[#121212]/95 backdrop-blur-xl border-b border-[#262626]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo - RankTop in Supabase Theme */}
          <button
            onClick={() => setActiveAppTab('swarm')}
            aria-label="RankTop AI Home Workspace"
            className="flex items-center gap-3 rounded-lg focus-visible:ring-2 focus-visible:ring-[#3ECF8E] focus-visible:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-[#3ECF8E]/10 border border-[#3ECF8E]/30 flex items-center justify-center shadow-lg shadow-[#3ECF8E]/20">
              <Sparkles className="w-5 h-5 text-[#3ECF8E]" aria-hidden="true" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1 font-sans">
                RankTop<span className="text-[#3ECF8E] text-sm font-semibold bg-[#3ECF8E]/10 px-2 py-0.5 rounded border border-[#3ECF8E]/20">.ai</span>
              </span>
            </div>
          </button>

          {/* Active Workspace Banner & Change URL Button */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-[#171717] border border-[#262626] rounded-full px-3.5 py-1 text-sm">
              <span className="text-zinc-400">Target Site:</span>
              <span className="text-white font-semibold flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-[#3ECF8E]" aria-hidden="true" /> {activeWebsiteUrl}
              </span>
              <button
                onClick={onResetWebsiteUrl}
                aria-label="Change target website URL"
                className="ml-2 text-xs text-[#3ECF8E] hover:underline flex items-center gap-1 font-medium focus-visible:ring-2 focus-visible:ring-[#3ECF8E] focus-visible:outline-none rounded"
              >
                <RefreshCw className="w-3 h-3 text-[#3ECF8E]" />
                <span>Change URL</span>
              </button>
            </div>

            <button
              onClick={() => setActiveAppTab('swarm')}
              aria-label="Open AI Swarm Engine"
              className="hidden sm:flex px-4 py-2 bg-[#3ECF8E] hover:bg-[#34D399] text-black font-bold text-sm rounded-lg shadow-md shadow-[#3ECF8E]/20 items-center gap-2 transition-all focus-visible:ring-2 focus-visible:ring-[#3ECF8E] focus-visible:outline-none"
            >
              <Bot className="w-4 h-4 text-black" aria-hidden="true" />
              <span>AI Swarm Engine</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
