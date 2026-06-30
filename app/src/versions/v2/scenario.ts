/**
 * scenario.ts — iteration 2 ("the M&A event").
 *
 * An M&A Event Alert: Avonmore Components (Client A, Daisy's client) has just
 * acquired Calderwood Engineering (Client B), a Lloyds client under a different
 * coverage team. Two Lloyds clients are now one group — a material opportunity
 * and risk moment. Daisy originates and shapes the group mandate to a win.
 * All data is illustrative / mocked — no real client information.
 */

export const client = {
  name: 'Avonmore Components Ltd',
  contact: 'Sarah Whitfield',
  role: 'Group CFO',
  sector: 'Industrial Manufacturing',
  segment: 'BCB · Mid-Corporate',
  relationshipValue: '£42m',
  tenureYears: 7,
  rm: 'Daisy Bennett',
  rmRole: 'Senior Relationship Manager · BCB London',
  rmInitials: 'DB',
  initials: 'AC',
};

/** Client B — the acquired entity, banked by a different coverage team. */
export const clientB = {
  name: 'Calderwood Engineering Ltd',
  sector: 'Precision Engineering',
  segment: 'CIB · Mid-Corporate',
  relationshipValue: '£28m',
  rm: 'Marcus Reed',
  rmRole: 'Relationship Director · CIB Coverage',
  initials: 'CE',
};

/** The combined group created by the acquisition. */
export const group = {
  name: 'Avonmore Group',
  combinedRevenue: '£70m',
  combinedExposure: '£31m',
  footprint: 'UK · Midlands & North',
  sector: 'Industrial & precision manufacturing',
};

export const meeting = {
  title: 'Integration & funding call',
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
  name: 'Avonmore Group — acquisition & integration mandate',
  summary: 'Acquisition finance + group consolidation (cash & FX)',
  target: '£12.0m',
  product: 'Acquisition finance · Cash · FX',
  /** Total stages in the pipeline (for the progress indicator). */
  totalStages: 6,
};

/**
 * The deal's state at each desktop scene — the same group mandate, progressing.
 * Keyed by the desktop scene ids (the two mobile scenes don't show the strip).
 * The win-probability curve climbs as the RM works the deal.
 */
export const dealStages: Record<string, DealSnapshot> = {
  ignition: {
    stage: 'Identified',
    stageIndex: 1,
    value: '£12m+',
    winProb: 45,
    momentum: 'M&A event surfaced proactively before competitors',
    downside: '−12% win-probability if not progressed this week',
  },
  structure: {
    stage: 'Shaping',
    stageIndex: 2,
    value: '£12.0m',
    winProb: 62,
    winProbDelta: 17,
    momentum: 'Group mandate structured to the integration need',
    downside: '−6% if indicative terms slip past this week',
  },
  capture: {
    stage: 'Qualified',
    stageIndex: 3,
    value: '£12.0m',
    winProb: 72,
    winProbDelta: 10,
    momentum: 'Need confirmed and captured in the room',
    downside: '−8% if momentum is lost after the meeting',
  },
  orchestrate: {
    stage: 'Progressing',
    stageIndex: 4,
    value: '£12.0m',
    winProb: 80,
    winProbDelta: 8,
    momentum: 'Credit, product & Client B coverage engaged in parallel',
    downside: '−5% if approvals or group alignment stall',
  },
  scale: {
    stage: 'Positioned to win',
    stageIndex: 5,
    value: '£12.0m',
    winProb: 86,
    winProbDelta: 6,
    momentum: 'A repeatable M&A play across the book',
  },
  unified: {
    stage: 'Positioned to win',
    stageIndex: 6,
    value: '£12.0m',
    winProb: 90,
    winProbDelta: 4,
    momentum: 'One platform — group deal visible end-to-end',
  },
};

/* ---- scene 1: Opportunity ignition --------------------------------------- */

export type IgnitionSignal = {
  icon:
    | 'doc'
    | 'globe'
    | 'users'
    | 'trendingUp'
    | 'building'
    | 'shield'
    | 'check'
    | 'target'
    | 'zap'
    | 'message'
    | 'clock'
    | 'heart';
  label: string;
  detail: string;
  source: string;
};

/** The proactive triggers that ignite the deal before the meeting. */
export const ignition = {
  headline: 'M&A event — two of your clients just became one group',
  when: 'Detected today · group-level opportunity',
  estValue: '£12m+',
  predictedNeed: 'Acquisition finance + group cash & FX consolidation',
  confidence: 'High',
  signals: [
    {
      icon: 'globe',
      label: 'Market news',
      detail: 'Press: Avonmore Components acquires Calderwood Engineering',
      source: 'CapIQ · S&P market data',
    },
    {
      icon: 'doc',
      label: 'Change of control',
      detail: 'Companies House filing confirms Calderwood ownership transfer',
      source: 'Companies House',
    },
    {
      icon: 'users',
      label: 'Both Lloyds clients',
      detail: 'Calderwood is banked by CIB Coverage (Marcus Reed) — separate team',
      source: 'One View CRM',
    },
    {
      icon: 'building',
      label: 'Exposure overlap',
      detail: 'Combined group exposure £31m across two coverage models',
      source: 'BSM · Internal MI & Reporting',
    },
    {
      icon: 'message',
      label: 'Transaction flows',
      detail: 'Group card and supplier flows point to payments + FX consolidation',
      source: 'Merchant Services · Away Spend',
    },
    {
      icon: 'clock',
      label: 'Asset & fleet finance',
      detail: 'Overlapping vehicle and asset finance across both entities is ready to consolidate',
      source: 'Lex/Tusker',
    },
  ] as IgnitionSignal[],
  whyNow:
    'Two Lloyds clients are now one group. Acting first lets you shape the acquisition financing and consolidate group cash and FX — before another bank, or our own teams working in silos, fragments the relationship.',
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

/** Three ways to structure the group mandate — the agent recommends one. */
export const structureOptions: StructureOption[] = [
  {
    id: 'lean',
    name: 'Lean',
    subtitle: 'Acquisition finance only',
    value: '£8.0m',
    fit: 'Good fit',
    revenue: '£410k',
    rorwa: '2.1%',
    note: 'Funds the acquisition alone — leaves group cash and FX fragmented across two banks-within-the-bank.',
  },
  {
    id: 'recommended',
    name: 'Recommended',
    subtitle: 'Acquisition finance + group cash consolidation',
    value: '£12.0m',
    fit: 'Best fit',
    revenue: '£640k',
    rorwa: '2.5%',
    note: 'Funds the deal and consolidates both entities’ cash into one group structure — the win that locks the whole relationship.',
    recommended: true,
  },
  {
    id: 'stretch',
    name: 'Stretch',
    subtitle: '+ FX hedge & working capital',
    value: '£15.0m',
    fit: 'Stretch',
    revenue: '£820k',
    rorwa: '2.4%',
    note: 'Adds group FX hedging and a combined working-capital line — full mandate if integration appetite is there.',
  },
];

/** The structured facility — components and indicative terms. */
export const dealStructure = {
  components: [
    { name: 'Acquisition / term facility', value: '£8.0m', detail: 'Funds the Calderwood purchase · 5-year', tag: 'Core' },
    { name: 'Group cash consolidation', value: '£4.0m', detail: 'Single group cash pool across both entities', tag: 'Cash' },
    { name: 'Group FX hedge', value: '£1.5m notional', detail: 'Hedges combined currency exposure', tag: 'Risk' },
  ],
  terms: [
    { label: 'Tenor', value: '5 years' },
    { label: 'Indicative margin', value: '+2.25%' },
    { label: 'Arrangement fee', value: '0.85%' },
    { label: 'Security', value: 'Cross-guarantees · group debenture' },
  ],
  rationale:
    'Structured from the integration conversation and both entities’ filings — sized to fund the acquisition and consolidate group cash and FX into one relationship, with cross-guarantees across the new group.',
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
  { speaker: 'rm', name: 'Daisy', text: 'Congratulations on the Calderwood deal, Sarah — how is the integration going?' },
  { speaker: 'client', name: 'Sarah', text: 'Thanks. It is exciting, but honestly the finances are a tangle — two sets of banking, two sets of accounts.' },
  { speaker: 'rm', name: 'Daisy', text: 'That is exactly where we can help. What is the most pressing piece?' },
  {
    speaker: 'client',
    name: 'Sarah',
    text: 'We need to refinance the acquisition and pull both companies’ cash and FX into one place — ideally with one bank.',
    key: true,
  },
];

export const spokenLine =
  'We need to refinance the acquisition and pull both companies’ cash and FX into one place — ideally with one bank.';

/** What the system detects from the spoken line. */
export type Signal = {
  id: string;
  label: string;
  detail: string;
  tone: 'need' | 'risk' | 'opportunity' | 'context' | 'emotion';
};

export const signals: Signal[] = [
  { id: 'need', label: 'Need / intent', detail: 'Refinance acquisition + consolidate', tone: 'need' },
  { id: 'risk', label: 'Risk signal', detail: 'Fragmented ownership & banking', tone: 'risk' },
  { id: 'product', label: 'Deal shape', detail: 'Acquisition finance · Cash · FX', tone: 'opportunity' },
  { id: 'urgency', label: 'Urgency', detail: 'High intent · integration underway', tone: 'context' },
  { id: 'context', label: 'Context', detail: 'Both companies are Lloyds clients', tone: 'context' },
  { id: 'emotion', label: 'Emotion', detail: 'Pressure — wants it simplified', tone: 'emotion' },
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
    insight: 'Acquisition + consolidation intent — shape a £12m group facility.',
    rationale: 'Acquirers who refinance and pool group cash early reduce integration cost and lock the relationship.',
    action: 'Position an acquisition facility with group cash consolidation',
    value: '£12m mandate · ~£640k revenue Y1',
    timing: 'Move first — the integration window is open now',
  },
  {
    id: 'p2',
    insight: 'Both companies are Lloyds clients — align one group coverage strategy.',
    rationale: 'Calderwood is covered by CIB (Marcus Reed). A single group view wins the full mandate and avoids internal silos.',
    action: 'Flag to loop in Client B’s coverage team',
    value: 'Unifies £70m group revenue under one strategy',
    timing: 'Align internally before another bank pitches',
  },
  {
    id: 'p3',
    insight: 'Client wants it simplified — consolidate cash and FX into one place.',
    rationale: 'Group cash pooling and a single FX hedge remove the “two of everything” pain she just described.',
    action: 'Ask: “Shall we map both entities’ cash and FX into one group structure?”',
    value: 'Adds cash & FX to the mandate — deepens the win',
    timing: 'Capture the requirement while it is top of mind',
  },
];

/** Auto-generated post-meeting summary, lands in the CRM. */
export const summary = {
  keyMoments: [
    'Client confirmed the Calderwood acquisition has completed.',
    'Stated intent to refinance the acquisition and consolidate.',
    'Wants both companies’ cash and FX with one bank.',
  ],
  opportunities: [
    { title: 'Acquisition / term facility', value: '£8.0m', confidence: 'High' },
    { title: 'Group cash & FX consolidation', value: '£4.0m+', confidence: 'High' },
  ],
  actions: [
    { label: 'Issue group acquisition facility indicative terms', owner: 'Agent', due: 'Today' },
    { label: 'Notify Calderwood coverage team (Marcus Reed, CIB)', owner: 'Agent', due: 'Today' },
    { label: 'Model group cash pooling & FX consolidation', owner: 'Agent', due: 'Thu' },
    { label: 'RM call to align one group coverage strategy', owner: 'Daisy', due: 'Fri' },
  ],
  email: {
    to: 'Sarah Whitfield',
    subject: 'Great to catch up — supporting the Avonmore Group integration',
    body: `Hi Sarah,

Thank you for your time today, and congratulations again on the Calderwood acquisition.

I would like to share how we can refinance the acquisition and bring both companies’ cash and FX into a single group structure — one bank, one view. As both businesses already bank with us, we can move quickly and remove the “two of everything” complexity you described. I will send indicative terms shortly.

I will follow up Friday once I have aligned our group coverage team.

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
    { name: 'Meeting prep', desc: 'Group briefing pack assembled', status: 'done', meta: '2 min ago' },
    { name: 'Data gathering', desc: 'Both entities’ filings, balances + market signals pulled', status: 'running', meta: 'In progress' },
    { name: 'Product input', desc: 'Acquisition finance + cash & FX specs drafted', status: 'done', meta: 'Just now' },
    { name: 'Internal coordination', desc: 'Credit, product & Client B coverage aligned', status: 'running', meta: '3 tasks' },
    { name: 'Fulfilment initiation', desc: 'Group facility set-up pre-staged', status: 'running', meta: 'Queued' },
    { name: 'Opportunity monitoring', desc: 'Scanning the book for signals', status: 'running', meta: 'Live' },
  ],
  humanInLoop: [
    { name: 'Credit committee pack', desc: 'Group narrative + financials assembled for early read', status: 'waiting', meta: 'Needs approval' },
    {
      name: 'Pricing recommendation',
      desc: 'Agent-modelled indicative margin',
      status: 'waiting',
      meta: 'Needs your call',
      override: {
        agentValue: 'Agent: +2.25%',
        rmValue: 'Your call: +2.45%',
        note: 'You hold the pricing judgement — a full group mandate across two entities supports a firmer margin.',
      },
    },
    { name: 'Indicative proposal', desc: 'Acquisition £8m + group cash & FX consolidation', status: 'waiting', meta: 'Needs approval' },
    { name: 'Client follow-up', desc: 'Drafted for Sarah Whitfield', status: 'waiting', meta: 'Needs approval' },
  ],
  rmOnly: [
    { name: 'Strategic client conversations', desc: 'Lead the integration discussion' },
    { name: 'Relationship building', desc: 'Deepen the group CFO relationship' },
    { name: 'Challenging discussions', desc: 'Navigate group structure & risk trade-offs' },
    { name: 'Commercial judgement', desc: 'Shape the right group mandate to win' },
  ],
};

/** Credit progression — surfaced at the top of the Orchestrate scene. */
export const creditProgress = {
  stage: 'Early credit read',
  narrative: 'Drafted by agent',
  approvals: { done: 1, total: 3 },
  missing: ['Consolidated group accounts', 'Calderwood entity & ownership structure'],
  note: 'Agent has drafted the group credit narrative and flagged the risks — you review before it goes to committee.',
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
    client: 'Avonmore Group',
    trigger: 'M&A event — acquired Calderwood, group mandate in flight',
    reason: 'The play you just ran — now repeatable across acquisitive names',
    product: 'Acquisition finance · Cash · FX',
    priority: 'High',
    when: 'In flight',
  },
  {
    client: 'Halethorpe Foods',
    trigger: 'Press: acquiring a regional competitor',
    reason: 'Likely acquisition finance + consolidation need',
    product: 'Acquisition finance',
    priority: 'High',
    when: 'This week',
  },
  {
    client: 'Northwind Logistics',
    trigger: 'Filed accounts — cash up 22%',
    reason: 'Surplus liquidity; deposit & investment opportunity',
    product: 'Liquidity / deposits',
    priority: 'Medium',
    when: 'This week',
  },
  {
    client: 'Brearley Pharma',
    trigger: 'Facility maturing in 90 days',
    reason: 'Refinancing window opening',
    product: 'Refinancing',
    priority: 'Medium',
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
  singleThreadRisk: 'Sarah Whitfield (Group CFO) is the only strong contact — succession risk if she leaves.',
  whiteSpace: 'No coverage of the acquired Calderwood entity or its finance team.',
  nodes: [
    { id: 'cfo', label: 'Sarah Whitfield', role: 'Group CFO', strength: 'strong', key: true },
    { id: 'ceo', label: 'Mark Avon', role: 'CEO', strength: 'medium' },
    { id: 'fd', label: 'Priya Shah', role: 'Finance Director', strength: 'medium' },
    { id: 'cald', label: 'Calderwood finance', role: 'Acquired — new contacts', strength: 'weak' },
    { id: 'treas', label: 'Group Treasury', role: 'Open white-space', strength: 'weak' },
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
      traction: 'Leading the £12m group acquisition mandate',
    },
    {
      team: 'CIB · Coverage',
      contact: 'Marcus Reed',
      role: 'Calderwood relationship director',
      status: 'Active',
      traction: 'Holds the acquired entity — align to one group strategy',
    },
    {
      team: 'Transaction Banking',
      contact: 'Priya Nair',
      role: 'Payments & cash management',
      status: 'Light',
      traction: 'Group cash pooling white-space across both entities',
    },
  ] as CoverageRow[],
  recommend:
    'Loop in CIB Coverage now — aligning both teams to one group strategy wins the full mandate and avoids internal silos.',
};

/* ---- scene 8: Unified platform ------------------------------------------- */

export type UnifiedPane = {
  icon: 'building' | 'doc' | 'bot';
  title: string;
  subtitle: string;
  rows: { label: string; value: string }[];
};

export type GlassPipeStage = {
  label: string;
  detail: string;
  status: 'done' | 'active' | 'next';
};

/** Single pane of glass — the group deal flows end-to-end across the bank. */
export const unifiedPlatform = {
  intro:
    'One platform across the group. Client, deal and workflow data flow end-to-end — no rekeying, CRM running headless in the background.',
  panes: [
    {
      icon: 'building',
      title: 'Client — Avonmore Group',
      subtitle: 'Two entities, one relationship',
      rows: [
        { label: 'Group revenue', value: '£70m' },
        { label: 'Group exposure', value: '£31m' },
        { label: 'Coverage', value: 'BCB + CIB, unified' },
      ],
    },
    {
      icon: 'doc',
      title: 'Deal — group mandate',
      subtitle: 'Acquisition + cash & FX',
      rows: [
        { label: 'Value', value: '£12.0m' },
        { label: 'Stage', value: 'Positioned to win' },
        { label: 'Win probability', value: '90%' },
      ],
    },
    {
      icon: 'bot',
      title: 'Workflow — agent bench',
      subtitle: 'Running in the background',
      rows: [
        { label: 'Credit pack', value: 'Drafted' },
        { label: 'Pricing', value: 'RM-confirmed' },
        { label: 'Client B coverage', value: 'Aligned' },
      ],
    },
  ] as UnifiedPane[],
  glassPipe: [
    { label: 'Signal', detail: 'M&A event detected', status: 'done' },
    { label: 'Shape', detail: 'Group mandate structured', status: 'done' },
    { label: 'Capture', detail: 'Need confirmed in-meeting', status: 'done' },
    { label: 'Orchestrate', detail: 'Agents executing', status: 'active' },
    { label: 'Win', detail: 'Group deal positioned', status: 'next' },
  ] as GlassPipeStage[],
  principles: [
    { icon: 'globe' as const, title: 'Glass pipe', detail: 'Every step visible end-to-end — full deal transparency' },
    { icon: 'building' as const, title: 'Headless CRM', detail: 'The record writes itself — no separate system to update' },
    { icon: 'zap' as const, title: 'No rekeying', detail: 'Captured once, reused everywhere across the bank' },
  ],
};
