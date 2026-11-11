# Typomatic - Customer Interest Registration Portal

An independent, public-facing website for prospective users, institutions, and businesses to express interest and apply for early access to **Typomatic** (টাইপোম্যাটিক).

---

## ⚡ Key Highlights

- **Lightweight & Standalone:** Standalone Vite 6 + React 19 + Tailwind CSS v4 project.
- **Fail-Closed Security Invariants:** Does not contain or expose any private Appwrite server API keys or database admin credentials in client-side bundles.
- **Synchronized Backend & Appwrite:** Submissions are securely verified and persisted directly into the central Appwrite database (`ustad_pro_db` collection `interest_requests`) via the production control backend (`https://voice-api.trustedsubstore.com`).
- **Admin Workflow Integration:** Submitted requests appear live in the Typomatic Desktop & Web Admin Console (`Pending Requests`), enabling one-click customer onboarding, trial provisioning, and license generation.
- **Bilingual Interface:** Full Bengali (বাংলা) and English support with responsive desktop and mobile layouts.
- **Spam & Abuse Protection:** Built-in hidden honeypot validation, rate limiting, and client-side verification.

---

## 🚀 Quick Start (Local Development)

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` (or configure your backend URL):
```env
VITE_CONTROL_API_ORIGIN=https://voice-api.trustedsubstore.com
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🏗️ Production Build

To create an optimized production build:
```bash
npm run build
```
The output files will be generated in `dist/`.

To preview the production build locally:
```bash
npm run preview
```

---

## 🌐 Hosting & Deployment Guide

This project can be deployed separately to any static hosting provider.

### Option 1: Vercel (Recommended)

1. **Deploying directly with Vercel CLI:**
   ```bash
   cd registration-portal
   npx vercel
   # For production:
   npx vercel --prod
   ```
2. **Deploying via GitHub / Git Repository:**
   - If importing this monorepo into Vercel, set the **Root Directory** setting to `registration-portal`.
   - If pushed as an independent repository, Vercel will auto-detect Vite and use `npm run build` with output directory `dist`.
   - Add environment variable `VITE_CONTROL_API_ORIGIN` = `https://voice-api.trustedsubstore.com`.

### Option 2: Netlify

1. `netlify.toml` is pre-configured with SPA redirects and security headers.
2. Link your Git repository on Netlify.
3. Set **Base directory** to `registration-portal` (if in monorepo) or root.
4. Set build command: `npm run build` and publish directory: `dist`.
5. Set environment variable: `VITE_CONTROL_API_ORIGIN=https://voice-api.trustedsubstore.com`.

### Option 3: Cloudflare Pages

1. Create a new Cloudflare Pages project from your Git repository.
2. Set build command: `npm run build`.
3. Set build output directory: `dist`.
4. Set environment variable: `VITE_CONTROL_API_ORIGIN=https://voice-api.trustedsubstore.com`.

---

## 🔄 Backend & Appwrite Synchronization Architecture

```
[ Prospective User / Client ]
             │
             ▼
[ Registration Portal Website ]  <-- Hosted separately (Vercel/Netlify)
             │
      POST /v1/public/register-interest
             │
             ▼
[ Typomatic Control Backend ]    (https://voice-api.trustedsubstore.com)
  - Rate Limiting (IP-based)
  - Honeypot Spam Check
  - Payload Sanitization
  - Duplicate Prevention Check
             │
             ▼
[ Appwrite Database: ustad_pro ]
  - Collection: interest_requests
             │
             ▼
[ Admin Console (Desktop / Web) ]
  - Pending Requests View
  - 1-Click License & Customer Provisioning
```

