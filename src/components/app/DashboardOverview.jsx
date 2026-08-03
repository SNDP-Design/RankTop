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
  Activity
} from 'lucide-react';

export default function DashboardOverview({ setActiveTab }) {
  const [timeframe, setTimeframe] = useState('30d');

  const topArticles = [
    { title: "The Ultimate Guide to B2B AI SEO Automation in 2026", clicks: "1,420", impressions: "28,400", ctr: "5.0%", rank: "#2", status: "Published on Website" },
    { title: "How to Rank in Google AI Overviews Without Backlinks", clicks: "980", impressions: "18,200", ctr: "5.4%", rank: "#1", status: "Published on Website" },
    { title: "Top 7 AI Blog Writers Compared: Features & Benchmarks", clicks: "2,100", impressions: "34,900", ctr: "6.0%", rank: "#3", status: "Published on Website" },
    { title: "Answer Engine Optimization (AEO) Strategy Blueprint", clicks: "640", impressions: "11,500", ctr: "5.5%", rank: "#4", status: "Scheduled" },
  ];

  const simpleActionItems = [
    { id: 1, title: 'Improve Headline Titles for +18% CTR', desc: 'AI detected 3 high-impression titles. Click to optimize.', action: 'studio', tag: 'SEO Fix' },
    { id: 2, title: 'Inject Voice & Speakable FAQ Schema', desc: 'Add structured FAQ blocks so Google AI Overviews reads your answers.', action: 'freetools', tag: 'AEO Fix' },
    { id: 3, title: 'Unblock ChatGPT & Claude AI Bots', desc: 'Ensure PerplexityBot and GPTBot are allowed in robots.txt.', action: 'geo', tag: 'GEO Fix' },
  ];

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
          <p className="text-sm text-zinc-400 mt-1">Complete analytical breakdown of organic search, AI Overview citations, and LLM chatbot visibility.</p>
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

      {/* 3 Core Trifecta Scorecards: SEO, AEO, and GEO */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* 1. SEO Scorecard */}
        <div className="bg-[#171717] p-5 rounded-2xl border border-[#262626] space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-[#3ECF8E] flex items-center gap-1.5 uppercase tracking-wider">
              <Search className="w-4 h-4" /> 🔍 SEO Performance
            </span>
            <span className="bg-[#3ECF8E]/10 text-[#3ECF8E] text-xs px-2 py-0.5 rounded font-bold border border-[#3ECF8E]/20">
              Rank #4.2 Avg
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="p-3 bg-[#121212] rounded-xl border border-[#262626]">
              <span className="text-xs text-zinc-400 block">Organic Clicks</span>
              <span className="text-2xl font-extrabold text-white">18,450</span>
              <span className="text-xs text-[#3ECF8E] block mt-0.5">+32.4% MoM</span>
            </div>
            <div className="p-3 bg-[#121212] rounded-xl border border-[#262626]">
              <span className="text-xs text-zinc-400 block">Impressions</span>
              <span className="text-2xl font-extrabold text-white">248.9K</span>
              <span className="text-xs text-[#3ECF8E] block mt-0.5">+48.1% MoM</span>
            </div>
          </div>
        </div>

        {/* 2. AEO Scorecard */}
        <div className="bg-[#171717] p-5 rounded-2xl border border-[#262626] space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-[#3ECF8E] flex items-center gap-1.5 uppercase tracking-wider">
              <Cpu className="w-4 h-4" /> 🤖 AEO Performance
            </span>
            <span className="bg-[#3ECF8E]/10 text-[#3ECF8E] text-xs px-2 py-0.5 rounded font-bold border border-[#3ECF8E]/20">
              84.6% Citation
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="p-3 bg-[#121212] rounded-xl border border-[#262626]">
              <span className="text-xs text-zinc-400 block">AI Overview Rate</span>
              <span className="text-2xl font-extrabold text-white">84.6%</span>
              <span className="text-xs text-[#3ECF8E] block mt-0.5">Top AI Snippet</span>
            </div>
            <div className="p-3 bg-[#121212] rounded-xl border border-[#262626]">
              <span className="text-xs text-zinc-400 block">Voice Answer</span>
              <span className="text-2xl font-extrabold text-white">92%</span>
              <span className="text-xs text-[#3ECF8E] block mt-0.5">Speakable Schema</span>
            </div>
          </div>
        </div>

        {/* 3. GEO Scorecard */}
        <div className="bg-[#171717] p-5 rounded-2xl border border-[#262626] space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-[#3ECF8E] flex items-center gap-1.5 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" /> 🛡️ GEO Performance
            </span>
            <span className="bg-[#3ECF8E]/10 text-[#3ECF8E] text-xs px-2 py-0.5 rounded font-bold border border-[#3ECF8E]/20">
              91% LLM Score
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="p-3 bg-[#121212] rounded-xl border border-[#262626]">
              <span className="text-xs text-zinc-400 block">ChatGPT Visibility</span>
              <span className="text-2xl font-extrabold text-white">94%</span>
              <span className="text-xs text-[#3ECF8E] block mt-0.5">GPTBot Allowed</span>
            </div>
            <div className="p-3 bg-[#121212] rounded-xl border border-[#262626]">
              <span className="text-xs text-zinc-400 block">Claude Visibility</span>
              <span className="text-2xl font-extrabold text-white">88%</span>
              <span className="text-xs text-[#3ECF8E] block mt-0.5">ClaudeBot Allowed</span>
            </div>
          </div>
        </div>

      </div>

      {/* Visual Charts & Graphs Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Graph 1: SEO Traffic Growth Curve */}
        <div className="lg:col-span-8 bg-[#171717] p-6 rounded-2xl border border-[#262626] space-y-4">
          <div className="flex items-center justify-between border-b border-[#262626] pb-3">
            <div>
              <h3 className="text-base font-bold text-white font-sans">Google Search Organic Clicks Curve</h3>
              <p className="text-xs text-zinc-400">Monthly organic traffic telemetry</p>
            </div>
            <span className="text-xs font-bold text-[#3ECF8E] bg-[#3ECF8E]/10 px-2.5 py-1 rounded border border-[#3ECF8E]/20">
              +142% Traffic Growth
            </span>
          </div>

          <div className="h-56 w-full bg-[#121212] rounded-xl p-4 border border-[#262626] flex items-end justify-between gap-2">
            {[
              { month: 'Jan', clicks: 320 },
              { month: 'Feb', clicks: 410 },
              { month: 'Mar', clicks: 580 },
              { month: 'Apr', clicks: 720 },
              { month: 'May', clicks: 940 },
              { month: 'Jun', clicks: 1180 },
              { month: 'Jul', clicks: 1420 },
              { month: 'Aug', clicks: 1750 },
              { month: 'Sep', clicks: 2100 },
              { month: 'Oct', clicks: 2480 },
            ].map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <div 
                  className="w-full bg-[#3ECF8E] rounded-t transition-all group-hover:bg-[#34D399]" 
                  style={{ height: `${(item.clicks / 2800) * 100}%` }} 
                />
                <span className="text-xs text-zinc-400 font-medium">{item.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pie Chart Representation: Keyword Distribution */}
        <div className="lg:col-span-4 bg-[#171717] p-6 rounded-2xl border border-[#262626] space-y-4">
          <div className="flex items-center justify-between border-b border-[#262626] pb-3">
            <h3 className="text-base font-bold text-white font-sans">Keyword Ranking Pie Breakdown</h3>
            <span className="text-xs text-zinc-400">142 Total</span>
          </div>

          {/* Visual Pie Donut Representation */}
          <div className="space-y-3 pt-2">
            <div className="p-3 bg-[#121212] rounded-xl border border-[#262626] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#3ECF8E]" />
                <span className="text-xs font-bold text-white">Top 3 (#1 - #3)</span>
              </div>
              <span className="text-xs font-bold text-[#3ECF8E]">14 Keywords (35%)</span>
            </div>

            <div className="p-3 bg-[#121212] rounded-xl border border-[#262626] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-400" />
                <span className="text-xs font-bold text-white">Top 10 (#4 - #10)</span>
              </div>
              <span className="text-xs font-bold text-white">38 Keywords (45%)</span>
            </div>

            <div className="p-3 bg-[#121212] rounded-xl border border-[#262626] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-zinc-600" />
                <span className="text-xs font-bold text-white">Top 50 (#11 - #50)</span>
              </div>
              <span className="text-xs font-bold text-zinc-400">90 Keywords (20%)</span>
            </div>
          </div>
        </div>

      </div>

      {/* Bar Chart: LLM Chatbot Answer Engine Citation Scores */}
      <div className="bg-[#171717] p-6 rounded-2xl border border-[#262626] space-y-4">
        <div className="flex items-center justify-between border-b border-[#262626] pb-3">
          <div>
            <h3 className="text-base font-bold text-white font-sans">GEO LLM Answer Engine Citation Rates</h3>
            <p className="text-xs text-zinc-400">Percentage of brand inclusion in AI answers across major models</p>
          </div>
          <span className="text-xs text-[#3ECF8E] font-bold">Updated Live</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-[#121212] rounded-xl border border-[#262626] space-y-2">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span>ChatGPT (GPT-4o)</span>
              <span className="text-[#3ECF8E] font-bold">94%</span>
            </div>
            <div className="w-full bg-[#262626] h-2 rounded-full overflow-hidden">
              <div className="bg-[#3ECF8E] h-full w-[94%]" />
            </div>
          </div>

          <div className="p-4 bg-[#121212] rounded-xl border border-[#262626] space-y-2">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span>Perplexity AI</span>
              <span className="text-[#3ECF8E] font-bold">91%</span>
            </div>
            <div className="w-full bg-[#262626] h-2 rounded-full overflow-hidden">
              <div className="bg-[#3ECF8E] h-full w-[91%]" />
            </div>
          </div>

          <div className="p-4 bg-[#121212] rounded-xl border border-[#262626] space-y-2">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span>Claude 3.5 Sonnet</span>
              <span className="text-[#3ECF8E] font-bold">88%</span>
            </div>
            <div className="w-full bg-[#262626] h-2 rounded-full overflow-hidden">
              <div className="bg-[#3ECF8E] h-full w-[88%]" />
            </div>
          </div>

          <div className="p-4 bg-[#121212] rounded-xl border border-[#262626] space-y-2">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span>Google Gemini 2.5</span>
              <span className="text-[#3ECF8E] font-bold">86%</span>
            </div>
            <div className="w-full bg-[#262626] h-2 rounded-full overflow-hidden">
              <div className="bg-[#3ECF8E] h-full w-[86%]" />
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations & Top Articles Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Simple Actionable Recommendations */}
        <div className="lg:col-span-6 bg-[#171717] p-6 rounded-2xl border border-[#262626] space-y-4">
          <div className="flex items-center justify-between border-b border-[#262626] pb-3">
            <h3 className="text-base font-bold text-white font-sans">Suggested Actions to Rank Higher</h3>
            <span className="text-xs text-[#3ECF8E]">1-Click Fixes</span>
          </div>

          <div className="space-y-3">
            {simpleActionItems.map((item) => (
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
            <h3 className="text-base font-bold text-white font-sans">Top Ranking Articles</h3>
            <button onClick={() => setActiveTab('studio')} className="text-xs text-[#3ECF8E] hover:underline font-bold">
              + Write New
            </button>
          </div>

          <div className="space-y-2.5">
            {topArticles.map((art, idx) => (
              <div key={idx} className="p-3.5 bg-[#121212] rounded-xl border border-[#262626] flex items-center justify-between">
                <div>
                  <span className="text-sm font-bold text-white block truncate max-w-xs">{art.title}</span>
                  <span className="text-xs text-zinc-400">{art.clicks} clicks • Rank {art.rank} on Google</span>
                </div>
                <span className="text-xs font-bold text-[#3ECF8E] bg-[#3ECF8E]/10 px-2 py-1 rounded border border-[#3ECF8E]/20">
                  Top Rank
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
