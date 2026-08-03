import React, { useState } from 'react';
import { Globe, ArrowRight, Sparkles, Bot, ShieldCheck, Cpu, CheckCircle2 } from 'lucide-react';

export default function WebsiteInputScreen({ onStartSwarm }) {
  const [url, setUrl] = useState('https://mywebsite.com');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url.trim()) return;

    setIsLoading(true);
    const cleanDomain = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '') || 'mywebsite.com';
    
    setTimeout(() => {
      onStartSwarm(cleanDomain);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#121212] text-slate-100 flex flex-col items-center justify-center p-4 selection:bg-[#3ECF8E] selection:text-black">
      
      {/* Glow Effects */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-[#3ECF8E]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-2xl w-full text-center space-y-8 relative z-10">
        
        {/* Brand Header */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3ECF8E]/10 border border-[#3ECF8E]/30 text-[#3ECF8E] text-sm font-semibold">
          <Bot className="w-4 h-4 text-[#3ECF8E]" />
          <span>RankTop Autonomous Multi-Agent Engine</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight font-sans">
          Enter your website URL to run the{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6EE7B7] via-[#3ECF8E] to-[#10B981]">
            Autonomous AI Swarm
          </span>
        </h1>

        <p className="text-base text-zinc-400 max-w-lg mx-auto leading-relaxed">
          RankTop will automatically deploy 6 specialized AI subagents to audit your domain, discover low-KD keywords, draft SEO content, and inspect Google AI Overview citations.
        </p>

        {/* Website Input Form */}
        <form onSubmit={handleSubmit} className="p-2 bg-[#171717] rounded-2xl border border-[#262626] shadow-2xl flex flex-col sm:flex-row items-center gap-2 focus-within:border-[#3ECF8E] transition-all">
          <div className="flex items-center gap-3 px-4 py-3 w-full sm:w-auto flex-1">
            <Globe className="w-5 h-5 text-[#3ECF8E] shrink-0" />
            <input
              type="url"
              placeholder="https://yourwebsite.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              aria-label="Enter your website URL"
              className="bg-transparent text-white placeholder-zinc-500 text-sm focus:outline-none w-full font-sans"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto px-6 py-3.5 bg-[#3ECF8E] hover:bg-[#34D399] text-black font-bold text-sm rounded-xl transition-all shadow-lg shadow-[#3ECF8E]/20 flex items-center justify-center gap-2 shrink-0 disabled:opacity-75 focus-visible:ring-2 focus-visible:ring-[#3ECF8E] focus-visible:outline-none"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                <span>Deploying Swarm...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-black" />
                <span>Launch Autonomous Swarm</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </>
            )}
          </button>
        </form>

        {/* Feature Checkmarks */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-400">
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#3ECF8E]" /> 6 AI Subagents</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#3ECF8E]" /> Google ADK Architecture</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#3ECF8E]" /> Instant AI Overview Audit</span>
        </div>

      </div>

    </div>
  );
}
