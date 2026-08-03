import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { geminiService } from '../services/geminiService';

// ─────────────────────────────────────────────────────────────────────────────
// AgentContext — Single source of truth for all Gemini AI agent state.
// All 9 modules read from here. URL submit in Navbar triggers triggerAllAgents().
// ─────────────────────────────────────────────────────────────────────────────

const AgentContext = createContext(null);

export function useAgents() {
  const ctx = useContext(AgentContext);
  if (!ctx) throw new Error('useAgents must be used inside <AgentProvider>');
  return ctx;
}

// Agent IDs — matches sidebar module IDs
const AGENT_IDS = ['dashboard', 'keywords', 'competitors', 'aeo', 'geo', 'faq', 'swarm'];

const initialStatus = () =>
  Object.fromEntries(AGENT_IDS.map((id) => [id, 'idle']));
// status values: 'idle' | 'running' | 'done' | 'error'

// ─── Gemini Prompts ───────────────────────────────────────────────────────────

function buildPrompts(domain) {
  return {
    dashboard: `You are an expert SEO analyst. Analyze the website domain "${domain}" and return ONLY a valid JSON object (no markdown, no code fences) with this exact structure:
{
  "seoScore": <number 0-100>,
  "aeoScore": <number 0-100>,
  "geoScore": <number 0-100>,
  "organicClicks": "<estimated monthly organic clicks, e.g. '2.4K'>",
  "avgPosition": "<estimated avg ranking position, e.g. '14.2'>",
  "indexedPages": "<estimated indexed pages count, e.g. '340'>",
  "topIssues": ["<issue 1>", "<issue 2>", "<issue 3>"],
  "quickWins": ["<win 1>", "<win 2>", "<win 3>"],
  "brandMentionedInAI": <true or false>,
  "summary": "<2-sentence expert summary of their current SEO/AEO/GEO standing>"
}`,

    keywords: `You are an expert keyword strategist. For the domain "${domain}", generate 6 high-opportunity, low-competition keyword clusters. Return ONLY a valid JSON array (no markdown, no code fences):
[
  {
    "id": 1,
    "keyword": "<full keyword phrase>",
    "volume": "<estimated monthly searches, e.g. '14,500/mo'>",
    "kd": <number 1-35>,
    "intent": "<Informational|Commercial|Navigational|Transactional>",
    "opportunity": "<why this is a great target for this domain in one sentence>"
  }
]
Return exactly 6 items.`,

    competitors: `You are a competitive intelligence analyst. For the domain "${domain}", identify 3 likely direct competitors. Return ONLY a valid JSON array (no markdown, no code fences):
[
  {
    "domain": "<competitor domain>",
    "strength": "<their main SEO advantage in one sentence>",
    "topKeywords": ["<keyword 1>", "<keyword 2>", "<keyword 3>"],
    "contentGap": "<specific content topic ${domain} can target that this competitor misses>",
    "threatLevel": "<High|Medium|Low>"
  }
]
Return exactly 3 competitors.`,

    aeo: `You are an AI Overview specialist. For the domain "${domain}", simulate 5 Google AI Overview queries relevant to this business/domain. Return ONLY a valid JSON array (no markdown, no code fences):
[
  {
    "query": "<realistic search query>",
    "citationProbability": <number 0-100>,
    "reason": "<why this domain would or would not be cited>",
    "recommendation": "<specific action to improve citation chance>"
  }
]
Return exactly 5 queries.`,

    geo: `You are a GEO (Generative Engine Optimization) expert. For the domain "${domain}", test its brand and topical visibility across AI answer engines. Return ONLY a valid JSON object (no markdown, no code fences):
{
  "overallGeoScore": <number 0-100>,
  "engines": [
    {
      "name": "Google Gemini",
      "visibility": "<High|Medium|Low|None>",
      "score": <number 0-100>,
      "queriesFound": <number>,
      "topQuery": "<query where domain most likely appears>"
    },
    {
      "name": "ChatGPT",
      "visibility": "<High|Medium|Low|None>",
      "score": <number 0-100>,
      "queriesFound": <number>,
      "topQuery": "<query where domain most likely appears>"
    },
    {
      "name": "Perplexity AI",
      "visibility": "<High|Medium|Low|None>",
      "score": <number 0-100>,
      "queriesFound": <number>,
      "topQuery": "<query where domain most likely appears>"
    }
  ],
  "recommendations": ["<action 1>", "<action 2>", "<action 3>"]
}`,

    faq: `You are a voice search and AEO specialist. For the domain "${domain}", generate 8 FAQ pairs optimized for voice search and AI Overview citations. Return ONLY a valid JSON array (no markdown, no code fences):
[
  {
    "id": 1,
    "question": "<natural language question a user would ask>",
    "answer": "<concise, direct answer in 2-3 sentences that works well for voice and AI citations>",
    "schema": "<speakable|faqPage>",
    "priority": "<High|Medium>"
  }
]
Return exactly 8 items.`,

    swarm: `You are an AI orchestration engine. For the domain "${domain}", provide a high-level autonomous SEO action plan. Return ONLY a valid JSON object (no markdown, no code fences):
{
  "priority1": "<most critical action with specific detail>",
  "priority2": "<second most critical action>",
  "priority3": "<third action>",
  "estimatedImpact": "<estimated traffic improvement in % if all actions are taken>",
  "timeToResults": "<realistic timeframe, e.g. '6-12 weeks'>",
  "agentInsight": "<2-sentence strategic insight from the AI swarm analysis>"
}`,
  };
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AgentProvider({ children }) {
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [agentResults, setAgentResults] = useState({});
  const [agentStatus, setAgentStatus] = useState(initialStatus());
  const [isAnyRunning, setIsAnyRunning] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const abortRef = useRef(false);

  const setOneStatus = useCallback((id, status) => {
    setAgentStatus((prev) => ({ ...prev, [id]: status }));
  }, []);

  const setOneResult = useCallback((id, data) => {
    setAgentResults((prev) => ({ ...prev, [id]: data }));
  }, []);

  // ── Run a single agent safely ────────────────────────────────────────────
  const runAgent = useCallback(
    async (id, prompt) => {
      setOneStatus(id, 'running');
      try {
        const raw = await geminiService.generateContent(prompt);
        if (abortRef.current) return;

        if (raw) {
          // Strip markdown code fences if model wraps output
          const cleaned = raw
            .replace(/^```json\s*/i, '')
            .replace(/^```\s*/i, '')
            .replace(/```\s*$/i, '')
            .trim();

          try {
            const parsed = JSON.parse(cleaned);
            setOneResult(id, parsed);
            setOneStatus(id, 'done');
          } catch {
            // If JSON parse fails, store raw text for display
            setOneResult(id, { _raw: raw });
            setOneStatus(id, 'done');
          }
        } else {
          setOneStatus(id, 'error');
        }
      } catch (err) {
        console.error(`[Agent ${id}] Error:`, err);
        if (!abortRef.current) setOneStatus(id, 'error');
      }
    },
    [setOneStatus, setOneResult]
  );

  // ── Trigger all agents in parallel ──────────────────────────────────────
  const triggerAllAgents = useCallback(
    async (url) => {
      if (!url?.trim()) return;
      if (!geminiService.hasApiKey()) {
        setSettingsOpen(true);
        return;
      }

      const domain = url.replace(/^https?:\/\//, '').replace(/\/$/, '');
      setWebsiteUrl(domain);
      abortRef.current = false;
      setAgentResults({});
      setAgentStatus(initialStatus());
      setIsAnyRunning(true);

      const prompts = buildPrompts(domain);

      // Fire all agents concurrently — each updates independently as it finishes
      const tasks = AGENT_IDS.map((id) => runAgent(id, prompts[id]));

      await Promise.allSettled(tasks);

      if (!abortRef.current) {
        setIsAnyRunning(false);
      }
    },
    [runAgent]
  );

  const value = {
    websiteUrl,
    agentResults,
    agentStatus,
    isAnyRunning,
    settingsOpen,
    setSettingsOpen,
    triggerAllAgents,
    hasApiKey: geminiService.hasApiKey.bind(geminiService),
    saveApiKey: (key) => {
      geminiService.setApiKey(key);
    },
  };

  return <AgentContext.Provider value={value}>{children}</AgentContext.Provider>;
}
