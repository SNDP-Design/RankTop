# RankTop AI — Autonomous Agent Backend Setup Guide

This guide walks you through deploying your 24/7 backend server to **Render** or **Railway** for free. Once deployed, your RankTop AI engine becomes fully autonomous — running weekly SEO audits, sending email reports, and auto-publishing to WordPress!

---

## 🚀 Step 1: Deploy to Render (Recommended — Free & Always On)

1. Go to **[render.com](https://render.com)** and sign in with GitHub.
2. Click **New +** → **Web Service**.
3. Connect your GitHub repository: **`SNDP-Design/RankTop`**.
4. Configure service settings:
   - **Name:** `ranktop-backend`
   - **Root Directory:** `backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Instance Type:** `Free`
5. Add your Environment Variables (see Step 2).
6. Click **Create Web Service**. Render will deploy your backend and give you a public HTTPS URL (e.g. `https://ranktop-backend.onrender.com`).
7. Copy your Render URL and paste it into the **AI Swarm Orchestrator** tab in RankTop!

---

## 🔑 Step 2: Environment Variables List

Set these variables in your Render/Railway dashboard:

| Variable Name | Description | Where to Get It |
|---|---|---|
| `GEMINI_API_KEY` | Your Gemini API Key | [aistudio.google.com/apikey](https://aistudio.google.com/apikey) |
| `FRONTEND_URL` | Live Frontend URL | `https://sndp-design.github.io` |
| `BACKEND_URL` | Your Render backend URL | `https://ranktop-backend.onrender.com` |
| `SESSION_SECRET` | Secret key for cookies | Any 32-character random string |
| `GMAIL_USER` | Your Gmail address | `yourname@gmail.com` |
| `GOOGLE_CLIENT_ID` | OAuth Client ID | See Step 3 below |
| `GOOGLE_CLIENT_SECRET` | OAuth Client Secret | See Step 3 below |
| `GMAIL_REFRESH_TOKEN` | OAuth Refresh Token for email | See Step 3 below |

---

## 📧 Step 3: Setup Gmail & Google Search Console OAuth2

1. Go to **[console.cloud.google.com](https://console.cloud.google.com)** and create a project named **RankTop**.
2. Go to **APIs & Services → Library**:
   - Search for **Google Search Console API** → Click **Enable**
   - Search for **Gmail API** → Click **Enable**
3. Go to **APIs & Services → Credentials → Create Credentials → OAuth 2.0 Client ID**:
   - Application Type: **Web Application**
   - Name: `RankTop Backend`
   - Authorized Redirect URIs:
     - `https://developers.google.com/oauthplayground`
     - `https://ranktop-backend.onrender.com/api/gsc/callback`
   - Copy your **Client ID** and **Client Secret**.
4. To get your `GMAIL_REFRESH_TOKEN`:
   - Open **[developers.google.com/oauthplayground](https://developers.google.com/oauthplayground)**
   - Click the ⚙️ gear icon (top right) → Check **"Use your own OAuth credentials"** → Paste your Client ID and Client Secret.
   - In the left scope box, scroll to **Gmail API v1** → select `https://mail.google.com/`.
   - Click **Authorize APIs** → Sign in with your Gmail → Click **Exchange authorization code for tokens**.
   - Copy the generated **Refresh token**.

---

## 📝 Step 4: WordPress Auto-Publish Setup

To let RankTop auto-publish generated articles to your WordPress site:

1. Log into your WordPress admin dashboard (`https://yourblog.com/wp-admin`).
2. Go to **Users → Profile**.
3. Scroll down to **Application Passwords**.
4. Enter a name (e.g. `RankTop AI`) → Click **Add New Application Password**.
5. Copy the 24-character generated password (e.g. `xxxx xxxx xxxx xxxx`).
6. Paste your WordPress site URL, Username, and Application Password in RankTop's **AI Swarm** tab under *WordPress Auto-Publishing Integration*.

---

## ⏰ Step 5: Autonomous Schedule & Keep Alive

1. The backend automatically runs a weekly cron job **every Monday at 9:00 AM** to re-analyze your site and email you a diff report.
2. To keep Render's free tier from sleeping, set up a free 5-minute ping at **[uptimerobot.com](https://uptimerobot.com)** targeting your `/health` endpoint:  
   `https://ranktop-backend.onrender.com/health`

Enjoy your fully autonomous AI SEO engine! 🚀
