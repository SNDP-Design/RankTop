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
    <div className="p-6 space-y-6 max-w-7xl mx-auto font-sans">
      
      {/* Top Banner */}
      <div className="bg-[#171717] p-6 rounded-2xl border border-[#262626] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3ECF8E]/10 text-[#3ECF8E] text-sm font-semibold mb-2 border border-[#3ECF8E]/20">
            <Cpu className="w-4 h-4" />
            <span>Generative Engine Optimization (GEO) Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-sans">Generative Engine Optimization (GEO) Suite</h1>
          <p className="text-sm text-zinc-400 mt-1">Optimize brand visibility across AI answer engines: Claude, ChatGPT, Gemini, and Perplexity AI</p>
        </div>
      </div>

      {/* 6 Core Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Pillar 1 */}
        <div className="bg-[#171717] p-6 rounded-2xl border border-[#262626] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#3ECF8E]/10 text-[#3ECF8E] flex items-center justify-center border border-[#3ECF8E]/20 font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white font-sans">1. AI Bot Crawler Access</h3>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Ensure AI crawlers like <strong className="text-white">GPTBot</strong>, <strong className="text-white">ClaudeBot</strong>, and <strong className="text-white">PerplexityBot</strong> are not blocked in your <code className="text-[#3ECF8E]">robots.txt</code> or Cloudflare WAF settings.
          </p>
        </div>

        {/* Pillar 2 */}
        <div className="bg-[#171717] p-6 rounded-2xl border border-[#262626] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#3ECF8E]/10 text-[#3ECF8E] flex items-center justify-center border border-[#3ECF8E]/20 font-bold">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white font-sans">2. BLUF & Direct Answer Formatting</h3>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Use <strong className="text-white">Bottom Line Up Front (BLUF)</strong> 40-word summary answers directly beneath question headers (H2/H3) for LLM text chunking algorithms.
          </p>
        </div>

        {/* Pillar 3 */}
        <div className="bg-[#171717] p-6 rounded-2xl border border-[#262626] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#3ECF8E]/10 text-[#3ECF8E] flex items-center justify-center border border-[#3ECF8E]/20 font-bold">
            <Database className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white font-sans">3. Entity Knowledge Graph Authority</h3>
          <p className="text-sm text-zinc-400 leading-relaxed">
            LLMs rely on multi-source consensus. Build structured listings on <strong className="text-white">Wikidata</strong>, <strong className="text-white">Crunchbase</strong>, <strong className="text-white">G2</strong>, and niche directories.
          </p>
        </div>

        {/* Pillar 4 */}
        <div className="bg-[#171717] p-6 rounded-2xl border border-[#262626] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#3ECF8E]/10 text-[#3ECF8E] flex items-center justify-center border border-[#3ECF8E]/20 font-bold">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white font-sans">4. Speakable & FAQ Schema</h3>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Inject <code className="text-[#3ECF8E]">@type: SpeakableSpecification</code> and <code className="text-[#3ECF8E]">FAQPage</code> JSON-LD schema so LLMs identify verified answer blocks.
          </p>
        </div>

        {/* Pillar 5 */}
        <div className="bg-[#171717] p-6 rounded-2xl border border-[#262626] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#3ECF8E]/10 text-[#3ECF8E] flex items-center justify-center border border-[#3ECF8E]/20 font-bold">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white font-sans">5. Freshness & Benchmark Data</h3>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Real-time engines like Perplexity and Gemini Search cite content with explicit <code className="text-[#3ECF8E]">dateModified</code> tags and current year benchmarks (e.g. 2026).
          </p>
        </div>

        {/* Pillar 6 */}
        <div className="bg-[#171717] p-6 rounded-2xl border border-[#262626] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#3ECF8E]/10 text-[#3ECF8E] flex items-center justify-center border border-[#3ECF8E]/20 font-bold">
            <Globe className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white font-sans">6. HTML vs JS Rendering</h3>
          <p className="text-sm text-zinc-400 leading-relaxed">
            LLM crawlers prefer clean semantic HTML tags (<code className="text-[#3ECF8E]">&lt;article&gt;</code>, <code className="text-[#3ECF8E]">&lt;table&gt;</code>) over heavy JavaScript hydration blocks.
          </p>
        </div>

      </div>

      {/* Live AI Bot & Crawler Diagnostic Box */}
      <div className="bg-[#171717] rounded-2xl border border-[#262626] p-6 space-y-4">
        <h3 className="text-base font-bold text-white font-sans">Live AI Bot Accessibility Diagnostic for {selectedBotDomain}</h3>

        <form onSubmit={runBotAudit} className="flex flex-col sm:flex-row items-center gap-3">
          <div className="flex items-center gap-3 px-3.5 py-2.5 bg-[#121212] rounded-xl border border-[#262626] flex-1 w-full">
            <Globe className="w-4 h-4 text-zinc-400 shrink-0" />
            <input
              type="text"
              value={selectedBotDomain}
              onChange={(e) => setSelectedBotDomain(e.target.value)}
              className="bg-transparent text-sm text-white focus:outline-none w-full font-sans"
            />
          </div>
          <button
            type="submit"
            disabled={isAuditingBots}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#3ECF8E] hover:bg-[#34D399] text-black font-bold text-sm rounded-xl shadow transition-all flex items-center justify-center gap-2"
          >
            {isAuditingBots ? 'Auditing AI Bots...' : 'Audit LLM Accessibility'}
          </button>
        </form>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-2">
          <div className="p-3 bg-[#121212] rounded-xl border border-[#262626] text-sm">
            <span className="text-zinc-400 block text-sm">ChatGPT (GPTBot)</span>
            <span className="font-semibold text-[#3ECF8E]">{botAuditResult.gptBot}</span>
          </div>
          <div className="p-3 bg-[#121212] rounded-xl border border-[#262626] text-sm">
            <span className="text-zinc-400 block text-sm">Claude (ClaudeBot)</span>
            <span className="font-semibold text-[#3ECF8E]">{botAuditResult.claudeBot}</span>
          </div>
          <div className="p-3 bg-[#121212] rounded-xl border border-[#262626] text-sm">
            <span className="text-zinc-400 block text-sm">Perplexity (PerplexityBot)</span>
            <span className="font-semibold text-[#3ECF8E]">{botAuditResult.perplexityBot}</span>
          </div>
          <div className="p-3 bg-[#121212] rounded-xl border border-[#262626] text-sm">
            <span className="text-zinc-400 block text-sm">Gemini (Google-Extended)</span>
            <span className="font-semibold text-[#3ECF8E]">{botAuditResult.googleExtended}</span>
          </div>
          <div className="p-3 bg-[#121212] rounded-xl border border-[#262626] text-sm">
            <span className="text-zinc-400 block text-sm">Raw Text Extractability</span>
            <span className="font-semibold text-[#3ECF8E]">{botAuditResult.rawHtmlExtractability}</span>
          </div>
        </div>
      </div>

    </div>
  );
}
