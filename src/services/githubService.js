// ─────────────────────────────────────────────────────────────────────────────
// githubService.js — Full GitHub REST API client for RankTop
// Enables scanning repos, detecting frameworks, reading landing pages,
// committing technical SEO patches, and creating automated Pull Requests.
// ─────────────────────────────────────────────────────────────────────────────

const GITHUB_API_BASE = 'https://api.github.com';
const STORAGE_KEY = 'ranktop_github_config';

// Unicode-safe Base64 encoder & decoder
function utf8ToBase64(str) {
  return window.btoa(unescape(encodeURIComponent(str)));
}

function base64ToUtf8(str) {
  try {
    return decodeURIComponent(escape(window.atob(str.replace(/\s/g, ''))));
  } catch {
    try {
      // Fallback for large or binary-like text
      const bin = window.atob(str.replace(/\s/g, ''));
      const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
      return new TextDecoder().decode(bytes);
    } catch {
      return window.atob(str.replace(/\s/g, ''));
    }
  }
}

export const githubService = {
  // ── Config Management ─────────────────────────────────────────────────────
  getConfig() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    } catch {
      return {};
    }
  },

  saveConfig(config) {
    try {
      const current = this.getConfig();
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...current, ...config }));
    } catch (e) {
      console.warn('[githubService] Failed to save config:', e);
    }
  },

  clearConfig() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn('[githubService] Failed to clear config:', e);
    }
  },

  // ── Helper: Parse GitHub URL or "owner/repo" string ────────────────────────
  parseRepo(input) {
    if (!input || typeof input !== 'string') {
      throw new Error('Please enter a valid GitHub repository URL or "owner/repo".');
    }
    const clean = input.trim().replace(/\.git$/, '').replace(/\/$/, '');
    
    // Check https://github.com/owner/repo or github.com/owner/repo
    const urlMatch = clean.match(/github\.com\/([^/]+)\/([^/]+)/i);
    if (urlMatch) {
      return { owner: urlMatch[1], repo: urlMatch[2] };
    }

    // Check git@github.com:owner/repo
    const sshMatch = clean.match(/github\.com:([^/]+)\/([^/]+)/i);
    if (sshMatch) {
      return { owner: sshMatch[1], repo: sshMatch[2] };
    }

    // Check "owner/repo"
    const slashParts = clean.split('/');
    if (slashParts.length === 2 && slashParts[0] && slashParts[1]) {
      return { owner: slashParts[0], repo: slashParts[1] };
    }

    throw new Error('Invalid repository format. Use "owner/repo" or "https://github.com/owner/repo".');
  },

  // ── Helper: Build Request Headers ──────────────────────────────────────────
  getHeaders(token) {
    const headers = {
      Accept: 'application/vnd.github.v3+json',
      'X-GitHub-Api-Version': '2022-11-28',
    };
    if (token && token.trim()) {
      headers.Authorization = `Bearer ${token.trim()}`;
    }
    return headers;
  },

  // ── Get Repository Metadata ────────────────────────────────────────────────
  async getRepoDetails(owner, repo, token) {
    const res = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}`, {
      headers: this.getHeaders(token),
    });
    if (!res.ok) {
      if (res.status === 404) {
        throw new Error(`Repository "${owner}/${repo}" not found. If it is private, please provide a GitHub Personal Access Token.`);
      }
      if (res.status === 401 || res.status === 403) {
        throw new Error('GitHub API rate limit exceeded or invalid token. Please provide a Personal Access Token with repo access.');
      }
      throw new Error(`GitHub Error (${res.status}): ${res.statusText}`);
    }
    return res.json();
  },

  // ── Get Branches List ──────────────────────────────────────────────────────
  async getBranches(owner, repo, token) {
    try {
      const res = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}/branches?per_page=30`, {
        headers: this.getHeaders(token),
      });
      if (!res.ok) return [];
      const data = await res.json();
      return Array.isArray(data) ? data.map((b) => b.name) : [];
    } catch {
      return [];
    }
  },

  // ── Fetch Full Repository Tree ─────────────────────────────────────────────
  async getRepoTree(owner, repo, branch = 'main', token) {
    // 1. Try recursive git tree
    const res = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`, {
      headers: this.getHeaders(token),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.tree && Array.isArray(data.tree)) {
        return {
          truncated: Boolean(data.truncated),
          files: data.tree.map((item) => ({
            path: item.path,
            type: item.type === 'blob' ? 'file' : 'dir',
            size: item.size || 0,
            sha: item.sha,
          })),
        };
      }
    }

    // 2. Fallback: Fetch root contents
    const contentsRes = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}/contents?ref=${branch}`, {
      headers: this.getHeaders(token),
    });
    if (!contentsRes.ok) {
      throw new Error(`Could not fetch branch "${branch}" files. Verify branch name and permissions.`);
    }
    const contents = await contentsRes.json();
    return {
      truncated: false,
      files: contents.map((item) => ({
        path: item.path,
        type: item.type === 'file' ? 'file' : 'dir',
        size: item.size || 0,
        sha: item.sha,
      })),
    };
  },

  // ── Fetch Single File Content ──────────────────────────────────────────────
  async getFileContent(owner, repo, path, branch = 'main', token) {
    const cleanPath = path.replace(/^\//, '');
    const res = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}/contents/${cleanPath}?ref=${branch}`, {
      headers: this.getHeaders(token),
    });
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`Failed to fetch file "${cleanPath}" (${res.status})`);
    }
    const data = await res.json();
    if (!data.content) return '';
    return {
      content: base64ToUtf8(data.content),
      sha: data.sha,
      size: data.size,
      path: data.path,
    };
  },

  // ── Framework & Architecture Detection ─────────────────────────────────────
  detectFramework(filePaths = []) {
    const paths = new Set(filePaths.map((p) => p.toLowerCase()));

    if (paths.has('next.config.js') || paths.has('next.config.mjs') || paths.has('next.config.ts')) {
      const isAppRouter = Array.from(paths).some((p) => p.startsWith('app/') || p.startsWith('src/app/'));
      return {
        id: 'nextjs',
        name: isAppRouter ? 'Next.js (App Router)' : 'Next.js (Pages Router)',
        type: 'React Framework',
        badgeColor: '#000000',
        contentDir: 'content/posts',
        seoFileLocation: isAppRouter ? 'app/sitemap.ts' : 'public/sitemap.xml',
      };
    }

    if (paths.has('astro.config.mjs') || paths.has('astro.config.js') || paths.has('astro.config.ts')) {
      return {
        id: 'astro',
        name: 'Astro Web Framework',
        type: 'Content-First Island Architecture',
        badgeColor: '#FF5D01',
        contentDir: 'src/content/blog',
        seoFileLocation: 'public/sitemap.xml',
      };
    }

    if (paths.has('vite.config.js') || paths.has('vite.config.ts') || paths.has('vite.config.mjs')) {
      return {
        id: 'vite',
        name: 'Vite + React / SPA',
        type: 'Modern Frontend Build Tool',
        badgeColor: '#646CFF',
        contentDir: 'src/content',
        seoFileLocation: 'public/sitemap.xml',
      };
    }

    if (paths.has('nuxt.config.js') || paths.has('nuxt.config.ts')) {
      return {
        id: 'nuxt',
        name: 'Nuxt (Vue.js)',
        type: 'Full-Stack Vue Framework',
        badgeColor: '#00DC82',
        contentDir: 'content',
        seoFileLocation: 'public/sitemap.xml',
      };
    }

    if (paths.has('hugo.toml') || paths.has('config.toml') || paths.has('hugo.yaml')) {
      return {
        id: 'hugo',
        name: 'Hugo Static Engine',
        type: 'Fast Static Site Generator',
        badgeColor: '#FF4088',
        contentDir: 'content/posts',
        seoFileLocation: 'static/sitemap.xml',
      };
    }

    if (paths.has('gatsby-config.js') || paths.has('gatsby-config.ts')) {
      return {
        id: 'gatsby',
        name: 'Gatsby',
        type: 'Static Site Generator',
        badgeColor: '#663399',
        contentDir: 'content/blog',
        seoFileLocation: 'public/sitemap.xml',
      };
    }

    if (paths.has('package.json')) {
      return {
        id: 'nodejs',
        name: 'Node.js / Web Application',
        type: 'JavaScript / TypeScript Project',
        badgeColor: '#339933',
        contentDir: 'content',
        seoFileLocation: 'public/sitemap.xml',
      };
    }

    return {
      id: 'html',
      name: 'HTML5 / Static Website',
      type: 'Classic Web Architecture',
      badgeColor: '#E34F26',
      contentDir: 'blog',
      seoFileLocation: 'sitemap.xml',
    };
  },

  // ── Locate Landing Page File ───────────────────────────────────────────────
  findLandingPage(filePaths = []) {
    const candidates = [
      'app/page.tsx',
      'app/page.jsx',
      'app/page.js',
      'src/app/page.tsx',
      'src/app/page.jsx',
      'src/app/page.js',
      'pages/index.tsx',
      'pages/index.jsx',
      'pages/index.js',
      'src/pages/index.tsx',
      'src/pages/index.jsx',
      'src/pages/index.js',
      'src/App.jsx',
      'src/App.tsx',
      'src/App.vue',
      'src/routes/+page.svelte',
      'src/pages/index.astro',
      'index.html',
      'index.htm',
      'public/index.html',
      'src/index.html',
    ];

    const map = new Map(filePaths.map((p) => [p.toLowerCase(), p]));
    for (const c of candidates) {
      if (map.has(c.toLowerCase())) {
        return map.get(c.toLowerCase());
      }
    }

    // Fallback: look for any root html or page file
    const rootHtml = filePaths.find((p) => /^[^/]+\.html?$/i.test(p));
    return rootHtml || 'index.html';
  },

  // ── Locate Blog / Content Folder ───────────────────────────────────────────
  findBlogDirectory(filePaths = []) {
    const candidates = [
      'content/posts',
      'content/blog',
      'src/content/blog',
      'src/content/posts',
      'content',
      'posts',
      'blog',
      '_posts',
      'src/posts',
      'src/blog',
      'articles',
    ];

    for (const c of candidates) {
      const match = filePaths.find((p) => p.startsWith(c + '/') || p === c);
      if (match) return c;
    }
    return 'content/posts';
  },

  // ── Check Core SEO/GEO Files ───────────────────────────────────────────────
  checkCoreSeoFiles(filePaths = []) {
    const paths = new Set(filePaths.map((p) => p.toLowerCase()));
    return {
      hasRobotsTxt: paths.has('robots.txt') || paths.has('public/robots.txt') || paths.has('app/robots.ts') || paths.has('src/app/robots.ts'),
      hasSitemap: paths.has('sitemap.xml') || paths.has('public/sitemap.xml') || paths.has('app/sitemap.ts') || paths.has('src/app/sitemap.ts'),
      hasLlmsTxt: paths.has('llms.txt') || paths.has('public/llms.txt') || paths.has('.well-known/llms.txt'),
      hasLlmsFullTxt: paths.has('llms-full.txt') || paths.has('public/llms-full.txt'),
      hasFavicon: paths.has('favicon.ico') || paths.has('public/favicon.ico') || paths.has('app/favicon.ico'),
    };
  },

  // ── Create Branch ──────────────────────────────────────────────────────────
  async createBranch(owner, repo, baseBranch, newBranch, token) {
    if (!token) throw new Error('A GitHub Personal Access Token is required to create branches and commit files.');
    
    // 1. Get SHA of base branch
    const refRes = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}/git/ref/heads/${baseBranch}`, {
      headers: this.getHeaders(token),
    });
    if (!refRes.ok) {
      throw new Error(`Base branch "${baseBranch}" not found.`);
    }
    const refData = await refRes.json();
    const sha = refData.object.sha;

    // 2. Create new branch ref
    const createRes = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}/git/refs`, {
      method: 'POST',
      headers: this.getHeaders(token),
      body: JSON.stringify({
        ref: `refs/heads/${newBranch}`,
        sha,
      }),
    });

    if (!createRes.ok && createRes.status !== 422) {
      // 422 usually means branch already exists
      const err = await createRes.json().catch(() => ({}));
      throw new Error(err.message || `Failed to create branch "${newBranch}"`);
    }
    return { success: true, branch: newBranch, baseSha: sha };
  },

  // ── Commit Single File ─────────────────────────────────────────────────────
  async commitFile(owner, repo, branch, path, content, commitMessage, token) {
    if (!token) throw new Error('A GitHub Personal Access Token is required to commit files.');
    const cleanPath = path.replace(/^\//, '');

    // 1. Check if file exists to get current sha
    let existingSha = null;
    try {
      const checkRes = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}/contents/${cleanPath}?ref=${branch}`, {
        headers: this.getHeaders(token),
      });
      if (checkRes.ok) {
        const checkData = await checkRes.json();
        existingSha = checkData.sha;
      }
    } catch {
      // File does not exist yet, ignore
    }

    // 2. Put file contents
    const putRes = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}/contents/${cleanPath}`, {
      method: 'PUT',
      headers: this.getHeaders(token),
      body: JSON.stringify({
        message: commitMessage || `Update ${cleanPath} via RankTop AI`,
        content: utf8ToBase64(content),
        branch,
        ...(existingSha ? { sha: existingSha } : {}),
      }),
    });

    if (!putRes.ok) {
      const err = await putRes.json().catch(() => ({}));
      throw new Error(err.message || `Failed to commit file "${cleanPath}"`);
    }

    return putRes.json();
  },

  // ── Commit Multiple Files & Create Pull Request ────────────────────────────
  async dispatchPullRequest({
    owner,
    repo,
    baseBranch = 'main',
    branchName,
    title,
    body,
    files = [], // Array of { path, content }
    token,
  }) {
    if (!token) throw new Error('A GitHub Personal Access Token is required to dispatch Pull Requests.');
    if (!files.length) throw new Error('No files staged for Pull Request.');

    const prBranch = branchName || `ranktop/seo-boost-${Date.now().toString(36)}`;

    // 1. Create working branch
    await this.createBranch(owner, repo, baseBranch, prBranch, token);

    // 2. Commit each file to the new branch
    for (const file of files) {
      await this.commitFile(
        owner,
        repo,
        prBranch,
        file.path,
        file.content,
        file.message || `RankTop AI: Optimize ${file.path}`,
        token
      );
    }

    // 3. Open Pull Request
    const prRes = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}/pulls`, {
      method: 'POST',
      headers: this.getHeaders(token),
      body: JSON.stringify({
        title: title || '🚀 RankTop AI: SEO, AEO & GEO Structured Optimization Patch',
        body: body || `### 🤖 RankTop Autonomous Multi-Agent SEO Patch\n\nThis pull request includes automated technical SEO, JSON-LD schema markup, and generative engine optimization enhancements.\n\n- **Generated by:** RankTop AI Engine\n- **Target Branch:** \`${baseBranch}\`\n- **Optimized Files:** ${files.length}\n`,
        head: prBranch,
        base: baseBranch,
      }),
    });

    if (!prRes.ok) {
      const err = await prRes.json().catch(() => ({}));
      throw new Error(err.message || 'Failed to create Pull Request on GitHub.');
    }

    const prData = await prRes.json();
    return {
      success: true,
      prUrl: prData.html_url,
      prNumber: prData.number,
      branch: prBranch,
      title: prData.title,
    };
  },
};
