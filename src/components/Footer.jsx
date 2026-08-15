import React from 'react';
import { Sparkles, Globe, Share2, Code, Mail } from 'lucide-react';

export default function Footer({ onOpenApp }) {
  return (
    <footer className="bg-[#121212] border-t border-[#262626] text-zinc-400 text-sm py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-[#262626]">
          
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#3ECF8E] flex items-center justify-center text-black font-bold">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-lg text-white font-sans">ranktop.ai</span>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed">
              AI-powered SEO insights and blog automation engine. Rank faster with zero manual effort.
            </p>
          </div>

          {/* Col 2 Product */}
          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider mb-3 text-sm">Product</h4>
            <ul className="space-y-2">
              <li><button onClick={() => onOpenApp?.('strategy')} className="hover:text-white transition-colors">Keyword Strategy</button></li>
              <li><button onClick={() => onOpenApp?.('studio')} className="hover:text-white transition-colors">AI Blog Studio</button></li>
              <li><button onClick={() => onOpenApp?.('aeo')} className="hover:text-white transition-colors">AEO Simulator</button></li>
              <li><button onClick={() => onOpenApp?.('competitors')} className="hover:text-white transition-colors">Competitor Crawler</button></li>
            </ul>
          </div>

          {/* Col 3 Resources */}
          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider mb-3 text-sm">Free Micro-Tools</h4>
            <ul className="space-y-2">
              <li><button onClick={() => onOpenApp?.('freetools')} className="hover:text-white transition-colors">Google SERP Simulator</button></li>
              <li><button onClick={() => onOpenApp?.('freetools')} className="hover:text-white transition-colors">Schema JSON-LD Generator</button></li>
              <li><button onClick={() => onOpenApp?.('freetools')} className="hover:text-white transition-colors">Headline CTR Optimizer</button></li>
              <li><button onClick={() => onOpenApp?.('aeo')} className="hover:text-white transition-colors">AI Overview Inspector</button></li>
            </ul>
          </div>

          {/* Col 4 Integrations */}
          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider mb-3 text-sm">CMS Connections</h4>
            <ul className="space-y-2">
              <li><span className="text-zinc-300">WordPress REST API</span></li>
              <li><span className="text-zinc-300">Webflow CMS Webhook</span></li>
              <li><span className="text-zinc-300">Shopify Blog API</span></li>
              <li><span className="text-zinc-300">Ghost Admin API</span></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 RankTop AI Inc. All rights reserved.</p>
          <div className="flex items-center gap-4 text-zinc-400">
            <a href="#" aria-label="Website" className="hover:text-white"><Globe className="w-4 h-4" /></a>
            <a href="#" aria-label="Share" className="hover:text-white"><Share2 className="w-4 h-4" /></a>
            <a href="#" aria-label="Code" className="hover:text-white"><Code className="w-4 h-4" /></a>
            <a href="#" aria-label="Contact" className="hover:text-white"><Mail className="w-4 h-4" /></a>
          </div>
        </div>

      </div>
    </footer>
  );
}
