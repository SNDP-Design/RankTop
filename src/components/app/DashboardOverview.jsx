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
  HelpCircle
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
    { id: 1, title: 'Improve Headline Titles', desc: 'Clicking here will let AI update 3 article titles to get more clicks.', action: 'studio', tag: 'High Impact' },
    { id: 2, title: 'Add Voice & FAQ Answer Blocks', desc: 'Add structured FAQ sections so Google AI Overviews reads your answers out loud.', action: 'freetools', tag: 'Easy Fix' },
    { id: 3, title: 'Allow AI Chatbots to Read Your Website', desc: 'Ensure ChatGPT and Claude are allowed to quote your articles as answers.', action: 'geo', tag: 'Recommended' },
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto font-sans">
      
      {/* Super Simple Header Card */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 bg-[#171717] p-6 rounded-2xl border border-[#262626]">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3ECF8E]/10 text-[#3ECF8E] text-sm font-semibold mb-2 border border-[#3ECF8E]/20">
            <BarChart2 className="w-4 h-4" />
            <span>Simple Search Analytics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-sans">Website Traffic & Ranking Performance</h1>
          <p className="text-sm text-zinc-400 mt-1">Here is how many people are finding and visiting your website from Google and AI search.</p>
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

      {/* 4 Super Simple KPI Scorecards with Plain English Explanations */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1 */}
        <div className="bg-[#171717] p-5 rounded-2xl border border-[#262626]">
          <div className="flex items-center justify-between text-sm text-zinc-400 mb-1">
            <span>Website Visitors (Clicks)</span>
            <MousePointer className="w-4 h-4 text-[#3ECF8E]" />
          </div>
          <div className="text-3xl font-extrabold text-white font-sans">18,450</div>
          <p className="text-sm text-[#3ECF8E] mt-1 font-medium">+32.4% more visitors this month</p>
          <span className="text-xs text-zinc-500 block mt-2">People who clicked your link on Google</span>
        </div>

        {/* Metric 2 */}
        <div className="bg-[#171717] p-5 rounded-2xl border border-[#262626]">
          <div className="flex items-center justify-between text-sm text-zinc-400 mb-1">
            <span>Google Search Views</span>
            <Eye className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-3xl font-extrabold text-white font-sans">248,900</div>
          <p className="text-sm text-[#3ECF8E] mt-1 font-medium">+48.1% search visibility</p>
          <span className="text-xs text-zinc-500 block mt-2">Times your site appeared on screen</span>
        </div>

        {/* Metric 3 */}
        <div className="bg-[#171717] p-5 rounded-2xl border border-[#262626]">
          <div className="flex items-center justify-between text-sm text-zinc-400 mb-1">
            <span>Average Google Rank</span>
            <Target className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-white font-sans">#4.2</div>
          <p className="text-sm text-[#3ECF8E] mt-1 font-medium">14 Keywords in Top 3 (#1-#3)</p>
          <span className="text-xs text-zinc-500 block mt-2">Your average position on Google pages</span>
        </div>

        {/* Metric 4 */}
        <div className="bg-[#171717] p-5 rounded-2xl border border-[#262626]">
          <div className="flex items-center justify-between text-sm text-zinc-400 mb-1">
            <span>AI Overview Citation</span>
            <Cpu className="w-4 h-4 text-[#3ECF8E]" />
          </div>
          <div className="text-3xl font-extrabold text-white font-sans">84.6%</div>
          <p className="text-sm text-[#3ECF8E] mt-1 font-medium">Top Rank in AI Answers</p>
          <span className="text-xs text-zinc-500 block mt-2">Chance of being quoted by AI engines</span>
        </div>

      </div>

      {/* Traffic Growth Chart */}
      <div className="bg-[#171717] p-6 rounded-2xl border border-[#262626] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#262626] pb-4">
          <div>
            <h3 className="text-base font-bold text-white font-sans">Monthly Website Traffic Growth</h3>
            <p className="text-sm text-zinc-400">See how your website traffic has grown over time</p>
          </div>
        </div>

        {/* Visual Chart */}
        <div className="h-52 w-full bg-[#121212] rounded-xl p-4 border border-[#262626] flex items-end justify-between gap-2">
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
              <span className="text-sm text-zinc-400 font-medium">{item.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Simple Recommendations & Top Articles */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Simple Actionable Recommendations */}
        <div className="lg:col-span-6 bg-[#171717] p-6 rounded-2xl border border-[#262626] space-y-4">
          <div className="flex items-center justify-between border-b border-[#262626] pb-3">
            <h3 className="text-base font-bold text-white font-sans">Suggested Actions to Rank Higher</h3>
            <span className="text-sm text-[#3ECF8E]">1-Click Fixes</span>
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
                  <p className="text-sm text-zinc-400 mt-1">{item.desc}</p>
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
            <button onClick={() => setActiveTab('studio')} className="text-sm text-[#3ECF8E] hover:underline font-bold">
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
