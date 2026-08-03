import React, { useState } from 'react';
import { Sparkles, Globe, Bot, Play, Check } from 'lucide-react';

export default function Navbar({ activeWebsiteUrl, setActiveWebsiteUrl, activeAppTab, setActiveAppTab }) {
  const [inputUrl, setInputUrl] = useState(activeWebsiteUrl || 'mywebsite.com');
  const [isSaved, setIsSaved] = useState(false);

  const handleUpdateWebsite = (e) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;

    const cleanDomain = inputUrl.replace(/^https?:\/\//, '').replace(/\/.*$/, '') || 'mywebsite.com';
    setActiveWebsiteUrl(cleanDomain);
    setActiveAppTab('swarm');

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <header role="banner" className="sticky top-0 z-50 bg-[#121212]/95 backdrop-blur-xl border-b border-[#262626] w-full">
      <div className="w-full px-6 flex items-center justify-between h-16 gap-6">
        
        {/* Left: Brand Logo (Aligned cleanly on left) */}
        <button
          onClick={() => setActiveAppTab('swarm')}
          aria-label="RankTop AI Home Workspace"
          className="flex items-center gap-3 rounded-lg shrink-0 focus-visible:ring-2 focus-visible:ring-[#3ECF8E] focus-visible:outline-none"
        >
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
        </button>

        {/* Center: Target Website URL Input & Start AI Automation Button */}
        <form onSubmit={handleUpdateWebsite} className="flex items-center gap-2 flex-1 max-w-2xl justify-center">
          <div className="flex items-center gap-2.5 bg-[#171717] border border-[#262626] rounded-xl px-3.5 py-1.5 text-sm w-full max-w-md focus-within:border-[#3ECF8E] transition-all shadow-inner">
            <Globe className="w-4 h-4 text-[#3ECF8E] shrink-0" aria-hidden="true" />
            <span className="text-zinc-500 font-medium hidden md:inline">https://</span>
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="yourwebsite.com"
              aria-label="Target Website URL Input"
              className="bg-transparent text-white placeholder-zinc-500 text-sm focus:outline-none w-full font-sans"
            />
            {isSaved && (
              <span className="text-xs text-[#3ECF8E] flex items-center gap-0.5 font-bold shrink-0">
                <Check className="w-3.5 h-3.5" />
              </span>
            )}
          </div>

          <button
            type="submit"
            aria-label="Start AI Automation"
            className="px-4 py-2 bg-[#3ECF8E] hover:bg-[#34D399] text-black font-bold text-sm rounded-xl shadow-md shadow-[#3ECF8E]/20 flex items-center gap-1.5 shrink-0 transition-all focus-visible:ring-2 focus-visible:ring-[#3ECF8E] focus-visible:outline-none"
          >
            <Play className="w-3.5 h-3.5 fill-black" aria-hidden="true" />
            <span className="hidden sm:inline">Start AI Automation</span>
            <span className="sm:hidden">Start</span>
          </button>
        </form>

        {/* Right: Quick Action Pill (Aligned cleanly on right) */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setActiveAppTab('swarm')}
            aria-label="Open AI Swarm Center"
            className="px-3.5 py-1.5 bg-[#171717] hover:bg-[#262626] text-zinc-200 border border-[#262626] font-semibold text-sm rounded-xl flex items-center gap-2 transition-all focus-visible:ring-2 focus-visible:ring-[#3ECF8E] focus-visible:outline-none"
          >
            <Bot className="w-4 h-4 text-[#3ECF8E]" aria-hidden="true" />
            <span className="hidden md:inline">AI Swarm Center</span>
          </button>
        </div>

      </div>
    </header>
  );
}
