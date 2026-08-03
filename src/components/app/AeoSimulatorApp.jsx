import React from 'react';
import { Cpu, Loader2, AlertCircle } from 'lucide-react';
import { useAgents } from '../../context/AgentContext';

function ProbabilityBar({ value }) {
  const color = value >= 70 ? '#3ECF8E' : value >= 40 ? '#f59e0b' : '#ef4444';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <div style={{ flex: 1, height: '6px', background: '#1f1f1f', borderRadius: '99px', overflow: 'hidden' }}>
        <div style={{ width: `${value}%`, height: '100%', background: color, borderRadius: '99px', transition: 'width 1s ease' }} />
      </div>
      <span style={{ fontSize: '14px', fontWeight: 700, color, minWidth: '36px', textAlign: 'right' }}>{value}%</span>
    </div>
  );
}

export default function AeoSimulatorApp() {
  const { agentResults, agentStatus, websiteUrl } = useAgents();
  const data = agentResults.aeo;
  const status = agentStatus.aeo;
  const domain = websiteUrl || 'your website';

  return (
    <div className="w-full space-y-6 font-sans">

      {/* Header */}
      <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '16px', padding: '24px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: '99px', background: 'rgba(96,165,250,0.1)', border: '1px solid rgba(96,165,250,0.2)', fontSize: '13px', fontWeight: 700, color: '#60a5fa', marginBottom: '8px' }}>
          <Cpu size={13} /> AI Overview Simulator
        </div>
        <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#fff', margin: '0 0 4px' }}>Google AI Overview Citation Test</h1>
        <p style={{ fontSize: '14px', color: '#71717a', margin: 0 }}>
          {status === 'done'
            ? `Simulated ${Array.isArray(data) ? data.length : 0} AI Overview queries for ${domain}.`
            : 'Enter your website URL above to simulate AI Overview citations.'}
        </p>
      </div>

      {status === 'idle' && (
        <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '16px', padding: '48px', textAlign: 'center' }}>
          <Cpu size={32} color="#60a5fa" style={{ margin: '0 auto 12px' }} />
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', margin: '0 0 8px' }}>AI Overview Analysis Ready</h3>
          <p style={{ fontSize: '14px', color: '#71717a', margin: 0 }}>Enter your website URL in the top bar to activate the AEO Agent.</p>
        </div>
      )}

      {status === 'running' && (
        <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '16px', padding: '48px', textAlign: 'center' }}>
          <Loader2 size={32} color="#60a5fa" style={{ margin: '0 auto 12px', animation: 'spin 1s linear infinite' }} />
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', margin: '0 0 8px' }}>Simulating AI Overview queries for {domain}…</h3>
          <p style={{ fontSize: '14px', color: '#71717a', margin: 0 }}>Testing citation probability across 5 AI Overview scenarios.</p>
        </div>
      )}

      {status === 'error' && (
        <div style={{ background: '#171717', border: '1px solid #3f1515', borderRadius: '16px', padding: '32px', textAlign: 'center' }}>
          <AlertCircle size={28} color="#ef4444" style={{ margin: '0 auto 10px' }} />
          <p style={{ fontSize: '14px', color: '#ef4444', margin: 0 }}>AEO analysis failed. Check your Gemini API key.</p>
        </div>
      )}

      {status === 'done' && Array.isArray(data) && (
        <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '16px', overflow: 'hidden' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid #1f1f1f' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#fff', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              AI Overview Citation Probability
            </h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: '#1f1f1f' }}>
            {data.map((item, i) => (
              <div key={i} style={{ background: '#171717', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '14px', fontWeight: 700, color: '#fff', margin: '0 0 4px' }}>"{item.query}"</p>
                    <p style={{ fontSize: '13px', color: '#71717a', margin: 0 }}>{item.reason}</p>
                  </div>
                </div>
                <ProbabilityBar value={item.citationProbability ?? 0} />
                <div style={{ background: 'rgba(62,207,142,0.06)', border: '1px solid rgba(62,207,142,0.15)', borderRadius: '8px', padding: '10px 14px' }}>
                  <p style={{ fontSize: '13px', color: '#d4d4d8', margin: 0 }}>
                    <span style={{ color: '#3ECF8E', fontWeight: 700 }}>Recommendation: </span>
                    {item.recommendation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
