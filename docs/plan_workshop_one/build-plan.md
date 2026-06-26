# Build Plan — Future RM Clickable Mockup (CIB / BCB)

**Goal:** A clickable React prototype that walks senior leadership through the future RM experience, end to end, using the Germany-expansion scenario. Desktop + mobile views.

**Audience:** Senior leadership / exec pitch — story-first, polished, vision-led.

---

## 1. Decisions (locked)

| Decision | Choice |
|---|---|
| Scenes | Consent gate → Live in-meeting prompts → Post-meeting CRM summary → Agent bench → Opportunity radar → Relationship graph |
| Form factor split | **Mobile** = consent + in-meeting moment · **Desktop** = CRM cockpit, agent bench, radar, relationship graph |
| Fidelity | Clickable prototype, scripted flow (advance step by step) |
| Branding | **Lloyds app design language** (from `/assets` screenshots) — dark theme, lime-green accent, pill buttons, rounded cards. *Illustrative only* — no trademarked horse logo; stylised placeholder mark instead. |
| Stack | Vite + React + TypeScript + Tailwind |
| Package manager | **pnpm** (faster installs, lighter disk footprint) |
| Hosting | Web-hosted. **Mobile experience as a PWA** (installable, offline shell). |
| Audience scope | **One unified RM platform serving both CIB and BCB.** Germany-expansion scenario as the worked example; small segment tag so both audiences see themselves. |
| Data | All mocked / static (no backend, no real client data) |
| Form factor | One device shown at a time (no side-by-side). |

---

## 2. Experience structure

A single app with a **device frame** (phone or laptop) and a **scene navigator** (Prev / Next + scene list). A scripted narrative drives the demo.

### Mobile track (in the meeting — phone in hand)
1. **Consent gate** — "Consent on file ✓" or "Remind me to ask" → if declined, fallback banner (recording off, notes mode).
2. **Live moment** — transcript ticker of the Germany line → detection chips appear (need, risk, product, urgency, emotion) → subtle prompt card slides up (insight + rationale + suggested action).

### Desktop track (back at the desk — the cockpit)
3. **Post-meeting summary** — auto-generated: key moments, opportunities, actions, client email draft (ready to approve).
4. **Agent bench** — 3 tiers (autonomous / human-in-loop / RM-only) with live status chips; approve buttons on Tier 2 items.
5. **Opportunity radar** — book-wide proactive triggers ("reason to call today") with priority + rationale.
6. **Relationship graph** — network map + health score + single-thread risk callout.

---

## 3. Architecture

```
src/
  main.tsx
  App.tsx                  # device frame + scene router + narrative controls
  data/
    scenario.ts            # the scripted Germany-expansion data (single source of truth)
  components/
    DeviceFrame.tsx        # phone / laptop chrome, toggle
    SceneNav.tsx           # prev/next, scene list, progress
    brand/                 # LBG-illustrative tokens, wordmark, colours
  scenes/
    mobile/
      ConsentGate.tsx
      LiveMoment.tsx
    desktop/
      PostMeetingSummary.tsx
      AgentBench.tsx
      OpportunityRadar.tsx
      RelationshipGraph.tsx
  ui/                      # shared primitives (Card, Chip, PromptCard, StatusPill, Avatar)
  styles/
    theme.css              # LBG-illustrative palette as CSS vars + Tailwind config
```

**Principles**
- One `scenario.ts` feeds every scene so the story stays consistent.
- No real logos / no real client data — clearly illustrative.
- Each scene self-contained; navigator orchestrates order.
- Responsive, but device frame makes the mobile/desktop intent explicit.

---

## 4. Visual language (Lloyds app design, from `/assets`)

Extracted from the two Lloyds screenshots:

| Token | Value (approx, illustrative) |
|---|---|
| Background | Near-black `#0A0A0A` |
| Surface / cards | Dark grey `#1B1B1B`, radius ~16px |
| Primary accent | Bright lime green `#00D43D` |
| Welcome/brand green | Deep green `#0E5E43` with concentric arcs |
| Text | White `#FFFFFF` / muted grey `#9A9A9A` |
| Primary button | Pill, full radius (black-on-green or green-on-dark) |
| Tabs | Pill; active = green fill + dark text, inactive = grey outline |
| Bottom nav | Line icons + labels, active = green |
| Icon chips | Pastel circles (pink / purple / teal) behind line icons |
| Type | Bold geometric / rounded sans |

- Stylised placeholder mark (no trademarked horse logo) + "illustrative concept" tag.
- Subtle motion for prompts/chips appearing.
- Accessibility: legible contrast, keyboard-navigable controls.

---

## 4a. Step-by-step plan (approval-gated)

> Each step is built only after you approve it. After each step you can run it locally and review before we continue.

| Step | What gets built | You'll be able to |
|---|---|---|
| **1. Design tokens + brand** | Tailwind theme from the Lloyds palette, fonts, placeholder mark, base styles | Review the look/feel tokens |
| **2. Scaffold + shell** | Vite + React + TS + Tailwind project (via pnpm), PWA config, device frame (phone/laptop) + scene navigator | Run `pnpm dev` and see the empty shell |
| **3. Scenario data + UI kit** | `scenario.ts` + shared components (Card, Pill, PromptCard, Chip, BottomNav, StatusPill) | Review the building blocks |
| **4. Mobile · Consent gate** | Lloyds welcome-style consent screen + reminder + decline fallback | Click through the opener |
| **5. Mobile · Live moment (hero)** | Transcript ticker → detection chips → subtle prompt card | See the signature "moment" |
| **6. Desktop · Post-meeting summary** | Auto-summary: key moments, opportunities, actions, email draft | Review the CRM cockpit |
| **7. Desktop · Agent bench** | 3 tiers, live status, approve buttons on Tier 2 | See RM-as-orchestrator |
| **8. Desktop · Opportunity radar** | Book-wide triggers with priority + rationale | See proactive origination |
| **9. Desktop · Relationship graph** | Network map + health score + single-thread risk | See relationship intelligence |
| **10. PWA + deploy prep** | Manifest, icons, offline shell, production build + hosting guidance | Install as PWA, get deploy steps |

---

## 5. Build phases

| Phase | Deliverable |
|---|---|
| **0. Scaffold** | Vite + React + TS + Tailwind project runs locally; theme + device frame + nav shell |
| **1. Data + UI kit** | `scenario.ts` + shared primitives (Card, Chip, PromptCard, StatusPill) |
| **2. Mobile track** | Consent gate + Live moment (the hero "wow") |
| **3. Desktop track** | Post-meeting summary + Agent bench |
| **4. Proactive track** | Opportunity radar + Relationship graph |
| **5. Polish** | Transitions, narrative pacing, consent-fallback branch, demo-ready pass |

---

## 6. How we run it

- `pnpm install` then `pnpm dev` → opens locally in the browser.
- Present full-screen; use Next/Prev (or arrow keys) to walk the story.
- Toggle device frame to switch the "in-meeting phone" vs "desk cockpit" narrative.

---

## 7. Resolved decisions

- **Scope:** unified platform for **both CIB and BCB** RMs (segment tag, single build).
- **Scene order:** chronological (consent → moment → summary → bench → radar → graph).
- **Form factor:** one device at a time (no side-by-side).
- **Hosting:** web-hosted; mobile experience as an installable **PWA**.
- **Branding:** Lloyds app design language from `/assets` (illustrative, no trademarked logo).
- **Interactivity:** clickable only for v1 (auto-play optional later).

---

## 8. Out of scope (v1)

- Real backend, live transcription, real ML/detection.
- Real integrations (CRM, market data).
- Authentication, multi-user, persistence.
- Pricing engine, real deal docs.
