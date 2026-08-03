import React, { useState } from 'react';
import { Search, Filter, Sparkles, ArrowRight, Zap, Target, BarChart2, CheckCircle2 } from 'lucide-react';

export default function KeywordStrategy({ onGenerateArticle }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterIntent, setFilterIntent] = useState('all');
  const [filterDifficulty, setFilterDifficulty] = useState('all');

  const [keywords, setKeywords] = useState([
    { id: 1, keyword: 'ai overview simulator tool', cluster: 'AEO Tools', volume: '14,200/mo', kd: 14, kdLabel: 'Easy', intent: 'Transactional', estTraffic: '4,800/mo', status: 'Ready' },
    { id: 2, keyword: 'best automated ai blog writer for saas', cluster: 'AI Blogging', volume: '9,800/mo', kd: 18, kdLabel: 'Easy', intent: 'Commercial', estTraffic: '3,200/mo', status: 'Ready' },
    { id: 3, keyword: 'how to optimize blog post for google ai overviews', cluster: 'AEO Strategy', volume: '12,500/mo', kd: 22, kdLabel: 'Easy', intent: 'Informational', estTraffic: '4,100/mo', status: 'Ready' },
    { id: 4, keyword: 'seosorted vs jasper vs copy ai comparison', cluster: 'Competitor Comparison', volume: '6,400/mo', kd: 12, kdLabel: 'Very Easy', intent: 'High Intent', estTraffic: '2,900/mo', status: 'Ready' },
    { id: 5, keyword: 'wordpress auto blogging plugin with json-ld schema', cluster: 'CMS Integration', volume: '8,100/mo', kd: 25, kdLabel: 'Medium', intent: 'Commercial', estTraffic: '2,400/mo', status: 'Ready' },
    { id: 6, keyword: 'b2b content marketing automation tools 2026', cluster: 'Growth Marketing', volume: '18,900/mo', kd: 28, kdLabel: 'Medium', intent: 'Informational', estTraffic: '5,600/mo', status: 'Ready' },
    { id: 7, keyword: 'how to build topic clusters for e-commerce seo', cluster: 'SEO Strategy', volume: '7,300/mo', kd: 19, kdLabel: 'Easy', intent: 'Informational', estTraffic: '2,200/mo', status: 'Ready' },
  ]);

  const filteredKeywords = keywords.filter(k => {
    const matchesSearch = k.keyword.toLowerCase().includes(searchTerm.toLowerCase()) || k.cluster.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIntent = filterIntent === 'all' || k.intent.toLowerCase() === filterIntent.toLowerCase();
    const matchesDiff = filterDifficulty === 'all' || (filterDifficulty === 'easy' ? k.kd <= 25 : k.kd > 25);
    return matchesSearch && matchesIntent && matchesDiff;
  });

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-semibold mb-2">
            <Target className="w-3.5 h-3.5" />
            <span>Automated Keyword Strategy Engine</span>
          </div>
          <h1 className="text-2xl font-bold text-white font-outfit">Topic Clusters & Low-KD Opportunities</h1>
          <p className="text-xs text-slate-400 mt-1">Discovered automatically from live Google SERPs & competitor gaps</p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900 p-4 rounded-xl border border-slate-800">
        
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search keywords or clusters..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Intent Filter */}
          <select
            value={filterIntent}
            onChange={(e) => setFilterIntent(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:border-brand-500"
          >
            <option value="all">All Search Intents</option>
            <option value="commercial">Commercial</option>
            <option value="informational">Informational</option>
            <option value="transactional">Transactional</option>
            <option value="high intent">High Intent</option>
          </select>

          {/* Difficulty Filter */}
          <select
            value={filterDifficulty}
            onChange={(e) => setFilterDifficulty(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:border-brand-500"
          >
            <option value="all">All Difficulty Levels</option>
            <option value="easy">Easy (KD ≤ 25)</option>
            <option value="medium">Medium (KD &gt; 25)</option>
          </select>
        </div>

      </div>

      {/* Keyword Table */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-4">Target Keyword</th>
                <th className="p-4">Topic Cluster</th>
                <th className="p-4">Search Volume</th>
                <th className="p-4">Keyword Difficulty (KD)</th>
                <th className="p-4">Search Intent</th>
                <th className="p-4">Traffic Potential</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredKeywords.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 font-bold text-white max-w-xs">{item.keyword}</td>
                  <td className="p-4 font-mono text-slate-400">{item.cluster}</td>
                  <td className="p-4 font-mono font-semibold text-white">{item.volume}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded font-mono font-semibold border ${
                      item.kd <= 20
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>
                      KD {item.kd} ({item.kdLabel})
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="bg-brand-500/10 text-brand-400 border border-brand-500/20 px-2 py-0.5 rounded font-mono text-[10px]">
                      {item.intent}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-emerald-400 font-semibold">{item.estTraffic}</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => onGenerateArticle(item.keyword)}
                      className="px-3 py-1.5 bg-brand-500 hover:bg-brand-400 text-white font-bold text-xs rounded-lg transition-all shadow-sm shadow-brand-500/20 inline-flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Write Article</span>
                    </button>
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
