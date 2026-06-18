/**
 * scenario.ts — single source of truth for the scripted demo narrative.
 * The "Germany expansion" story flows through every scene so the pitch stays
 * consistent. All data is illustrative / mocked — no real client information.
 */

export const client = {
  name: 'Avonmore Components Ltd',
  contact: 'Sarah Whitfield',
  role: 'Chief Financial Officer',
  sector: 'Industrial Manufacturing',
  segment: 'BCB · Mid-Corporate', // unified platform also serves CIB
  relationshipValue: '£42m',
  tenureYears: 7,
  rm: 'James Okafor',
  initials: 'AC',
};

export const meeting = {
  title: 'Quarterly review',
  location: 'Client HQ, Birmingham',
  date: 'Tue 18 Jun · 11:00',
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
  { speaker: 'rm', name: 'James', text: 'Good to see you, Sarah. How has trading been this quarter?' },
  { speaker: 'client', name: 'Sarah', text: 'Strong, actually — order book is the healthiest it has been in years.' },
  { speaker: 'rm', name: 'James', text: 'That is great to hear. Anything on the horizon you are weighing up?' },
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
  { id: 'product', label: 'Opportunity', detail: 'Working capital · FX', tone: 'opportunity' },
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
};

export const prompts: Prompt[] = [
  {
    id: 'p1',
    insight: 'Expansion + liquidity concern detected — consider a working capital solution.',
    rationale: 'Cross-border expansion typically widens the cash-conversion cycle by 30–45 days.',
    action: 'Introduce revolving working capital facility',
  },
  {
    id: 'p2',
    insight: 'Three peers in the sector funded DACH expansion via receivables finance.',
    rationale: 'Relevant market context strengthens credibility and shows you know the sector.',
    action: 'Share peer benchmark + FX hedging view',
  },
  {
    id: 'p3',
    insight: 'Client tone suggests hesitation — low confidence on timing.',
    rationale: 'Guiding questions surface the real constraint and deepen trust.',
    action: 'Ask: “What does the cash timing look like month by month?”',
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
    { label: 'Send working capital indicative terms', owner: 'Agent', due: 'Today' },
    { label: 'Book product specialist (Trade & WC)', owner: 'Agent', due: 'Tomorrow' },
    { label: 'Prepare DACH expansion peer pack', owner: 'Agent', due: 'Thu' },
    { label: 'RM follow-up call to confirm timing', owner: 'James', due: 'Fri' },
  ],
  email: {
    to: 'Sarah Whitfield',
    subject: 'Great to catch up — supporting your Germany expansion',
    body: `Hi Sarah,

Thank you for your time today. It was great to hear the order book is so strong.

On the Germany expansion, I would like to share how a working capital facility could smooth the cash flow timing you mentioned, alongside a simple EUR hedging approach. I will send indicative terms and a short view on how similar businesses have approached this.

I will follow up Friday to find time with our trade specialist.

Best regards,
James`,
  },
};

/** Agent bench — three tiers. */
export type AgentStatus = 'running' | 'done' | 'waiting';
export type Agent = {
  name: string;
  desc: string;
  status: AgentStatus;
  meta: string;
};

export const agentBench: {
  autonomous: Agent[];
  humanInLoop: Agent[];
  rmOnly: { name: string; desc: string }[];
} = {
  autonomous: [
    { name: 'Meeting prep', desc: 'Briefing pack assembled', status: 'done', meta: '2 min ago' },
    { name: 'Data gathering', desc: 'Filings + market signals', status: 'running', meta: 'In progress' },
    { name: 'CRM update', desc: 'One-view synced', status: 'done', meta: 'Just now' },
    { name: 'Internal coordination', desc: 'Routed to credit & product', status: 'running', meta: '3 tasks' },
    { name: 'Opportunity monitoring', desc: 'Scanning book for signals', status: 'running', meta: 'Live' },
  ],
  humanInLoop: [
    { name: 'Follow-up email', desc: 'Drafted for Sarah Whitfield', status: 'waiting', meta: 'Needs approval' },
    { name: 'Opportunity recommendation', desc: 'Working capital £6–8m', status: 'waiting', meta: 'Needs approval' },
    { name: 'Deal escalation pack', desc: 'For credit committee', status: 'waiting', meta: 'Needs approval' },
    { name: 'Pricing recommendation', desc: 'Indicative WC terms', status: 'waiting', meta: 'Needs approval' },
  ],
  rmOnly: [
    { name: 'Strategic client conversations', desc: 'Lead the expansion discussion' },
    { name: 'Relationship building', desc: 'Deepen the CFO relationship' },
    { name: 'Challenging discussions', desc: 'Navigate timing & risk trade-offs' },
    { name: 'Commercial judgement', desc: 'Shape the right structure' },
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
    trigger: 'Stated Germany expansion intent',
    reason: 'Cross-border working capital need surfaced in today’s meeting',
    product: 'Working capital · FX',
    priority: 'High',
    when: 'Act today',
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
