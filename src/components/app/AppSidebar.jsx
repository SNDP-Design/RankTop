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
  ShieldCheck,
  Bot
} from 'lucide-react';

export default function AppSidebar({ activeWebsiteUrl, activeTab, setActiveTab }) {
  const menuCategories = [
    {
      category: '🔍 SEO ENGINE',
      items: [
        { id: 'dashboard', label: 'Search Traffic & Rankings', icon: LayoutDashboard },
        { id: 'strategy', label: 'Keywords & Topics', icon: Target },
        { id: 'studio', label: 'AI Article Generator', icon: FileText },
        { id: 'competitors', label: 'Competitor Ranking Gaps', icon: Search },
        { id: 'cms', label: 'Auto-Publish to Website', icon: Share2 },
      ]
    },
    {
      category: '🤖 AEO ENGINE',
      items: [
        { id: 'aeo', label: 'Google AI Overview Inspector', icon: Cpu },
        { id: 'freetools', label: 'Voice & Speakable Schema', icon: Wrench },
      ]
    },
    {
      category: '🛡️ GEO ENGINE',
      items: [
        { id: 'geo', label: 'ChatGPT & Claude Visibility', icon: ShieldCheck },
        { id: 'swarm', label: 'Autonomous AI Swarm', icon: Bot },
      ]
    }
  ];

  return (
    <aside 
      aria-label="Sidebar Navigation"
      className="w-[296px] bg-[#171717] border-r border-[#262626] flex flex-col justify-between shrink-0 h-[calc(100vh-64px)] sticky top-16 overflow-hidden select-none"
    >
      {/* Top Section with Categories */}
      <div className="p-3.5 space-y-4 flex-1 flex flex-col overflow-hidden">
        
        {/* Active Domain Info Pill */}
        <div className="p-3 bg-[#121212] rounded-xl border border-[#262626] flex items-center gap-2.5 overflow-hidden shrink-0">
          <div className="w-7 h-7 rounded-lg bg-[#3ECF8E]/10 border border-[#3ECF8E]/30 flex items-center justify-center text-[#3ECF8E] shrink-0">
            <Globe className="w-4 h-4" />
          </div>
          <div className="truncate">
            <span className="text-xs uppercase tracking-wider text-zinc-500 font-bold block">Target Website</span>
            <span className="text-sm font-bold text-white truncate block">{activeWebsiteUrl || 'mywebsite.com'}</span>
          </div>
        </div>

        {/* Categorized Navigation Links divided into SEO, AEO, and GEO */}
        <nav aria-label="SEO AEO GEO Modules" className="space-y-4 flex-1 overflow-y-auto pr-1">
          {menuCategories.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1">
              <span className="px-3 text-xs uppercase tracking-wider text-[#3ECF8E] font-bold block mb-1">
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
    </aside>
  );
}
