import React, { useState } from 'react';
import { Cpu, Search, Sparkles, AlertCircle, CheckCircle2, Mic, FileText, Globe } from 'lucide-react';

export default function AeoSimulatorApp() {
  const [searchQuery, setSearchQuery] = useState('How to automate SEO keyword clustering in 2026');
  const [articleDraft, setArticleDraft] = useState('RankTop AI automates keyword research by grouping high-intent search terms into content clusters, generating structured JSON-LD schema markup, and tracking citation visibility across Google AI Overviews and ChatGPT Search.');
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResult, setAuditResult] = useState({
    citationProbability: '88%',
    status: 'High Overview Inclusion',
    speakableReady: true,
    suggestedFix: 'Include a 40-word concise answer block immediately under the main H2 heading.'
  });

  const handleRunAudit = (e) => {
    e.preventDefault();
    setIsAuditing(true);
    setTimeout(() => {
      setAuditResult({
        citationProbability: '92%',
        status: 'Optimal AI Overview Inclusion',
        speakableReady: true,
        suggestedFix: 'Schema markup validated. Ready for voice search extraction.'
      });
      setIsAuditing(false);
    }, 1000);
  };

  return (
    <div className="w-full space-y-6 font-sans">
      
      {/* Header Banner */}
      <div className="bg-[#171717] p-6 rounded-2xl border border-[#262626] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3ECF8E]/10 text-[#3ECF8E] text-sm font-semibold mb-2 border border-[#3ECF8E]/20">
            <Cpu className="w-4 h-4" />
            <span>Answer Engine Optimization (AEO) Engine</span>
          </div>
          <h1 className="text-2xl font-bold text-white font-sans">Google AI Overview & Voice Search Inspector</h1>
          <p className="text-sm text-zinc-400 mt-1">Test whether your content will be cited in Google AI Overviews and spoken by voice assistants.</p>
        </div>

        <button
          onClick={handleRunAudit}
          disabled={isAuditing}
          className="px-5 py-2.5 bg-[#3ECF8E] hover:bg-[#34D399] text-black font-bold text-sm rounded-xl shadow flex items-center gap-2 shrink-0"
        >
          {isAuditing ? (
            <>
              <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              <span>Inspecting AI Snippet...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-black" />
              <span>Inspect AI Overview</span>
            </>
          )}
        </button>
      </div>

      {/* Input Form & Inspector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-start">
        
        {/* Left Input Form */}
        <div className="lg:col-span-6 bg-[#171717] rounded-2xl border border-[#262626] p-6 space-y-4">
          <h3 className="text-sm font-bold text-white font-sans uppercase tracking-wider">Inspect Target Question & Content Draft</h3>

          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-zinc-300">
              Target Search Query / Question
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#121212] border border-[#262626] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#3ECF8E]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-zinc-300">
              Article Excerpt / Direct Answer Block
            </label>
            <textarea
              rows={4}
              value={articleDraft}
              onChange={(e) => setArticleDraft(e.target.value)}
              className="w-full bg-[#121212] border border-[#262626] rounded-xl p-4 text-sm text-zinc-200 focus:outline-none focus:border-[#3ECF8E] leading-relaxed"
            />
          </div>
        </div>

        {/* Right Audit Results */}
        <div className="lg:col-span-6 bg-[#171717] rounded-2xl border border-[#262626] p-6 space-y-4">
          <h3 className="text-sm font-bold text-white font-sans uppercase tracking-wider">Simulated AI Overview Card Output</h3>

          <div className="bg-[#121212] p-5 rounded-xl border border-[#262626] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-[#3ECF8E] flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> AI Overview Citation Score
              </span>
              <span className="bg-[#3ECF8E]/10 text-[#3ECF8E] text-sm font-bold px-3 py-1 rounded-lg border border-[#3ECF8E]/20">
                {auditResult.citationProbability}
              </span>
            </div>

            <p className="text-sm text-zinc-200 leading-relaxed font-sans bg-[#171717] p-4 rounded-xl border border-[#262626]">
              "{articleDraft}"
            </p>

            <div className="p-3.5 bg-[#171717] rounded-xl border border-[#262626] text-sm text-zinc-300 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#3ECF8E] shrink-0" />
              <span>{auditResult.suggestedFix}</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
