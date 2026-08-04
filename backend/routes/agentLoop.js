const express = require('express');
const router = express.Router();
const { upsertLoopConfig, getLoopConfig, getLoopHistory, getPendingApprovals, updateApprovalStatus } = require('../db');
const { runAgentLoop } = require('../cron/weeklyReport');

// POST /api/agent-loop/start
// Body: { domain, email, wpSiteUrl?, wpUsername?, wpAppPassword? }
router.post('/start', async (req, res) => {
  const { domain, email, wpSiteUrl, wpUsername, wpAppPassword } = req.body;
  if (!domain || !email) return res.status(400).json({ error: 'domain and email are required' });

  upsertLoopConfig(domain, {
    email, wp_site_url: wpSiteUrl, wp_username: wpUsername,
    wp_app_pass: wpAppPassword, active: true,
  });

  res.json({
    success: true,
    message: `Autonomous agent loop activated for ${domain}. First run will start shortly.`,
  });

  // Trigger first run immediately (don't await — respond first)
  const config = getLoopConfig(domain);
  setImmediate(() => runAgentLoop(domain, config));
});

// POST /api/agent-loop/stop
router.post('/stop', (req, res) => {
  const { domain } = req.body;
  if (!domain) return res.status(400).json({ error: 'domain is required' });

  const config = getLoopConfig(domain);
  if (!config) return res.status(404).json({ error: 'No loop config found for this domain' });

  upsertLoopConfig(domain, { ...config, active: false });
  res.json({ success: true, message: `Agent loop paused for ${domain}` });
});

// GET /api/agent-loop/status?domain=example.com
router.get('/status', (req, res) => {
  const { domain } = req.query;
  if (!domain) return res.status(400).json({ error: 'domain is required' });

  const config = getLoopConfig(domain);
  const history = getLoopHistory(domain, 20);
  const pendingApprovals = getPendingApprovals(domain);

  res.json({
    domain,
    active: Boolean(config?.active),
    wpConnected: Boolean(config?.wp_site_url),
    emailNotifications: config?.email || null,
    history,
    pendingApprovals,
  });
});

// GET /api/agent-loop/approvals?domain=example.com
router.get('/approvals', (req, res) => {
  const { domain } = req.query;
  if (!domain) return res.status(400).json({ error: 'domain is required' });
  const pending = getPendingApprovals(domain);
  res.json({ success: true, approvals: pending });
});

// POST /api/agent-loop/approve
router.post('/approve', (req, res) => {
  const { taskId, feedback } = req.body;
  if (!taskId) return res.status(400).json({ error: 'taskId is required' });
  updateApprovalStatus(taskId, 'APPROVED', feedback || '');
  res.json({ success: true, message: `Task #${taskId} approved successfully.` });
});

// POST /api/agent-loop/reject
router.post('/reject', (req, res) => {
  const { taskId, feedback } = req.body;
  if (!taskId) return res.status(400).json({ error: 'taskId is required' });
  updateApprovalStatus(taskId, 'REJECTED', feedback || 'User rejected task execution');
  res.json({ success: true, message: `Task #${taskId} rejected.` });
});

// POST /api/agent-loop/run-now — Manual trigger for immediate run
router.post('/run-now', async (req, res) => {
  const { domain } = req.body;
  if (!domain) return res.status(400).json({ error: 'domain is required' });

  const config = getLoopConfig(domain);
  if (!config) return res.status(404).json({ error: 'No loop config found — call /start first' });

  res.json({ success: true, message: 'Agent loop triggered — running now' });
  setImmediate(() => runAgentLoop(domain, config));
});

module.exports = router;

