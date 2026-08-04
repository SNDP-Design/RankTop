const express = require('express');
const router = express.Router();
const { upsertSchedule, deleteSchedule } = require('../db');

// POST /api/schedule — Subscribe to weekly email reports
router.post('/', (req, res) => {
  const { domain, email, active } = req.body;
  if (!domain || !email) return res.status(400).json({ error: 'domain and email are required' });

  try {
    if (active === false) {
      deleteSchedule(domain, email);
      return res.json({ success: true, message: `Unsubscribed ${email} from reports for ${domain}` });
    }
    upsertSchedule(domain, email);
    res.json({ success: true, message: `${email} will receive weekly reports for ${domain} every Monday at 9:00 AM` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
