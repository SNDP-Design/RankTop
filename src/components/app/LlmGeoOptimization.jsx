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
    <div className="w-full space-y-3 font-sans">
      
      {/* Header Banner */}
      <div className="bg-[#171717] p-4 rounded-xl border border-[#262626] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3ECF8E]/10 text-[#3ECF8E] text-xs font-semibold mb-1 border border-[#3ECF8E]/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Generative Engine Optimization (GEO) Hub</span>
          </div>
          <h1 className="text-xl font-bold text-white font-sans">ChatGPT & Claude AI Search Visibility</h1>
          <p className="text-xs text-zinc-400 mt-0.5">Ensure your website content is indexed and cited by ChatGPT, Perplexity, Claude, and Gemini.</p>
        </div>

        <button
          onClick={handleAuditRobots}
          disabled={isAuditing}
          className="px-4 py-2 bg-[#3ECF8E] hover:bg-[#34D399] text-black font-bold text-xs rounded-lg shadow flex items-center gap-1.5 shrink-0"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isAuditing ? 'animate-spin' : ''}`} />
          <span>{isAuditing ? 'Auditing AI Bots...' : 'Audit AI Bot Access'}</span>
        </button>
      </div>

      {/* Crawler Audit Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
        {crawlers.map((bot, idx) => (
          <div key={idx} className="bg-[#171717] rounded-xl border border-[#262626] p-4 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#3ECF8E]" />
                <h3 className="text-xs font-bold text-white font-sans">{bot.name}</h3>
              </div>
              <span className="bg-[#3ECF8E]/10 text-[#3ECF8E] border border-[#3ECF8E]/20 px-2 py-0.5 rounded text-[10px] font-bold">
                {bot.status}
              </span>
            </div>

            <p className="text-xs text-zinc-400 font-sans">{bot.impact}</p>

            <div className="p-2 bg-[#121212] rounded-lg border border-[#262626] text-[10px] font-mono text-zinc-300">
              {bot.userAgent}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
