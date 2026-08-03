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
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between shrink-0 min-h-[calc(100vh-80px)]">
      
      <div className="p-4 space-y-6">
        
        {/* Workspace Switcher */}
        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-500 shrink-0">
              <Globe className="w-4 h-4" />
            </div>
            <div className="truncate">
              <span className="text-xs font-bold text-white block truncate">mywebsite.com</span>
              <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Autopilot Active
              </span>
            </div>
          </div>
          <button className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800">
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1">
          <span className="px-3 text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold block mb-2">
            Autonomous Swarm Engine
          </span>

          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-medium ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
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
      <div className="p-4 border-t border-slate-800">
        <div className="p-3 bg-gradient-to-b from-brand-950/60 to-slate-950 rounded-xl border border-brand-500/20 text-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-white flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-brand-400" /> ADK Swarm Active
            </span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">6 Agents</span>
          </div>
          <p className="text-[11px] text-slate-300 leading-normal">
            Autonomous multi-agent pipeline monitoring Google AI Overviews.
          </p>
        </div>
      </div>

    </aside>
  );
}
