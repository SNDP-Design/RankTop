import React, { useState } from 'react';
import { Share2, CheckCircle2, RefreshCw, Key, Globe, ExternalLink, Zap } from 'lucide-react';

export default function CmsIntegrations() {
  const [integrations, setIntegrations] = useState([
    { id: 'wp', name: 'WordPress REST API', status: 'Ready to Connect', endpoint: 'https://yourdomain.com/wp-json/wp/v2/posts', auth: 'Not Configured', mode: 'Disabled' },
    { id: 'webflow', name: 'Webflow Collection Webhook', status: 'Ready to Connect', endpoint: 'https://api.webflow.com/collections/...', auth: 'Not Configured', mode: 'Disabled' },
    { id: 'shopify', name: 'Shopify Blog API', status: 'Ready to Connect', endpoint: 'https://yourdomain.myshopify.com/admin/api', auth: 'Not Configured', mode: 'Disabled' },
    { id: 'ghost', name: 'Ghost Admin API', status: 'Ready to Connect', endpoint: 'https://yourdomain.ghost.io/ghost/api/admin', auth: 'Not Configured', mode: 'Disabled' },
  ]);

  const toggleStatus = (id) => {
    setIntegrations(integrations.map(item => {
      if (item.id === id) {
        const isConnected = item.status === 'Connected';
        return {
          ...item,
          status: isConnected ? 'Ready to Connect' : 'Connected',
          mode: isConnected ? 'Disabled' : 'Draft Mode'
        };
      }
      return item;
    }));
  };

  return (
    <div className="w-full space-y-3 font-sans">
      
      {/* Header Banner */}
      <div className="bg-[#171717] p-4 rounded-xl border border-[#262626] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3ECF8E]/10 text-[#3ECF8E] text-xs font-semibold mb-1 border border-[#3ECF8E]/20">
            <Share2 className="w-3.5 h-3.5" />
            <span>Direct CMS Auto-Publishing Suite</span>
          </div>
          <h1 className="text-xl font-bold text-white font-sans">CMS Connections & Webhooks</h1>
          <p className="text-xs text-zinc-400 mt-0.5">Publish generated articles automatically into your CMS with formatted headings, images, and schema markup.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
        {integrations.map((cms) => (
          <div key={cms.id} className="bg-[#171717] rounded-xl border border-[#262626] p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#3ECF8E]/10 text-[#3ECF8E] flex items-center justify-center border border-[#3ECF8E]/20 font-bold">
                  <Share2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white font-sans">{cms.name}</h3>
                  <span className="text-[10px] text-zinc-400 font-sans">{cms.endpoint}</span>
                </div>
              </div>

              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                cms.status === 'Connected'
                  ? 'bg-[#3ECF8E]/10 text-[#3ECF8E] border-[#3ECF8E]/20'
                  : 'bg-[#121212] text-zinc-400 border-[#262626]'
              }`}>
                {cms.status}
              </span>
            </div>

            <div className="p-2.5 bg-[#121212] rounded-lg border border-[#262626] text-[10px] space-y-1 font-sans">
              <div className="flex items-center justify-between text-zinc-400">
                <span>Auth Token:</span>
                <span className="text-white">{cms.auth}</span>
              </div>
              <div className="flex items-center justify-between text-zinc-400">
                <span>Publishing Mode:</span>
                <span className="text-[#3ECF8E] font-semibold">{cms.mode}</span>
              </div>
            </div>

            <button
              onClick={() => toggleStatus(cms.id)}
              className={`w-full py-2 rounded-lg font-bold text-xs transition-all ${
                cms.status === 'Connected'
                  ? 'bg-[#121212] hover:bg-[#262626] text-zinc-300 border border-[#262626]'
                  : 'bg-[#3ECF8E] hover:bg-[#34D399] text-black shadow'
              }`}
            >
              {cms.status === 'Connected' ? 'Disconnect CMS' : 'Connect CMS Credentials'}
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
