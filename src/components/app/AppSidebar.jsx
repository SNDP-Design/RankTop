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
  Plus, 
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
      category: 'SWARM CONTROL',
      items: [
        { id: 'swarm', label: 'AI Swarm Center', icon: Bot, badge: 'ADK Swarm' },
        { id: 'dashboard', label: 'Performance Analytics', icon: LayoutDashboard, badge: 'Live GSC' },
      ]
    },
    {
      category: 'SEO ENGINE',
      items: [
        { id: 'strategy', label: 'Keyword Strategy', icon: Target, badge: 'Topic Cluster' },
        { id: 'studio', label: 'AI Blog & Schema Studio', icon: FileText, badge: '2K Words' },
        { id: 'competitors', label: 'Competitor Crawler', icon: Search, badge: 'Gap AI' },
        { id: 'cms', label: 'CMS Auto-Publishing', icon: Share2, badge: '4 Platforms' },
      ]
    },
    {
      category: 'AEO & GEO ENGINE',
      items: [
        { id: 'aeo', label: 'AEO Inspector (AI Overviews)', icon: Cpu, badge: 'Google AI' },
        { id: 'geo', label: 'GEO Hub (LLM Rankings)', icon: ShieldCheck, badge: 'GPT/Claude' },
        { id: 'freetools', label: 'SEO/AEO Micro-Tools', icon: Wrench, badge: 'Free' },
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
      <div className="p-3 space-y-3 flex-1 flex flex-col overflow-hidden">
        
        {/* Interactive Website URL Input Field inside Sidebar */}
        <div className="p-3 bg-[#121212] rounded-xl border border-[#262626] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-zinc-400 font-bold flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#3ECF8E]" aria-hidden="true" />
              Target Website URL
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
              <span>Run AI Swarm</span>
            </button>
          </form>
        </div>

        {/* Categorized Navigation Links */}
        <nav aria-label="SEO AEO GEO Modules" className="space-y-3 flex-1 overflow-y-auto pr-1">
          {menuCategories.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1">
              <span className="px-3 text-xs uppercase tracking-wider text-zinc-500 font-bold block">
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
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-sm font-semibold transition-all focus-visible:ring-2 focus-visible:ring-[#3ECF8E] focus-visible:outline-none ${
                      isActive
                        ? 'bg-[#3ECF8E] text-black font-bold shadow-md shadow-[#3ECF8E]/20'
                        : 'text-zinc-300 hover:text-white hover:bg-[#262626]'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-black' : 'text-zinc-400'}`} aria-hidden="true" />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`text-sm px-2 py-0.5 rounded-full font-medium shrink-0 ml-1 ${
                        isActive
                          ? 'bg-black/20 text-black font-bold'
                          : 'bg-[#262626] text-zinc-400 border border-[#333]'
                      }`}>
                        {item.badge}
                      </span>
                    )}
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
              <Sparkles className="w-4 h-4 text-[#3ECF8E]" aria-hidden="true" /> Trifecta Engine
            </span>
            <span className="text-sm text-[#3ECF8E] bg-[#3ECF8E]/10 px-2 py-0.5 rounded border border-[#3ECF8E]/20 font-medium">SEO AEO GEO</span>
          </div>
          <p className="text-sm text-zinc-300 leading-normal">
            Swarm active for <strong className="text-white">{activeWebsiteUrl || 'mywebsite.com'}</strong>.
          </p>
        </div>
      </div>

    </aside>
  );
}
