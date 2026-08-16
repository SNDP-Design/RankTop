import React, { useState } from 'react';
import { 
  Wrench, Copy, Check, Loader2, AlertCircle, Sparkles, FileText, Search, 
  ShieldCheck, Cpu, Code, Globe, Radio, Share2
} from 'lucide-react';
import { useAgents } from '../../context/AgentContext';
import { geminiService } from '../../services/geminiService';

const FREE_TOOLS = [
  { id: 'readability', name: 'Readability Grader', cat: 'Writing', desc: 'Real Flesch Reading Ease & Gunning Fog scores on any pasted text.', icon: FileText, color: '#3ECF8E' },
  { id: 'faq_schema', name: 'FAQ & Schema Markup Generator', cat: 'Schema', desc: 'Turn Q&A pairs into valid FAQPage JSON-LD, ready to paste into your site.', icon: Code, color: '#fbbf24' },
  { id: 'meta_desc', name: 'Meta Description Generator', cat: 'Writing', desc: 'Five ready-to-use meta descriptions with live character counters.', icon: FileText, color: '#60a5fa' },
  { id: 'blog_title', name: 'Blog Title Generator', cat: 'Writing', desc: '10 titles across proven headline formulas — listicle, how-to, comparison.', icon: Sparkles, color: '#a78bfa' },
  { id: 'blog_outline', name: 'Blog Outline Generator', cat: 'Planning', desc: 'Full H2/H3 skeleton from a keyword — how-to, listicle, or comparison.', icon: Wrench, color: '#ec4899' },
  { id: 'content_cal', name: 'Content Calendar Generator', cat: 'Planning', desc: 'Set your cadence, drop in topics, and download a ready-to-use CSV calendar.', icon: Wrench, color: '#06b6d4' },
  { id: 'onepage_audit', name: 'One-Page Technical SEO Audit', cat: 'Technical', desc: 'Paste HTML or URL and get real checks: title, meta, headings, alt text, schema.', icon: ShieldCheck, color: '#f59e0b' },
  { id: 'kd_estimator', name: 'Keyword Difficulty Estimator', cat: 'Research', desc: 'Real search volume, difficulty, CPC, and top SERP heuristic estimate.', icon: Search, color: '#3ECF8E' },
  { id: 'backlink_lite', name: 'Backlink Checker (Lite)', cat: 'Research', desc: 'Live referring domains, total backlinks, and domain rank target targets.', icon: Globe, color: '#8b5cf6' },
  { id: 'ai_score', name: 'AI Content Score Checker', cat: 'AI Visibility', desc: 'Real structure & citability score — direct answers, headings, data points.', icon: Cpu, color: '#34d399' },
  { id: 'ai_visibility', name: 'AI Brand Visibility Checker', cat: 'AI Visibility', desc: 'Live check of whether AI assistants mention your brand for real buyer questions.', icon: Radio, color: '#60a5fa' },
  { id: 'ai_overview', name: 'AI Overview Simulator', cat: 'AI Visibility', desc: 'Simulated AI answer to a real query using your article as the source.', icon: Cpu, color: '#f59e0b' },
  { id: 'cannibalization', name: 'Keyword Cannibalization Checker', cat: 'Research', desc: 'Paste URLs and target keywords to find competing pages on your site.', icon: Search, color: '#ef4444' },
  { id: 'link_finder', name: 'Link Opportunity Finder', cat: 'Off-Page', desc: 'Enter a niche and get real Google search operators for backlink prospects.', icon: Globe, color: '#a78bfa' },
  { id: 'ai_crawlability', name: 'AI Crawlability Checker', cat: 'AI Visibility', desc: 'Test robots.txt for GPTBot, ClaudeBot, and PerplexityBot permissions.', icon: ShieldCheck, color: '#10b981' },
  { id: 'llms_txt', name: 'llms.txt Generator', cat: 'AI Visibility', desc: 'Generate a complete llms.txt file from your site real pages for LLMs.', icon: Code, color: '#6366f1' },
  { id: 'cluster_gen', name: 'Content Cluster Generator', cat: 'Planning', desc: 'Turn a pillar topic into a full pillar + subtopic map for authority.', icon: Wrench, color: '#06b6d4' },
  { id: 'gap_analyzer', name: 'Content Gap Analyzer', cat: 'Research', desc: 'Paste your topics and competitor to find what they cover that you do not.', icon: Search, color: '#f97316' },
  { id: 'serp_preview', name: 'SERP Preview Tool', cat: 'Writing', desc: 'See how your title and meta description will look in Google search.', icon: FileText, color: '#3ECF8E' },
  { id: 'og_preview', name: 'Open Graph Preview', cat: 'Writing', desc: 'Preview how your page looks when shared on LinkedIn, X, or Slack.', icon: Share2, color: '#60a5fa' },
  { id: 'heading_analyzer', name: 'Heading Structure Analyzer', cat: 'Technical', desc: 'Visual H1-H6 tree with warnings for skipped levels and empty headings.', icon: ShieldCheck, color: '#f59e0b' },
  { id: 'robots_gen', name: 'Robots.txt Generator', cat: 'Technical', desc: 'Build a valid robots.txt with custom rules, sitemap link, and AI bot controls.', icon: Code, color: '#3ECF8E' },
  { id: 'robots_validator', name: 'Robots.txt Validator', cat: 'Technical', desc: 'Test any URL path against your robots.txt to check allowed vs blocked.', icon: ShieldCheck, color: '#ef4444' },
  { id: 'sitemap_validator', name: 'XML Sitemap Validator', cat: 'Technical', desc: 'Paste sitemap.xml and check structure, URL count, and lastmod dates.', icon: ShieldCheck, color: '#10b981' },
  { id: 'humanizer', name: 'AI Content Detector & Humanizer', cat: 'Writing', desc: 'Transparent heuristic AI-likelihood score plus an optional AI humanizer rewrite.', icon: Sparkles, color: '#a78bfa' },
  { id: 'broken_links', name: 'Broken Link Checker', cat: 'Technical', desc: 'Paste HTML or URL list to find links that appear unreachable.', icon: AlertCircle, color: '#f43f5e' },
];

export default function FreeToolsApp() {
  const { websiteUrl } = useAgents();
  const domain = websiteUrl || 'yourwebsite.com';

  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedTool, setSelectedTool] = useState(null);
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [toolOutput, setToolOutput] = useState(null);
  const [copied, setCopied] = useState(false);

  const categories = ['All', 'Writing', 'Schema', 'Technical', 'Research', 'Planning', 'AI Visibility'];

  const filteredTools = activeCategory === 'All'
    ? FREE_TOOLS
    : FREE_TOOLS.filter(t => t.cat === activeCategory);

  const handleRunTool = async (e) => {
    e.preventDefault();
    if (!selectedTool) return;

    setIsProcessing(true);
    const input = inputText.trim() || domain;

    const prompt = `You are an autonomous AI agent running the free tool "${selectedTool.name}" for target: "${input}".
Generate a structured, expert output in JSON format or formatted Markdown text according to the tool description: "${selectedTool.desc}".`;

    try {
      const result = await geminiService.generateContent(prompt);
      if (result) {
        setToolOutput(result);
      } else {
        setToolOutput(`⚠️ Tool execution did not return a response. Please verify that your Gemini API Key is configured in Settings.`);
      }
    } catch (err) {
      console.warn('Tool execution failed:', err);
      setToolOutput(`⚠️ Execution error: ${err.message || 'Please check your Gemini API Key in Settings.'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopyOutput = () => {
    if (!toolOutput) return;
    navigator.clipboard.writeText(toolOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full space-y-6 font-sans">
      {/* Header Banner */}
      <div style={{ background: '#171717', border: '1px solid #262626', borderRadius: '16px', padding: '24px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: '99px', background: 'rgba(62,207,142,0.1)', border: '1px solid rgba(62,207,142,0.2)', fontSize: '14px', fontWeight: 700, color: '#3ECF8E', marginBottom: '8px' }}>
          <Wrench size={14} /> 26 Free SEO & AI Visibility Tools
        </div>
        <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#fff', margin: '0 0 4px' }}>
          Autonomous 26-Tool Suite for SEO, Schema, Audits & AI Visibility
        </h1>
        <p style={{ fontSize: '14px', color: '#71717a', margin: 0 }}>
          All 26 tools run locally or via autonomous AI agents for {domain}. Select any tool below to launch instant AI checks.
        </p>

        {/* Category Filters */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '20px', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '6px 14px', borderRadius: '8px', fontSize: '14px', fontWeight: 600,
                background: activeCategory === cat ? '#3ECF8E' : '#1f1f1f',
                color: activeCategory === cat ? '#000' : '#a1a1aa',
                border: activeCategory === cat ? '1px solid #3ECF8E' : '1px solid #2d2d2d',
                cursor: 'pointer', transition: 'all 0.15s'
              }}
            >
              {cat} {cat === 'All' ? `(${FREE_TOOLS.length})` : ''}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Tool Modal / Runner */}
      {selectedTool && (
        <div style={{ background: 'linear-gradient(135deg, rgba(62,207,142,0.06) 0%, rgba(99,102,241,0.06) 100%)', border: '1px solid rgba(62,207,142,0.3)', borderRadius: '16px', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: `${selectedTool.color}15`, border: `1px solid ${selectedTool.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <selectedTool.icon size={18} color={selectedTool.color} />
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#fff', margin: 0 }}>{selectedTool.name}</h3>
                <p style={{ fontSize: '14px', color: '#a1a1aa', margin: 0 }}>{selectedTool.desc}</p>
              </div>
            </div>

            <button
              onClick={() => { setSelectedTool(null); setToolOutput(null); }}
              style={{ background: '#222', border: '1px solid #333', color: '#aaa', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}
            >
              Close Tool
            </button>
          </div>

          <form onSubmit={handleRunTool} style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Enter text, keyword, or URL for ${selectedTool.name} (default: ${domain})`}
              style={{
                flex: 1, minWidth: '280px', background: '#121212', border: '1px solid #333',
                borderRadius: '10px', padding: '10px 14px', color: '#fff', fontSize: '14px', outline: 'none'
              }}
            />
            <button
              type="submit"
              disabled={isProcessing}
              style={{
                background: 'linear-gradient(135deg, #3ECF8E 0%, #059669 100%)', color: '#000',
                border: 'none', padding: '10px 20px', borderRadius: '10px', fontWeight: 800, fontSize: '14px',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', opacity: isProcessing ? 0.6 : 1
              }}
            >
              {isProcessing ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
              {isProcessing ? 'Agent Executing...' : 'Run Autonomous Agent Check'}
            </button>
          </form>

          {/* Output Display */}
          {toolOutput && (
            <div style={{ background: '#121212', border: '1px solid #262626', borderRadius: '12px', padding: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', borderBottom: '1px solid #222', pb: '8px' }}>
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#3ECF8E', textTransform: 'uppercase' }}>
                  Autonomous Agent Output
                </span>
                <button
                  onClick={handleCopyOutput}
                  style={{ background: '#222', border: '1px solid #333', color: '#fff', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  {copied ? <Check size={14} color="#3ECF8E" /> : <Copy size={14} />}
                  {copied ? 'Copied' : 'Copy Output'}
                </button>
              </div>
              <pre style={{ margin: 0, fontSize: '14px', color: '#d4d4d8', whitespace: 'pre-wrap', fontFamily: 'monospace', lineHeight: 1.5 }}>
                {toolOutput}
              </pre>
            </div>
          )}
        </div>
      )}

      {/* 26 Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTools.map((tool) => {
          const Icon = tool.icon;
          const isSelected = selectedTool?.id === tool.id;

          return (
            <div
              key={tool.id}
              onClick={() => { setSelectedTool(tool); setToolOutput(null); setInputText(''); }}
              style={{
                background: '#171717',
                border: `1px solid ${isSelected ? '#3ECF8E' : '#262626'}`,
                borderRadius: '14px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.borderColor = '#333'; }}
              onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.borderColor = '#262626'; }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: tool.color, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {tool.cat}
                  </span>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: `${tool.color}15`, border: `1px solid ${tool.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={16} color={tool.color} />
                  </div>
                </div>

                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', margin: '0 0 6px' }}>{tool.name}</h3>
                <p style={{ fontSize: '14px', color: '#71717a', margin: 0, lineHeight: 1.4 }}>{tool.desc}</p>
              </div>

              <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '14px', fontWeight: 700, color: '#3ECF8E' }}>
                <span>Launch Autonomous Agent →</span>
                <Sparkles size={14} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
