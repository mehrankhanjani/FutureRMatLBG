# Future RM — CIB Relationship (Concept)

A clickable, presenter-led prototype of the **future Relationship Manager (RM) experience**
for Lloyds Banking Group **CIB & BCB**. It walks an audience through a single, realistic
client story — from a live client meeting on mobile, to the AI-assisted follow-up and
proactive opportunity surfacing back at the desk.

> ⚠️ **Concept demo only.** This is an illustrative prototype for discussion. All clients,
> contacts, figures and signals are fictional. It is not connected to any real system or data.

---

## What it shows

The demo is a guided storyboard of **7 scenes** across two devices, following RM *James Okafor*
and his client *Avonmore Components Ltd* (CFO *Sarah Whitfield*).

| # | Scene | Device | Idea |
|---|-------|--------|------|
| 1 | Consent gate | Mobile | Start of meeting — consent on file or a prompt to ask, with a graceful no-recording fallback. |
| 2 | Live moment | Mobile | Real-time transcription detects a need ("Germany expansion") and suggests an in-the-moment prompt. |
| 3 | Post-meeting summary | Desktop | Summary, actions and a drafted follow-up email written automatically; CRM updated. |
| 4 | Agent bench | Desktop | What the AI did autonomously, what's waiting for the RM's approval, and what only the RM can do. |
| 5 | Opportunity radar | Desktop | Book-wide proactive triggers from meetings, filings and market signals — each one explainable. |
| 6 | Relationship graph | Desktop | Contact map, relationship-health score, single-thread risk and white-space to cover. |

Navigate with the on-screen list, the Prev/Next buttons, or the **← / → arrow keys**.

---

## Tech stack

- **React 19** + **TypeScript**
- **Vite** (dev server + production build)
- **Tailwind CSS v4** (via `@tailwindcss/vite`; design tokens in [app/src/index.css](app/src/index.css))
- **vite-plugin-pwa** — installable, offline-capable Progressive Web App
- Font: *Plus Jakarta Sans*

All demo content lives in a single source of truth: [app/src/data/scenario.ts](app/src/data/scenario.ts).

---

## Repository layout

```
poc/
├─ app/                  # the React prototype
│  ├─ public/            # logo, icons, PWA assets
│  └─ src/
│     ├─ App.tsx         # shell + scene orchestration + keyboard nav
│     ├─ data/           # scenario.ts — single source of truth for all demo content
│     ├─ scenes/         # the 7 scenes (mobile/ + desktop/) and the scene registry
│     ├─ components/     # device frames, brand mark, scene navigator
│     └─ ui/             # primitives (cards, chips, pills) and icons
├─ assets/               # source design assets
├─ docs/                 # supporting documentation
└─ backlog.txt           # build plan / notes
```

---

## Running locally

> Requires **Node.js** and **pnpm**. Run all commands from the `app/` directory.

```powershell
cd app
pnpm install      # first time only
pnpm dev          # dev server → http://localhost:5173/
```

### Production build & preview

```powershell
pnpm build        # outputs an optimised static site to app/dist/
pnpm preview      # serves the production build → http://localhost:4173/
```

---

## Deploying

`app/dist/` is a self-contained **static single-page app** — no server-side code and no
routing rewrites required. Host it on any static host (Azure Static Web Apps, Netlify,
GitHub Pages, or an internal static server).

- If you deploy at a **domain root**, no changes are needed.
- If you deploy under a **sub-path** (e.g. `…/future-rm/`), set `base: '/future-rm/'`
  in [app/vite.config.ts](app/vite.config.ts) and rebuild.

Because it's a PWA, it can also be **installed** to a desktop or phone home screen and
launched offline.
