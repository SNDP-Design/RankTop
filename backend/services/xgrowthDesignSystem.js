/**
 * XGrowth Design System HTML Synthesizer Utility
 * Forces RankTop Content Creator Agents to output 100% design-system compliant HTML
 * for xgrowth.uno blogs.
 */

function convertMarkdownToXGrowthHtml({ title, keyword, categoryTag = 'SEO & AEO Strategy', markdown, domain = 'xgrowth.uno', publishDate = new Date().toISOString().split('T')[0] }) {
  const slug = keyword.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const canonicalUrl = `https://${domain.replace(/^https?:\/\//, '').replace(/\/$/, '')}/blogs/${slug}.html`;

  // Process markdown into styled HTML components
  let contentHtml = markdown
    // Convert H1
    .replace(/^#\s+(.+)$/gm, '') // Remove top H1, rendered in hero
    // Convert BLUF block quote
    .replace(/^>\s+\*\*Executive Summary \((BLUF)\)\*\*:\s*(.+)$/gm, (match, p1, p2) => {
      return `<div class="bluf-box"><h4>Executive Summary (BLUF)</h4><p>${p2}</p></div>`;
    })
    // Convert H2
    .replace(/^##\s+(.+)$/gm, '<h2>$1</h2>')
    // Convert H3
    .replace(/^###\s+(.+)$/gm, '<h3>$1</h3>')
    // Convert Bold text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Convert Italics
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Convert Lists
    .replace(/^-\s+(.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
    // Convert Paragraphs
    .replace(/^(?!<h2|<h3|<ul|<li|<div|<blockquote|<script|<table|<thead|<tr|<td|<th)(.+)$/gm, '<p>$1</p>');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${title} | XGrowth Insights</title>
<meta name="description" content="Read ${title} on XGrowth. Uno. Actionable B2B growth and AI marketing guide." />
<link rel="canonical" href="${canonicalUrl}" />
<link rel="icon" href="/assets/logo.svg" type="image/svg+xml"/>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/design-system.css?v=10">

<!-- ── XGrowth Design System Schema ── -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BlogPosting",
      "headline": "${title}",
      "description": "Read ${title} on XGrowth.",
      "url": "${canonicalUrl}",
      "datePublished": "${publishDate}",
      "dateModified": "${publishDate}",
      "author": {
        "@type": "Organization",
        "name": "XGrowth"
      },
      "publisher": {
        "@type": "Organization",
        "name": "XGrowth",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.xgrowth.uno/assets/logo.png"
        }
      }
    }
  ]
}
</script>

<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    background: var(--bg);
    color: var(--ink);
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    line-height: 1.7;
    padding: 0 20px;
  }
  .article {
    max-width: 800px;
    margin: 0 auto 80px;
    background: var(--panel);
    border: 1px solid var(--line);
    border-radius: 16px;
    padding: 40px;
  }
  .hero {
    margin-bottom: 32px;
    padding-bottom: 24px;
    border-bottom: 1px solid var(--line);
  }
  .tag {
    display: inline-block;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--accent-2);
    margin-bottom: 12px;
  }
  h1 {
    font-size: 36px;
    font-weight: 800;
    line-height: 1.25;
    margin-bottom: 16px;
    color: var(--ink);
  }
  .meta {
    font-size: 13px;
    color: var(--muted);
    font-weight: 500;
  }
  .bluf-box {
    background: rgba(62,207,142,0.06);
    border: 1px solid rgba(62,207,142,0.25);
    border-radius: 12px;
    padding: 20px 24px;
    margin: 24px 0 32px;
  }
  .bluf-box h4 {
    color: #3ECF8E;
    font-size: 13px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 8px;
  }
  .bluf-box p {
    font-size: 15px;
    color: #e4e4e7;
    margin: 0;
    line-height: 1.6;
  }
  h2 {
    font-size: 24px;
    font-weight: 700;
    margin: 36px 0 16px;
    color: var(--ink);
  }
  h3 {
    font-size: 18px;
    font-weight: 600;
    margin: 24px 0 12px;
    color: var(--ink);
  }
  p {
    margin-bottom: 20px;
    color: var(--muted);
    font-size: 16px;
  }
  ul, ol {
    margin: 0 0 24px 24px;
    color: var(--muted);
  }
  li {
    margin-bottom: 8px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 24px 0;
    font-size: 14px;
  }
  th, td {
    padding: 12px 16px;
    border: 1px solid var(--line);
    text-align: left;
  }
  th {
    background: var(--chip);
    color: var(--ink);
    font-weight: 700;
  }
  td {
    color: var(--muted);
  }
</style>
</head>
<body class="legal-page">
<style>
  body{margin:0;padding:0;background:radial-gradient(1200px 600px at 80% -10%,#1a1a1a 0%,transparent 60%),radial-gradient(900px 500px at -10% 110%,#101010 0%,transparent 60%),var(--bg);position:relative;overflow-x:clip}
  nav.top,main,footer,.wrap{position:relative;z-index:1}.wrap{max-width:1180px;margin:0 auto;padding:0 22px}
  nav.top{border-bottom:1px solid var(--line)} nav.top .row{display:flex;align-items:center;height:72px;gap:18px}.brand{display:flex;align-items:center;gap:10px}.brand .logo{width:36px;height:36px;border-radius:10px;background:#000;border:1px solid #1f1f1f;display:inline-flex;align-items:center;justify-content:center;overflow:hidden}.brand .logo img{width:100%;height:100%}.brand b{font-size:15px;letter-spacing:.2px}
  nav.top .links{display:flex;gap:6px;margin-left:30px;font-size:14px}nav.top .links a{color:var(--muted);padding:7px 12px;border-radius:8px}nav.top .right{margin-left:auto;display:flex;gap:10px;align-items:center}
</style>
<nav class="top" aria-label="Main navigation"><div class="wrap row"><a href="/" class="brand"><span class="logo"><img src="/assets/logo.svg" alt="XGrowth"/></span><b>XGrowth</b></a><div class="links"><a href="/#features">Features</a><a href="/#how">How it works</a><a href="/#pricing">Pricing</a><a href="/#faq">FAQ</a><a href="/blogs/">Blog</a></div><div class="right"><a data-auth-guest href="/app/?signin=1" class="btn primary">Get started <span class="arrow">→</span></a></div></div></nav>

<main class="wrap" style="padding-top: 40px;">
  <article class="article">
    <div class="hero">
      <span class="tag">${categoryTag}</span>
      <h1>${title}</h1>
      <div class="meta">By RankTop Autonomous AI Agents · 8 min read · ${publishDate}</div>
    </div>

    ${contentHtml}
  </article>
</main>

<footer class="foot" aria-label="Site footer"><div class="wrap"><div class="foot-bottom"><span>© 2026 XGrowth · All rights reserved</span></div></div></footer>
</body>
</html>`;
}

module.exports = { convertMarkdownToXGrowthHtml };
