import React, { useState } from 'react';
import { 
  TrendingUp, 
  Eye, 
  MousePointer, 
  Target, 
  Sparkles, 
  ArrowUpRight, 
  CheckCircle2, 
  RefreshCw, 
  FileText, 
  Share2, 
  AlertCircle, 
  Cpu, 
  Zap, 
  Globe, 
  ChevronRight, 
  BarChart2, 
  PieChart,
  ShieldCheck,
  Activity,
  Plus,
  Search
} from 'lucide-react';

export default function DashboardOverview({ activeWebsiteUrl = 'Enter your website', setActiveTab }) {
  const [isScanning, setIsScanning] = useState(false);

  // Clean string helper
  const domain = (typeof activeWebsiteUrl === 'string' && activeWebsiteUrl && activeWebsiteUrl !== 'Enter your website') ? activeWebsiteUrl : 'your website';
  const brandName = domain.split('.')[0] || 'your website';

  // Zero-State Metrics for first-time clean user
  const [metrics, setMetrics] = useState({
    clicks: '0',
    clicksGrowth: '0%',
    impressions: '0',
    impressionsGrowth: '0%',
    avgRank: 'N/A',
    top3Count: 0,
    top10Count: 0,
    top50Count: 0,
    aeoCitationScore: '0%',
    voiceExtractionScore: '0%',
    chatGptScore: '0%',
    claudeScore: '0%',
    perplexityScore: '0%',
    geminiScore: '0%'
  });

  const [monthlyTraffic, setMonthlyTraffic] = useState([]);
  const [articles, setArticles] = useState([]);
  const [actionItems, setActionItems] = useState([
    { id: 1, title: 'Connect Domain & Run Telemetry', desc: 'Enter your domain in top navigation to pull live search data.', action: 'strategy', tag: 'Setup Step' },
    { id: 2, title: 'Discover Low-KD Keyword Opportunities', desc: 'Extract high-intent keyword clusters tailored to your niche.', action: 'strategy', tag: 'SEO Action' },
    { id: 3, title: 'Draft First AI Article with Schema', desc: 'Create 2,000+ word articles with voice & speakable FAQ schema.', action: 'studio', tag: 'Content Action' },
  ]);

  const handleRunTelemetryScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setMetrics({
        clicks: '1,240',
        clicksGrowth: '+12.4%',
        impressions: '18,500',
        impressionsGrowth: '+24.1%',
        avgRank: '#6.4',
        top3Count: 3,
        top10Count: 8,
        top50Count: 15,
        aeoCitationScore: '64.0%',
        voiceExtractionScore: '72%',
        chatGptScore: '80%',
        claudeScore: '75%',
        perplexityScore: '78%',
        geminiScore: '70%'
      });
      setMonthlyTraffic([
        { month: 'Jan', clicks: 120 },
        { month: 'Feb', clicks: 240 },
        { month: 'Mar', clicks: 410 },
        { month: 'Apr', clicks: 680 },
        { month: 'May', clicks: 920 },
        { month: 'Jun', clicks: 1240 },
      ]);
      setIsScanning(false);
    }, 1200);
  };

  const handleNavigate = (tab) => {
    if (typeof setActiveTab === 'function') {
      setActiveTab(tab);
    }
  };

  return (
    <div className="w-full space-y-6 font-sans">
      

      {/* 3 Core Trifecta Scorecards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* 1. SEO Scorecard */}
        <div className="bg-[#171717] p-6 rounded-2xl border border-[#262626] space-y-4 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-[#262626] pb-3">
            <span className="text-sm font-bold text-[#3ECF8E] flex items-center gap-2 uppercase tracking-wider">
              <Search className="w-4 h-4" /> 🔍 SEO Performance
            </span>
            <span className="bg-[#3ECF8E]/10 text-[#3ECF8E] text-sm px-3 py-1 rounded-lg font-bold border border-[#3ECF8E]/20">
              Rank {metrics.avgRank}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-1">
            <div className="p-4 bg-[#121212] rounded-xl border border-[#262626]">
              <span className="text-sm text-zinc-400 block font-medium">Organic Clicks</span>
              <span className="text-2xl font-extrabold text-white block mt-1">{metrics.clicks}</span>
              <span className="text-sm text-zinc-500 block mt-1 font-medium">{metrics.clicksGrowth} MoM</span>
            </div>
            <div className="p-4 bg-[#121212] rounded-xl border border-[#262626]">
              <span className="text-sm text-zinc-400 block font-medium">Impressions</span>
              <span className="text-2xl font-extrabold text-white block mt-1">{metrics.impressions}</span>
              <span className="text-sm text-zinc-500 block mt-1 font-medium">{metrics.impressionsGrowth} MoM</span>
            </div>
          </div>
        </div>

        {/* 2. AEO Scorecard */}
        <div className="bg-[#171717] p-6 rounded-2xl border border-[#262626] space-y-4 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-[#262626] pb-3">
            <span className="text-sm font-bold text-[#3ECF8E] flex items-center gap-2 uppercase tracking-wider">
              <Cpu className="w-4 h-4" /> 🤖 AEO Performance
            </span>
            <span className="bg-[#3ECF8E]/10 text-[#3ECF8E] text-sm px-3 py-1 rounded-lg font-bold border border-[#3ECF8E]/20">
              {metrics.aeoCitationScore} Citation
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-1">
            <div className="p-4 bg-[#121212] rounded-xl border border-[#262626]">
              <span className="text-sm text-zinc-400 block font-medium">AI Overview Rate</span>
              <span className="text-2xl font-extrabold text-white block mt-1">{metrics.aeoCitationScore}</span>
              <span className="text-sm text-zinc-500 block mt-1 font-medium">AI Snippet</span>
            </div>
            <div className="p-4 bg-[#121212] rounded-xl border border-[#262626]">
              <span className="text-sm text-zinc-400 block font-medium">Voice Answer</span>
              <span className="text-2xl font-extrabold text-white block mt-1">{metrics.voiceExtractionScore}</span>
              <span className="text-sm text-zinc-500 block mt-1 font-medium">Speakable Schema</span>
            </div>
          </div>
        </div>

        {/* 3. GEO Scorecard */}
        <div className="bg-[#171717] p-6 rounded-2xl border border-[#262626] space-y-4 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-[#262626] pb-3">
            <span className="text-sm font-bold text-[#3ECF8E] flex items-center gap-2 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" /> 🛡️ GEO Performance
            </span>
            <span className="bg-[#3ECF8E]/10 text-[#3ECF8E] text-sm px-3 py-1 rounded-lg font-bold border border-[#3ECF8E]/20">
              {metrics.chatGptScore} LLM Score
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-1">
            <div className="p-4 bg-[#121212] rounded-xl border border-[#262626]">
              <span className="text-sm text-zinc-400 block font-medium">ChatGPT Visibility</span>
              <span className="text-2xl font-extrabold text-white block mt-1">{metrics.chatGptScore}</span>
              <span className="text-sm text-zinc-500 block mt-1 font-medium">GPTBot Status</span>
            </div>
            <div className="p-4 bg-[#121212] rounded-xl border border-[#262626]">
              <span className="text-sm text-zinc-400 block font-medium">Claude Visibility</span>
              <span className="text-2xl font-extrabold text-white block mt-1">{metrics.claudeScore}</span>
              <span className="text-sm text-zinc-500 block mt-1 font-medium">ClaudeBot Status</span>
            </div>
          </div>
        </div>

      </div>

      {/* Visual Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Graph 1: SEO Traffic Growth Curve */}
        <div className="lg:col-span-8 bg-[#171717] p-6 rounded-2xl border border-[#262626] space-y-5 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-[#262626] pb-3">
            <div>
              <h3 className="text-base font-bold text-white font-sans">Google Search Organic Clicks Curve</h3>
              <p className="text-sm text-zinc-400 mt-1">Monthly organic traffic telemetry for {domain}</p>
            </div>
            <span className="text-sm font-bold text-zinc-400 bg-[#121212] px-3 py-1.5 rounded-lg border border-[#262626] shrink-0">
              Telemetry Telemetry
            </span>
          </div>

          <div className="h-60 w-full bg-[#121212] rounded-xl p-5 border border-[#262626] flex items-center justify-center">
            {monthlyTraffic.length === 0 ? (
              <div className="text-center space-y-2">
                <BarChart2 className="w-8 h-8 text-[#3ECF8E] mx-auto" />
                <p className="text-sm text-zinc-400">Click <strong className="text-white">Sync Telemetry</strong> to load live organic traffic analytics.</p>
              </div>
            ) : (
              <div className="h-full w-full flex items-end justify-between gap-3">
                {monthlyTraffic.map((item, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                    <div 
                      className="w-full bg-[#3ECF8E] rounded-t transition-all group-hover:bg-[#34D399]" 
                      style={{ height: `${(item.clicks / 1500) * 100}%` }} 
                    />
                    <span className="text-sm text-zinc-400 font-medium">{item.month}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Pie Chart Representation: Keyword Distribution */}
        <div className="lg:col-span-4 bg-[#171717] p-6 rounded-2xl border border-[#262626] space-y-5 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-[#262626] pb-3">
            <div>
              <h3 className="text-base font-bold text-white font-sans">Keyword Ranking Breakdown</h3>
              <p className="text-sm text-zinc-400 mt-1">Search ranking distribution across positions</p>
            </div>
            <span className="text-sm text-zinc-400 bg-[#121212] px-3 py-1.5 rounded-lg border border-[#262626] font-medium shrink-0">
              0 Keywords
            </span>
          </div>

          <div className="space-y-4 pt-1">
            <div className="p-4 bg-[#121212] rounded-xl border border-[#262626] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[#3ECF8E]" />
                <span className="text-sm font-bold text-white">Top 3 (#1 - #3)</span>
              </div>
              <span className="text-sm font-bold text-zinc-400">{metrics.top3Count} Keywords</span>
            </div>

            <div className="p-4 bg-[#121212] rounded-xl border border-[#262626] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-blue-400" />
                <span className="text-sm font-bold text-white">Top 10 (#4 - #10)</span>
              </div>
              <span className="text-sm font-bold text-zinc-400">{metrics.top10Count} Keywords</span>
            </div>

            <div className="p-4 bg-[#121212] rounded-xl border border-[#262626] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-zinc-600" />
                <span className="text-sm font-bold text-white">Top 50 (#11 - #50)</span>
              </div>
              <span className="text-sm font-bold text-zinc-400">{metrics.top50Count} Keywords</span>
            </div>
          </div>
        </div>

      </div>

      {/* Bar Chart: LLM Chatbot Citation Scores */}
      <div className="bg-[#171717] p-6 rounded-2xl border border-[#262626] space-y-5">
        <div className="flex items-center justify-between border-b border-[#262626] pb-3">
          <div>
            <h3 className="text-base font-bold text-white font-sans">GEO LLM Answer Engine Citation Rates</h3>
            <p className="text-sm text-zinc-400 mt-1">Percentage of brand inclusion in AI answers for {domain}</p>
          </div>
          <span className="text-sm text-zinc-400 font-bold shrink-0">Live Status</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-[#121212] rounded-xl border border-[#262626] space-y-3">
            <div className="flex items-center justify-between text-sm text-zinc-400">
              <span className="font-semibold">ChatGPT (GPT-4o)</span>
              <span className="text-zinc-400 font-bold">{metrics.chatGptScore}</span>
            </div>
            <div className="w-full bg-[#262626] h-2.5 rounded-full overflow-hidden">
              <div className="bg-[#3ECF8E] h-full w-0" />
            </div>
          </div>

          <div className="p-4 bg-[#121212] rounded-xl border border-[#262626] space-y-3">
            <div className="flex items-center justify-between text-sm text-zinc-400">
              <span className="font-semibold">Perplexity AI</span>
              <span className="text-zinc-400 font-bold">{metrics.perplexityScore}</span>
            </div>
            <div className="w-full bg-[#262626] h-2.5 rounded-full overflow-hidden">
              <div className="bg-[#3ECF8E] h-full w-0" />
            </div>
          </div>

          <div className="p-4 bg-[#121212] rounded-xl border border-[#262626] space-y-3">
            <div className="flex items-center justify-between text-sm text-zinc-400">
              <span className="font-semibold">Claude 3.5 Sonnet</span>
              <span className="text-zinc-400 font-bold">{metrics.claudeScore}</span>
            </div>
            <div className="w-full bg-[#262626] h-2.5 rounded-full overflow-hidden">
              <div className="bg-[#3ECF8E] h-full w-0" />
            </div>
          </div>

          <div className="p-4 bg-[#121212] rounded-xl border border-[#262626] space-y-3">
            <div className="flex items-center justify-between text-sm text-zinc-400">
              <span className="font-semibold">Google Gemini 2.5</span>
              <span className="text-zinc-400 font-bold">{metrics.geminiScore}</span>
            </div>
            <div className="w-full bg-[#262626] h-2.5 rounded-full overflow-hidden">
              <div className="bg-[#3ECF8E] h-full w-0" />
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations & Top Articles Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Simple Actionable Checklist */}
        <div className="lg:col-span-6 bg-[#171717] p-6 rounded-2xl border border-[#262626] space-y-5 font-sans flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-[#262626] pb-3">
            <div>
              <h3 className="text-base font-bold text-white font-sans">Suggested Actions to Rank Higher</h3>
              <p className="text-sm text-zinc-400 mt-1">Automated AI recommendations to boost rankings</p>
            </div>
            <span className="text-sm text-[#3ECF8E] font-bold shrink-0">1-Click Fixes</span>
          </div>

          <div className="space-y-4">
            {actionItems.map((item) => (
              <div 
                key={item.id}
                onClick={() => handleNavigate(item.action)}
                className="p-4 bg-[#121212] rounded-xl border border-[#262626] hover:border-[#3ECF8E] transition-all cursor-pointer flex items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="bg-[#3ECF8E]/10 text-[#3ECF8E] text-sm px-2.5 py-0.5 rounded font-bold">{item.tag}</span>
                    <h4 className="text-sm font-bold text-white">{item.title}</h4>
                  </div>
                  <p className="text-sm text-zinc-400 mt-1">{item.desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-[#3ECF8E] shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* Published Articles Matrix */}
        <div className="lg:col-span-6 bg-[#171717] p-6 rounded-2xl border border-[#262626] space-y-5 font-sans flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-[#262626] pb-3">
            <div>
              <h3 className="text-base font-bold text-white font-sans">Top Ranking Articles</h3>
              <p className="text-sm text-zinc-400 mt-1">Live organic content performance matrix</p>
            </div>
            <button onClick={() => handleNavigate('studio')} className="text-sm text-[#3ECF8E] hover:underline font-bold flex items-center gap-1 shrink-0">
              <Plus className="w-4 h-4" /> Write Article
            </button>
          </div>

          <div className="space-y-4">
            {articles.length === 0 ? (
              <div className="p-8 text-center bg-[#121212] rounded-xl border border-[#262626] space-y-2">
                <FileText className="w-8 h-8 text-[#3ECF8E] mx-auto" />
                <p className="text-sm text-zinc-400">No articles published yet.</p>
                <button
                  onClick={() => handleNavigate('studio')}
                  className="px-4 py-2 bg-[#3ECF8E] hover:bg-[#34D399] text-black font-bold text-sm rounded-xl inline-flex items-center gap-1.5 shadow"
                >
                  <Plus className="w-4 h-4" /> Write First Article
                </button>
              </div>
            ) : (
              articles.map((art, idx) => (
                <div key={idx} className="p-4 bg-[#121212] rounded-xl border border-[#262626] flex items-center justify-between gap-4">
                  <div>
                    <span className="text-sm font-bold text-white block truncate max-w-xs">{art.title}</span>
                    <span className="text-sm text-zinc-400 mt-1 block">{art.clicks} clicks • Rank {art.rank} on Google</span>
                  </div>
                  <span className="text-sm font-bold text-[#3ECF8E] bg-[#3ECF8E]/10 px-3 py-1 rounded-lg border border-[#3ECF8E]/20 shrink-0">
                    {art.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
