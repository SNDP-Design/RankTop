import React, { useState } from 'react';
import { Search, ArrowRight, Sparkles, CheckCircle2, TrendingUp, Cpu, Globe, Zap, AlertCircle, BarChart, ShieldCheck, X } from 'lucide-react';

export default function Hero({ onOpenApp }) {
  const [targetUrl, setTargetUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleAnalyze = (e) => {
    e.preventDefault();
    if (!targetUrl.trim()) return;

    setIsAnalyzing(true);
    // Simulate real-time website audit & SEO opportunity discovery
    setTimeout(() => {
      const cleanDomain = targetUrl.replace(/^https?:\/\//, '').replace(/\/.*$/, '') || 'yourwebsite.com';
      setAnalysisResult({
        domain: cleanDomain,
        seoHealthScore: Math.floor(Math.random() * 20) + 72,
        organicTraffic: '14,200',
        potentialGrowth: '+340%',
        missedKeywords: [
          { keyword: `best ${cleanDomain.split('.')[0]} strategies`, searchVolume: '4,400/mo', difficulty: 'Easy (22)', intent: 'Commercial' },
          { keyword: `${cleanDomain.split('.')[0]} vs top alternatives`, searchVolume: '8,100/mo', difficulty: 'Medium (38)', intent: 'High Intent' },
          { keyword: `how to optimize ${cleanDomain.split('.')[0]} workflow`, searchVolume: '3,200/mo', difficulty: 'Easy (18)', intent: 'Informational' },
          { keyword: `ai automation for ${cleanDomain.split('.')[0]}`, searchVolume: '12,500/mo', difficulty: 'Low (15)', intent: 'Transactional' },
        ],
        aiOverviewStatus: '2 out of 5 core topic queries cited by AI Overviews',
        recommendedArticles: [
          `The Ultimate Guide to ${cleanDomain.split('.')[0]} in 2026`,
          `5 Proven Workflows to Scale Traffic with AI SEO`,
          `Why Top Brands Are Switching to Automated SEO Engines`
        ]
      });
      setIsAnalyzing(false);
    }, 1800);
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-800/60 bg-gradient-to-b from-[#0B0F17] via-[#101622] to-[#0B0F17]">
      
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-brand-500/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/25 text-brand-400 text-xs font-semibold uppercase tracking-wider mb-6 animate-pulse-fast">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Next-Gen Autonomous SEO Engine</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] font-outfit">
            Boost traffic with an AI SEO engine that automates{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-brand-500 to-orange-400">
              everything
            </span>
            <span className="inline-block w-1.5 h-8 sm:h-10 ml-2 bg-brand-500 animate-pulse align-middle" />
          </h1>

          {/* Description */}
          <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
            Seosorted is an AI blog writer that does automated keyword research, competitor gap analysis, AI Overview (AEO) optimization, and tracking what ranks. <span className="text-white font-medium">You don't lift a finger.</span>
          </p>

          {/* Instant Audit Form */}
          <form onSubmit={handleAnalyze} className="mt-8 w-full max-w-xl">
            <div className="p-2 rounded-2xl bg-slate-900/90 border border-slate-700/80 shadow-2xl flex flex-col sm:flex-row items-center gap-2 focus-within:border-brand-500 transition-all">
              <div className="flex items-center gap-3 px-3 py-2 w-full sm:w-auto flex-1">
                <Globe className="w-5 h-5 text-slate-400 shrink-0" />
                <input
                  type="url"
                  placeholder="https://yourwebsite.com"
                  value={targetUrl}
                  onChange={(e) => setTargetUrl(e.target.value)}
                  className="bg-transparent text-white placeholder-slate-500 text-sm focus:outline-none w-full font-mono"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isAnalyzing}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white font-semibold text-sm rounded-xl transition-all shadow-md shadow-brand-500/25 flex items-center justify-center gap-2 shrink-0 disabled:opacity-75"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Analyzing Site...</span>
                  </>
                ) : (
                  <>
                    <span>Analyze Website</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-2.5 flex items-center justify-center gap-4">
              <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Free instant audit</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> No credit card required</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Live AI overview simulation</span>
            </p>
          </form>
        </div>

        {/* Hero Interactive App Mockup Preview */}
        <div className="mt-14 max-w-5xl mx-auto rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl p-4 sm:p-6 shadow-2xl shadow-brand-500/10">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="text-xs text-slate-400 font-mono ml-2">app.seosorted.ai/workspace/mywebsite.com</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Live Engine Status: Active</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Metric 1 */}
            <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                <span>Organic Search Traffic</span>
                <TrendingUp className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-bold text-white font-outfit">48,920 <span className="text-xs font-normal text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">+142% this month</span></div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
                <div className="bg-gradient-to-r from-brand-500 to-emerald-400 h-full w-[82%]" />
              </div>
            </div>

            {/* Metric 2 */}
            <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                <span>AI Overview Citations</span>
                <Cpu className="w-4 h-4 text-brand-400" />
              </div>
              <div className="text-2xl font-bold text-white font-outfit">84.6% <span className="text-xs font-normal text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded border border-brand-500/20">AEO Rank #1</span></div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
                <div className="bg-brand-500 h-full w-[84%]" />
              </div>
            </div>

            {/* Metric 3 */}
            <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                <span>Articles Published</span>
                <Zap className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-bold text-white font-outfit">34 Posts <span className="text-xs font-normal text-slate-400">100% Autopilot</span></div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
                <div className="bg-amber-400 h-full w-[100%]" />
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-slate-950/80 rounded-xl border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-brand-500/10 text-brand-400 flex items-center justify-center shrink-0 border border-brand-500/20">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">AI SEO Pipeline Suggestion</h4>
                <p className="text-sm text-slate-300 font-medium">3 High-Intent Articles Ready to Generate for "B2B SaaS Growth Workflows"</p>
              </div>
            </div>
            <button 
              onClick={() => onOpenApp('studio')}
              className="px-4 py-2 bg-brand-500 hover:bg-brand-400 text-white text-xs font-bold rounded-lg transition-all shrink-0 flex items-center gap-1.5 shadow-md shadow-brand-500/20"
            >
              <span>Launch Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Modal for Website Analysis Result */}
      {analysisResult && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button 
              onClick={() => setAnalysisResult(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-500">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-outfit">Instant SEO Analysis for {analysisResult.domain}</h3>
                <p className="text-xs text-slate-400">Live AI Crawl & Keyword Opportunity Diagnostic</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                <span className="text-xs text-slate-400 block">SEO Health Score</span>
                <span className="text-2xl font-extrabold text-brand-400 font-outfit">{analysisResult.seoHealthScore}/100</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                <span className="text-xs text-slate-400 block">Estimated Organic</span>
                <span className="text-2xl font-extrabold text-white font-outfit">{analysisResult.organicTraffic}</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                <span className="text-xs text-slate-400 block">Traffic Potential</span>
                <span className="text-2xl font-extrabold text-emerald-400 font-outfit">{analysisResult.potentialGrowth}</span>
              </div>
            </div>

            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">High-Value Keyword Opportunities Discovered</h4>
            <div className="space-y-2 mb-6">
              {analysisResult.missedKeywords.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 bg-slate-950/80 rounded-lg border border-slate-800 text-xs">
                  <span className="font-semibold text-white">{item.keyword}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400">{item.searchVolume}</span>
                    <span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">{item.difficulty}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => {
                  setAnalysisResult(null);
                  onOpenApp('strategy');
                }}
                className="flex-1 py-3 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white font-bold text-sm rounded-xl transition-all text-center shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2"
              >
                <span>Automate Content Strategy Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
