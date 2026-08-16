const express = require('express');
const router = express.Router();
const axios = require('axios');

const GITHUB_API = 'https://api.github.com';

function getHeaders(token) {
  const headers = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'RankTop-AI-Agent',
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

// POST /api/github/scan
// Body: { owner, repo, branch, token }
router.post('/scan', async (req, res) => {
  const { owner, repo, branch = 'main', token } = req.body;
  if (!owner || !repo) {
    return res.status(400).json({ error: 'owner and repo are required' });
  }

  try {
    const detailsRes = await axios.get(`${GITHUB_API}/repos/${owner}/${repo}`, {
      headers: getHeaders(token),
    });

    const activeBranch = branch || detailsRes.data.default_branch || 'main';

    const treeRes = await axios.get(`${GITHUB_API}/repos/${owner}/${repo}/git/trees/${activeBranch}?recursive=1`, {
      headers: getHeaders(token),
    });

    res.json({
      success: true,
      repo: detailsRes.data.full_name,
      defaultBranch: activeBranch,
      isPrivate: detailsRes.data.private,
      tree: treeRes.data.tree || [],
    });
  } catch (err) {
    const status = err.response?.status || 500;
    const msg = err.response?.data?.message || err.message;
    res.status(status).json({ error: msg });
  }
});

// POST /api/github/pr
// Body: { owner, repo, baseBranch, title, body, files, token }
router.post('/pr', async (req, res) => {
  const { owner, repo, baseBranch = 'main', title, body, files = [], token } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'GitHub Personal Access Token is required to create a Pull Request' });
  }
  if (!owner || !repo || !files.length) {
    return res.status(400).json({ error: 'owner, repo, and staged files are required' });
  }

  try {
    const newBranch = `ranktop/seo-boost-${Date.now().toString(36)}`;

    // 1. Get base SHA
    const refRes = await axios.get(`${GITHUB_API}/repos/${owner}/${repo}/git/ref/heads/${baseBranch}`, {
      headers: getHeaders(token),
    });
    const sha = refRes.data.object.sha;

    // 2. Create new branch
    await axios.post(
      `${GITHUB_API}/repos/${owner}/${repo}/git/refs`,
      { ref: `refs/heads/${newBranch}`, sha },
      { headers: getHeaders(token) }
    );

    // 3. Commit files
    for (const file of files) {
      let existingSha = null;
      try {
        const checkRes = await axios.get(`${GITHUB_API}/repos/${owner}/${repo}/contents/${file.path}?ref=${newBranch}`, {
          headers: getHeaders(token),
        });
        existingSha = checkRes.data.sha;
      } catch {}

      await axios.put(
        `${GITHUB_API}/repos/${owner}/${repo}/contents/${file.path}`,
        {
          message: file.message || `RankTop AI: update ${file.path}`,
          content: Buffer.from(file.content).toString('base64'),
          branch: newBranch,
          ...(existingSha ? { sha: existingSha } : {}),
        },
        { headers: getHeaders(token) }
      );
    }

    // 4. Open PR
    const prRes = await axios.post(
      `${GITHUB_API}/repos/${owner}/${repo}/pulls`,
      {
        title: title || 'RankTop AI Optimization Patch',
        body: body || 'Automated SEO, AEO and GEO improvements by RankTop AI.',
        head: newBranch,
        base: baseBranch,
      },
      { headers: getHeaders(token) }
    );

    res.json({
      success: true,
      prUrl: prRes.data.html_url,
      prNumber: prRes.data.number,
      branch: newBranch,
    });
  } catch (err) {
    const status = err.response?.status || 500;
    const msg = err.response?.data?.message || err.message;
    res.status(status).json({ error: msg });
  }
});

module.exports = router;
