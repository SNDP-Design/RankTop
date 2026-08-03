import React, { useState, useEffect } from 'react';
import { X, Key, ExternalLink, CheckCircle, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useAgents } from '../context/AgentContext';
import { geminiService } from '../services/geminiService';

export default function ApiKeyModal() {
  const { settingsOpen, setSettingsOpen, saveApiKey } = useAgents();
  const [inputKey, setInputKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [saved, setSaved] = useState(false);
  const [hasExisting, setHasExisting] = useState(false);

  useEffect(() => {
    const existing = localStorage.getItem('GEMINI_API_KEY');
    setHasExisting(Boolean(existing));
    if (existing) setInputKey(existing);
  }, [settingsOpen]);

  if (!settingsOpen) return null;

  const handleSave = () => {
    if (!inputKey.trim()) return;
    saveApiKey(inputKey.trim());
    setHasExisting(true);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setSettingsOpen(false);
    }, 1200);
  };

  const handleClear = () => {
    saveApiKey('');
    setInputKey('');
    setHasExisting(false);
  };

  return (
    /* Backdrop */
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) setSettingsOpen(false); }}
    >
      {/* Modal Card */}
      <div
        style={{
          background: '#171717',
          border: '1px solid #2d2d2d',
          borderRadius: '20px',
          width: '100%',
          maxWidth: '480px',
          padding: '32px',
          boxShadow: '0 32px 64px rgba(0,0,0,0.6)',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '10px',
                background: 'rgba(62,207,142,0.1)', border: '1px solid rgba(62,207,142,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Key size={16} color="#3ECF8E" />
              </div>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#fff', margin: 0 }}>
                Gemini API Key
              </h2>
            </div>
            <p style={{ fontSize: '14px', color: '#71717a', margin: 0 }}>
              Required to activate all AI agents.
            </p>
          </div>
          <button
            onClick={() => setSettingsOpen(false)}
            style={{
              background: '#1f1f1f', border: '1px solid #2d2d2d',
              borderRadius: '8px', padding: '6px', cursor: 'pointer',
              color: '#71717a', display: 'flex', alignItems: 'center',
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Status Badge */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: '10px 14px', borderRadius: '10px', marginBottom: '20px',
          background: hasExisting ? 'rgba(62,207,142,0.08)' : 'rgba(234,179,8,0.08)',
          border: `1px solid ${hasExisting ? 'rgba(62,207,142,0.2)' : 'rgba(234,179,8,0.2)'}`,
        }}>
          {hasExisting
            ? <CheckCircle size={15} color="#3ECF8E" />
            : <AlertCircle size={15} color="#eab308" />
          }
          <span style={{ fontSize: '14px', fontWeight: 600, color: hasExisting ? '#3ECF8E' : '#eab308' }}>
            {hasExisting ? 'API Key Active — Agents Ready' : 'No API Key — Agents Inactive'}
          </span>
        </div>

        {/* Input */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#d4d4d8', marginBottom: '8px' }}>
            Your Gemini API Key
          </label>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: '#121212', border: '1px solid #2d2d2d',
            borderRadius: '12px', padding: '0 12px',
          }}>
            <input
              type={showKey ? 'text' : 'password'}
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
              placeholder="AIza..."
              style={{
                flex: 1, background: 'transparent', border: 'none', outline: 'none',
                fontSize: '14px', color: '#e4e4e7', padding: '12px 0',
                fontFamily: 'monospace',
              }}
            />
            <button
              onClick={() => setShowKey((v) => !v)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#52525b', padding: '4px', display: 'flex' }}
            >
              {showKey ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
        </div>

        {/* Get Key Link */}
        <a
          href="https://aistudio.google.com/apikey"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            fontSize: '13px', color: '#3ECF8E', textDecoration: 'none',
            fontWeight: 600, marginBottom: '24px',
          }}
        >
          <ExternalLink size={13} />
          Get your free key at aistudio.google.com/apikey
        </a>

        {/* Info Note */}
        <div style={{
          background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '10px',
          padding: '12px 14px', marginBottom: '24px',
          fontSize: '13px', color: '#71717a', lineHeight: 1.6,
        }}>
          🔒 Your key is stored <strong style={{ color: '#a1a1aa' }}>only in your browser</strong> (localStorage). It is never sent to any server other than Google's own Gemini API.
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleSave}
            disabled={!inputKey.trim() || saved}
            style={{
              flex: 1, padding: '12px', borderRadius: '12px', border: 'none', cursor: 'pointer',
              background: saved ? '#166534' : '#3ECF8E',
              color: saved ? '#4ade80' : '#000',
              fontSize: '14px', fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
              transition: 'all 0.15s',
              opacity: !inputKey.trim() ? 0.5 : 1,
            }}
          >
            {saved ? (
              <><CheckCircle size={15} /> Saved!</>
            ) : (
              <><Key size={15} /> Save & Activate Agents</>
            )}
          </button>

          {hasExisting && (
            <button
              onClick={handleClear}
              style={{
                padding: '12px 16px', borderRadius: '12px', cursor: 'pointer',
                background: 'transparent', border: '1px solid #2d2d2d',
                color: '#71717a', fontSize: '14px', fontWeight: 600,
                transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#ef4444'; e.currentTarget.style.borderColor = '#ef4444'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#71717a'; e.currentTarget.style.borderColor = '#2d2d2d'; }}
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
