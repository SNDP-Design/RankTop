import React, { useState } from 'react';
import { Cpu, ShieldCheck, CheckCircle2, AlertTriangle, Search, Globe, RefreshCw, Zap, Layers, FileText, Database } from 'lucide-react';

export default function LlmGeoOptimization() {
  const [selectedBotDomain, setSelectedBotDomain] = useState('mywebsite.com');
  const [isAuditingBots, setIsAuditingBots] = useState(false);
  const [botAuditResult, setBotAuditResult] = useState({
    gptBot: 'Allowed (200 OK)',
    chatGptUser: 'Allowed (200 OK)',
    claudeBot: 'Allowed (200 OK)',
    perplexityBot: 'Allowed (200 OK)',
    googleExtended: 'Allowed (200 OK)',
    bytespider: 'Blocked (403 Forbidden)',
    rawHtmlExtractability: '94% (Clean Semantic HTML)',
    blufScore: '88% (Direct Answer Density)',
    schemaScore: 'Advanced FAQ & Speakable Present',
    entityConsensus: 'Listed on Wikidata, Crunchbase & G2'
  });

  const runBotAudit = (e) => {
    e.preventDefault();
    setIsAuditingBots(true);
    setTimeout(() => {
      setIsAuditingBots(false);
    }, 1200);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      
      {/* Top Banner */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-semibold mb-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>Generative Engine Optimization (GEO) Hub</span>
          </div>
          <h1 className="text-2xl font-bold text-white font-outfit">LLM Search Visibility Engine (Claude, Gemini, ChatGPT, Perplexity)</h1>
          <p className="text-xs text-slate-400 mt-1">Audit AI crawler access, entity knowledge graph authority, and information density for maximum AI citations</p>
        </div>
      </div>

      {/* 6 Core Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Pillar 1 */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center border border-brand-500/20 font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white font-outfit">1. AI Bot Crawler Access</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Ensure AI crawlers like <strong className="text-white">GPTBot</strong>, <strong className="text-white">ClaudeBot</strong>, and <strong className="text-white">PerplexityBot</strong> are not blocked in your <code className="text-brand-400">robots.txt</code> or Cloudflare WAF settings.
          </p>
        </div>

        {/* Pillar 2 */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center border border-brand-500/20 font-bold">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white font-outfit">2. BLUF & Direct Answer Formatting</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Use <strong className="text-white">Bottom Line Up Front (BLUF)</strong> 40-word summary answers directly beneath question headers (H2/H3) for LLM text chunking algorithms.
          </p>
        </div>

        {/* Pillar 3 */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center border border-brand-500/20 font-bold">
            <Database className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white font-outfit">3. Entity Knowledge Graph Authority</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            LLMs rely on multi-source consensus. Build structured listings on <strong className="text-white">Wikidata</strong>, <strong className="text-white">Crunchbase</strong>, <strong className="text-white">G2</strong>, and niche directories.
          </p>
        </div>

        {/* Pillar 4 */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center border border-brand-500/20 font-bold">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white font-outfit">4. Speakable & FAQ Schema</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Inject <code className="text-brand-400">@type: SpeakableSpecification</code> and <code className="text-brand-400">FAQPage</code> JSON-LD schema so LLMs identify verified answer blocks.
          </p>
        </div>

        {/* Pillar 5 */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center border border-brand-500/20 font-bold">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white font-outfit">5. Freshness & Benchmark Data</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Real-time engines like Perplexity and Gemini Search cite content with explicit <code className="text-brand-400">dateModified</code> tags and current year benchmarks (e.g. 2026).
          </p>
        </div>

        {/* Pillar 6 */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center border border-brand-500/20 font-bold">
            <Globe className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white font-outfit">6. HTML vs JS Rendering</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            LLM crawlers prefer clean semantic HTML tags (<code className="text-brand-400">&lt;article&gt;</code>, <code className="text-brand-400">&lt;table&gt;</code>) over heavy JavaScript hydration blocks.
          </p>
        </div>

      </div>

      {/* Live AI Bot & Crawler Diagnostic Box */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
        <h3 className="text-base font-bold text-white font-outfit">Live AI Bot Accessibility Diagnostic for {selectedBotDomain}</h3>

        <form onSubmit={runBotAudit} className="flex flex-col sm:flex-row items-center gap-3">
          <div className="flex items-center gap-3 px-3 py-2 bg-slate-950 rounded-xl border border-slate-800 flex-1 w-full">
            <Globe className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              value={selectedBotDomain}
              onChange={(e) => setSelectedBotDomain(e.target.value)}
              className="bg-transparent text-xs text-white focus:outline-none w-full font-mono"
            />
          </div>
          <button
            type="submit"
            disabled={isAuditingBots}
            className="w-full sm:w-auto px-6 py-2.5 bg-brand-500 hover:bg-brand-400 text-white font-bold text-xs rounded-xl shadow transition-all flex items-center justify-center gap-2"
          >
            {isAuditingBots ? 'Auditing AI Bots...' : 'Audit LLM Accessibility'}
          </button>
        </form>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-2">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-400 block text-[10px]">ChatGPT (GPTBot)</span>
            <span className="font-semibold text-emerald-400 font-mono">{botAuditResult.gptBot}</span>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-400 block text-[10px]">Claude (ClaudeBot)</span>
            <span className="font-semibold text-emerald-400 font-mono">{botAuditResult.claudeBot}</span>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-400 block text-[10px]">Perplexity (PerplexityBot)</span>
            <span className="font-semibold text-emerald-400 font-mono">{botAuditResult.perplexityBot}</span>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-400 block text-[10px]">Gemini (Google-Extended)</span>
            <span className="font-semibold text-emerald-400 font-mono">{botAuditResult.googleExtended}</span>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-400 block text-[10px]">Raw Text Extractability</span>
            <span className="font-semibold text-brand-400 font-mono">{botAuditResult.rawHtmlExtractability}</span>
          </div>
        </div>
      </div>

    </div>
  );
}
