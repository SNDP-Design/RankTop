import React, { useState } from 'react';
import { Share2, CheckCircle2, RefreshCw, Key, Globe, ExternalLink, Zap } from 'lucide-react';

export default function CmsIntegrations() {
  const [integrations, setIntegrations] = useState([
    { id: 'wp', name: 'WordPress REST API', status: 'Connected', endpoint: 'https://mywebsite.com/wp-json/wp/v2/posts', auth: 'Application Password Active', mode: 'Draft Mode' },
    { id: 'webflow', name: 'Webflow Collection Webhook', status: 'Connected', endpoint: 'https://api.webflow.com/collections/64f9...', auth: 'Bearer Token Verified', mode: 'Auto-Publish' },
    { id: 'shopify', name: 'Shopify Blog API', status: 'Ready to Connect', endpoint: 'https://mywebsite.myshopify.com/admin/api', auth: 'Not Configured', mode: 'Disabled' },
    { id: 'ghost', name: 'Ghost Admin API', status: 'Ready to Connect', endpoint: 'https://mywebsite.ghost.io/ghost/api/admin', auth: 'Not Configured', mode: 'Disabled' },
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
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-semibold mb-2">
            <Share2 className="w-3.5 h-3.5" />
            <span>Direct CMS Auto-Publishing Suite</span>
          </div>
          <h1 className="text-2xl font-bold text-white font-outfit">CMS Connections & Webhooks</h1>
          <p className="text-xs text-slate-400 mt-1">Publish generated articles automatically into your CMS with formatted headings, images, and schema markup</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {integrations.map((cms) => (
          <div key={cms.id} className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center border border-brand-500/20 font-bold">
                  <Share2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-outfit">{cms.name}</h3>
                  <span className="text-xs text-slate-400 font-mono">{cms.endpoint}</span>
                </div>
              </div>

              <span className={`text-[10px] font-mono font-semibold px-2.5 py-1 rounded border ${
                cms.status === 'Connected'
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}>
                {cms.status}
              </span>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1.5 font-mono">
              <div className="flex items-center justify-between text-slate-400">
                <span>Auth Token:</span>
                <span className="text-white">{cms.auth}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Publishing Mode:</span>
                <span className="text-brand-400 font-semibold">{cms.mode}</span>
              </div>
            </div>

            <button
              onClick={() => toggleStatus(cms.id)}
              className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all ${
                cms.status === 'Connected'
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                  : 'bg-brand-500 hover:bg-brand-400 text-white shadow shadow-brand-500/20'
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
