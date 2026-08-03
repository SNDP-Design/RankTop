import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Target, 
  FileText, 
  Cpu, 
  Search, 
  Share2, 
  Wrench, 
  Globe, 
  Sparkles,
  ShieldCheck,
  Bot,
  Play,
  Check
} from 'lucide-react';

export default function AppSidebar({ activeWebsiteUrl, setActiveWebsiteUrl, activeTab, setActiveTab }) {
  const [inputUrl, setInputUrl] = useState(activeWebsiteUrl || 'mywebsite.com');
  const [isSaved, setIsSaved] = useState(false);

  const menuCategories = [
    {
      category: 'AUTOMATION',
      items: [
        { id: 'swarm', label: 'AI Automation Center', icon: Bot },
        { id: 'dashboard', label: 'Search Traffic & Rankings', icon: LayoutDashboard },
      ]
    },
    {
      category: 'RANKING & CONTENT',
      items: [
        { id: 'strategy', label: 'Keywords & Topics', icon: Target },
        { id: 'studio', label: 'AI Article Generator', icon: FileText },
        { id: 'competitors', label: 'Competitor Ranking Gaps', icon: Search },
        { id: 'cms', label: 'Auto-Publish to Website', icon: Share2 },
      ]
    },
    {
      category: 'AI SEARCH OPTIMIZATION',
      items: [
        { id: 'aeo', label: 'Google AI Overview Inspector', icon: Cpu },
        { id: 'geo', label: 'ChatGPT & Claude Visibility', icon: ShieldCheck },
        { id: 'freetools', label: 'Handy SEO Utilities', icon: Wrench },
      ]
    }
  ];

  const handleUpdateWebsite = (e) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;

    const cleanDomain = inputUrl.replace(/^https?:\/\//, '').replace(/\/.*$/, '') || 'mywebsite.com';
    setActiveWebsiteUrl(cleanDomain);
    setActiveTab('swarm');

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <aside 
      aria-label="Sidebar Navigation"
      className="w-64 bg-[#171717] border-r border-[#262626] flex flex-col justify-between shrink-0 h-[calc(100vh-64px)] sticky top-16 overflow-hidden select-none"
    >
      {/* Top Section */}
      <div className="p-3.5 space-y-3 flex-1 flex flex-col overflow-hidden">
        
        {/* Interactive Website URL Input Field */}
        <div className="p-3 bg-[#121212] rounded-xl border border-[#262626] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-zinc-400 font-bold flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#3ECF8E]" aria-hidden="true" />
              Target Website
            </span>
            {isSaved && (
              <span className="text-xs text-[#3ECF8E] flex items-center gap-0.5 font-bold">
                <Check className="w-3 h-3" /> Updated
              </span>
            )}
          </div>

          <form onSubmit={handleUpdateWebsite} className="space-y-2">
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="e.g. mywebsite.com"
              aria-label="Target Website URL Input"
              className="w-full bg-[#171717] border border-[#262626] rounded-lg px-2.5 py-1.5 text-sm text-white focus:outline-none focus:border-[#3ECF8E] font-sans"
            />
            <button
              type="submit"
              className="w-full py-1.5 bg-[#3ECF8E] hover:bg-[#34D399] text-black font-bold text-sm rounded-lg shadow transition-all flex items-center justify-center gap-1.5 focus-visible:ring-2 focus-visible:ring-[#3ECF8E] focus-visible:outline-none"
            >
              <Play className="w-3.5 h-3.5 fill-black" />
              <span>Start AI Automation</span>
            </button>
          </form>
        </div>

        {/* Categorized Navigation Links (Super Simple Labels) */}
        <nav aria-label="SEO AEO GEO Modules" className="space-y-3 flex-1 overflow-y-auto pr-1">
          {menuCategories.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1">
              <span className="px-3 text-xs uppercase tracking-wider text-zinc-500 font-bold block mb-1">
                {group.category}
              </span>

              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`w-full flex items-center justify-start px-3 py-2 rounded-xl text-sm font-semibold transition-all focus-visible:ring-2 focus-visible:ring-[#3ECF8E] focus-visible:outline-none ${
                      isActive
                        ? 'bg-[#3ECF8E] text-black font-bold shadow-md shadow-[#3ECF8E]/20'
                        : 'text-zinc-300 hover:text-white hover:bg-[#262626]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-black' : 'text-zinc-400'}`} aria-hidden="true" />
                      <span className="truncate">{item.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

      </div>

      {/* Bottom Status Box */}
      <div className="p-3 border-t border-[#262626]">
        <div className="p-3 bg-gradient-to-b from-[#1F1F1F] to-[#121212] rounded-xl border border-[#3ECF8E]/30 text-sm">
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-white flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#3ECF8E]" aria-hidden="true" /> RankTop AI
            </span>
          </div>
          <p className="text-sm text-zinc-300 leading-normal">
            Automating rankings for <strong className="text-white">{activeWebsiteUrl || 'mywebsite.com'}</strong>.
          </p>
        </div>
      </div>

    </aside>
  );
}
