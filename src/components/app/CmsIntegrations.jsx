import React, { useState } from 'react';
import { Share2, CheckCircle2, Globe, Loader2 } from 'lucide-react';
import { gscService } from '../../services/gscService';

export default function CmsIntegrations() {
  const [gscConnected, setGscConnected] = useState(gscService.isConnected());
  const [gscLoading, setGscLoading] = useState(false);

  const [integrations, setIntegrations] = useState([
    { id: 'wp', name: 'WordPress REST API', status: 'Ready to Connect', endpoint: 'https://yourdomain.com/wp-json/wp/v2/posts', auth: 'Not Configured', mode: 'Disabled' },
    { id: 'webflow', name: 'Webflow Collection Webhook', status: 'Ready to Connect', endpoint: 'https://api.webflow.com/collections/...', auth: 'Not Configured', mode: 'Disabled' },
    { id: 'shopify', name: 'Shopify Blog API', status: 'Ready to Connect', endpoint: 'https://yourdomain.myshopify.com/admin/api', auth: 'Not Configured', mode: 'Disabled' },
    { id: 'ghost', name: 'Ghost Admin API', status: 'Ready to Connect', endpoint: 'https://yourdomain.ghost.io/ghost/api/admin', auth: 'Not Configured', mode: 'Disabled' },
  ]);

  const handleConnectGsc = () => {
    setGscLoading(true);
    gscService.connectGsc(
      () => {
        setGscConnected(true);
        setGscLoading(false);
      },
      (err) => {
        setGscLoading(false);
        console.error('[GSC GIS Error]', err);
      }
    );
  };

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
    <div className="w-full space-y-6 font-sans">
      
      {/* Header Banner */}
      <div className="bg-[#171717] p-6 rounded-2xl border border-[#262626] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3ECF8E]/10 text-[#3ECF8E] text-sm font-semibold mb-2 border border-[#3ECF8E]/20">
            <Share2 className="w-4 h-4" />
            <span>Direct CMS & Analytics Integration Suite</span>
          </div>
          <h1 className="text-2xl font-bold text-white font-sans">CMS & Google Search Console Connections</h1>
          <p className="text-sm text-zinc-400 mt-1">Connect your CMS and Search Console to publish articles automatically and track live keyword position rankings.</p>
        </div>
      </div>

      {/* Google Search Console Feature Integration */}
      <div className="bg-[#171717] rounded-2xl border border-[#4285F4]/30 p-6 space-y-4 bg-gradient-to-br from-[#171717] to-[#121212]">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#4285F4]/10 text-[#4285F4] flex items-center justify-center border border-[#4285F4]/30 font-bold">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-sans">Google Search Console Integration</h3>
              <p className="text-sm text-zinc-400 mt-0.5">Authorizes RankTop to pull live clicks, impressions, and exact Google keyword positions.</p>
            </div>
          </div>

          {gscConnected ? (
            <button
              onClick={() => { gscService.disconnectGsc(); setGscConnected(false); }}
              className="px-6 py-3 rounded-xl font-bold text-sm bg-[#121212] text-[#3ECF8E] border border-[#3ECF8E]/30 flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-[#3ECF8E]" /> Search Console Connected (Disconnect)
            </button>
          ) : (
            <button
              onClick={handleConnectGsc}
              disabled={gscLoading}
              className="px-6 py-3 rounded-xl font-bold text-sm bg-[#4285F4] hover:bg-[#3367D6] text-white flex items-center gap-2 shadow-lg shadow-[#4285F4]/20 transition-all cursor-pointer border-none"
            >
              {gscLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Globe className="w-4 h-4" />}
              Connect Search Console (Instant Popup)
            </button>
          )}
        </div>
      </div>




      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {integrations.map((cms) => (
          <div key={cms.id} className="bg-[#171717] rounded-2xl border border-[#262626] p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#3ECF8E]/10 text-[#3ECF8E] flex items-center justify-center border border-[#3ECF8E]/20 font-bold">
                  <Share2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-sans">{cms.name}</h3>
                  <span className="text-sm text-zinc-400 font-sans block mt-0.5">{cms.endpoint}</span>
                </div>
              </div>

              <span className={`text-sm font-semibold px-3 py-1 rounded-lg border ${
                cms.status === 'Connected'
                  ? 'bg-[#3ECF8E]/10 text-[#3ECF8E] border-[#3ECF8E]/20'
                  : 'bg-[#121212] text-zinc-400 border-[#262626]'
              }`}>
                {cms.status}
              </span>
            </div>

            <div className="p-4 bg-[#121212] rounded-xl border border-[#262626] text-sm space-y-2 font-sans">
              <div className="flex items-center justify-between text-zinc-400">
                <span>Auth Token:</span>
                <span className="text-white font-medium">{cms.auth}</span>
              </div>
              <div className="flex items-center justify-between text-zinc-400">
                <span>Publishing Mode:</span>
                <span className="text-[#3ECF8E] font-semibold">{cms.mode}</span>
              </div>
            </div>

            <button
              onClick={() => toggleStatus(cms.id)}
              className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${
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
