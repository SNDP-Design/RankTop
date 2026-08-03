import React, { useState } from 'react';
import { Search, Code, Sparkles, Copy, Check, ExternalLink } from 'lucide-react';

export default function FreeToolsApp() {
  const [activeTool, setActiveTool] = useState('serp');

  // SERP State
  const [serpTitle, setSerpTitle] = useState('Top 10 AI SEO Tools to Automate Keyword Research in 2026');
  const [serpUrl, setSerpUrl] = useState('https://mywebsite.com/blog/ai-seo-tools');
  const [serpDesc, setSerpDesc] = useState('Discover the best automated AI SEO engines. Save 40+ hours per week with automated keyword clustering, AI article drafting, and schema injection.');

  // Schema State
  const [schemaTitle, setSchemaTitle] = useState('How to Rank in Google AI Overviews');
  const [schemaAuthor, setSchemaAuthor] = useState('RankTop Strategy Team');
  const [copiedSchema, setCopiedSchema] = useState(false);

  // Title Generator State
  const [topicInput, setTopicInput] = useState('AI SEO Automation');
  const [generatedTitles, setGeneratedTitles] = useState([
    '7 Unstoppable AI SEO Workflows That Scale Organic Traffic in 30 Days',
    'Why Manual Keyword Research Is Dead (And What to Do Instead)',
    'The Complete Guide to Answer Engine Optimization (AEO) in 2026'
  ]);

  const copySchemaText = () => {
    const json = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": schemaTitle,
      "author": {
        "@type": "Person",
        "name": schemaAuthor
      },
      "publisher": {
        "@type": "Organization",
        "name": "RankTop AI"
      }
    }, null, 2);

    navigator.clipboard.writeText(json);
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2000);
  };

  return (
    <div className="w-full space-y-3 font-sans">
      
      {/* Header Banner */}
      <div className="bg-[#171717] p-4 rounded-xl border border-[#262626] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-white font-sans">Free Voice & FAQ Micro-Tools Playground</h1>
          <p className="text-xs text-zinc-400 mt-0.5">Standalone micro-utilities for SERP snippet previews, JSON-LD schema generation, and high-CTR headline creation.</p>
        </div>
      </div>

      {/* Tool Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTool('serp')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 shrink-0 transition-all ${
            activeTool === 'serp' ? 'bg-[#3ECF8E] text-black font-bold shadow' : 'bg-[#171717] border border-[#262626] text-zinc-400 hover:text-white'
          }`}
        >
          <Search className="w-3.5 h-3.5" />
          <span>Google SERP Previewer</span>
        </button>

        <button
          onClick={() => setActiveTool('schema')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 shrink-0 transition-all ${
            activeTool === 'schema' ? 'bg-[#3ECF8E] text-black font-bold shadow' : 'bg-[#171717] border border-[#262626] text-zinc-400 hover:text-white'
          }`}
        >
          <Code className="w-3.5 h-3.5" />
          <span>Schema JSON-LD Generator</span>
        </button>

        <button
          onClick={() => setActiveTool('titles')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 shrink-0 transition-all ${
            activeTool === 'titles' ? 'bg-[#3ECF8E] text-black font-bold shadow' : 'bg-[#171717] border border-[#262626] text-zinc-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Headline & Hook Generator</span>
        </button>
      </div>

      {/* TOOL 1: Google SERP Previewer */}
      {activeTool === 'serp' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 w-full items-start">
          <div className="lg:col-span-6 bg-[#171717] rounded-xl border border-[#262626] p-4 space-y-3">
            <h3 className="text-xs font-bold text-white font-sans">Edit Meta Tag Snippet</h3>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-zinc-300">
                Meta Title ({serpTitle.length}/60 chars)
              </label>
              <input
                type="text"
                value={serpTitle}
                onChange={(e) => setSerpTitle(e.target.value)}
                className="w-full bg-[#121212] border border-[#262626] rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#3ECF8E]"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-zinc-300">
                Target URL
              </label>
              <input
                type="text"
                value={serpUrl}
                onChange={(e) => setSerpUrl(e.target.value)}
                className="w-full bg-[#121212] border border-[#262626] rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#3ECF8E] font-sans"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-zinc-300">
                Meta Description ({serpDesc.length}/160 chars)
              </label>
              <textarea
                rows={3}
                value={serpDesc}
                onChange={(e) => setSerpDesc(e.target.value)}
                className="w-full bg-[#121212] border border-[#262626] rounded-lg p-2.5 text-xs text-zinc-200 focus:outline-none focus:border-[#3ECF8E] leading-relaxed"
              />
            </div>
          </div>

          <div className="lg:col-span-6 bg-[#171717] rounded-xl border border-[#262626] p-4 space-y-3">
            <h3 className="text-xs font-bold text-white font-sans">Live Google Desktop SERP Preview</h3>

            <div className="bg-white p-4 rounded-lg border border-slate-200 text-slate-900 font-sans shadow space-y-1">
              <div className="text-xs text-[#202124] flex items-center gap-1 font-sans truncate">
                <span>{serpUrl}</span>
              </div>
              <h4 className="text-base text-[#1a0dab] font-semibold hover:underline cursor-pointer leading-snug line-clamp-1">
                {serpTitle || 'Your Meta Title Here'}
              </h4>
              <p className="text-xs text-[#4d5156] leading-relaxed line-clamp-2">
                {serpDesc || 'Your Meta Description Here'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TOOL 2: Schema Generator */}
      {activeTool === 'schema' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 w-full items-start">
          <div className="lg:col-span-6 bg-[#171717] rounded-xl border border-[#262626] p-4 space-y-3">
            <h3 className="text-xs font-bold text-white font-sans">BlogPosting Schema Generator</h3>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-zinc-300">
                Article Headline
              </label>
              <input
                type="text"
                value={schemaTitle}
                onChange={(e) => setSchemaTitle(e.target.value)}
                className="w-full bg-[#121212] border border-[#262626] rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#3ECF8E]"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-zinc-300">
                Author Name / Organization
              </label>
              <input
                type="text"
                value={schemaAuthor}
                onChange={(e) => setSchemaAuthor(e.target.value)}
                className="w-full bg-[#121212] border border-[#262626] rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#3ECF8E]"
              />
            </div>
          </div>

          <div className="lg:col-span-6 bg-[#171717] rounded-xl border border-[#262626] p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-white font-sans">Validated JSON-LD Schema Output</h3>
              <button
                onClick={copySchemaText}
                className="px-3 py-1 bg-[#3ECF8E] hover:bg-[#34D399] text-black rounded-lg text-xs font-bold flex items-center gap-1 shadow"
              >
                {copiedSchema ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSchema ? 'Copied' : 'Copy JSON-LD'}</span>
              </button>
            </div>

            <pre className="bg-[#121212] p-3 rounded-lg border border-[#262626] text-xs font-sans text-[#3ECF8E] overflow-x-auto">
{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": schemaTitle,
  "author": {
    "@type": "Person",
    "name": schemaAuthor
  },
  "publisher": {
    "@type": "Organization",
    "name": "RankTop AI"
  }
}, null, 2)}
            </pre>
          </div>
        </div>
      )}

      {/* TOOL 3: Headline & Hook Generator */}
      {activeTool === 'titles' && (
        <div className="bg-[#171717] rounded-xl border border-[#262626] p-4 space-y-3 w-full">
          <h3 className="text-xs font-bold text-white font-sans">AI High-CTR Headline Generator</h3>

          <div className="flex gap-2">
            <input
              type="text"
              value={topicInput}
              onChange={(e) => setTopicInput(e.target.value)}
              placeholder="e.g. B2B Content Strategy"
              className="flex-1 bg-[#121212] border border-[#262626] rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#3ECF8E]"
            />
            <button className="px-4 py-1.5 bg-[#3ECF8E] hover:bg-[#34D399] text-black font-bold text-xs rounded-lg shadow">
              Generate Headlines
            </button>
          </div>

          <div className="space-y-2 pt-1">
            {generatedTitles.map((t, idx) => (
              <div key={idx} className="p-3 bg-[#121212] rounded-lg border border-[#262626] flex items-center justify-between text-xs text-white font-semibold">
                <span>{t}</span>
                <span className="text-[#3ECF8E] font-sans text-xs bg-[#3ECF8E]/10 px-2 py-0.5 rounded border border-[#3ECF8E]/20">CTR: 9.8%</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
