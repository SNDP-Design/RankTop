import React from 'react';
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
  Zap
} from 'lucide-react';

export default function AppSidebar({ activeWebsiteUrl, onResetWebsiteUrl, activeTab, setActiveTab }) {
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

  return (
    <aside 
      aria-label="Sidebar Navigation"
      className="w-64 bg-[#171717] border-r border-[#262626] flex flex-col justify-between shrink-0 h-[calc(100vh-64px)] sticky top-16 overflow-hidden select-none"
    >
      {/* Top Section */}
      <div className="p-3 space-y-2 flex-1 flex flex-col overflow-hidden">
        
        {/* Active Target Site Switcher */}
        <div className="p-2.5 bg-[#121212] rounded-xl border border-[#262626] flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="w-7 h-7 rounded-lg bg-[#3ECF8E]/10 border border-[#3ECF8E]/30 flex items-center justify-center text-[#3ECF8E] shrink-0">
              <Globe className="w-4 h-4" />
            </div>
            <div className="truncate">
              <span className="text-sm font-bold text-white block truncate">{activeWebsiteUrl || 'mywebsite.com'}</span>
              <span className="text-sm text-[#3ECF8E] flex items-center gap-1 font-medium">
                <span className="w-2 h-2 rounded-full bg-[#3ECF8E] animate-pulse" aria-hidden="true" /> SEO+AEO+GEO Active
              </span>
            </div>
          </div>
          <button 
            onClick={onResetWebsiteUrl}
            aria-label="Change active website URL"
            className="text-zinc-400 hover:text-white p-1 rounded hover:bg-[#262626] focus-visible:ring-2 focus-visible:ring-[#3ECF8E] focus-visible:outline-none transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Categorized Navigation Links */}
        <nav aria-label="SEO AEO GEO Modules" className="space-y-3 flex-1 overflow-y-auto pr-1">
          {menuCategories.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1">
              <span className="px-3 text-sm uppercase tracking-wider text-zinc-500 font-bold block">
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
            Autonomous Swarm optimizing rankings across Google & LLMs.
          </p>
        </div>
      </div>

    </aside>
  );
}
