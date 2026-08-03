import React from 'react';
import { TrendingUp, Eye, MousePointer, Target, Sparkles, ArrowUpRight, CheckCircle2, RefreshCw, FileText, Share2 } from 'lucide-react';

export default function DashboardOverview({ setActiveTab }) {
  const recentArticles = [
    { title: "The Ultimate Guide to B2B AI SEO Automation in 2026", clicks: "1,420", impressions: "28,400", ctr: "5.0%", rank: "#2", status: "Published (WordPress)" },
    { title: "How to Rank in Google AI Overviews Without Backlinks", clicks: "980", impressions: "18,200", ctr: "5.4%", rank: "#1", status: "Published (Webflow)" },
    { title: "Top 7 AI Blog Writers Compared: Features & Pricing", clicks: "2,100", impressions: "34,900", ctr: "6.0%", rank: "#3", status: "Published (Ghost)" },
    { title: "Answer Engine Optimization (AEO) Strategy Blueprint", clicks: "640", impressions: "11,500", ctr: "5.5%", rank: "#4", status: "Scheduled" },
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white font-outfit">Performance Analytics Workspace</h1>
          <p className="text-xs text-slate-400 mt-1">Synced with Google Search Console & Google Analytics 4 (Last 30 Days)</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setActiveTab('studio')}
            className="px-4 py-2 bg-brand-500 hover:bg-brand-400 text-white font-bold text-xs rounded-xl shadow-md shadow-brand-500/20 flex items-center gap-1.5 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Generate New AI Article</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Total Organic Clicks</span>
            <MousePointer className="w-4 h-4 text-brand-400" />
          </div>
          <div className="text-3xl font-extrabold text-white font-outfit">18,450</div>
          <div className="mt-2 text-xs font-semibold text-emerald-400 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> +32.4% vs last month
          </div>
        </div>

        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Total Search Impressions</span>
            <Eye className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-3xl font-extrabold text-white font-outfit">248,900</div>
          <div className="mt-2 text-xs font-semibold text-emerald-400 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> +48.1% vs last month
          </div>
        </div>

        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Average Click-Through Rate</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-white font-outfit">7.41%</div>
          <div className="mt-2 text-xs font-semibold text-emerald-400 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> +1.2% higher CTR
          </div>
        </div>

        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Average Ranking Position</span>
            <Target className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-white font-outfit">#4.2</div>
          <div className="mt-2 text-xs font-semibold text-emerald-400 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> 14 Keywords in Top 3
          </div>
        </div>

      </div>

      {/* Traffic Trend Chart Visual */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-bold text-white font-outfit">Organic Search Traffic Growth</h3>
            <p className="text-xs text-slate-400">Daily clicks & impressions performance curve</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-brand-400"><span className="w-3 h-3 rounded-full bg-brand-500 inline-block" /> Organic Clicks</span>
            <span className="flex items-center gap-1.5 text-slate-400 ml-4"><span className="w-3 h-3 rounded-full bg-slate-700 inline-block" /> Impressions</span>
          </div>
        </div>

        {/* Visual Simulated Graph Bar Chart */}
        <div className="h-48 w-full bg-slate-950 rounded-xl p-4 border border-slate-800 flex items-end justify-between gap-2">
          {[
            { clicks: 320, impressions: 4200 },
            { clicks: 380, impressions: 4800 },
            { clicks: 450, impressions: 5600 },
            { clicks: 520, impressions: 6800 },
            { clicks: 610, impressions: 8100 },
            { clicks: 750, impressions: 9400 },
            { clicks: 890, impressions: 11200 },
            { clicks: 1040, impressions: 13500 },
            { clicks: 1250, impressions: 15800 },
            { clicks: 1420, impressions: 18400 },
            { clicks: 1680, impressions: 21000 },
            { clicks: 1950, impressions: 24500 }
          ].map((item, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end group">
              <div 
                className="w-full bg-gradient-to-t from-brand-600 to-brand-400 rounded-t transition-all group-hover:brightness-125" 
                style={{ height: `${(item.clicks / 2000) * 100}%` }} 
              />
            </div>
          ))}
        </div>
      </div>

      {/* Recent Published Content & Rankings Table */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-base font-bold text-white font-outfit">Top Performing AI Articles</h3>
          <button onClick={() => setActiveTab('studio')} className="text-xs text-brand-400 hover:text-brand-300 font-semibold">
            View All Articles →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-4">Article Title</th>
                <th className="p-4">Organic Clicks</th>
                <th className="p-4">Impressions</th>
                <th className="p-4">CTR</th>
                <th className="p-4">GSC Rank</th>
                <th className="p-4">Publish Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {recentArticles.map((art, idx) => (
                <tr key={idx} className="hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 font-semibold text-white max-w-xs truncate">{art.title}</td>
                  <td className="p-4 font-mono font-medium text-brand-400">{art.clicks}</td>
                  <td className="p-4 font-mono text-slate-400">{art.impressions}</td>
                  <td className="p-4 font-mono text-emerald-400">{art.ctr}</td>
                  <td className="p-4 font-bold text-white font-mono">{art.rank}</td>
                  <td className="p-4">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-mono text-[10px]">
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
