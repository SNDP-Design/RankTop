import React, { useState } from 'react';
import { Target, Sparkles, Loader2 } from 'lucide-react';
import { useAgents } from '../../context/AgentContext';
import { geminiService } from '../../services/geminiService';

export default function KeywordStrategy({ onGenerateArticle }) {
  const { agentResults, agentStatus, websiteUrl } = useAgents();
  const data = agentResults.keywords;
  const status = agentStatus.keywords;

  // Manual keyword search (on-demand, separate from auto-agent)
  const [seedKeyword, setSeedKeyword] = useState('');
  const [isManualSearching, setIsManualSearching] = useState(false);
  const [manualResults, setManualResults] = useState([]);

  const domain = websiteUrl || 'your website';

  const handleManualSearch = async (e) => {
    e.preventDefault();
    if (!seedKeyword.trim()) return;
    setIsManualSearching(true);
    const prompt = `You are an expert keyword strategist. For the seed topic "${seedKeyword}" and domain "${domain}", generate 6 low-competition keyword clusters. Return ONLY a valid JSON array:
[{"id":1,"keyword":"<phrase>","volume":"<e.g. 14,500/mo>","kd":<1-35>,"intent":"<Informational|Commercial|Navigational|Transactional>","opportunity":"<one sentence>"}]
Return exactly 6 items.`;
    try {
      const raw = await geminiService.generateContent(prompt);
      if (raw) {
        const jsonMatch = raw.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          setManualResults(JSON.parse(jsonMatch[0]));
          setIsManualSearching(false);
          return;
        }
      }
    } catch (err) {
      console.warn('Keyword search failed:', err);
    }
    setIsManualSearching(false);
  };

  // Decide which dataset to show: auto-agent results take priority
  const clusters = Array.isArray(data) ? data : Array.isArray(manualResults) ? manualResults : [];

  return (
    <div className="w-full space-y-6 font-sans">

      {/* Header */}
      <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '16px', padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: '99px', background: 'rgba(62,207,142,0.1)', border: '1px solid rgba(62,207,142,0.2)', fontSize: '13px', fontWeight: 700, color: '#3ECF8E' }}>
            <Target size={13} /> Keyword Strategy
          </div>
          {status === 'done' && <span style={{ fontSize: '13px', color: '#3ECF8E', fontWeight: 600 }}>✓ AI Analysis Complete</span>}
        </div>
        <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#fff', margin: '0 0 4px' }}>Low-Difficulty Keyword Discovery</h1>
        <p style={{ fontSize: '14px', color: '#71717a', margin: 0 }}>
          {status === 'done'
            ? `Gemini found ${clusters.length} keyword opportunities for ${domain}.`
            : `Enter a topic to discover keywords, or enter your website URL above to auto-generate.`}
        </p>
      </div>

      {/* Manual search bar */}
      <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '16px', padding: '24px' }}>
        <form onSubmit={handleManualSearch} style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            value={seedKeyword}
            onChange={(e) => setSeedKeyword(e.target.value)}
            placeholder="Search any keyword topic (e.g. local SEO for restaurants)"
            style={{
              flex: 1, background: '#121212', border: '1px solid #262626', borderRadius: '12px',
              padding: '10px 16px', fontSize: '14px', color: '#e4e4e7', outline: 'none',
            }}
            onFocus={(e) => { e.target.style.borderColor = '#3ECF8E'; }}
            onBlur={(e) => { e.target.style.borderColor = '#262626'; }}
          />
          <button
            type="submit"
            disabled={isManualSearching || !seedKeyword.trim()}
            style={{
              padding: '10px 20px', background: '#3ECF8E', color: '#000', border: 'none',
              borderRadius: '12px', fontSize: '14px', fontWeight: 700, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0,
              opacity: (!seedKeyword.trim() || isManualSearching) ? 0.5 : 1,
            }}
          >
            {isManualSearching
              ? <><span style={{ width: '14px', height: '14px', border: '2px solid rgba(0,0,0,0.3)', borderTop: '2px solid #000', borderRadius: '50%', animation: 'spin 1s linear infinite', display: 'block' }} /> Searching...</>
              : <><Sparkles size={14} /> Discover Keywords</>
            }
          </button>
        </form>
      </div>

      {/* Results table */}
      <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '16px', overflow: 'hidden' }}>
        {status === 'running' ? (
          <div style={{ padding: '48px', textAlign: 'center' }}>
            <Loader2 size={32} color="#3ECF8E" style={{ margin: '0 auto 12px', animation: 'spin 1s linear infinite' }} />
            <p style={{ fontSize: '14px', color: '#71717a', margin: 0 }}>AI agent is finding keyword opportunities for {domain}…</p>
          </div>
        ) : clusters.length === 0 ? (
          <div style={{ padding: '48px', textAlign: 'center' }}>
            <Target size={32} color="#3ECF8E" style={{ margin: '0 auto 12px' }} />
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', margin: '0 0 8px' }}>No Keywords Yet</h3>
            <p style={{ fontSize: '14px', color: '#71717a', margin: 0 }}>Enter your website URL above, or type a topic in the search bar.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#121212', borderBottom: '1px solid #262626' }}>
                  {['Keyword Cluster', 'Search Volume', 'Difficulty', 'Intent', 'Opportunity', 'Action'].map((h) => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 700, color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {clusters.map((item, i) => (
                  <tr key={item.id ?? i} style={{ borderBottom: '1px solid #1f1f1f', transition: 'background 0.1s' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#1a1a1a'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                  >
                    <td style={{ padding: '14px 16px', fontSize: '14px', fontWeight: 700, color: '#fff', maxWidth: '200px' }}>{item.keyword}</td>
                    <td style={{ padding: '14px 16px', fontSize: '14px', fontWeight: 600, color: '#d4d4d8', whiteSpace: 'nowrap' }}>{item.volume}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{
                        padding: '3px 10px', borderRadius: '6px', fontSize: '13px', fontWeight: 700,
                        background: item.kd <= 20 ? 'rgba(62,207,142,0.1)' : 'rgba(251,191,36,0.1)',
                        border: `1px solid ${item.kd <= 20 ? 'rgba(62,207,142,0.25)' : 'rgba(251,191,36,0.25)'}`,
                        color: item.kd <= 20 ? '#3ECF8E' : '#fbbf24',
                      }}>KD {item.kd}</span>
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: '14px', color: '#a1a1aa' }}>{item.intent}</td>
                    <td style={{ padding: '14px 16px', fontSize: '14px', color: '#a1a1aa', maxWidth: '200px' }}>{item.opportunity}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <button
                        onClick={() => onGenerateArticle && onGenerateArticle(item.keyword)}
                        style={{
                          padding: '7px 14px', background: '#3ECF8E', color: '#000', border: 'none',
                          borderRadius: '8px', fontSize: '13px', fontWeight: 700, cursor: 'pointer',
                          display: 'inline-flex', alignItems: 'center', gap: '5px', whiteSpace: 'nowrap',
                        }}
                      >
                        <Sparkles size={13} /> Write Article
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
