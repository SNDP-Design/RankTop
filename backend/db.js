const Database = require('better-sqlite3');
const path = require('path');

const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'ranktop.db');
let db;

function getDB() {
  if (!db) db = new Database(DB_PATH);
  return db;
}

async function initDB() {
  const db = getDB();

  db.exec(`
    -- Saved websites + latest AI analysis results
    CREATE TABLE IF NOT EXISTS websites (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      domain      TEXT UNIQUE NOT NULL,
      results     TEXT,           -- JSON blob of all 7 agent results
      analyzed_at TEXT,
      created_at  TEXT DEFAULT (datetime('now'))
    );

    -- Weekly email report subscriptions
    CREATE TABLE IF NOT EXISTS schedules (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      domain     TEXT NOT NULL,
      email      TEXT NOT NULL,
      active     INTEGER DEFAULT 1,
      created_at TEXT DEFAULT (datetime('now')),
      UNIQUE(domain, email)
    );

    -- GSC OAuth tokens per domain (encrypted at rest)
    CREATE TABLE IF NOT EXISTS gsc_tokens (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      domain        TEXT UNIQUE NOT NULL,
      access_token  TEXT,
      refresh_token TEXT,
      expiry_date   INTEGER,
      updated_at    TEXT DEFAULT (datetime('now'))
    );

    -- Agent loop run history
    CREATE TABLE IF NOT EXISTS agent_loop_runs (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      domain      TEXT NOT NULL,
      action_type TEXT,           -- 'publish_article' | 'add_schema' | 'analyze'
      action_data TEXT,           -- JSON details of what was done
      result      TEXT,           -- 'success' | 'failed' | 'skipped'
      result_url  TEXT,           -- e.g. published WordPress post URL
      ran_at      TEXT DEFAULT (datetime('now'))
    );

    -- Agent loop schedule / active state
    CREATE TABLE IF NOT EXISTS agent_loop_config (
      id           INTEGER PRIMARY KEY AUTOINCREMENT,
      domain       TEXT UNIQUE NOT NULL,
      email        TEXT,
      wp_site_url  TEXT,
      wp_username  TEXT,
      wp_app_pass  TEXT,
      active       INTEGER DEFAULT 0,
      created_at   TEXT DEFAULT (datetime('now'))
    );
  `);
}

// ── Websites ─────────────────────────────────────────────────────────────────

function upsertWebsite(domain, results) {
  const db = getDB();
  db.prepare(`
    INSERT INTO websites (domain, results, analyzed_at)
    VALUES (?, ?, datetime('now'))
    ON CONFLICT(domain) DO UPDATE SET
      results = excluded.results,
      analyzed_at = excluded.analyzed_at
  `).run(domain, JSON.stringify(results));
}

function getWebsite(domain) {
  const db = getDB();
  const row = db.prepare('SELECT * FROM websites WHERE domain = ?').get(domain);
  if (!row) return null;
  return { ...row, results: JSON.parse(row.results || '{}') };
}

function getAllWebsites() {
  const db = getDB();
  return db.prepare('SELECT domain, analyzed_at FROM websites').all();
}

// ── Schedules ─────────────────────────────────────────────────────────────────

function upsertSchedule(domain, email) {
  const db = getDB();
  db.prepare(`
    INSERT INTO schedules (domain, email, active)
    VALUES (?, ?, 1)
    ON CONFLICT(domain, email) DO UPDATE SET active = 1
  `).run(domain, email);
}

function deleteSchedule(domain, email) {
  const db = getDB();
  db.prepare('UPDATE schedules SET active = 0 WHERE domain = ? AND email = ?').run(domain, email);
}

function getActiveSchedules() {
  const db = getDB();
  return db.prepare('SELECT * FROM schedules WHERE active = 1').all();
}

// ── GSC Tokens ───────────────────────────────────────────────────────────────

function saveGscTokens(domain, tokens) {
  const db = getDB();
  db.prepare(`
    INSERT INTO gsc_tokens (domain, access_token, refresh_token, expiry_date, updated_at)
    VALUES (?, ?, ?, ?, datetime('now'))
    ON CONFLICT(domain) DO UPDATE SET
      access_token = excluded.access_token,
      refresh_token = excluded.refresh_token,
      expiry_date = excluded.expiry_date,
      updated_at = excluded.updated_at
  `).run(domain, tokens.access_token, tokens.refresh_token, tokens.expiry_date);
}

function getGscTokens(domain) {
  const db = getDB();
  return db.prepare('SELECT * FROM gsc_tokens WHERE domain = ?').get(domain);
}

// ── Agent Loop ────────────────────────────────────────────────────────────────

function logLoopRun(domain, actionType, actionData, result, resultUrl = null) {
  const db = getDB();
  db.prepare(`
    INSERT INTO agent_loop_runs (domain, action_type, action_data, result, result_url)
    VALUES (?, ?, ?, ?, ?)
  `).run(domain, actionType, JSON.stringify(actionData), result, resultUrl);
}

function getLoopHistory(domain, limit = 20) {
  const db = getDB();
  return db.prepare(
    'SELECT * FROM agent_loop_runs WHERE domain = ? ORDER BY ran_at DESC LIMIT ?'
  ).all(domain, limit);
}

function upsertLoopConfig(domain, config) {
  const db = getDB();
  db.prepare(`
    INSERT INTO agent_loop_config (domain, email, wp_site_url, wp_username, wp_app_pass, active)
    VALUES (?, ?, ?, ?, ?, ?)
    ON CONFLICT(domain) DO UPDATE SET
      email = excluded.email,
      wp_site_url = excluded.wp_site_url,
      wp_username = excluded.wp_username,
      wp_app_pass = excluded.wp_app_pass,
      active = excluded.active
  `).run(domain, config.email || '', config.wp_site_url || '', config.wp_username || '', config.wp_app_pass || '', config.active ? 1 : 0);
}

function getLoopConfig(domain) {
  const db = getDB();
  return db.prepare('SELECT * FROM agent_loop_config WHERE domain = ?').get(domain);
}

function getActiveLoopDomains() {
  const db = getDB();
  return db.prepare('SELECT * FROM agent_loop_config WHERE active = 1').all();
}

module.exports = {
  initDB, getDB,
  upsertWebsite, getWebsite, getAllWebsites,
  upsertSchedule, deleteSchedule, getActiveSchedules,
  saveGscTokens, getGscTokens,
  logLoopRun, getLoopHistory, upsertLoopConfig, getLoopConfig, getActiveLoopDomains,
};
