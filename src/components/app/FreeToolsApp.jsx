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
    <div className="p-6 space-y-6 max-w-7xl mx-auto font-sans">
      
      {/* Header */}
      <div className="bg-[#171717] p-6 rounded-2xl border border-[#262626] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-sans">Free SEO Micro-Tools Playground</h1>
          <p className="text-sm text-zinc-400 mt-1">Standalone micro-utilities for SERP snippet previews, JSON-LD schema generation, and high-CTR headline creation</p>
        </div>
      </div>

      {/* Tool Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveTool('serp')}
          className={`px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 shrink-0 transition-all ${
            activeTool === 'serp' ? 'bg-[#3ECF8E] text-black font-bold shadow' : 'bg-[#171717] border border-[#262626] text-zinc-400 hover:text-white'
          }`}
        >
          <Search className="w-4 h-4" />
          <span>Google SERP Previewer</span>
        </button>

        <button
          onClick={() => setActiveTool('schema')}
          className={`px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 shrink-0 transition-all ${
            activeTool === 'schema' ? 'bg-[#3ECF8E] text-black font-bold shadow' : 'bg-[#171717] border border-[#262626] text-zinc-400 hover:text-white'
          }`}
        >
          <Code className="w-4 h-4" />
          <span>Schema JSON-LD Generator</span>
        </button>

        <button
          onClick={() => setActiveTool('titles')}
          className={`px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 shrink-0 transition-all ${
            activeTool === 'titles' ? 'bg-[#3ECF8E] text-black font-bold shadow' : 'bg-[#171717] border border-[#262626] text-zinc-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>AI Headline & Hook Generator</span>
        </button>
      </div>

      {/* TOOL 1: Google SERP Previewer */}
      {activeTool === 'serp' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 bg-[#171717] rounded-2xl border border-[#262626] p-6 space-y-4">
            <h3 className="text-sm font-bold text-white font-sans">Edit Meta Tag Snippet</h3>

            <div>
              <label className="block text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                Meta Title ({serpTitle.length}/60 chars)
              </label>
              <input
                type="text"
                value={serpTitle}
                onChange={(e) => setSerpTitle(e.target.value)}
                className="w-full bg-[#121212] border border-[#262626] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#3ECF8E]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                Target URL
              </label>
              <input
                type="text"
                value={serpUrl}
                onChange={(e) => setSerpUrl(e.target.value)}
                className="w-full bg-[#121212] border border-[#262626] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#3ECF8E] font-sans"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                Meta Description ({serpDesc.length}/160 chars)
              </label>
              <textarea
                rows={4}
                value={serpDesc}
                onChange={(e) => setSerpDesc(e.target.value)}
                className="w-full bg-[#121212] border border-[#262626] rounded-xl p-3 text-sm text-zinc-200 focus:outline-none focus:border-[#3ECF8E] leading-relaxed"
              />
            </div>
          </div>

          <div className="lg:col-span-6 bg-[#171717] rounded-2xl border border-[#262626] p-6 space-y-4">
            <h3 className="text-sm font-bold text-white font-sans">Live Google Desktop SERP Preview</h3>

            <div className="bg-white p-5 rounded-xl border border-slate-200 text-slate-900 font-sans shadow-md space-y-1">
              <div className="text-sm text-[#202124] flex items-center gap-1 font-sans truncate">
                <span>{serpUrl}</span>
              </div>
              <h4 className="text-lg text-[#1a0dab] font-semibold hover:underline cursor-pointer leading-snug line-clamp-1">
                {serpTitle || 'Your Meta Title Here'}
              </h4>
              <p className="text-sm text-[#4d5156] leading-relaxed line-clamp-2">
                {serpDesc || 'Your Meta Description Here'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TOOL 2: Schema Generator */}
      {activeTool === 'schema' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 bg-[#171717] rounded-2xl border border-[#262626] p-6 space-y-4">
            <h3 className="text-sm font-bold text-white font-sans">BlogPosting Schema Generator</h3>

            <div>
              <label className="block text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                Article Headline
              </label>
              <input
                type="text"
                value={schemaTitle}
                onChange={(e) => setSchemaTitle(e.target.value)}
                className="w-full bg-[#121212] border border-[#262626] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#3ECF8E]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                Author Name / Organization
              </label>
              <input
                type="text"
                value={schemaAuthor}
                onChange={(e) => setSchemaAuthor(e.target.value)}
                className="w-full bg-[#121212] border border-[#262626] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#3ECF8E]"
              />
            </div>
          </div>

          <div className="lg:col-span-6 bg-[#171717] rounded-2xl border border-[#262626] p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white font-sans">Validated JSON-LD Schema Output</h3>
              <button
                onClick={copySchemaText}
                className="px-3.5 py-1.5 bg-[#3ECF8E] hover:bg-[#34D399] text-black rounded-lg text-sm font-bold flex items-center gap-1.5 shadow"
              >
                {copiedSchema ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSchema ? 'Copied' : 'Copy JSON-LD'}</span>
              </button>
            </div>

            <pre className="bg-[#121212] p-4 rounded-xl border border-[#262626] text-sm font-sans text-[#3ECF8E] overflow-x-auto">
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
        <div className="bg-[#171717] rounded-2xl border border-[#262626] p-6 space-y-4 max-w-3xl mx-auto">
          <h3 className="text-base font-bold text-white font-sans">AI High-CTR Headline Generator</h3>

          <div className="flex gap-2">
            <input
              type="text"
              value={topicInput}
              onChange={(e) => setTopicInput(e.target.value)}
              placeholder="e.g. B2B Content Strategy"
              className="flex-1 bg-[#121212] border border-[#262626] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#3ECF8E]"
            />
            <button className="px-5 py-2.5 bg-[#3ECF8E] hover:bg-[#34D399] text-black font-bold text-sm rounded-xl shadow">
              Generate Headlines
            </button>
          </div>

          <div className="space-y-2.5 pt-2">
            {generatedTitles.map((t, idx) => (
              <div key={idx} className="p-3.5 bg-[#121212] rounded-xl border border-[#262626] flex items-center justify-between text-sm text-white font-semibold">
                <span>{t}</span>
                <span className="text-[#3ECF8E] font-sans text-sm bg-[#3ECF8E]/10 px-2.5 py-0.5 rounded border border-[#3ECF8E]/20">CTR: 9.8%</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
