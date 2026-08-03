import React, { useState } from 'react';
import { Sparkles, Globe, Search, Check } from 'lucide-react';

export default function Navbar({ activeWebsiteUrl, setActiveWebsiteUrl, activeAppTab, setActiveAppTab }) {
  const [inputUrl, setInputUrl] = useState(activeWebsiteUrl || '');
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
      <div className="w-full px-6 flex items-center justify-between h-16 gap-4">
        
        {/* Left: Brand Logo */}
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

        {/* Right: Compact Website Input Field (Placeholder: "Enter your website", Icon CTA: Search Magnifying Glass) */}
        <form onSubmit={handleUpdateWebsite} className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-[#171717] border border-[#262626] rounded-xl px-3 py-1.5 text-sm w-72 sm:w-80 focus-within:border-[#3ECF8E] transition-all shadow-inner">
            <Globe className="w-4 h-4 text-[#3ECF8E] shrink-0" aria-hidden="true" />
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="Enter your website"
              aria-label="Full Website URL Input"
              className="bg-transparent text-white placeholder-zinc-500 text-sm focus:outline-none w-full font-sans"
            />
            {isSaved && (
              <span className="text-xs text-[#3ECF8E] flex items-center gap-0.5 font-bold shrink-0">
                <Check className="w-3.5 h-3.5" />
              </span>
            )}
            
            {/* Search CTA Icon (Magnifying Glass) */}
            <button
              type="submit"
              aria-label="Search and Run AI Automation"
              className="p-2 bg-[#3ECF8E] hover:bg-[#34D399] text-black font-bold rounded-lg shadow-sm shrink-0 transition-all focus-visible:ring-2 focus-visible:ring-[#3ECF8E] focus-visible:outline-none"
            >
              <Search className="w-3.5 h-3.5 text-black stroke-[3]" aria-hidden="true" />
            </button>
          </div>
        </form>

      </div>
    </header>
  );
}
