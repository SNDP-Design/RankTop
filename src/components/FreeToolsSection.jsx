import React from 'react';
import { Cpu, Search, Code, Sparkles, ArrowRight } from 'lucide-react';

export default function FreeToolsSection({ onOpenApp }) {
  const tools = [
    {
      title: "AI Overview & AEO Simulator",
      description: "Test how Google AI Overviews and ChatGPT cite and extract answers from your article content.",
      icon: Cpu,
      tab: 'aeo',
      badge: "Popular Tool"
    },
    {
      title: "Google SERP & Meta Previewer",
      description: "Preview how your title, meta description, and URL snippet appear in desktop & mobile search results.",
      icon: Search,
      tab: 'freetools',
      badge: "Free Utility"
    },
    {
      title: "Article Schema (JSON-LD) Generator",
      description: "Instantly create valid BlogPosting & Article schema markup to enhance rich snippets.",
      icon: Code,
      tab: 'freetools',
      badge: "Free Utility"
    },
    {
      title: "AI Headline & Hook Generator",
      description: "Generate high CTR blog titles and magnetic article opening hooks tuned for reader engagement.",
      icon: Sparkles,
      tab: 'freetools',
      badge: "Free Utility"
    }
  ];

  return (
    <section id="free-tools" className="py-20 bg-[#0B0F17] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-xs font-mono uppercase tracking-widest text-brand-400 font-semibold mb-3">Free SEO Tools & Simulators</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white font-outfit tracking-tight">
            Free tools to boost your search presence
          </p>
          <p className="mt-4 text-slate-400 text-base">
            Try our suite of free SEO micro-tools right in your browser. No sign-up required.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map((tool, idx) => {
            const Icon = tool.icon;
            return (
              <div
                key={idx}
                onClick={() => onOpenApp(tool.tab)}
                className="bg-slate-900/80 border border-slate-800 hover:border-brand-500/50 rounded-2xl p-6 transition-all hover:bg-slate-900 cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center border border-brand-500/20 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-brand-400 bg-brand-500/10 px-2.5 py-1 rounded border border-brand-500/20">
                      {tool.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white font-outfit group-hover:text-brand-400 transition-colors">{tool.title}</h3>
                  <p className="mt-2 text-xs text-slate-400 leading-relaxed">{tool.description}</p>
                </div>

                <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-slate-300 group-hover:text-brand-400 transition-colors">
                  <span>Launch Tool</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
