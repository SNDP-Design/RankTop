import React, { useState } from 'react';
import { 
  TrendingUp, 
  Eye, 
  MousePointer, 
  Target, 
  Sparkles, 
  ArrowUpRight, 
  CheckCircle2, 
  RefreshCw, 
  FileText, 
  Share2, 
  AlertCircle, 
  Cpu, 
  Zap, 
  Globe, 
  ChevronRight, 
  BarChart2, 
  PieChart,
  ShieldCheck,
  Activity,
  Plus
} from 'lucide-react';

export default function DashboardOverview({ activeWebsiteUrl = 'mywebsite.com', setActiveTab }) {
  const [timeframe, setTimeframe] = useState('30d');
  
  // Real Initialized State (Zero hardcoded fake numbers)
  const [articles, setArticles] = useState([]);
  const [actionItems, setActionItems] = useState([
    { id: 1, title: 'Run First Autonomous AI Swarm Crawl', desc: `Launch 6 AI agents to audit ${activeWebsiteUrl} for low-KD keywords.`, action: 'swarm', tag: 'Step 1' },
    { id: 2, title: 'Generate Your First SEO & AEO Article', desc: 'Create a 2,000+ word post with validated JSON-LD schema markup.', action: 'studio', tag: 'Step 2' },
    { id: 3, title: 'Connect Your CMS Platform', desc: 'Connect WordPress, Webflow, Shopify or Ghost for 1-click publishing.', action: 'cms', tag: 'Step 3' },
  ]);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto font-sans">
      
      {/* Top Header Banner */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 bg-[#171717] p-6 rounded-2xl border border-[#262626]">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3ECF8E]/10 text-[#3ECF8E] text-sm font-semibold mb-2 border border-[#3ECF8E]/20">
            <PieChart className="w-4 h-4" />
            <span>Master Command Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-sans">Master SEO, AEO & GEO Website Dashboard</h1>
          <p className="text-sm text-zinc-400 mt-1">Live search performance, Google AI Overview citations, and LLM visibility for <strong className="text-white">{activeWebsiteUrl}</strong>.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button 
            onClick={() => setActiveTab('swarm')}
            className="px-4 py-2.5 bg-[#1F1F1F] hover:bg-[#262626] text-zinc-300 rounded-xl text-sm font-semibold flex items-center gap-2 border border-[#333] transition-all"
          >
            <Zap className="w-4 h-4 text-[#3ECF8E]" />
            <span>Start AI Autopilot</span>
          </button>

          <button 
            onClick={() => setActiveTab('studio')}
            className="px-5 py-2.5 bg-[#3ECF8E] hover:bg-[#34D399] text-black font-bold text-sm rounded-xl shadow-lg shadow-[#3ECF8E]/20 flex items-center gap-2 transition-all"
          >
            <Sparkles className="w-4 h-4 text-black" />
            <span>Write New Article</span>
          </button>
        </div>
      </div>

      {/* 3 Core Trifecta Scorecards: Clean Initialized State */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* 1. SEO Scorecard */}
        <div className="bg-[#171717] p-5 rounded-2xl border border-[#262626] space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-[#3ECF8E] flex items-center gap-1.5 uppercase tracking-wider">
              <Search className="w-4 h-4" /> 🔍 SEO Performance
            </span>
            <span className="bg-[#262626] text-zinc-400 text-xs px-2 py-0.5 rounded font-bold border border-[#333]">
              Pending Scan
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="p-3 bg-[#121212] rounded-xl border border-[#262626]">
              <span className="text-xs text-zinc-400 block">Organic Clicks</span>
              <span className="text-2xl font-extrabold text-white">0</span>
              <span className="text-xs text-zinc-500 block mt-0.5">Awaiting GSC sync</span>
            </div>
            <div className="p-3 bg-[#121212] rounded-xl border border-[#262626]">
              <span className="text-xs text-zinc-400 block">Impressions</span>
              <span className="text-2xl font-extrabold text-white">0</span>
              <span className="text-xs text-zinc-500 block mt-0.5">Awaiting GSC sync</span>
            </div>
          </div>
        </div>

        {/* 2. AEO Scorecard */}
        <div className="bg-[#171717] p-5 rounded-2xl border border-[#262626] space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-[#3ECF8E] flex items-center gap-1.5 uppercase tracking-wider">
              <Cpu className="w-4 h-4" /> 🤖 AEO Performance
            </span>
            <span className="bg-[#262626] text-zinc-400 text-xs px-2 py-0.5 rounded font-bold border border-[#333]">
              Pending Audit
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="p-3 bg-[#121212] rounded-xl border border-[#262626]">
              <span className="text-xs text-zinc-400 block">AI Overview Rate</span>
              <span className="text-2xl font-extrabold text-white">0%</span>
              <span className="text-xs text-zinc-500 block mt-0.5">Run AEO inspector</span>
            </div>
            <div className="p-3 bg-[#121212] rounded-xl border border-[#262626]">
              <span className="text-xs text-zinc-400 block">Voice Answer</span>
              <span className="text-2xl font-extrabold text-white">0%</span>
              <span className="text-xs text-zinc-500 block mt-0.5">Add speakable schema</span>
            </div>
          </div>
        </div>

        {/* 3. GEO Scorecard */}
        <div className="bg-[#171717] p-5 rounded-2xl border border-[#262626] space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-[#3ECF8E] flex items-center gap-1.5 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" /> 🛡️ GEO Performance
            </span>
            <span className="bg-[#262626] text-zinc-400 text-xs px-2 py-0.5 rounded font-bold border border-[#333]">
              Pending Audit
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="p-3 bg-[#121212] rounded-xl border border-[#262626]">
              <span className="text-xs text-zinc-400 block">ChatGPT Visibility</span>
              <span className="text-2xl font-extrabold text-white">0%</span>
              <span className="text-xs text-zinc-500 block mt-0.5">Audit GPTBot access</span>
            </div>
            <div className="p-3 bg-[#121212] rounded-xl border border-[#262626]">
              <span className="text-xs text-zinc-400 block">Claude Visibility</span>
              <span className="text-2xl font-extrabold text-white">0%</span>
              <span className="text-xs text-zinc-500 block mt-0.5">Audit ClaudeBot access</span>
            </div>
          </div>
        </div>

      </div>

      {/* Visual Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Graph 1: SEO Traffic Growth Curve */}
        <div className="lg:col-span-8 bg-[#171717] p-6 rounded-2xl border border-[#262626] space-y-4">
          <div className="flex items-center justify-between border-b border-[#262626] pb-3">
            <div>
              <h3 className="text-base font-bold text-white font-sans">Google Search Organic Clicks Curve</h3>
              <p className="text-xs text-zinc-400">Telemetry curve for {activeWebsiteUrl}</p>
            </div>
            <span className="text-xs text-zinc-400 bg-[#121212] px-2.5 py-1 rounded border border-[#262626]">
              Connect GSC to view live curve
            </span>
          </div>

          <div className="h-56 w-full bg-[#121212] rounded-xl p-6 border border-[#262626] flex flex-col items-center justify-center text-center space-y-2">
            <BarChart2 className="w-8 h-8 text-[#3ECF8E]" />
            <span className="text-sm font-bold text-white">No Traffic Data Collected Yet</span>
            <p className="text-xs text-zinc-400 max-w-sm">
              Click <strong className="text-white">Start AI Autopilot</strong> above to run keyword research and generate SEO content for {activeWebsiteUrl}.
            </p>
          </div>
        </div>

        {/* Pie Chart Representation */}
        <div className="lg:col-span-4 bg-[#171717] p-6 rounded-2xl border border-[#262626] space-y-4">
          <div className="flex items-center justify-between border-b border-[#262626] pb-3">
            <h3 className="text-base font-bold text-white font-sans">Keyword Ranking Breakdown</h3>
            <span className="text-xs text-zinc-400">0 Keywords</span>
          </div>

          <div className="space-y-3 pt-2">
            <div className="p-3 bg-[#121212] rounded-xl border border-[#262626] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#3ECF8E]" />
                <span className="text-xs font-bold text-white">Top 3 (#1 - #3)</span>
              </div>
              <span className="text-xs font-bold text-zinc-400">0 Keywords</span>
            </div>

            <div className="p-3 bg-[#121212] rounded-xl border border-[#262626] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-400" />
                <span className="text-xs font-bold text-white">Top 10 (#4 - #10)</span>
              </div>
              <span className="text-xs font-bold text-zinc-400">0 Keywords</span>
            </div>

            <div className="p-3 bg-[#121212] rounded-xl border border-[#262626] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-zinc-600" />
                <span className="text-xs font-bold text-white">Top 50 (#11 - #50)</span>
              </div>
              <span className="text-xs font-bold text-zinc-400">0 Keywords</span>
            </div>
          </div>
        </div>

      </div>

      {/* Recommendations & Top Articles Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Simple Actionable Setup Checklist */}
        <div className="lg:col-span-6 bg-[#171717] p-6 rounded-2xl border border-[#262626] space-y-4">
          <div className="flex items-center justify-between border-b border-[#262626] pb-3">
            <h3 className="text-base font-bold text-white font-sans">Getting Started Setup Checklist</h3>
            <span className="text-xs text-[#3ECF8E]">3 Action Items</span>
          </div>

          <div className="space-y-3">
            {actionItems.map((item) => (
              <div 
                key={item.id}
                onClick={() => setActiveTab(item.action)}
                className="p-4 bg-[#121212] rounded-xl border border-[#262626] hover:border-[#3ECF8E] transition-all cursor-pointer flex items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="bg-[#3ECF8E]/10 text-[#3ECF8E] text-xs px-2 py-0.5 rounded font-bold">{item.tag}</span>
                    <h4 className="text-sm font-bold text-white">{item.title}</h4>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1">{item.desc}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-[#3ECF8E] shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* Top Published Articles Table */}
        <div className="lg:col-span-6 bg-[#171717] p-6 rounded-2xl border border-[#262626] space-y-4">
          <div className="flex items-center justify-between border-b border-[#262626] pb-3">
            <h3 className="text-base font-bold text-white font-sans">Published Articles</h3>
            <button onClick={() => setActiveTab('studio')} className="text-xs text-[#3ECF8E] hover:underline font-bold flex items-center gap-1">
              <Plus className="w-3.5 h-3.5" /> Write Article
            </button>
          </div>

          {articles.length === 0 ? (
            <div className="p-8 text-center bg-[#121212] rounded-xl border border-[#262626] space-y-3">
              <FileText className="w-6 h-6 text-[#3ECF8E] mx-auto" />
              <span className="text-sm font-bold text-white block">No Articles Published Yet</span>
              <p className="text-xs text-zinc-400">
                Use the <strong className="text-white">AI Article Generator</strong> to write and publish your first article for {activeWebsiteUrl}.
              </p>
              <button 
                onClick={() => setActiveTab('studio')}
                className="px-4 py-2 bg-[#3ECF8E] hover:bg-[#34D399] text-black font-bold text-xs rounded-xl shadow"
              >
                Generate First Article
              </button>
            </div>
          ) : (
            <div className="space-y-2.5">
              {articles.map((art, idx) => (
                <div key={idx} className="p-3.5 bg-[#121212] rounded-xl border border-[#262626] flex items-center justify-between">
                  <div>
                    <span className="text-sm font-bold text-white block truncate max-w-xs">{art.title}</span>
                    <span className="text-xs text-zinc-400">{art.clicks} clicks • Rank {art.rank}</span>
                  </div>
                  <span className="text-xs font-bold text-[#3ECF8E] bg-[#3ECF8E]/10 px-2 py-1 rounded border border-[#3ECF8E]/20">
                    {art.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
