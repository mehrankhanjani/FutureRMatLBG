export * from '../v3/scenario';
import type { Owner } from './shared/trust';

/* =========================================================================
   Iteration 5 — Shape the proposition (Scene 5, Deal structuring)
   New data for the deal-solutioning, precedent, security, pricing and
   business-rules enablers. Structure options / eligibility / economics are
   reused from v3 (which re-exports v2).
   ========================================================================= */

/* ---- S1 · Deal solutioning — which product best fits the need ----------- */

export type SolutionOption = {
  id: string;
  product: string;
  fit: 'Best fit' | 'Partial fit' | 'Poor fit';
  why: string;
  recommended?: boolean;
};

export const solutioning = {
  need: 'Fund the Calderwood acquisition and consolidate group cash & FX under one mandate',
  recommendedId: 'acqterm',
  options: [
    {
      id: 'acqterm',
      product: 'Acquisition / term facility',
      fit: 'Best fit',
      why: 'Matches a one-off acquisition with a defined repayment profile.',
      recommended: true,
    },
    {
      id: 'rcf',
      product: 'Revolving credit facility',
      fit: 'Partial fit',
      why: 'Flexible, but priced for working capital — not a clean fit for a one-off acquisition.',
    },
    {
      id: 'abl',
      product: 'Asset-based lending',
      fit: 'Poor fit',
      why: 'Group asset base is too light to secure the full acquisition value.',
    },
  ] as SolutionOption[],
  reasoning: [
    'Need is a one-off acquisition plus ongoing group cash/FX — a term facility funds the deal, cash pooling handles the rest.',
    'Client asked for "one bank" — a term facility anchored to the group mandate consolidates the relationship.',
    'Comparable acquirers in the sector financed bolt-ons with term facilities, not RCFs.',
  ],
  basis: 'Grounded in: confirmed need (Live Moment), product shelf, precedent deals · Confidence High',
};

/* ---- S2 · Peer / precedent — how similar deals were structured ---------- */

export type PrecedentDeal = {
  client: string;
  sector: string;
  structure: string;
  outcome: string;
  rm: string;
};

export const precedentDeals: PrecedentDeal[] = [
  {
    client: 'Midlands food producer',
    sector: 'Food & beverage manufacturing',
    structure: 'Term acquisition facility + group cash pool',
    outcome: 'Closed in 8 weeks · RoRWA 2.6%',
    rm: 'J. Okafor · CIB',
  },
  {
    client: 'North-west packaging group',
    sector: 'Industrials',
    structure: 'Term facility + FX hedge on combined exposure',
    outcome: 'Full mandate won · +£0.7m Y1 revenue',
    rm: 'S. Patel · BCB',
  },
  {
    client: 'Yorkshire precision engineer',
    sector: 'Precision manufacturing',
    structure: 'Acquisition finance + working-capital line',
    outcome: 'Refinanced within 90 days',
    rm: 'L. Green · BCB',
  },
];

export const precedentNote =
  'Best practice from three comparable acquisitions across the bank — same shape, same sector.';

/* ---- S5 · Likely security / collateral suggestions ---------------------- */

export type SecurityItem = { label: string; detail: string };

export const securitySuggestions = {
  items: [
    { label: 'Group debenture', detail: 'Fixed & floating charge across both entities post-integration' },
    { label: 'Cross-guarantees', detail: 'Avonmore ↔ Calderwood, reflecting the single group' },
    { label: 'Property charge', detail: 'First charge over the Calderwood freehold site' },
    { label: 'Key-person cover', detail: 'Assignment of key-person protection on the founder' },
  ] as SecurityItem[],
  reasoning: [
    'Cross-guarantees reflect that Avonmore and Calderwood are now one group — standard for a group mandate.',
    'Property charge secures the facility against a tangible, independently valued asset.',
    'Key-person cover addresses the founder concentration flagged in the relationship history.',
  ],
  basis: 'Grounded in: group structure (Companies House), asset register, credit policy · Confidence Medium',
};

/* ---- S6 · Integrated pricing per structure option ----------------------- */

export type Pricing = { margin: string; arrangementFee: string; price: string };

export const pricingByOption: Record<string, Pricing> = {
  lean: { margin: '+2.10%', arrangementFee: '0.75%', price: '£0.41m Y1' },
  recommended: { margin: '+2.25%', arrangementFee: '0.85%', price: '£0.64m Y1' },
  stretch: { margin: '+2.35%', arrangementFee: '0.95%', price: '£0.82m Y1' },
};

export const pricingReasoning = [
  'Margin set from the acquisition-finance floor plus a group-relationship discount.',
  'Arrangement fee benchmarked to comparable acquisition facilities.',
  'RoRWA clears the portfolio hurdle at the recommended structure.',
];

export const pricingBasis =
  'Grounded in: ePricer / EPC engine, cost of capital, RWA model · Confidence High';

/* ---- S4 · Business rules / logic that shaped the outputs ---------------- */

export type DealRule = { rule: string; logic: string; status: 'met' | 'applied' | 'flag' };

export const dealRules: DealRule[] = [
  { rule: 'Acquisition-finance margin floor', logic: '≥ +2.00% → applied +2.25%', status: 'applied' },
  { rule: 'RoRWA hurdle', logic: '≥ 2.30% → met at 2.5%', status: 'met' },
  { rule: 'Single-name exposure limit', logic: '£20m cap → £8m headroom', status: 'met' },
  { rule: 'Security cover', logic: 'Group debenture + cross-guarantees required', status: 'applied' },
  { rule: 'Sector concentration', logic: 'Manufacturing within portfolio bounds', status: 'met' },
];

export const dealRulesNote =
  'Maintained by product and credit teams — updates here flow straight into the structuring outputs.';

/* ---- Structure-recommendation reasoning (S7 on structure options) ------- */

export const structureReasoning = [
  'Recommended sizing consolidates both entities\u2019 cash and FX into one mandate — the relationship win.',
  'Lean funds only the acquisition and leaves the group fragmented across two banks.',
  'Stretch exceeds standard appetite and opens a parallel credit-escalation track.',
];

export const structureBasis =
  'Grounded in: both entities\u2019 filings, the integration conversation, appetite model · Confidence High';

/* =========================================================================
   Iteration 5 — Identify the need (Scenes 1, 2 & 8)
   ========================================================================= */

/* ---- Scene 1 · Ignition — credit/appetite/risk (I13) -------------------- */

export type CreditLine = { label: string; value: string; status: 'ok' | 'watch' };

export const ignitionCredit = {
  lines: [
    { label: 'Group appetite', value: 'Within appetite · £8m headroom', status: 'ok' },
    { label: 'Existing limits', value: 'Avonmore £6m · Calderwood £3m', status: 'ok' },
    { label: 'Utilisation', value: '62% across the group', status: 'ok' },
    { label: 'Risk rating', value: 'BB+ · stable outlook', status: 'ok' },
  ] as CreditLine[],
  reasoning: [
    'Combined group exposure stays within single-name appetite with £8m headroom.',
    'Both entities are investment-grade-adjacent with no covenant breaches on file.',
    'Sector concentration remains within portfolio bounds after the acquisition.',
  ],
  basis: 'Grounded in: credit policy, One MI, Moody\u2019s / S&P ratings · Confidence High',
};

/* ---- Scene 1 · Ignition — related opportunities + activity (I4, I14) ---- */

export type RelatedOpp = { title: string; value: string; when: string; tone: 'opportunity' | 'context' };
export type AccountActivity = { label: string; detail: string; when: string };

export const relatedOpportunities = {
  opps: [
    { title: 'Group FX hedging', value: '£1.5m notional', when: 'Next 3 months', tone: 'opportunity' },
    { title: 'Founder wealth & protection', value: 'Private-side referral', when: 'Live', tone: 'context' },
    { title: 'Calderwood asset-finance refresh', value: '£1.2m', when: 'Next 6 months', tone: 'opportunity' },
  ] as RelatedOpp[],
  activity: [
    { label: 'Product switch', detail: 'Avonmore moved to the Corporate current-account tier', when: '3 wks ago' },
    { label: 'Service interaction', detail: 'Two payment queries resolved via servicing', when: '1 mo ago' },
  ] as AccountActivity[],
};

/* ---- Scene 8 · Radar — pipeline horizon (I5) + gaps lens (I1, I2) ------- */

export type HorizonBucket = { period: string; count: number; value: string; tone: 'accent' | 'brand' | 'info' };

export const pipelineHorizon: HorizonBucket[] = [
  { period: 'This month', count: 3, value: '£4.2m', tone: 'accent' },
  { period: 'This quarter', count: 7, value: '£11.8m', tone: 'brand' },
  { period: 'This year', count: 18, value: '£46m', tone: 'info' },
];

export type RadarGap = { label: string; detail: string; kind: 'pricing' | 'dormant' | 'whitespace' };

export const radarGaps: RadarGap[] = [
  { label: 'Missing pricing', detail: '2 live opportunities have no indicative price attached', kind: 'pricing' },
  { label: 'Dormant client', detail: 'HSBC — work completed, no active relationship or follow-on', kind: 'dormant' },
  { label: 'White-space', detail: 'Group FX not covered for 4 acquisitive clients in the book', kind: 'whitespace' },
];

/* =========================================================================
   Iteration 5 — Orchestrate origination (Scene 7, control centre)
   ========================================================================= */

export type OppStatus = 'on-track' | 'at-risk' | 'blocked';

/* ---- O1 · Opportunity overview header ----------------------------------- */
export const opportunityOverview = {
  deal: 'Avonmore Group — acquisition & group mandate',
  stage: 'Credit & risk approval',
  status: 'at-risk' as OppStatus,
  nextAction: 'Chase the outstanding Calderwood KYC document',
  owner: 'rm' as Owner,
  lastInteraction: 'Client call · 2 days ago',
  blocker: 'KYC document outstanding · 5 days',
  nextMilestone: 'Credit decision · target Friday',
};

/* ---- O13 · Opportunity health indicators -------------------------------- */
export const controlHealth = [
  { label: 'Time in stage', value: '2 days' },
  { label: 'Open blockers', value: '2' },
  { label: 'Pending client', value: '1' },
  { label: 'Decision readiness', value: '75%' },
];

/* ---- O3 · Next best actions --------------------------------------------- */
export type NextAction = {
  priority: 'High' | 'Medium' | 'Low';
  action: string;
  owner: Owner;
  due: string;
  why: string;
  done?: boolean;
};
export const controlNextActions: NextAction[] = [
  { priority: 'High', action: 'Chase missing KYC document from Calderwood', owner: 'rm', due: 'Today', why: 'Blocking the credit submission' },
  { priority: 'High', action: 'Review the AI-generated meeting summary', owner: 'rm', due: 'Today', why: 'Needs validation before it enters the record' },
  { priority: 'Medium', action: 'Confirm client appetite for the FX hedge', owner: 'rm', due: 'This week', why: 'Unlocks the stretch structure' },
  { priority: 'Medium', action: 'Notify servicing team of pending onboarding', owner: 'agent', due: 'Auto', why: 'Prepares the in-life setup', done: true },
];

/* ---- O4 · Blockers & dependencies (with O6 nudge/escalation) ------------ */
export type Blocker = {
  what: string;
  owner: Owner;
  impact: string;
  age: string;
  next: string;
  escalate: boolean;
};
export const controlBlockers: Blocker[] = [
  { what: 'Missing KYC document', owner: 'awaiting', impact: 'Blocks the credit submission', age: '5 days', next: 'Nudge the client contact', escalate: false },
  { what: 'Approval pending', owner: 'risk', impact: 'Delays the credit decision', age: '2 days', next: 'Escalate to the approver', escalate: true },
];

/* ---- O2 · Visual origination journey ------------------------------------ */
export type JourneyStage = {
  stage: string;
  status: 'done' | 'active' | 'blocked' | 'upcoming';
  owner: Owner;
  dep?: string;
};
export const originationJourney: JourneyStage[] = [
  { stage: 'Conversation captured', status: 'done', owner: 'agent' },
  { stage: 'Opportunity identified', status: 'done', owner: 'agent' },
  { stage: 'Needs confirmed', status: 'done', owner: 'rm' },
  { stage: 'KYC / onboarding', status: 'blocked', owner: 'awaiting', dep: 'Awaiting client document' },
  { stage: 'Internal review', status: 'active', owner: 'agent' },
  { stage: 'Approval / decision', status: 'upcoming', owner: 'risk' },
  { stage: 'Client follow-up', status: 'upcoming', owner: 'rm' },
  { stage: 'Progression / closure', status: 'upcoming', owner: 'rm' },
];

/* ---- O14 · Control-centre activity feed --------------------------------- */
export type FeedItem = { who: Owner; text: string; when: string };
export const activityFeed: FeedItem[] = [
  { who: 'agent', text: 'REO drafted the credit-submission narrative', when: '10m ago' },
  { who: 'rm', text: 'Daisy added the client meeting summary', when: '2h ago' },
  { who: 'system', text: 'KYC status updated — document outstanding', when: '1d ago' },
  { who: 'risk', text: 'Approval request submitted to credit', when: '2d ago' },
  { who: 'agent', text: 'REO suggested the next best action', when: '2d ago' },
];

/* =========================================================================
   Iteration 5 — Post-meeting momentum (Scene 6)
   ========================================================================= */

/* ---- O7 · Post-meeting capture flow ------------------------------------- */
export type FlowStep = { label: string; state: 'done' | 'active' | 'todo' };
export const captureFlow: FlowStep[] = [
  { label: 'Meeting held', state: 'done' },
  { label: 'Transcript captured', state: 'done' },
  { label: 'AI summary generated', state: 'done' },
  { label: 'RM validates', state: 'active' },
  { label: 'Needs & actions extracted', state: 'todo' },
  { label: 'Record updated', state: 'todo' },
  { label: 'Colleagues notified', state: 'todo' },
];

/* ---- O8 · RM validation checkpoints ------------------------------------- */
export type ValidationItem = { label: string; detail: string };
export const validationItems: ValidationItem[] = [
  { label: 'Meeting summary', detail: '4 key moments captured from the conversation' },
  { label: 'Extracted needs', detail: 'Acquisition finance · group cash · FX hedge' },
  { label: 'Suggested actions', detail: '3 follow-ups with owners and due dates' },
  { label: 'Risks / blockers', detail: 'KYC outstanding for Calderwood Engineering' },
];

/* ---- O18 · Decision log ------------------------------------------------- */
export type Decision = {
  decision: string;
  owner: Owner;
  date: string;
  rationale: string;
  impact: string;
};
export const decisionLog: Decision[] = [
  {
    decision: 'Pursue the group mandate, not just acquisition finance',
    owner: 'rm',
    date: 'Today',
    rationale: 'Client asked for one bank across both entities',
    impact: 'Shapes the recommended structure',
  },
  {
    decision: 'Loop in the FX product specialist',
    owner: 'rm',
    date: 'Today',
    rationale: 'Combined currency exposure needs hedging',
    impact: 'Parallel product workstream opened',
  },
  {
    decision: 'Escalate the stretch structure to credit',
    owner: 'agent',
    date: 'Today',
    rationale: 'Exceeds standard appetite',
    impact: 'Credit escalation track now live',
  },
];

/* =========================================================================
   Iteration 5 — Deepen the relationship (Scenes 9 & 10)
   ========================================================================= */

/* ---- Scene 9 · Unified — relationship & portfolio health (D6) ----------- */
export type HealthKpi = { label: string; value: string; target: string; pct: number; tone: 'accent' | 'brand' | 'info' };
export const relationshipHealth = {
  score: 82,
  trend: '+6 vs last quarter',
  kpis: [
    { label: 'Share of wallet', value: '48%', target: '60%', pct: 80, tone: 'accent' },
    { label: 'Products held', value: '6', target: '8', pct: 75, tone: 'brand' },
    { label: 'Revenue YTD', value: '£1.9m', target: '£2.4m', pct: 79, tone: 'info' },
    { label: 'Engagement', value: 'High', target: 'target', pct: 88, tone: 'accent' },
  ] as HealthKpi[],
};

/* ---- Scene 9 · Unified — hub-and-spoke journey view (D2, D3) ------------- */
export type Spoke = { label: string; detail: string; icon: 'trendingUp' | 'heart' | 'globe' | 'bell' };
export const hubSpokes: Spoke[] = [
  { label: 'Deal', detail: 'Group mandate live', icon: 'trendingUp' },
  { label: 'Relationship', detail: '7-year · health 82', icon: 'heart' },
  { label: 'Portfolio', detail: 'Mid-corp manufacturing', icon: 'globe' },
  { label: 'Service', detail: 'In-life monitoring on', icon: 'bell' },
];

/* ---- Scene 10 · Review — hidden risks & opportunities (D5, D1) ---------- */
export type HiddenSignal = { kind: 'risk' | 'opp'; label: string; detail: string };
export const hiddenRisks: HiddenSignal[] = [
  { kind: 'risk', label: 'Sentiment dip', detail: 'CFO responses have slowed over the last 3 weeks' },
  { kind: 'risk', label: 'Unsuccessful touchpoint', detail: 'The FX proposal went unanswered — worth a re-approach' },
  { kind: 'opp', label: 'Emerging signal', detail: 'A competitor to a portfolio peer is exploring a sale' },
];

/* ---- Scene 10 · Review — external market / sector / peer intel (D9) ------ */
export type IntelItem = { label: string; detail: string; source: string };
export const externalIntel: IntelItem[] = [
  { label: 'Sector', detail: 'UK precision-manufacturing consolidation is accelerating', source: 'IBIS World' },
  { label: 'Peer', detail: '2 comparable acquirers refinanced within 6 months', source: 'CapIQ' },
  { label: 'Market', detail: 'Acquisition-finance margins are stable this quarter', source: 'Debt Domain' },
];
