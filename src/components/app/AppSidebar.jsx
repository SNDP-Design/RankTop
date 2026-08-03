import React, { useEffect, useRef } from 'react';
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
  const sidebarRef = useRef(null);

  const menuCategories = [
    {
      category: 'MAIN WORKSPACE',
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

  // DOM level scroll traps to guarantee zero sidebar scrolling
  useEffect(() => {
    const sidebar = sidebarRef.current;
    if (!sidebar) return;

    const preventScroll = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    sidebar.addEventListener('wheel', preventScroll, { passive: false });
    sidebar.addEventListener('touchmove', preventScroll, { passive: false });

    return () => {
      sidebar.removeEventListener('wheel', preventScroll);
      sidebar.removeEventListener('touchmove', preventScroll);
    };
  }, []);

  return (
    <aside 
      ref={sidebarRef}
      aria-label="Universal Sidebar Navigation"
      style={{ overflow: 'hidden', touchAction: 'none', userSelect: 'none' }}
      className="w-[260px] bg-[#141414] border-r border-[#262626] flex flex-col justify-between shrink-0 h-[calc(100vh-64px)] sticky top-16 left-0 select-none overflow-hidden"
    >
      {/* Universal Single Side Panel Design */}
      <div className="p-4 space-y-4 flex-1 flex flex-col justify-between overflow-hidden">
        
        <nav aria-label="SEO AEO GEO Modules" className="space-y-4 flex-1 overflow-hidden">
          {menuCategories.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1">
              {group.category && (
                <div className="px-3 pt-1 pb-1 text-[11px] font-bold text-zinc-500 uppercase tracking-wider font-sans">
                  {group.category}
                </div>
              )}

              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-150 focus-visible:ring-2 focus-visible:ring-[#3ECF8E] focus-visible:outline-none ${
                      isActive
                        ? 'bg-[#222222] text-[#3ECF8E] font-bold border border-[#333333] shadow'
                        : 'text-zinc-400 hover:text-white hover:bg-[#1A1A1A]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      {/* Active Left Indicator Bar */}
                      <span className={`w-1 h-3.5 rounded-full transition-all ${
                        isActive ? 'bg-[#3ECF8E]' : 'bg-transparent'
                      }`} />

                      <Icon className={`w-4 h-4 shrink-0 transition-colors ${
                        isActive ? 'text-[#3ECF8E]' : 'text-zinc-500'
                      }`} aria-hidden="true" />
                      
                      <span className="truncate">{item.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Universal Footer Badge */}
        <div className="pt-3 border-t border-[#222222] px-3 flex items-center justify-between text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#3ECF8E] animate-pulse" />
            <span className="font-semibold text-zinc-300">RankTop Engine</span>
          </div>
          <span className="text-[#3ECF8E] font-bold text-[11px] bg-[#3ECF8E]/10 px-2 py-0.5 rounded border border-[#3ECF8E]/20">v2.5</span>
        </div>

      </div>
    </aside>
  );
}
