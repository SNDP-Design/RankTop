import React, { useRef } from 'react';
import { 
  LayoutDashboard, 
  Target, 
  FileText, 
  Cpu, 
  Search, 
  Share2, 
  Wrench, 
  ShieldCheck,
  Bot,
  Magnet,
  Radio,
  Zap,
  Code,
  Globe,
  Sparkles,
  Layers
} from 'lucide-react';

// ─── Universal Sidebar Navigation ────────────────────────────────────────────
// Separated into SEO, AEO, and GEO Engine Modules + Core Workspace & Free Tools
// ─────────────────────────────────────────────────────────────────────────────

const NAV_GROUPS = [
  {
    label: 'CORE WORKSPACE',
    badge: 'HQ',
    badgeColor: '#71717a',
    items: [
      { id: 'dashboard',   text: 'Master Dashboard',        Icon: LayoutDashboard },
      { id: 'swarm',       text: 'Autonomous AI Swarm',     Icon: Bot },
    ],
  },
  {
    label: 'SEO MODULE',
    badge: 'SEARCH',
    badgeColor: '#3ECF8E',
    items: [
      { id: 'strategy',    text: 'Keyword Discovery',       Icon: Target },
      { id: 'competitors', text: 'Competitor Intelligence', Icon: Search },
      { id: 'studio',      text: 'AI Content & Schema Studio',Icon: FileText },
      { id: 'backlinks',   text: 'Backlink Outreach Hub',   Icon: Magnet },
      { id: 'cms',         text: 'CMS Auto-Publishing',     Icon: Wrench },
    ],
  },
  {
    label: 'AEO MODULE',
    badge: 'ANSWERS',
    badgeColor: '#60a5fa',
    items: [
      { id: 'aeo',         text: 'AI Overview Simulator',   Icon: Cpu },
      { id: 'aeo_faq',     text: 'Voice Search & FAQ Schema',Icon: Code },
    ],
  },
  {
    label: 'GEO MODULE',
    badge: 'LLM CITATIONS',
    badgeColor: '#a78bfa',
    items: [
      { id: 'geo',         text: 'LLM Visibility & Benchmarks',Icon: Radio },
      { id: 'geo_reddit',  text: 'Reddit & Forum GEO Radar',   Icon: Sparkles },
      { id: 'geo_decay',   text: 'Content Decay & Freshness', Icon: Zap },
    ],
  },
  {
    label: 'UTILITIES',
    badge: '26 TOOLS',
    badgeColor: '#fbbf24',
    items: [
      { id: 'freetools',   text: '26 Free SEO & AI Tools',  Icon: ShieldCheck },
    ],
  },
];

export default function AppSidebar({ activeTab, setActiveTab }) {
  const ref = useRef(null);

  return (
    <>
      {/* ── Sidebar: fixed position, modern dark styled scrollbar ── */}
      <aside
        ref={ref}
        aria-label="Sidebar Navigation"
        style={{
          position:     'fixed',
          top:          '64px',
          left:         0,
          width:        '260px',
          height:       'calc(100vh - 64px)',
          overflowY:    'auto',
          userSelect:   'none',
          zIndex:       40,
          display:      'flex',
          flexDirection:'column',
          background:   '#131313',
          borderRight:  '1px solid #242424',
          scrollbarWidth: 'thin',
          scrollbarColor: '#2a2a2a transparent'
        }}
      >
        {/* ── Navigation groups ── */}
        <div
          style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
          className="py-3 px-3"
        >
          <nav style={{ flex: 1 }}>
            {NAV_GROUPS.map((group) => (
              <div key={group.label} className="mb-4">
                {/* Category Header with Badge */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 10px 6px' }}>
                  <span
                    style={{
                      fontSize:      '11px',
                      fontWeight:    800,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color:         '#71717a',
                    }}
                  >
                    {group.label}
                  </span>
                  <span
                    style={{
                      fontSize:      '9px',
                      fontWeight:    800,
                      padding:       '1px 6px',
                      borderRadius:  '4px',
                      background:    `${group.badgeColor}15`,
                      border:        `1px solid ${group.badgeColor}30`,
                      color:         group.badgeColor,
                      letterSpacing: '0.04em'
                    }}
                  >
                    {group.badge}
                  </span>
                </div>

                {/* Nav items */}
                {group.items.map(({ id, text, Icon }) => {
                  const active = activeTab === id || 
                    (id === 'geo' && activeTab === 'geo') ||
                    (id === 'geo_reddit' && activeTab === 'geo_reddit') ||
                    (id === 'geo_decay' && activeTab === 'geo_decay');

                  return (
                    <button
                      key={id}
                      onClick={() => setActiveTab(id)}
                      aria-current={active ? 'page' : undefined}
                      style={{
                        display:        'flex',
                        alignItems:     'center',
                        gap:            '10px',
                        width:          '100%',
                        padding:        '7px 10px',
                        borderRadius:   '8px',
                        marginBottom:   '2px',
                        fontSize:       '13px',
                        fontWeight:     active ? 700 : 500,
                        color:          active ? '#fff' : '#a1a1aa',
                        background:     active ? 'rgba(62,207,142,0.12)' : 'transparent',
                        border:         active ? '1px solid rgba(62,207,142,0.3)' : '1px solid transparent',
                        cursor:         'pointer',
                        transition:     'all 0.15s ease',
                        textAlign:      'left',
                        outline:        'none',
                      }}
                      onMouseEnter={(e) => {
                        if (!active) {
                          e.currentTarget.style.background = '#1a1a1a';
                          e.currentTarget.style.color      = '#e4e4e7';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!active) {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color      = '#a1a1aa';
                        }
                      }}
                    >
                      {/* Active indicator dot */}
                      <span
                        style={{
                          width:        '4px',
                          height:       '14px',
                          borderRadius: '99px',
                          background:   active ? '#3ECF8E' : 'transparent',
                          flexShrink:   0,
                          transition:   'background 0.15s',
                        }}
                      />
                      <Icon
                        size={15}
                        style={{
                          flexShrink: 0,
                          color:      active ? '#3ECF8E' : '#71717a',
                        }}
                      />
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {text}
                      </span>
                    </button>
                  );
                })}
              </div>
            ))}
          </nav>
        </div>

        {/* ── Footer ── */}
        <div
          style={{
            padding:    '12px 16px',
            borderTop:  '1px solid #222',
            background: '#0e0e0e',
            display:    'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                width:        '8px',
                height:       '8px',
                borderRadius: '50%',
                background:   '#3ECF8E',
                animation:    'pulse 2s infinite',
                flexShrink:   0,
              }}
            />
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#d4d4d8' }}>
              SEO · AEO · GEO Suite
            </span>
          </div>
          <span
            style={{
              fontSize:     '10px',
              fontWeight:   800,
              color:        '#3ECF8E',
              background:   'rgba(62,207,142,0.08)',
              padding:      '2px 6px',
              borderRadius: '4px',
              border:       '1px solid rgba(62,207,142,0.2)',
            }}
          >
            v3.0
          </span>
        </div>
      </aside>

      {/* ── Spacer: pushes <main> content to the right of the fixed sidebar ── */}
      <div style={{ width: '260px', flexShrink: 0 }} aria-hidden="true" />
    </>
  );
}
