# LBG CIB – AI Group Presentation

---

## 1. Current AI Journey

### Timeline
**Meeting Prep** → **Research on new prospect or client** → **Meeting Prep and external research**

### Tools in Use

| Tool | Description | Tech Stack |
|------|-------------|------------|
| **REO Agent** | Custom Agent built on Copilot Studio Stack | LBG Build on Microsoft Copilot Studio SaaS Solution |
| **ROGO** | SaaS AI product for Client and Prospect research | Research for the new prospect or client |
| **Microsoft Agents** | Microsoft first party agents available for RMs to access for their day-to-day activities | Microsoft first-party |

### Current State Limitations
> Fragmented AI → Limited insight → Poor scalability → Inconsistent experience → Siloed data limiting true intelligence

---

## 2. Capability Assessments (Build/Buy)

**User:** RM

| | MS Copilot Studio (Microsoft) – REO | Third Party SaaS AI Solution – ROGO | Microsoft – M365 Copilot / Researcher / Analyst |
|---|---|---|---|
| **Connection** | Native Connection | — | — |
| **Internal Data** | OneView365 CRM (via Rest API / HTTPS) | — | Outlook, Teams, OneDrive, OneNote, SharePoint |
| **External Data** | Companies House, IBISWorld | Companies House, Capital IQ, External Web, Crunchbase, US SEC Filings | External Web (Bing) |

---

## 3. North Star – Channel Experience

### Invocation Triggers

#### User Initiated – User Action Driven
- RM Agent Interaction on CRM
- Prompt Request and Response

#### Automated

**Event Driven**
- Incoming email received
- Client Interaction Trigger
- Revenue Change Signal
- Risk & Sentiment Alert
- Engagement & Activity Shift

**Scheduled**
- Daily pipeline summary
- Pre-meeting brief at 7am
- Weekly account change digest
- Latest news for Client

**System to System**
- External workflows
- External Agents Interaction

### Interaction Mode
Click Action | Form Completion | Approvals | Alerts & Notifications | Search | Suggestions | Voice

### Access Channels

**Human Facing Channels**
- OneView365 CRM
- Teams
- Web
- Mobile
- M365 Copilot
- Outlook

**System Facing Channels**
- Power Automate
- APIs
- Event Grid
- Scheduler / Batch
- Webhooks

### Integration Layers
| Layer | Description |
|-------|-------------|
| Embedded Intelligence | Contextual AI surfaced within existing tools |
| Direct Interaction | User-initiated agent conversations |
| Autonomous Interaction | Agent-driven, no user prompt required |

### Enterprise AI Orchestration Layer
> Context-Aware Reasoning | Secure Data Access | Workflow Automation | Agentic Capabilities

**Principles:** Unified Experience | Trusted Sources | Scalable Agentic Architecture | Context Aware

---

## 4. Examples – RM Journey and Interaction

### Before the Meeting
- **Channel:** Outlook / Teams / Mobile
- **Mode:** Notification + brief document
- **Trigger:** Scheduled 30 mins before meeting
- **AI Action:** Assembles meeting pack from CRM, prior interactions, financials, open service issues
- **Output:** Pre-meeting briefing pack / information

### Voice Request in Teams
- **Channel:** Teams
- **Mode:** Voice
- **Trigger:** RM asks during commute, *"Summarise my meetings with Tesco this week"*
- **AI Action:** Reads calendar, CRM notes, emails
- **Output:** Spoken summary + sent recap card

### CRM Account Brief
- **Channel:** Dynamics 365
- **Mode:** Embedded contextual assistant / text chat
- **Trigger:** User opens opportunity and clicks "Generate account brief"
- **AI Action:** Retrieves CRM, recent emails, notes, documents
- **Output:** Opportunity summary, risks, next best action

### Email-Triggered Follow-Up
- **Channel:** Outlook + background workflow
- **Mode:** No direct user interaction initially; output as notification/card
- **Trigger:** Inbound client email detected
- **AI Action:** Intent classification, urgency detection, account context lookup, draft response
- **Output:** Suggested reply in Outlook + CRM task update

---

## 5. North Star Architecture

### Invocation Triggers
Human Interaction | Automated Triggers

### Interaction Mode
Voice | Chat | Alerts | Scheduler | Business Approvals | External Triggers

### Access Channels
OneView CRM | Teams | Outlook | Web | Mobile

### LBG GCP – REO (LBG Agent)

#### Orchestrator / Workflow Engine
Agent Selection | Plan & Execution | Context Routing | LBG RAI Policy Checks

#### Agents / Skills
Scalable Agentic Architecture (Multiple Agents)

#### Knowledge / Context Store
Vector DB | Context DB | Reference

#### Tools
Vector DB | Context DB | Reference

#### Data Rings

| Ring | Category | Sources |
|------|----------|---------|
| Ring 1 | Microsoft Products Data | OneView CRM, Outlook, OneDrive, Teams |
| Ring 2 | Internal Data | Products, Pricing, Alerts, One MI, Servicing |
| Ring 3 | External Data (via A2A / MCP / Rest API) | Companies House, Capital IQ, D&B, IBIS World |

#### External Integrations (via A2A / MCP / Rest API)
- **Agents Integration – External Agents:** External Third-Party Agents
- **Microsoft Products:** M365 Copilot, Sales Agent, Analyst Agent, Researcher

---

## 6. Strategic Rationale – Why Build

### Cost & Commercial Control
- Avoid vendor lock-in pricing escalations
- Optimize cost via model routing (SLM vs LLM)
- Fine-tune usage based on business demand
- Leverage existing GCP investment & tooling
- Eliminate per-seat/per-agent SaaS licensing overhead

> *"We control cost curves rather than inheriting them."*

### Enterprise-Grade Governance (LBG Aligned)
- Full alignment with LBG RAI & risk frameworks
- Data residency, entitlement, and lineage fully controlled
- Human-in-the-loop & auditability by design
- Risk-tiered deployment model (experimentation → production)
- Policy enforcement (DLP, PII masking, prompt guardrails)

> *"We don't retrofit governance—we architect it in."*

### Customer & Business Journey Alignment
- Agents embedded into existing journeys (CRM, servicing, channels)
- Tailored to LBG-specific use cases (not generic workflows)
- Continuous optimization using real interaction data
- Prioritisation driven by measurable business value
- Supports omni-channel consistency (CRM, Teams, Web)

> *"Build for our journeys, not adapted from generic products."*

### Future Ready Architecture
- Model flexibility to avoid AI lock-in
- Using MS and third party AI capabilities wherever possible within LBG guardrails
- Risk tiered approach

> *"We own the platform, not just consume it."*

---

## 7. Executive Summary

### Overview

LBG's Commercial & Institutional Banking (CIB) division is undertaking a strategic transformation of how Relationship Managers (RMs) engage with clients and manage their day-to-day activities through the use of AI. The presentation outlines the current fragmented AI landscape, articulates a unified North Star vision, and makes the case for a sovereign, build-first approach to enterprise AI — rather than relying on a patchwork of third-party SaaS solutions.

---

### The Problem: A Fragmented AI Landscape

LBG currently operates three disconnected AI initiatives targeting different parts of the RM workflow:

- **REO Agent** handles meeting preparation and CRM-connected tasks, built on Microsoft Copilot Studio with access to internal data via OneView365 and external sources like Companies House and IBISWorld.
- **ROGO** is a third-party SaaS product focused on prospect and client research, drawing on a broad set of external data sources including Capital IQ, Crunchbase, and US SEC filings.
- **Microsoft Agents** (M365 Copilot, Researcher, Analyst) provide first-party productivity capabilities tied to the Microsoft 365 ecosystem.

Each tool operates in isolation, resulting in **fragmented AI**, **limited insight**, **poor scalability**, **inconsistent RM experiences**, and **siloed data that prevents true intelligence**. There is no unified orchestration layer connecting these tools, no consistent context across channels, and no coherent governance model spanning all three.

---

### The Vision: North Star – A Unified Agentic Platform

LBG's North Star is a **unified Enterprise AI Orchestration Layer** that consolidates all AI interactions for RMs into a single, context-aware, scalable platform. The architecture is built around three core principles:

1. **Unified Experience** – RMs interact with AI consistently regardless of channel (CRM, Teams, Outlook, Mobile, Web).
2. **Trusted Sources** – All data grounding is traceable, governed, and aligned with LBG's RAI and risk frameworks.
3. **Scalable Agentic Architecture** – A multi-agent orchestration model that can grow in capability without architectural rework.
4. **Context Aware** – The platform maintains rich context across interactions, sessions, and data sources to deliver relevant, timely intelligence.

---

### How It Works: Channel Experience & Invocation Model

The North Star architecture supports a rich invocation model that goes well beyond simple chatbot interactions:

- **User-Initiated triggers** allow RMs to interact directly via CRM or prompt-based interfaces.
- **Event-Driven automation** responds to real-world signals — inbound emails, revenue changes, risk alerts, or shifts in client engagement — without the RM needing to ask.
- **Scheduled automation** proactively delivers intelligence at the right moment — daily pipeline summaries, 7am pre-meeting briefs, weekly account digests, and the latest client news.
- **System-to-System interactions** enable the AI layer to communicate with external workflows and third-party agents autonomously.

RMs can interact through six modalities: **click actions**, **form completion**, **approvals**, **alerts and notifications**, **search**, **suggestions**, and **voice**. Channels span both human-facing surfaces (CRM, Teams, Outlook, Mobile, M365 Copilot) and system-facing integration points (Power Automate, APIs, Event Grid, Scheduler/Batch, Webhooks).

---

### REO: The LBG-Built Agentic Core

At the heart of the North Star architecture is **REO** — LBG's proprietary AI agent, hosted on Google Cloud Platform (GCP) and orchestrated through a layered architecture:

- **Orchestrator / Workflow Engine:** Handles agent selection, plan and execution, context routing, and LBG RAI policy checks. This is the brain that decides which agents to invoke, in what order, and with what data.
- **Agents / Skills Layer:** A scalable multi-agent architecture allowing new capabilities to be added modularly without disrupting existing workflows.
- **Knowledge / Context Store:** A combination of Vector DB, Context DB, and Reference stores that give agents persistent, semantically rich memory across interactions.
- **Tools Layer:** Exposes the same store types as callable tools, enabling agents to retrieve, reason over, and act on structured and unstructured data.

REO organises its data access in three rings:

| Ring | Data Type | Sources |
|------|-----------|---------|
| Ring 1 | Microsoft Products Data | OneView CRM, Outlook, OneDrive, Teams |
| Ring 2 | Internal LBG Data | Products, Pricing, Alerts, One MI, Servicing |
| Ring 3 | External Data | Companies House, Capital IQ, D&B, IBIS World |

External data and agents are accessed via **A2A, MCP, and Rest API** protocols, ensuring secure, auditable, and governed integration.

REO coexists with Microsoft's own agent products (M365 Copilot, Sales Agent, Analyst, Researcher), which remain available to RMs for standard productivity tasks — but the LBG-built REO platform provides the sovereign, customised layer on top.

---

### Real-World RM Use Cases

The platform is designed around four representative RM scenarios that illustrate the breadth of the capability:

| Scenario | Trigger | AI Action | Output |
|----------|---------|-----------|--------|
| **Before the Meeting** | Scheduled – 30 mins prior | Assembles meeting pack from CRM, interactions, financials, service issues | Pre-meeting briefing pack |
| **Voice Request in Teams** | RM voice prompt during commute | Reads calendar, CRM notes, emails | Spoken summary + recap card |
| **CRM Account Brief** | RM clicks "Generate account brief" in Dynamics 365 | Retrieves CRM data, emails, notes, documents | Opportunity summary, risks, next best action |
| **Email-Triggered Follow-Up** | Inbound client email detected | Intent classification, urgency detection, context lookup, draft response | Suggested reply in Outlook + CRM task update |

These examples demonstrate the platform's ability to serve RMs across the full spectrum from **proactive and scheduled** intelligence to **reactive and event-driven** automation — all without requiring the RM to manually switch between tools.

---

### The Strategic Case: Why Build?

LBG's decision to build a sovereign AI platform rather than rely solely on third-party SaaS solutions is grounded in four strategic imperatives:

#### 1. Cost & Commercial Control
The current fragmented model carries compounding per-seat, per-agent SaaS licensing costs with limited ability to optimise spend. The build approach allows LBG to leverage its existing GCP investment, route intelligently between smaller language models (SLMs) and larger ones (LLMs) based on task complexity and cost, and eliminate vendor-driven pricing escalations. **LBG controls the cost curve rather than inheriting it.**

#### 2. Enterprise-Grade Governance
Third-party AI solutions are difficult to retrofit with LBG's Responsible AI (RAI) and risk frameworks. By building REO natively, LBG can architect governance in from the start: full data residency and lineage control, human-in-the-loop auditability, a risk-tiered deployment model from experimentation through to production, and policy enforcement mechanisms including DLP, PII masking, and prompt guardrails. **Governance is not a constraint applied later — it is a design principle.**

#### 3. Customer & Business Journey Alignment
Generic AI products are not built for LBG's specific CIB workflows. REO is embedded into the actual journeys RMs follow — within the CRM, in servicing flows, across communication channels — and is continuously optimised using real interaction data. Prioritisation of capabilities is driven by measurable business value, not vendor roadmaps. **LBG builds for its journeys, not adapts from generic products.**

#### 4. Future-Ready Architecture
The AI landscape is evolving rapidly. A sovereign platform gives LBG the flexibility to swap or combine underlying models without lock-in, integrate best-of-breed third-party AI capabilities where appropriate within guardrails, and adopt a risk-tiered rollout approach. **LBG owns the platform, not just consumes it.**

---

### Key Takeaways

- LBG's current AI approach is fragmented across REO, ROGO, and Microsoft Agents — each solving part of the problem in isolation.
- The North Star vision consolidates this into a unified, orchestrated agentic platform centred on **REO**, hosted on GCP, and connected to all relevant data rings.
- The platform supports the full range of RM interaction patterns — from proactive scheduled briefs to voice-driven queries to autonomous email triage — across all channels.
- The strategic rationale for building rather than buying is compelling across cost, governance, journey fit, and architectural resilience.
- This positions LBG to move from **fragmented AI tools** to a **unified intelligence capability** that is scalable, governable, and genuinely embedded in how RMs work.

