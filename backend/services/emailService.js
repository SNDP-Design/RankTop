const nodemailer = require('nodemailer');

function createTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.GMAIL_USER,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: process.env.GMAIL_REFRESH_TOKEN,
    },
  });
}

// ── HTML Email Templates ──────────────────────────────────────────────────────

function scoreChangeArrow(now, prev) {
  if (!prev) return '';
  const diff = now - prev;
  if (diff > 0) return `<span style="color:#3ECF8E">▲ ${diff}</span>`;
  if (diff < 0) return `<span style="color:#ef4444">▼ ${Math.abs(diff)}</span>`;
  return `<span style="color:#71717a">— 0</span>`;
}

function weeklyReportHTML({ domain, current, previous, loopActions = [] }) {
  const dash = current.dashboard || {};
  const prevDash = previous?.dashboard || {};
  const keywords = (current.keywords || []).slice(0, 3);
  const swarm = current.swarm || {};

  const actionRows = loopActions.length > 0
    ? loopActions.map(a => `
      <tr>
        <td style="padding:10px 16px;font-size:14px;color:#d4d4d8;border-bottom:1px solid #1f1f1f">${a.action_type?.replace(/_/g, ' ')}</td>
        <td style="padding:10px 16px;font-size:14px;color:${a.result === 'success' ? '#3ECF8E' : '#ef4444'};border-bottom:1px solid #1f1f1f;font-weight:700">${a.result}</td>
        <td style="padding:10px 16px;font-size:13px;color:#71717a;border-bottom:1px solid #1f1f1f">${a.ran_at?.slice(0, 16).replace('T', ' ')}</td>
        ${a.result_url ? `<td style="padding:10px 16px;border-bottom:1px solid #1f1f1f"><a href="${a.result_url}" style="color:#3ECF8E;font-size:13px">View →</a></td>` : '<td></td>'}
      </tr>`).join('')
    : `<tr><td colspan="4" style="padding:20px;text-align:center;color:#71717a;font-size:14px">No autonomous actions taken this week.</td></tr>`;

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>RankTop Weekly SEO Report — ${domain}</title></head>
<body style="margin:0;padding:0;background:#0f0f0f;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
<div style="max-width:640px;margin:0 auto;padding:32px 16px">

  <!-- Header -->
  <div style="background:#141414;border:1px solid #262626;border-radius:16px;padding:28px 32px;margin-bottom:20px;text-align:center">
    <div style="display:inline-flex;align-items:center;gap:8px;background:rgba(62,207,142,0.1);border:1px solid rgba(62,207,142,0.2);padding:6px 14px;border-radius:99px;margin-bottom:16px">
      <span style="width:8px;height:8px;border-radius:50%;background:#3ECF8E;display:inline-block"></span>
      <span style="color:#3ECF8E;font-size:13px;font-weight:700">Weekly AI Agent Report</span>
    </div>
    <h1 style="color:#fff;font-size:24px;font-weight:800;margin:0 0 8px">${domain}</h1>
    <p style="color:#71717a;font-size:14px;margin:0">Generated ${new Date().toLocaleDateString('en-IN', { weekday:'long', year:'numeric', month:'long', day:'numeric' })}</p>
  </div>

  <!-- Score Cards -->
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:20px">
    ${[
      { label: 'SEO Score', val: dash.seoScore, prev: prevDash.seoScore, color: '#3ECF8E' },
      { label: 'AEO Score', val: dash.aeoScore, prev: prevDash.aeoScore, color: '#60a5fa' },
      { label: 'GEO Score', val: dash.geoScore, prev: prevDash.geoScore, color: '#a78bfa' },
    ].map(s => `
    <div style="background:#141414;border:1px solid #262626;border-radius:12px;padding:18px;text-align:center">
      <div style="font-size:32px;font-weight:800;color:${s.color}">${s.val ?? '—'}</div>
      <div style="font-size:11px;color:#71717a;text-transform:uppercase;letter-spacing:.05em;margin:4px 0">${s.label}</div>
      <div style="font-size:13px">${scoreChangeArrow(s.val, s.prev)}</div>
    </div>`).join('')}
  </div>

  <!-- Summary -->
  ${dash.summary ? `
  <div style="background:#141414;border:1px solid #262626;border-radius:12px;padding:20px 24px;margin-bottom:20px">
    <p style="color:#a1a1aa;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;margin:0 0 8px">AI Analysis Summary</p>
    <p style="color:#d4d4d8;font-size:14px;line-height:1.7;margin:0">${dash.summary}</p>
  </div>` : ''}

  <!-- Quick Wins -->
  ${dash.quickWins?.length ? `
  <div style="background:#141414;border:1px solid #262626;border-radius:12px;padding:20px 24px;margin-bottom:20px">
    <p style="color:#3ECF8E;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;margin:0 0 12px">✓ Quick Wins This Week</p>
    ${dash.quickWins.map(w => `<div style="display:flex;align-items:flex-start;gap:10px;margin-bottom:8px"><span style="width:6px;height:6px;border-radius:50%;background:#3ECF8E;margin-top:6px;flex-shrink:0"></span><span style="color:#d4d4d8;font-size:14px">${w}</span></div>`).join('')}
  </div>` : ''}

  <!-- Top Keywords -->
  ${keywords.length ? `
  <div style="background:#141414;border:1px solid #262626;border-radius:12px;margin-bottom:20px;overflow:hidden">
    <div style="padding:16px 24px;border-bottom:1px solid #1f1f1f">
      <p style="color:#fff;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;margin:0">Top 3 Keyword Opportunities</p>
    </div>
    ${keywords.map(k => `
    <div style="padding:14px 24px;border-bottom:1px solid #1f1f1f;display:flex;align-items:center;justify-content:space-between">
      <span style="color:#d4d4d8;font-size:14px;font-weight:600">${k.keyword}</span>
      <span style="background:rgba(62,207,142,0.1);border:1px solid rgba(62,207,142,0.2);color:#3ECF8E;font-size:12px;font-weight:700;padding:3px 10px;border-radius:6px">KD ${k.kd}</span>
    </div>`).join('')}
  </div>` : ''}

  <!-- Agent Loop Actions -->
  <div style="background:#141414;border:1px solid #262626;border-radius:12px;margin-bottom:20px;overflow:hidden">
    <div style="padding:16px 24px;border-bottom:1px solid #1f1f1f">
      <p style="color:#fff;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;margin:0">Autonomous Actions Taken</p>
    </div>
    <table style="width:100%;border-collapse:collapse">
      <thead><tr style="background:#111">
        <th style="padding:10px 16px;text-align:left;font-size:11px;color:#71717a;text-transform:uppercase">Action</th>
        <th style="padding:10px 16px;text-align:left;font-size:11px;color:#71717a;text-transform:uppercase">Result</th>
        <th style="padding:10px 16px;text-align:left;font-size:11px;color:#71717a;text-transform:uppercase">Time</th>
        <th style="padding:10px 16px;text-align:left;font-size:11px;color:#71717a;text-transform:uppercase">Link</th>
      </tr></thead>
      <tbody>${actionRows}</tbody>
    </table>
  </div>

  <!-- Strategic Priorities -->
  ${swarm.priority1 ? `
  <div style="background:#141414;border:1px solid #262626;border-radius:12px;padding:20px 24px;margin-bottom:20px">
    <p style="color:#3ECF8E;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;margin:0 0 12px">AI Strategic Priorities</p>
    ${[swarm.priority1, swarm.priority2, swarm.priority3].filter(Boolean).map((p, i) => `
    <div style="display:flex;align-items:flex-start;gap:10px;margin-bottom:10px">
      <span style="background:rgba(62,207,142,0.1);border:1px solid rgba(62,207,142,0.2);color:#3ECF8E;font-size:12px;font-weight:800;padding:2px 8px;border-radius:5px;flex-shrink:0">${i+1}</span>
      <span style="color:#d4d4d8;font-size:14px">${p}</span>
    </div>`).join('')}
  </div>` : ''}

  <!-- Footer -->
  <div style="text-align:center;padding:20px">
    <a href="https://sndp-design.github.io/RankTop/" style="display:inline-block;background:#3ECF8E;color:#000;font-size:14px;font-weight:700;padding:12px 28px;border-radius:10px;text-decoration:none;margin-bottom:16px">Open RankTop Dashboard →</a>
    <p style="color:#52525b;font-size:12px;margin:0">RankTop AI · Autonomous SEO Engine · <a href="https://sndp-design.github.io/RankTop/" style="color:#52525b">Unsubscribe</a></p>
  </div>

</div>
</body>
</html>`;
}

async function sendWeeklyReport({ to, domain, current, previous, loopActions }) {
  const transporter = createTransporter();
  const html = weeklyReportHTML({ domain, current, previous, loopActions });

  const dash = current.dashboard || {};
  const seoScore = dash.seoScore ?? '—';

  await transporter.sendMail({
    from: `"RankTop AI" <${process.env.GMAIL_USER}>`,
    to,
    subject: `📊 Weekly SEO Report — ${domain} | SEO Score: ${seoScore}`,
    html,
  });

  console.log(`[Email] Weekly report sent to ${to} for ${domain}`);
}

module.exports = { sendWeeklyReport };
