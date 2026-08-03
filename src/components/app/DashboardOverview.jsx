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
  ArrowDownRight 
} from 'lucide-react';

export default function DashboardOverview({ setActiveTab }) {
  const [timeframe, setTimeframe] = useState('30d');

  const topArticles = [
    { title: "The Ultimate Guide to B2B AI SEO Automation in 2026", clicks: "1,420", impressions: "28,400", ctr: "5.0%", rank: "#2", status: "Published (WordPress)" },
    { title: "How to Rank in Google AI Overviews Without Backlinks", clicks: "980", impressions: "18,200", ctr: "5.4%", rank: "#1", status: "Published (Webflow)" },
    { title: "Top 7 AI Blog Writers Compared: Features & Benchmarks", clicks: "2,100", impressions: "34,900", ctr: "6.0%", rank: "#3", status: "Published (Ghost)" },
    { title: "Answer Engine Optimization (AEO) Strategy Blueprint", clicks: "640", impressions: "11,500", ctr: "5.5%", rank: "#4", status: "Scheduled" },
  ];

  const rankingRecommendations = [
    { id: 1, type: 'CTR Upgrade', title: 'Optimize Title Tags for 3 High-Impression Pages', action: 'studio', desc: 'Pages have 14K+ impressions but lower CTR. Update metadata to boost clicks by +18%.' },
    { id: 2, type: 'Schema Inject', title: 'Add Speakable & FAQ Schema to Topic Clusters', action: 'freetools', desc: 'Google AI Overviews requires valid JSON-LD schema to cite your brand.' },
    { id: 3, type: 'Crawler Access', title: 'Unblock PerplexityBot & ClaudeBot in robots.txt', action: 'geo', desc: 'Ensure AI search crawlers can index your structured content.' },
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto font-sans">
      
      {/* Dashboard Top Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 bg-[#171717] p-6 rounded-2xl border border-[#262626]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3ECF8E]/10 text-[#3ECF8E] text-sm font-semibold mb-2 border border-[#3ECF8E]/20">
            <BarChart2 className="w-3.5 h-3.5" />
            <span>Closed-Loop Telemetry Synced</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-sans">Search Performance & Ranking Analytics</h1>
          <p className="text-sm text-zinc-400 mt-1">Real-time GSC clicks, impressions, position curves, and AI Overview citation telemetry</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-[#121212] border border-[#262626] rounded-xl p-1 flex items-center text-sm font-medium">
            <button 
              onClick={() => setTimeframe('7d')} 
              className={`px-3 py-1.5 rounded-lg transition-all ${timeframe === '7d' ? 'bg-[#3ECF8E] text-black font-bold' : 'text-zinc-400 hover:text-white'}`}
            >
              7D
            </button>
            <button 
              onClick={() => setTimeframe('30d')} 
              className={`px-3 py-1.5 rounded-lg transition-all ${timeframe === '30d' ? 'bg-[#3ECF8E] text-black font-bold' : 'text-zinc-400 hover:text-white'}`}
            >
              30D
            </button>
            <button 
              onClick={() => setTimeframe('90d')} 
              className={`px-3 py-1.5 rounded-lg transition-all ${timeframe === '90d' ? 'bg-[#3ECF8E] text-black font-bold' : 'text-zinc-400 hover:text-white'}`}
            >
              90D
            </button>
          </div>

          <button 
            onClick={() => setActiveTab('swarm')}
            className="px-4 py-2.5 bg-[#1F1F1F] hover:bg-[#262626] text-zinc-300 rounded-xl text-sm font-semibold flex items-center gap-2 border border-[#333] transition-all"
          >
            <Zap className="w-4 h-4 text-[#3ECF8E]" />
            <span>Run Swarm Audit</span>
          </button>

          <button 
            onClick={() => setActiveTab('studio')}
            className="px-5 py-2.5 bg-[#3ECF8E] hover:bg-[#34D399] text-black font-bold text-sm rounded-xl shadow-lg shadow-[#3ECF8E]/20 flex items-center gap-2 transition-all"
          >
            <Sparkles className="w-4 h-4 text-black" />
            <span>Generate Rank Post</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1 */}
        <div className="bg-[#171717] p-5 rounded-2xl border border-[#262626] relative overflow-hidden">
          <div className="flex items-center justify-between text-sm text-zinc-400 mb-2">
            <span>Total Organic Clicks</span>
            <MousePointer className="w-4 h-4 text-[#3ECF8E]" />
          </div>
          <div className="text-3xl font-extrabold text-white font-sans">18,450</div>
          <div className="mt-2 text-sm font-semibold text-[#3ECF8E] flex items-center gap-1">
            <ArrowUpRight className="w-4 h-4" /> +32.4% vs last period
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-[#171717] p-5 rounded-2xl border border-[#262626] relative overflow-hidden">
          <div className="flex items-center justify-between text-sm text-zinc-400 mb-2">
            <span>Total Search Impressions</span>
            <Eye className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-3xl font-extrabold text-white font-sans">248,900</div>
          <div className="mt-2 text-sm font-semibold text-[#3ECF8E] flex items-center gap-1">
            <ArrowUpRight className="w-4 h-4" /> +48.1% vs last period
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-[#171717] p-5 rounded-2xl border border-[#262626] relative overflow-hidden">
          <div className="flex items-center justify-between text-sm text-zinc-400 mb-2">
            <span>Average Search Position</span>
            <Target className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-white font-sans">#4.2</div>
          <div className="mt-2 text-sm font-semibold text-[#3ECF8E] flex items-center gap-1">
            <ArrowUpRight className="w-4 h-4" /> 14 Keywords in Top 3
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-[#171717] p-5 rounded-2xl border border-[#262626] relative overflow-hidden">
          <div className="flex items-center justify-between text-sm text-zinc-400 mb-2">
            <span>AI Overview Citation Rate</span>
            <Cpu className="w-4 h-4 text-[#3ECF8E]" />
          </div>
          <div className="text-3xl font-extrabold text-white font-sans">84.6%</div>
          <div className="mt-2 text-sm font-semibold text-[#3ECF8E] flex items-center gap-1">
            <ArrowUpRight className="w-4 h-4" /> Rank #1 in Google AI
          </div>
        </div>

      </div>

      {/* Organic Growth Curve Area Chart */}
      <div className="bg-[#171717] p-6 rounded-2xl border border-[#262626] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#262626] pb-4">
          <div>
            <h3 className="text-base font-bold text-white font-sans">Organic Traffic & Impression Growth Curve</h3>
            <p className="text-sm text-zinc-400">Daily clicks telemetry synced with Google Search Console</p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1.5 text-[#3ECF8E] font-semibold">
              <span className="w-3 h-3 rounded-full bg-[#3ECF8E] inline-block" /> Organic Clicks
            </span>
            <span className="flex items-center gap-1.5 text-zinc-400 font-semibold">
              <span className="w-3 h-3 rounded-full bg-zinc-600 inline-block" /> Impressions
            </span>
          </div>
        </div>

        {/* Smooth Area Curve Visualization */}
        <div className="h-56 w-full bg-[#121212] rounded-xl p-4 border border-[#262626] relative flex items-end justify-between gap-2">
          {[
            { month: 'Jan', clicks: 320, impressions: 4200 },
            { month: 'Feb', clicks: 410, impressions: 5300 },
            { month: 'Mar', clicks: 580, impressions: 6900 },
            { month: 'Apr', clicks: 720, impressions: 8800 },
            { month: 'May', clicks: 940, impressions: 11200 },
            { month: 'Jun', clicks: 1180, impressions: 14500 },
            { month: 'Jul', clicks: 1420, impressions: 18400 },
            { month: 'Aug', clicks: 1750, impressions: 22100 },
            { month: 'Sep', clicks: 2100, impressions: 26800 },
            { month: 'Oct', clicks: 2480, impressions: 31200 },
          ].map((item, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group cursor-pointer">
              <div 
                className="w-full bg-gradient-to-t from-[#24B47E] to-[#3ECF8E] rounded-t transition-all group-hover:brightness-125 shadow-md shadow-[#3ECF8E]/20" 
                style={{ height: `${(item.clicks / 2800) * 100}%` }} 
              />
              <span className="text-sm font-mono text-zinc-500 group-hover:text-white transition-colors">{item.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Grid: Keyword Ranking Distribution & Actionable Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Col: Keyword Distribution */}
        <div className="lg:col-span-5 bg-[#171717] p-6 rounded-2xl border border-[#262626] space-y-4">
          <div className="flex items-center justify-between border-b border-[#262626] pb-3">
            <h3 className="text-base font-bold text-white font-sans">Keyword Ranking Distribution</h3>
            <span className="text-sm font-mono text-[#3ECF8E]">142 Total Ranked</span>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 bg-[#121212] rounded-xl border border-[#262626] flex items-center justify-between">
              <div>
                <span className="text-white font-bold block text-sm">Top 3 Positions (#1 - #3)</span>
                <span className="text-sm text-zinc-400">Prime Search Real Estate</span>
              </div>
              <span className="text-base font-bold text-[#3ECF8E] bg-[#3ECF8E]/10 px-3 py-1 rounded-lg border border-[#3ECF8E]/20">14 Keywords</span>
            </div>

            <div className="p-3.5 bg-[#121212] rounded-xl border border-[#262626] flex items-center justify-between">
              <div>
                <span className="text-white font-bold block text-sm">First Page (#4 - #10)</span>
                <span className="text-sm text-zinc-400">High Conversion Zone</span>
              </div>
              <span className="text-base font-bold text-white bg-[#262626] px-3 py-1 rounded-lg border border-[#333]">38 Keywords</span>
            </div>

            <div className="p-3.5 bg-[#121212] rounded-xl border border-[#262626] flex items-center justify-between">
              <div>
                <span className="text-white font-bold block text-sm">Top 50 Positions (#11 - #50)</span>
                <span className="text-sm text-zinc-400">Striking Distance Opportunities</span>
              </div>
              <span className="text-base font-bold text-zinc-400 bg-[#262626] px-3 py-1 rounded-lg border border-[#333]">90 Keywords</span>
            </div>
          </div>
        </div>

        {/* Right Col: Actionable AI Ranking Recommendations */}
        <div className="lg:col-span-7 bg-[#171717] p-6 rounded-2xl border border-[#262626] space-y-4">
          <div className="flex items-center justify-between border-b border-[#262626] pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#3ECF8E]" />
              <h3 className="text-base font-bold text-white font-sans">Actionable AI Ranking Recommendations</h3>
            </div>
            <span className="text-sm text-zinc-400">3 Priority Tasks</span>
          </div>

          <div className="space-y-3">
            {rankingRecommendations.map((rec) => (
              <div 
                key={rec.id}
                onClick={() => setActiveTab(rec.action)}
                className="p-4 bg-[#121212] rounded-xl border border-[#262626] hover:border-[#3ECF8E]/50 transition-all cursor-pointer group flex items-start justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#3ECF8E]/10 text-[#3ECF8E] text-sm px-2 py-0.5 rounded font-bold border border-[#3ECF8E]/20">{rec.type}</span>
                    <h4 className="text-sm font-bold text-white group-hover:text-[#3ECF8E] transition-colors">{rec.title}</h4>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{rec.desc}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-zinc-500 group-hover:text-[#3ECF8E] transition-colors shrink-0 mt-1" />
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Top Performing AI Articles Table */}
      <div className="bg-[#171717] rounded-2xl border border-[#262626] overflow-hidden">
        <div className="p-5 border-b border-[#262626] flex items-center justify-between">
          <h3 className="text-base font-bold text-white font-sans">Top Performing AI Articles</h3>
          <button 
            onClick={() => setActiveTab('studio')} 
            className="text-sm text-[#3ECF8E] hover:underline font-semibold flex items-center gap-1"
          >
            <span>Open AI Studio</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-zinc-300">
            <thead className="bg-[#121212] text-zinc-400 uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-4">Article Title</th>
                <th className="p-4">Organic Clicks</th>
                <th className="p-4">Impressions</th>
                <th className="p-4">CTR</th>
                <th className="p-4">GSC Rank</th>
                <th className="p-4">CMS Sync Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#262626]">
              {topArticles.map((art, idx) => (
                <tr key={idx} className="hover:bg-[#1F1F1F] transition-colors">
                  <td className="p-4 font-bold text-white max-w-xs truncate">{art.title}</td>
                  <td className="p-4 font-semibold text-[#3ECF8E]">{art.clicks}</td>
                  <td className="p-4 text-zinc-400">{art.impressions}</td>
                  <td className="p-4 text-[#3ECF8E] font-semibold">{art.ctr}</td>
                  <td className="p-4 font-bold text-white">{art.rank}</td>
                  <td className="p-4">
                    <span className="bg-[#3ECF8E]/10 text-[#3ECF8E] border border-[#3ECF8E]/20 px-2.5 py-1 rounded font-semibold text-sm">
                      {art.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
