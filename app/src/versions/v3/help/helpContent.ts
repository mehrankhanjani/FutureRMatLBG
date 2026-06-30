/**
 * helpContent.ts — client-friendly "Explain this" content for every desktop
 * component in iteration 3.
 *
 * Each entry powers the right-hand help drawer. Keys are either a scene id
 * (scene-level overview) or "<sceneId>.<component>" for a specific card.
 *
 * Language is deliberately plain — no internal gap numbers, priority tiers or
 * data-ring codes. The four frameworks referenced are the workshop's own:
 *   · Six "what great looks like" dimensions
 *   · The four-stage RM journey (Prospecting → Needs analysis →
 *     Origination & pipeline → Ongoing relationship)
 *   · REO's role (Autonomous / Human-in-the-loop / RM-led)
 *   · The three-horizon roadmap (Available now / Next horizon / Future vision)
 */

export type HelpDimensionRef = { name: string; primary: boolean };

export type HelpEntry = {
  /** Heading shown at the top of the drawer. */
  title: string;
  /** One plain-language sentence: what this is. */
  whatItIs: string;
  /** Why it earns its place — the value to the RM and the client. */
  whyItsHere: string;
  /** New in this iteration, or carried over and enhanced. */
  isNew: boolean;
  /** Short note shown when new (or newly enhanced). */
  newNote?: string;
  /** The gap it closes, in plain language (no internal codes). */
  addresses?: string;
  /** The workshop ask it answers — "You asked for…". */
  youAskedFor?: string;
  /** Which of the six "what great looks like" dimensions it carries. */
  dimensions: HelpDimensionRef[];
  /** Which stage of the RM journey it serves. */
  stage: string;
  /** REO's role here. */
  reoRole?: string;
  /** Where the underlying intelligence comes from, in plain language. */
  source?: string;
  /** Roadmap horizon. */
  maturity?: string;
};

const D = {
  needs: 'Understand client needs',
  qualify: 'Qualify opportunities',
  shape: 'Shape solutions',
  risk: 'Manage risk & approvals',
  interactions: 'RM–client interactions',
  friction: 'Eliminate friction',
};

const STAGE = {
  prospect: 'Prospecting',
  needs: 'Needs analysis',
  origination: 'Origination & pipeline',
  ongoing: 'Ongoing relationship',
};

export const helpContent: Record<string, HelpEntry> = {
  /* =====================================================================
   * SCENE 1 — Opportunity ignition
   * =================================================================== */
  ignition: {
    title: 'Opportunity ignition',
    whatItIs:
      'The screen that hands Daisy a qualified reason to call a client today — before she has even dialled.',
    whyItsHere:
      'Origination usually depends on an RM happening to spot a trigger. This makes the bank proactive: the moment changes, a qualified opportunity surfaces with the rationale attached.',
    isNew: false,
    newNote: 'Carried over from the previous cut and reframed to lead with the client, with qualification and benchmarking added.',
    youAskedFor: 'Lead with the human relationship — let the technology surface behind it.',
    dimensions: [
      { name: D.needs, primary: true },
      { name: D.qualify, primary: true },
    ],
    stage: STAGE.prospect,
    source: 'Live external sources — CapIQ, S&P, Companies House, D&B — joined to the bank’s own One View CRM and Internal MI & Reporting.',
    maturity: 'Next horizon',
  },
  'ignition.hero': {
    title: 'The opportunity, qualified upfront',
    whatItIs:
      'The headline card: the client, the predicted need and value, the confidence level, and an at-a-glance appetite and suitability read.',
    whyItsHere:
      'It lets Daisy judge in seconds whether this is real and worth pursuing — value, confidence and fit are on the surface, not buried in a later step.',
    isNew: true,
    newNote: 'The qualification read (appetite · confidence · suitability) is new this iteration.',
    addresses: 'Previously the RM had no sense of likely appetite or fit until well into the process.',
    dimensions: [
      { name: D.qualify, primary: true },
      { name: D.needs, primary: false },
    ],
    stage: STAGE.prospect,
    source: 'The bank’s own appetite, limits and product data from One View CRM and Internal MI & Reporting, applied to this client’s situation.',
    maturity: 'Next horizon',
  },
  'ignition.signals': {
    title: 'Why this, why now',
    whatItIs:
      'The evidence behind the opportunity — each signal labelled with where it came from and how current it is.',
    whyItsHere:
      'An RM will only act on a prompt they can explain to a client. Every signal shows its source and recency, so the “why now” is defensible.',
    isNew: true,
    newNote: 'Each signal now carries a plain-language source and time horizon.',
    youAskedFor: 'Frame the breadth of data — past, present, live and predicted — as one picture.',
    addresses: 'Signals used to appear without making clear how fresh they were or where they came from.',
    dimensions: [
      { name: D.needs, primary: true },
      { name: D.interactions, primary: false },
    ],
    stage: STAGE.prospect,
    source: 'A blend of external sources (CapIQ, S&P, Companies House, D&B) and internal systems (One View CRM, BSM, Internal MI & Reporting) — past, present, live and predicted.',
    maturity: 'Next horizon',
  },
  'ignition.prequal': {
    title: 'Pre-qualification checks',
    whatItIs:
      'A quick pass on the hard gates — jurisdiction, sector limits and sanctions — plus who already covers the client.',
    whyItsHere:
      'It stops the RM investing time in something that would fall at the first hurdle, and makes joint coverage visible from the start.',
    isNew: true,
    newNote: 'New this iteration.',
    addresses: 'There was no automatic check for non-starters, and no view of who else covers the client.',
    dimensions: [
      { name: D.qualify, primary: true },
      { name: D.risk, primary: false },
    ],
    stage: STAGE.prospect,
    source: 'Internal policy and limits (BSM, Internal MI & Reporting), sanctions screening, Moody’s & S&P credit ratings, and coverage records in One View CRM.',
    maturity: 'Next horizon',
  },
  'ignition.coverage': {
    title: 'Coverage & ownership',
    whatItIs:
      'Who owns the relationship and who else needs to be in the loop on this opportunity from the outset.',
    whyItsHere:
      'It makes joint coverage explicit before any work starts — so the right RM leads, the right colleagues are notified, and nothing is pursued in isolation or duplicated across teams.',
    isNew: true,
    newNote: 'New this iteration.',
    addresses: 'Coverage and ownership were not surfaced at the point an opportunity was raised.',
    dimensions: [
      { name: D.interactions, primary: true },
      { name: D.friction, primary: false },
    ],
    stage: STAGE.prospect,
    source: 'Coverage and relationship-ownership records in One View CRM, plus group wealth holdings in Scottish Widows.',
    maturity: 'Available now',
  },
  'ignition.benchmark': {
    title: 'Peer / sector benchmark',
    whatItIs:
      'How this client’s situation compares to similar businesses and deals in the sector.',
    whyItsHere:
      'It validates the opportunity against comparators, so the need is evidenced rather than asserted — and gives Daisy a credible talking point.',
    isNew: true,
    newNote: 'New this iteration.',
    addresses: 'Client needs were not previously checked against peers or the wider portfolio.',
    dimensions: [
      { name: D.needs, primary: true },
      { name: D.shape, primary: false },
    ],
    stage: STAGE.prospect,
    source: 'Sector and peer data (IBIS World, S&P, D&B, Experian) with the bank’s own portfolio MI.',
    maturity: 'Next horizon',
  },

  /* =====================================================================
   * SCENE 2 — Relationship intelligence (new scene)
   * =================================================================== */
  relationship: {
    title: 'Relationship intelligence',
    whatItIs:
      'The full group picture before Daisy walks into the room — the network, the health of the relationship, the history and the gaps.',
    whyItsHere:
      'It puts the relationship first and the deal second: seven years of context, not a point-in-time alert. The opening frame is human, with intelligence in support.',
    isNew: true,
    newNote: 'A brand-new scene this iteration, filling the previously empty “Relationships” tab.',
    addresses: 'There was no longitudinal relationship view — history, health and network were missing.',
    youAskedFor: 'Lead with human relationships; show the depth of context the RM holds.',
    dimensions: [
      { name: D.interactions, primary: true },
      { name: D.needs, primary: true },
    ],
    stage: STAGE.needs,
    source: 'Years of meetings, calls, emails and CRM notes across both coverage teams.',
    maturity: 'Next horizon',
  },
  'relationship.network': {
    title: 'Contact network map',
    whatItIs:
      'A map of the real human network across the group — the contacts at each company and which RM covers them.',
    whyItsHere:
      'It shows where the relationship is strong, where it is developing, and where there is white-space, so Daisy knows who to engage as the two companies become one group.',
    isNew: true,
    newNote: 'New this iteration (adapted from an earlier concept and extended for the group).',
    dimensions: [
      { name: D.interactions, primary: true },
      { name: D.needs, primary: false },
    ],
    stage: STAGE.needs,
    source: 'Contact and engagement records across both teams — coverage and contacts from One View CRM, meeting and call activity from MS Teams, and email threads from MS Outlook.',
    maturity: 'Next horizon',
  },
  'relationship.health': {
    title: 'Relationship health & sentiment trend',
    whatItIs:
      'A single health score for the group, plus how sentiment has moved over the last six months.',
    whyItsHere:
      'It turns “how is this relationship doing?” into something you can see at a glance and act on — a trend, not just a snapshot.',
    isNew: true,
    newNote: 'New this iteration.',
    addresses: 'There was no consolidated view of relationship health or how it was trending.',
    dimensions: [
      { name: D.interactions, primary: true },
      { name: D.needs, primary: false },
    ],
    stage: STAGE.ongoing,
    source: 'AI synthesises client feedback and survey signals from Qualtrics, engagement cadence from MS Teams and MS Outlook, and product breadth from One MI — all on the consolidated Client 360 view.',
    maturity: 'Next horizon',
  },
  'relationship.risk': {
    title: 'Single-thread risk',
    whatItIs:
      'A flag when a large relationship rests on too few people — for example one finance director who could move on.',
    whyItsHere:
      'It surfaces a quiet risk early, so Daisy can broaden the relationship before it becomes a problem.',
    isNew: true,
    newNote: 'New this iteration.',
    dimensions: [
      { name: D.risk, primary: true },
      { name: D.interactions, primary: false },
    ],
    stage: STAGE.ongoing,
    source: 'Derived from the contact and coverage records in Client 360 and the engagement pattern across MS Outlook and MS Teams.',
    maturity: 'Next horizon',
  },
  'relationship.whitespace': {
    title: 'White-space to cover',
    whatItIs:
      'Where the bank has access but no wallet — products or parts of the group not yet served.',
    whyItsHere:
      'It points to the next growth, especially now two clients are one group with new combined needs.',
    isNew: true,
    newNote: 'New this iteration.',
    dimensions: [
      { name: D.shape, primary: true },
      { name: D.qualify, primary: false },
    ],
    stage: STAGE.ongoing,
    source: 'Product and revenue holdings from One MI and planned opportunities in KAP, set against the group’s profile in Client 360.',
    maturity: 'Next horizon',
  },
  'relationship.knowledge': {
    title: 'Knowledge visibility',
    whatItIs:
      'How much of what is known about the client is shared with the team versus held in one RM’s personal notes.',
    whyItsHere:
      'It makes institutional memory visible — client knowledge should belong to the bank, not walk out of the door with an individual.',
    isNew: true,
    newNote: 'New this iteration.',
    addresses: 'Client knowledge was often trapped with individual RMs, with no view of what was shared.',
    dimensions: [
      { name: D.interactions, primary: true },
      { name: D.friction, primary: false },
    ],
    stage: STAGE.ongoing,
    source: 'Shared records in Client 360 and KAP account plans versus an RM’s private workings in MS Excel and MS Outlook.',
    maturity: 'Future vision',
  },
  'relationship.history': {
    title: 'Interaction history',
    whatItIs:
      'Every touchpoint across both coverage threads — meetings, calls, emails and CRM notes — in one timeline.',
    whyItsHere:
      'No-one has to reconstruct the relationship from memory: the full history is in one place and shared across the team.',
    isNew: true,
    newNote: 'New this iteration.',
    addresses: 'There was no single, cross-channel record of every interaction.',
    dimensions: [
      { name: D.interactions, primary: true },
      { name: D.friction, primary: false },
    ],
    stage: STAGE.ongoing,
    source: 'Calls and meetings from MS Teams, emails from MS Outlook, and CRM notes in Client 360 — across both coverage threads.',
    maturity: 'Available now',
  },

  /* =====================================================================
   * SCENE 5 — Structure the deal
   * =================================================================== */
  structure: {
    title: 'Structure the deal',
    whatItIs:
      'Where the conversation becomes a shaped facility — options built around the client’s situation, ready for credit.',
    whyItsHere:
      'It lets Daisy shape and compare structures with live economics, leading with what each does for the client before the bank’s return.',
    isNew: false,
    newNote: 'Carried over and substantially extended with explore mode, eligibility, hand-off and a parallel track.',
    youAskedFor: 'Anchor on the client’s strategy first; bank economics follow as a consequence.',
    dimensions: [
      { name: D.shape, primary: true },
      { name: D.qualify, primary: false },
    ],
    stage: STAGE.origination,
    source: 'Options and pricing modelled in MS Excel, set against deal status in CIDT and credit-appetite reporting in Power BI.',
    maturity: 'Available now',
  },
  'structure.draftmode': {
    title: 'Exploring vs Committed',
    whatItIs:
      'A toggle that lets Daisy compare structures freely without anything being written to the deal record until she commits.',
    whyItsHere:
      'It gives a safe “explore before you proceed” space — soft-search in practice — so shaping options has no premature consequence.',
    isNew: true,
    newNote: 'New this iteration.',
    addresses: 'The prototype previously committed immediately, with no room to explore first.',
    dimensions: [
      { name: D.qualify, primary: true },
      { name: D.friction, primary: false },
    ],
    stage: STAGE.origination,
    maturity: 'Available now',
  },
  'structure.options': {
    title: 'Structure options & eligibility',
    whatItIs:
      'Three shaped options — lean, recommended and stretch — each with an indicative credit eligibility read.',
    whyItsHere:
      'It offers genuine multi-product choice and tells Daisy upfront whether each is likely approvable or needs escalation, so she can qualify before committing.',
    isNew: true,
    newNote: 'The indicative eligibility read on each option is new this iteration.',
    addresses: 'Options previously gave no early signal of whether they were likely to clear credit.',
    dimensions: [
      { name: D.shape, primary: true },
      { name: D.qualify, primary: true },
    ],
    stage: STAGE.origination,
    source: 'Indicative pricing worked up in MS Excel, set against deal status in CIDT and credit-appetite reporting in Power BI.',
    maturity: 'Available now',
  },
  'structure.fork': {
    title: 'Parallel tracks',
    whatItIs:
      'When the stretch option is chosen, a credit-escalation track spins up alongside the client-shaping track.',
    whyItsHere:
      'It makes the journey non-linear and realistic: Daisy keeps shaping with the client while credit runs in parallel — no waiting in series.',
    isNew: true,
    newNote: 'New this iteration (visible only when the stretch option is selected).',
    youAskedFor: 'Allow for judgement checkpoints and parallel paths, not a single straight line.',
    addresses: 'The flow used to be a single linear sequence with no parallel workstreams.',
    dimensions: [
      { name: D.risk, primary: true },
      { name: D.friction, primary: false },
    ],
    stage: STAGE.origination,
    maturity: 'Available now',
  },
  'structure.components': {
    title: 'Facility components',
    whatItIs:
      'The building blocks of the selected structure broken out line by line — the acquisition / term facility, group cash consolidation and the FX hedge — each with its size and role.',
    whyItsHere:
      'It shows what the headline number is actually made of, so the client sees a single relationship facility rather than separate products bolted together.',
    isNew: false,
    newNote: 'Carried over; now broken out as its own scannable card.',
    dimensions: [
      { name: D.shape, primary: true },
      { name: D.qualify, primary: false },
    ],
    stage: STAGE.origination,
    source: 'Component sizing modelled in MS Excel and tracked against the deal record in CIDT.',
    maturity: 'Available now',
  },
  'structure.economics': {
    title: 'Indicative economics & terms',
    whatItIs:
      'The numbers for the selected structure — value, first-year revenue, return and client fit — alongside the indicative terms: tenor, margin, arrangement fee and security.',
    whyItsHere:
      'It keeps the commercial picture honest and explainable, framed after the client benefit rather than before it, with the headline terms in the same view so the shape and the price stay together.',
    isNew: false,
    newNote: 'Carried over; economics and indicative terms now sit together behind the client-first framing.',
    dimensions: [
      { name: D.shape, primary: true },
      { name: D.qualify, primary: false },
    ],
    stage: STAGE.origination,
    source: 'Priced inline in the ePricer / EPC engine, then carried straight into the credit pack (Bolt) and CIDT — captured once, no re-keying across systems.',
    maturity: 'Available now',
  },
  'structure.specialist': {
    title: 'Loop in a product specialist',
    whatItIs:
      'A one-tap hand-off that routes the shaped structure to a named product partner for input.',
    whyItsHere:
      'Complex deals are a team effort — this brings the right specialist in early, with the context already attached.',
    isNew: true,
    newNote: 'New this iteration.',
    addresses: 'No moment previously showed the RM pulling in product expertise.',
    youAskedFor: 'Scope beyond RMs — include product colleagues.',
    dimensions: [
      { name: D.shape, primary: true },
      { name: D.interactions, primary: false },
    ],
    stage: STAGE.origination,
    source: 'The shaped deal record from CIDT, handed to the product partner over MS Teams and MS Outlook.',
    maturity: 'Available now',
  },

  /* =====================================================================
   * SCENE 6 — Capture momentum (post-meeting)
   * =================================================================== */
  capture: {
    title: 'Capture momentum',
    whatItIs:
      'The moment after the meeting where the conversation becomes a structured deal record — captured once, available to everyone who needs it.',
    whyItsHere:
      'It removes the admin tax: the CRM updates itself, the right people are notified, and Daisy’s next action is already in front of her.',
    isNew: false,
    newNote: 'Carried over and extended with cross-coverage, a credit preview and a drafted follow-up.',
    youAskedFor: 'Soften the “straight-through” language — captured once, shared with people who need it.',
    dimensions: [
      { name: D.friction, primary: true },
      { name: D.interactions, primary: false },
    ],
    stage: STAGE.origination,
    source: 'The meeting conversation, structured automatically into the deal record in CIDT.',
    maturity: 'Available now',
  },
  'capture.banner': {
    title: 'Captured as a structured deal',
    whatItIs:
      'Confirmation that the live conversation has been turned into a structured deal record and synced to the CRM.',
    whyItsHere:
      'It proves the “enter once, flows everywhere” promise — no re-keying, no reconstructing notes after the event.',
    isNew: false,
    dimensions: [
      { name: D.friction, primary: true },
    ],
    stage: STAGE.origination,
    source: 'The captured conversation, written into the deal record in CIDT and reported through Power BI.',
    maturity: 'Available now',
  },
  'capture.crosscoverage': {
    title: 'Cross-coverage & shared activity',
    whatItIs:
      'An automatic notification to the other RM covering the group, plus who can now see the deal — credit, product and coverage colleagues.',
    whyItsHere:
      'It makes the joined-up, team-based relationship real: the moment is shared, not locked to one RM’s inbox.',
    isNew: true,
    newNote: 'New this iteration.',
    addresses: 'Cross-coverage and shared visibility were implied in the story but never shown.',
    youAskedFor: 'Show the colleagues — product, credit and the other RM — as part of the team.',
    dimensions: [
      { name: D.interactions, primary: true },
      { name: D.friction, primary: false },
    ],
    stage: STAGE.origination,
    source: 'The deal record in CIDT, with colleagues notified over MS Teams and MS Outlook.',
    maturity: 'Available now',
  },
  'capture.actions': {
    title: 'Actions to progress the deal',
    whatItIs:
      'The next steps that move the deal forward — each with an owner (Daisy or the agent) and a due date.',
    whyItsHere:
      'It turns the conversation into a clear, accountable task list so nothing falls through the cracks after the meeting.',
    isNew: false,
    newNote: 'Carried over; owners and due dates now sit on every action.',
    dimensions: [
      { name: D.friction, primary: true },
      { name: D.interactions, primary: false },
    ],
    stage: STAGE.origination,
    source: 'Actions tracked against the deal record in CIDT, with owners notified over MS Teams and MS Outlook.',
    maturity: 'Available now',
  },
  'capture.creditnarrative': {
    title: 'AI credit narrative preview',
    whatItIs:
      'A draft of the credit submission narrative, written from the meeting, ready for Daisy to review before it moves on.',
    whyItsHere:
      'It gets a head start on the credit pack and lets the RM check it before it progresses — quality and speed together.',
    isNew: true,
    newNote: 'New this iteration.',
    addresses: 'Nothing previously drafted or pre-checked the credit pack before it went forward.',
    dimensions: [
      { name: D.risk, primary: true },
      { name: D.friction, primary: false },
    ],
    stage: STAGE.origination,
    source: 'The meeting and the shaped structure from CIDT, drafted into the credit submission with the pack assembled in MS PowerPoint.',
    maturity: 'Available now',
  },
  'capture.comms': {
    title: 'Drafted follow-up — in Daisy’s tone',
    whatItIs:
      'A follow-up email to the client written in the RM’s own voice, with Accept & send, Edit or Discard.',
    whyItsHere:
      'The AI does the drafting, but the RM’s voice and approval stay in control — nothing goes to a client without a human saying yes.',
    isNew: true,
    newNote: 'New this iteration.',
    addresses: 'There was no drafting in the RM’s own voice and no outreach draft to approve.',
    youAskedFor: 'Silent AI, RM voice — draft in the RM’s tone, RM approves.',
    dimensions: [
      { name: D.interactions, primary: true },
      { name: D.friction, primary: false },
    ],
    stage: STAGE.origination,
    source: 'The meeting and the shaped deal, drafted into a follow-up in MS Outlook for the RM to approve and send.',
    maturity: 'Available now',
  },

  /* =====================================================================
   * SCENE 7 — Orchestrate the deal (agent bench)
   * =================================================================== */
  orchestrate: {
    title: 'Orchestrate the deal',
    whatItIs:
      'The agent bench: a team of agents progressing the deal, organised by how much human oversight each needs.',
    whyItsHere:
      'It reframes the RM from executor to orchestrator — agents clear the busywork, Daisy keeps the judgement and the relationship.',
    isNew: false,
    newNote: 'Carried over and extended with a parallel product workstream and a cross-coverage approval.',
    youAskedFor: 'One orchestrating intelligence, not a scatter of generic agents.',
    dimensions: [
      { name: D.risk, primary: true },
      { name: D.friction, primary: false },
    ],
    stage: STAGE.origination,
    reoRole: 'REO orchestrates three tiers: Autonomous, Human-in-the-loop and RM-led.',
    maturity: 'Available now',
  },
  'orchestrate.credit': {
    title: 'Credit progression',
    whatItIs:
      'A live strip showing where the deal sits in credit — narrative status, approvals done, and anything still missing.',
    whyItsHere:
      'It gives one honest view of progress and blockers, so nothing stalls silently in an email chain.',
    isNew: false,
    dimensions: [
      { name: D.risk, primary: true },
      { name: D.friction, primary: false },
    ],
    stage: STAGE.origination,
    reoRole: 'Autonomous — tracks status; surfaces what needs a human.',
    source: 'The live state of the credit workflow.',
    maturity: 'Available now',
  },
  'orchestrate.parallel': {
    title: 'Running in parallel',
    whatItIs:
      'Work that progresses without you — agent tasks running on their own, plus the product specialist’s workstream moving alongside the deal.',
    whyItsHere:
      'It makes the parallel effort visible: agents clear the routine steps while a colleague advances their part, so the deal keeps moving without waiting on you.',
    isNew: true,
    newNote: 'New this iteration.',
    youAskedFor: 'Scope beyond RMs — agents and product colleagues as active participants.',
    dimensions: [
      { name: D.friction, primary: true },
      { name: D.shape, primary: false },
    ],
    stage: STAGE.origination,
    source: 'The live state of the agent tasks and the product workstream, tracked in CIDT.',
    maturity: 'Available now',
  },
  'orchestrate.humanloop': {
    title: 'Human in the loop',
    whatItIs:
      'The items an agent has prepared but parked for your approval — including the other RM’s cross-coverage sign-off and any agent recommendation you can accept or override.',
    whyItsHere:
      'It keeps a human accountable for the decisions that matter: the agent advises and prepares, but judgement and the final call stay with you.',
    isNew: true,
    newNote: 'New this iteration.',
    addresses: 'Approvals and the two-RM coordination the story implied were never actually shown.',
    dimensions: [
      { name: D.risk, primary: true },
      { name: D.interactions, primary: false },
    ],
    stage: STAGE.origination,
    source: 'Agent recommendations and approval items, surfaced over MS Teams and MS Outlook and tracked in CIDT.',
    maturity: 'Available now',
  },
  'orchestrate.rmonly': {
    title: 'Only you',
    whatItIs:
      'The work that stays with the RM — the relationship, the judgement calls and the conversations no agent should own.',
    whyItsHere:
      'It draws a clear line: agents clear the busywork so your time goes to relationships, judgement and winning the deal.',
    isNew: false,
    dimensions: [
      { name: D.interactions, primary: true },
    ],
    stage: STAGE.origination,
    maturity: 'Available now',
  },

  /* =====================================================================
   * SCENE 8 — Scale across the portfolio (radar)
   * =================================================================== */
  scale: {
    title: 'Scale across the portfolio',
    whatItIs:
      'The same play repeated across the whole book — opportunities ranked and ready, surfaced continuously.',
    whyItsHere:
      'It shows the model works beyond one deal, while protecting the RM from overload by leading with a curated shortlist.',
    isNew: false,
    newNote: 'Carried over and reworked to lead with a calm digest instead of a firehose.',
    dimensions: [
      { name: D.qualify, primary: true },
      { name: D.needs, primary: false },
    ],
    stage: STAGE.prospect,
    source: 'Internal MI & Reporting and One View, enriched with external market signals from Companies House, CapIQ, D&B and Experian.',
    maturity: 'Next horizon',
  },
  'scale.digest': {
    title: 'Today’s priorities digest',
    whatItIs:
      'A collapsed daily shortlist — the few actions that matter today — that expands to the full list only when you want it.',
    whyItsHere:
      'It stops the RM becoming the bottleneck: the system consolidates before it surfaces, so the default view is calm, not a wall of alerts.',
    isNew: true,
    newNote: 'New this iteration.',
    addresses: 'The radar previously surfaced every signal at once, with no consolidation.',
    youAskedFor: 'Consolidate before surfacing — don’t overload the RM.',
    dimensions: [
      { name: D.qualify, primary: true },
      { name: D.friction, primary: false },
    ],
    stage: STAGE.prospect,
    source: 'Continuous scanning across the book — Internal MI & Reporting and One View, ranked against market data from CapIQ, D&B, Moody’s and S&P.',
    maturity: 'Next horizon',
  },
  'scale.productsuggest': {
    title: 'Product suggests',
    whatItIs:
      'A radar entry whose origin is a product specialist, not a market signal — the platform pushing an idea to the RM.',
    whyItsHere:
      'It shows ideas flowing both ways: product teams can surface relevant options to the RM, not only the other way round.',
    isNew: true,
    newNote: 'New this iteration.',
    addresses: 'Product teams previously had no way to surface ideas back to the RM.',
    youAskedFor: 'Reverse proactivity — let product colleagues bring ideas to the RM.',
    dimensions: [
      { name: D.shape, primary: true },
      { name: D.interactions, primary: false },
    ],
    stage: STAGE.prospect,
    source: 'A product specialist’s idea, surfaced to the RM over MS Teams and MS Outlook.',
    maturity: 'Next horizon',
  },
  'scale.sources': {
    title: 'Intelligence sources',
    whatItIs:
      'What the always-on engine is grounded in — the categories of internal and external data behind every trigger.',
    whyItsHere:
      'It makes the radar explainable: every opportunity can be traced back to a named source, so the RM can trust it.',
    isNew: false,
    dimensions: [
      { name: D.needs, primary: true },
    ],
    stage: STAGE.prospect,
    source: 'Internal systems and external market data.',
    maturity: 'Next horizon',
  },

  /* =====================================================================
   * SCENE 9 — Unified platform
   * =================================================================== */
  unified: {
    title: 'Unified platform',
    whatItIs:
      'One pane of glass across the whole group — client, deal and workflow in a single view, pointing forward to the next cycle.',
    whyItsHere:
      'It is the single source of truth for the relationship, and it deliberately closes by looking ahead rather than declaring “done”.',
    isNew: false,
    newNote: 'Carried over, with an interaction log added and a forward-looking close.',
    youAskedFor: 'Favour continuity of relationship over a one-off “deal outcome”.',
    dimensions: [
      { name: D.friction, primary: true },
      { name: D.interactions, primary: false },
    ],
    stage: STAGE.origination,
    maturity: 'Available now',
  },
  'unified.panes': {
    title: 'Client · deal · workflow',
    whatItIs:
      'Three panes bringing the client record, the live deal and the workflow status into one consistent view.',
    whyItsHere:
      'It gives everyone — RM and senior stakeholders — the same complete picture without chasing separate systems.',
    isNew: false,
    dimensions: [
      { name: D.friction, primary: true },
      { name: D.shape, primary: false },
    ],
    stage: STAGE.origination,
    source: 'Client, deal and workflow systems, joined up.',
    maturity: 'Available now',
  },
  'unified.glasspipe': {
    title: 'Captured once — end to end',
    whatItIs:
      'A view of the deal flowing through its stages, all from a single capture.',
    whyItsHere:
      'It proves data entered once flows everywhere — no re-keying as the deal moves between teams and stages.',
    isNew: false,
    newNote: 'Language softened this iteration to reflect human-enabled flow.',
    dimensions: [
      { name: D.friction, primary: true },
    ],
    stage: STAGE.origination,
    maturity: 'Available now',
  },
  'unified.interactionlog': {
    title: 'Interaction log',
    whatItIs:
      'Every touchpoint across both coverage threads, with what is shared to the team versus personal.',
    whyItsHere:
      'It keeps relationship knowledge visible and shared, so it is never locked to a single RM.',
    isNew: true,
    newNote: 'New this iteration.',
    addresses: 'The platform previously had no full, shared interaction history.',
    dimensions: [
      { name: D.interactions, primary: true },
      { name: D.friction, primary: false },
    ],
    stage: STAGE.ongoing,
    source: 'Calls, emails, meetings and CRM notes across both threads.',
    maturity: 'Available now',
  },
  'unified.whatsnext': {
    title: 'What’s next',
    whatItIs:
      'A forward-looking strip: the next review date, the next signal to watch, and the link into the next opportunity.',
    whyItsHere:
      'It closes the relationship loop — this is not the end of a deal, it is the start of the next cycle.',
    isNew: true,
    newNote: 'New this iteration.',
    addresses: 'The story used to end at deal completion with nothing pointing forward.',
    youAskedFor: 'Close with the ongoing relationship, not the execution.',
    dimensions: [
      { name: D.interactions, primary: true },
      { name: D.needs, primary: false },
    ],
    stage: STAGE.ongoing,
    maturity: 'Available now',
  },

  /* =====================================================================
   * SCENE 10 — Relationship review & next cycle (new scene)
   * =================================================================== */
  review: {
    title: 'Relationship review & next cycle',
    whatItIs:
      'The closing scene: the mandate is live, the relationship is reviewed, and the next opportunity is already forming.',
    whyItsHere:
      'It makes the cycle explicit — the relationship continues after the deal, and the system has already detected what comes next.',
    isNew: true,
    newNote: 'A brand-new scene this iteration, closing the narrative loop.',
    addresses: 'The story previously ended at the deal with no post-win, ongoing-relationship beat.',
    youAskedFor: 'Close with the ongoing relationship and the next cycle.',
    dimensions: [
      { name: D.interactions, primary: true },
      { name: D.needs, primary: true },
    ],
    stage: STAGE.ongoing,
    maturity: 'Next horizon',
  },
  'review.mandate': {
    title: 'Group mandate — live',
    whatItIs:
      'The won mandate in life: the facility, key dates, and covenants tracking against their limits.',
    whyItsHere:
      'It shows the bank staying close after close — monitoring obligations rather than moving on to the next deal.',
    isNew: true,
    newNote: 'New this iteration.',
    addresses: 'There was no in-life view of a live mandate or its covenants.',
    dimensions: [
      { name: D.risk, primary: true },
      { name: D.friction, primary: false },
    ],
    stage: STAGE.ongoing,
    source: 'The live facility and servicing data, tracked in Client 360 and One MI.',
    maturity: 'Future vision',
  },
  'review.relreview': {
    title: 'Relationship review',
    whatItIs:
      'A review of the relationship since close — an engagement score, the trend, and the highlights.',
    whyItsHere:
      'It keeps a regular, evidenced read on relationship health so engagement stays deliberate, not reactive.',
    isNew: true,
    newNote: 'New this iteration.',
    dimensions: [
      { name: D.interactions, primary: true },
      { name: D.needs, primary: false },
    ],
    stage: STAGE.ongoing,
    source: 'Engagement across the relationship since close — drawn from Client 360, MS Outlook, MS Teams and Qualtrics.',
    maturity: 'Next horizon',
  },
  'review.nextsignal': {
    title: 'The next signal',
    whatItIs:
      'A fresh opportunity REO has already detected within the relationship — shown in the same format as the very first scene.',
    whyItsHere:
      'It is the clearest proof that the cycle restarts: the system raises its hand again, from a stronger position, before the RM even thinks to look.',
    isNew: true,
    newNote: 'New this iteration — deliberately mirrors the opening Ignition card.',
    addresses: 'Nothing previously showed the relationship generating the next opportunity.',
    youAskedFor: 'Show the feedback loop — the next signal, the next cycle.',
    dimensions: [
      { name: D.needs, primary: true },
      { name: D.qualify, primary: false },
    ],
    stage: STAGE.prospect,
    source: 'Live external signals from Companies House, CapIQ, D&B and Experian, joined to the group’s profile in One View.',
    maturity: 'Next horizon',
  },
  'review.nextactions': {
    title: 'Next best actions',
    whatItIs:
      'Three recommended actions, drawn from the full relationship history now visible across the journey.',
    whyItsHere:
      'It shows the system learning from each cycle — recommendations get sharper as the relationship record grows.',
    isNew: true,
    newNote: 'New this iteration.',
    dimensions: [
      { name: D.needs, primary: true },
      { name: D.interactions, primary: false },
    ],
    stage: STAGE.ongoing,
    source: 'The accumulated relationship history across the journey, held in KAP and Client 360.',
    maturity: 'Next horizon',
  },
};
