import React from 'react';
import { Sparkles, TrendingUp, Users, CheckCircle, Zap } from 'lucide-react';

export default function MarqueeTicker() {
  const items = [
    { icon: Sparkles, text: "400+ ARTICLES GENERATED WEEKLY" },
    { icon: Users, text: "500+ FOUNDERS PUBLISHING ON AUTOPILOT" },
    { icon: TrendingUp, text: "AVERAGE 74% TRAFFIC GROWTH IN 30 DAYS" },
    { icon: CheckCircle, text: "ZERO MANUAL KEYWORD RESEARCH" },
    { icon: Zap, text: "DIRECT WORDPRESS & WEBFLOW CMS PUBLISHING" },
    { icon: Sparkles, text: "AI OVERVIEW & AEO CITATION OPTIMIZED" },
  ];

  return (
    <div className="relative overflow-hidden bg-slate-950 border-y border-slate-800/80 py-4">
      {/* Gradient Mask for Edges */}
      <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-24 bg-gradient-to-r from-[#0B0F17] to-transparent" />
      <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-24 bg-gradient-to-l from-[#0B0F17] to-transparent" />

      <div className="flex w-max animate-marquee items-center gap-12">
        {[...items, ...items, ...items].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-center gap-2.5 text-xs font-mono font-medium text-brand-400 uppercase tracking-wider shrink-0">
              <Icon className="w-4 h-4 text-brand-500" />
              <span>{item.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
