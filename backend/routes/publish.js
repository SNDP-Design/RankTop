const express = require('express');
const router = express.Router();
const axios = require('axios');
const { marked } = require('marked');
const { generateArticle } = require('../services/geminiService');

// ── Shared publish helper (also used by agentLoop) ────────────────────────────
async function publishToWordpress({ siteUrl, username, appPassword, title, markdown, status = 'draft' }) {
  const html = marked.parse(markdown || '');
  const cleanSite = siteUrl.replace(/\/$/, '');
  const auth = Buffer.from(`${username}:${appPassword}`).toString('base64');

  const response = await axios.post(
    `${cleanSite}/wp-json/wp/v2/posts`,
    { title, content: html, status },
    {
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
      timeout: 15000,
    }
  );

  return {
    success: true,
    postId: response.data.id,
    url: response.data.link,
    status: response.data.status,
  };
}

// POST /api/publish
// Body: { domain, keyword, wordCount, tone, apiKey?, wpSiteUrl, wpUsername, wpAppPassword, wpStatus }
router.post('/', async (req, res) => {
  const {
    domain, keyword, wordCount = 2000, tone = 'Professional',
    apiKey, wpSiteUrl, wpUsername, wpAppPassword, wpStatus = 'draft',
    markdown, // optionally pass pre-generated markdown
  } = req.body;

  if (!keyword) return res.status(400).json({ error: 'keyword is required' });
  if (!wpSiteUrl || !wpUsername || !wpAppPassword) {
    return res.status(400).json({ error: 'WordPress credentials required (wpSiteUrl, wpUsername, wpAppPassword)' });
  }

  const key = apiKey || process.env.GEMINI_API_KEY;

  try {
    // Generate article if not provided
    const articleMarkdown = markdown || await generateArticle(key, {
      keyword, domain: domain || wpSiteUrl, wordCount, tone,
    });

    if (!articleMarkdown) {
      return res.status(500).json({ error: 'Article generation failed — check Gemini API key' });
    }

    const result = await publishToWordpress({
      siteUrl: wpSiteUrl,
      username: wpUsername,
      appPassword: wpAppPassword,
      title: keyword,
      markdown: articleMarkdown,
      status: wpStatus,
    });

    res.json({ success: true, ...result, markdown: articleMarkdown });
  } catch (err) {
    const msg = err.response?.data?.message || err.message;
    console.error('[/api/publish]', msg);
    res.status(500).json({ error: msg });
  }
});

module.exports = router;
module.exports.publishToWordpress = publishToWordpress;
