import React, { useState } from 'react';
import { Target, FileText, Share2, Cpu, BarChart2, CheckCircle2, ArrowRight, Sparkles, Layers, Image as ImageIcon, Link as LinkIcon, Code } from 'lucide-react';

export default function FeaturesSection({ onOpenApp }) {
  const [activeTab, setActiveTab] = useState('keywords');

  const tabs = [
    { id: 'keywords', label: '1. Automated Keyword Research', icon: Target },
    { id: 'writer', label: '2. AI Blog & Visual Studio', icon: FileText },
    { id: 'publishing', label: '3. Direct CMS Publishing', icon: Share2 },
    { id: 'aeo', label: '4. AI Overview Simulator', icon: Cpu },
    { id: 'analytics', label: '5. Search Console Sync', icon: BarChart2 },
  ];

  return (
    <section id="features" className="py-20 lg:py-28 bg-[#121212] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-mono uppercase tracking-widest text-[#3ECF8E] font-semibold mb-3">All-In-One AI SEO Engine</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white font-sans tracking-tight">
            Stop doing manual SEO. Let AI handle research, writing, and ranking.
          </p>
          <p className="mt-4 text-zinc-400 text-base">
            RankTop connects your domain, analyzes top-performing competitors, generates topic clusters, writes publish-ready articles with schema markup, and tracks rankings automatically.
          </p>
        </div>

        {/* Feature Tabs Bar */}
        <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all shrink-0 border ${
                  isActive
                    ? 'bg-[#3ECF8E]/10 border-[#3ECF8E] text-white shadow-lg shadow-[#3ECF8E]/15'
                    : 'bg-[#171717] border-[#262626] text-zinc-400 hover:text-white hover:bg-[#1F1F1F]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#3ECF8E]' : 'text-zinc-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Tab Details Display */}
        <div className="bg-[#171717] rounded-2xl border border-[#262626] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          {activeTab === 'keywords' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3ECF8E]/10 text-[#3ECF8E] text-sm font-semibold mb-4 border border-[#3ECF8E]/20">
                  <Target className="w-3.5 h-3.5" />
                  <span>Topic Clustering Engine</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white font-sans">
                  Instant Keyword Strategy tailored to your exact niche
                </h3>
                <p className="mt-4 text-zinc-300 text-sm leading-relaxed">
                  Forget generic keyword dumps. RankTop scans your domain and live Google SERP data to identify low-competition, high-conversion topic clusters.
                </p>

                <ul className="mt-6 space-y-3 text-sm text-zinc-300">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#3ECF8E] shrink-0 mt-0.5" />
                    <span>Categorized by Search Intent (Commercial, Transactional, Informational)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#3ECF8E] shrink-0 mt-0.5" />
                    <span>Real-time Keyword Difficulty (KD) & Traffic Potential calculations</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#3ECF8E] shrink-0 mt-0.5" />
                    <span>1-Click trigger to generate full SEO articles directly from keywords</span>
                  </li>
                </ul>

                <button 
                  onClick={() => onOpenApp('strategy')}
                  className="mt-8 px-6 py-3 bg-[#3ECF8E] hover:bg-[#34D399] text-black font-bold text-sm rounded-xl transition-all shadow-md shadow-[#3ECF8E]/20 inline-flex items-center gap-2"
                >
                  <span>Explore Keyword Strategy</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-[#121212] p-5 rounded-xl border border-[#262626] space-y-3 font-sans text-sm">
                <div className="flex items-center justify-between text-zinc-400 border-b border-[#262626] pb-2">
                  <span>Topic Cluster: B2B SaaS Growth</span>
                  <span className="text-[#3ECF8E] font-sans font-semibold">12 Keywords Found</span>
                </div>
                <div className="p-3 bg-[#171717] rounded-lg border border-[#262626] flex items-center justify-between">
                  <div>
                    <span className="text-white font-sans font-semibold block">best ai seo tools for startups</span>
                    <span className="text-sm text-zinc-400">Vol: 8,400 | Intent: Commercial</span>
                  </div>
                  <span className="bg-[#3ECF8E]/10 text-[#3ECF8E] px-2.5 py-1 rounded text-sm font-sans font-semibold border border-[#3ECF8E]/20">KD 18 (Easy)</span>
                </div>
                <div className="p-3 bg-[#171717] rounded-lg border border-[#262626] flex items-center justify-between">
                  <div>
                    <span className="text-white font-sans font-semibold block">how to automate blog writing with ai</span>
                    <span className="text-sm text-zinc-400">Vol: 5,200 | Intent: Informational</span>
                  </div>
                  <span className="bg-[#3ECF8E]/10 text-[#3ECF8E] px-2.5 py-1 rounded text-sm font-sans font-semibold border border-[#3ECF8E]/20">KD 22 (Easy)</span>
                </div>
                <div className="p-3 bg-[#171717] rounded-lg border border-[#262626] flex items-center justify-between">
                  <div>
                    <span className="text-white font-sans font-semibold block">ranktop vs traditional agency</span>
                    <span className="text-sm text-zinc-400">Vol: 3,100 | Intent: High Intent</span>
                  </div>
                  <span className="bg-[#3ECF8E]/10 text-[#3ECF8E] px-2.5 py-1 rounded text-sm font-sans font-semibold border border-[#3ECF8E]/20">KD 12 (Easy)</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'writer' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3ECF8E]/10 text-[#3ECF8E] text-sm font-semibold mb-4 border border-[#3ECF8E]/20">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Human-Quality AI Writer</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white font-sans">
                  Full 2,000+ Word Blog Posts that sound authentically human
                </h3>
                <p className="mt-4 text-zinc-300 text-sm leading-relaxed">
                  No robotic fluff. RankTop crafts articulate articles complete with catchy H2/H3 headers, automated featured images, internal links, and JSON-LD schema markup.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-zinc-300">
                  <div className="p-3 bg-[#121212] rounded-lg border border-[#262626] flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-[#3ECF8E]" />
                    <span>Auto Visual Asset Generation</span>
                  </div>
                  <div className="p-3 bg-[#121212] rounded-lg border border-[#262626] flex items-center gap-2">
                    <LinkIcon className="w-4 h-4 text-[#3ECF8E]" />
                    <span>Internal & External Linking</span>
                  </div>
                  <div className="p-3 bg-[#121212] rounded-lg border border-[#262626] flex items-center gap-2">
                    <Code className="w-4 h-4 text-[#3ECF8E]" />
                    <span>Article JSON-LD Schema</span>
                  </div>
                  <div className="p-3 bg-[#121212] rounded-lg border border-[#262626] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#3ECF8E]" />
                    <span>Readability & SEO Optimizer</span>
                  </div>
                </div>

                <button 
                  onClick={() => onOpenApp('studio')}
                  className="mt-8 px-6 py-3 bg-[#3ECF8E] hover:bg-[#34D399] text-black font-bold text-sm rounded-xl transition-all shadow-md shadow-[#3ECF8E]/20 inline-flex items-center gap-2"
                >
                  <span>Open AI Blog Studio</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-[#121212] p-5 rounded-xl border border-[#262626] font-sans text-sm">
                <div className="flex items-center justify-between border-b border-[#262626] pb-3 mb-3">
                  <span className="font-bold text-white text-sm">Article Preview: AI SEO Trends in 2026</span>
                  <span className="bg-[#3ECF8E]/10 text-[#3ECF8E] px-2 py-0.5 rounded font-sans">SEO Score: 98/100</span>
                </div>
                <div className="space-y-2 text-zinc-300 leading-relaxed">
                  <h4 className="text-sm font-bold text-[#3ECF8E]">Introduction: The Shift to Answer Engine Optimization</h4>
                  <p className="text-sm text-zinc-400">
                    Search engine optimization is undergoing a massive transformation. With Google's AI Overviews and answer engines taking prime real estate, standard keyword stuffing no longer works...
                  </p>
                  <div className="p-2 bg-[#171717] rounded border border-[#262626] text-sm font-sans text-zinc-400">
                    &lt;script type="application/ld+json"&gt; &#123; "@context": "https://schema.org", "@type": "BlogPosting" &#125; &lt;/script&gt;
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'publishing' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3ECF8E]/10 text-[#3ECF8E] text-sm font-semibold mb-4 border border-[#3ECF8E]/20">
                  <Share2 className="w-3.5 h-3.5" />
                  <span>One-Click CMS Sync</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white font-sans">
                  Direct auto-publishing to your favorite CMS platforms
                </h3>
                <p className="mt-4 text-zinc-300 text-sm leading-relaxed">
                  Say goodbye to copying and pasting formatting, tags, and images. RankTop pushes finalized articles directly into draft or published mode.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                  <div className="p-3 bg-[#121212] rounded-lg border border-[#262626] flex items-center justify-between text-white font-semibold">
                    <span>WordPress REST API</span>
                    <span className="text-[#3ECF8E]">Connected</span>
                  </div>
                  <div className="p-3 bg-[#121212] rounded-lg border border-[#262626] flex items-center justify-between text-white font-semibold">
                    <span>Webflow Webhook</span>
                    <span className="text-[#3ECF8E]">Connected</span>
                  </div>
                  <div className="p-3 bg-[#121212] rounded-lg border border-[#262626] flex items-center justify-between text-white font-semibold">
                    <span>Shopify Blog</span>
                    <span className="text-[#3ECF8E]">Ready</span>
                  </div>
                  <div className="p-3 bg-[#121212] rounded-lg border border-[#262626] flex items-center justify-between text-white font-semibold">
                    <span>Ghost CMS</span>
                    <span className="text-[#3ECF8E]">Ready</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#121212] p-6 rounded-xl border border-[#262626] text-center">
                <div className="w-12 h-12 rounded-2xl bg-[#3ECF8E]/10 text-[#3ECF8E] mx-auto flex items-center justify-center mb-4 border border-[#3ECF8E]/20">
                  <Share2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white font-sans">Autopilot Publishing Active</h4>
                <p className="text-sm text-zinc-400 mt-1 max-w-sm mx-auto">
                  Articles are automatically scheduled and published every Tuesday & Thursday at 09:00 AM EST with featured thumbnails.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'aeo' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3ECF8E]/10 text-[#3ECF8E] text-sm font-semibold mb-4 border border-[#3ECF8E]/20">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>AEO & AI Overview Engine</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white font-sans">
                  Simulate & Optimize for Google AI Overviews & ChatGPT
                </h3>
                <p className="mt-4 text-zinc-300 text-sm leading-relaxed">
                  Traditional rank trackers fail on AI search. Our AI Overview Simulator analyzes how generative engines pull, cite, and credit your brand as the authoritative answer source.
                </p>

                <button 
                  onClick={() => onOpenApp('aeo')}
                  className="mt-8 px-6 py-3 bg-[#3ECF8E] hover:bg-[#34D399] text-black font-bold text-sm rounded-xl transition-all shadow-md shadow-[#3ECF8E]/20 inline-flex items-center gap-2"
                >
                  <span>Launch AEO Simulator</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-[#121212] p-5 rounded-xl border border-[#262626] font-sans text-sm">
                <div className="flex items-center justify-between text-[#3ECF8E] border-b border-[#262626] pb-2 mb-3">
                  <span>AI OVERVIEW SIMULATOR DIAGNOSTIC</span>
                  <span className="bg-[#3ECF8E]/10 px-2 py-0.5 rounded font-sans text-[#3ECF8E] border border-[#3ECF8E]/20">Citation Prob: 94%</span>
                </div>
                <div className="space-y-2 text-zinc-300">
                  <p className="text-zinc-400 text-sm">Query: "What is the best automated AI blog engine for SaaS?"</p>
                  <div className="p-3 bg-[#171717] rounded border border-[#262626] text-sm leading-relaxed">
                    "According to live research, <span className="text-[#3ECF8E] font-semibold font-sans">ranktop.ai</span> provides full lifecycle automation including keyword clustering, schema injection, and direct CMS publishing..."
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3ECF8E]/10 text-[#3ECF8E] text-sm font-semibold mb-4 border border-[#3ECF8E]/20">
                  <BarChart2 className="w-3.5 h-3.5" />
                  <span>Google Search Console Integration</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white font-sans">
                  Closed-Loop Feedback: Track clicks, impressions & position
                </h3>
                <p className="mt-4 text-zinc-300 text-sm leading-relaxed">
                  RankTop syncs with Google Search Console & GA4 to monitor performance. If an article drops in rank, the engine automatically updates and optimizes it.
                </p>

                <button 
                  onClick={() => onOpenApp('dashboard')}
                  className="mt-8 px-6 py-3 bg-[#3ECF8E] hover:bg-[#34D399] text-black font-bold text-sm rounded-xl transition-all shadow-md shadow-[#3ECF8E]/20 inline-flex items-center gap-2"
                >
                  <span>View Live Performance Analytics</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-[#121212] p-5 rounded-xl border border-[#262626] text-sm font-sans">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-bold text-white">Google Search Console Performance</span>
                  <span className="text-[#3ECF8E] text-sm font-sans">+18.4% CTR</span>
                </div>
                <div className="h-32 w-full bg-[#171717] rounded-lg border border-[#262626] flex items-end p-2 gap-2">
                  {[35, 45, 40, 60, 75, 80, 95, 110, 130, 155].map((val, i) => (
                    <div key={i} className="flex-1 bg-gradient-to-t from-[#24B47E] to-[#3ECF8E] rounded-t" style={{ height: `${(val / 160) * 100}%` }} />
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
