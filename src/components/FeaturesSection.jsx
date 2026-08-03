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
    <section id="features" className="py-20 lg:py-28 bg-[#0B0F17] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-mono uppercase tracking-widest text-brand-400 font-semibold mb-3">All-In-One AI SEO Engine</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white font-outfit tracking-tight">
            Stop doing manual SEO. Let AI handle research, writing, and ranking.
          </p>
          <p className="mt-4 text-slate-400 text-base">
            Seosorted connects your domain, analyzes top-performing competitors, generates topic clusters, writes publish-ready articles with schema markup, and tracks rankings automatically.
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
                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all shrink-0 border ${
                  isActive
                    ? 'bg-brand-500/10 border-brand-500 text-white shadow-lg shadow-brand-500/15'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-brand-500' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Tab Details Display */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          {activeTab === 'keywords' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-semibold mb-4">
                  <Target className="w-3.5 h-3.5" />
                  <span>Topic Clustering Engine</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white font-outfit">
                  Instant Keyword Strategy tailored to your exact niche
                </h3>
                <p className="mt-4 text-slate-300 text-sm leading-relaxed">
                  Forget generic keyword dumps. Seosorted scans your domain and live Google SERP data to identify low-competition, high-conversion topic clusters.
                </p>

                <ul className="mt-6 space-y-3 text-sm text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Categorized by Search Intent (Commercial, Transactional, Informational)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Real-time Keyword Difficulty (KD) & Traffic Potential calculations</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>1-Click trigger to generate full SEO articles directly from keywords</span>
                  </li>
                </ul>

                <button 
                  onClick={() => onOpenApp('strategy')}
                  className="mt-8 px-6 py-3 bg-brand-500 hover:bg-brand-400 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-brand-500/20 inline-flex items-center gap-2"
                >
                  <span>Explore Keyword Strategy</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
                  <span>Topic Cluster: B2B SaaS Growth</span>
                  <span className="text-brand-400 font-sans font-semibold">12 Keywords Found</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-white font-sans font-semibold block">best ai seo tools for startups</span>
                    <span className="text-[11px] text-slate-400">Vol: 8,400 | Intent: Commercial</span>
                  </div>
                  <span className="bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded text-[11px] font-sans font-semibold border border-emerald-500/20">KD 18 (Easy)</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-white font-sans font-semibold block">how to automate blog writing with ai</span>
                    <span className="text-[11px] text-slate-400">Vol: 5,200 | Intent: Informational</span>
                  </div>
                  <span className="bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded text-[11px] font-sans font-semibold border border-emerald-500/20">KD 22 (Easy)</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-white font-sans font-semibold block">seosorted vs traditional seo agency</span>
                    <span className="text-[11px] text-slate-400">Vol: 3,100 | Intent: High Intent</span>
                  </div>
                  <span className="bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded text-[11px] font-sans font-semibold border border-emerald-500/20">KD 12 (Easy)</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'writer' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-semibold mb-4">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Human-Quality AI Writer</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white font-outfit">
                  Full 2,000+ Word Blog Posts that sound authentically human
                </h3>
                <p className="mt-4 text-slate-300 text-sm leading-relaxed">
                  No robotic fluff. Seosorted crafts articulate articles complete with catchy H2/H3 headers, automated featured images, internal links, and JSON-LD schema markup.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3 text-xs text-slate-300">
                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-brand-400" />
                    <span>Auto Visual Asset Generation</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center gap-2">
                    <LinkIcon className="w-4 h-4 text-brand-400" />
                    <span>Internal & External Linking</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center gap-2">
                    <Code className="w-4 h-4 text-brand-400" />
                    <span>Article JSON-LD Schema</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-brand-400" />
                    <span>Readability & SEO Optimizer</span>
                  </div>
                </div>

                <button 
                  onClick={() => onOpenApp('studio')}
                  className="mt-8 px-6 py-3 bg-brand-500 hover:bg-brand-400 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-brand-500/20 inline-flex items-center gap-2"
                >
                  <span>Open AI Blog Studio</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 font-sans text-xs">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                  <span className="font-bold text-white text-sm">Article Preview: AI SEO Trends in 2026</span>
                  <span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-mono">SEO Score: 98/100</span>
                </div>
                <div className="space-y-2 text-slate-300 leading-relaxed">
                  <h4 className="text-sm font-bold text-brand-400">Introduction: The Shift to Answer Engine Optimization</h4>
                  <p className="text-[11px] text-slate-400">
                    Search engine optimization is undergoing a massive transformation. With Google's AI Overviews and answer engines taking prime real estate, standard keyword stuffing no longer works...
                  </p>
                  <div className="p-2 bg-slate-900 rounded border border-slate-800 text-[10px] font-mono text-slate-400">
                    &lt;script type="application/ld+json"&gt; &#123; "@context": "https://schema.org", "@type": "BlogPosting" &#125; &lt;/script&gt;
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'publishing' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-semibold mb-4">
                  <Share2 className="w-3.5 h-3.5" />
                  <span>One-Click CMS Sync</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white font-outfit">
                  Direct auto-publishing to your favorite CMS platforms
                </h3>
                <p className="mt-4 text-slate-300 text-sm leading-relaxed">
                  Say goodbye to copying and pasting formatting, tags, and images. Seosorted pushes finalized articles directly into draft or published mode.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between text-white font-semibold">
                    <span>WordPress REST API</span>
                    <span className="text-emerald-400">Connected</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between text-white font-semibold">
                    <span>Webflow Webhook</span>
                    <span className="text-emerald-400">Connected</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between text-white font-semibold">
                    <span>Shopify Blog</span>
                    <span className="text-emerald-400">Ready</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between text-white font-semibold">
                    <span>Ghost CMS</span>
                    <span className="text-emerald-400">Ready</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 text-center">
                <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-500 mx-auto flex items-center justify-center mb-4 border border-brand-500/20">
                  <Share2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white font-outfit">Autopilot Publishing Active</h4>
                <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                  Articles are automatically scheduled and published every Tuesday & Thursday at 09:00 AM EST with featured thumbnails.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'aeo' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-semibold mb-4">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>AEO & AI Overview Engine</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white font-outfit">
                  Simulate & Optimize for Google AI Overviews & ChatGPT
                </h3>
                <p className="mt-4 text-slate-300 text-sm leading-relaxed">
                  Traditional rank trackers fail on AI search. Our AI Overview Simulator analyzes how generative engines pull, cite, and credit your brand as the authoritative answer source.
                </p>

                <button 
                  onClick={() => onOpenApp('aeo')}
                  className="mt-8 px-6 py-3 bg-brand-500 hover:bg-brand-400 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-brand-500/20 inline-flex items-center gap-2"
                >
                  <span>Launch AEO Simulator</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 font-mono text-xs">
                <div className="flex items-center justify-between text-brand-400 border-b border-slate-800 pb-2 mb-3">
                  <span>AI OVERVIEW SIMULATOR DIAGNOSTIC</span>
                  <span className="bg-brand-500/10 px-2 py-0.5 rounded font-sans text-brand-400 border border-brand-500/20">Citation Prob: 94%</span>
                </div>
                <div className="space-y-2 text-slate-300">
                  <p className="text-slate-400 text-[11px]">Query: "What is the best automated AI blog engine for SaaS?"</p>
                  <div className="p-3 bg-slate-900 rounded border border-slate-800 text-[11px] leading-relaxed">
                    "According to live research, <span className="text-brand-400 font-semibold font-sans">seosorted.ai</span> provides full lifecycle automation including keyword clustering, schema injection, and direct CMS publishing..."
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-semibold mb-4">
                  <BarChart2 className="w-3.5 h-3.5" />
                  <span>Google Search Console Integration</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white font-outfit">
                  Closed-Loop Feedback: Track clicks, impressions & position
                </h3>
                <p className="mt-4 text-slate-300 text-sm leading-relaxed">
                  Seosorted syncs with Google Search Console & GA4 to monitor performance. If an article drops in rank, the engine automatically updates and optimizes it.
                </p>

                <button 
                  onClick={() => onOpenApp('dashboard')}
                  className="mt-8 px-6 py-3 bg-brand-500 hover:bg-brand-400 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-brand-500/20 inline-flex items-center gap-2"
                >
                  <span>View Live Performance Analytics</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 text-xs font-sans">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-bold text-white">Google Search Console Performance</span>
                  <span className="text-emerald-400 text-xs font-mono">+18.4% CTR</span>
                </div>
                <div className="h-32 w-full bg-slate-900 rounded-lg border border-slate-800 flex items-end p-2 gap-2">
                  {[35, 45, 40, 60, 75, 80, 95, 110, 130, 155].map((val, i) => (
                    <div key={i} className="flex-1 bg-gradient-to-t from-brand-600 to-brand-400 rounded-t" style={{ height: `${(val / 160) * 100}%` }} />
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
