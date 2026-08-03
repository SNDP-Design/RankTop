import React from 'react';
import { Check, X, Sparkles } from 'lucide-react';

export default function CompareSection() {
  const comparisonData = [
    { feature: "Automated Keyword Research & Strategy", ranktop: true, agency: true, genericAi: false },
    { feature: "AI Overview (AEO) Citation Optimization", ranktop: true, agency: false, genericAi: false },
    { feature: "Generates 2,000+ Word In-Depth Articles", ranktop: true, agency: true, genericAi: "Partial" },
    { feature: "Automated Featured & Inline Images", ranktop: true, agency: "Extra Cost", genericAi: false },
    { feature: "Direct CMS Auto-Publishing (WordPress/Webflow)", ranktop: true, agency: false, genericAi: false },
    { feature: "Article JSON-LD Schema Injection", ranktop: true, agency: true, genericAi: false },
    { feature: "Closed-Loop Google Search Console Sync", ranktop: true, agency: false, genericAi: false },
    { feature: "Average Monthly Cost", ranktop: "$99 / flat rate", agency: "$3,000 - $6,000", genericAi: "$20 - $49 / mo" },
    { feature: "Turnaround Time per Article", ranktop: "30 seconds", agency: "5 - 7 days", genericAi: "5 minutes (manual)" },
  ];

  return (
    <section id="compare" className="py-20 bg-[#121212] relative border-t border-[#262626]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-sm font-mono uppercase tracking-widest text-[#3ECF8E] font-semibold mb-3">Why RankTop Wins</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white font-sans tracking-tight">
            Compare RankTop with alternatives
          </p>
          <p className="mt-4 text-zinc-400 text-base">
            See how an autonomous AI SEO engine compares to hiring an expensive agency or manually prompting basic AI tools.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-[#262626] bg-[#171717] shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#262626] bg-[#121212] text-sm font-semibold text-zinc-300 uppercase tracking-wider">
                <th className="p-5 font-sans">Product Features</th>
                <th className="p-5 font-sans bg-[#3ECF8E]/10 text-[#3ECF8E] border-x border-[#3ECF8E]/20 text-center font-bold text-sm">
                  <div className="flex items-center justify-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#3ECF8E]" />
                    <span>ranktop.ai</span>
                  </div>
                </th>
                <th className="p-5 font-sans text-center">Traditional Agency</th>
                <th className="p-5 font-sans text-center">Generic AI Writer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#262626] text-sm text-zinc-300">
              {comparisonData.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#1F1F1F] transition-colors">
                  <td className="p-5 font-medium text-zinc-200">{row.feature}</td>
                  
                  {/* RankTop Column */}
                  <td className="p-5 text-center bg-[#3ECF8E]/5 border-x border-[#3ECF8E]/20 font-bold text-white">
                    {typeof row.ranktop === 'boolean' ? (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#3ECF8E]/20 text-[#3ECF8E] border border-[#3ECF8E]/30 mx-auto">
                        <Check className="w-4 h-4" />
                      </span>
                    ) : (
                      <span className="text-[#3ECF8E] font-mono">{row.ranktop}</span>
                    )}
                  </td>

                  {/* Agency Column */}
                  <td className="p-5 text-center">
                    {typeof row.agency === 'boolean' ? (
                      row.agency ? (
                        <Check className="w-4 h-4 text-zinc-400 mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-rose-500/60 mx-auto" />
                      )
                    ) : (
                      <span className="text-zinc-400 font-mono">{row.agency}</span>
                    )}
                  </td>

                  {/* Generic AI Column */}
                  <td className="p-5 text-center">
                    {typeof row.genericAi === 'boolean' ? (
                      row.genericAi ? (
                        <Check className="w-4 h-4 text-zinc-400 mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-rose-500/60 mx-auto" />
                      )
                    ) : (
                      <span className="text-zinc-400 font-mono">{row.genericAi}</span>
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
