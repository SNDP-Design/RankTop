import React, { useState, useEffect } from 'react';
import { FileText, Sparkles, Copy, Check, Download } from 'lucide-react';
import { geminiService } from '../../services/geminiService';
import { useAgents } from '../../context/AgentContext';

export default function AiBlogStudio({ initialKeyword = '' }) {
  const { websiteUrl } = useAgents();
  const [targetKeyword, setTargetKeyword] = useState(initialKeyword || '');
  const [wordCount, setWordCount] = useState('2000');
  const [tone, setTone] = useState('Authoritative & Professional');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedArticle, setGeneratedArticle] = useState('');
  const [copied, setCopied] = useState(false);

  const domain = websiteUrl || 'mywebsite.com';

  useEffect(() => {
    if (initialKeyword) {
      setTargetKeyword(initialKeyword);
    }
  }, [initialKeyword]);

  const handleGenerateArticle = async (e) => {
    if (e) e.preventDefault();
    if (!targetKeyword.trim()) return;

    setIsGenerating(true);

    const prompt = `Write a comprehensive, publication-ready ${wordCount}-word article on "${targetKeyword}" for domain "${domain}". Tone: ${tone}.

CRITICAL XGROWTH DESIGN SYSTEM & STRUCTURAL REQUIREMENTS:
1. Executive Summary: Start immediately with a BLUF box formatted as:
   > **Executive Summary (BLUF)**: [40-to-60 word concise direct answer summary formatted for XGrowth design system callout box]
2. Formulate H2/H3 headings as natural language questions.
3. Include 4+ empirical data points & statistics for GEO retrieval.
4. Include a structured comparison table.
5. Include a 3-question Voice & AI Search FAQ section at the end.
6. Include JSON-LD BlogPosting & FAQPage schema.

Return clean, structured Markdown ready for compilation into /assets/design-system.css?v=10.`;

    try {
      const articleText = await geminiService.generateContent(prompt);
      if (articleText) {
        setGeneratedArticle(articleText);
        setIsGenerating(false);
        return;
      }
    } catch (err) {
      console.warn('Gemini API failed:', err);
    }

    setTimeout(() => {
      setGeneratedArticle(`# ${targetKeyword.toUpperCase()}

> **Key Takeaway**: Automating your search content strategy with RankTop AI accelerates organic growth for **${domain}**.

## Introduction
Search Engine Optimization in 2026 requires optimizing simultaneously for Google Search (SEO), Google AI Overviews (AEO), and LLM Answer Engines (GEO).

## 1. Why Search Content Optimization Matters for ${domain}
By structuring direct answer blocks and embedding speakable schema, your brand secures prime visibility in AI Overviews and ChatGPT search results.

\`\`\`json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "${targetKeyword}",
  "publisher": {
    "@type": "Organization",
    "name": "${domain}"
  }
}
\`\`\`
`);
      setIsGenerating(false);
    }, 1000);
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(generatedArticle);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full space-y-6 font-sans">
      
      {/* Header Banner */}
      <div className="bg-[#171717] p-6 rounded-2xl border border-[#262626] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3ECF8E]/10 text-[#3ECF8E] text-sm font-semibold mb-2 border border-[#3ECF8E]/20">
            <FileText className="w-4 h-4" />
            <span>Multi-Agent AI Content Studio</span>
          </div>
          <h1 className="text-2xl font-bold text-white font-sans">SEO & AEO Long-Form Article Generator</h1>
          <p className="text-sm text-zinc-400 mt-1">Draft structured 2,000+ word articles with FAQ answer blocks and JSON-LD schema markup for {domain}.</p>
        </div>
      </div>

      {/* Input Form & Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-start">
        
        {/* Left Form Panel */}
        <div className="lg:col-span-5 bg-[#171717] rounded-2xl border border-[#262626] p-6 space-y-4">
          <h3 className="text-sm font-bold text-white font-sans uppercase tracking-wider">Article Configuration</h3>

          <form onSubmit={handleGenerateArticle} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-zinc-300">Target Keyword / Topic</label>
              <input
                type="text"
                value={targetKeyword}
                onChange={(e) => setTargetKeyword(e.target.value)}
                placeholder="e.g. How to rank in Google AI Overviews"
                className="w-full bg-[#121212] border border-[#262626] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#3ECF8E]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-zinc-300">Word Count</label>
                <select
                  value={wordCount}
                  onChange={(e) => setWordCount(e.target.value)}
                  className="w-full bg-[#121212] border border-[#262626] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#3ECF8E]"
                >
                  <option value="1200">1,200 words</option>
                  <option value="2000">2,000 words</option>
                  <option value="3500">3,500 words</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-zinc-300">Tone</label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full bg-[#121212] border border-[#262626] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#3ECF8E]"
                >
                  <option value="Authoritative & Professional">Professional</option>
                  <option value="Conversational & Engaging">Conversational</option>
                  <option value="Technical & Data-Driven">Data-Driven</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={isGenerating || !targetKeyword.trim()}
              className="w-full py-3 bg-[#3ECF8E] hover:bg-[#34D399] text-black font-bold text-sm rounded-xl shadow flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  <span>Drafting Article with Gemini AI...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-black" />
                  <span>Generate Article</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Output Panel */}
        <div className="lg:col-span-7 bg-[#171717] rounded-2xl border border-[#262626] p-6 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h3 className="text-sm font-bold text-white font-sans uppercase tracking-wider">Article Preview & Schema Output</h3>
            {generatedArticle && (
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={handleCopyText}
                  className="px-3.5 py-1.5 bg-[#262626] hover:bg-[#333] text-white border border-[#333] rounded-lg text-sm font-bold flex items-center gap-1.5 shadow transition-all"
                >
                  {copied ? <Check className="w-4 h-4 text-[#3ECF8E]" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied Text' : 'Copy Text'}</span>
                </button>
                <button
                  onClick={() => {
                    const blob = new Blob([generatedArticle], { type: 'text/html' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${targetKeyword.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.html`;
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="px-3.5 py-1.5 bg-[#121212] hover:bg-[#1f1f1f] text-[#3ECF8E] border border-[#3ECF8E]/30 rounded-lg text-sm font-bold flex items-center gap-1.5 shadow transition-all"
                >
                  <Download className="w-4 h-4 text-[#3ECF8E]" />
                  <span>Download .HTML File</span>
                </button>
              </div>
            )}
          </div>

          <div className="bg-[#121212] p-5 rounded-xl border border-[#262626] min-h-[300px]">
            {!generatedArticle ? (
              <div className="text-center p-10 space-y-3">
                <FileText className="w-8 h-8 text-[#3ECF8E] mx-auto" />
                <h4 className="text-base font-bold text-white">Ready to Draft Article</h4>
                <p className="text-sm text-zinc-400 max-w-sm mx-auto">
                  Enter a target topic on the left and click <strong className="text-white">Generate Article</strong>.
                </p>
              </div>
            ) : (
              <div className="prose prose-invert max-w-none text-sm text-zinc-200 leading-relaxed space-y-3 font-sans">
                <pre className="whitespace-pre-wrap font-sans bg-transparent text-zinc-200">{generatedArticle}</pre>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
