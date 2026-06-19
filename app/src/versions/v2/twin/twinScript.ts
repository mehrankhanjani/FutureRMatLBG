/**
 * twinScript.ts — the scripted, on-rails conversation for Daisy's digital twin.
 *
 * No real LLM: the twin answers a fixed set of suggested questions so the demo
 * is deterministic. Every answer is grounded in named source types (the
 * always-on intelligence engine, e.g. WorkIQ) and can carry an action that
 * either jumps to the relevant scene or acknowledges work done on Daisy's
 * behalf — so the twin both answers and acts.
 */

export type TwinSource =
  | 'Internal systems'
  | 'External market data'
  | 'Conversation capture';

export type TwinAction = {
  label: string;
  /** Scene id to deep-link to when the action is run. */
  sceneId?: string;
  /** The acknowledgement line shown when the action runs. */
  ack: string;
};

export type TwinExchange = {
  /** Suggested question, shown as a chip and echoed as the user's message. */
  q: string;
  /** The twin's scripted answer. */
  a: string;
  sources?: TwinSource[];
  actions?: TwinAction[];
};

export const twinName = 'Your digital twin';
export const twinSubtitle = 'Always-on · powered by an intelligence engine (e.g. WorkIQ)';
export const twinIntro =
  "Morning, Daisy. I've been watching your book overnight. Ask me anything — or pick one of these to get going.";
export const twinFallback =
  "I can help across the Avonmore deal and your wider book. Try one of these:";

export const twinExchanges: TwinExchange[] = [
  {
    q: "What's my highest-value call today?",
    a: 'Avonmore Components — a £6–8m cross-border working capital + EUR FX opportunity. Strong filings, rising FX exposure and a sector-wide expansion trend all point to a need now, ahead of the competition.',
    sources: ['External market data', 'Internal systems'],
    actions: [{ label: 'Open the opportunity', sceneId: 'ignition', ack: 'Opening Opportunity ignition…' }],
  },
  {
    q: 'Why Avonmore, why now?',
    a: 'Q3 accounts show the order book up 18%, EUR/GBP volatility is up 12% this quarter, and 2 peers financed DACH expansion in the last 90 days. Acting this week protects roughly 12% of win-probability.',
    sources: ['External market data', 'Conversation capture'],
    actions: [{ label: 'See the signals', sceneId: 'ignition', ack: 'Jumping to the why-now signals…' }],
  },
  {
    q: 'Show me the deal structure',
    a: "I've shaped three options. The recommended one is £8m working capital + an EUR FX hedge — best fit, ~£420k revenue Y1 and 2.4% RoRWA. Want to compare them?",
    sources: ['Internal systems', 'Conversation capture'],
    actions: [{ label: 'Open Structure the deal', sceneId: 'structure', ack: 'Opening Structure the deal…' }],
  },
  {
    q: 'Draft the credit narrative',
    a: "Done — I've drafted the credit narrative from the filings and the meeting, and flagged 2 missing items (updated management accounts, German entity structure). It's ready for your review before committee.",
    sources: ['Internal systems', 'Conversation capture'],
    actions: [{ label: 'Review in Orchestrate', sceneId: 'orchestrate', ack: 'Opening the credit pack in Orchestrate…' }],
  },
  {
    q: 'What should I price this at?',
    a: 'I modelled an indicative +2.15%. Given the 7-year relationship and low risk, you may want a firmer +2.40% — your call. I can apply your override and keep it on the proposal.',
    sources: ['Internal systems'],
    actions: [
      { label: 'Override to +2.40%', sceneId: 'orchestrate', ack: '✓ Override applied — margin set to +2.40%. Opening Orchestrate…' },
      { label: 'Keep agent +2.15%', ack: '✓ Kept the agent recommendation at +2.15%.' },
    ],
  },
  {
    q: 'Where am I exposed on this relationship?',
    a: "You're single-threaded on Sarah Whitfield (CFO) and have no coverage in Treasury or the new German entity. I'd line up a Transaction Banking intro to win the full mandate.",
    sources: ['Internal systems'],
    actions: [{ label: 'Open the relationship map', sceneId: 'where-you-win', ack: 'Opening Where you win…' }],
  },
  {
    q: 'What else is moving in my book?',
    a: 'Four opportunities are live — two need action today: Halethorpe Foods (surplus liquidity) and Brearley Pharma (facility maturing in 90 days). The Avonmore play is repeatable across similar names.',
    sources: ['External market data', 'Internal systems'],
    actions: [{ label: 'Open the portfolio radar', sceneId: 'scale', ack: 'Opening Scale across the portfolio…' }],
  },
];
