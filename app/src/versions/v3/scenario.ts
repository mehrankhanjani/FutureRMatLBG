/**
 * scenario.ts — iteration 3.
 *
 * Re-exports the entire v2 scenario wholesale. Individual phases add or
 * override exports here as new scene data is needed (Phases 3–8).
 * Nothing from v2 is broken or duplicated — only what changes lands here.
 */
export * from '../v2/scenario';

import {
  dealStages as dealStagesBase,
  intelligenceSources as intelligenceSourcesBase,
  type DealSnapshot,
} from '../v2/scenario';

/* =========================================================================
   Phase 9 — polish: shadow two v2 exports so every scene reads cleanly.
   (Explicit named exports take precedence over the `export *` above.)
   ========================================================================= */

/**
 * Deal-stage strip data, extended with entries for the two new v3 scenes so the
 * persistent strip shows a sensible state on all ten scenes.
 *   · relationship (Scene A) — pre-deal relationship context
 *   · review (Scene B) — the mandate is drawn and live; the cycle restarts
 */
export const dealStages: Record<string, DealSnapshot> = {
  ...dealStagesBase,
  relationship: {
    stage: 'Identified',
    stageIndex: 1,
    value: '£12m+',
    winProb: 45,
    momentum: 'Full group relationship in view before the meeting',
  },
  review: {
    stage: 'Relationship live' as DealSnapshot['stage'],
    stageIndex: 6,
    value: '£12.0m',
    winProb: 100,
    momentum: 'Mandate drawn and live — the next cycle is already forming',
  },
};

/** Always-on intelligence engine — REO branding (drops the legacy WorkIQ example). */
export const intelligenceSources = {
  ...intelligenceSourcesBase,
  example: 'e.g. REO',
};

/* =========================================================================
   Phase 3 — Scene A: Relationship Intelligence
   ========================================================================= */

/** A single interaction touchpoint surfaced in the history timeline. */
export type InteractionEvent = {
  date: string;
  channel: 'meeting' | 'call' | 'email' | 'crm' | 'teams';
  summary: string;
  rm: string;
  entity: 'Avonmore' | 'Calderwood' | 'Group';
  /** Whether this note is visible to the whole coverage team or personal to the RM */
  shared: boolean;
};

export const interactionHistory: InteractionEvent[] = [
  {
    date: 'Today',
    channel: 'teams',
    summary: 'Daisy + Marcus alignment call — group mandate approach agreed, coverage split confirmed',
    rm: 'Both',
    entity: 'Group',
    shared: true,
  },
  {
    date: '18 Jun',
    channel: 'meeting',
    summary: 'Quarterly review — Sarah confirmed the Calderwood acquisition has completed; group integration and combined funding raised as the priorities',
    rm: 'Daisy',
    entity: 'Avonmore',
    shared: true,
  },
  {
    date: '10 Jun',
    channel: 'email',
    summary: 'Follow-up on Q1 order book; working capital timing conversation initiated by Daisy',
    rm: 'Daisy',
    entity: 'Avonmore',
    shared: true,
  },
  {
    date: '3 Jun',
    channel: 'meeting',
    summary: 'Calderwood half-year review — Paul Whitaker confirmed revenue tracking 12% ahead of plan',
    rm: 'Marcus',
    entity: 'Calderwood',
    shared: true,
  },
  {
    date: '22 May',
    channel: 'crm',
    summary: 'Calderwood exploring capacity expansion — potential capex need in Q3, watching closely',
    rm: 'Marcus',
    entity: 'Calderwood',
    shared: false,
  },
  {
    date: '15 May',
    channel: 'call',
    summary: 'Pre-meeting prep call — Daisy reviewed Avonmore pipeline with Sarah ahead of quarterly',
    rm: 'Daisy',
    entity: 'Avonmore',
    shared: true,
  },
];

/** Monthly relationship sentiment scores (0–100) over the past 6 months. */
export type SentimentPoint = { month: string; score: number };

export const sentimentData: SentimentPoint[] = [
  { month: 'Jan', score: 62 },
  { month: 'Feb', score: 65 },
  { month: 'Mar', score: 68 },
  { month: 'Apr', score: 64 },
  { month: 'May', score: 71 },
  { month: 'Jun', score: 78 },
];

/** A contact node in the group network map. */
export type GroupNode = {
  id: string;
  label: string;
  role: string;
  strength: 'strong' | 'medium' | 'weak';
  /** Which company this contact belongs to */
  entity: 'Avonmore' | 'Calderwood';
};

/**
 * Extended relationship object for the group story.
 * Covers both Avonmore (Daisy, 7 yrs) and Calderwood (Marcus, 3 yrs).
 */
export const groupRelationship = {
  healthScore: 78,
  trend: '+6 this quarter',
  coverageNote: 'Daisy Bennett — Avonmore Components · 7 yrs · 4 contacts. Marcus Reed — Calderwood Engineering · 3 yrs · 2 contacts.',
  singleThreadRisk:
    'Sarah Whitfield (Group CFO) is the primary Avonmore contact — no C-suite depth beyond her. Calderwood Treasury and COO are uncovered.',
  whiteSpace: 'The new group holding entity has no coverage. Calderwood Treasury is open white-space ahead of the group consolidation.',
  knowledgeShared: 4,
  knowledgePersonal: 2,
  nodes: [
    { id: 'aw-cfo',   label: 'Sarah Whitfield', role: 'Group CFO',          strength: 'strong',  entity: 'Avonmore'   },
    { id: 'aw-ceo',   label: 'Mark Avon',        role: 'CEO',                strength: 'medium',  entity: 'Avonmore'   },
    { id: 'aw-fd',    label: 'Priya Shah',        role: 'Finance Director',   strength: 'medium',  entity: 'Avonmore'   },
    { id: 'aw-de',    label: 'Group HoldCo',      role: 'New — no coverage',  strength: 'weak',    entity: 'Avonmore'   },
    { id: 'ce-ceo',   label: 'Paul Whitaker',     role: 'CEO',                strength: 'strong',  entity: 'Calderwood' },
    { id: 'ce-cfo',   label: 'Claire Booth',      role: 'CFO',                strength: 'medium',  entity: 'Calderwood' },
    { id: 'ce-treas', label: 'Treasury',           role: 'Open white-space',   strength: 'weak',    entity: 'Calderwood' },
  ] as GroupNode[],
};

/* =========================================================================
   Phase 4 — Scene B: Relationship Review & Next Cycle
   ========================================================================= */

type ReviewIcon = 'users' | 'check' | 'building' | 'heart' | 'globe' | 'doc' | 'calendar' | 'shield' | 'target';

/** A covenant tracked against its limit on the live group mandate. */
export type Covenant = {
  label: string;
  value: string;
  limit: string;
  status: 'ok' | 'watch';
};

/** The group mandate, now live and drawn after the deal closed. */
export const groupMandate = {
  name: 'Avonmore Group — acquisition & integration mandate',
  status: 'Live · fully drawn',
  facility: '£12.0m',
  product: 'Acquisition finance · Group cash · FX',
  closed: 'Closed 24 Jun · won',
  nextReview: 'Q3 review · 18 Sep',
  covenants: [
    { label: 'Leverage',       value: '2.1x', limit: '≤ 3.0x',   status: 'ok' },
    { label: 'Interest cover', value: '4.6x', limit: '≥ 3.0x',   status: 'ok' },
    { label: 'DSCR',           value: '1.8x', limit: '≥ 1.25x',  status: 'ok' },
  ] as Covenant[],
};

/** A single headline stat in the relationship review card. */
export type ReviewStat = { label: string; value: string; icon: ReviewIcon };

/** The relationship summary since the mandate closed — the loop made visible. */
export const relationshipReview = {
  period: 'Since mandate close · last 90 days',
  engagementScore: 84,
  engagementTrend: '+6 vs last quarter',
  stats: [
    { label: 'Meetings held',   value: '7',  icon: 'users'    },
    { label: 'Issues resolved', value: '5',  icon: 'check'    },
    { label: 'Products live',   value: '3',  icon: 'building' },
    { label: 'Engagement',      value: '84', icon: 'heart'    },
  ] as ReviewStat[],
  highlights: [
    'Group cash pool live across both entities — treasury consolidated into one structure',
    'Calderwood Treasury now covered by Marcus — the single-thread risk is closed',
    'FX hedge executed on the combined group exposure',
  ],
};

/** A trigger behind the next-cycle signal — mirrors the Ignition signal shape. */
export type NextTrigger = { icon: ReviewIcon; label: string; detail: string; source: string };

/**
 * The next signal REO has already detected — the cycle restarting.
 * Deliberately mirrors the Ignition card format so the loop is unmistakable.
 */
export const nextSignal = {
  headline: 'Next signal — a bolt-on is forming',
  confidence: 'High',
  when: 'Detected today · early signal',
  estValue: '£6m+',
  predictedNeed: 'Acquisition finance for a Midlands bolt-on',
  triggers: [
    {
      icon: 'globe',
      label: 'Market signal',
      detail: 'Hartfield Precision (Midlands) is exploring a sale — adviser mandate live',
      source: 'External market data',
    },
    {
      icon: 'doc',
      label: 'Supply-chain link',
      detail: 'Hartfield already supplies the Avonmore Group — a natural bolt-on',
      source: 'Internal CRM · supplier map',
    },
    {
      icon: 'target',
      label: 'Pattern match',
      detail: 'Mirrors the Calderwood play — acquisitive group, headroom on the facility',
      source: 'Portfolio model',
    },
  ] as NextTrigger[],
  whyNow:
    'A precision-engineering supplier already inside the Avonmore Group supply chain is exploring a sale — a potential bolt-on that extends the group platform. The same play that won Calderwood is forming again, and you are already on the inside.',
};

/** A prioritised action REO recommends from the full accumulated history. */
export type NextBestAction = {
  rank: number;
  title: string;
  rationale: string;
  basis: string;
  icon: ReviewIcon;
};

export const nextBestActions: NextBestAction[] = [
  {
    rank: 1,
    title: 'Open the bolt-on conversation with Sarah',
    rationale: 'Surface Hartfield Precision as a group acquisition target before another bank does.',
    basis: 'Next-cycle signal · group acquisition appetite',
    icon: 'globe',
  },
  {
    rank: 2,
    title: 'Introduce Marcus to the new Group HoldCo board',
    rationale: 'Close the last white-space — the group holding entity still has no coverage.',
    basis: 'Relationship intelligence · open white-space',
    icon: 'users',
  },
  {
    rank: 3,
    title: 'Book the Q3 covenant review with group treasury',
    rationale: 'Covenants are tracking comfortably; lock the 18 Sep review and keep the relationship live.',
    basis: 'Live mandate · covenant schedule',
    icon: 'calendar',
  },
];

/* =========================================================================
   Phase 5 — Enrich Scene 1: Opportunity Ignition
   ========================================================================= */

/** A pre-deal qualification check shown as a pass/flag row. */
export type Disqualifier = { label: string; value: string; status: 'pass' | 'flag' };

/**
 * Qualification, benchmark and ownership context for the Ignition scene —
 * turning the alert into a qualification moment before the RM acts.
 */
export const ignitionQualification = {
  /** Headline qualification chip on the hero card. */
  appetite: 'Within appetite',
  confidence: 'High',
  suitability: 'Strong',
  /** Pass/flag checks beneath the signals grid. */
  disqualifiers: [
    { label: 'Jurisdiction', value: 'UK — clear',        status: 'pass' },
    { label: 'Sector limit',  value: 'Within bounds',     status: 'pass' },
    { label: 'Sanctions',     value: 'Screened — clear',  status: 'pass' },
  ] as Disqualifier[],
  /**
   * Data horizon label per ignition signal, aligned by index to
   * `ignition.signals`. Surfaced as a prefix on each source chip.
   */
  horizons: [
    'Live event · Ring 3',
    'Live event · Ring 3',
    'Historical · Ring 2',
    'Historical · Ring 2',
    'Predicted · REO model',
  ],
  /** Peer/sector benchmark — how this opportunity compares. */
  benchmark: {
    headline:
      '3 of 5 comparable UK mid-market manufacturing acquirers raised acquisition finance plus integration funding within 12 months of completing a bolt-on',
    rows: [
      { label: 'Raised acquisition + integration funding', value: '3 of 5 peers' },
      { label: 'Median time to refinance & consolidate',   value: '< 12 months' },
    ],
  },
  /** Ownership confirmation — the group is jointly covered. */
  coverage: {
    owner: 'Daisy Bennett · BCB',
    notify: 'Marcus Reed · CIB',
  },
};

/* =========================================================================
   Phase 6 — Enrich Scene 4: Deal Structuring & Win Strategy
   ========================================================================= */

/** Indicative credit eligibility for a structure option, before formal credit. */
export type EligibilityBand = {
  status: 'approvable' | 'review' | 'escalation';
  label: string;
  detail: string;
};

/** Eligibility keyed by structure option id (`structureOptions`). */
export const structureEligibility: Record<string, EligibilityBand> = {
  lean:        { status: 'approvable', label: 'Within appetite', detail: 'Likely approvable' },
  recommended: { status: 'approvable', label: 'Within appetite', detail: 'Likely approvable' },
  stretch:     { status: 'escalation', label: 'Stretch',         detail: 'Credit escalation required' },
};

/** The product specialist REO can hand the FX workstream to. */
export const productSpecialist = {
  name: 'Aisha Khan',
  role: 'FX & Risk Solutions · Markets',
  note: 'Looped in to structure the group FX hedge on the combined exposure — runs in parallel without pulling Daisy off the relationship.',
};

/** The parallel credit track that opens when the stretch structure is chosen. */
export const creditEscalation = {
  title: 'Parallel — credit escalation opened',
  detail:
    'The stretch structure exceeds standard appetite. REO has opened a parallel credit escalation track so shaping continues uninterrupted while credit reviews.',
  owner: 'Credit risk · escalation desk',
};

/* =========================================================================
   Phase 7 — Enrich Scenes 6 & 7: Post-meeting & Agent Bench
   ========================================================================= */

/** Cross-coverage notification shown after the meeting is captured. */
export const crossCoverageNotice = {
  who: 'Marcus Reed',
  detail: 'Calderwood Engineering thread merged into the Avonmore Group mandate',
};

/** Who can see this record — the shared activity log. */
export const teamVisibility = [
  'Daisy Bennett · BCB',
  'Marcus Reed · CIB',
  'Credit risk team',
];

/** AI-drafted credit submission narrative, previewable before Agent Bench runs it. */
export const creditNarrativePreview = {
  title: 'Credit submission narrative — drafted',
  summary:
    'REO has drafted the credit submission narrative from the conversation and both entities’ filings. Review before Agent Bench progresses it to credit.',
  body: `Avonmore Components has completed the acquisition of Calderwood Engineering, forming the Avonmore Group — £70m combined revenue across UK Midlands & North industrial and precision manufacturing.

The group seeks £12.0m of acquisition finance plus consolidation of group cash and FX into a single structure. Both entities are existing Lloyds clients with established performance histories; combined exposure of £31m sits within group appetite.

Security: cross-guarantees and a group debenture. Integration risk is mitigated by retained management on both sides and a tracked 90-day consolidation plan.`,
};

/** Agent-bench addition: the autonomous product specialist workstream (#16). */
export const productWorkstream = {
  name: 'Product specialist',
  desc: 'Running parallel FX structuring workstream',
  meta: 'Markets · Aisha Khan',
};

/** Agent-bench addition: cross-coverage human-in-the-loop approval (#5). */
export const crossCoverageApproval = {
  name: 'Cross-coverage approval',
  desc: 'Marcus Reed approval needed — consolidate the Calderwood mandate under the Avonmore Group',
  who: 'Marcus Reed · CIB',
};

/* =========================================================================
   Phase 8 — Enrich Scenes 2, 7 & 8: Activate, Radar & Unified Platform
   ========================================================================= */

/** Smart-filter digest bar config for the radar (#4) — calm summary first. */
export const radarDigest = {
  label: "Today's priorities",
  count: 3,
  note: 'The three that need you today. The rest stay ranked on your radar — expand when you are ready.',
};

/**
 * Data-horizon label per radar item, aligned by index to v2 `radar`.
 * Surfaced as a prefix on each card's "Detected from" line (#10).
 */
export const radarHorizons = [
  'Live event · Ring 3',
  'Live event · Ring 3',
  'Historical · Ring 2',
  'Predicted · REO model',
];

/**
 * A radar card pushed by a product specialist rather than a market signal (#22).
 * Shows the platform pushing both ways — coverage and product meeting in one view.
 */
export const productSuggestion = {
  client: 'Avonmore Group',
  origin: 'Product specialist · Aisha Khan',
  trigger: 'FX hedge structured for the combined group exposure',
  reason: 'Markets has shaped an indicative hedge — take it to Sarah alongside the live mandate',
  product: 'FX risk solutions',
  priority: 'Medium' as const,
  when: 'This week',
  horizon: 'Product-led · Markets',
};

/** Forward-looking close for the Unified Platform (#3) — points to the next cycle. */
export const whatsNext = {
  reviewDate: 'Q3 covenant review · 18 Sep',
  nextSignal: 'Hartfield Precision — a Midlands bolt-on is forming',
  link: 'Relationship review & next cycle',
};
