export const AGENT_ROLES = {
  ORCHESTRATOR: {
    id: 'orchestrator',
    name: 'Swarm Orchestrator Manager',
    model: 'Gemini 2.5 Pro (ADK)',
    avatar: '👑',
    color: 'from-amber-500 to-brand-500',
    description: 'Coordinates multi-agent swarm DAG workflow, task delegation, and state persistence.'
  },
  RESEARCH: {
    id: 'research',
    name: 'Research & Keyword Strategist',
    model: 'Gemini 2.5 Flash',
    avatar: '🔍',
    color: 'from-blue-500 to-indigo-600',
    description: 'Queries search trends, calculates KD, search intent, and clusters low-competition keywords.'
  },
  COMPETITOR: {
    id: 'competitor',
    name: 'Competitor & Gap Analyst',
    model: 'Gemini 2.5 Flash',
    avatar: '🕵️‍♂️',
    color: 'from-purple-500 to-violet-600',
    description: 'Crawls competitor domains, identifies content gaps, and extracts rival ranking blueprints.'
  },
  WRITER: {
    id: 'writer',
    name: 'Content Creator & Schema Agent',
    model: 'Gemini 2.5 Pro',
    avatar: '✍️',
    color: 'from-brand-500 to-orange-500',
    description: 'Generates 2,000+ word human-quality blog posts with JSON-LD schema & image prompts.'
  },
  AEO: {
    id: 'aeo',
    name: 'AEO & LLM Citation Specialist',
    model: 'Gemini 2.5 Pro',
    avatar: '🤖',
    color: 'from-emerald-500 to-teal-600',
    description: 'Optimizes BLUF formatting and evaluates LLM citation probability for Google AI Overviews.'
  },
  DISPATCHER: {
    id: 'dispatcher',
    name: 'CMS Publishing Dispatcher',
    model: 'Gemini 2.5 Flash',
    avatar: '🚀',
    color: 'from-rose-500 to-pink-600',
    description: 'Dispatches finalized payloads directly to WordPress, Webflow, Shopify, and Ghost REST APIs.'
  }
};
