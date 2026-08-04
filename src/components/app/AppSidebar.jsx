import React, { useEffect, useRef } from 'react';
import { 
  LayoutDashboard, 
  Target, 
  FileText, 
  Cpu, 
  Search, 
  Share2, 
  Wrench, 
  ShieldCheck,
  Bot
} from 'lucide-react';

// ─── Universal Sidebar Navigation ────────────────────────────────────────────
// Mounted ONCE in App.jsx and shared across ALL 9 workspace modules.
// CSS Strategy:
//   - position: fixed → sidebar is fully detached from document flow.
//     Scrolling the right content pane CANNOT drag the sidebar.
//   - overflow: hidden → zero internal scroll bars, ever.
//   - DOM-level wheel + touchmove preventDefault → belt & braces.
// ─────────────────────────────────────────────────────────────────────────────

const NAV_GROUPS = [
  {
    label: 'WORKSPACE',
    items: [
      { id: 'dashboard', text: 'Master Dashboard', Icon: LayoutDashboard },
    ],
  },
];

export default function AppSidebar({ activeTab, setActiveTab }) {
  const ref = useRef(null);

  /* ── Wheel / touch scroll hard-prevention at DOM level ── */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const block = (e) => { e.preventDefault(); e.stopPropagation(); };
    el.addEventListener('wheel',     block, { passive: false });
    el.addEventListener('touchmove', block, { passive: false });
    return () => {
      el.removeEventListener('wheel',     block);
      el.removeEventListener('touchmove', block);
    };
  }, []);

  return (
    <>
      {/* ── Sidebar: fixed position, detached from document scroll ── */}
      <aside
        ref={ref}
        aria-label="Sidebar Navigation"
        style={{
          position:     'fixed',
          top:          '64px',           /* height of Navbar */
          left:         0,
          width:        '256px',
          height:       'calc(100vh - 64px)',
          overflow:     'hidden',
          overflowY:    'hidden',
          touchAction:  'none',
          userSelect:   'none',
          zIndex:       40,
          display:      'flex',
          flexDirection:'column',
          background:   '#141414',
          borderRight:  '1px solid #262626',
        }}
      >
        {/* ── Inner scroll guard ── */}
        <div
          style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
          className="py-4 px-3"
        >
          <nav style={{ flex: 1, overflow: 'hidden' }}>
            {NAV_GROUPS.map((group) => (
              <div key={group.label} className="mb-3">
                {/* Category label */}
                <p
                  style={{
                    fontSize:      '10px',
                    fontWeight:    700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color:         '#52525b',
                    padding:       '4px 12px 6px',
                  }}
                >
                  {group.label}
                </p>

                {/* Nav buttons */}
                {group.items.map(({ id, text, Icon }) => {
                  const active = activeTab === id;
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
                        padding:        '8px 12px',
                        borderRadius:   '10px',
                        marginBottom:   '2px',
                        fontSize:       '14px',
                        fontWeight:     active ? 600 : 500,
                        color:          active ? '#3ECF8E' : '#a1a1aa',
                        background:     active ? '#1f1f1f' : 'transparent',
                        border:         active ? '1px solid #2d2d2d' : '1px solid transparent',
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
                      {/* Active pill */}
                      <span
                        style={{
                          width:        '3px',
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
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#d4d4d8' }}>
              RankTop Engine
            </span>
          </div>
          <span
            style={{
              fontSize:     '11px',
              fontWeight:   700,
              color:        '#3ECF8E',
              background:   'rgba(62,207,142,0.08)',
              padding:      '2px 8px',
              borderRadius: '6px',
              border:       '1px solid rgba(62,207,142,0.2)',
            }}
          >
            v2.5
          </span>
        </div>
      </aside>

      {/* ── Spacer: pushes <main> content to the right of the fixed sidebar ── */}
      <div style={{ width: '256px', flexShrink: 0 }} aria-hidden="true" />
    </>
  );
}
