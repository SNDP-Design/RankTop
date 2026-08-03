import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  FileText, 
  Layers, 
  Share2, 
  CheckCircle2, 
  ArrowRight, 
  Code, 
  Image as ImageIcon, 
  Download, 
  RefreshCw, 
  BarChart, 
  Edit3,
  Copy,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AiBlogStudio({ initialKeyword = '' }) {
  const [step, setStep] = useState(1);
  const [targetKeyword, setTargetKeyword] = useState(initialKeyword || 'best ai overview simulator tool for seo');
  const [targetAudience, setTargetAudience] = useState('B2B Founders & Growth Marketers');
  const [articleTone, setArticleTone] = useState('Authoritative & Tactical');
  const [articleLength, setArticleLength] = useState('Comprehensive (2,200 words)');
  
  const [isGeneratingOutline, setIsGeneratingOutline] = useState(false);
  const [outline, setOutline] = useState(null);

  const [isStreamingDraft, setIsStreamingDraft] = useState(false);
  const [generatedArticle, setGeneratedArticle] = useState('');
  
  const [copied, setCopied] = useState(false);
  const [cmsPublished, setCmsPublished] = useState(false);

  useEffect(() => {
    if (initialKeyword) {
      setTargetKeyword(initialKeyword);
    }
  }, [initialKeyword]);

  // Step 1 -> Step 2: Generate AI Outline
  const handleGenerateOutline = (e) => {
    e.preventDefault();
    if (!targetKeyword) return;

    setIsGeneratingOutline(true);
    setTimeout(() => {
      setOutline({
        title: `The Ultimate Guide to ${targetKeyword.replace(/\b\w/g, c => c.toUpperCase())} in 2026`,
        metaDescription: `Discover how to use ${targetKeyword} to boost organic traffic, capture Google AI Overviews, and outperform competitors automatically.`,
        sections: [
          { heading: '1. Introduction: The Era of Answer Engine Optimization (AEO)', type: 'H2' },
          { heading: '1.1 Why Traditional Keyword Ranking Is No Longer Enough', type: 'H3' },
          { heading: `2. How ${targetKeyword} Works Under the Hood`, type: 'H2' },
          { heading: '2.1 Extracting High-Intent LLM Citation Points', type: 'H3' },
          { heading: '3. Step-by-Step Blueprint to Optimize Blog Structure', type: 'H2' },
          { heading: '4. Injecting Article JSON-LD Schema Markup', type: 'H2' },
          { heading: '5. Conclusion & Action Checklist', type: 'H2' },
        ]
      });
      setIsGeneratingOutline(false);
      setStep(2);
    }, 1200);
  };

  // Step 2 -> Step 3: Stream Full Article Draft
  const handleGenerateFullDraft = () => {
    setIsStreamingDraft(true);
    setStep(3);

    const fullText = `# ${outline.title}

> **Meta Description:** ${outline.metaDescription}

---

## 1. Introduction: The Era of Answer Engine Optimization (AEO)

Search engine optimization is undergoing its most profound shift in two decades. With the rapid expansion of **Google AI Overviews**, ChatGPT Search, and Perplexity AI, traditional keyword rank tracking is no longer the sole metric of organic success. 

Modern brands must master **Answer Engine Optimization (AEO)**—the art of structuring content so that artificial intelligence models extract, cite, and credit your brand as the authoritative source.

### 1.1 Why Traditional Keyword Ranking Is No Longer Enough

In legacy search, securing position #1 meant guaranteed click-throughs. Today, AI summaries occupy top SERP real estate. To stay ahead:

- **Structure Data Clearly:** Use atomic paragraphs and direct answers.
- **Implement Schema:** Validate every article with \`BlogPosting\` JSON-LD schema.
- **Maintain High Keyword Relevance:** Cluster related semantic terms cleanly.

---

## 2. How ${targetKeyword} Works Under the Hood

When using **${targetKeyword}**, artificial intelligence models evaluate your text based on clarity, semantic density, and structural cues. 

\`\`\`json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "${outline.title}",
  "description": "${outline.metaDescription}",
  "author": {
    "@type": "Organization",
    "name": "RankTop Engine"
  }
}
\`\`\`

### 2.1 Extracting High-Intent LLM Citation Points

By embedding clear bullet points and quantitative metrics, your content achieves a **94%+ Citation Probability Score** in AI Overview simulations.

---

## 3. Step-by-Step Blueprint to Optimize Blog Structure

1. **Conduct Automated Keyword Clustering:** Group intent-matched terms before drafting.
2. **Draft Concise Answers:** Place 40-word summaries directly beneath H2 headers.
3. **Embed Internal & External Assets:** Link to high-authority benchmarks and internal cluster pages.

---

## 4. Conclusion & Action Checklist

By deploying an autonomous AI SEO pipeline, your team eliminates manual keyword research while scaling publish-ready, schema-validated articles every single week.`;

    let i = 0;
    setGeneratedArticle('');
    const timer = setInterval(() => {
      setGeneratedArticle(fullText.slice(0, i));
      i += 35;
      if (i > fullText.length) {
        clearInterval(timer);
        setGeneratedArticle(fullText);
        setIsStreamingDraft(false);
        try { confetti(); } catch (e) {}
      }
    }, 30);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedArticle);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCmsPush = () => {
    setCmsPublished(true);
    setTimeout(() => setCmsPublished(false), 3000);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      
      {/* Header & Step Indicator */}
      <div className="bg-[#171717] p-6 rounded-2xl border border-[#262626] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3ECF8E]/10 text-[#3ECF8E] text-sm font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Blog Studio & Publisher</span>
          </div>
          <h1 className="text-2xl font-bold text-white font-sans">Create SEO-Optimized AI Blog Post</h1>
        </div>

        {/* Step Progress Pills */}
        <div className="flex items-center gap-2 text-sm font-semibold">
          <span className={`px-3 py-1.5 rounded-lg font-sans ${step === 1 ? 'bg-[#3ECF8E] text-black font-bold' : 'bg-[#262626] text-zinc-400'}`}>1. Strategy</span>
          <span className="text-zinc-600">→</span>
          <span className={`px-3 py-1.5 rounded-lg font-sans ${step === 2 ? 'bg-[#3ECF8E] text-black font-bold' : 'bg-[#262626] text-zinc-400'}`}>2. Outline</span>
          <span className="text-zinc-600">→</span>
          <span className={`px-3 py-1.5 rounded-lg font-sans ${step === 3 ? 'bg-[#3ECF8E] text-black font-bold' : 'bg-[#262626] text-zinc-400'}`}>3. AI Draft & Publish</span>
        </div>
      </div>

      {/* STEP 1: Topic Input */}
      {step === 1 && (
        <div className="bg-[#171717] rounded-2xl border border-[#262626] p-6 sm:p-8 space-y-6 max-w-3xl mx-auto">
          <h2 className="text-lg font-bold text-white font-sans">Configure Article Generation Parameters</h2>

          <form onSubmit={handleGenerateOutline} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                Target Keyword / Topic Prompt
              </label>
              <input
                type="text"
                value={targetKeyword}
                onChange={(e) => setTargetKeyword(e.target.value)}
                className="w-full bg-[#121212] border border-[#262626] rounded-xl px-4 py-3 text-sm text-white font-sans focus:outline-none focus:border-[#3ECF8E]"
                placeholder="e.g. best ai overview simulator tool"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Target Audience Profile
                </label>
                <input
                  type="text"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  className="w-full bg-[#121212] border border-[#262626] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#3ECF8E]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Article Tone & Voice
                </label>
                <select
                  value={articleTone}
                  onChange={(e) => setArticleTone(e.target.value)}
                  className="w-full bg-[#121212] border border-[#262626] text-sm text-zinc-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#3ECF8E]"
                >
                  <option>Authoritative & Tactical</option>
                  <option>Conversational & Engaging</option>
                  <option>Data-Driven & Benchmark</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={isGeneratingOutline}
              className="w-full py-3.5 bg-[#3ECF8E] hover:bg-[#34D399] text-black font-bold text-sm rounded-xl shadow-lg shadow-[#3ECF8E]/25 transition-all flex items-center justify-center gap-2"
            >
              {isGeneratingOutline ? (
                <>
                  <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  <span>Generating AI Outline...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-black" />
                  <span>Generate AI Outline →</span>
                </>
              )}
            </button>
          </form>
        </div>
      )}

      {/* STEP 2: Outline Preview */}
      {step === 2 && outline && (
        <div className="bg-[#171717] rounded-2xl border border-[#262626] p-6 sm:p-8 space-y-6 max-w-3xl mx-auto">
          <div className="flex items-center justify-between border-b border-[#262626] pb-4">
            <div>
              <span className="text-sm text-[#3ECF8E] block mb-1">AI STRUCTURED OUTLINE</span>
              <h2 className="text-xl font-bold text-white font-sans">{outline.title}</h2>
            </div>
            <button onClick={() => setStep(1)} className="text-sm text-zinc-400 hover:text-white flex items-center gap-1">
              <Edit3 className="w-3.5 h-3.5" /> Edit Topic
            </button>
          </div>

          <div className="space-y-2">
            <span className="text-sm font-semibold text-zinc-400 uppercase tracking-wider block mb-2">Heading Hierarchy:</span>
            {outline.sections.map((sec, idx) => (
              <div key={idx} className={`p-3 rounded-lg border text-sm flex items-center gap-3 ${
                sec.type === 'H2' ? 'bg-[#121212] border-[#262626] text-white font-bold' : 'bg-[#171717] border-[#262626] text-zinc-300 ml-4 font-normal'
              }`}>
                <span className="bg-[#3ECF8E]/10 text-[#3ECF8E] text-sm px-2 py-0.5 rounded border border-[#3ECF8E]/20 font-bold">{sec.type}</span>
                <span>{sec.heading}</span>
              </div>
            ))}
          </div>

          <button
            onClick={handleGenerateFullDraft}
            className="w-full py-3.5 bg-[#3ECF8E] hover:bg-[#34D399] text-black font-bold text-sm rounded-xl shadow-lg shadow-[#3ECF8E]/25 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-black" />
            <span>Write Full Article (2,200 Words) →</span>
          </button>
        </div>
      )}

      {/* STEP 3: Streaming Draft & WYSIWYG Editor */}
      {step === 3 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Article Editor */}
          <div className="lg:col-span-8 bg-[#171717] rounded-2xl border border-[#262626] p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#262626] pb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#3ECF8E]" />
                <span className="text-sm font-bold text-white font-sans">WYSIWYG Article Studio</span>
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleCopy}
                  className="px-3 py-1.5 bg-[#262626] hover:bg-[#333] text-zinc-200 rounded-lg text-sm font-semibold flex items-center gap-1.5"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#3ECF8E]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied Markdown' : 'Copy Markdown'}</span>
                </button>
                <button 
                  onClick={handleCmsPush}
                  className="px-3.5 py-1.5 bg-[#3ECF8E] hover:bg-[#34D399] text-black rounded-lg text-sm font-bold flex items-center gap-1.5 shadow"
                >
                  <Share2 className="w-3.5 h-3.5 text-black" />
                  <span>Publish to CMS</span>
                </button>
              </div>
            </div>

            {cmsPublished && (
              <div className="p-3 bg-[#3ECF8E]/10 border border-[#3ECF8E]/30 rounded-xl text-[#3ECF8E] text-sm flex items-center justify-between animate-in fade-in">
                <span className="flex items-center gap-2 font-semibold">
                  <CheckCircle2 className="w-4 h-4" /> Published successfully to WordPress (Draft Mode)!
                </span>
                <span className="font-sans text-sm">ID: #POST-9402</span>
              </div>
            )}

            {/* Generated Markdown Preview Area */}
            <div className="bg-[#121212] p-6 rounded-xl border border-[#262626] min-h-[450px] font-sans text-sm text-zinc-200 leading-relaxed whitespace-pre-wrap overflow-y-auto max-h-[600px]">
              {generatedArticle}
              {isStreamingDraft && <span className="inline-block w-2 h-4 bg-[#3ECF8E] animate-pulse ml-1 align-middle" />}
            </div>
          </div>

          {/* Right Sidebar: Real-time SEO & Schema Metrics */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* SEO Health Score */}
            <div className="bg-[#171717] p-5 rounded-2xl border border-[#262626]">
              <h3 className="text-sm uppercase tracking-wider text-zinc-400 font-semibold mb-3">Real-time SEO Score</h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl font-extrabold text-[#3ECF8E] font-sans">98/100</span>
                <span className="bg-[#3ECF8E]/10 text-[#3ECF8E] text-sm px-2.5 py-1 rounded font-sans border border-[#3ECF8E]/20">Rank #1 Ready</span>
              </div>
              <div className="w-full bg-[#262626] h-2 rounded-full overflow-hidden">
                <div className="bg-[#3ECF8E] h-full w-[98%]" />
              </div>
            </div>

            {/* AI Image Asset Generated */}
            <div className="bg-[#171717] p-5 rounded-2xl border border-[#262626] space-y-3">
              <h3 className="text-sm uppercase tracking-wider text-zinc-400 font-semibold flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-[#3ECF8E]" /> Featured Visual Asset
              </h3>
              <div className="w-full h-32 bg-[#121212] rounded-xl border border-[#262626] flex items-center justify-center text-center p-4">
                <div className="space-y-1">
                  <Sparkles className="w-6 h-6 text-[#3ECF8E] mx-auto" />
                  <span className="text-sm text-zinc-400 block font-sans">AI Graphic Auto-Generated</span>
                  <span className="text-sm text-zinc-500 font-sans">1200 x 630 WebP Optimized</span>
                </div>
              </div>
            </div>

            {/* Schema Markup Preview */}
            <div className="bg-[#171717] p-5 rounded-2xl border border-[#262626] space-y-3">
              <h3 className="text-sm uppercase tracking-wider text-zinc-400 font-semibold flex items-center gap-1.5">
                <Code className="w-4 h-4 text-[#3ECF8E]" /> Article Schema JSON-LD
              </h3>
              <div className="p-3 bg-[#121212] rounded-xl border border-[#262626] text-sm font-sans text-zinc-400">
                &lt;script type="application/ld+json"&gt;<br/>
                &#123;<br/>
                &nbsp;&nbsp;"@type": "BlogPosting",<br/>
                &nbsp;&nbsp;"headline": "{targetKeyword}"<br/>
                &#125;<br/>
                &lt;/script&gt;
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
