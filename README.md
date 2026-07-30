# Ayushi Rathore — Portfolio

A single-page developer portfolio built with **Next.js 14 (App Router)**,
**TypeScript**, and **Tailwind CSS**. The layout is styled like a code editor:
a file-explorer sidebar (`about.tsx`, `experience.ts`, `projects/`,
`skills.json`, `education.md`, `contact.sh`) that jumps to the matching
section.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy to Vercel

**Option A — Vercel CLI**
```bash
npm install -g vercel
vercel
```
Follow the prompts (link/create a project, accept the defaults — Vercel
auto-detects Next.js). Run `vercel --prod` to push to production.

**Option B — GitHub + Vercel dashboard (recommended)**
1. Push this folder to a new GitHub repo:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```
2. Go to https://vercel.com/new, import the repo, keep the default
   Next.js build settings, and click **Deploy**.

No environment variables are required.

## Editing content

All resume content (experience, projects, skills, education, contact info)
lives in plain arrays/objects at the top of `app/page.tsx` — update those and
the page re-renders automatically.
