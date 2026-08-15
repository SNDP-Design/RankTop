const { analyzeAllAgents, generateArticle } = require('../services/geminiService');
const { sendWeeklyReport } = require('../services/emailService');
const {
  getActiveSchedules, getWebsite, upsertWebsite,
  getActiveLoopDomains, getLoopHistory, logLoopRun,
} = require('../db');
const { publishToWordpress } = require('../routes/publish');

// ── Weekly Report Cron ────────────────────────────────────────────────────────

async function runWeeklyReports() {
  console.log('[CRON] Starting weekly report run…');
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('[CRON] GEMINI_API_KEY not set — skipping weekly reports');
    return;
  }

  const schedules = getActiveSchedules();
  if (!schedules.length) {
    console.log('[CRON] No active email schedules found.');
    return;
  }

  // Group by domain to avoid re-analyzing the same domain multiple times
  const domains = [...new Set(schedules.map(s => s.domain))];

  for (const domain of domains) {
    try {
      console.log(`[CRON] Analyzing ${domain}…`);
      const previous = getWebsite(domain);
      const current = await analyzeAllAgents(apiKey, domain);
      upsertWebsite(domain, current);

      // Get this week's loop actions for the email
      const loopActions = getLoopHistory(domain, 10);

      // Send email to all subscribers for this domain
      const domainSchedules = schedules.filter(s => s.domain === domain);
      for (const schedule of domainSchedules) {
        await sendWeeklyReport({
          to: schedule.email,
          domain,
          current,
          previous: previous?.results || {},
          loopActions,
        });
      }

      console.log(`[CRON] ✓ Completed weekly report for ${domain}`);
    } catch (err) {
      console.error(`[CRON] Error processing ${domain}:`, err.message);
    }
  }

  console.log('[CRON] Weekly report run complete.');
}

// ── Full Autonomous Agent Loop ────────────────────────────────────────────────
// Runs weekly for each domain with active loop config.
// Loop: Analyze → Decide action → Execute → Verify → Log → Email

async function runAgentLoop(domain, config) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('[AgentLoop] No GEMINI_API_KEY — skipping loop');
    return;
  }

  console.log(`[AgentLoop] Starting loop for ${domain}…`);

  try {
    // Step 1: Analyze
    const results = await analyzeAllAgents(apiKey, domain);
    upsertWebsite(domain, results);
    logLoopRun(domain, 'analyze', { domain }, 'success');

    // Step 2: Decide highest-priority action
    const keywords = results.keywords || [];
    const swarm = results.swarm || {};

    let actionTaken = false;

    // Action A: If WordPress is connected and there are keyword opportunities → write + publish article
    if (config.wp_site_url && config.wp_username && config.wp_app_pass && keywords.length > 0) {
      const topKeyword = keywords[0];
      console.log(`[AgentLoop] Writing article for keyword: "${topKeyword.keyword}"`);

      const articleMarkdown = await generateArticle(apiKey, {
        keyword: topKeyword.keyword,
        domain,
        wordCount: 1500,
        tone: 'Professional',
      });

      if (articleMarkdown) {
        const publishResult = await publishToWordpress({
          siteUrl: config.wp_site_url,
          username: config.wp_username,
          appPassword: config.wp_app_pass,
          title: topKeyword.keyword,
          markdown: articleMarkdown,
          status: 'publish',
        });

        if (publishResult.success) {
          logLoopRun(
            domain,
            'publish_article',
            { keyword: topKeyword.keyword, wordCount: 1500 },
            'success',
            publishResult.url
          );
          actionTaken = true;
          console.log(`[AgentLoop] ✓ Published article → ${publishResult.url}`);
        } else {
          logLoopRun(domain, 'publish_article', { keyword: topKeyword.keyword }, 'failed');
        }
      }
    }

    // Action B: If no article published, log strategic plan
    if (!actionTaken && swarm.priority1) {
      logLoopRun(domain, 'strategic_plan', { priorities: [swarm.priority1, swarm.priority2, swarm.priority3] }, 'success');
    }

    // Step 3: Send loop summary email
    if (config.email) {
      const loopActions = getLoopHistory(domain, 5);
      const previous = getWebsite(domain);
      await sendWeeklyReport({
        to: config.email,
        domain,
        current: results,
        previous: previous?.results || {},
        loopActions,
      });
      console.log(`[AgentLoop] ✓ Loop summary emailed to ${config.email}`);
    }

  } catch (err) {
    console.error(`[AgentLoop] Error for ${domain}:`, err.message);
    logLoopRun(domain, 'loop_error', { error: err.message }, 'failed');
  }
}

// ── Run all active loops (called by cron every Monday) ───────────────────────
async function runAllActiveLoops() {
  const domains = getActiveLoopDomains();
  for (const config of domains) {
    await runAgentLoop(config.domain, config);
  }
}

module.exports = { runWeeklyReports, runAgentLoop, runAllActiveLoops };
