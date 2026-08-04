const express = require('express');
const router = express.Router();
const { analyzeAllAgents } = require('../services/geminiService');
const { upsertWebsite, getWebsite } = require('../db');

// POST /api/analyze
// Body: { domain, apiKey? }
// Runs all 7 Gemini agents and caches results in DB
router.post('/', async (req, res) => {
  const { domain, apiKey } = req.body;

  if (!domain) return res.status(400).json({ error: 'domain is required' });

  const key = apiKey || process.env.GEMINI_API_KEY;
  if (!key) return res.status(400).json({ error: 'No Gemini API key provided' });

  try {
    const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/$/, '');
    const results = await analyzeAllAgents(key, cleanDomain);
    upsertWebsite(cleanDomain, results);
    res.json({ success: true, domain: cleanDomain, results });
  } catch (err) {
    console.error('[/api/analyze]', err.message);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/analyze/:domain — Return cached results
router.get('/:domain', (req, res) => {
  const row = getWebsite(req.params.domain);
  if (!row) return res.status(404).json({ error: 'No cached data for this domain' });
  res.json(row);
});

module.exports = router;
