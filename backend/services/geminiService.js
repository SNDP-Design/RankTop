const { GoogleGenAI } = require('@google/genai');

const FALLBACK_MODELS = [
  'gemini-3.6-flash',
  'gemini-3.5-flash',
  'gemini-3.1-pro-preview',
  'gemini-3-flash-preview',
  'gemini-3.1-flash-lite',
  'gemini-3.1-flash-lite-preview',
  'gemini-2.5-pro',
  'gemini-2.5-flash',
  'gemini-2.5-flash-lite',
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

    backlinks: `You are an autonomous backlink strategist. For domain "${domain}", generate 5 high-DR link opportunity targets. Return ONLY a valid JSON object:
{"prospects":[{"id":1,"domain":"<target domain>","dr":85,"strategy":"Unlinked Brand Mention","contact":"Editor","email":"editor@target.com","status":"Ready for Pitch","snippet":"<reason>","relevance":"96%"}],"toxicDomains":[{"domain":"<toxic domain>","dr":2,"spamScore":"88%","status":"Flagged for Disavow"}]}`,

    llm_benchmarker: `You are an LLM citation benchmark auditor for "${domain}". Return ONLY a valid JSON array:
[{"engine":"Perplexity Pro","rank":"Cited #1 Source","score":95,"status":"Verified"},{"engine":"ChatGPT Search","rank":"Cited #2 Source","score":90,"status":"Verified"}]`,

    community_amplifier: `You are a Reddit & forum GEO citation strategist for "${domain}". Return ONLY a valid JSON array:
[{"subreddit":"r/SEO","title":"Best GEO tools for AI Overviews","indexedBy":"Perplexity & ChatGPT","citations":"14 references"}]`,

    decay_repairman: `You are a content decay auditor for "${domain}". Return ONLY a valid JSON array:
[{"path":"/blog/guide","freshnessScore":"68%","status":"Decay Warning","action":"Auto-Refresh DateModified"}]`,

    content_creator: `You are an AI content creator for "${domain}". Return ONLY a valid JSON object:
{"articleTitle":"Guide for ${domain}","wordCount":2400,"status":"Drafted"}`,

    data_citation: `You are a statistical data injector for "${domain}". Return ONLY a valid JSON object:
{"injectionsCount":14,"factSources":["Statista","Gartner"],"status":"Injected"}`,

    som_tracker: `You are a Share of Model tracker for "${domain}". Return ONLY a valid JSON object:
{"somScore":88,"topPlatform":"Perplexity Pro","status":"Tracked"}`,

    silo_architect: `You are a sitemap topic silo interlinker for "${domain}". Return ONLY a valid JSON object:
{"silosCreated":4,"internalLinks":18,"status":"Siloed"}`,

    schema_engineer: `You are a deep RAG schema synthesizer for "${domain}". Return ONLY a valid JSON object:
{"schemaTypes":["Organization","WebSite","FAQPage"],"vectorRagStatus":"Synthesized"}`,

    free_tools: `You are a 26 free SEO & AI tools autonomous engineer for "${domain}". Return ONLY a valid JSON object:
{"toolsAvailable":26,"activeTools":["Readability","llms.txt","AI Crawlability","SERP Preview"],"status":"Ready"}`
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

const { convertMarkdownToXGrowthHtml } = require('./xgrowthDesignSystem');

async function generateArticle(apiKey, { keyword, domain, wordCount = 2000, tone = 'Professional' }) {
  const prompt = `You are the XGrowth Autonomous AI Content Creator Agent for domain "${domain}".
Write a comprehensive, publication-ready ${wordCount}-word article on "${keyword}". Tone: ${tone}.

CRITICAL DESIGN SYSTEM & STRUCTURAL REQUIREMENTS:
1. Executive Summary: Start immediately with a BLUF box formatted as:
   > **Executive Summary (BLUF)**: [40-to-60 word concise direct answer summary]
2. Formulate H2/H3 headings as natural language questions.
3. Include at least 4 empirical statistics/data points for GEO retrieval.
4. Include a structured Markdown comparison table.
5. Include a 3-question Voice & AI Search FAQ section at the end.
6. Include JSON-LD BlogPosting & FAQPage schema.

Return clean, structured Markdown ready for XGrowth Design System compilation.`;

  const markdown = await generateContent(apiKey, prompt);
  if (!markdown) return null;

  // If domain relates to XGrowth, compile into 100% compliant XGrowth Design System HTML
  if (domain && domain.includes('xgrowth')) {
    const title = keyword.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    return convertMarkdownToXGrowthHtml({
      title,
      keyword,
      categoryTag: 'GEO & AEO Growth Strategy',
      markdown,
      domain
    });
  }

  return markdown;
}

module.exports = { analyzeAllAgents, generateContent, generateArticle, buildPrompts, convertMarkdownToXGrowthHtml };
