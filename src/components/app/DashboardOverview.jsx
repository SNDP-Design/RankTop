import React, { useState } from 'react';
import { 
  TrendingUp, 
  Zap, 
  Globe2, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Calendar, 
  ArrowUpRight, 
  Bot,
  Award,
  BarChart3,
  PieChart,
  Activity,
  Layers,
  ArrowUp,
  Clock,
  Radio,
  MessageSquare,
  Magnet,
  FileText,
  Search,
  Share2,
  Wrench,
  Target
} from 'lucide-react';
import { useAgents } from '../../context/AgentContext';

// 16 Autonomous AI Agent Performance & Telemetry Definitions
const AGENT_PERFORMANCE_LIST = [
  { id: 'orchestrator', name: 'Swarm Orchestrator Manager', avatar: '👑', outputs: '14 Strategic Goal DAG Cycles', impact: '+4.2 Ranks', status: 'Autopilot Active 🟢', category: 'Core Orchestration', color: '#3ECF8E' },
  { id: 'backlinker', name: 'Backlink & Off-Page Outreach Agent', avatar: '🧲', outputs: '18 High-DR Links Acquired', impact: '+3.8 Ranks', status: 'Autopilot Active 🟢', category: 'Off-Page SEO', color: '#8b5cf6' },
  { id: 'aeo', name: 'AEO & LLM Citation Specialist', avatar: '🤖', outputs: '98% LLM Citation Placement', impact: '+3.5 Ranks', status: 'Autopilot Active 🟢', category: 'AEO / Voice Search', color: '#10b981' },
  { id: 'schema_engineer', name: 'Deep RAG Schema Engineer', avatar: '📜', outputs: '32 Nested RAG JSON-LD Files', impact: '+2.9 Ranks', status: 'Autopilot Active 🟢', category: 'RAG & Vector Schema', color: '#6366f1' },
  { id: 'decay_repairman', name: 'Content Freshness Repair Agent', avatar: '⚡', outputs: '100% Freshness Score Restored', impact: '+2.6 Ranks', status: 'Autopilot Active 🟢', category: 'Content Decay Repair', color: '#f43f5e' },
  { id: 'som_tracker', name: 'Share of Model (SoM) Tracker', avatar: '🏆', outputs: '88% Commercial Recommendation Share', impact: '+2.4 Ranks', status: 'Autopilot Active 🟢', category: 'GEO / LLM Analytics', color: '#f59e0b' },
  { id: 'writer', name: 'Content Creator & Schema Agent', avatar: '✍️', outputs: '24 Articles Published (2,400+ words)', impact: '+2.2 Ranks', status: 'Autopilot Active 🟢', category: 'Content Creation', color: '#a78bfa' },
  { id: 'research', name: 'Research & Keyword Strategist', avatar: '🔍', outputs: '48 Low-KD Target Keywords', impact: '+2.0 Ranks', status: 'Autopilot Active 🟢', category: 'Keyword Research', color: '#60a5fa' },
  { id: 'competitor', name: 'Competitor & Gap Analyst', avatar: '🕵️‍♂️', outputs: '12 Rival Gap Blueprints Scraped', impact: '+1.9 Ranks', status: 'Autopilot Active 🟢', category: 'Competitive Intelligence', color: '#f97316' },
  { id: 'data_citation', name: 'Statistical Data & GEO Injector', avatar: '📈', outputs: '64 Verified Facts & Citations Injected', impact: '+1.8 Ranks', status: 'Autopilot Active 🟢', category: 'GEO Fact Injection', color: '#06b6d4' },
  { id: 'entity_graph', name: 'Knowledge Graph & Schema Agent', avatar: '🕸️', outputs: '16 Wikidata & Google Graph IDs Linked', impact: '+1.7 Ranks', status: 'Autopilot Active 🟢', category: 'Semantic Authority', color: '#f59e0b' },
  { id: 'silo_architect', name: 'Autonomous Topic Silo Interlinker', avatar: '🏰', outputs: '6 Contextual Link Silos Constructed', impact: '+1.6 Ranks', status: 'Autopilot Active 🟢', category: 'Internal Architecture', color: '#10b981' },
  { id: 'llm_benchmarker', name: 'Live LLM Citation Benchmark Agent', avatar: '📡', outputs: '4 LLM Engines Benchmarked Daily', impact: '+1.5 Ranks', status: 'Autopilot Active 🟢', category: 'Live Benchmark', color: '#34d399' },
  { id: 'community_amplifier', name: 'Reddit & Forum GEO Agent', avatar: '💬', outputs: '14 Indexed Reddit & Quora Citations', impact: '+1.4 Ranks', status: 'Autopilot Active 🟢', category: 'Social GEO Authority', color: '#f97316' },
  { id: 'link_architect', name: 'Topic Cluster & Link Architect', avatar: '🔗', outputs: '8 Topic Cluster Maps Generated', impact: '+1.3 Ranks', status: 'Autopilot Active 🟢', category: 'Topic Clustering', color: '#ec4899' },
  { id: 'dispatcher', name: 'CMS Publishing Dispatcher', avatar: '🚀', outputs: '100% Automated WordPress Dispatch', impact: '+1.2 Ranks', status: 'Autopilot Active 🟢', category: 'CMS Auto-Publishing', color: '#f43f5e' }
];

// 30-Day Rank Lift Progression Points (#18 ➔ #4)
const RANK_PROGRESSION_30D = [
  { day: 'Day 1', rank: 18, clicks: 120 },
  { day: 'Day 5', rank: 16, clicks: 180 },
  { day: 'Day 10', rank: 14, clicks: 310 },
  { day: 'Day 15', rank: 11, clicks: 520 },
  { day: 'Day 20', rank: 8, clicks: 840 },
  { day: 'Day 25', rank: 6, clicks: 1250 },
  { day: 'Yesterday', rank: 5, clicks: 1620 },
  { day: 'Today', rank: 4, clicks: 1980 }
];

export default function DashboardOverview({ setActiveTab }) {
  const { websiteUrl } = useAgents();
  const domain = websiteUrl ? websiteUrl.replace(/^https?:\/\//, '').replace(/\/$/, '') : 'yourwebsite.com';

  const [timeRange, setTimeRange] = useState('30d');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="w-full font-sans">
      
      {/* Executive Outcome Banner: Rank Delta #5 -> #4 */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(62,207,142,0.12) 0%, rgba(139,92,246,0.08) 100%)',
        border: '1px solid rgba(62,207,142,0.3)',
        borderRadius: '16px',
        padding: '24px 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{
            width: '60px', height: '60px', borderRadius: '16px',
            background: 'linear-gradient(135deg, #3ECF8E 0%, #059669 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(62,207,142,0.3)'
          }}>
            <TrendingUp size={30} color="#000000" />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#3ECF8E', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Master Executive Telemetry Command Center
              </span>
              <span style={{
                fontSize: '11px', fontWeight: 700, background: 'rgba(62,207,142,0.2)',
                color: '#3ECF8E', padding: '2px 8px', borderRadius: '6px', border: '1px solid rgba(62,207,142,0.3)'
              }}>
                16 Autonomous Agents Active 🟢
              </span>
            </div>

            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#fff', margin: '4px 0 2px' }}>
              {domain} Performance & Ranking Outcome Dashboard
            </h1>
            <p style={{ fontSize: '13px', color: '#a1a1aa', margin: 0 }}>
              Tracking 30-day ranking lift, organic clicks growth, and output telemetry generated by your 16 autonomous AI agents.
            </p>
          </div>
        </div>

        {/* 24h Rank Lift Indicator */}
        <div style={{
          background: '#121212', border: '1px solid #2d2d2d', borderRadius: '12px',
          padding: '12px 20px', textAlign: 'center', minWidth: '220px'
        }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            24-Hour Outcome Delta
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '4px' }}>
            <span style={{ fontSize: '18px', fontWeight: 700, color: '#71717a' }}>Yesterday: #5</span>
            <ArrowUpRight size={18} color="#3ECF8E" />
            <span style={{ fontSize: '24px', fontWeight: 900, color: '#3ECF8E' }}>Today: #4</span>
          </div>
          <div style={{ fontSize: '12px', color: '#3ECF8E', fontWeight: 700, marginTop: '2px' }}>
            ▲ +1 Position Lift in 24 Hours
          </div>
        </div>
      </div>

      {/* Top Telemetry KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '14px', padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#a1a1aa', fontSize: '12px', fontWeight: 600 }}>
            <span>Overall Search Rank</span>
            <Award size={18} color="#3ECF8E" />
          </div>
          <div style={{ fontSize: '32px', fontWeight: 900, color: '#fff', marginTop: '6px' }}>Rank #4</div>
          <div style={{ fontSize: '12px', color: '#3ECF8E', marginTop: '4px', fontWeight: 700 }}>
            ▲ +14 Ranks Gained in 30 Days (#18 ➔ #4)
          </div>
        </div>

        <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '14px', padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#a1a1aa', fontSize: '12px', fontWeight: 600 }}>
            <span>Monthly Organic Clicks</span>
            <TrendingUp size={18} color="#60a5fa" />
          </div>
          <div style={{ fontSize: '32px', fontWeight: 900, color: '#fff', marginTop: '6px' }}>1.98K/mo</div>
          <div style={{ fontSize: '12px', color: '#60a5fa', marginTop: '4px', fontWeight: 700 }}>
            ▲ +1,860 clicks lift (+940% growth)
          </div>
        </div>

        <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '14px', padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#a1a1aa', fontSize: '12px', fontWeight: 600 }}>
            <span>Share of Model (SoM) Rate</span>
            <Radio size={18} color="#f59e0b" />
          </div>
          <div style={{ fontSize: '32px', fontWeight: 900, color: '#fff', marginTop: '6px' }}>88% SoM</div>
          <div style={{ fontSize: '12px', color: '#f59e0b', marginTop: '4px', fontWeight: 700 }}>
            Cited #1 in Perplexity Pro & ChatGPT
          </div>
        </div>

        <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '14px', padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#a1a1aa', fontSize: '12px', fontWeight: 600 }}>
            <span>16-Agent Total Outputs</span>
            <Bot size={18} color="#a78bfa" />
          </div>
          <div style={{ fontSize: '32px', fontWeight: 900, color: '#fff', marginTop: '6px' }}>312 Actions</div>
          <div style={{ fontSize: '12px', color: '#a78bfa', marginTop: '4px', fontWeight: 700 }}>
            100% Autonomous Autopilot Execution
          </div>
        </div>
      </div>

      {/* 30-Day Rank Progression Curve & Agent Impact Donut */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '20px' }}>
        
        {/* 30-Day Rank Lift Chart */}
        <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BarChart3 size={18} color="#3ECF8E" />
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', margin: 0 }}>
                30-Day Rank Progression & Click Growth Curve
              </h3>
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              {['7d', '30d'].map(r => (
                <button
                  key={r}
                  onClick={() => setTimeRange(r)}
                  style={{
                    fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '6px',
                    border: timeRange === r ? '1px solid #3ECF8E' : '1px solid #2d2d2d',
                    background: timeRange === r ? 'rgba(62,207,142,0.15)' : '#1f1f1f',
                    color: timeRange === r ? '#3ECF8E' : '#a1a1aa', cursor: 'pointer'
                  }}
                >
                  {r.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* SVG Line Graph */}
          <div style={{ height: '220px', width: '100%', position: 'relative', marginTop: '10px' }}>
            <svg width="100%" height="100%" viewBox="0 0 500 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="rankGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3ECF8E" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#3ECF8E" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="0" y1="40" x2="500" y2="40" stroke="#222" strokeDasharray="4 4" />
              <line x1="0" y1="90" x2="500" y2="90" stroke="#222" strokeDasharray="4 4" />
              <line x1="0" y1="140" x2="500" y2="140" stroke="#222" strokeDasharray="4 4" />

              {/* Fill Area */}
              <polygon
                points="0,170 60,150 120,130 185,100 250,70 320,50 410,40 500,25 500,200 0,200"
                fill="url(#rankGrad)"
              />

              {/* Main Curve Line */}
              <polyline
                fill="none"
                stroke="#3ECF8E"
                strokeWidth="4"
                strokeLinecap="round"
                points="0,170 60,150 120,130 185,100 250,70 320,50 410,40 500,25"
              />

              {/* Data Points */}
              <circle cx="0" cy="170" r="5" fill="#3ECF8E" />
              <circle cx="60" cy="150" r="5" fill="#3ECF8E" />
              <circle cx="120" cy="130" r="5" fill="#3ECF8E" />
              <circle cx="185" cy="100" r="5" fill="#3ECF8E" />
              <circle cx="250" cy="70" r="5" fill="#3ECF8E" />
              <circle cx="320" cy="50" r="5" fill="#3ECF8E" />
              <circle cx="410" cy="40" r="5" fill="#3ECF8E" />
              <circle cx="500" cy="25" r="7" fill="#ffffff" stroke="#3ECF8E" strokeWidth="3" />
            </svg>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#71717a', fontWeight: 600 }}>
            <span>Day 1 (Rank #18)</span>
            <span>Day 10 (Rank #14)</span>
            <span>Day 20 (Rank #8)</span>
            <span>Yesterday (Rank #5)</span>
            <span style={{ color: '#3ECF8E', fontWeight: 800 }}>Today (Rank #4)</span>
          </div>
        </div>

        {/* 16-Agent Impact Distribution Donut/Pie Chart */}
        <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <PieChart size={18} color="#8b5cf6" />
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', margin: 0 }}>
              Ranking Gain Contribution
            </h3>
          </div>

          {/* Impact Distribution Bars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '6px' }}>
            {[
              { agent: '🧲 Backlink & Outreach Agent', percent: 28, color: '#8b5cf6' },
              { agent: '🤖 AEO & GEO Citation Agent', percent: 24, color: '#10b981' },
              { agent: '📜 Deep RAG Schema Engineer', percent: 18, color: '#6366f1' },
              { agent: '⚡ Content Freshness Agent', percent: 16, color: '#f43f5e' },
              { agent: '🏆 Share of Model (SoM) Agent', percent: 14, color: '#f59e0b' },
            ].map((item, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 600 }}>
                  <span style={{ color: '#d4d4d8' }}>{item.agent}</span>
                  <span style={{ color: item.color, fontWeight: 800 }}>{item.percent}% Impact</span>
                </div>
                <div style={{ height: '7px', background: '#121212', borderRadius: '99px', overflow: 'hidden' }}>
                  <div style={{ width: `${item.percent}%`, height: '100%', background: item.color, borderRadius: '99px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 16-Agent Executive Performance & Outcome Table */}
      <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '16px', overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #262626', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Bot size={20} color="#3ECF8E" />
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#fff', margin: 0 }}>
              16-Agent Autonomous Performance & Telemetry Scorecard
            </h3>
          </div>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#3ECF8E', background: 'rgba(62,207,142,0.1)', padding: '4px 12px', borderRadius: '8px', border: '1px solid rgba(62,207,142,0.2)' }}>
            All 16 Agents Operating Autonomously
          </span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#121212', borderBottom: '1px solid #262626', color: '#71717a', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: '14px 24px' }}>Autonomous AI Agent</th>
                <th style={{ padding: '14px 20px' }}>Category</th>
                <th style={{ padding: '14px 20px' }}>30-Day Output Volume</th>
                <th style={{ padding: '14px 20px' }}>Ranking Impact</th>
                <th style={{ padding: '14px 24px' }}>Autopilot Status</th>
              </tr>
            </thead>
            <tbody>
              {AGENT_PERFORMANCE_LIST.map((ag) => (
                <tr key={ag.id} style={{ borderBottom: '1px solid #222', transition: 'background 0.15s ease' }}>
                  <td style={{ padding: '14px 24px', fontWeight: 700, color: '#fff' }}>
                    <span style={{ marginRight: '8px', fontSize: '16px' }}>{ag.avatar}</span>
                    {ag.name}
                  </td>
                  <td style={{ padding: '14px 20px', color: ag.color, fontWeight: 600 }}>
                    {ag.category}
                  </td>
                  <td style={{ padding: '14px 20px', color: '#d4d4d8', fontWeight: 600 }}>
                    {ag.outputs}
                  </td>
                  <td style={{ padding: '14px 20px', color: '#3ECF8E', fontWeight: 800 }}>
                    {ag.impact}
                  </td>
                  <td style={{ padding: '14px 24px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#3ECF8E', background: 'rgba(62,207,142,0.08)', padding: '3px 10px', borderRadius: '6px', border: '1px solid rgba(62,207,142,0.2)' }}>
                      {ag.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
