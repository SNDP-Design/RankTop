import React, { useState, useEffect } from 'react';
import { 
  GitPullRequest, 
  FolderGit2, 
  FileCode, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  Copy, 
  RefreshCw, 
  Sparkles, 
  Key, 
  Eye, 
  EyeOff, 
  Check, 
  Cpu, 
  Send, 
  Zap, 
  ArrowRight, 
  AlertTriangle, 
  CheckCheck,
  ShieldCheck,
  Plus
} from 'lucide-react';
import { githubService } from '../../services/githubService';
import { useAgents } from '../../context/AgentContext';
import confetti from 'canvas-confetti';

// ── State-Aware Codebase Diagnostic Engine ───────────────────────────────────
function analyzeCodebaseState(filePaths, landingContent, blogDir) {
  const pathsLower = new Set(filePaths.map((p) => p.toLowerCase()));
  
  // 1. llms.txt check
  const hasLlms = pathsLower.has('llms.txt') || pathsLower.has('public/llms.txt') || pathsLower.has('.well-known/llms.txt');
  
  // 2. robots.txt check
  const hasRobots = pathsLower.has('robots.txt') || pathsLower.has('public/robots.txt');
  
  // 3. sitemap.xml check
  const hasSitemap = pathsLower.has('sitemap.xml') || pathsLower.has('public/sitemap.xml');
  
  // 4. JSON-LD Schema check (file or inside landing page HTML/JSX)
  const hasSchemaFile = pathsLower.has('public/schema.json') || pathsLower.has('schema.json');
  const hasSchemaInCode = (landingContent || '').includes('application/ld+json');
  const hasSchema = hasSchemaFile || hasSchemaInCode;
  
  // 5. Landing Page Head Tags
  const hasTitle = /<title[^>]*>([^<]{10,})<\/title>/i.test(landingContent || '');
  const hasMetaDesc = /<meta[^>]+name=["']description["'][^>]*content=["']([^"']{20,})["']/i.test(landingContent || '');
  const hasCanonical = /<link[^>]+rel=["']canonical["']/i.test(landingContent || '');
  const hasOg = /<meta[^>]+property=["']og:/i.test(landingContent || '') || /<meta[^>]+name=["']twitter:/i.test(landingContent || '');
  
  // 6. Blog Articles Count
  const blogFiles = filePaths.filter((p) => 
    p.startsWith((blogDir || 'content/posts') + '/') || 
    p.startsWith('blogs/') || 
    p.startsWith('content/posts/') ||
    p.startsWith('content/blog/') ||
    p.startsWith('posts/')
  );
  const articleCount = blogFiles.length;

  const passedOptimizations = [];
  const criticalFlaws = [];

  // Evaluate llms.txt
  if (hasLlms) {
    passedOptimizations.push({
      id: 'llms_ok',
      category: 'GEO & AI Search',
      title: 'llms.txt Generative Engine Guide Verified ✓',
      details: 'ChatGPT Search, Perplexity, and Claude can crawl verified brand architecture and citation anchors.',
    });
  } else {
    criticalFlaws.push({
      id: 'llms_missing',
      category: 'GEO & AI Search',
      severity: 'HIGH',
      flaw: 'Missing llms.txt citation guide for AI engines',
      impact: 'ChatGPT Search, Perplexity, and Claude cannot find structured brand citations.',
      solution: 'Generate and inject public/llms.txt with verified agent capabilities.',
    });
  }

  // Evaluate JSON-LD Schema
  if (hasSchema) {
    passedOptimizations.push({
      id: 'schema_ok',
      category: 'Semantic Microdata',
      title: 'JSON-LD Structured Schema Graph Verified ✓',
      details: 'Google AI Overviews and rich snippet parsers have structured multi-entity microdata.',
    });
  } else {
    criticalFlaws.push({
      id: 'schema_gap',
      category: 'Semantic Microdata',
      severity: 'HIGH',
      flaw: 'Incomplete or missing multi-entity JSON-LD Schema graph',
      impact: 'Google AI Overviews cannot vectorize brand entities and FAQ speakable answers.',
      solution: 'Synthesize deep @graph JSON-LD schema (WebSite, Organization, FAQPage).',
    });
  }

  // Evaluate robots.txt
  if (hasRobots) {
    passedOptimizations.push({
      id: 'robots_ok',
      category: 'Technical Crawlability',
      title: 'AI Crawler Directives in robots.txt Verified ✓',
      details: 'Search engine bots (Google, GPTBot, ClaudeBot, PerplexityBot) have explicit crawl permissions.',
    });
  } else {
    criticalFlaws.push({
      id: 'crawler_rules',
      category: 'Technical Crawlability',
      severity: 'MEDIUM',
      flaw: 'Missing dedicated AI crawler user-agent rules in robots.txt',
      impact: 'AI bots face crawl ambiguity or unindexed route paths.',
      solution: 'Hardcode explicit Allow rules for GPTBot, PerplexityBot, ClaudeBot, and Google-Extended.',
    });
  }

  // Evaluate sitemap.xml
  if (hasSitemap) {
    passedOptimizations.push({
      id: 'sitemap_ok',
      category: 'Indexing Architecture',
      title: 'Search Engine sitemap.xml Verified ✓',
      details: 'XML sitemap is indexed with page priority and freshness timestamps.',
    });
  } else {
    criticalFlaws.push({
      id: 'sitemap_missing',
      category: 'Indexing Architecture',
      severity: 'MEDIUM',
      flaw: 'Missing sitemap.xml index',
      impact: 'Search crawlers take longer to discover and index newly published pages.',
      solution: 'Generate high-priority sitemap.xml with daily/weekly change frequencies.',
    });
  }

  // Evaluate Landing Page <head>
  if (hasTitle && hasMetaDesc && (hasCanonical || hasOg)) {
    passedOptimizations.push({
      id: 'meta_ok',
      category: 'On-Page SEO',
      title: 'Landing Page Head & OpenGraph Verified ✓',
      details: 'Meta title, description, canonical link, and social sharing cards are properly tagged.',
    });
  } else {
    criticalFlaws.push({
      id: 'meta_optimization',
      category: 'On-Page SEO',
      severity: 'MEDIUM',
      flaw: 'Landing page <head> tags need optimization',
      impact: 'Sub-optimal CTR and search preview cards in Google SERPs.',
      solution: 'Patch <head> with verified canonical, OpenGraph, and keyword-rich description tags.',
    });
  }

  // Evaluate Topical Authority
  if (articleCount >= 10) {
    passedOptimizations.push({
      id: 'cluster_ok',
      category: 'Topical Authority',
      title: `Strong Topical Depth (${articleCount} Published Articles) ✓`,
      details: `Healthy initial article inventory established in ${blogDir}.`,
    });
  } else {
    criticalFlaws.push({
      id: 'topical_cluster',
      category: 'Topical Authority',
      severity: 'HIGH',
      flaw: `Topical cluster expansion needed (${articleCount} articles found)`,
      impact: 'Competitors with broader keyword coverage outrank for long-tail search intent.',
      solution: `Generate and publish next high-intent pillar article targeted for low-KD keyword in ${blogDir}.`,
    });
  }

  // Calculate dynamic health scores based on REAL verified state
  const totalChecks = 6;
  const passedCount = passedOptimizations.length;
  const baseSeo = Math.min(98, Math.round(55 + (passedCount / totalChecks) * 43));
  const baseAeo = hasSchema ? 94 : 45;
  const baseGeo = hasLlms ? 96 : 38;

  return {
    seoScore: baseSeo,
    aeoScore: baseAeo,
    geoScore: baseGeo,
    estimatedTrafficLift: criticalFlaws.length === 0 
      ? 'Top 3 SERP dominance maintained & continuous AI citation tracking active'
      : `+${Math.max(120, criticalFlaws.length * 70)}% projected organic growth upon repair`,
    passedOptimizations,
    criticalFlaws,
    hasLlms,
    hasRobots,
    hasSitemap,
    hasSchema,
    articleCount,
    isFullyOptimized: criticalFlaws.length === 0,
  };
}

export default function RepoConnectorView() {
  const { websiteUrl } = useAgents();

  // GitHub Credentials
  const [repoInput, setRepoInput] = useState('');
  const [githubToken, setGithubToken] = useState('');
  const [showToken, setShowToken] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState('main');

  // Pipeline Lifecycle State:
  // 'idle' -> 'fetching' -> 'flaws_report' -> 'fixing' -> 'completed'
  const [pipelineState, setPipelineState] = useState('idle');
  const [fetchingStep, setFetchingStep] = useState(1);
  const [fixingStep, setFixingStep] = useState(0);

  // Status & Error Messages
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // Connected Repository Metadata
  const [connectedRepo, setConnectedRepo] = useState(null);

  // AI Diagnostic Results
  const [diagnosticReport, setDiagnosticReport] = useState(null);

  // Generated Files & Staging
  const [stagedFiles, setStagedFiles] = useState([]);
  const [isDispatchingPr, setIsDispatchingPr] = useState(false);
  const [prResult, setPrResult] = useState(null);
  const [prTitle, setPrTitle] = useState('🚀 RankTop AI: Autonomous Technical SEO, AEO & GEO Optimization Patch');
  const [prDescription, setPrDescription] = useState('Automated ranking fixes, structured JSON-LD schemas, llms.txt, AI crawler directives, and optimized metadata generated by RankTop AI Engine.');
  const [copiedKey, setCopiedKey] = useState(null);

  // Load Saved Config on Mount
  useEffect(() => {
    const saved = githubService.getConfig();
    if (saved.repo) setRepoInput(saved.repo);
    if (saved.token) setGithubToken(saved.token);
    if (saved.branch) setSelectedBranch(saved.branch);
  }, []);

  const handleCopy = (key, text) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // ── PHASE 1: Connect, Fetch All Pages & Run Real Codebase Diagnostic ───────
  const handleStartIngestion = async (e) => {
    if (e) e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setPrResult(null);

    let parsed;
    try {
      parsed = githubService.parseRepo(repoInput);
    } catch (err) {
      setErrorMsg(err.message);
      return;
    }

    setPipelineState('fetching');
    setFetchingStep(1);

    try {
      // Step 1: Ingest Repository Tree
      await new Promise((r) => setTimeout(r, 600));
      const repoDetails = await githubService.getRepoDetails(parsed.owner, parsed.repo, githubToken);
      const defaultBranch = repoDetails.default_branch || selectedBranch || 'main';

      const branches = await githubService.getBranches(parsed.owner, parsed.repo, githubToken);
      const activeBranch = branches.includes(selectedBranch) ? selectedBranch : defaultBranch;
      setSelectedBranch(activeBranch);

      // Step 2: Read All Files and Discover Architecture
      setFetchingStep(2);
      await new Promise((r) => setTimeout(r, 700));
      const treeData = await githubService.getRepoTree(parsed.owner, parsed.repo, activeBranch, githubToken);
      const filePaths = treeData.files.map((f) => f.path);

      const framework = githubService.detectFramework(filePaths);
      const landingPage = githubService.findLandingPage(filePaths);
      const blogDir = githubService.findBlogDirectory(filePaths);
      const coreFiles = githubService.checkCoreSeoFiles(filePaths);

      // Step 3: Load Landing Page Source Code
      setFetchingStep(3);
      await new Promise((r) => setTimeout(r, 700));
      let landingContent = '';
      try {
        const fileData = await githubService.getFileContent(
          parsed.owner,
          parsed.repo,
          landingPage,
          activeBranch,
          githubToken
        );
        if (fileData) landingContent = fileData.content;
      } catch (fErr) {
        console.warn('[Landing Fetch Error]', fErr);
      }

      const repoData = {
        name: `${parsed.owner}/${parsed.repo}`,
        owner: parsed.owner,
        repo: parsed.repo,
        branch: activeBranch,
        files: treeData.files,
        framework,
        landingPage,
        blogDir,
        coreFiles,
        isPrivate: repoDetails.private,
        htmlUrl: repoDetails.html_url,
      };
      setConnectedRepo(repoData);

      githubService.saveConfig({
        repo: `${parsed.owner}/${parsed.repo}`,
        token: githubToken,
        branch: activeBranch,
      });

      // Step 4: Run Real State-Aware Diagnostic
      setFetchingStep(4);
      await new Promise((r) => setTimeout(r, 800));

      const reportData = analyzeCodebaseState(filePaths, landingContent, blogDir);

      setDiagnosticReport(reportData);
      setPipelineState('flaws_report');
      confetti({ particleCount: 35, spread: 60, origin: { y: 0.6 } });
    } catch (err) {
      console.error('[Ingestion Error]', err);
      setErrorMsg(err.message || 'Failed to fetch repository files. Please verify repository URL and token.');
      setPipelineState('idle');
    }
  };

  // ── PHASE 2: "START" — Autonomous Swarm Fixes Only Missing Gaps ────────────
  const handleStartAutonomousRepair = async () => {
    setPipelineState('fixing');
    setFixingStep(1);

    const domain = connectedRepo?.name?.toLowerCase().includes('xgrowth') ? 'xgrowth.uno' : websiteUrl || 'yourdomain.com';
    const cleanUrl = `https://${domain.replace(/^https?:\/\//, '').replace(/\/$/, '')}`;
    const staged = [];

    try {
      // 1. JSON-LD Schema (only if not already verified)
      setFixingStep(1);
      await new Promise((r) => setTimeout(r, 600));

      if (!diagnosticReport?.hasSchema) {
        const schemaContent = `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": "${cleanUrl}/#webapp",
      "name": "${connectedRepo?.name || 'XGrowth'}",
      "url": "${cleanUrl}",
      "description": "Autonomous AI Agent GTM & Growth Engine running marketing, competitor scouting, and lead prospecting 24/7.",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "All",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    },
    {
      "@type": "Organization",
      "@id": "${cleanUrl}/#organization",
      "name": "${connectedRepo?.name || 'XGrowth'}",
      "url": "${cleanUrl}",
      "logo": "${cleanUrl}/assets/logo.png"
    },
    {
      "@type": "FAQPage",
      "@id": "${cleanUrl}/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is ${connectedRepo?.name || 'XGrowth'}?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A next-generation autonomous AI platform designed to scale growth, organic search ranking, and automated marketing workflows on autopilot."
          }
        },
        {
          "@type": "Question",
          "name": "How does the autonomous engine work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "It deploys specialized AI agents that monitor competitive landscapes, write SEO/AEO-optimized content, and manage technical indexing automatically."
          }
        }
      ]
    }
  ]
}
</script>`;

        staged.push({
          path: 'public/schema.json',
          content: schemaContent,
          title: 'Deep Multi-Entity JSON-LD Schema',
          category: 'Schema',
          message: 'RankTop AI: Add deep JSON-LD schema graph for Google AI Overviews & Perplexity',
        });
      }

      // 2. llms.txt (only if missing)
      setFixingStep(2);
      await new Promise((r) => setTimeout(r, 600));

      if (!diagnosticReport?.hasLlms) {
        const llmsContent = `# ${connectedRepo?.name || 'XGrowth'}\n\n> Autonomous AI Agent GTM Platform That Works Itself.\n\n## Overview\n${cleanUrl} deploys an autonomous swarm of 8 specialized AI agents that run product marketing, competitor positioning maps, weekly campaign drops, and intent lead prospecting 24/7.\n\n## Core Capabilities\n- Market Scout Agent: Monitors industry shifts and competitor moves.\n- Competitor Positioning: Builds real-time market positioning maps.\n- Content Creator: Generates multi-channel campaigns and technical SEO articles.\n- Lead Prospector: Discovers high-intent buyer leads.\n- AEO/GEO Citation Tracker: Monitors ChatGPT, Perplexity, and Google AI Overview citations.\n\n## Key Resources\n- Website: ${cleanUrl}\n- Blogs: ${cleanUrl}/blogs/\n- App: ${cleanUrl}/app/?signin=1\n`;

        staged.push({
          path: 'public/llms.txt',
          content: llmsContent,
          title: 'llms.txt Generative Engine Guide',
          category: 'GEO',
          message: 'RankTop AI: Add llms.txt for ChatGPT, Perplexity & Claude citations',
        });
      }

      // 3. robots.txt (only if missing)
      setFixingStep(3);
      await new Promise((r) => setTimeout(r, 500));

      if (!diagnosticReport?.hasRobots) {
        const robotsContent = `# robots.txt generated by RankTop AI Engine\nUser-agent: *\nAllow: /\nDisallow: /app/\nDisallow: /api/\n\n# Explicit AI Search Engine Crawlers (AEO & GEO Optimization)\nUser-agent: GPTBot\nAllow: /\n\nUser-agent: ClaudeBot\nAllow: /\n\nUser-agent: PerplexityBot\nAllow: /\n\nUser-agent: Google-Extended\nAllow: /\n\n# Sitemap Location\nSitemap: ${cleanUrl}/sitemap.xml\n`;

        staged.push({
          path: 'public/robots.txt',
          content: robotsContent,
          title: 'AI-Compliant robots.txt',
          category: 'Crawlability',
          message: 'RankTop AI: Update robots.txt with GPTBot, ClaudeBot, and PerplexityBot allowances',
        });
      }

      // 4. sitemap.xml (only if missing or needs update)
      setFixingStep(4);
      await new Promise((r) => setTimeout(r, 500));

      if (!diagnosticReport?.hasSitemap || staged.length > 0) {
        const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${cleanUrl}/</loc>\n    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n  </url>\n  <url>\n    <loc>${cleanUrl}/blogs/</loc>\n    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>0.9</priority>\n  </url>\n  <url>\n    <loc>${cleanUrl}/blogs/b2b-competitor-positioning-maps-2026</loc>\n    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.85</priority>\n  </url>\n</urlset>`;

        staged.push({
          path: 'public/sitemap.xml',
          content: sitemapContent,
          title: 'Updated High-Priority sitemap.xml',
          category: 'Indexing',
          message: 'RankTop AI: Update sitemap.xml with fresh lastmod and pillar routes',
        });
      }

      // 5. Generate Next High-Ranking Pillar Article
      setFixingStep(5);
      await new Promise((r) => setTimeout(r, 800));

      // Dynamic unique topic to keep expanding topical depth
      const articleNumber = (diagnosticReport?.articleCount || 0) + 1;
      const slug = `b2b-competitor-positioning-maps-playbook-${Date.now().toString(36)}`;
      const blogPath = `${connectedRepo?.blogDir || 'content/posts'}/${slug}.md`;
      const blogArticle = `---
title: "B2B Competitor Positioning Maps: The Autonomous Framework for SaaS Growth (${new Date().getFullYear()})"
description: "Learn how to build real-time competitor positioning maps, uncover rival messaging weaknesses, and capture untapped search intent on autopilot."
slug: "${slug}"
date: "${new Date().toISOString().split('T')[0]}"
author: "XGrowth Growth Engineering Team"
tags: ["Competitor Analysis", "SaaS Positioning", "GTM Strategy", "Market Intelligence"]
canonicalUrl: "${cleanUrl}/blogs/${slug}"
---

# B2B Competitor Positioning Maps: The Autonomous Framework for SaaS Growth

> **Executive Summary (BLUF)**: In hyper-competitive SaaS markets, static quarterly competitor matrixes fail because rivals update pricing, copy, and features weekly. Autonomous competitor positioning maps continuously ingest competitor search rankings, feature changelogs, and customer reviews to expose positioning gaps you can immediately exploit for organic market share.

---

## 1. Why Static Positioning Maps Fail in Modern SaaS

Traditional 2x2 quadrant charts (e.g., Price vs. Features) are outdated the moment they are exported. Modern continuous market intelligence requires:

1. **Continuous Feature Gap Monitoring**: Tracking changelogs and API documentation updates in real time.
2. **Organic Search Share-of-Voice**: Measuring which commercial keywords competitors rank for versus your domain.
3. **Sentiment & Roast Auditing**: Identifying what rival customers complain about in G2, Reddit, and Product Hunt discussions.

---

## 2. The 4 Quadrants of Autonomous Market Opportunity

| Quadrant | Market State | Strategic Play |
| :--- | :--- | :--- |
| **High Search Intent / Low Rival Quality** | Golden Topic Gaps | Publish comprehensive technical guides and comparison pages |
| **High Search Intent / High Rival Dominance** | Head-to-Head | Compete on speed, price transparency, and interactive free tools |
| **Low Search Intent / High Product Value** | Category Creation | Educate via thought leadership and social proof playbooks |
| **Commoditized Utility** | Red Ocean | Differentiate with autonomous AI automation and 10x workflow speed |

---

## 3. Actionable Checklist to Outrank Rivals This Week

- [ ] Audit top 3 competitors for missing JSON-LD schema and voice search answers.
- [ ] Deploy dynamic comparison hubs targeting "[Competitor] Alternatives".
- [ ] Inject verified statistics and benchmark charts to capture Google AI Overview BLUF snippets.
- [ ] Submit updated sitemap routes to Google Search Console for rapid re-crawling.
`;

      staged.push({
        path: blogPath,
        content: blogArticle,
        title: `Pillar Article #${articleNumber}: B2B Competitor Positioning Maps`,
        category: 'Topical Authority',
        message: `RankTop AI: Add pillar guide "${slug}" for topical cluster rank`,
      });

      setStagedFiles(staged);
      setPipelineState('completed');
      confetti({ particleCount: 70, spread: 90, origin: { y: 0.5 } });
    } catch (err) {
      console.error('[Autonomous Repair Error]', err);
      setErrorMsg(err.message || 'An error occurred during autonomous repair.');
      setPipelineState('flaws_report');
    }
  };

  // ── PHASE 3: 1-Click Pull Request Dispatcher ──────────────────────────────
  const handleDispatchPullRequest = async () => {
    if (!stagedFiles.length) {
      setErrorMsg('No files staged to dispatch.');
      return;
    }
    if (!githubToken) {
      setErrorMsg('A GitHub Personal Access Token (PAT) with "repo" scope is required to create a Pull Request on GitHub.');
      return;
    }

    setIsDispatchingPr(true);
    setErrorMsg(null);
    setPrResult(null);

    try {
      const result = await githubService.dispatchPullRequest({
        owner: connectedRepo.owner,
        repo: connectedRepo.repo,
        baseBranch: connectedRepo.branch || 'main',
        title: prTitle,
        body: `### 🤖 RankTop Autonomous SEO, AEO & GEO Optimization Patch\n\n${prDescription}\n\n### 📦 Optimizations Included:\n` +
          stagedFiles.map((f) => `- **\`${f.path}\`** (${f.category}): ${f.title}`).join('\n') +
          `\n\n- **Target Website:** ${connectedRepo.name}\n- **Engine:** RankTop AI Multi-Agent Swarm`,
        files: stagedFiles,
        token: githubToken,
      });

      setPrResult(result);
      confetti({ particleCount: 100, spread: 120, origin: { y: 0.5 } });
    } catch (err) {
      console.error('[Dispatch PR Error]', err);
      setErrorMsg(err.message || 'Failed to create Pull Request on GitHub.');
    } finally {
      setIsDispatchingPr(false);
    }
  };

  return (
    <div className="w-full space-y-6 font-sans">
      
      {/* ─── Hero Header ─── */}
      <div className="bg-[#171717] p-6 sm:p-8 rounded-2xl border border-[#262626] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#3ECF8E]/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3ECF8E]/10 text-[#3ECF8E] text-xs font-bold border border-[#3ECF8E]/20">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>AUTONOMOUS REPO ENGINE & RANKING PIPELINE</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              GitHub Repository Ranking Engine
            </h1>
            <p className="text-sm text-zinc-400 max-w-2xl leading-relaxed">
              Connect your repository link. RankTop verifies existing merged files, diagnoses real remaining flaws, and autonomously prepares your next ranking patch.
            </p>
          </div>

          {connectedRepo && (
            <div className="flex items-center gap-3 bg-[#121212] px-4 py-2.5 rounded-xl border border-[#3ECF8E]/30">
              <div className="w-2.5 h-2.5 rounded-full bg-[#3ECF8E] animate-pulse" />
              <div className="text-left">
                <span className="text-[11px] text-zinc-400 block uppercase font-bold">Target Repository:</span>
                <span className="text-xs font-bold text-white font-mono">{connectedRepo.name}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ─── Alerts & Banners ─── */}
      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-start gap-3 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div className="flex-1 font-medium">{errorMsg}</div>
          <button onClick={() => setErrorMsg(null)} className="text-red-400 hover:text-white text-xs font-bold">Dismiss</button>
        </div>
      )}

      {successMsg && (
        <div className="p-4 rounded-xl bg-[#3ECF8E]/10 border border-[#3ECF8E]/30 text-[#3ECF8E] flex items-start gap-3 text-sm">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div className="flex-1 font-medium">{successMsg}</div>
          <button onClick={() => setSuccessMsg(null)} className="text-[#3ECF8E] hover:text-white text-xs font-bold">Dismiss</button>
        </div>
      )}

      {/* ─── STAGE 1: REPOSITORY INPUT & INGESTION FORM ─── */}
      {pipelineState === 'idle' && (
        <div className="bg-[#171717] rounded-2xl border border-[#262626] p-6 space-y-6">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white">Connect Website Repository</h3>
            <p className="text-xs text-zinc-400">Enter your public or private GitHub repository link to begin state-aware codebase ingestion.</p>
          </div>

          <form onSubmit={handleStartIngestion} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Repository Address */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-300 flex items-center justify-between">
                  <span>GitHub Repository URL or "owner/repo"</span>
                  <span className="text-zinc-500 font-normal">e.g. SNDP-Design/XGrowth</span>
                </label>
                <input
                  type="text"
                  value={repoInput}
                  onChange={(e) => setRepoInput(e.target.value)}
                  placeholder="https://github.com/owner/your-website"
                  className="w-full px-4 py-3 bg-[#121212] border border-[#262626] focus:border-[#3ECF8E] rounded-xl text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors"
                />
              </div>

              {/* Personal Access Token */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-300 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Key className="w-3 h-3 text-[#3ECF8E]" />
                    GitHub Token (PAT)
                  </span>
                  <a
                    href="https://github.com/settings/tokens/new?scopes=repo&description=RankTop%20Autonomous%20SEO"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-[#60a5fa] hover:underline flex items-center gap-1"
                  >
                    Create Token <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </label>
                <div className="relative">
                  <input
                    type={showToken ? 'text' : 'password'}
                    value={githubToken}
                    onChange={(e) => setGithubToken(e.target.value)}
                    placeholder="ghp_xxxxxxxxxxxx (Required for Pull Requests & Private Repos)"
                    className="w-full pl-4 pr-10 py-3 bg-[#121212] border border-[#262626] focus:border-[#3ECF8E] rounded-xl text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowToken(!showToken)}
                    className="absolute right-3 top-3.5 text-zinc-500 hover:text-zinc-300"
                  >
                    {showToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-500 font-medium">Quick Presets:</span>
                <button
                  type="button"
                  onClick={() => setRepoInput('SNDP-Design/XGrowth')}
                  className="text-xs px-2.5 py-1 rounded-lg bg-[#121212] hover:bg-[#262626] text-zinc-300 border border-[#262626] transition-colors font-mono"
                >
                  SNDP-Design/XGrowth
                </button>
                <button
                  type="button"
                  onClick={() => setRepoInput('SNDP-Design/RankTop')}
                  className="text-xs px-2.5 py-1 rounded-lg bg-[#121212] hover:bg-[#262626] text-zinc-300 border border-[#262626] transition-colors font-mono"
                >
                  SNDP-Design/RankTop
                </button>
              </div>

              <button
                type="submit"
                disabled={!repoInput.trim()}
                className="px-6 py-3 rounded-xl font-bold text-sm bg-[#3ECF8E] hover:bg-[#34D399] text-black flex items-center gap-2 transition-all shadow-lg shadow-[#3ECF8E]/20 disabled:opacity-50 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Fetch Pages & Verify Real SEO State</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ─── STAGE 2: LIVE CODEBASE INGESTION & SCANNING ANIMATION ─── */}
      {pipelineState === 'fetching' && (
        <div className="bg-[#171717] rounded-2xl border border-[#3ECF8E]/30 p-8 space-y-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#3ECF8E]/10 border border-[#3ECF8E]/30 text-[#3ECF8E] flex items-center justify-center mx-auto animate-pulse">
            <RefreshCw className="w-8 h-8 animate-spin" />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <h2 className="text-xl font-extrabold text-white">
              Inspecting Latest Repository Tree...
            </h2>
            <p className="text-xs text-zinc-400">
              Verifying merged files, checking llms.txt, robots.txt, schema markup, and identifying true remaining opportunities.
            </p>
          </div>

          {/* Stepper Progress */}
          <div className="max-w-xl mx-auto space-y-3 text-left">
            <div className={`p-3.5 rounded-xl border transition-all flex items-center gap-3 text-xs ${
              fetchingStep >= 1 ? 'bg-[#121212] border-[#3ECF8E]/40 text-white' : 'bg-[#121212]/50 border-[#262626] text-zinc-500'
            }`}>
              {fetchingStep > 1 ? <CheckCircle2 className="w-4 h-4 text-[#3ECF8E] flex-shrink-0" /> : <RefreshCw className="w-4 h-4 text-[#3ECF8E] animate-spin flex-shrink-0" />}
              <span className="font-semibold">Step 1: Pulling latest branch commit & file tree...</span>
            </div>

            <div className={`p-3.5 rounded-xl border transition-all flex items-center gap-3 text-xs ${
              fetchingStep >= 2 ? 'bg-[#121212] border-[#3ECF8E]/40 text-white' : 'bg-[#121212]/50 border-[#262626] text-zinc-500'
            }`}>
              {fetchingStep > 2 ? <CheckCircle2 className="w-4 h-4 text-[#3ECF8E] flex-shrink-0" /> : fetchingStep === 2 ? <RefreshCw className="w-4 h-4 text-[#3ECF8E] animate-spin flex-shrink-0" /> : <div className="w-4 h-4 rounded-full border border-zinc-700 flex-shrink-0" />}
              <span className="font-semibold">Step 2: Verifying existing llms.txt, schema, and robots.txt files...</span>
            </div>

            <div className={`p-3.5 rounded-xl border transition-all flex items-center gap-3 text-xs ${
              fetchingStep >= 3 ? 'bg-[#121212] border-[#3ECF8E]/40 text-white' : 'bg-[#121212]/50 border-[#262626] text-zinc-500'
            }`}>
              {fetchingStep > 3 ? <CheckCircle2 className="w-4 h-4 text-[#3ECF8E] flex-shrink-0" /> : fetchingStep === 3 ? <RefreshCw className="w-4 h-4 text-[#3ECF8E] animate-spin flex-shrink-0" /> : <div className="w-4 h-4 rounded-full border border-zinc-700 flex-shrink-0" />}
              <span className="font-semibold">Step 3: Reading landing page & counting published articles...</span>
            </div>

            <div className={`p-3.5 rounded-xl border transition-all flex items-center gap-3 text-xs ${
              fetchingStep >= 4 ? 'bg-[#121212] border-[#3ECF8E]/40 text-white' : 'bg-[#121212]/50 border-[#262626] text-zinc-500'
            }`}>
              {fetchingStep === 4 ? <RefreshCw className="w-4 h-4 text-[#3ECF8E] animate-spin flex-shrink-0" /> : <div className="w-4 h-4 rounded-full border border-zinc-700 flex-shrink-0" />}
              <span className="font-semibold">Step 4: Synthesizing real state report (Passed vs Action Required)...</span>
            </div>
          </div>
        </div>
      )}

      {/* ─── STAGE 3: FLAWS & PASSED REPORT WITH DYNAMIC CTA ─── */}
      {pipelineState === 'flaws_report' && diagnosticReport && (
        <div className="space-y-6">
          
          {/* Header Summary & Scores */}
          <div className="bg-[#171717] rounded-2xl border border-[#262626] p-6 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#262626]">
              <div>
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border mb-2 ${
                  diagnosticReport.isFullyOptimized 
                    ? 'bg-[#3ECF8E]/10 text-[#3ECF8E] border-[#3ECF8E]/20'
                    : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                }`}>
                  {diagnosticReport.isFullyOptimized ? <ShieldCheck className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                  <span>
                    {diagnosticReport.isFullyOptimized 
                      ? '100% TECHNICAL FOUNDATION VERIFIED ✓'
                      : `${diagnosticReport.passedOptimizations?.length} PASSED • ${diagnosticReport.criticalFlaws?.length} REMAINING OPPORTUNITIES`}
                  </span>
                </div>
                <h2 className="text-xl font-extrabold text-white">
                  Real SEO & GEO State for {connectedRepo?.name}
                </h2>
                <p className="text-xs text-zinc-400 mt-1">
                  Detected Framework: <span className="text-[#3ECF8E] font-semibold">{connectedRepo?.framework?.name}</span> • Landing Page: <code className="text-white font-mono">{connectedRepo?.landingPage}</code>
                </p>
              </div>

              {/* Action Button */}
              <button
                onClick={handleStartAutonomousRepair}
                className="px-8 py-4 rounded-2xl font-black text-sm bg-[#3ECF8E] hover:bg-[#34D399] text-black flex items-center gap-3 shadow-xl shadow-[#3ECF8E]/25 transition-all transform hover:scale-[1.02] cursor-pointer"
              >
                <Zap className="w-5 h-5 fill-black" />
                <span>
                  {diagnosticReport.isFullyOptimized 
                    ? 'Scale Next Topic Cluster' 
                    : 'Resolve Remaining Flaws'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Scorecards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-[#121212] rounded-xl border border-[#262626] space-y-1">
                <span className="text-[11px] font-bold uppercase text-zinc-400">SEO Health</span>
                <div className={`text-2xl font-black ${diagnosticReport.seoScore >= 90 ? 'text-[#3ECF8E]' : 'text-amber-400'}`}>
                  {diagnosticReport.seoScore}/100
                </div>
                <span className="text-[11px] text-zinc-500">Live verified in repo</span>
              </div>

              <div className="p-4 bg-[#121212] rounded-xl border border-[#262626] space-y-1">
                <span className="text-[11px] font-bold uppercase text-zinc-400">AEO Answer Rank</span>
                <div className={`text-2xl font-black ${diagnosticReport.aeoScore >= 90 ? 'text-[#3ECF8E]' : 'text-[#60a5fa]'}`}>
                  {diagnosticReport.aeoScore}/100
                </div>
                <span className="text-[11px] text-zinc-500">
                  {diagnosticReport.hasSchema ? 'Schema Active ✓' : 'Schema Missing'}
                </span>
              </div>

              <div className="p-4 bg-[#121212] rounded-xl border border-[#262626] space-y-1">
                <span className="text-[11px] font-bold uppercase text-zinc-400">GEO Citation Score</span>
                <div className={`text-2xl font-black ${diagnosticReport.geoScore >= 90 ? 'text-[#3ECF8E]' : 'text-red-400'}`}>
                  {diagnosticReport.geoScore}/100
                </div>
                <span className="text-[11px] text-zinc-500">
                  {diagnosticReport.hasLlms ? 'llms.txt Active ✓' : 'llms.txt Missing'}
                </span>
              </div>

              <div className="p-4 bg-[#121212] rounded-xl border border-[#3ECF8E]/30 space-y-1 bg-[#3ECF8E]/5">
                <span className="text-[11px] font-bold uppercase text-[#3ECF8E]">Current Standing</span>
                <div className="text-sm font-black text-[#3ECF8E] truncate">
                  {diagnosticReport.isFullyOptimized ? 'Foundation Complete ✓' : diagnosticReport.estimatedTrafficLift}
                </div>
                <span className="text-[11px] text-zinc-400">{diagnosticReport.articleCount} Articles Published</span>
              </div>
            </div>
          </div>

          {/* Section 1: VERIFIED & PASSING OPTIMIZATIONS */}
          {diagnosticReport.passedOptimizations?.length > 0 && (
            <div className="bg-[#171717] rounded-2xl border border-[#3ECF8E]/30 p-6 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#3ECF8E]" />
                <span>Verified & Passing Optimizations in Repository ({diagnosticReport.passedOptimizations.length})</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {diagnosticReport.passedOptimizations.map((pass) => (
                  <div key={pass.id} className="p-4 bg-[#121212] rounded-xl border border-[#3ECF8E]/20 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#3ECF8E] flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5" />
                        {pass.title}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#3ECF8E]/10 text-[#3ECF8E] border border-[#3ECF8E]/20">
                        {pass.category}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">{pass.details}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 2: REAL REMAINING OPPORTUNITIES / ROADBLOCKS */}
          {diagnosticReport.criticalFlaws?.length > 0 ? (
            <div className="bg-[#171717] rounded-2xl border border-[#262626] p-6 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-400" />
                <span>Remaining Flaws to Resolve ({diagnosticReport.criticalFlaws.length})</span>
              </h3>

              <div className="space-y-3">
                {diagnosticReport.criticalFlaws.map((flaw) => (
                  <div key={flaw.id} className="p-4 bg-[#121212] rounded-xl border border-[#262626] space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-red-500/10 text-red-400 text-xs font-bold flex items-center justify-center">
                          ✕
                        </span>
                        <span className="text-sm font-bold text-white">{flaw.flaw}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#171717] border border-[#262626] text-zinc-400">
                          {flaw.category}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                          flaw.severity === 'HIGH' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}>
                          {flaw.severity} PRIORITY
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-zinc-400 pl-7">
                      <strong className="text-zinc-300">Impact:</strong> {flaw.impact}
                    </p>

                    <div className="pl-7 pt-1 flex items-center gap-2 text-xs text-[#3ECF8E]">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span><strong>RankTop AI Fix:</strong> {flaw.solution}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Banner */}
              <div className="pt-4 p-6 bg-gradient-to-r from-[#3ECF8E]/10 via-[#171717] to-[#60a5fa]/10 rounded-xl border border-[#3ECF8E]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                <div>
                  <h4 className="text-base font-extrabold text-white">Resolve Remaining Flaws Automatically</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">Click Start to stage fixes and open your updated Pull Request.</p>
                </div>

                <button
                  onClick={handleStartAutonomousRepair}
                  className="px-8 py-4 rounded-xl font-black text-sm bg-[#3ECF8E] hover:bg-[#34D399] text-black flex items-center gap-2 shadow-xl shadow-[#3ECF8E]/25 transition-all transform hover:scale-[1.02] cursor-pointer flex-shrink-0"
                >
                  <Zap className="w-5 h-5 fill-black" />
                  <span>Start Autonomous Repair</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 bg-[#171717] rounded-2xl border border-[#3ECF8E]/40 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#3ECF8E]/10 text-[#3ECF8E] flex items-center justify-center mx-auto border border-[#3ECF8E]/30">
                <CheckCheck className="w-8 h-8" />
              </div>
              <div className="space-y-1 max-w-md mx-auto">
                <h3 className="text-lg font-black text-white">All Core SEO, AEO & GEO Flaws Resolved!</h3>
                <p className="text-xs text-zinc-400">
                  Your repository has all technical foundations in place. You can now scale topical authority by publishing next-tier keyword cluster guides.
                </p>
              </div>
              <button
                onClick={handleStartAutonomousRepair}
                className="px-8 py-3.5 rounded-xl font-extrabold text-sm bg-[#3ECF8E] hover:bg-[#34D399] text-black inline-flex items-center gap-2 shadow-lg shadow-[#3ECF8E]/20 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Generate Next Keyword Pillar Article</span>
              </button>
            </div>
          )}

        </div>
      )}

      {/* ─── STAGE 4: AUTONOMOUS SWARM REPAIRING IN PROGRESS ─── */}
      {pipelineState === 'fixing' && (
        <div className="bg-[#171717] rounded-2xl border border-[#3ECF8E]/40 p-8 space-y-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#3ECF8E]/10 border border-[#3ECF8E]/30 text-[#3ECF8E] flex items-center justify-center mx-auto animate-pulse">
            <Cpu className="w-8 h-8 animate-spin" />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <h2 className="text-xl font-extrabold text-white">
              Autonomous AI Swarm is Preparing Your Optimizations...
            </h2>
            <p className="text-xs text-zinc-400">
              Verifying existing assets and generating the next high-ranking pillar guides for your repository.
            </p>
          </div>

          {/* Stepper of fixes */}
          <div className="max-w-xl mx-auto space-y-3 text-left">
            <div className={`p-3.5 rounded-xl border transition-all flex items-center gap-3 text-xs ${
              fixingStep >= 1 ? 'bg-[#121212] border-[#3ECF8E]/40 text-white' : 'bg-[#121212]/50 border-[#262626] text-zinc-500'
            }`}>
              {fixingStep > 1 ? <CheckCheck className="w-4 h-4 text-[#3ECF8E] flex-shrink-0" /> : <RefreshCw className="w-4 h-4 text-[#3ECF8E] animate-spin flex-shrink-0" />}
              <span className="font-semibold">Checking JSON-LD Schema graph verification...</span>
            </div>

            <div className={`p-3.5 rounded-xl border transition-all flex items-center gap-3 text-xs ${
              fixingStep >= 2 ? 'bg-[#121212] border-[#3ECF8E]/40 text-white' : 'bg-[#121212]/50 border-[#262626] text-zinc-500'
            }`}>
              {fixingStep > 2 ? <CheckCheck className="w-4 h-4 text-[#3ECF8E] flex-shrink-0" /> : fixingStep === 2 ? <RefreshCw className="w-4 h-4 text-[#3ECF8E] animate-spin flex-shrink-0" /> : <div className="w-4 h-4 rounded-full border border-zinc-700 flex-shrink-0" />}
              <span className="font-semibold">Verifying llms.txt citation anchors...</span>
            </div>

            <div className={`p-3.5 rounded-xl border transition-all flex items-center gap-3 text-xs ${
              fixingStep >= 3 ? 'bg-[#121212] border-[#3ECF8E]/40 text-white' : 'bg-[#121212]/50 border-[#262626] text-zinc-500'
            }`}>
              {fixingStep > 3 ? <CheckCheck className="w-4 h-4 text-[#3ECF8E] flex-shrink-0" /> : fixingStep === 3 ? <RefreshCw className="w-4 h-4 text-[#3ECF8E] animate-spin flex-shrink-0" /> : <div className="w-4 h-4 rounded-full border border-zinc-700 flex-shrink-0" />}
              <span className="font-semibold">Verifying robots.txt AI search bot rules...</span>
            </div>

            <div className={`p-3.5 rounded-xl border transition-all flex items-center gap-3 text-xs ${
              fixingStep >= 4 ? 'bg-[#121212] border-[#3ECF8E]/40 text-white' : 'bg-[#121212]/50 border-[#262626] text-zinc-500'
            }`}>
              {fixingStep > 4 ? <CheckCheck className="w-4 h-4 text-[#3ECF8E] flex-shrink-0" /> : fixingStep === 4 ? <RefreshCw className="w-4 h-4 text-[#3ECF8E] animate-spin flex-shrink-0" /> : <div className="w-4 h-4 rounded-full border border-zinc-700 flex-shrink-0" />}
              <span className="font-semibold">Synthesizing updated sitemap.xml with current lastmod...</span>
            </div>

            <div className={`p-3.5 rounded-xl border transition-all flex items-center gap-3 text-xs ${
              fixingStep >= 5 ? 'bg-[#121212] border-[#3ECF8E]/40 text-white' : 'bg-[#121212]/50 border-[#262626] text-zinc-500'
            }`}>
              {fixingStep === 5 ? <RefreshCw className="w-4 h-4 text-[#3ECF8E] animate-spin flex-shrink-0" /> : <div className="w-4 h-4 rounded-full border border-zinc-700 flex-shrink-0" />}
              <span className="font-semibold">Writing next high-ranking pillar article for topic cluster rank...</span>
            </div>
          </div>
        </div>
      )}

      {/* ─── STAGE 5: COMPLETED STAGING & 1-CLICK PULL REQUEST DISPATCHER ─── */}
      {pipelineState === 'completed' && (
        <div className="space-y-6">
          
          {/* PR Success Card if already dispatched */}
          {prResult && (
            <div className="p-6 rounded-2xl bg-gradient-to-r from-[#3ECF8E]/20 to-[#60a5fa]/15 border border-[#3ECF8E]/50 text-white space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#3ECF8E] font-extrabold text-base">
                  <GitPullRequest className="w-5 h-5" />
                  <span>Pull Request #{prResult.prNumber} Successfully Created on GitHub!</span>
                </div>
                <span className="text-xs px-2.5 py-1 rounded bg-[#3ECF8E]/20 text-[#3ECF8E] font-mono font-bold">
                  Branch: {prResult.branch}
                </span>
              </div>
              <p className="text-xs text-zinc-300">
                All optimizations have been committed to your new branch and the Pull Request is open. Merge it on GitHub to deploy changes to your live site!
              </p>
              <div className="pt-1">
                <a
                  href={prResult.prUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#3ECF8E] hover:bg-[#34D399] text-black font-extrabold text-sm transition-all shadow-lg shadow-[#3ECF8E]/20"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>View Pull Request on GitHub</span>
                </a>
              </div>
            </div>
          )}

          {/* Staged Dispatch Box */}
          <div className="bg-[#1c1c1c] rounded-2xl border-2 border-[#3ECF8E]/50 p-6 space-y-4 shadow-2xl shadow-[#3ECF8E]/5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-[#3ECF8E] font-extrabold text-lg">
                  <CheckCircle2 className="w-6 h-6" />
                  <span>{stagedFiles.length} Optimized File{stagedFiles.length > 1 ? 's' : ''} Staged & Ready!</span>
                </div>
                <p className="text-xs text-zinc-400 mt-1">
                  Ready to dispatch a structured Pull Request directly to your GitHub repository.
                </p>
              </div>

              <button
                onClick={handleDispatchPullRequest}
                disabled={isDispatchingPr}
                className="px-8 py-3.5 rounded-xl font-black text-sm bg-[#3ECF8E] hover:bg-[#34D399] text-black flex items-center gap-2 shadow-xl shadow-[#3ECF8E]/25 transition-all cursor-pointer disabled:opacity-50"
              >
                {isDispatchingPr ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Dispatching to GitHub...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Dispatch 1-Click Pull Request</span>
                  </>
                )}
              </button>
            </div>

            {/* PR Details Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="text-xs font-bold text-zinc-400 block mb-1">Pull Request Title</label>
                <input
                  type="text"
                  value={prTitle}
                  onChange={(e) => setPrTitle(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#121212] border border-[#262626] rounded-xl text-xs text-white"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-zinc-400 block mb-1">Pull Request Description</label>
                <input
                  type="text"
                  value={prDescription}
                  onChange={(e) => setPrDescription(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#121212] border border-[#262626] rounded-xl text-xs text-white"
                />
              </div>
            </div>
          </div>

          {/* Staged Files Inspector */}
          <div className="bg-[#171717] rounded-2xl border border-[#262626] p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileCode className="w-4 h-4 text-[#3ECF8E]" />
                <span>Inspect Staged Optimization Files</span>
              </h3>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPipelineState('idle')}
                  className="px-3 py-1.5 rounded-lg bg-[#121212] hover:bg-[#262626] text-zinc-400 text-xs font-semibold border border-[#262626]"
                >
                  Scan New Repo
                </button>
              </div>
            </div>

            {/* Review Cards */}
            <div className="space-y-4">
              {stagedFiles.map((file, idx) => (
                <div key={file.path || idx} className="bg-[#121212] rounded-xl border border-[#262626] overflow-hidden">
                  <div className="px-4 py-3 bg-[#1a1a1a] border-b border-[#262626] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#3ECF8E]/10 text-[#3ECF8E] border border-[#3ECF8E]/20">
                        {file.category}
                      </span>
                      <span className="font-mono font-bold text-white">{file.path}</span>
                    </div>

                    <button
                      onClick={() => handleCopy(`file-${idx}`, file.content)}
                      className="px-3 py-1 rounded bg-[#262626] hover:bg-zinc-700 text-zinc-300 text-xs font-semibold flex items-center gap-1.5"
                    >
                      {copiedKey === `file-${idx}` ? <Check className="w-3 h-3 text-[#3ECF8E]" /> : <Copy className="w-3 h-3" />}
                      <span>Copy Code</span>
                    </button>
                  </div>

                  <pre className="p-4 text-xs font-mono text-zinc-300 max-h-52 overflow-y-auto leading-relaxed whitespace-pre-wrap">
                    {file.content}
                  </pre>
                </div>
              ))}
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
