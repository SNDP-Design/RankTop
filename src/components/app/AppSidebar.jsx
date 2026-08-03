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
  Bot,
  Activity,
  ChevronRight
} from 'lucide-react';

export default function AppSidebar({ activeTab, setActiveTab }) {
  const sidebarRef = useRef(null);

  const menuCategories = [
    {
      category: 'OVERVIEW',
      items: [
        { id: 'dashboard', label: 'Master Dashboard', icon: LayoutDashboard, badge: 'Live' },
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
        { id: 'swarm', label: 'AI Swarm', icon: Bot, badge: 'AI' },
      ]
    }
  ];

  // DOM level scroll prevention
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
      aria-label="Sidebar Navigation"
      style={{ overflow: 'hidden', overflowY: 'hidden', touchAction: 'none', userSelect: 'none' }}
      className="w-[280px] bg-[#141414] border-r border-[#262626] flex flex-col justify-between shrink-0 h-[calc(100vh-64px)] sticky top-16 left-0 select-none overflow-hidden"
    >
      {/* Sleek Modern Dark Sidebar Content */}
      <div className="p-4 space-y-5 flex-1 flex flex-col justify-between overflow-hidden">
        
        <nav aria-label="SEO AEO GEO Modules" className="space-y-4 flex-1 overflow-hidden">
          {menuCategories.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1">
              {group.category && (
                <div className="px-3 pt-2 pb-1 text-[11px] font-bold text-zinc-500 uppercase tracking-widest font-sans flex items-center justify-between">
                  <span>{group.category}</span>
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
                    className={`w-full group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#3ECF8E] focus-visible:outline-none ${
                      isActive
                        ? 'bg-[#1E1E1E] text-white font-semibold border border-[#333333] shadow-md shadow-black/40'
                        : 'text-zinc-400 hover:text-zinc-100 hover:bg-[#1A1A1A]'
                    }`}
                  >
                    <div className="flex items-center gap-3 truncate">
                      {/* Active Indicator Pillar */}
                      <span className={`w-1 h-4 rounded-full transition-all ${
                        isActive ? 'bg-[#3ECF8E] shadow-[0_0_8px_#3ECF8E]' : 'bg-transparent group-hover:bg-zinc-700'
                      }`} />

                      <Icon className={`w-4 h-4 shrink-0 transition-colors ${
                        isActive ? 'text-[#3ECF8E]' : 'text-zinc-500 group-hover:text-zinc-300'
                      }`} aria-hidden="true" />
                      
                      <span className="truncate">{item.label}</span>
                    </div>

                    {/* Right Badge / Arrow */}
                    {item.badge ? (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                        isActive 
                          ? 'bg-[#3ECF8E]/10 text-[#3ECF8E] border-[#3ECF8E]/30' 
                          : 'bg-[#1A1A1A] text-zinc-500 border-[#262626]'
                      }`}>
                        {item.badge}
                      </span>
                    ) : (
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform ${
                        isActive ? 'text-zinc-400 translate-x-0.5' : 'text-transparent group-hover:text-zinc-600'
                      }`} />
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Sidebar Footer Status Indicator */}
        <div className="pt-3 border-t border-[#222222] px-3 flex items-center justify-between text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#3ECF8E] animate-pulse" />
            <span className="font-semibold text-zinc-400">Swarm Telemetry</span>
          </div>
          <span className="text-zinc-600 font-mono text-[11px]">v2.5</span>
        </div>

      </div>
    </aside>
  );
}
