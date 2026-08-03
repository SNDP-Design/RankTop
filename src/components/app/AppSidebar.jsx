import React from 'react';
import { 
  LayoutDashboard, 
  Target, 
  FileText, 
  Cpu, 
  Search, 
  Share2, 
  Wrench, 
  ShieldCheck,
  Bot
} from 'lucide-react';

export default function AppSidebar({ activeTab, setActiveTab }) {
  const menuCategories = [
    {
      category: '', // Master Dashboard at top
      items: [
        { id: 'dashboard', label: 'Master Dashboard', icon: LayoutDashboard },
      ]
    },
    {
      category: 'SEO ENGINE',
      items: [
        { id: 'strategy', label: 'Keywords', icon: Target },
        { id: 'studio', label: 'AI Writer', icon: FileText },
        { id: 'competitors', label: 'Competitors', icon: Search },
        { id: 'cms', label: 'CMS Publish', icon: Share2 },
      ]
    },
    {
      category: 'AEO ENGINE',
      items: [
        { id: 'aeo', label: 'AI Overviews', icon: Cpu },
        { id: 'freetools', label: 'Voice & FAQ', icon: Wrench },
      ]
    },
    {
      category: 'GEO ENGINE',
      items: [
        { id: 'geo', label: 'LLM Visibility', icon: ShieldCheck },
        { id: 'swarm', label: 'AI Swarm', icon: Bot },
      ]
    }
  ];

  return (
    <aside 
      aria-label="Sidebar Navigation"
      onWheel={(e) => e.stopPropagation()}
      style={{ overflow: 'hidden', touchAction: 'none', userSelect: 'none' }}
      className="w-[296px] bg-[#171717] border-r border-[#262626] flex flex-col justify-between shrink-0 h-[calc(100vh-64px)] select-none overflow-hidden"
    >
      {/* Spacious Breathable Sidebar Navigation with Sleek Smaller Icons */}
      <div className="p-6 space-y-6 flex-1 flex flex-col overflow-hidden">
        <nav aria-label="SEO AEO GEO Modules" className="space-y-6 flex-1 overflow-hidden">
          {menuCategories.map((group, gIdx) => (
            <div key={gIdx} className="space-y-2.5">
              {group.category && (
                <span className="px-3 text-xs uppercase tracking-wider text-[#3ECF8E] font-bold block mb-2">
                  {group.category}
                </span>
              )}

              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`w-full flex items-center justify-start px-4 py-3 rounded-xl text-sm font-semibold transition-all focus-visible:ring-2 focus-visible:ring-[#3ECF8E] focus-visible:outline-none ${
                      isActive
                        ? 'bg-[#3ECF8E] text-black font-bold shadow-lg shadow-[#3ECF8E]/20'
                        : 'text-zinc-300 hover:text-white hover:bg-[#262626]'
                    }`}
                  >
                    <div className="flex items-center gap-3 truncate">
                      <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-black' : 'text-zinc-400'}`} aria-hidden="true" />
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
