/**
 * twinScript.ts — the scripted, on-rails conversation for Daisy's digital twin
 * in iteration 3.
 *
 * No real LLM: the twin answers a fixed set of suggested questions so the demo
 * is deterministic. Every answer is grounded in named source types and powered
 * by REO — the always-on relationship intelligence engine — and can carry an
 * action that either jumps to the relevant scene or acknowledges work done on
 * Daisy's behalf. So the twin both answers and acts, always relationship-first.
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
export const twinSubtitle = 'Always-on · powered by REO';
export const twinIntro =
  "Morning, Daisy. REO and I have been watching your book overnight — there's a live M&A event involving two of your clients, and your relationships are in good shape. Ask me anything, or pick one of these to get going.";
export const twinFallback =
  'I can help across the Avonmore Group deal and your wider book. Try one of these:';

export const twinExchanges: TwinExchange[] = [
  {
    q: 'Is this prospect already a client?',
    a: "Calderwood Engineering — yes, already with us. A CRM name search returns 14 near-matches (Calderwood Ltd, Caldwell, Calderwood Group…), but REO cross-references company number, group hierarchy and registered address to resolve it to one entity: an existing CIB client covered by Marcus Reed. No duplicate record, no cold-call to a name we already bank — one confident answer instead of a noisy list.",
    sources: ['Internal systems', 'External market data'],
    actions: [{ label: 'See it on one platform', sceneId: 'unified', ack: 'Opening the unified platform…' }],
  },
  {
    q: "What's my highest-value opportunity today?",
    a: 'Avonmore Group — your client Avonmore Components has just acquired Calderwood Engineering, another Lloyds client. Two clients are now one group: a £12m+ acquisition finance + group cash & FX consolidation opportunity, surfaced before competitors move.',
    sources: ['External market data', 'Internal systems'],
    actions: [{ label: 'Open the opportunity', sceneId: 'ignition', ack: 'Opening Opportunity ignition…' }],
  },
  {
    q: 'How strong is the relationship?',
    a: "Seven years across both names, with rising engagement depth and breadth. Sarah Whitfield is your champion at Avonmore; the group relationship health is strong and trending up. You walk in knowing the whole picture, not just the latest alert.",
    sources: ['Internal systems', 'Conversation capture'],
    actions: [{ label: 'See the relationship', sceneId: 'relationship', ack: 'Opening Relationship intelligence…' }],
  },
  {
    q: 'Why this M&A event, why now?',
    a: 'Press and a Companies House change-of-control filing confirm the acquisition. Both companies bank with us under separate teams (BCB and CIB), with £31m combined exposure. Acting this week lets us shape the financing and consolidate the group before the relationship fragments.',
    sources: ['External market data', 'Internal systems'],
    actions: [{ label: 'See the signals', sceneId: 'ignition', ack: 'Jumping to the why-now signals…' }],
  },
  {
    q: 'Show me the deal structure',
    a: "REO has shaped three options around Avonmore's situation. The recommended one is a £12m acquisition facility plus group cash consolidation — best fit, ~£640k revenue Y1 and 2.5% RoRWA. Want to compare them?",
    sources: ['Internal systems', 'Conversation capture'],
    actions: [{ label: 'Open Deal structuring', sceneId: 'structure', ack: 'Opening Deal structuring…' }],
  },
  {
    q: 'Who else needs to be involved?',
    a: "Calderwood is covered by Marcus Reed in CIB. To win the full mandate we should align both teams to one group coverage strategy now — REO has flagged it and can notify his team for your sign-off.",
    sources: ['Internal systems'],
    actions: [{ label: 'See it on one platform', sceneId: 'unified', ack: 'Opening the unified platform…' }],
  },
  {
    q: 'What should I price this at?',
    a: 'REO modelled an indicative +2.25%. Given a full group mandate across two entities, you may want a firmer +2.45% — your call. I can apply your override and keep it on the proposal.',
    sources: ['Internal systems'],
    actions: [
      { label: 'Override to +2.45%', sceneId: 'orchestrate', ack: '✓ Override applied — margin set to +2.45%. Opening orchestration…' },
      { label: 'Keep REO +2.25%', ack: '✓ Kept REO\'s recommendation at +2.25%.' },
    ],
  },
  {
    q: 'What else is moving in my book?',
    a: 'Three priorities are live across the book today — ranked and ready. Avonmore Group (this M&A play, in flight) leads; the same playbook repeats across your acquisitive names. REO keeps scanning so you focus on what matters most.',
    sources: ['External market data', 'Internal systems'],
    actions: [{ label: 'Open the portfolio radar', sceneId: 'scale', ack: 'Opening the portfolio radar…' }],
  },
  {
    q: "What's next after we win?",
    a: "The mandate is drawn and live — and REO has already detected the next signal in the group. The relationship doesn't end at close; the next cycle is forming from a stronger position. I'll keep watching and raise my hand early.",
    sources: ['External market data', 'Internal systems'],
    actions: [{ label: 'Open the relationship review', sceneId: 'review', ack: 'Opening Relationship review & next cycle…' }],
  },
];
