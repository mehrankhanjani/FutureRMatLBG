# Future Capabilities by Component

Draft capability slides for the workshop deck — one capabilities slide per component of the RM journey, each populated with four distinct, non-overlapping AI-enabled **enablers** (each given a short, plain-English name so it is easy to grasp and remember).

---

## 1. Understanding — what these slides are

The deck walks the **five components** of the RM journey in flow order:

**Identify → Qualify → Shape → Handover (Orchestrate) → Deepen**

Each component is a short **chapter** built from four slides:

1. **Current state** — how the job is done today, and where it breaks
2. **Future job-to-be-done** — the same job, reimagined
3. **Market & client expectations** — what "great" looks like, and where the market is heading
4. **Future capabilities** — *this* slide: the AI and new-tech capabilities that make the future state real

This document drafts **slide 4 for every component** — the "future capabilities" pay-off of each chapter.

### What the capabilities are (and are not)

- **General, not mockup-bound** — these describe the *capability*, not a specific screen in the prototype. The prototype is one illustration; the capability is the durable idea.
- **Relevant to both CIB and BCB** — every capability holds for a corporate & institutional RM and a business & commercial RM. Nothing here is segment-specific.
- **RM-role focused** — framed around what the relationship manager can now do, with AI as the enabler behind them.
- **Near-term** — achievable with AI and technology maturing over roughly the next **2–3 years**, not speculative long-horizon bets.
- **Human-first thesis** — across every component the same shift recurs: **the RM moves from doing the manual work to owning the judgement and the relationship; AI does the assembly, sensing and drafting.**

---

## 2. How we shape each slide

Every capabilities slide uses the same **exec-audience, four-column** table so the deck reads consistently:

| Column | What it carries |
|---|---|
| **Enabler** | The enabler's short, memorable name — the headline the audience remembers — with its plain descriptor underneath |
| **Today → Future** | A crisp before/after that tells the change story at a glance |
| **What AI & new tech makes possible** | The mechanism — what the technology actually does |
| **Value unlock** | The outcome for the RM, the client and the bank |

Each enabler is named for **what it does for the RM**, not the underlying tech — a plain-English handle (e.g. *Opportunity Radar*, *Deal Autopilot*, *Ghostwriter*) with the formal descriptor kept as a subtitle. Names should be instantly graspable and relate to a familiar idea.

Each component then has a **separate build-view table** — kept off the exec slide — that maps every capability to its **Tech enablement** (what we need to build it) and **Data needed** (what it runs on, and whether we already have it). This keeps the exec slide clean while giving the workshop a feasibility view.

| Column | What it carries |
|---|---|
| **Enabler** | The same enabler name, so the two tables line up |
| **Tech enablement** | The technology needed to build it — mapped to the REO / North Star stack |
| **Data needed** | The data it runs on, and whether we already have it or need more |

The build view is grounded in the LBG AI Journey (REO orchestrator on GCP, Agents/Skills, Vector DB + Context DB, M365 Copilot, data rings, and A2A / MCP / Rest API integration) and the JTBD tool inventory (One View, CIDT, KAP, Client 360, ePricer/EPC, Companies House, CapIQ, D&B, IBISWorld, One MI, etc.).

Each component also carries a **JTBD-alignment table** that lists **every** job-to-be-done for that component from [feedback_matrix.md](feedback_matrix.md) §7 ("The Five Components") and maps each job to the enabler(s) that serve it. This proves every named job is covered — and shows plainly where one enabler serves two jobs, or two enablers combine to serve one job.

**Data legend:** ✅ = already available in current sources (Rings 1–3 / existing RM tools) · ➕ = new data or new integration required.

**Rules of the format**

- **Four enablers per component** — enough to be substantial, few enough to stay scannable.
- **Every enabler has a plain-English name** — relatable, memorable, and about the RM outcome; the formal descriptor sits underneath as a subtitle.
- **Short, scannable cells** — phrases, not paragraphs. The slide is a prompt for the story, not the script.
- Each component closes with a **one-line punchline** that lands the human-first shift.
- The exec table is the client-facing slide; the build-view table is the internal feasibility cut for the workshop.

---

## 3. The non-overlap principle

**Every capability lives in exactly one component.** A capability that could appear in two places is assigned to the component whose *job it genuinely does*, and deliberately excluded from the others. This keeps each chapter distinct and stops the deck repeating itself.

Worked example the audience will notice: **workflow orchestration** sequencing a deal from design to approval is an **execution** job — it belongs to **Handover (Orchestrate)**, *not* Shape. Shape ends when the solution is designed and agreed; Handover picks up and drives it.

### Boundary map — what each component owns, and where it stops

| Component | Owns (its job) | Deliberately does **not** cover (belongs elsewhere) |
|---|---|---|
| **1 · Identify** | Sensing, profiling, prioritising and ownership — *who, and why now*, before any engagement | Confirming needs in conversation (→ Qualify); next-best-action inside a live relationship (→ Deepen) |
| **2 · Qualify** | Engaging, confirming real needs, and testing early viability — *is this worth pursuing, and is it a starter?* | Designing the actual solution and its commercials (→ Shape); assembling the credit pack (→ Handover) |
| **3 · Shape** | Designing the value-led solution, its commercials, and aligning stakeholders on **solution direction** | Coordinating the people and tasks to deliver it (→ Handover); progressing approvals (→ Handover) |
| **4 · Handover (Orchestrate)** | Coordinating people and activities, progressing approvals, and holding one accurate, visible source of truth | Deciding *what* the solution is (→ Shape); ongoing post-deal relationship management (→ Deepen) |
| **5 · Deepen** | Sustaining the relationship, monitoring in-life, driving next actions, and feeding the next cycle back to Identify | Originating brand-new prospects from the market (→ Identify); one-off deal execution (→ Handover) |

A note on two easily-confused pairs:

- **Conversation capture** appears differently in three places by *purpose*: confirming needs live (Qualify) → turning the meeting into a deal record (Handover) → feeding ongoing relationship memory (Deepen).
- **Credit** splits cleanly: early *viability screening* — is this even a starter — is **Qualify**; assembling and pre-checking the *credit pack* for approval is **Handover**.

### Reconciling the capabilities slide with the market slide

Each component's **market & client expectations** slide paints the *whole* market landscape, so it will name trends that mature in *later* components. The **capabilities** slide stays strictly component-scoped. The two must not be forced into a 1:1 match.

Worked example — the **Identify** market slide lists four directions; two are Identify's own, two point forward:

| Market direction (Identify) | Lands in |
|---|---|
| Predictive / AI-driven opportunity identification | ✅ Identify |
| Siloed → connected relationship intelligence | ✅ Identify |
| AI recommending next-best-actions & engagement strategies | ➡️ Qualify (engagement) / Deepen (NBA) |
| Workflow orchestration replacing manual coordination | ➡️ Handover (Orchestrate) |

**Rule:** where a market direction belongs to a later component, leave it there. If a slide needs to acknowledge the forward-looking trend, add a footnote (e.g. *"next-best-action and orchestration mature in later components"*) rather than pulling the capability into the wrong chapter.

---

## 4. Enablers per component

### 1 · Identify client need

*Sensing, profiling, prioritising and ownership — who to pursue, and why now.*

| Enabler | Today → Future | What AI & new tech makes possible | Value unlock |
|---|---|---|---|
| **Opportunity Radar**<br>*Always-on opportunity sensing* | Periodic manual research → continuous multi-source detection | Scans internal + external signals (filings, news, transactions, MI) to surface triggers, events and emerging needs as they happen | Never miss a moment; proactive coverage, not reactive |
| **Single Client Lens**<br>*Connected relationship intelligence* | Fragmented prospect data siloed across teams → one connected view | Resolves entities, subsidiaries, ownership and history into a single live profile shared across colleagues | Full context on every prospect from the first touch; nothing lost between teams |
| **Smart Shortlist**<br>*Predictive prioritisation & propensity* | Gut-feel, relationship-led targeting → data-ranked against strategic and financial thresholds | Predicts which clients need what, and when, and ranks prospects against strategic and financial thresholds | Effort focused on the highest-potential, best-timed opportunities |
| **Coverage Map**<br>*Automated coverage & ownership resolution* | Unclear who owns what → instant ownership and coverage map | Resolves who is best placed to own and progress the relationship, flags overlaps, alerts who should be aware | Coordinated engagement; no duplicated or missed coverage |

*The RM stops hunting for signals — the book watches itself, and surfaces the few that matter.*

**Build view — Identify**

| Enabler | Tech enablement | Data needed |
|---|---|---|
| **Opportunity Radar** | Event-driven + scheduled triggers (Event Grid, Scheduler); signal/anomaly-detection agents; external connectors via MCP / Rest API | ✅ Companies House, CapIQ, D&B, IBISWorld, One MI, Away Spend, transactions · ➕ real-time news/market event feed |
| **Single Client Lens** | Entity-resolution / knowledge graph; Context DB + Vector DB; MDM golden-record layer | ✅ One View CRM, D&B/Hoovers hierarchies, Companies House · ➕ cross-system entity-resolution layer linking subsidiaries |
| **Smart Shortlist** | Propensity / ranking ML models; feature store; threshold rules engine | ✅ CRM pipeline, financials (CapIQ, Experian, Moody's, S&P), historical wins · ➕ labelled outcome data + machine-readable strategic/financial thresholds |
| **Coverage Map** | Coverage/org graph + rules engine; CRM workflow write-back (One View API) | ✅ One View coverage/ownership records · ➕ authoritative cross-segment (CIB/BCB) coverage & org mapping |

**JTBD served — Identify** (jobs from feedback_matrix §7)

| Enabler | Job-to-be-done it serves |
|---|---|
| **Opportunity Radar** | Identify triggers, events, and emerging needs to inform outreach |
| **Single Client Lens** | Build a clear, up-to-date understanding of each high-potential prospect and their context |
| **Smart Shortlist** | Prioritise target prospects using strategic and financial thresholds |
| **Coverage Map** | Establish clear ownership of prospects to ensure coordinated engagement |

*Jointly served:* "Identify high-potential prospects using internal and external signals" is delivered by sensing + prioritisation together.

---

### 2 · Qualify the opportunity

*Engaging, confirming real needs, and testing early viability — is this worth pursuing?*

| Enabler | Today → Future | What AI & new tech makes possible | Value unlock |
|---|---|---|---|
| **Live Listener**<br>*Real-time conversation intelligence* | Notes from memory → live capture of needs, intent and risk | Listens in meetings, extracts priorities and objectives, prompts the RM in the moment | Confirmed needs, nothing missed, richer qualification |
| **Engagement Coach**<br>*Optimal engagement guidance* | Best-guess outreach → recommended channel, timing and context | Suggests the right moment, channel and message for each client | Higher engagement; the right conversation at the right time |
| **Green-Light Check**<br>*Instant appetite & red-line screening* | Weeks to test viability → seconds to screen | Checks appetite, sector/jurisdiction limits, sanctions and hard disqualifiers up front | Time invested only in viable opportunities; fast, clear no's |
| **Value Sizer**<br>*Automated opportunity value assessment* | Manual sizing → instant value estimate | Structures gathered information to size the opportunity and set the broad proposition direction | Clear prioritisation by value before effort is committed |

*The RM walks into every conversation already knowing the need, the fit and the value.*

**Build view — Qualify**

| Enabler | Tech enablement | Data needed |
|---|---|---|
| **Live Listener** | Speech-to-text + LLM extraction; Teams real-time transcription; M365 Copilot | ✅ Teams meetings, Outlook, CRM context · ➕ consent-governed meeting capture + real-time transcription pipeline |
| **Engagement Coach** | Recommendation / next-best-channel model; event + scheduled triggers | ✅ Interaction history (Outlook, Teams, CRM), engagement signals · ➕ engagement-outcome data to learn best channel/timing |
| **Green-Light Check** | Policy/rules engine + RAG over appetite & limits; sanctions-list check | ✅ Internal risk appetite, sector/jurisdiction limits, credit policy · ➕ machine-readable appetite rules + live sanctions feed |
| **Value Sizer** | LLM structuring + sizing model; ePricer / EPC | ✅ Client financials, product & pricing data (Ring 2), CapIQ · ➕ opportunity-sizing benchmarks/reference data |

**JTBD served — Qualify** (jobs from feedback_matrix §7)

| Enabler | Job-to-be-done it serves |
|---|---|
| **Live Listener** | Confirm client needs, priorities, and strategic objectives through interaction |
| **Engagement Coach** | Engage prospects using the right channel, timing and context |
| **Green-Light Check** | Progress opportunities through internal set up, credit and risk approval processes (early screening) |
| **Value Sizer** | Gather and structure relevant information to assess opportunity value and define product proposition |

---

### 3 · Shape the proposition

*Designing the value-led solution, its commercials, and aligning on direction.*

| Enabler | Today → Future | What AI & new tech makes possible | Value unlock |
|---|---|---|---|
| **Solution Composer**<br>*AI-assisted solution design* | Manual assembly across silos → auto-composed multi-product structures | Generates tailored financial + non-financial solutions from the whole-bank shelf and precedent deals | Best-fit propositions — the whole bank, not one RM's knowledge |
| **Deal Calculator**<br>*Real-time deal economics & scenario modelling* | Long pricing and review cycles → instant modelling | Live pricing, profitability, RoRWA and what-if scenarios as the structure changes | Evidenced commercial answers; value for client and bank at the table |
| **Shared Canvas**<br>*Collaborative solution co-design* | Email chains and version drift → one shared solution canvas | Product, credit and coverage align on **solution direction** in real time on one artefact | Agreed direction in one pass; no rework, clear ownership |
| **Option Board**<br>*Indicative structuring & option comparison* | One option, opaque trade-offs → several structured options compared | Shapes the opportunity into clear, actionable deal options with indicative terms and eligibility | Confident, client-led choice of the right structure |

*The RM shifts from assembler to designer — AI drafts the options, the RM sets the direction.*

**Build view — Shape**

| Enabler | Tech enablement | Data needed |
|---|---|---|
| **Solution Composer** | Generative AI + RAG over product shelf & precedent deals; solution-design agent | ✅ Client needs, CRM opportunity · ➕ structured whole-bank product catalogue + precedent-deal library |
| **Deal Calculator** | Pricing/analytics engine (ePricer, EPC); RoRWA calculators; what-if simulation | ✅ Pricing, cost of capital, RWA, balance-sheet data (Ring 2) · ➕ real-time pricing/RWA calc integration into the design surface |
| **Shared Canvas** | Shared canvas / co-authoring surface (M365); real-time sync | ✅ Solution artefact, CRM opportunity, participant context · ➕ shared solution-canvas data model |
| **Option Board** | Structuring engine + eligibility rules; LLM option generation | ✅ Indicative terms, credit policy · ➕ machine-readable product eligibility & terms library |

**JTBD served — Shape** (jobs from feedback_matrix §7)

| Enabler | Job-to-be-done it serves |
|---|---|
| **Solution Composer** | Define a clear, value-led solution aligned to client needs and bank capability |
| **Deal Calculator** | Define a clear, value-led solution aligned to client needs and bank capability (its commercials) |
| **Shared Canvas** | Align external and internal stakeholders on solution direction and approach |
| **Option Board** | Structure and shape opportunities into clear, actionable deals |

*Note:* Shape has three jobs and four capabilities — solution design and deal economics both serve "define a value-led solution" (the *what* and the *commercials* of it).

---

### 4 · Handover origination (Orchestrate)

*Coordinating people and activities, progressing approvals, holding one source of truth.*

| Enabler | Today → Future | What AI & new tech makes possible | Value unlock |
|---|---|---|---|
| **Auto-Scribe**<br>*Conversation-to-record automation* | Manual CRM re-keying → captured once, structured automatically | Turns meetings and decisions into structured records, actions and owners with no re-keying | Accurate record; CRM as an asset, not admin burden |
| **Deal Autopilot**<br>*Agentic workflow orchestration* | RM chases each step → an agent sequences and drives them | Sequences design → approval, runs credit and risk tracks in parallel, escalates only when needed | Seamless progression; faster to yes, fewer delays |
| **Team Assembler**<br>*Automated team assembly & cross-coverage routing* | Manual chasing of specialists → the right team pulled in automatically | Identifies and routes to the right product, credit and coverage colleagues, resolving cross-coverage | The whole bank shows up coordinated, not in silos |
| **Credit Pack Builder**<br>*AI credit pre-review & pack assembly* | Manual pack prep and rework loops → drafted and pre-checked | Assembles the credit narrative, checks it against policy and flags gaps before submission | Cleaner first-time submissions; quicker credit decisions |

*The RM stops chasing the process — the process runs itself, and asks for judgement only when it matters.*

**Build view — Handover (Orchestrate)**

| Enabler | Tech enablement | Data needed |
|---|---|---|
| **Auto-Scribe** | LLM summarisation + CRM write-back (One View API); Power Automate | ✅ Meeting transcripts, decisions, CRM schema (Ring 1) · ➕ structured write-back mapping into One View / CIDT |
| **Deal Autopilot** | REO orchestrator / workflow engine; multi-agent; Power Automate + Event Grid | ✅ CIDT status, approval routing · ➕ end-to-end process model + system connectors to credit/risk platforms |
| **Team Assembler** | Skills/coverage graph + routing agent; Teams integration | ✅ Coverage/org data, One View · ➕ specialist skills/expertise directory + availability |
| **Credit Pack Builder** | RAG over credit policy + document generation; policy-check agent | ✅ Client financials, credit templates (CIDT, AIP, IRDC) · ➕ machine-readable credit policy + pack templates |

**JTBD served — Handover origination** (jobs from feedback_matrix §7)

| Enabler | Job-to-be-done it serves |
|---|---|
| **Auto-Scribe** | Maintain a complete, accurate view of opportunity status and history |
| **Deal Autopilot** | Coordinate activities across internal teams and external stakeholders |
| **Team Assembler** | Coordinate activities across internal teams and external stakeholders (the people side) |
| **Credit Pack Builder** | Provide consistent visibility of client and deal context to stakeholders |

*Note:* Handover has three jobs — orchestration and team assembly both serve "coordinate activities" (the *tasks* and the *people*).

---

### 5 · Deepen client relationship

*Sustaining the relationship, monitoring in-life, and driving the next action.*

| Enabler | Today → Future | What AI & new tech makes possible | Value unlock |
|---|---|---|---|
| **Relationship Memory**<br>*Persistent relationship memory* | Knowledge trapped in individuals → shared institutional memory | Maintains a living record of context, interactions and decisions across every channel and colleague | Continuity through RM changes; nothing lost |
| **Early-Warning Watch**<br>*In-life monitoring & early warning* | Periodic manual reviews → continuous covenant and performance watch | Tracks obligations, covenants and performance, flagging risks and changes as they emerge | Issues caught early; proactive risk and relationship management |
| **Next-Best-Move**<br>*Next-best-action engine* | Ad-hoc follow-ups → prioritised, personalised recommendations | Recommends and sequences the next best action per client from full relationship context | Every client advanced; nothing falls through the cracks |
| **Ghostwriter**<br>*Comms drafting in the RM's voice* | Blank-page follow-ups → ready-to-send drafts | Drafts follow-ups and outreach in the RM's tone, and ensures time-sensitive actions land | Consistent, timely engagement at scale; the RM approves, not writes |

*The relationship never goes quiet — and every closed deal surfaces the next signal, restarting the cycle at Identify.*

**Build view — Deepen**

| Enabler | Tech enablement | Data needed |
|---|---|---|
| **Relationship Memory** | Vector DB + Context DB (persistent memory store); knowledge graph | ✅ Interactions across Outlook, Teams, CRM, KAP, Client 360 (Ring 1) · ➕ unified cross-channel memory store |
| **Early-Warning Watch** | Event-driven monitoring + anomaly/covenant-tracking models; alerts | ✅ Financial performance, transactions, One MI, alerts (Ring 2) · ➕ digitised covenant/obligation data + performance feed |
| **Next-Best-Move** | Recommendation / sequencing model; NBA engine | ✅ Full relationship context, engagement history (Client 360, KAP) · ➕ NBA outcome-training data + action catalogue |
| **Ghostwriter** | LLM generation + style/tone personalisation; Outlook integration | ✅ RM prior comms, client context, CRM (Ring 1) · ➕ consented RM writing-style profile |

**JTBD served — Deepen** (jobs from feedback_matrix §7)

| Enabler | Job-to-be-done it serves |
|---|---|
| **Relationship Memory** | Maintain a deep understanding of client context, priorities and performance |
| **Early-Warning Watch** | Sustain ongoing engagement to strengthen relationships and identify emerging risks or changes in performance |
| **Next-Best-Move** | Determine and execute the next best action for each client |
| **Ghostwriter** | Ensure time-sensitive actions and client follow ups are completed and communicated clearly |

*Jointly served:* "Capture and maintain accurate, up-to-date client interaction records" is delivered by persistent relationship memory (fed by conversation-to-record automation in Handover).

---

## 5. At a glance — all 20 enablers

| Identify | Qualify | Shape | Handover (Orchestrate) | Deepen |
|---|---|---|---|---|
| Opportunity Radar | Live Listener | Solution Composer | Auto-Scribe | Relationship Memory |
| Single Client Lens | Engagement Coach | Deal Calculator | Deal Autopilot | Early-Warning Watch |
| Smart Shortlist | Green-Light Check | Shared Canvas | Team Assembler | Next-Best-Move |
| Coverage Map | Value Sizer | Option Board | Credit Pack Builder | Ghostwriter |

Every enabler sits in exactly one column. The throughline across all five: **AI carries the load; the RM carries the judgement and the relationship.**
