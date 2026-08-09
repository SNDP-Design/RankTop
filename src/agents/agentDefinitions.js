export const AGENT_ROLES = {
  ORCHESTRATOR: {
    id: 'orchestrator',
    name: 'Swarm Orchestrator Manager',
    model: 'Gemini 3.6 Flash (ADK)',
    avatar: '👑',
    color: 'from-amber-500 to-[#3ECF8E]',
    description: 'Coordinates multi-agent swarm DAG workflow, task delegation, and state persistence.'
  },
  RESEARCH: {
    id: 'research',
    name: 'Research & Keyword Strategist',
    model: 'Gemini 3.6 Flash',
    avatar: '🔍',
    color: 'from-blue-500 to-indigo-600',
    description: 'Queries search trends, calculates KD, search intent, and clusters low-competition keywords.'
  },
  COMPETITOR: {
    id: 'competitor',
    name: 'Competitor & Gap Analyst',
    model: 'Gemini 3.5 Flash',
    avatar: '🕵️‍♂️',
    color: 'from-purple-500 to-violet-600',
    description: 'Crawls competitor domains, identifies content gaps, and extracts rival ranking blueprints.'
  },
  WRITER: {
    id: 'writer',
    name: 'Content Creator & Schema Agent',
    model: 'Gemini 3.1 Pro Preview',
    avatar: '✍️',
    color: 'from-[#3ECF8E] to-emerald-600',
    description: 'Generates 2,000+ word human-quality blog posts with JSON-LD schema & image prompts.'
  },
  AEO: {
    id: 'aeo',
    name: 'AEO & LLM Citation Specialist',
    model: 'Gemini 3.1 Pro Preview',
    avatar: '🤖',
    color: 'from-emerald-500 to-teal-600',
    description: 'Optimizes BLUF formatting and evaluates LLM citation probability for Google AI Overviews.'
  },
  DATA_CITATION: {
    id: 'data_citation',
    name: 'Statistical Data & GEO Injector',
    model: 'Gemini 3.1 Pro Preview',
    avatar: '📈',
    color: 'from-cyan-500 to-blue-600',
    description: 'Injects verified stats, quotes, and research citations to maximize LLM response retrieval rate.'
  },
  ENTITY_GRAPH: {
    id: 'entity_graph',
    name: 'Knowledge Graph & Schema Agent',
    model: 'Gemini 3.6 Flash',
    avatar: '🕸️',
    color: 'from-amber-500 to-orange-600',
    description: 'Links entities to Wikidata/Google Knowledge Graph IDs for semantic authority.'
  },
  LINK_ARCHITECT: {
    id: 'link_architect',
    name: 'Topic Cluster & Internal Link Architect',
    model: 'Gemini 3.6 Flash',
    avatar: '🔗',
    color: 'from-fuchsia-500 to-pink-600',
    description: 'Constructs pillar-cluster link silos and contextual internal anchor text.'
  },
  DISPATCHER: {
    id: 'dispatcher',
    name: 'CMS Publishing Dispatcher',
    model: 'Gemini 3.6 Flash',
    avatar: '🚀',
    color: 'from-rose-500 to-pink-600',
    description: 'Dispatches finalized payloads directly to WordPress, Webflow, Shopify, and Ghost REST APIs.'
  },
  BACKLINKER: {
    id: 'backlinker',
    name: 'Backlink & Off-Page Outreach Agent',
    model: 'Gemini 3.6 Flash',
    avatar: '🧲',
    color: 'from-violet-500 to-indigo-700',
    description: 'Prospects high-DR link opportunities, converts unlinked brand mentions, and crafts personalized outreach campaigns.'
  },
  LLM_BENCHMARKER: {
    id: 'llm_benchmarker',
    name: 'Live LLM Citation & Benchmark Agent',
    model: 'Gemini 3.6 Flash',
    avatar: '📡',
    color: 'from-emerald-400 to-cyan-600',
    description: 'Simulates live LLM search queries (ChatGPT, Perplexity, Gemini, Claude) to measure and maximize citation rank.'
  },
  COMMUNITY_AMPLIFIER: {
    id: 'community_amplifier',
    name: 'Reddit & Forum GEO Citation Agent',
    model: 'Gemini 3.5 Flash',
    avatar: '💬',
    color: 'from-orange-500 to-amber-600',
    description: 'Discovers Reddit & Quora threads indexed in LLM search answers and crafts authentic entity citations.'
  },
  DECAY_REPAIRMAN: {
    id: 'decay_repairman',
    name: 'Content Decay & Freshness Repair Agent',
    model: 'Gemini 3.6 Flash',
    avatar: '⚡',
    color: 'from-amber-400 to-rose-600',
    description: 'Audits traffic velocity, fixes content decay, and auto-injects updated statistics & dateModified schema.'
  },
  SOM_TRACKER: {
    id: 'som_tracker',
    name: 'Share of Model & Brand Recommendation Agent',
    model: 'Gemini 3.6 Flash',
    avatar: '🏆',
    color: 'from-yellow-400 to-amber-600',
    description: 'Tracks Share of Model (SoM) across LLMs when buyers ask commercial recommendations.'
  },
  SILO_ARCHITECT: {
    id: 'silo_architect',
    name: 'Autonomous Topic Silo & Interlinker',
    model: 'Gemini 3.6 Flash',
    avatar: '🏰',
    color: 'from-teal-400 to-emerald-600',
    description: 'Detects orphaned pages and injects contextual internal anchor links to form tight topic silos.'
  },
  SCHEMA_ENGINEER: {
    id: 'schema_engineer',
    name: 'Deep RAG & Multi-Entity Schema Synthesizer',
    model: 'Gemini 3.1 Pro Preview',
    avatar: '📜',
    color: 'from-blue-400 to-indigo-700',
    description: 'Synthesizes nested JSON-LD schema (Speakable, FAQPage, Wikidata @sameAs) engineered for LLM RAG indexing.'
  },
  FREE_TOOLS_ENGINEER: {
    id: 'free_tools_engineer',
    name: '26 Free Tools Autonomous Engineer',
    model: 'Gemini 3.6 Flash',
    avatar: '🛠️',
    color: 'from-amber-400 to-emerald-600',
    description: 'Executes 26 free SEO & AI tools (Readability, llms.txt, AI Crawlability, SERP Preview, robots.txt, Sitemap Validator).'
  }
};

