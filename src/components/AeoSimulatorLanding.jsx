import React, { useState } from 'react';
import { Cpu, Sparkles, CheckCircle2, AlertTriangle, ArrowRight, HelpCircle } from 'lucide-react';

export default function AeoSimulatorLanding({ onOpenApp }) {
  const [query, setQuery] = useState('How does automated AI SEO increase organic traffic?');
  const [contentSnippet, setContentSnippet] = useState(
    'Automated AI SEO engines replace manual keyword research with machine learning topic clustering. By generating structured blog posts with JSON-LD schema, high-intent headers, and internal links, AI engines systematically capture search volume and rank in Google AI Overviews.'
  );
  const [isSimulating, setIsSimulating] = useState(false);
  const [result, setResult] = useState(null);

  const runSimulation = (e) => {
    e.preventDefault();
    if (!query || !contentSnippet) return;

    setIsSimulating(true);
    setTimeout(() => {
      setResult({
        citationProbability: '92%',
        aiOverviewRank: 'Featured Citation #1',
        extractedBullets: [
          'Machine learning topic clustering replaces manual keyword research.',
          'Structured blog posts incorporate JSON-LD schema & H2/H3 headers.',
          'Systematic coverage boosts presence in Google AI Overviews.'
        ],
        aeoRecommendations: [
          'Add direct statistics or numerical metrics in paragraph 1.',
          'Structure key answers as concise bulleted lists for higher LLM extraction rate.'
        ]
      });
      setIsSimulating(false);
    }, 1400);
  };

  return (
    <section id="aeo-simulator" className="py-20 bg-slate-950 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Description */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 text-brand-400 text-xs font-semibold uppercase tracking-wider mb-4 border border-brand-500/20">
              <Cpu className="w-3.5 h-3.5" />
              <span>Answer Engine Optimization (AEO)</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-outfit tracking-tight">
              Test your content against Google AI Overviews & ChatGPT
            </h2>
            <p className="mt-4 text-slate-300 text-sm leading-relaxed">
              Google AI Overviews and answer engines don't rank pages like traditional SERPs. They extract precise facts and cite authoritative sources.
            </p>
            <p className="mt-3 text-slate-400 text-sm leading-relaxed">
              Use our built-in <strong className="text-white">AI Overview Simulator</strong> to evaluate how likely your articles are to be featured as AI sources.
            </p>

            <div className="mt-6 space-y-3 text-sm text-slate-300">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Simulate LLM content extraction & citation score</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Identify missing AEO structure & key takeaway gaps</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Optimize articles for Perplexity, Claude, & Google AI</span>
              </div>
            </div>

            <button 
              onClick={() => onOpenApp('aeo')}
              className="mt-8 px-6 py-3 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white font-bold text-xs rounded-xl shadow-lg shadow-brand-500/20 transition-all inline-flex items-center gap-2"
            >
              <span>Open Full AEO Simulator Tool</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right Column Interactive Tester */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
            <h3 className="text-lg font-bold text-white font-outfit mb-4 flex items-center justify-between">
              <span>Interactive AI Overview Simulator Demo</span>
              <span className="text-xs font-mono font-normal text-brand-400 bg-brand-500/10 px-2.5 py-1 rounded border border-brand-500/20">Live Playground</span>
            </h3>

            <form onSubmit={runSimulation} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Target Search Query / Question
                </label>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 font-sans"
                  placeholder="e.g., How does AI SEO work?"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Article Content / Answer Snippet
                </label>
                <textarea
                  rows={4}
                  value={contentSnippet}
                  onChange={(e) => setContentSnippet(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-brand-500 font-sans leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={isSimulating}
                className="w-full py-3 bg-brand-500 hover:bg-brand-400 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-brand-500/20 flex items-center justify-center gap-2"
              >
                {isSimulating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Simulating AI Overview Engine...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Run AI Overview Test</span>
                  </>
                )}
              </button>
            </form>

            {/* Results Box */}
            {result && (
              <div className="mt-6 p-4 bg-slate-950 rounded-xl border border-slate-800 animate-in fade-in">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                  <div>
                    <span className="text-xs text-slate-400 block">AI Citation Probability</span>
                    <span className="text-xl font-bold text-emerald-400 font-outfit">{result.citationProbability} (High)</span>
                  </div>
                  <span className="bg-brand-500/10 text-brand-400 text-xs font-semibold px-3 py-1 rounded-full border border-brand-500/20">
                    {result.aiOverviewRank}
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="font-semibold text-slate-300 block mb-1">Extracted Key Facts:</span>
                    <ul className="space-y-1 text-slate-400">
                      {result.extractedBullets.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-brand-500 font-bold">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-300">
                    <span className="font-semibold block mb-0.5 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> AEO Improvement Tip:
                    </span>
                    <span>{result.aeoRecommendations[0]}</span>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
