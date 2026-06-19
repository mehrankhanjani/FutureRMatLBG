/**
 * scenario.ts — iteration 2 ("the RM wins the deal").
 *
 * Same Avonmore story, reframed around a single structured deal that the RM,
 * Daisy, originates, shapes and progresses to a win. A `deal` thread runs
 * through every scene so the pitch reads as one continuous journey.
 * All data is illustrative / mocked — no real client information.
 */

export const client = {
  name: 'Avonmore Components Ltd',
  contact: 'Sarah Whitfield',
  role: 'Chief Financial Officer',
  sector: 'Industrial Manufacturing',
  segment: 'BCB · Mid-Corporate', // unified platform also serves CIB
  relationshipValue: '£42m',
  tenureYears: 7,
  rm: 'Daisy Bennett',
  rmRole: 'Senior Relationship Manager · BCB London',
  rmInitials: 'DB',
  initials: 'AC',
};

export const meeting = {
  title: 'Quarterly review',
  location: 'Client HQ, Birmingham',
  date: 'Tue 18 Jun · 11:00',
};

/* ---- the deal thread ----------------------------------------------------- */

export type DealSnapshot = {
  /** Where this deal sits in the origination-to-win pipeline */
  stage:
    | 'Identified'
    | 'Qualified'
    | 'Shaping'
    | 'Progressing'
    | 'Credit'
    | 'Positioned to win';
  /** 1..6 — position along the pipeline, for the progress indicator */
  stageIndex: number;
  /** Indicative deal value at this point */
  value: string;
  /** Win-probability % at this point */
  winProb: number;
  /** Climb in win-probability since the previous stage (for the momentum delta) */
  winProbDelta?: number;
  /** One-line note on what just moved the deal forward */
  momentum: string;
  /** Cost of inaction — the downside if the RM doesn't act */
  downside?: string;
};

/** Stable headline for the deal, shown in the desktop deal strip. */
export const deal = {
  name: 'Avonmore — Germany growth facility',
  summary: 'Cross-border working capital + EUR FX hedge',
  target: '£8.0m',
  product: 'Working capital · FX',
  /** Total stages in the pipeline (for the progress indicator). */
  totalStages: 6,
};

/**
 * The deal's state at each desktop scene — the same opportunity, progressing.
 * Keyed by the six desktop scene ids (the two mobile scenes don't show the
 * strip). The win-probability curve climbs as the RM works the deal.
 */
export const dealStages: Record<string, DealSnapshot> = {
  ignition: {
    stage: 'Identified',
    stageIndex: 1,
    value: '£6–8m',
    winProb: 45,
    momentum: 'Surfaced proactively before the call',
    downside: '−12% win-probability if not progressed this week',
  },
  capture: {
    stage: 'Qualified',
    stageIndex: 2,
    value: '£8.0m',
    winProb: 58,
    winProbDelta: 13,
    momentum: 'Need confirmed and captured in the room',
    downside: '−8% if momentum is lost after the meeting',
  },
  structure: {
    stage: 'Shaping',
    stageIndex: 3,
    value: '£8.0m',
    winProb: 68,
    winProbDelta: 10,
    momentum: 'Facility structured to the need',
    downside: '−6% if indicative terms slip past today',
  },
  orchestrate: {
    stage: 'Progressing',
    stageIndex: 4,
    value: '£8.0m',
    winProb: 72,
    winProbDelta: 4,
    momentum: 'Credit and product engaged in parallel',
    downside: '−5% if approvals stall',
  },
  'where-you-win': {
    stage: 'Credit',
    stageIndex: 5,
    value: '£8.0m',
    winProb: 78,
    winProbDelta: 6,
    momentum: 'Decision-makers mapped — coverage broadened',
    downside: '−4% while the relationship is single-threaded',
  },
  scale: {
    stage: 'Positioned to win',
    stageIndex: 6,
    value: '£8.0m',
    winProb: 84,
    winProbDelta: 6,
    momentum: 'A repeatable play across the book',
  },
};

/* ---- scene 1: Opportunity ignition --------------------------------------- */

export type IgnitionSignal = {
  icon: 'doc' | 'globe' | 'users' | 'trendingUp' | 'building';
  label: string;
  detail: string;
  source: string;
};

/** The proactive triggers that ignite the deal before the meeting. */
export const ignition = {
  headline: 'Your highest-value call today',
  when: '11:00 · Quarterly review · Birmingham',
  estValue: '£6–8m',
  predictedNeed: 'Cross-border working capital + EUR FX',
  confidence: 'High',
  signals: [
    {
      icon: 'doc',
      label: 'Filing',
      detail: 'Q3 accounts filed — order book up 18%, capex rising',
      source: 'Companies House',
    },
    {
      icon: 'globe',
      label: 'Market',
      detail: 'EUR/GBP volatility up 12% this quarter',
      source: 'Market data',
    },
    {
      icon: 'building',
      label: 'Sector',
      detail: '2 peers financed DACH expansion in the last 90 days',
      source: 'Sector intelligence',
    },
    {
      icon: 'trendingUp',
      label: 'Portfolio pattern',
      detail: 'Matches 14 clients who took WC facilities pre-expansion',
      source: 'Portfolio model',
    },
  ] as IgnitionSignal[],
  whyNow:
    'Strong fundamentals, rising FX exposure and a sector-wide expansion trend point to a working-capital need now — ahead of the competition.',
};

/* ---- scene 5: Structure the deal ----------------------------------------- */

export type StructureOption = {
  id: string;
  name: string;
  subtitle: string;
  value: string;
  fit: string;
  revenue: string;
  rorwa: string;
  note: string;
  recommended?: boolean;
};

/** Three ways to structure the facility — the agent recommends one. */
export const structureOptions: StructureOption[] = [
  {
    id: 'lean',
    name: 'Lean',
    subtitle: 'Working capital only',
    value: '£6.0m',
    fit: 'Good fit',
    revenue: '£300k',
    rorwa: '2.1%',
    note: 'Lowest commitment — covers the core cash-timing gap.',
  },
  {
    id: 'recommended',
    name: 'Recommended',
    subtitle: 'Working capital + EUR FX hedge',
    value: '£8.0m',
    fit: 'Best fit',
    revenue: '£420k',
    rorwa: '2.4%',
    note: 'Matches the expansion need and hedges the euro exposure she flagged.',
    recommended: true,
  },
  {
    id: 'stretch',
    name: 'Stretch',
    subtitle: 'WC + FX + trade finance',
    value: '£10.0m',
    fit: 'Stretch',
    revenue: '£560k',
    rorwa: '2.3%',
    note: 'Adds a trade line for the new German entity — upside if appetite is there.',
  },
];

/** The structured facility — components and indicative terms. */
export const dealStructure = {
  components: [
    { name: 'Revolving working capital facility', value: '£8.0m', detail: 'Committed · 3-year', tag: 'Core' },
    { name: 'EUR FX hedge', value: '£1.2m notional', detail: 'Forward + collar', tag: 'Risk' },
    { name: 'Trade finance line', value: '£2.0m', detail: 'Optional add-on', tag: 'Upsell' },
  ],
  terms: [
    { label: 'Tenor', value: '3 years' },
    { label: 'Indicative margin', value: '+2.15%' },
    { label: 'Arrangement fee', value: '0.75%' },
    { label: 'Security', value: 'Debenture + receivables' },
  ],
  rationale:
    'Structured from the conversation and Avonmore’s filings — sized to the cash-conversion gap, with the FX hedge covering euro receivables from day one.',
};

/** The conversation, surfaced as a live transcript ticker in the mobile scene. */
export type TranscriptLine = {
  speaker: 'client' | 'rm';
  name: string;
  text: string;
  /** the pivotal line the system reacts to */
  key?: boolean;
};

export const transcript: TranscriptLine[] = [
  { speaker: 'rm', name: 'Daisy', text: 'Good to see you, Sarah. How has trading been this quarter?' },
  { speaker: 'client', name: 'Sarah', text: 'Strong, actually — order book is the healthiest it has been in years.' },
  { speaker: 'rm', name: 'Daisy', text: 'That is great to hear. Anything on the horizon you are weighing up?' },
  {
    speaker: 'client',
    name: 'Sarah',
    text: 'We are thinking of expanding into Germany next year, but the cash flow timing is a real concern.',
    key: true,
  },
];

export const spokenLine =
  'We are thinking of expanding into Germany next year, but the cash flow timing is a real concern.';

/** What the system detects from the spoken line. */
export type Signal = {
  id: string;
  label: string;
  detail: string;
  tone: 'need' | 'risk' | 'opportunity' | 'context' | 'emotion';
};

export const signals: Signal[] = [
  { id: 'need', label: 'Need / intent', detail: 'Expansion into Germany', tone: 'need' },
  { id: 'risk', label: 'Risk signal', detail: 'Cash flow / liquidity timing', tone: 'risk' },
  { id: 'product', label: 'Deal shape', detail: 'Working capital · FX', tone: 'opportunity' },
  { id: 'urgency', label: 'Urgency', detail: 'High intent · next year', tone: 'context' },
  { id: 'context', label: 'Context', detail: 'Peer expansions in DACH', tone: 'context' },
  { id: 'emotion', label: 'Emotion', detail: 'Hesitation in tone', tone: 'emotion' },
];

/** Subtle prompts surfaced on the RM's device in the moment. */
export type Prompt = {
  id: string;
  insight: string;
  rationale: string;
  action: string;
  /** Commercial value of acting on this prompt */
  value?: string;
  /** Why acting now wins — the timing advantage */
  timing?: string;
};

export const prompts: Prompt[] = [
  {
    id: 'p1',
    insight: 'Germany expansion + cash-timing concern — shape an £8m working capital facility.',
    rationale: 'Cross-border expansion typically widens the cash-conversion cycle by 30–45 days.',
    action: 'Position a revolving working capital facility',
    value: '£8m facility · ~£420k revenue Y1',
    timing: 'Move first — 2 peers financed DACH expansion in 90 days',
  },
  {
    id: 'p2',
    insight: 'Rising EUR receivables exposure — pair the facility with an FX hedge.',
    rationale: 'EUR/GBP volatility is up 12% this quarter; unhedged euro income erodes her margin.',
    action: 'Bring an FX hedging view alongside the facility',
    value: '£1.2m notional hedge · de-risks the deal',
    timing: 'Lock indicative terms before the next FX swing',
  },
  {
    id: 'p3',
    insight: 'Client tone suggests hesitation — low confidence on timing.',
    rationale: 'Guiding questions surface the real constraint and move the deal forward.',
    action: 'Ask: “What does the cash timing look like month by month?”',
    value: 'Qualifies the need — unlocks the deal',
    timing: 'Resolve the timing objection in the room, not after',
  },
];

/** Auto-generated post-meeting summary, lands in the CRM. */
export const summary = {
  keyMoments: [
    'Client confirmed strongest order book in years.',
    'Stated intent to expand into Germany next year.',
    'Flagged cash flow timing as the primary concern.',
  ],
  opportunities: [
    { title: 'Working capital facility', value: '£6–8m', confidence: 'High' },
    { title: 'FX hedging programme (EUR)', value: '£1.2m notional', confidence: 'Medium' },
  ],
  actions: [
    { label: 'Issue working capital indicative terms', owner: 'Agent', due: 'Today' },
    { label: 'Book product specialist (Trade & WC)', owner: 'Agent', due: 'Tomorrow' },
    { label: 'Prepare DACH expansion peer pack', owner: 'Agent', due: 'Thu' },
    { label: 'RM follow-up call to lock the timing', owner: 'Daisy', due: 'Fri' },
  ],
  email: {
    to: 'Sarah Whitfield',
    subject: 'Great to catch up — supporting your Germany expansion',
    body: `Hi Sarah,

Thank you for your time today. It was great to hear the order book is so strong.

On the Germany expansion, I would like to share how a working capital facility could smooth the cash flow timing you mentioned, alongside a simple EUR hedging approach. I will send indicative terms and a short view on how similar businesses have approached this.

I will follow up Friday to find time with our trade specialist.

Best regards,
Daisy`,
  },
};

/**
 * Capability tags for the Capture scene — the architecture beneath the magic.
 * Makes the "writes itself" moment feel engineered, not hand-wavy.
 */
export const captureCapabilities: { icon: 'globe' | 'building' | 'zap'; label: string; detail: string }[] = [
  { icon: 'globe', label: 'Glass pipe', detail: 'Conversation → structured data, transparently' },
  { icon: 'building', label: 'Headless CRM', detail: 'Cowork writes the record — no separate system' },
  { icon: 'zap', label: 'No re-keying', detail: 'Nothing typed twice — captured once, reused everywhere' },
];

/** Agent bench — three tiers. */
export type AgentStatus = 'running' | 'done' | 'waiting';
export type Agent = {
  name: string;
  desc: string;
  status: AgentStatus;
  meta: string;
  /** When present, this item carries an explicit RM override moment. */
  override?: { agentValue: string; rmValue: string; note: string };
};

export const agentBench: {
  autonomous: Agent[];
  humanInLoop: Agent[];
  rmOnly: { name: string; desc: string }[];
} = {
  autonomous: [
    { name: 'Meeting prep', desc: 'Briefing pack assembled', status: 'done', meta: '2 min ago' },
    { name: 'Data gathering', desc: 'Filings, balances + market signals pulled', status: 'running', meta: 'In progress' },
    { name: 'Product input', desc: 'WC + FX specs drafted to the need', status: 'done', meta: 'Just now' },
    { name: 'Internal coordination', desc: 'Credit, product & legal aligned', status: 'running', meta: '3 tasks' },
    { name: 'Fulfilment initiation', desc: 'Facility set-up pre-staged', status: 'running', meta: 'Queued' },
    { name: 'Opportunity monitoring', desc: 'Scanning the book for signals', status: 'running', meta: 'Live' },
  ],
  humanInLoop: [
    { name: 'Credit committee pack', desc: 'Narrative + financials assembled for early read', status: 'waiting', meta: 'Needs approval' },
    {
      name: 'Pricing recommendation',
      desc: 'Agent-modelled indicative margin',
      status: 'waiting',
      meta: 'Needs your call',
      override: {
        agentValue: 'Agent: +2.15%',
        rmValue: 'Your call: +2.40%',
        note: 'You hold the pricing judgement — 7-year relationship and low risk support a firmer margin.',
      },
    },
    { name: 'Indicative proposal', desc: 'Working capital £8m + EUR FX hedge', status: 'waiting', meta: 'Needs approval' },
    { name: 'Client follow-up', desc: 'Drafted for Sarah Whitfield', status: 'waiting', meta: 'Needs approval' },
  ],
  rmOnly: [
    { name: 'Strategic client conversations', desc: 'Lead the expansion discussion' },
    { name: 'Relationship building', desc: 'Deepen the CFO relationship' },
    { name: 'Challenging discussions', desc: 'Navigate timing & risk trade-offs' },
    { name: 'Commercial judgement', desc: 'Shape the right structure to win' },
  ],
};

/** Credit progression — surfaced at the top of the Orchestrate scene. */
export const creditProgress = {
  stage: 'Early credit read',
  narrative: 'Drafted by agent',
  approvals: { done: 1, total: 3 },
  missing: ['Updated management accounts', 'German entity structure'],
  note: 'Agent has drafted the credit narrative and flagged the risks — you review before it goes to committee.',
};

/** WorkIQ-style data sources behind the always-on intelligence engine. */
export const intelligenceSources = {
  label: 'Always-on intelligence engine',
  example: 'e.g. WorkIQ',
  blurb: 'What your digital twin is grounded in — every trigger draws on three source types, so you can see why it surfaced and trust it.',
  sources: [
    { icon: 'building' as const, name: 'Internal systems', detail: 'CRM, transactions, limits, pipeline & balances' },
    { icon: 'globe' as const, name: 'External market data', detail: 'Filings, news, FX moves & sector activity' },
    { icon: 'mic' as const, name: 'Conversation capture', detail: 'Meeting transcripts & unstructured notes' },
  ],
};

/** Opportunity radar — book-wide proactive triggers. */
export type RadarItem = {
  client: string;
  trigger: string;
  reason: string;
  product: string;
  priority: 'High' | 'Medium' | 'Low';
  when: string;
};

export const radar: RadarItem[] = [
  {
    client: 'Avonmore Components',
    trigger: 'Germany growth facility — positioned to win',
    reason: 'The play you just ran — now repeatable across similar names',
    product: 'Working capital · FX',
    priority: 'High',
    when: 'In flight',
  },
  {
    client: 'Halethorpe Foods',
    trigger: 'Filed accounts — cash up 22%',
    reason: 'Surplus liquidity; deposit & investment opportunity',
    product: 'Liquidity / deposits',
    priority: 'Medium',
    when: 'This week',
  },
  {
    client: 'Northwind Logistics',
    trigger: 'Peer issued £200m green bond',
    reason: 'Likely to explore sustainable financing',
    product: 'Sustainable finance',
    priority: 'Medium',
    when: 'This week',
  },
  {
    client: 'Brearley Pharma',
    trigger: 'Facility maturing in 90 days',
    reason: 'Refinancing window opening',
    product: 'Refinancing',
    priority: 'High',
    when: 'Within 2 weeks',
  },
];

/** Relationship intelligence graph. */
export type GraphNode = {
  id: string;
  label: string;
  role: string;
  strength: 'strong' | 'medium' | 'weak';
  key?: boolean;
};

export const relationship = {
  healthScore: 78,
  trend: '+6',
  singleThreadRisk: 'Sarah Whitfield (CFO) is the only strong contact — succession risk if she leaves.',
  whiteSpace: 'No coverage in Treasury or the new German entity.',
  nodes: [
    { id: 'cfo', label: 'Sarah Whitfield', role: 'CFO', strength: 'strong', key: true },
    { id: 'ceo', label: 'Mark Avon', role: 'CEO', strength: 'medium' },
    { id: 'fd', label: 'Priya Shah', role: 'Finance Director', strength: 'medium' },
    { id: 'treas', label: 'Treasury', role: 'Open white-space', strength: 'weak' },
    { id: 'de', label: 'German entity', role: 'No coverage', strength: 'weak' },
  ] as GraphNode[],
};

/** Single view across the bank — who already holds this relationship. */
export type CoverageRow = {
  team: string;
  contact: string;
  role: string;
  status: 'Primary' | 'Active' | 'Light';
  traction: string;
};

export const crossBank = {
  note: 'One view across the whole bank — see who already holds the relationship and the traction made, so you mobilise the right people to win.',
  rows: [
    {
      team: 'BCB · You',
      contact: 'Daisy Bennett',
      role: 'Lead Relationship Manager',
      status: 'Primary',
      traction: 'Leading the £8m Germany growth facility',
    },
    {
      team: 'CIB · Markets',
      contact: 'Tom Albright',
      role: 'FX & rates specialist',
      status: 'Active',
      traction: 'EUR hedging line already live with treasury',
    },
    {
      team: 'Transaction Banking',
      contact: 'Priya Nair',
      role: 'Payments & cash management',
      status: 'Light',
      traction: 'Domestic payments only — DACH cash white-space',
    },
  ] as CoverageRow[],
  recommend:
    'Bring Transaction Banking in now — the German entity needs cross-border cash management to win the full mandate.',
};
