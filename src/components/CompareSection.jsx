import React from 'react';
import { Check, X, Sparkles } from 'lucide-react';

export default function CompareSection() {
  const comparisonData = [
    { feature: "Automated Keyword Research & Strategy", seosorted: true, agency: true, genericAi: false },
    { feature: "AI Overview (AEO) Citation Optimization", seosorted: true, agency: false, genericAi: false },
    { feature: "Generates 2,000+ Word In-Depth Articles", seosorted: true, agency: true, genericAi: "Partial" },
    { feature: "Automated Featured & Inline Images", seosorted: true, agency: "Extra Cost", genericAi: false },
    { feature: "Direct CMS Auto-Publishing (WordPress/Webflow)", seosorted: true, agency: false, genericAi: false },
    { feature: "Article JSON-LD Schema Injection", seosorted: true, agency: true, genericAi: false },
    { feature: "Closed-Loop Google Search Console Sync", seosorted: true, agency: false, genericAi: false },
    { feature: "Average Monthly Cost", seosorted: "$99 / flat rate", agency: "$3,000 - $6,000", genericAi: "$20 - $49 / mo" },
    { feature: "Turnaround Time per Article", seosorted: "30 seconds", agency: "5 - 7 days", genericAi: "5 minutes (manual)" },
  ];

  return (
    <section id="compare" className="py-20 bg-[#0B0F17] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-xs font-mono uppercase tracking-widest text-brand-400 font-semibold mb-3">Why SEOSorted Wins</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white font-outfit tracking-tight">
            Compare SEOSorted with alternatives
          </p>
          <p className="mt-4 text-slate-400 text-base">
            See how an autonomous AI SEO engine compares to hiring an expensive agency or manually prompting basic AI tools.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/80 text-xs font-semibold text-slate-300 uppercase tracking-wider">
                <th className="p-5 font-outfit">Product Features</th>
                <th className="p-5 font-outfit bg-brand-500/10 text-brand-400 border-x border-brand-500/20 text-center font-bold text-sm">
                  <div className="flex items-center justify-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-brand-500" />
                    <span>seosorted.ai</span>
                  </div>
                </th>
                <th className="p-5 font-outfit text-center">Traditional Agency</th>
                <th className="p-5 font-outfit text-center">Generic AI Writer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-xs sm:text-sm text-slate-300">
              {comparisonData.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-5 font-medium text-slate-200">{row.feature}</td>
                  
                  {/* SEOSorted Column */}
                  <td className="p-5 text-center bg-brand-500/5 border-x border-brand-500/20 font-bold text-white">
                    {typeof row.seosorted === 'boolean' ? (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mx-auto">
                        <Check className="w-4 h-4" />
                      </span>
                    ) : (
                      <span className="text-brand-400 font-mono">{row.seosorted}</span>
                    )}
                  </td>

                  {/* Agency Column */}
                  <td className="p-5 text-center">
                    {typeof row.agency === 'boolean' ? (
                      row.agency ? (
                        <Check className="w-4 h-4 text-slate-400 mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-rose-500/60 mx-auto" />
                      )
                    ) : (
                      <span className="text-slate-400 font-mono">{row.agency}</span>
                    )}
                  </td>

                  {/* Generic AI Column */}
                  <td className="p-5 text-center">
                    {typeof row.genericAi === 'boolean' ? (
                      row.genericAi ? (
                        <Check className="w-4 h-4 text-slate-400 mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-rose-500/60 mx-auto" />
                      )
                    ) : (
                      <span className="text-slate-400 font-mono">{row.genericAi}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
}
