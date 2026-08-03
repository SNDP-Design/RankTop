import React, { useState } from 'react';
import { Search, Sparkles, ArrowRight, ShieldAlert, TrendingUp, Globe, Target } from 'lucide-react';

export default function CompetitorSpy({ onGenerateArticle }) {
  const [competitorDomain, setCompetitorDomain] = useState('competitor-saas.com');
  const [isCrawling, setIsCrawling] = useState(false);
  const [competitorReport, setCompetitorReport] = useState({
    domain: 'competitor-saas.com',
    organicKeywords: '24,500',
    topTrafficPage: '/blog/ai-marketing-trends-2026',
    missedGaps: [
      { keyword: 'ai overview optimization guide', competitorRank: '#3', volume: '11,200/mo', kd: 16, opportunityScore: 'High (94)' },
      { keyword: 'best automated blog writer for webflow', competitorRank: '#5', volume: '8,400/mo', kd: 14, opportunityScore: 'High (98)' },
      { keyword: 'how to inject json-ld schema in wordpress', competitorRank: '#2', volume: '6,900/mo', kd: 22, opportunityScore: 'Medium (88)' },
      { keyword: 'answer engine optimization vs seo', competitorRank: '#1', volume: '14,800/mo', kd: 28, opportunityScore: 'High (91)' },
    ]
  });

  const handleCrawl = (e) => {
    e.preventDefault();
    if (!competitorDomain) return;

    setIsCrawling(true);
    setTimeout(() => {
      const clean = competitorDomain.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
      setCompetitorReport({
        domain: clean,
        organicKeywords: '19,800',
        topTrafficPage: `/blog/${clean.split('.')[0]}-guide`,
        missedGaps: [
          { keyword: `best alternatives to ${clean.split('.')[0]}`, competitorRank: '#2', volume: '12,400/mo', kd: 18, opportunityScore: 'Very High (99)' },
          { keyword: `${clean.split('.')[0]} pricing & features review`, competitorRank: '#1', volume: '9,100/mo', kd: 15, opportunityScore: 'High (95)' },
          { keyword: `how to switch from ${clean.split('.')[0]} to automated seo`, competitorRank: '#4', volume: '5,800/mo', kd: 12, opportunityScore: 'High (96)' },
        ]
      });
      setIsCrawling(false);
    }, 1400);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-semibold mb-2">
            <Search className="w-3.5 h-3.5" />
            <span>Competitor SEO & Content Gap Crawler</span>
          </div>
          <h1 className="text-2xl font-bold text-white font-outfit">Competitor Spy & Content Gaps</h1>
          <p className="text-xs text-slate-400 mt-1">Crawl rival domains to find high-traffic keywords they rank for that you are missing</p>
        </div>
      </div>

      {/* Crawl Bar */}
      <form onSubmit={handleCrawl} className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center gap-3">
        <div className="flex items-center gap-3 px-3 py-2 bg-slate-950 rounded-xl border border-slate-800 flex-1 w-full">
          <Globe className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={competitorDomain}
            onChange={(e) => setCompetitorDomain(e.target.value)}
            placeholder="Enter competitor domain (e.g. competitor.com)"
            className="bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none w-full font-mono"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isCrawling}
          className="w-full sm:w-auto px-6 py-2.5 bg-brand-500 hover:bg-brand-400 text-white font-bold text-xs rounded-xl shadow transition-all flex items-center justify-center gap-2 shrink-0"
        >
          {isCrawling ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Crawling Domain...</span>
            </>
          ) : (
            <>
              <Search className="w-3.5 h-3.5" />
              <span>Analyze Competitor Gap</span>
            </>
          )}
        </button>
      </form>

      {/* Competitor Gap Table */}
      {competitorReport && (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white font-outfit">Content Gaps vs {competitorReport.domain}</h3>
              <p className="text-xs text-slate-400">High-value keywords your competitor ranks for that you can outrank</p>
            </div>
            <span className="bg-brand-500/10 text-brand-400 font-mono text-xs font-semibold px-3 py-1 rounded border border-brand-500/20">
              {competitorReport.missedGaps.length} Actionable Opportunities
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="p-4">Competitor Keyword</th>
                  <th className="p-4">Rival Rank</th>
                  <th className="p-4">Search Volume</th>
                  <th className="p-4">KD</th>
                  <th className="p-4">Opportunity Score</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {competitorReport.missedGaps.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/50 transition-colors">
                    <td className="p-4 font-bold text-white max-w-xs">{item.keyword}</td>
                    <td className="p-4 font-mono font-semibold text-amber-400">{item.competitorRank}</td>
                    <td className="p-4 font-mono text-white">{item.volume}</td>
                    <td className="p-4 font-mono text-slate-400">KD {item.kd}</td>
                    <td className="p-4 font-mono text-emerald-400 font-bold">{item.opportunityScore}</td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => onGenerateArticle(item.keyword)}
                        className="px-3 py-1.5 bg-brand-500 hover:bg-brand-400 text-white font-bold text-xs rounded-lg transition-all shadow-sm shadow-brand-500/20 inline-flex items-center gap-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Outrank with AI</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
