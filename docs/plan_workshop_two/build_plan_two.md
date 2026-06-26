# Build Plan — Iteration 3

Iteration 3 (v3) adds two new scenes and enriches all eight existing v2 scenes
based on the workshop feedback, JTBD gaps and dimension coverage analysis in
`feedback_matrix.md`. It follows the same pattern as v1 → v2: v2 is frozen and
untouched; v3 forks into its own folder under `app/src/versions/v3/`, overriding
only what changes.

**Target scene order (10 scenes):**

| # | Scene | Chapter | Status |
|---|---|---|---|
| 1 | Opportunity Ignition | Originate & shape | Enrich existing |
| A | Relationship Intelligence | Originate & shape | **New** |
| 2 | Activate Intelligence | Originate & shape | Enrich existing |
| 3 | Live Client Moment | Originate & shape | Enrich existing |
| 4 | Deal Structuring & Win Strategy | Progress the deal | Enrich existing |
| 5 | Post-meeting Momentum | Progress the deal | Enrich existing |
| 6 | Agent Bench & Orchestration | Progress the deal | Enrich existing |
| 7 | Portfolio Opportunity Radar | Win & scale | Enrich existing |
| 8 | Unified Platform | Win & scale | Enrich existing |
| B | Relationship Review & Next Cycle | Win & scale | **New** |

---

## Phase 1 — Scaffold v3

**Goal:** Register the version so it can run alongside v1 and v2 without breaking either.
v2 remains the default until the end of Phase 4. v3 is accessible via `?v=v3`.

**Files to create:**
```
app/src/versions/v3/
  index.ts          — version registration (id: 'v3', label: 'Iteration 3')
  scenario.ts       — re-exports v2 scenario wholesale; extend as needed per phase
  callouts.ts       — copy of v2 callouts; this is where Phase 2 edits land
  scenes.tsx        — 10-scene list; scenes A and B initially point to placeholders
  desktop/          — empty folder; new and overridden desktop components go here
  mobile/           — empty folder; overridden mobile components go here
```

**Files to modify:**
```
app/src/versions/registry.ts   — import v3, add to versions array
```

**Deliverable at end of phase:** `?v=v3` loads and shows the same 8 scenes as v2 with
placeholder slots for A and B. Nothing is broken. v2 is untouched.

---

## Phase 2 — Copy, Language and Framing Pass (P1)

**Goal:** Address all P1 framing and language gaps before any UI is built. These are
the highest-risk gaps for the workshop — wrong framing undermines the narrative
regardless of how good the components look.

**What changes (all in v3 `callouts.ts` and scene captions in `scenes.tsx`):**

| Change | Gaps addressed |
|---|---|
| Rewrite Ignition callout: open on the RM's situation and client context; intelligence surfaces as the enabler | #1 |
| Replace win-probability anchor language with client strategic context (their ambition, their risk) in Ignition, Structure Deal and Radar callouts | #2 |
| Replace all "WorkIQ" references with REO in every callout | #7 |
| Replace "glass pipe", "seamless flow", "straight-through" with "captured once — available to everyone who needs it" and equivalent phrasing | #8 |
| Merge the "signal detected" and "opportunity surfaced" language in Live Moment caption into a single continuous framing | #17 |
| Update Structure Deal and Radar callouts: client outcome first, bank economics as a consequence | #2 |
| Unified Platform: rewrite the closing caption to point forward ("this is where the next cycle starts") rather than declaring an ending | #3 partial |

**Files to modify:**
```
app/src/versions/v3/callouts.ts   — all callout concept, benefits and outcome text
app/src/versions/v3/scenes.tsx    — scene captions
```

**Deliverable at end of phase:** v3 carries the right narrative framing throughout.
Every callout and caption can be read aloud in the workshop without the language
contradicting the feedback. Structural UI is unchanged.

---

## Phase 3 — New Scene A: Relationship Intelligence

**Goal:** Build the Relationship Intelligence scene and insert it between Ignition
and Activate. This fills the `graph` nav tab that exists in the v2 DesktopChrome
but is never activated. The scene is the deepest new build in v3.

**Starting point:** The v1 `RelationshipGraph` component
(`app/src/scenes/desktop/RelationshipGraph.tsx`) is the base. Port it into v3 and
extend it for the group story (Avonmore + Calderwood now one group; two RMs).

**What the scene shows:**

| Panel | Content |
|---|---|
| Relationship health score | Composite score with sub-scores: recency of engagement, depth of product relationship, sentiment trend, coverage completeness |
| Sentiment trend line | How the relationship has evolved over the past 12 months — not a point-in-time score |
| Interaction history | Chronological log of all touchpoints: meetings, calls, emails, CRM notes, across both Avonmore and Calderwood threads |
| Network map | Key contacts at the group (Sarah Whitfield, Calderwood counterpart), internal coverage (Daisy Bennett, Marcus Reed), and any known third-party advisers |
| Knowledge visibility | Which insights are shared with the team vs. Daisy's personal notes — making institutional memory explicit |

**Files to create:**
```
app/src/versions/v3/desktop/RelationshipIntelligence.tsx   — new scene component
```

**Files to modify:**
```
app/src/versions/v3/scenario.ts    — add relationship history, sentiment data, network nodes
app/src/versions/v3/callouts.ts   — add 'relationship' callout entry
app/src/versions/v3/scenes.tsx    — insert Scene A between ignition and activate
```

**Gaps addressed:** #6 (interaction history and relationship health), #23 (institutional
memory), P2 sentiment trend (#11 partial)

**Deliverable at end of phase:** Scene A is live and navigable. The Relationships nav
tab activates for the first time in v2/v3. The RM can be shown walking into the
meeting already fully informed about the group relationship.

---

## Phase 4 — New Scene B: Relationship Review & Next Cycle

**Goal:** Build the closing scene that makes the cycle explicit. The prototype
currently ends at "deal won". Scene B shows what happens next — and shows that
the system has already started the next cycle.

**What the scene shows:**

| Panel | Content |
|---|---|
| Group mandate — live | Avonmore Group deal now active: facility drawn, covenants tracking, next review date |
| Relationship review card | Summary of the relationship since the deal: meetings held, issues resolved, engagement score |
| REO — next signal detected | Mirrors the Ignition format exactly: "A precision-engineering supplier in the Midlands is exploring a sale — a potential bolt-on to the Avonmore Group — high confidence" — the cycle restarts |
| Next best action strip | Three prioritised actions REO recommends based on the full relationship history accumulated across all 9 preceding scenes |

**Files to create:**
```
app/src/versions/v3/desktop/RelationshipReview.tsx   — new scene component
```

**Files to modify:**
```
app/src/versions/v3/scenario.ts    — add review data, next-cycle signal, next best actions
app/src/versions/v3/callouts.ts   — add 'review' callout entry
app/src/versions/v3/scenes.tsx    — append Scene B as final scene
```

**Gaps addressed:** #3 (post-win loop closing), #6 (ongoing relationship view), #23
(next best actions from accumulated history)

**Deliverable at end of phase:** v3 has all 10 scenes. Set `DEFAULT_VERSION_ID = 'v3'`
in `registry.ts`. The prototype can now be run end-to-end for a first full review.

---

## Phase 5 — Enrich Scene 1: Opportunity Ignition

**Goal:** Add the P2 qualification and intelligence-depth additions to make Ignition
a proper qualification moment, not just an alert.

**What changes:**

| Addition | Gap | Implementation |
|---|---|---|
| Qualification summary chip | #12 | Small chip on the hero card: "Within appetite · High · Suitability: Strong" — drawn from scenario data |
| Disqualifier indicator | #13 | A pass/flag row beneath the signals grid: jurisdiction ✓, sector limit ✓, sanctions ✓ |
| Peer/sector benchmark panel | #11 | A two-row comparison card: "3 of 5 comparable UK mid-market manufacturing acquirers raised acquisition finance plus integration funding within 12 months of completing a bolt-on" |
| Data horizon labels | #10 | Each source chip gains a prefix: "Historical · Ring 2", "Live event · Ring 3", "Predicted · REO model" |
| Ownership confirmation | #20 | A single line: "Coverage: Daisy Bennett · BCB. Notify: Marcus Reed · CIB" — confirming the group is jointly covered |

**Files to modify:**
```
app/src/versions/v3/desktop/OpportunityIgnition.tsx   — create as v3 override of v2 version
app/src/versions/v3/scenario.ts                       — add qualification, benchmark, horizon data
```

**Gaps addressed:** #10, #11, #12, #13, #20

---

## Phase 6 — Enrich Scene 4: Deal Structuring & Win Strategy

**Goal:** Make Structure Deal a proper shaping and qualification tool — the scene
where the RM can explore before committing and see credit readiness alongside
commercial fit.

**What changes:**

| Addition | Gap | Implementation |
|---|---|---|
| Indicative credit eligibility per option | #19 | Each structure card gains an eligibility line: "Within appetite · likely approvable", "Stretch · credit escalation required" |
| Draft mode toggle | #14 | A toggle in the header: "Exploring / Committed". In Exploring mode the CRM is not updated; the RM can compare options freely |
| Product specialist hand-off | #16 | An action button on the recommended option: "Loop in product specialist" — triggers a notification card showing the hand-off to a named colleague |
| Decision fork — parallel credit track | #15 | If the stretch option is selected, a second track card appears: "Parallel: Credit escalation opened" alongside the shaping track, making non-linear flow visible |

**Files to modify:**
```
app/src/versions/v3/desktop/StructureDeal.tsx   — create as v3 override
app/src/versions/v3/scenario.ts                  — add eligibility bands, specialist data
```

**Gaps addressed:** #14, #15, #16, #19

---

## Phase 7 — Enrich Scenes 5 & 6: Post-meeting and Agent Bench

**Goal:** Add the cross-coverage visibility, comms drafting and AI credit preview that
turn Post-meeting from a summary into a full handoff moment, and complete Agent Bench
as the place where cross-team coordination is visible.

**Scene 5 — Post-meeting changes:**

| Addition | Gap | Implementation |
|---|---|---|
| Cross-coverage notification | #5 | A notification line: "Marcus Reed notified — Calderwood Engineering thread merged into group mandate" |
| Comms draft card | #9 | A card with a draft follow-up email to Sarah Whitfield in Daisy's tone. Accept / Edit / Discard |
| Shared activity log | #21 | A "Visible to team" row listing who can see this record: Daisy, Marcus, credit team |
| AI credit narrative preview | #18 | A collapsible card: "REO has drafted the credit submission narrative — review before Agent Bench progresses it" |

**Scene 6 — Agent Bench changes:**

| Addition | Gap | Implementation |
|---|---|---|
| Cross-coverage HITL card | #5 | A human-in-loop item: "Marcus Reed approval needed — consolidate Calderwood mandate under group" with Accept / Discuss buttons |
| Product workstream card | #16 | An autonomous tier card: "Product specialist — running parallel FX structuring workstream" |

**Files to modify:**
```
app/src/versions/v3/desktop/PostMeetingSummary.tsx   — create as v3 override
app/src/versions/v3/desktop/AgentBench.tsx           — create as v3 override
app/src/versions/v3/scenario.ts                       — add comms draft, team visibility, credit narrative data
```

**Gaps addressed:** #5, #9, #16, #18, #21

---

## Phase 8 — Enrich Scenes 2, 7 & 8: Activate, Radar and Unified Platform

**Goal:** Complete the remaining within-scene P2 additions across the three scenes
not covered in earlier phases.

**Scene 2 — Activate (ConsentGate) changes:**

| Addition | Gap | Implementation |
|---|---|---|
| Note-capture UI in no-consent fallback | #9 partial | Replace the static "notes mode" card with an active text input and a voice-to-text toggle. After the meeting the agent structures the captured notes identically to a transcript |

**Scene 7 — Radar changes:**

| Addition | Gap | Implementation |
|---|---|---|
| Smart-filter digest bar | #4 | Default state shows "Today's priorities · 3 actions" collapsed. Expand reveals the full list. Addresses RM overload |
| Product-suggests card type | #22 | A new card variant in the radar list: origin is "Product specialist" rather than a market signal — showing the platform pushing both ways |
| Data horizon labels | #10 | Each radar card "Detected from" line gains a horizon prefix |

**Scene 8 — Unified Platform changes:**

| Addition | Gap | Implementation |
|---|---|---|
| Interaction log panel | #21 | A fourth panel below the three panes: full interaction history across Daisy and Marcus threads, all channels |
| Forward-looking close | #3 partial | Replace the final static caption with a "What's next" strip: next review date, next signal to watch, link to Scene B |

**Files to modify:**
```
app/src/versions/v3/mobile/ConsentGate.tsx       — create as v3 override
app/src/versions/v3/desktop/OpportunityRadar.tsx  — create as v3 override
app/src/versions/v3/desktop/UnifiedPlatform.tsx   — create as v3 override
app/src/versions/v3/scenario.ts                    — add radar digest data, interaction log
```

**Gaps addressed:** #3 partial, #4, #9 partial, #21, #22

---

## Phase 9 — Polish, Flow and Demo Run-Through

**Goal:** End-to-end quality pass before workshop 2. No new functionality; only
presentation fidelity.

**Checklist:**

- [ ] All 10 scenes navigate cleanly in order via `SceneNav`
- [ ] Deal stage strip on `DesktopChrome` updates correctly across all 10 scenes (add entries for Scene A and Scene B)
- [ ] Scene A activates the `graph` nav tab; all other scenes activate the correct tab
- [ ] Scene B deal stage reads "Relationship live" or equivalent (extend `DealSnapshot` type if needed)
- [ ] Mobile scenes (2 and 3) still render correctly at device frame size
- [ ] Callout banner content is correct for all 10 scenes
- [ ] No TypeScript errors across the v3 folder (`pnpm tsc --noEmit`)
- [ ] Demo run-through at full speed: does the 10-scene narrative hold together as a single story?
- [ ] `DEFAULT_VERSION_ID = 'v3'` confirmed in `registry.ts`
- [ ] `SHOW_SWITCHER` decision: keep visible for internal review; set to `false` for client-facing build

---

## File structure at completion

```
app/src/versions/v3/
  index.ts
  scenario.ts
  callouts.ts
  scenes.tsx
  desktop/
    OpportunityIgnition.tsx       — Phase 5
    RelationshipIntelligence.tsx  — Phase 3 (new)
    StructureDeal.tsx             — Phase 6
    PostMeetingSummary.tsx        — Phase 7
    AgentBench.tsx                — Phase 7
    OpportunityRadar.tsx          — Phase 8
    UnifiedPlatform.tsx           — Phase 8
    RelationshipReview.tsx        — Phase 4 (new)
  mobile/
    ConsentGate.tsx               — Phase 8
```

Scenes not listed above (LiveMoment, DesktopChrome, scene-level placeholders) are
imported directly from v2 — no override needed.

---

## Gap coverage by phase

| Phase | Gaps closed | Priority |
|---|---|---|
| 1 · Scaffold | — | — |
| 2 · Copy & framing | #1, #2, #7, #8, #17 | All P1 |
| 3 · Scene A | #6, #23 | P1, P2 |
| 4 · Scene B | #3, #6, #23 | P1, P2 |
| 5 · Ignition | #10, #11, #12, #13, #20 | All P2 |
| 6 · Structure Deal | #14, #15, #16, #19 | All P2 |
| 7 · Post-meeting + Agent Bench | #5, #9, #16, #18, #21 | P1 (#5), P2 rest |
| 8 · Activate + Radar + Unified | #3, #4, #9, #21, #22 | P1 (#4), P2 rest |
| 9 · Polish | — | — |

**Gaps intentionally deferred to architecture phase (P3):**
#24 (service teams), #25 (client portal), #26 (in-life monitoring), #27 (balance
sheet visibility), #28 (KYC/onboarding), #29 (coordinated client ask), #30 (RWA
lens). These require production data and systems that are outside the scope of a
clickable prototype.
