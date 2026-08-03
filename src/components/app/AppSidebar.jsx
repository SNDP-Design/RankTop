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
  Bot
} from 'lucide-react';

export default function AppSidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'swarm', label: 'AI Swarm Center', icon: Bot, badge: 'ADK Swarm' },
    { id: 'dashboard', label: 'Performance Analytics', icon: LayoutDashboard, badge: 'Live GSC' },
    { id: 'strategy', label: 'Keyword Strategy', icon: Target, badge: '12 New' },
    { id: 'studio', label: 'AI Blog Studio', icon: FileText, badge: 'Studio' },
    { id: 'aeo', label: 'AI Overview (AEO) Inspector', icon: Cpu, badge: 'AEO' },
    { id: 'geo', label: 'LLM Search & GEO Hub', icon: ShieldCheck, badge: 'Claude/GPT' },
    { id: 'competitors', label: 'Competitor Crawler', icon: Search, badge: 'Gap AI' },
    { id: 'cms', label: 'CMS Auto-Publishing', icon: Share2, badge: '4 Platforms' },
    { id: 'freetools', label: 'Free SEO Micro-Tools', icon: Wrench, badge: 'Free' },
  ];

  return (
    <aside className="w-64 bg-[#171717] border-r border-[#262626] flex flex-col justify-between shrink-0 min-h-[calc(100vh-64px)]">
      
      <div className="p-4 space-y-6">
        
        {/* Workspace Switcher */}
        <div className="p-3.5 bg-[#121212] rounded-xl border border-[#262626] flex items-center justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-[#3ECF8E]/10 border border-[#3ECF8E]/30 flex items-center justify-center text-[#3ECF8E] shrink-0">
              <Globe className="w-4 h-4" />
            </div>
            <div className="truncate">
              <span className="text-sm font-bold text-white block truncate">mywebsite.com</span>
              <span className="text-sm text-[#3ECF8E] flex items-center gap-1.5 font-mono">
                <span className="w-2 h-2 rounded-full bg-[#3ECF8E] animate-pulse" /> RankTop Active
              </span>
            </div>
          </div>
          <button className="text-zinc-400 hover:text-white p-1 rounded hover:bg-[#262626]">
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1">
          <span className="px-3 text-sm font-mono uppercase tracking-wider text-zinc-500 font-bold block mb-2">
            RankTop Swarm Modules
          </span>

          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-[#3ECF8E] text-black font-bold shadow-lg shadow-[#3ECF8E]/20'
                    : 'text-zinc-400 hover:text-white hover:bg-[#262626]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-black' : 'text-zinc-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-sm px-2.5 py-0.5 rounded-full font-mono font-medium ${
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
        </nav>

      </div>

      {/* Autopilot Status Box */}
      <div className="p-4 border-t border-[#262626]">
        <div className="p-3.5 bg-gradient-to-b from-[#1F1F1F] to-[#121212] rounded-xl border border-[#3ECF8E]/30 text-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-white flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#3ECF8E]" /> RankTop Swarm
            </span>
            <span className="text-sm font-mono text-[#3ECF8E] bg-[#3ECF8E]/10 px-2 py-0.5 rounded border border-[#3ECF8E]/20">6 Agents</span>
          </div>
          <p className="text-sm text-zinc-300 leading-normal">
            Autonomous Multi-Agent AI Swarm monitoring search rankings.
          </p>
        </div>
      </div>

    </aside>
  );
}
