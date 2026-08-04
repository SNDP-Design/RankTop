require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cron = require('node-cron');

const { initDB } = require('./db');
const analyzeRouter = require('./routes/analyze');
const scheduleRouter = require('./routes/schedule');
const publishRouter = require('./routes/publish');
const gscRouter = require('./routes/gsc');
const agentLoopRouter = require('./routes/agentLoop');
const { runWeeklyReports } = require('./cron/weeklyReport');

const app = express();
const PORT = process.env.PORT || 3001;

// ── CORS ────────────────────────────────────────────────────────────────────
const allowedOrigins = [
  'https://sndp-design.github.io',
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:4173',
  'http://localhost:5174',
];

if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL.replace(/\/$/, ''));
}

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.some(o => origin.startsWith(o)) || process.env.NODE_ENV !== 'production') {
      return cb(null, true);
    }
    return cb(null, true); // Fallback allow for public API flexibility
  },
  credentials: true,
}));


// ── Middleware ───────────────────────────────────────────────────────────────
app.use(express.json({ limit: '4mb' }));
app.use(session({
  secret: process.env.SESSION_SECRET || 'ranktop-dev-secret-change-in-prod',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === 'production', maxAge: 7 * 24 * 60 * 60 * 1000 },
}));

// ── Health check (keeps Render awake via UptimeRobot ping) ──────────────────
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'RankTop Autonomous Agent Backend', ts: new Date().toISOString() });
});

// ── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/analyze',    analyzeRouter);
app.use('/api/schedule',   scheduleRouter);
app.use('/api/publish',    publishRouter);
app.use('/api/gsc',        gscRouter);
app.use('/api/agent-loop', agentLoopRouter);

// ── Global error handler ─────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('[Server Error]', err.message);
  res.status(500).json({ error: err.message || 'Internal server error' });
});

// ── Start ────────────────────────────────────────────────────────────────────
async function start() {
  await initDB();
  console.log('[DB] SQLite initialized');

  // Weekly cron: every Monday at 9:00 AM (IST / Asia/Kolkata)
  cron.schedule('0 9 * * 1', runWeeklyReports, {
    timezone: process.env.CRON_TIMEZONE || 'Asia/Kolkata',
  });
  console.log('[CRON] Weekly report scheduler active — fires every Monday 9:00 AM');

  app.listen(PORT, () => {
    console.log(`[Server] RankTop Autonomous Agent Backend running on port ${PORT}`);
    console.log(`[Health] GET http://localhost:${PORT}/health`);
  });
}

start().catch(err => {
  console.error('[Fatal] Server failed to start:', err);
  process.exit(1);
});
