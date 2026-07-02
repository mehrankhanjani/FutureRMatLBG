# In-Workshop Build Plan — Iteration 5

Live build plan for the next iteration of the mockup, captured during the
workshop. Items are added incrementally as inputs come in. Following the same
pattern as previous cuts: the prior iteration is frozen and untouched; the new
iteration (v5) forks into its own folder under `app/src/versions/v5/`,
overriding only what changes.

---

## Build overview — what we modify vs what we add

Iteration 5 turns the workshop feedback into three kinds of work: a
**cross-cutting trust layer** that touches every scene, **modifications** to the
existing scenes, and **net-new** components and views. The single biggest rework
is turning **Orchestrate** into an *origination control centre*; the second is a
shift away from a linear scene sequence toward a more **exploratory,
hub-and-spoke** experience.

### Cross-cutting layer — build once, apply to every scene
| Pattern | Feedback refs | What it is |
|---|---|---|
| **Reasoning · "Why this?"** | S7, Q4, O19, D10 | An expander on every AI output showing the signals, data and rules behind it. Extends the existing explain-mode / Help system. |
| **Source · freshness · confidence** | O9, Q4/Q5, I9/I11 | A metadata chip: source, last-updated, confidence, "requires review". |
| **Ownership tags** | O5 | RM / Agent / Client / Service / Product / Risk-approval / System / Awaiting-client, on tasks, stages and blockers. |
| **Manual vs automated** | O10 | Auto-captured / manual / AI-suggested / RM-confirmed / system-updated / pending-validation labels. |
| **Human-in-the-loop** | S3, Q9, O8 | Confirm / edit / reject (and override) on AI content before it enters the record. |
| **Consent · privacy · visibility** | O11/O12 | Internal-only / client-visible / restricted / consent / transcript badges + client-visibility settings. |
| **Configurable alerts & nudges** | I19, O6, D8 | User-tunable filters + a nudge → escalation model to prevent overload. |

### What we modify — existing scenes
| Scene | Component | Key modifications |
|---|---|---|
| 1 · Ignition | Identify | Credit limits/appetite/risk (I13), related opportunities (I4), operational metrics (I14) |
| 2 · Relationship intelligence | Identify | Teams & permissions (I6), sector relationship map (I7), coverage gaps (I8), multi-source interactions (I11), dormant flag (I2) |
| 3 · Activate + 4 · Live Moment | Qualify | Richer context (Q1), proactive prep/NBA (Q2), auto multi-source capture (Q3), confidence & appetite (Q5), approvals (Q6), portfolio/RWA (Q7), collaboration (Q8) |
| 5 · Structure Deal | Shape | Solutioning (S1), precedent (S2), override (S3), rules editor (S4), security (S5), pricing (S6) |
| 6 · Post-meeting | Orchestrate | Rename CRM→Record (I9), explicit capture flow (O7), RM validation (O8), decision log (O18), evidence (O19) |
| 7 · Agent Bench | Orchestrate | **Reframe as origination control centre** — overview header, journey timeline, NBAs, blockers, health, activity feed, drill-downs, readiness, missing-info, simplified layout (O1–O6, O13–O17, O20) |
| 8 · Radar | Identify | Missing opportunities/pricing (I1), pipeline horizon (I5), configurable alerts (I19), dormant clients (I2) |
| 9 · Unified platform | Deepen | Hub-and-spoke (D2), connected portfolio/sector/client (D3), health vs KPIs (D6), automated capture (D4) |
| 10 · Relationship review | Deepen | Sentiment/behavioural signals (D1), hidden risks (D5), external intelligence (D9), guidance/queues (D11), institutional knowledge (D7) |

### What we add — net-new
- **Scaffolding:** v5 fork + two-pill iteration toggle (Item 1).
- **Orchestrate control centre (new panels):** opportunity overview header ·
  origination journey timeline · next-best-actions panel · blockers &
  dependencies · activity feed · stage drill-downs · missing-info prompts ·
  decision log · readiness checklist · health indicators.
- **Identify (new):** sector relationship map · pipeline horizon
  (month/quarter/year) · missing-opportunity/pricing "gaps" lens · personas
  (Credit Journey, leadership MD/Regional Head, RM metrics) · leadership
  chatbots · reporting & export (shareable dashboards, exec-ready reports) ·
  exploratory "research a sector" mode.
- **Deepen (new):** hub-and-spoke journey visualisation · connected
  portfolio/sector/client view · portfolio-health KPI dashboard ·
  institutional-knowledge / best-practice library · external
  market/sector/peer intelligence · sentiment & behavioural signal surfacing.

### Structural decisions (resolved)

1. **Navigation — keep the linear flow, keep it simple.** v5 stays with the
   scripted step-through flow (currently 10 scenes). New steps may be added
   where a piece of feedback genuinely needs its own beat, but we are **not**
   restructuring into a hub-and-spoke or free-explore shell — simplicity wins.
   The three items that pushed toward exploration are reinterpreted to fit
   *within* the flow:
   - **I20 (less linear / research a sector)** → delivered as richer,
     insight-led *content* inside existing scenes (or at most one new step),
     not a navigation change.
   - **D2 (hub-and-spoke journey)** → delivered as an in-scene *visual* (a
     journey / relationship map on a scene such as Unified Platform or
     Relationship Intelligence), not the app's navigation model.
   - **D3 (connected portfolio / sector / client)** → delivered as context
     panels or links within scenes, not zoomable levels.

2. **Roles — single RM lens with a preview-only persona chip.** v5 is built as
   Daisy's RM view. A persona/account chip in the top bar shows the signed-in
   role and lists the others (MD, Regional Head, Credit, Product, Service) as
   *preview only*, each with a one-line note on what that view would emphasise.
   See **Item 2**. Serves the personas feedback (I15–I18) without building five
   separate views.

---

## Item 1 — Bring back the iteration toggle (Iteration 4 + Iteration 5 only)

**Goal:** Re-enable the version switcher in the top bar, but scope it to only
two cuts — the current Iteration 4 and the new Iteration 5 being built in this
workshop. Earlier iterations (v1–v3) stay in the codebase but are not shown in
the switcher.

**What changes:**

- Re-enable the switcher: set `SHOW_SWITCHER = true` in
  [app/src/versions/registry.ts](../../app/src/versions/registry.ts).
- Scope the switcher to only Iteration 4 and Iteration 5. Rather than showing
  the full `versions` array (v1–v5), pass a filtered list containing just `v4`
  and `v5` to `VersionSwitcher` (or add a `SWITCHER_VERSION_IDS` allowlist to
  the registry so the displayed set is explicit).
- Scaffold **v5** as a new fork following the v3 → v4 pattern:
  `app/src/versions/v5/` with its own `index.ts` (id: `'v5'`,
  label: `'Iteration 5'`), `scenes.tsx`, and `desktop/` / `mobile/` override
  folders. Register `v5` in the `versions` array in `registry.ts`.
- Set `DEFAULT_VERSION_ID = 'v5'` so the new cut loads by default, with
  Iteration 4 available via the toggle for comparison.
- No locked pills needed in the two-item switcher (drop `v1` from the shown
  set); keep `LOCKED_VERSION_IDS` only if earlier cuts are ever re-exposed.

**Deliverable:** The top bar shows a two-pill toggle — "Iteration 4" and
"Iteration 5" — that flips between the two cuts. v5 loads by default and starts
as a copy/fork of v4, ready to receive the changes captured in the items below.

---

## Item 2 — Persona / role chip (single RM lens, others preview-only)

**Goal:** Signal that the platform is role-aware and personalised while keeping
the build to Daisy's RM lens only (per the resolved roles decision).

**What changes:**

- Evolve the header subtext "Daisy Bennett · personalised workspace"
  ([app/src/App.tsx](../../app/src/App.tsx#L122)) into an interactive
  persona/account chip — avatar + "Daisy Bennett — Relationship Manager".
- Clicking it opens a dropdown listing the other roles — MD, Regional Head,
  Credit, Product, Service — each with a one-line "what this view emphasises"
  and marked **preview only** (not selectable, so nothing looks broken in the
  demo).
- Optional: a subtle "RM view" badge on the one or two panels that would differ
  most by role.

**Deliverable:** A top-bar persona chip that reads as a real sign-in, makes the
personalisation and role-awareness explicit, and banks the personas feedback
(I15–I18) without building additional role views.

---

# Feedback by component

Workshop feedback for Iteration 5 is organised by the five RM-journey
components — **Identify → Qualify → Shape → Orchestrate → Deepen** — so each
component owns the feedback for its scene(s) in the v5 flow. Scene numbers refer
to the current 10-scene order.

| Component | Owning scene(s) | Scene # |
|---|---|:--:|
| Identify | Opportunity ignition · Relationship intelligence · Portfolio radar | 1, 2, 8 |
| Qualify | Activate intelligence · Live client moment | 3, 4 |
| Shape | Deal structuring & win strategy | 5 |
| Orchestrate | Post-meeting momentum · Agent bench & orchestration | 6, 7 |
| Deepen | Unified platform · Relationship review & next cycle | 9, 10 |

---

## Identify the need — Scenes 1, 2 & 8 · "Ignition · Relationship intelligence · Portfolio radar"

**Owning scenes:** Scene 1 `ignition` —
[app/src/versions/v4/desktop/OpportunityIgnition.tsx](../../app/src/versions/v4/desktop/OpportunityIgnition.tsx) ·
Scene 2 `relationship` —
[app/src/versions/v3/desktop/RelationshipIntelligence.tsx](../../app/src/versions/v3/desktop/RelationshipIntelligence.tsx) ·
Scene 8 `scale` —
[app/src/versions/v3/desktop/OpportunityRadar.tsx](../../app/src/versions/v3/desktop/OpportunityRadar.tsx).
Scenario data in
[app/src/versions/v3/scenario.ts](../../app/src/versions/v3/scenario.ts).

**Baseline today:** Ignition surfaces one qualified opportunity (value, appetite,
pre-qualification checks, coverage/ownership, peer benchmark). Relationship
intelligence shows a group network map, multi-channel interaction history and a
sentiment trend. Radar shows a portfolio scorecard, a collapsed smart-filter
digest and ranked signals with data-horizon labels and a product-suggests card.

**Feedback to build:**

### Opportunities
- **I1 · Missing opportunities & missing pricing** — surface what is *not*
  there: opportunities that should exist but were never captured, and
  records/deals missing pricing information. Add a "gaps" lens to Radar (Scene 8)
  flagging white-space and incomplete records.
- **I2 · Dormant clients / no follow-on** — highlight clients where work has
  been completed but no active relationship or follow-on opportunity exists
  (example: HSBC). A "dormant / re-engage" flag on Radar and Relationship
  intelligence.
- **I3 · Centralised opportunity record for new-to-bank** — a shared opportunity
  record for new-to-bank clients, visible across teams. Extends Ignition's
  coverage/ownership card into a cross-team record.
- **I4 · Related opportunities & relevant deals** — show related opportunities
  and comparable deals for broader client context (this is *context*, distinct
  from Shape's S2 precedent-for-structuring). Add to Ignition / Relationship
  intelligence.
- **I5 · Pipeline horizon** — upcoming opportunities and pipeline priorities for
  the next month, quarter and year. Add a time-phased pipeline view to Radar.

### Relationship intelligence
- **I6 · Expand the Relationship section** — show key stakeholders and
  relationship strength (strength exists today), *which teams* hold
  relationships with the client, and the information / control permissions
  available to different users.
- **I7 · Relationship map** — extend the network map from group-level to
  sector-level: key players in the sector, where relationships already exist,
  potential relationship gaps (white-space), and suggested contacts /
  introductions.
- **I8 · Sector intelligence & portfolio insights** — surface sector-level
  intelligence and portfolio insight, highlighting where relationship coverage
  may be missing.

### Workflow & data capture
- **I9 · "CRM Updated" → "Record Updated"** — reflect a broader source of truth.
  The label lives in the Post-meeting scene
  ([PostMeetingSummary.tsx](../../app/src/versions/v3/desktop/PostMeetingSummary.tsx#L51),
  Orchestrate) — the wording change lands there and anywhere else "CRM" is
  surfaced.
- **I10 · Workflow status visibility** — clear visibility of workflow status:
  where an item currently sits in the process. Builds on the existing
  `dealStage` strip.
- **I11 · Multi-source interaction capture** — capture interactions from email,
  text conversations, Teams chats and other digital messaging channels.
  Relationship intelligence's interaction history already covers
  meeting/call/email/CRM/Teams — add text/messaging channels.
- **I12 · Capture low-CRM-adoption teams** — ensure interactions from Portfolio
  Management and Risk Management are captured even where CRM adoption is low.

### Client & credit insights
- **I13 · Credit limits, appetite & risk** — include credit limits, appetite and
  risk considerations. Ignition already shows appetite/qualification — extend
  with limits and risk.
- **I14 · Operational metrics & product activity** — surface product
  changes/switches and service interactions alongside the opportunity view.

### Personas & user views
- **I15 · Credit Journey persona** — context on the client's progression through
  the credit process.
- **I16 · Leadership personas** — MD, Regional Head, etc., each surfacing the
  information most relevant to that role.
- **I17 · Leadership chatbots** — tailored assistants for leadership, enabling
  role-specific insight and decision-support views.
- **I18 · RM metrics** — RM-relevant metrics for day-to-day client management.

### Alerts, nudges & insights
- **I19 · Configurable alerts to prevent overload** — alerts and nudges are
  valuable but can overwhelm. Add user-configurable filters and prioritisation
  so only the most relevant surface (extends Radar's smart-filter digest with
  user config).

### Reporting & experience
- **I20 · Less linear, more insight-led** — the concept feels linear; make it
  dynamic and exploratory so users can research a sector and explore
  opportunities and relationships freely, rather than following a fixed scene
  sequence.
- **I21 · Generate shareable outputs** — produce shareable reports/dashboards
  from the research and insight.
- **I22 · Executive-ready reporting** — seamlessly convert research and insights
  into executive-ready reporting and stakeholder communications.

---

## Qualify the opportunity — Scenes 3 & 4 · "Activate intelligence · Live client moment"

**Owning scenes:** Scene 3 `activate` —
[app/src/versions/v3/mobile/ConsentGate.tsx](../../app/src/versions/v3/mobile/ConsentGate.tsx) ·
Scene 4 `shape` —
[app/src/versions/v2/mobile/LiveMoment.tsx](../../app/src/versions/v2/mobile/LiveMoment.tsx).
Scenario data in
[app/src/versions/v3/scenario.ts](../../app/src/versions/v3/scenario.ts).

**Baseline today:** Activate handles consent then live on-device capture (with a
handwritten-notes fallback when consent is declined). Live Moment plays a live
transcript, classifies signals (need / risk / opportunity / context / emotion)
and surfaces in-the-moment prompt cards.

**Design principles (apply across the component):** proactive, explainable,
decision-oriented, collaborative — focused on *progressing* the opportunity,
not gathering information.

**Feedback to build (9 items):**
- **Q1 · Richer contextual intelligence** — bring client interactions,
  communications, sector insights and relationship history into prep and the
  live moment, not just the current conversation.
- **Q2 · Proactive prep & next-best actions** — lead with prepared
  recommendations and NBAs, rather than reactive information retrieval.
- **Q3 · Automatic multi-source capture** — capture client needs, rationale and
  decision signals automatically from multiple input sources (transcript, notes,
  email, CRM).
- **Q4 · Source attribution & explainability** — every insight and recommendation
  shows where it came from and why (cross-cutting reasoning + source layer).
- **Q5 · Confidence & appetite alignment** — confidence scoring, qualification
  rationale and appetite alignment across client, business, credit and risk.
- **Q6 · Transparent approvals & governance** — make approval requirements,
  thresholds and governance pathways visible during qualification.
- **Q7 · Portfolio / risk / RWA lens** — support portfolio, risk and RWA
  considerations at qualification time.
- **Q8 · Cross-team collaboration** — seamless collaboration across RMs, product
  specialists, credit and risk.
- **Q9 · Human judgement & oversight** — balance AI recommendations with human
  judgement (cross-cutting HITL layer).

---

## Shape the proposition — Scene 5 · "Deal structuring & win strategy"

**Owning scene:** `structure` —
[app/src/versions/v4/desktop/StructureDeal.tsx](../../app/src/versions/v4/desktop/StructureDeal.tsx)
(v5 forks this). Scenario data lives in
[app/src/versions/v3/scenario.ts](../../app/src/versions/v3/scenario.ts)
(`structureOptions`, `dealStructure`, `structureEligibility`, `productSpecialist`,
`creditEscalation`).

**Baseline today:** three structure options (lean / recommended / stretch),
draft-mode toggle (exploring / committed), per-option eligibility chips,
product-specialist loop-in, deal economics and a credit-escalation track.

**Feedback to build (7 items):**

### S1 — Deal solutioning enabler (best-fit product, not just structure)
Add an enabler *upstream* of structuring that turns the confirmed need into the
best-fit product. Example: the client wants "lending" — the enabler recommends
*which* lending product fits best (e.g. RCF vs term loan vs asset-based lending),
with rationale. Today the scene jumps straight to three *structures*; solutioning
is the missing "which product" decision that precedes it. Add a "Recommended
solution" card and a `solutionOptions` set to the scenario feeding it.

### S2 — Peer / precedent review across the bank
Surface best practice from other RMs who structured *similar* deals — a
"how comparable deals were structured" reference so the RM can learn from
precedent across the bank. Add a `precedentDeals` set (comparable deal, structure
used, outcome) feeding a new "Similar deals across the bank" card.

### S3 — Human override on solutioning & structuring
Let the RM amend the AI-proposed solution and structure — the enablers propose,
the human can adjust product mix, components and terms before committing. Add
edit affordances to the solution and structure cards and an "Amended by RM"
state so the override is visible. Reinforces human-in-the-loop.

### S4 — Business-rules / logic editor for teams
A simple UI for product/credit teams to view and update the logic and business
rules that drive the solutioning and structuring outputs (eligibility
thresholds, product-fit rules, pricing floors). In the demo this is a
representative "Rules & logic" panel showing which rules fired with an "Edit
rule" affordance — a governance/maintainability surface distinct from the
RM-facing flow.

### S5 — Likely security / collateral suggestions
Add suggested security requirements per structure option — the likely collateral
package (e.g. debenture, property charge, cross-guarantees across the group)
with rationale. Add a `security` field to each structure option feeding a
"Likely security" card.

### S6 — Pricing integrated in the same view
Bring pricing (ePricer / EPC) into the StructureDeal view alongside economics
rather than as a separate step — indicative price, margin and fees update live
as the structure changes. Extend the existing economics card into an integrated
pricing view driven by the selected option.

### S7 — Show the agent's reasoning on every enabler (cross-cutting)
For **all** enablers in the scene (solutioning, structuring, eligibility,
security, pricing), expose how the agent got there — the signals, data and rules
behind each output — to keep the human in the loop. Extend the existing
explain-mode / help system
([app/src/versions/v3/help](../../app/src/versions/v3/help), `helpId` props,
`ExplainToggle`) so each enabler card carries a "Why this?" / reasoning expander.
*Likely a pattern to apply across every component, not just Shape.*

---

## Orchestrate origination — Scenes 6 & 7 · "Post-meeting momentum · Agent bench & orchestration"

**Owning scenes:** Scene 6 `capture` —
[app/src/versions/v3/desktop/PostMeetingSummary.tsx](../../app/src/versions/v3/desktop/PostMeetingSummary.tsx) ·
Scene 7 `orchestrate` —
[app/src/versions/v3/desktop/AgentBench.tsx](../../app/src/versions/v3/desktop/AgentBench.tsx).
Scenario data in
[app/src/versions/v3/scenario.ts](../../app/src/versions/v3/scenario.ts).

**Overall direction:** rework these scenes so they feel less like a static
dashboard and more like an **origination control centre** — showing where an
opportunity is, what has happened, what is blocking progress, who owns the next
step, and what action moves it forward.

**Baseline today:** Post-meeting shows an auto-generated structured-deal capture
("CRM updated"), a cross-coverage notification, team visibility, key moments,
deal components, actions (Agent / RM-owned), a credit-narrative preview and a
comms draft. Agent Bench shows a credit-progression strip, the assembled team,
and a three-tier bench (autonomous / human-in-the-loop / RM-only) with a
cross-coverage approval and a parallel product workstream.

**Feedback to build (20 items):**

### Control-centre structure
- **O1 · Opportunity overview header** — a high-level summary at the very top:
  current origination stage, overall status (on track / at risk / blocked), key
  next action, current owner, last client interaction, main blocker/dependency,
  next milestone. The first thing users see.
- **O2 · Visual origination journey** — a stage-based timeline (conversation
  captured → opportunity identified → needs confirmed → KYC/onboarding →
  internal review → approval/decision → client follow-up → progression/closure),
  each stage marked complete / in-progress / blocked / upcoming, with owner,
  status, key dependency and next step.
- **O16 · Simplified layout** — reorder so the most important information leads:
  summary → stage & health → next best actions → blockers → journey timeline →
  activity → data/consent/history. Use tabs, cards and expandable sections.
- **O15 · Stage drill-down views** — click any stage for detail: status, owner,
  required actions, blockers, documents, decisions, evidence/source, next
  milestone. Keeps the main view simple.

### Actions, blockers & progression
- **O3 · Next best actions panel** — priority, action required, owner, due date,
  why it matters, status (e.g. review AI summary, chase KYC, confirm appetite,
  escalate approval, notify servicing, update record).
- **O4 · Blockers & dependencies** — what the blocker is, owner, impact, how long
  blocked, next step, whether a nudge/escalation is recommended (e.g. missing
  KYC, approval pending, follow-up overdue, notes unvalidated, owner unassigned).
- **O17 · Missing-information prompts** — what's still needed to progress:
  appetite not confirmed, product requirement unclear, KYC missing, approval
  owner unassigned, decision criteria incomplete, next meeting unscheduled,
  consent not captured.
- **O20 · Stage readiness checks** — before moving to the next stage, a readiness
  checklist (need confirmed, KYC complete, product fit, owner assigned, approval
  route, docs received, consent captured). Actively supports progression.
- **O6 · Nudge & escalation logic** — where the platform prompts action: trigger,
  recipient, suggested action, and when it becomes an escalation. Make the
  nudge-vs-escalation distinction clear.

### Capture & human-in-the-loop
- **O7 · Post-meeting capture flow** — make the flow explicit: meeting →
  notes/transcript → AI summary → RM validates → needs/risks/decisions/actions
  extracted → dashboard updated → colleagues notified.
- **O8 · RM validation checkpoints** — AI content (summary, extracted needs,
  suggested actions, risks/blockers) reviewed with confirm / edit / reject before
  it enters the record (cross-cutting HITL layer).

### Trust & governance (mostly cross-cutting — see overview)
- **O5 · Ownership labels throughout** — every task, stage, blocker and update
  shows its owner: RM / Agent / Client / Service / Product / Risk-approval /
  System-generated / Awaiting-client.
- **O9 · Source & freshness labels** — source (CRM, transcript, RM input, email,
  KYC, client), last-updated, "requires review", confidence (high / medium /
  needs validation).
- **O10 · Manual vs automated indicators** — auto-captured / manual / AI-suggested
  / RM-confirmed / system-updated / pending-validation. Addresses admin-effort
  concerns.
- **O11 · Privacy, consent & visibility** — internal-only, client-visible,
  restricted, consent captured/required, transcript available/not, sensitive data
  hidden — important wherever transcripts/recordings/glasses appear.
- **O12 · Client visibility settings** — whether the client can see any part of
  the journey (internal RM view, internal team view, client-facing, hidden,
  shareable). Internal orchestration ≠ client-facing progress.

### Health, activity & traceability
- **O13 · Opportunity health indicators** — time in stage, number of blockers,
  pending client/internal actions, last interaction, decision readiness,
  confidence to progress, document completion.
- **O14 · Control-centre activity feed** — recent activity across the opportunity
  (RM added summary, KYC updated, doc received, approval submitted, agent added
  blocker, system suggested action, follow-up overdue).
- **O18 · Decision log** — key decisions: decision, date, owner, source,
  rationale, related action, impact on next stage. Supports traceability and
  handovers.
- **O19 · Evidence behind recommendations** — every recommended action shows its
  reason, source and impact (cross-cutting reasoning layer).

---

## Deepen the relationship — Scenes 9 & 10 · "Unified platform · Relationship review & next cycle"

**Owning scenes:** Scene 9 `unified` —
[app/src/versions/v3/desktop/UnifiedPlatform.tsx](../../app/src/versions/v3/desktop/UnifiedPlatform.tsx) ·
Scene 10 `review` —
[app/src/versions/v4/desktop/RelationshipReview.tsx](../../app/src/versions/v4/desktop/RelationshipReview.tsx).
Scenario data in
[app/src/versions/v3/scenario.ts](../../app/src/versions/v3/scenario.ts).

**Baseline today:** Unified platform shows three panes (client / deal /
workflow), a glass-pipe workflow queue, an interaction log and a forward-looking
"what's next" strip. Relationship review shows the live group mandate, covenant
tracking, an engagement gauge, the next detected signal and next-best actions.

**Feedback to build (12 items):**
- **D1 · Proactive relationship insights** — client sentiment, behavioural
  signals, engagement recommendations and next-best actions.
- **D2 · Hub-and-spoke journey view** — an end-to-end visual of client, deal and
  relationship journeys as hub-and-spoke, not a linear interaction view
  (structural — see overview).
- **D3 · Connected portfolio / sector / client view** — move seamlessly between
  strategic and relationship-level insights across levels.
- **D4 · Reduce manual entry** — automated capture, summarisation and
  distribution of relationship knowledge.
- **D5 · Surface hidden risks & opportunities** — deteriorating sentiment,
  unsuccessful interactions, emerging market signals.
- **D6 · Relationship & portfolio health vs KPIs** — track performance against
  KPIs, targets and strategic objectives in a single view.
- **D7 · Capture & scale institutional knowledge** — make best practice,
  expertise and successful approaches accessible across teams.
- **D8 · Proactive alerts** — material changes, market developments and
  interactions needing attention, reducing manual monitoring (alerts layer).
- **D9 · External market / sector / peer intelligence** — broader context for
  client conversations and growth opportunities.
- **D10 · Explainable AI recommendations** — reasoning, signals and evidence
  behind suggestions (cross-cutting reasoning layer).
- **D11 · Actionable guidance in workflow** — prompts, templates, engagement
  recommendations and prioritised work queues embedded in the RM workflow.
- **D12 · Consistency via standardised best practice** — standardise
  high-performing RM behaviours for more insight-led relationship management.
