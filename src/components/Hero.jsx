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
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-[#262626] bg-[#121212]">
      
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#3ECF8E]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3ECF8E]/10 border border-[#3ECF8E]/25 text-[#3ECF8E] text-sm font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Next-Gen Autonomous SEO Engine</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] font-sans">
            Boost traffic with an AI SEO engine that automates{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6EE7B7] via-[#3ECF8E] to-[#10B981]">
              everything
            </span>
            <span className="inline-block w-1.5 h-8 sm:h-10 ml-2 bg-[#3ECF8E] animate-pulse align-middle" />
          </h1>

          {/* Description */}
          <p className="mt-6 text-base sm:text-lg text-zinc-300 max-w-2xl font-normal leading-relaxed">
            RankTop is an AI blog writer that does automated keyword research, competitor gap analysis, AI Overview (AEO) optimization, and tracking what ranks. <span className="text-white font-medium">You don't lift a finger.</span>
          </p>

          {/* Instant Audit Form */}
          <form onSubmit={handleAnalyze} className="mt-8 w-full max-w-xl">
            <div className="p-2 rounded-2xl bg-[#171717] border border-[#262626] shadow-2xl flex flex-col sm:flex-row items-center gap-2 focus-within:border-[#3ECF8E] transition-all">
              <div className="flex items-center gap-3 px-3 py-2 w-full sm:w-auto flex-1">
                <Globe className="w-5 h-5 text-zinc-400 shrink-0" />
                <input
                  type="url"
                  placeholder="https://yourwebsite.com"
                  value={targetUrl}
                  onChange={(e) => setTargetUrl(e.target.value)}
                  className="bg-transparent text-white placeholder-zinc-500 text-sm focus:outline-none w-full font-sans"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isAnalyzing}
                className="w-full sm:w-auto px-6 py-3 bg-[#3ECF8E] hover:bg-[#34D399] text-black font-semibold text-sm rounded-xl transition-all shadow-md shadow-[#3ECF8E]/25 flex items-center justify-center gap-2 shrink-0 disabled:opacity-75"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
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
          </form>
        </div>

        {/* Hero Interactive App Mockup Preview */}
        <div className="mt-14 max-w-5xl mx-auto rounded-2xl border border-[#262626] bg-[#171717] p-4 sm:p-6 shadow-2xl shadow-[#3ECF8E]/10">
          <div className="flex items-center justify-between border-b border-[#262626] pb-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="text-sm text-zinc-400 font-sans ml-2">app.ranktop.ai/workspace/mywebsite.com</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-[#3ECF8E] animate-ping" />
              <span>Live Engine Status: Active</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Metric 1 */}
            <div className="bg-[#121212] p-4 rounded-xl border border-[#262626]">
              <div className="flex items-center justify-between text-zinc-400 text-sm mb-2">
                <span>Organic Search Traffic</span>
                <TrendingUp className="w-4 h-4 text-[#3ECF8E]" />
              </div>
              <div className="text-2xl font-bold text-white font-sans">48,920 <span className="text-sm font-normal text-[#3ECF8E] bg-[#3ECF8E]/10 px-2 py-0.5 rounded border border-[#3ECF8E]/20">+142% this month</span></div>
              <div className="w-full bg-[#262626] h-1.5 rounded-full mt-3 overflow-hidden">
                <div className="bg-[#3ECF8E] h-full w-[82%]" />
              </div>
            </div>

            {/* Metric 2 */}
            <div className="bg-[#121212] p-4 rounded-xl border border-[#262626]">
              <div className="flex items-center justify-between text-zinc-400 text-sm mb-2">
                <span>AI Overview Citations</span>
                <Cpu className="w-4 h-4 text-[#3ECF8E]" />
              </div>
              <div className="text-2xl font-bold text-white font-sans">84.6% <span className="text-sm font-normal text-[#3ECF8E] bg-[#3ECF8E]/10 px-2 py-0.5 rounded border border-[#3ECF8E]/20">AEO Rank #1</span></div>
              <div className="w-full bg-[#262626] h-1.5 rounded-full mt-3 overflow-hidden">
                <div className="bg-[#3ECF8E] h-full w-[84%]" />
              </div>
            </div>

            {/* Metric 3 */}
            <div className="bg-[#121212] p-4 rounded-xl border border-[#262626]">
              <div className="flex items-center justify-between text-zinc-400 text-sm mb-2">
                <span>Articles Published</span>
                <Zap className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-bold text-white font-sans">34 Posts <span className="text-sm font-normal text-zinc-400">100% Autopilot</span></div>
              <div className="w-full bg-[#262626] h-1.5 rounded-full mt-3 overflow-hidden">
                <div className="bg-amber-400 h-full w-[100%]" />
              </div>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
}
