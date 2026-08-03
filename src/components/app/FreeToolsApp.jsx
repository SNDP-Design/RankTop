import React, { useState } from 'react';
import { Wrench, Copy, Check, Loader2, AlertCircle } from 'lucide-react';
import { useAgents } from '../../context/AgentContext';

export default function FreeToolsApp() {
  const { agentResults, agentStatus, websiteUrl } = useAgents();
  const data = agentResults.faq;
  const status = agentStatus.faq;
  const domain = websiteUrl || 'your website';
  const [copied, setCopied] = useState(null);

  const faqs = Array.isArray(data) ? data : [];

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const schemaOutput = faqs.length > 0 ? JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((f) => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": { "@type": "Answer", "text": f.answer },
    })),
  }, null, 2) : '';

  return (
    <div className="w-full space-y-6 font-sans">

      {/* Header */}
      <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '16px', padding: '24px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: '99px', background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.2)', fontSize: '13px', fontWeight: 700, color: '#fbbf24', marginBottom: '8px' }}>
          <Wrench size={13} /> Voice & FAQ Generator
        </div>
        <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#fff', margin: '0 0 4px' }}>Voice Search & FAQ Schema Builder</h1>
        <p style={{ fontSize: '14px', color: '#71717a', margin: 0 }}>
          {status === 'done'
            ? `Generated ${faqs.length} FAQ pairs with schema markup for ${domain}.`
            : 'Enter your website URL above to generate FAQ pairs and voice search content.'}
        </p>
      </div>

      {status === 'idle' && (
        <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '16px', padding: '48px', textAlign: 'center' }}>
          <Wrench size={32} color="#fbbf24" style={{ margin: '0 auto 12px' }} />
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', margin: '0 0 8px' }}>FAQ Generator Ready</h3>
          <p style={{ fontSize: '14px', color: '#71717a', margin: 0 }}>Enter your website URL in the top bar to auto-generate FAQ pairs.</p>
        </div>
      )}

      {status === 'running' && (
        <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '16px', padding: '48px', textAlign: 'center' }}>
          <Loader2 size={32} color="#fbbf24" style={{ margin: '0 auto 12px', animation: 'spin 1s linear infinite' }} />
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', margin: '0 0 8px' }}>Generating FAQ pairs for {domain}…</h3>
          <p style={{ fontSize: '14px', color: '#71717a', margin: 0 }}>Crafting voice-optimized Q&A pairs with schema markup.</p>
        </div>
      )}

      {status === 'error' && (
        <div style={{ background: '#171717', border: '1px solid #3f1515', borderRadius: '16px', padding: '32px', textAlign: 'center' }}>
          <AlertCircle size={28} color="#ef4444" style={{ margin: '0 auto 10px' }} />
          <p style={{ fontSize: '14px', color: '#ef4444', margin: 0 }}>FAQ generation failed. Check your Gemini API key.</p>
        </div>
      )}

      {status === 'done' && faqs.length > 0 && (
        <>
          {/* FAQ Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map((faq, i) => (
              <div key={faq.id ?? i} style={{ background: '#171717', border: '1px solid #262626', borderRadius: '14px', overflow: 'hidden' }}>
                <div style={{ padding: '16px 20px', background: '#1a1a1a', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', flex: 1 }}>
                    <span style={{ width: '24px', height: '24px', borderRadius: '6px', background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 800, color: '#fbbf24', flexShrink: 0, marginTop: '1px' }}>Q</span>
                    <p style={{ fontSize: '14px', fontWeight: 700, color: '#fff', margin: 0 }}>{faq.question}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                    <span style={{ padding: '3px 8px', borderRadius: '5px', fontSize: '11px', fontWeight: 700, background: faq.priority === 'High' ? 'rgba(62,207,142,0.1)' : 'rgba(113,113,122,0.1)', border: `1px solid ${faq.priority === 'High' ? 'rgba(62,207,142,0.2)' : 'rgba(113,113,122,0.2)'}`, color: faq.priority === 'High' ? '#3ECF8E' : '#71717a' }}>
                      {faq.priority}
                    </span>
                    <span style={{ padding: '3px 8px', borderRadius: '5px', fontSize: '11px', fontWeight: 700, background: 'rgba(96,165,250,0.1)', border: '1px solid rgba(96,165,250,0.2)', color: '#60a5fa' }}>
                      {faq.schema}
                    </span>
                  </div>
                </div>
                <div style={{ padding: '14px 20px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <span style={{ width: '24px', height: '24px', borderRadius: '6px', background: 'rgba(62,207,142,0.1)', border: '1px solid rgba(62,207,142,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 800, color: '#3ECF8E', flexShrink: 0, marginTop: '1px' }}>A</span>
                  <p style={{ fontSize: '14px', color: '#d4d4d8', margin: 0, lineHeight: 1.6 }}>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>

          {/* JSON-LD Schema Output */}
          <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '16px', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', background: '#1a1a1a', borderBottom: '1px solid #1f1f1f', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#fff', margin: 0 }}>JSON-LD FAQPage Schema — Copy & paste into your &lt;head&gt;</h3>
              <button
                onClick={() => handleCopy(schemaOutput, 'schema')}
                style={{ padding: '7px 14px', background: '#3ECF8E', color: '#000', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
              >
                {copied === 'schema' ? <><Check size={13} /> Copied!</> : <><Copy size={13} /> Copy Schema</>}
              </button>
            </div>
            <pre style={{ margin: 0, padding: '20px', fontSize: '13px', color: '#a1a1aa', overflowX: 'auto', lineHeight: 1.6, fontFamily: 'monospace', background: '#111' }}>
              {schemaOutput}
            </pre>
          </div>
        </>
      )}

    </div>
  );
}
