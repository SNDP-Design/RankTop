import React, { useState } from 'react';
import { Cpu, Sparkles, CheckCircle2, AlertTriangle, ArrowRight, HelpCircle, RefreshCw, BarChart2 } from 'lucide-react';

export default function AeoSimulatorApp() {
  const [targetQuery, setTargetQuery] = useState('What are the top features of an AI SEO blog writing engine?');
  const [articleContent, setArticleContent] = useState(
    `An AI SEO blog writing engine automates the end-to-end content production pipeline. 
First, it performs automated keyword research and topic clustering using live search intent data.
Second, it writes full-length 2,000+ word blog posts complete with H2/H3 headings, internal links, and visual assets.
Third, it automatically injects Article JSON-LD schema markup and publishes directly to CMS platforms like WordPress and Webflow.
Finally, it tracks organic performance in Google Search Console to continuously optimize top-ranking posts.`
  );
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [report, setReport] = useState(null);

  const runInspector = (e) => {
    e.preventDefault();
    if (!targetQuery || !articleContent) return;

    setIsAnalyzing(true);
    setTimeout(() => {
      setReport({
        citationScore: '96%',
        aiOverviewRank: 'Featured Answer #1 Source',
        llmExtractability: 'Very High',
        extractedBullets: [
          'Automates keyword research and topic clustering using live search intent.',
          'Writes 2,000+ word articles with H2/H3 headings, internal links, and visual assets.',
          'Injects JSON-LD schema markup and auto-publishes to WordPress & Webflow.',
          'Syncs with Google Search Console for closed-loop performance tracking.'
        ],
        aeoFixes: [
          'Add a direct comparison table for different CMS connectors to increase LLM table extraction rate.',
          'Include 2-3 specific percentage growth metrics (e.g. +74% average traffic growth).'
        ]
      });
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-semibold mb-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>Answer Engine Optimization (AEO) Inspector</span>
          </div>
          <h1 className="text-2xl font-bold text-white font-outfit">Google AI Overview & ChatGPT Simulator</h1>
          <p className="text-xs text-slate-400 mt-1">Analyze how artificial intelligence engines extract, cite, and credit your brand as an authoritative source</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Input Form */}
        <div className="lg:col-span-6 bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
          <h2 className="text-sm font-bold text-white font-outfit">Simulate LLM Answer Extraction</h2>

          <form onSubmit={runInspector} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Target User Query / Question
              </label>
              <input
                type="text"
                value={targetQuery}
                onChange={(e) => setTargetQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-500 font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Article Body / Content Draft
              </label>
              <textarea
                rows={8}
                value={articleContent}
                onChange={(e) => setArticleContent(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-brand-500 font-sans leading-relaxed"
              />
            </div>

            <button
              type="submit"
              disabled={isAnalyzing}
              className="w-full py-3 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white font-bold text-xs rounded-xl shadow-lg shadow-brand-500/25 transition-all flex items-center justify-center gap-2"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Simulating LLM Answer Engine...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Run AI Overview Inspection</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-6 space-y-4">
          
          {report ? (
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-5 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs text-slate-400 block">AI Citation Probability</span>
                  <span className="text-3xl font-extrabold text-emerald-400 font-outfit">{report.citationScore}</span>
                </div>
                <span className="bg-brand-500/10 text-brand-400 text-xs font-semibold px-3 py-1 rounded-full border border-brand-500/20 font-mono">
                  {report.aiOverviewRank}
                </span>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Extracted Bullet Points (How AI Presents Your Article):
                </h3>
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs text-slate-300 font-sans leading-relaxed">
                  {report.extractedBullets.map((bullet, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-brand-500 font-bold">•</span>
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl space-y-2">
                <h4 className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-400" /> Actionable AEO Structural Recommendations
                </h4>
                <ul className="space-y-1 text-xs text-amber-200/90 pl-5 list-disc">
                  {report.aeoFixes.map((fix, idx) => (
                    <li key={idx}>{fix}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-500 mx-auto flex items-center justify-center border border-brand-500/20">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white font-outfit">Ready to Inspect AEO Score</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Fill in your target question and article draft on the left to generate a live AI Overview citation analysis.
              </p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
