const { GoogleGenAI } = require('@google/genai');

const FALLBACK_MODELS = [
  'gemini-2.0-flash',
  'gemini-2.5-flash',
  'gemini-1.5-flash',
  'gemini-1.5-pro',
  'gemini-2.5-pro',
];


function buildPrompts(domain) {
  return {
    dashboard: `You are an expert SEO analyst. Analyze the website domain "${domain}" and return ONLY a valid JSON object (no markdown, no code fences):
{"seoScore":<0-100>,"aeoScore":<0-100>,"geoScore":<0-100>,"organicClicks":"<e.g. 2.4K>","avgPosition":"<e.g. 14.2>","indexedPages":"<e.g. 340>","topIssues":["<issue1>","<issue2>","<issue3>"],"quickWins":["<win1>","<win2>","<win3>"],"brandMentionedInAI":<true|false>,"summary":"<2-sentence expert summary>"}`,

    keywords: `You are an expert keyword strategist. For domain "${domain}", generate 6 high-opportunity, low-competition keyword clusters. Return ONLY a valid JSON array:
[{"id":1,"keyword":"<phrase>","volume":"<e.g. 14,500/mo>","kd":<1-35>,"intent":"<Informational|Commercial|Navigational|Transactional>","opportunity":"<one sentence>"}]
Return exactly 6 items.`,

    competitors: `You are a competitive intelligence analyst. For domain "${domain}", identify 3 likely direct competitors. Return ONLY a valid JSON array:
[{"domain":"<competitor domain>","strength":"<main SEO advantage>","topKeywords":["<kw1>","<kw2>","<kw3>"],"contentGap":"<content topic ${domain} can target>","threatLevel":"<High|Medium|Low>"}]
Return exactly 3 competitors.`,

    aeo: `You are an AI Overview specialist. For domain "${domain}", simulate 5 Google AI Overview queries. Return ONLY a valid JSON array:
[{"query":"<realistic query>","citationProbability":<0-100>,"reason":"<why cited or not>","recommendation":"<specific action>"}]
Return exactly 5 queries.`,

    geo: `You are a GEO expert. For domain "${domain}", test LLM visibility. Return ONLY a valid JSON object:
{"overallGeoScore":<0-100>,"engines":[{"name":"Google Gemini","visibility":"<High|Medium|Low|None>","score":<0-100>,"queriesFound":<n>,"topQuery":"<query>"},{"name":"ChatGPT","visibility":"<High|Medium|Low|None>","score":<0-100>,"queriesFound":<n>,"topQuery":"<query>"},{"name":"Perplexity AI","visibility":"<High|Medium|Low|None>","score":<0-100>,"queriesFound":<n>,"topQuery":"<query>"}],"recommendations":["<action1>","<action2>","<action3>"]}`,

    faq: `You are a voice search specialist. For domain "${domain}", generate 8 FAQ pairs. Return ONLY a valid JSON array:
[{"id":1,"question":"<natural language question>","answer":"<concise 2-3 sentence answer>","schema":"<speakable|faqPage>","priority":"<High|Medium>"}]
Return exactly 8 items.`,

    swarm: `You are an AI orchestration engine. For domain "${domain}", provide a strategic action plan. Return ONLY a valid JSON object:
{"priority1":"<most critical action>","priority2":"<second action>","priority3":"<third action>","estimatedImpact":"<traffic % improvement>","timeToResults":"<e.g. 6-12 weeks>","agentInsight":"<2-sentence strategic insight>"}`,
  };
}

async function generateContent(apiKey, prompt) {
  const ai = new GoogleGenAI({ apiKey });
  for (const model of FALLBACK_MODELS) {
    try {
      const response = await ai.models.generateContent({ model, contents: prompt });
      if (response?.text) return response.text;
    } catch (err) {
      console.warn(`[Gemini] Model ${model} failed:`, err?.message);
    }
  }
  return null;
}

function parseJSON(raw) {
  if (!raw) return null;
  const cleaned = raw
    .replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '').trim();
  try { return JSON.parse(cleaned); } catch { return { _raw: raw }; }
}

async function analyzeAllAgents(apiKey, domain) {
  const prompts = buildPrompts(domain);
  const agentIds = Object.keys(prompts);

  const results = {};
  await Promise.allSettled(
    agentIds.map(async (id) => {
      try {
        const raw = await generateContent(apiKey, prompts[id]);
        results[id] = parseJSON(raw);
      } catch (err) {
        console.error(`[Agent ${id}] Error:`, err.message);
        results[id] = null;
      }
    })
  );
  return results;
}

async function generateArticle(apiKey, { keyword, domain, wordCount = 2000, tone = 'Professional' }) {
  const prompt = `Write a comprehensive, publication-ready ${wordCount}-word SEO article on "${keyword}" for domain "${domain}". Tone: ${tone}. Include H2/H3 headings, FAQ section, and JSON-LD BlogPosting schema. Return clean Markdown.`;
  return await generateContent(apiKey, prompt);
}

module.exports = { analyzeAllAgents, generateContent, generateArticle, buildPrompts };
