import React, { useState } from 'react';
import { 
  Magnet, 
  Send, 
  Globe, 
  ShieldAlert, 
  Download, 
  Sparkles, 
  Copy, 
  Check, 
  RefreshCw,
  Loader2
} from 'lucide-react';
import { useAgents } from '../../context/AgentContext';
import { geminiService } from '../../services/geminiService';

export default function BacklinkOutreach() {
  const { websiteUrl, agentResults, isAnyRunning } = useAgents();
  const domain = websiteUrl ? websiteUrl.replace(/^https?:\/\//, '').replace(/\/$/, '') : '';

  // Retrieve dynamic Gemini AI backlink results for the entered domain
  const realData = agentResults.backlinks;
  const [manualProspects, setManualProspects] = useState([]);
  const [isProspecting, setIsProspecting] = useState(false);

  const prospects = realData?.prospects?.length ? realData.prospects : manualProspects;
  const toxicDomains = realData?.toxicDomains || [];

  const [selectedProspect, setSelectedProspect] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sentMap, setSentMap] = useState({});
  const [filterStrategy, setFilterStrategy] = useState('ALL');

  // Custom AI Email Sequence Generator State
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');

  // Update selected prospect when prospects list changes
  React.useEffect(() => {
    if (prospects.length > 0 && !selectedProspect) {
      handleSelectProspect(prospects[0]);
    }
  }, [prospects]);

  const handleSelectProspect = (p) => {
    setSelectedProspect(p);
    if (p) {
      setEmailSubject(`Quick question regarding your article on ${p.domain}`);
      setEmailBody(
        `Hi ${p.contact?.split(' ')[0] || 'Editor'},\n\nI noticed your recent article on ${p.domain} regarding ${p.strategy || 'industry topics'}.\n\nOur team at https://${domain || 'ourdomain.com'} recently published a comprehensive study on this topic with verified research data. I noticed a relevant section where our data would fit nicely.\n\nWould you be open to featuring our study? Happy to send over a quick summary if you're interested.\n\nBest regards,\n${domain || 'RankTop'} Outreach Team`
      );
    }
  };

  const handleRunProspecting = async () => {
    if (!domain) return;
    setIsProspecting(true);
    const prompt = `You are an expert off-page SEO and backlink outreach agent. For the website domain "${domain}", discover 5 high-DR real-world publication targets in its niche for editorial links and unlinked brand mentions, and 2 low-quality spam domains to disavow.
Return ONLY valid JSON (no markdown fences):
{
  "prospects": [
    {
      "id": 1,
      "domain": "<real high-DR domain in this niche>",
      "dr": <number 65-95>,
      "strategy": "<Unlinked Brand Mention|Competitor Backlink Gap|Broken Link Replacement|Resource Page Feature>",
      "contact": "<contact title or name>",
      "email": "<editorial contact email>",
      "status": "Ready for Pitch",
      "snippet": "<specific reason why ${domain} fits their editorial content>",
      "relevance": "<percentage e.g. '95%'>"
    }
  ],
  "toxicDomains": [
    { "domain": "<low quality spam or scraper domain>", "dr": <number 1-10>, "spamScore": "<e.g. '92%'>", "status": "Flagged for Disavow" }
  ]
}`;

    try {
      const raw = await geminiService.generateContent(prompt);
      if (raw) {
        const jsonMatch = raw.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          if (parsed.prospects) {
            setManualProspects(parsed.prospects);
            if (parsed.prospects[0]) {
              handleSelectProspect(parsed.prospects[0]);
            }
          }
        }
      }
    } catch (err) {
      console.warn('Prospecting failed:', err);
    } finally {
      setIsProspecting(false);
    }
  };

  const handleGenerateAiPitch = async () => {
    if (!selectedProspect || !domain) return;
    setIsGenerating(true);
    const prompt = `You are a high-converting cold email outreach copywriter.
Write a personalized 3-sentence editorial pitch email for domain "${domain}" pitching to "${selectedProspect.domain}" (Contact: ${selectedProspect.contact}, Strategy: ${selectedProspect.strategy}).
Focus on offering high-value data/quotes for their article.
Return ONLY valid JSON (no markdown fences):
{
  "subject": "<compelling non-salesy subject line>",
  "body": "<friendly personalized email body>"
}`;

    try {
      const raw = await geminiService.generateContent(prompt);
      if (raw) {
        const jsonMatch = raw.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          if (parsed.subject && parsed.body) {
            setEmailSubject(parsed.subject);
            setEmailBody(parsed.body);
            setIsGenerating(false);
            return;
          }
        }
      }
    } catch (err) {
      console.warn('AI pitch generation error:', err);
    }
    
    setEmailSubject(`Resource suggestion for ${selectedProspect.domain}`);
    setEmailBody(
      `Hi ${selectedProspect.contact?.split(' ')[0] || 'there'},\n\nI was reading your piece on ${selectedProspect.domain} ("${selectedProspect.snippet || ''}").\n\nWe recently published updated data and benchmarks for ${domain} that directly complement your analysis.\n\nWould you be open to reviewing the data for inclusion in your article?\n\nBest,\n${domain} Editorial Team`
    );
    setIsGenerating(false);
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
    if (!toxicDomains.length) return;
    const text = `# Google Search Console Disavow File\n# Generated for: ${domain}\n\n` +
      toxicDomains.map(d => `domain:${d.domain}`).join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `disavow-${domain ? domain.replace(/[^a-z0-9]/gi, '_') : 'domains'}.txt`;
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
            boxShadow: '0 8px 24px rgba(139,92,246,0.3)', flexShrink: 0
          }}>
            <Magnet size={26} color="#fff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#fff', margin: 0 }}>
                Backlink & Off-Page Outreach Radar
              </h1>
              <span style={{
                fontSize: '14px', fontWeight: 700, background: 'rgba(139,92,246,0.2)',
                color: '#a78bfa', padding: '3px 10px', borderRadius: '6px', border: '1px solid rgba(139,92,246,0.3)'
              }}>
                Agent #10
              </span>
            </div>
            <p style={{ fontSize: '14px', color: '#a1a1aa', margin: '4px 0 0' }}>
              {domain 
                ? `Prospecting high-DR editorial opportunities and toxicity disavow analysis for ${domain}.`
                : 'Enter your website URL above to prospect authority backlink partners.'}
            </p>
          </div>
        </div>

        {domain && (
          <button
            onClick={handleRunProspecting}
            disabled={isProspecting || isAnyRunning}
            style={{
              padding: '10px 20px', background: '#8b5cf6', color: '#fff', border: 'none',
              borderRadius: '10px', fontWeight: 700, fontSize: '14px',
              display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer',
              opacity: (isProspecting || isAnyRunning) ? 0.6 : 1
            }}
          >
            {isProspecting ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
            {isProspecting ? 'Prospecting with AI…' : 'Prospect High-DR Links'}
          </button>
        )}
      </div>

      {/* Empty state if no prospects found */}
      {prospects.length === 0 && !isProspecting && (
        <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '16px', padding: '56px 28px', textAlign: 'center' }}>
          <Magnet size={36} color="#8b5cf6" style={{ margin: '0 auto 16px' }} />
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#fff', margin: '0 0 8px' }}>
            No Backlink Prospects Yet
          </h3>
          <p style={{ fontSize: '14px', color: '#71717a', margin: '0 0 20px', maxWidth: '460px', marginInline: 'auto' }}>
            {domain 
              ? `Click below to run Gemini AI backlink prospecting tailored to ${domain}.`
              : 'Enter your website URL in the top search bar to begin link discovery.'}
          </p>
          {domain && (
            <button
              onClick={handleRunProspecting}
              style={{
                padding: '10px 20px', background: '#8b5cf6', color: '#fff',
                borderRadius: '10px', border: 'none', cursor: 'pointer',
                fontSize: '14px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px'
              }}
            >
              <Sparkles size={16} /> Run Backlink Prospector for {domain}
            </button>
          )}
        </div>
      )}

      {/* Prospect Workspace when data is available */}
      {prospects.length > 0 && (
        <>
          {/* Top Scorecard Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
            <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '12px', padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#a1a1aa', fontSize: '14px', fontWeight: 600 }}>
                <span>Total Prospects</span>
                <Globe size={16} color="#8b5cf6" />
              </div>
              <div style={{ fontSize: '26px', fontWeight: 800, color: '#fff', marginTop: '8px' }}>{prospects.length}</div>
              <div style={{ fontSize: '14px', color: '#3ECF8E', marginTop: '4px', fontWeight: 600 }}>Tailored to {domain}</div>
            </div>

            <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '12px', padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#a1a1aa', fontSize: '14px', fontWeight: 600 }}>
                <span>Average DR Target</span>
                <Sparkles size={16} color="#f59e0b" />
              </div>
              <div style={{ fontSize: '26px', fontWeight: 800, color: '#fff', marginTop: '8px' }}>
                {Math.round(prospects.reduce((acc, p) => acc + (p.dr || 80), 0) / prospects.length)}
              </div>
              <div style={{ fontSize: '14px', color: '#f59e0b', marginTop: '4px', fontWeight: 600 }}>High Authority Domain Rating</div>
            </div>

            <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '12px', padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#a1a1aa', fontSize: '14px', fontWeight: 600 }}>
                <span>Toxic Domains</span>
                <ShieldAlert size={16} color="#ef4444" />
              </div>
              <div style={{ fontSize: '26px', fontWeight: 800, color: '#fff', marginTop: '8px' }}>{toxicDomains.length}</div>
              <div style={{ fontSize: '14px', color: '#ef4444', marginTop: '4px', fontWeight: 600 }}>Disavow ready</div>
            </div>
          </div>

          {/* Main 2-Column Responsive Workspace */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-start">
            
            {/* Left Column: Prospects List */}
            <div className="lg:col-span-7 space-y-4">
              <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '16px', overflow: 'hidden' }}>
                <div style={{ padding: '18px 20px', borderBottom: '1px solid #262626', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', margin: 0 }}>
                    Identified High-DR Link Targets
                  </h3>
                  
                  {/* Strategy Filter Tabs */}
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {['ALL', 'Unlinked Brand Mention', 'Competitor Backlink Gap', 'Broken Link Replacement'].map((st) => (
                      <button
                        key={st}
                        onClick={() => setFilterStrategy(st)}
                        style={{
                          background: filterStrategy === st ? '#8b5cf6' : '#121212',
                          color: filterStrategy === st ? '#fff' : '#a1a1aa',
                          border: `1px solid ${filterStrategy === st ? '#8b5cf6' : '#262626'}`,
                          fontSize: '14px', fontWeight: 600, padding: '4px 10px', borderRadius: '6px',
                          cursor: 'pointer', transition: 'all 0.15s ease'
                        }}
                      >
                        {st === 'ALL' ? 'All Strategies' : st.replace(' Replacement', '').replace(' Mention', '')}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {filteredProspects.map((p) => {
                    const isSelected = selectedProspect?.id === p.id;
                    const isSent = sentMap[p.id];
                    return (
                      <div
                        key={p.id}
                        onClick={() => handleSelectProspect(p)}
                        style={{
                          padding: '16px 20px',
                          borderBottom: '1px solid #222',
                          background: isSelected ? 'rgba(139,92,246,0.08)' : 'transparent',
                          borderLeft: isSelected ? '3px solid #8b5cf6' : '3px solid transparent',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ fontSize: '15px', fontWeight: 700, color: '#fff' }}>{p.domain}</span>
                            <span style={{
                              fontSize: '14px', fontWeight: 800, background: 'rgba(62,207,142,0.1)',
                              color: '#3ECF8E', padding: '1px 8px', borderRadius: '4px', border: '1px solid rgba(62,207,142,0.2)'
                            }}>
                              DR {p.dr}
                            </span>
                          </div>
                          
                          <span style={{
                            fontSize: '14px', fontWeight: 600, color: isSent ? '#3ECF8E' : '#a78bfa',
                            background: isSent ? 'rgba(62,207,142,0.1)' : 'rgba(139,92,246,0.1)',
                            padding: '2px 8px', borderRadius: '4px'
                          }}>
                            {isSent ? 'Sent ✓' : p.strategy}
                          </span>
                        </div>

                        <p style={{ fontSize: '14px', color: '#a1a1aa', margin: '0 0 8px', lineHeight: 1.4 }}>
                          {p.snippet}
                        </p>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '14px', color: '#71717a' }}>
                          <span>Contact: <strong style={{ color: '#d4d4d8' }}>{p.contact}</strong> ({p.email})</span>
                          <span style={{ color: '#3ECF8E', fontWeight: 700 }}>{p.relevance} Relevance</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Toxic Disavow Section */}
              {toxicDomains.length > 0 && (
                <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '16px', padding: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <ShieldAlert size={18} color="#ef4444" />
                      <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', margin: 0 }}>
                        Spam & Toxic Inbound Links ({toxicDomains.length})
                      </h4>
                    </div>
                    <button
                      onClick={handleDownloadDisavow}
                      style={{
                        background: '#262626', border: '1px solid #333', color: '#fff',
                        fontSize: '14px', fontWeight: 700, padding: '4px 10px', borderRadius: '6px',
                        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px'
                      }}
                    >
                      <Download size={13} /> Export Disavow .txt
                    </button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {toxicDomains.map((t, idx) => (
                      <div key={idx} style={{ background: '#121212', border: '1px solid #222', borderRadius: '8px', padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '14px', color: '#ef4444', fontWeight: 600 }}>{t.domain}</span>
                        <div style={{ display: 'flex', gap: '10px', fontSize: '14px', color: '#71717a' }}>
                          <span>DR: {t.dr}</span>
                          <span style={{ color: '#ef4444' }}>Spam Score: {t.spamScore}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: AI Outreach Pitch Generator */}
            <div className="lg:col-span-5 space-y-4">
              <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '16px', padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Sparkles size={18} color="#8b5cf6" />
                    <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', margin: 0 }}>
                      AI Outreach Pitch Generator
                    </h3>
                  </div>
                  <button
                    onClick={handleGenerateAiPitch}
                    disabled={isGenerating || !selectedProspect}
                    style={{
                      background: '#8b5cf6', color: '#fff', border: 'none',
                      fontSize: '14px', fontWeight: 700, padding: '4px 10px', borderRadius: '6px',
                      cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px'
                    }}
                  >
                    {isGenerating ? <Loader2 size={13} className="animate-spin" /> : <RefreshCw size={13} />}
                    {isGenerating ? 'Drafting…' : 'Re-Draft Pitch'}
                  </button>
                </div>

                {selectedProspect ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div>
                      <label style={{ fontSize: '14px', color: '#a1a1aa', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                        Email Subject Line
                      </label>
                      <input
                        type="text"
                        value={emailSubject}
                        onChange={(e) => setEmailSubject(e.target.value)}
                        style={{
                          width: '100%', background: '#121212', border: '1px solid #262626',
                          borderRadius: '8px', padding: '8px 12px', fontSize: '14px', color: '#fff',
                          outline: 'none'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '14px', color: '#a1a1aa', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                        Personalized Outreach Body
                      </label>
                      <textarea
                        rows={10}
                        value={emailBody}
                        onChange={(e) => setEmailBody(e.target.value)}
                        style={{
                          width: '100%', background: '#121212', border: '1px solid #262626',
                          borderRadius: '8px', padding: '10px 12px', fontSize: '14px', color: '#fff',
                          outline: 'none', resize: 'vertical', lineHeight: 1.5
                        }}
                      />
                    </div>

                    <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
                      <button
                        onClick={handleCopyPitch}
                        style={{
                          flex: 1, background: '#262626', border: '1px solid #333', color: '#fff',
                          padding: '8px', borderRadius: '8px', fontSize: '14px', fontWeight: 700,
                          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
                        }}
                      >
                        {copied ? <Check size={14} color="#3ECF8E" /> : <Copy size={14} />}
                        {copied ? 'Copied Pitch' : 'Copy Pitch'}
                      </button>
                      <button
                        onClick={() => handleSendPitch(selectedProspect.id)}
                        style={{
                          flex: 1, background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                          border: 'none', color: '#fff', padding: '8px', borderRadius: '8px',
                          fontSize: '14px', fontWeight: 700, cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
                        }}
                      >
                        <Send size={14} />
                        {sentMap[selectedProspect.id] ? 'Marked Sent ✓' : 'Mark as Sent'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <p style={{ fontSize: '14px', color: '#71717a', margin: 0 }}>Select a prospect from the left to draft an outreach pitch.</p>
                )}
              </div>
            </div>

          </div>
        </>
      )}

    </div>
  );
}
