import React, { useState, useEffect } from 'react';
import { FileText, Sparkles, Copy, Check, Download, Share2, Globe, Cpu, CheckCircle2 } from 'lucide-react';
import { geminiService } from '../../services/geminiService';

export default function AiBlogStudio({ activeWebsiteUrl = 'mywebsite.com', initialKeyword = '' }) {
  const [targetKeyword, setTargetKeyword] = useState(initialKeyword || '');
  const [wordCount, setWordCount] = useState('2000');
  const [tone, setTone] = useState('Authoritative & Professional');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedArticle, setGeneratedArticle] = useState('');
  const [copied, setCopied] = useState(false);

  const domain = (typeof activeWebsiteUrl === 'string' && activeWebsiteUrl) ? activeWebsiteUrl : 'mywebsite.com';

  useEffect(() => {
    if (initialKeyword) {
      setTargetKeyword(initialKeyword);
    }
  }, [initialKeyword]);

  const handleGenerateArticle = async (e) => {
    if (e) e.preventDefault();
    if (!targetKeyword.trim()) return;

    setIsGenerating(true);

    const prompt = `Write a comprehensive, publication-ready ${wordCount}-word article on "${targetKeyword}" for domain "${domain}". Tone: ${tone}. Include structured H2/H3 headings, key takeaways, an FAQ section for voice search, and JSON-LD schema markup. Return clean Markdown.`;

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
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white font-sans uppercase tracking-wider">Article Preview & Schema Output</h3>
            {generatedArticle && (
              <button
                onClick={handleCopyText}
                className="px-3.5 py-1.5 bg-[#3ECF8E] hover:bg-[#34D399] text-black rounded-lg text-sm font-bold flex items-center gap-1.5 shadow"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied' : 'Copy Article'}</span>
              </button>
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
