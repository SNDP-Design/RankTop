// ── RankTop Backend URL Config ────────────────────────────────────────────────
// After deploying the backend to Render, paste your Render URL below.
// Example: 'https://ranktop-backend.onrender.com'
// Leave as empty string to use Gemini directly from the browser (no backend).

const DEFAULT_RENDER_BACKEND = 'https://ranktop-backend.onrender.com';
const BACKEND_URL = localStorage.getItem('RANKTOP_BACKEND_URL') || DEFAULT_RENDER_BACKEND;

export function getBackendUrl() {
  return BACKEND_URL;
}

export function isBackendConnected() {
  return Boolean(BACKEND_URL);
}

// Helper: call backend API or fall back gracefully
export async function backendPost(path, body) {
  const url = getBackendUrl();
  if (!url) throw new Error('Backend not configured');
  const res = await fetch(`${url}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    credentials: 'include',
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || 'Backend error');
  }
  return res.json();
}

export async function backendGet(path) {
  const url = getBackendUrl();
  if (!url) throw new Error('Backend not configured');
  const res = await fetch(`${url}${path}`, { credentials: 'include' });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || 'Backend error');
  }
  return res.json();
}
