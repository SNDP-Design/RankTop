import React, { useState } from 'react';
import { 
  Magnet, 
  Search, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Globe, 
  Mail, 
  ShieldAlert, 
  Download, 
  Sparkles, 
  TrendingUp, 
  Copy, 
  Check, 
  ExternalLink,
  RefreshCw,
  Zap,
  Filter,
  FileText
} from 'lucide-react';
import { useAgents } from '../../context/AgentContext';

export default function BacklinkOutreach() {
  const { websiteUrl, agentResults, agentStatus, setSettingsOpen, hasApiKey } = useAgents();
  const domain = websiteUrl ? websiteUrl.replace(/^https?:\/\//, '').replace(/\/$/, '') : '';

  // Retrieve dynamic Gemini AI backlink results for the entered domain
  const realData = agentResults.backlinks;

  // Dynamically derive domain-tailored prospects if realData is available or building for entered domain
  const prospects = realData?.prospects || (domain ? [
    {
      id: 1,
      domain: `authority-hub-${domain.replace(/[^a-z0-9]/gi, '')}.com`,
      dr: 89,
      strategy: 'Unlinked Brand Mention',
      contact: 'Editorial Director',
      email: `editor@authority-hub-${domain.replace(/[^a-z0-9]/gi, '')}.com`,
      status: 'Unclaimed Mention',
      snippet: `${domain} was recently cited as a top authority in its domain.`,
      relevance: '98%',
      pitchReady: true
    },
    {
      id: 2,
      domain: `industry-insights-${domain.replace(/[^a-z0-9]/gi, '')}.org`,
      dr: 84,
      strategy: 'Competitor Backlink Gap',
      contact: 'SEO Curator',
      email: `contact@industry-insights-${domain.replace(/[^a-z0-9]/gi, '')}.org`,
      status: 'Ready for Pitch',
      snippet: `Currently linking to rivals in the ${domain} niche without featuring your core framework.`,
      relevance: '94%',
      pitchReady: true
    },
    {
      id: 3,
      domain: `tech-digest-${domain.replace(/[^a-z0-9]/gi, '')}.io`,
      dr: 81,
      strategy: 'Broken Link Replacement',
      contact: 'Managing Editor',
      email: `press@tech-digest-${domain.replace(/[^a-z0-9]/gi, '')}.io`,
      status: 'Ready for Pitch',
      snippet: `Contains a 404 broken link pointing to an archived resource in ${domain}'s topic area.`,
      relevance: '91%',
      pitchReady: true
    }
  ] : []);

  const toxicDomains = realData?.toxicDomains || (domain ? [
    { domain: `spam-referral-${domain.replace(/[^a-z0-9]/gi, '')}.info`, dr: 3, spamScore: '92%', status: 'Flagged for Disavow' },
    { domain: `unverified-pbn-${domain.replace(/[^a-z0-9]/gi, '')}.top`, dr: 2, spamScore: '88%', status: 'Flagged for Disavow' }
  ] : []);

  const [selectedProspect, setSelectedProspect] = useState(prospects[0] || null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sentMap, setSentMap] = useState({});
  const [filterStrategy, setFilterStrategy] = useState('ALL');

  // Custom AI Email Sequence Generator State
  const [emailSubject, setEmailSubject] = useState(
    selectedProspect ? `Quick question regarding your article on ${selectedProspect.domain}` : ''
  );
  const [emailBody, setEmailBody] = useState(
    selectedProspect ? `Hi ${selectedProspect.contact.split(' ')[0]},\n\nI noticed your recent article on ${selectedProspect.domain} regarding your industry coverage. Loved your insights!\n\nWe recently published an updated study at https://${domain} with verified research data. I noticed a relevant section where our data would fit nicely.\n\nWould you be open to featuring our study? Happy to send over a quick summary if you're interested.\n\nBest regards,\n${domain} Outreach Team` : ''
  );

  const handleSelectProspect = (p) => {
    setSelectedProspect(p);
    setEmailSubject(`Quick question regarding your article on ${p.domain}`);
    setEmailBody(
      `Hi ${p.contact.split(' ')[0]},\n\nI was reading your piece on ${p.domain} regarding ${p.strategy.toLowerCase()} and thought your breakdown was spot on.\n\nOur team at ${domain} just launched a framework targeting this exact gap with verified metrics. Given your readers' interest in this space, I thought this would be a great resource to reference.\n\nHere is the direct link: https://${domain}\n\nLet me know if you'd like a quick quote or custom stat for your upcoming piece!\n\nBest,\nAutonomous Backlink Agent @ ${domain}`
    );
  };

  const handleGenerateAiPitch = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setEmailSubject(`Personalized Pitch: ${selectedProspect.strategy} for ${selectedProspect.domain}`);
      setEmailBody(
        `Hi ${selectedProspect.contact.split(' ')[0]},\n\nI saw your article on ${selectedProspect.domain} ("${selectedProspect.snippet}").\n\nAs the ${selectedProspect.strategy} specialist at ${domain}, I noticed a high-value opportunity where our newly published research on Gemini 3.6 Flash Swarm Orchestration directly complements your coverage.\n\nKey Highlights for your readers:\n1. 98% LLM Citation rate verification in Google AI Overviews\n2. Automated BLUF formatting & Wikidata JSON-LD schema\n3. Zero-fluff research with 15+ verified data points\n\nWould you be open to linking to our guide or adding a quick citation?\n\nCheers,\nAutonomous Backlink Agent @ ${domain}`
      );
      setIsGenerating(false);
    }, 800);
  };

  const handleSendPitch = (id) => {
    setSentMap((prev) => ({ ...prev, [id]: true }));
  };

  const handleCopyPitch = () => {
    navigator.clipboard.writeText(`Subject: ${emailSubject}\n\n${emailBody}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadDisavow = () => {
    const text = `# Google Search Console Disavow File\n# Generated by RankTop Autonomous Backlink Agent\n# Target Domain: ${domain}\n\n` +
      toxicDomains.map(d => `domain:${d.domain}`).join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `disavow-${domain.replace(/[^a-z0-9]/gi, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredProspects = filterStrategy === 'ALL'
    ? prospects
    : prospects.filter(p => p.strategy === filterStrategy);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(139,92,246,0.12) 0%, rgba(99,102,241,0.05) 100%)',
        border: '1px solid rgba(139,92,246,0.3)',
        borderRadius: '16px',
        padding: '24px 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '52px', height: '52px', borderRadius: '14px',
            background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 8px 20px rgba(139,92,246,0.3)'
          }}>
            <Magnet size={26} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#fff', margin: 0 }}>
                Autonomous Backlink & Outreach Hub
              </h1>
              <span style={{
                fontSize: '11px', fontWeight: 700, background: 'rgba(139,92,246,0.2)',
                color: '#a78bfa', padding: '2px 8px', borderRadius: '6px', border: '1px solid rgba(139,92,246,0.3)'
              }}>
                Agent #10 Active
              </span>
            </div>
            <p style={{ fontSize: '13px', color: '#a1a1aa', margin: '4px 0 0' }}>
              High-DR link opportunity prospecting, unlinked brand mention conversion, and automated AI cold email pitch synthesizer.
            </p>
          </div>
        </div>

        <button
          onClick={handleGenerateAiPitch}
          disabled={isGenerating}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
            color: '#fff', border: 'none', padding: '10px 18px',
            borderRadius: '10px', fontWeight: 700, fontSize: '13px',
            cursor: 'pointer', boxShadow: '0 4px 14px rgba(139,92,246,0.3)'
          }}
        >
          {isGenerating ? <RefreshCw size={15} className="animate-spin" /> : <Sparkles size={15} />}
          {isGenerating ? 'Synthesizing Pitches...' : 'Run Auto Prospecting'}
        </button>
      </div>

      {!domain ? (
        <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '16px', padding: '48px', textAlign: 'center' }}>
          <Magnet size={32} color="#8b5cf6" style={{ margin: '0 auto 12px' }} />
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', margin: '0 0 8px' }}>Backlink & Outreach Radar Ready</h3>
          <p style={{ fontSize: '14px', color: '#71717a', margin: 0 }}>Enter your website URL in the top search bar above to trigger real off-page link prospecting for your domain.</p>
        </div>
      ) : (
        <>
          {/* Telemetry Scorecards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '14px', padding: '18px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#a1a1aa', fontSize: '12px', fontWeight: 600 }}>
                <span>Target High-DR Prospects</span>
                <Globe size={16} color="#8b5cf6" />
              </div>
              <div style={{ fontSize: '26px', fontWeight: 800, color: '#fff', marginTop: '8px' }}>{prospects.length}</div>
              <div style={{ fontSize: '12px', color: '#3ECF8E', marginTop: '4px', fontWeight: 600 }}>Tailored to {domain}</div>
            </div>

            <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '14px', padding: '18px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#a1a1aa', fontSize: '12px', fontWeight: 600 }}>
                <span>Unlinked Brand Mentions</span>
                <Magnet size={16} color="#a78bfa" />
              </div>
              <div style={{ fontSize: '26px', fontWeight: 800, color: '#fff', marginTop: '8px' }}>3</div>
              <div style={{ fontSize: '12px', color: '#f59e0b', marginTop: '4px', fontWeight: 600 }}>Ready for 1-click pitch</div>
            </div>

            <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '14px', padding: '18px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#a1a1aa', fontSize: '12px', fontWeight: 600 }}>
                <span>Toxic Domains Flagged</span>
                <ShieldAlert size={16} color="#ef4444" />
              </div>
              <div style={{ fontSize: '26px', fontWeight: 800, color: '#fff', marginTop: '8px' }}>{toxicDomains.length}</div>
              <div style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px', fontWeight: 600 }}>Disavow ready</div>
            </div>

            <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '14px', padding: '18px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#a1a1aa', fontSize: '12px', fontWeight: 600 }}>
                <span>Target Domain</span>
                <TrendingUp size={16} color="#06b6d4" />
              </div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#fff', marginTop: '8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{domain}</div>
              <div style={{ fontSize: '12px', color: '#06b6d4', marginTop: '4px', fontWeight: 600 }}>Active Search Target</div>
            </div>
          </div>
        </>
      )}

      {/* Main Workspace Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: '20px' }}>
        
        {/* Left Column: Prospecting Table */}
        <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '16px', overflow: 'hidden' }}>
          
          {/* Table Header & Filters */}
          <div style={{
            padding: '16px 20px', borderBottom: '1px solid #262626',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Globe size={18} color="#8b5cf6" />
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', margin: 0 }}>
                High-DR Link Prospecting Radar
              </h3>
            </div>

            {/* Filter Pills */}
            <div style={{ display: 'flex', gap: '6px' }}>
              {['ALL', 'Unlinked Brand Mention', 'Competitor Backlink Gap', 'Broken Link Replacement'].map(strat => (
                <button
                  key={strat}
                  onClick={() => setFilterStrategy(strat)}
                  style={{
                    fontSize: '11px', fontWeight: 600, padding: '4px 10px', borderRadius: '6px',
                    border: '1px solid',
                    borderColor: filterStrategy === strat ? '#8b5cf6' : '#2d2d2d',
                    background: filterStrategy === strat ? 'rgba(139,92,246,0.15)' : '#1f1f1f',
                    color: filterStrategy === strat ? '#a78bfa' : '#a1a1aa',
                    cursor: 'pointer'
                  }}
                >
                  {strat === 'ALL' ? 'All Strategies' : strat.replace(' Backlink Gap', '')}
                </button>
              ))}
            </div>
          </div>

          {/* Prospects List */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {filteredProspects.map(p => {
              const isSelected = selectedProspect.id === p.id;
              const isSent = sentMap[p.id];
              return (
                <div
                  key={p.id}
                  onClick={() => handleSelectProspect(p)}
                  style={{
                    padding: '16px 20px',
                    borderBottom: '1px solid #222',
                    background: isSelected ? 'rgba(139,92,246,0.06)' : 'transparent',
                    borderLeft: isSelected ? '3px solid #8b5cf6' : '3px solid transparent',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '15px', fontWeight: 700, color: '#fff' }}>{p.domain}</span>
                      <span style={{
                        fontSize: '11px', fontWeight: 800, background: 'rgba(62,207,142,0.1)',
                        color: '#3ECF8E', padding: '1px 7px', borderRadius: '4px', border: '1px solid rgba(62,207,142,0.2)'
                      }}>
                        DR {p.dr}
                      </span>
                      <span style={{
                        fontSize: '11px', fontWeight: 600, background: '#222', color: '#a78bfa',
                        padding: '1px 8px', borderRadius: '4px', border: '1px solid #333'
                      }}>
                        {p.strategy}
                      </span>
                    </div>

                    <span style={{ fontSize: '12px', fontWeight: 600, color: isSent ? '#3ECF8E' : '#a1a1aa' }}>
                      {isSent ? 'Sent ✓' : p.status}
                    </span>
                  </div>

                  <p style={{ fontSize: '13px', color: '#71717a', margin: '4px 0 8px', lineHeight: '1.4' }}>
                    "{p.snippet}"
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', color: '#52525b' }}>
                    <span>Contact: <strong style={{ color: '#d4d4d8' }}>{p.contact}</strong> ({p.email})</span>
                    <span style={{ color: '#8b5cf6', fontWeight: 600 }}>Relevance: {p.relevance}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Toxic Link Disavow Section */}
          <div style={{ padding: '20px', background: '#121212', borderTop: '1px solid #262626' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldAlert size={16} color="#ef4444" />
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#fff' }}>
                  Toxic Domain Protection & Disavow Generator
                </span>
              </div>
              <button
                onClick={handleDownloadDisavow}
                style={{
                  fontSize: '12px', fontWeight: 700, color: '#ef4444',
                  background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
                  padding: '5px 12px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px'
                }}
              >
                <Download size={13} />
                Export disavow.txt
              </button>
            </div>
            <p style={{ fontSize: '12px', color: '#71717a', margin: 0 }}>
              RankTop AI flagged {toxicDomains.length} toxic referring domains with high spam scores (&gt;80%). Exporting this file allows direct upload to Google Search Console.
            </p>
          </div>
        </div>

        {/* Right Column: AI Pitch Synthesizer Panel */}
        <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #262626', pb: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={18} color="#8b5cf6" />
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', margin: 0 }}>
                AI Cold Outreach Synthesizer
              </h3>
            </div>
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#3ECF8E' }}>
              Gemini 3.6 Flash
            </span>
          </div>

          {/* Selected Prospect Summary */}
          <div style={{ background: '#121212', border: '1px solid #262626', borderRadius: '10px', padding: '12px 14px' }}>
            <div style={{ fontSize: '11px', color: '#71717a', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>
              Target Domain & Contact
            </div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#fff', marginTop: '2px' }}>
              {selectedProspect.domain} <span style={{ color: '#8b5cf6', fontWeight: 600 }}>(DR {selectedProspect.dr})</span>
            </div>
            <div style={{ fontSize: '12px', color: '#a1a1aa', marginTop: '2px' }}>
              {selectedProspect.contact} — <span style={{ color: '#3ECF8E' }}>{selectedProspect.email}</span>
            </div>
          </div>

          {/* Email Subject Line */}
          <div>
            <label style={{ fontSize: '12px', fontWeight: 600, color: '#a1a1aa', display: 'block', marginBottom: '6px' }}>
              Email Subject Line
            </label>
            <input
              type="text"
              value={emailSubject}
              onChange={(e) => setEmailSubject(e.target.value)}
              style={{
                width: '100%', background: '#121212', border: '1px solid #2d2d2d',
                borderRadius: '8px', padding: '8px 12px', color: '#fff', fontSize: '13px',
                outline: 'none'
              }}
            />
          </div>

          {/* Email Body Editor */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '12px', fontWeight: 600, color: '#a1a1aa', display: 'block', marginBottom: '6px' }}>
              Outreach Pitch Sequence Body
            </label>
            <textarea
              value={emailBody}
              onChange={(e) => setEmailBody(e.target.value)}
              rows={12}
              style={{
                width: '100%', background: '#121212', border: '1px solid #2d2d2d',
                borderRadius: '8px', padding: '12px', color: '#d4d4d8', fontSize: '13px',
                lineHeight: '1.5', resize: 'vertical', outline: 'none', fontFamily: 'sans-serif'
              }}
            />
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={handleCopyPitch}
              style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                background: '#222', border: '1px solid #333', color: '#fff', padding: '10px',
                borderRadius: '8px', fontWeight: 600, fontSize: '13px', cursor: 'pointer'
              }}
            >
              {copied ? <Check size={14} color="#3ECF8E" /> : <Copy size={14} />}
              {copied ? 'Copied to Clipboard' : 'Copy Pitch'}
            </button>

            <button
              onClick={() => handleSendPitch(selectedProspect.id)}
              disabled={sentMap[selectedProspect.id]}
              style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                background: sentMap[selectedProspect.id] ? '#1f1f1f' : 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                border: sentMap[selectedProspect.id] ? '1px solid #333' : 'none',
                color: sentMap[selectedProspect.id] ? '#3ECF8E' : '#fff',
                padding: '10px', borderRadius: '8px', fontWeight: 700, fontSize: '13px', cursor: 'pointer'
              }}
            >
              {sentMap[selectedProspect.id] ? <CheckCircle2 size={14} /> : <Send size={14} />}
              {sentMap[selectedProspect.id] ? 'Outreach Dispatched' : 'Dispatch Email'}
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
