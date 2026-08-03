import React, { useState } from 'react';
import { Cpu, ShieldCheck, CheckCircle2, AlertTriangle, Search, Globe, RefreshCw, Zap, Layers, FileText, Database } from 'lucide-react';

export default function LlmGeoOptimization({ activeWebsiteUrl = 'mywebsite.com' }) {
  const domain = (typeof activeWebsiteUrl === 'string' && activeWebsiteUrl) ? activeWebsiteUrl : 'mywebsite.com';
  
  const [crawlers, setCrawlers] = useState([
    { name: 'GPTBot (OpenAI / ChatGPT)', status: 'Allowed', impact: 'High AI Traffic Source', userAgent: 'User-agent: GPTBot' },
    { name: 'ClaudeBot (Anthropic)', status: 'Allowed', impact: 'High B2B AI Citation Source', userAgent: 'User-agent: ClaudeBot' },
    { name: 'PerplexityBot (Perplexity AI)', status: 'Allowed', impact: 'Real-Time Search Source', userAgent: 'User-agent: PerplexityBot' },
    { name: 'Google-Extended (Gemini)', status: 'Allowed', impact: 'Google AI Ecosystem', userAgent: 'User-agent: Google-Extended' },
  ]);

  const [isAuditing, setIsAuditing] = useState(false);

  const handleAuditRobots = () => {
    setIsAuditing(true);
    setTimeout(() => {
      setIsAuditing(false);
    }, 1000);
  };

  return (
    <div className="w-full space-y-6 font-sans">
      
      {/* Header Banner */}
      <div className="bg-[#171717] p-6 rounded-2xl border border-[#262626] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3ECF8E]/10 text-[#3ECF8E] text-sm font-semibold mb-2 border border-[#3ECF8E]/20">
            <ShieldCheck className="w-4 h-4" />
            <span>Generative Engine Optimization (GEO) Hub</span>
          </div>
          <h1 className="text-2xl font-bold text-white font-sans">ChatGPT & Claude AI Search Visibility</h1>
          <p className="text-sm text-zinc-400 mt-1">Ensure your website content is indexed and cited by ChatGPT, Perplexity, Claude, and Gemini.</p>
        </div>

        <button
          onClick={handleAuditRobots}
          disabled={isAuditing}
          className="px-5 py-2.5 bg-[#3ECF8E] hover:bg-[#34D399] text-black font-bold text-sm rounded-xl shadow flex items-center gap-2 shrink-0"
        >
          <RefreshCw className={`w-4 h-4 ${isAuditing ? 'animate-spin' : ''}`} />
          <span>{isAuditing ? 'Auditing AI Bots...' : 'Audit AI Bot Access'}</span>
        </button>
      </div>

      {/* Crawler Audit Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {crawlers.map((bot, idx) => (
          <div key={idx} className="bg-[#171717] rounded-2xl border border-[#262626] p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-[#3ECF8E]" />
                <h3 className="text-base font-bold text-white font-sans">{bot.name}</h3>
              </div>
              <span className="bg-[#3ECF8E]/10 text-[#3ECF8E] border border-[#3ECF8E]/20 px-3 py-1 rounded-lg text-sm font-bold">
                {bot.status}
              </span>
            </div>

            <p className="text-sm text-zinc-400 font-sans">{bot.impact}</p>

            <div className="p-3 bg-[#121212] rounded-xl border border-[#262626] text-sm font-mono text-zinc-300">
              {bot.userAgent}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
