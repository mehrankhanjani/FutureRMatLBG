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
  "Morning, Daisy. I've been watching your book overnight — there's a live M&A event involving two of your clients. Ask me anything, or pick one of these to get going.";
export const twinFallback =
  'I can help across the Avonmore Group deal and your wider book. Try one of these:';

export const twinExchanges: TwinExchange[] = [
  {
    q: "What's my highest-value opportunity today?",
    a: 'Avonmore Group — your client Avonmore Components has just acquired Calderwood Engineering, another Lloyds client. Two clients are now one group: a £12m+ acquisition finance + group cash & FX consolidation opportunity, surfaced before competitors move.',
    sources: ['External market data', 'Internal systems'],
    actions: [{ label: 'Open the opportunity', sceneId: 'ignition', ack: 'Opening Opportunity ignition…' }],
  },
  {
    q: 'Why this M&A event, why now?',
    a: 'Press and a Companies House change-of-control filing confirm the acquisition. Both companies bank with us under separate teams (BCB and CIB), with £31m combined exposure. Acting this week lets us shape the financing and consolidate the group before the relationship fragments.',
    sources: ['External market data', 'Internal systems'],
    actions: [{ label: 'See the signals', sceneId: 'ignition', ack: 'Jumping to the why-now signals…' }],
  },
  {
    q: 'Show me the deal structure',
    a: "I've shaped three options. The recommended one is a £12m acquisition facility plus group cash consolidation — best fit, ~£640k revenue Y1 and 2.5% RoRWA. Want to compare them?",
    sources: ['Internal systems', 'Conversation capture'],
    actions: [{ label: 'Open Deal structuring', sceneId: 'structure', ack: 'Opening Deal structuring…' }],
  },
  {
    q: 'Draft the credit narrative',
    a: "Done — I've drafted the group credit narrative from both entities' filings and the meeting, and flagged 2 missing items (consolidated group accounts, Calderwood entity structure). It's ready for your review before committee.",
    sources: ['Internal systems', 'Conversation capture'],
    actions: [{ label: 'Review in orchestration', sceneId: 'orchestrate', ack: 'Opening the credit pack in orchestration…' }],
  },
  {
    q: 'What should I price this at?',
    a: 'I modelled an indicative +2.25%. Given a full group mandate across two entities, you may want a firmer +2.45% — your call. I can apply your override and keep it on the proposal.',
    sources: ['Internal systems'],
    actions: [
      { label: 'Override to +2.45%', sceneId: 'orchestrate', ack: '✓ Override applied — margin set to +2.45%. Opening orchestration…' },
      { label: 'Keep agent +2.25%', ack: '✓ Kept the agent recommendation at +2.25%.' },
    ],
  },
  {
    q: 'Who else needs to be involved?',
    a: "Calderwood is covered by Marcus Reed in CIB. To win the full mandate we should align both teams to one group coverage strategy now — I've flagged it and can notify his team.",
    sources: ['Internal systems'],
    actions: [{ label: 'See it on one platform', sceneId: 'unified', ack: 'Opening the unified platform…' }],
  },
  {
    q: 'What else is moving in my book?',
    a: 'Four opportunities are live — two need action today: Avonmore Group (this M&A play, in flight) and Halethorpe Foods (also acquiring). The M&A play is repeatable across acquisitive names.',
    sources: ['External market data', 'Internal systems'],
    actions: [{ label: 'Open the portfolio radar', sceneId: 'scale', ack: 'Opening the portfolio radar…' }],
  },
];
