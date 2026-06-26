/**
 * callouts.ts — presenter call-out content for each step of iteration 2.
 *
 * Rendered in the full-width banner above the stage. Each step carries a
 * one-line Concept, the Key benefits, and an "outcome" tag that names the
 * structural change the step demonstrates (operating model, risk, technology
 * or business model).
 */

export type Callout = {
  concept: string;
  benefits: string[];
  outcome: { label: string; text: string };
};

export const callouts: Record<string, Callout> = {
  ignition: {
    concept:
      'The platform identifies why this client matters now by surfacing high-value opportunities from portfolio, market and behavioural signals.',
    benefits: [
      'Signal-led prospecting replaces manual pipeline building',
      'Clear "why this client, why now, why us" rationale',
      'Estimated value, urgency and likelihood upfront',
      'Early-mover advantage vs competitors',
      'Powered by WorkIQ (internal, external + conversation data)',
    ],
    outcome: { label: 'Risk management', text: 'Forward-looking insights derived from data' },
  },
  activate: {
    concept:
      'Consent activates live intelligence, enabling real-time signal detection and automated follow-through.',
    benefits: [
      'Feels like enabling value, not admin',
      'Unlocks real-time prompts, risks and opportunities',
      'Converts conversations into structured actions',
      'RM remains fully in control',
      'Clear value trade-off if declined',
    ],
    outcome: {
      label: 'Operating model',
      text: 'Outcome-based agents operate continuously — scale without adding headcount',
    },
  },
  shape: {
    concept:
      'Real-time detection of intent, risk and opportunity helps Daisy actively shape the conversation.',
    benefits: [
      'Moves beyond transcription to live guidance',
      'Detects signals (acquisition refinance, fragmented banking, cash & FX consolidation)',
      'Suggests what to say next in the moment',
      'Explains commercial relevance instantly',
      'Enables action before competitors engage',
    ],
    outcome: { label: 'Business model', text: 'New revenue from data & signals' },
  },
  structure: {
    concept:
      'The platform helps Daisy shape the best proposition and shows what is needed to win the deal.',
    benefits: [
      'Compares deal structures, pricing, risk and fit',
      'Surfaces competitor positioning and differentiation',
      'Highlights relationship gaps and who to engage',
      'Shows internal constraints and credit readiness',
      'Supports better, faster RM judgement',
    ],
    outcome: {
      label: 'Operating model',
      text: 'RMs focus on judgement; agents handle analysis & execution',
    },
  },
  capture: {
    concept:
      'The meeting immediately converts into structured outputs, actions and deal progression.',
    benefits: [
      'Glass pipe — conversation → structured data, transparently',
      'Headless CRM — Cowork writes the record; no separate system to update',
      'No re-keying — captured once, reused everywhere across the bank',
      'Clear next steps, owners, deadlines and risks',
      'Faster internal mobilisation and reduced drop-off',
    ],
    outcome: { label: 'Technology', text: 'Event-driven architecture on the Agentic AI Platform' },
  },
  orchestrate: {
    concept:
      'A bench of agents executes tasks in the background, so Daisy can focus on deepening client relationships through more focused, regular human engagement.',
    benefits: [
      'Agents handle market research, credit, pricing, product and follow-ups',
      'Daisy focuses on judgement and relationships',
      'Reduces manual coordination and chasing',
      'Clear view of progress, blockers and ownership',
      'Increases RM client-facing time',
    ],
    outcome: {
      label: 'Operating model',
      text: 'RMs focus on judgement & relationships; agents handle workflows & execution',
    },
  },
  scale: {
    concept:
      'Daisy\u2019s book is continuously monitored to prioritise the best opportunities and risks.',
    benefits: [
      'AI-prioritised focus based on value and urgency',
      'Surfaces opportunities, risks and whitespace',
      'Draws from CRM, transactions, market + unstructured data',
      'Enables always-on origination',
      'Guides daily RM focus',
    ],
    outcome: {
      label: 'Operating model',
      text: 'Always-on origination — scale the book without adding headcount',
    },
  },
  unified: {
    concept:
      'A single, intelligent interface where data, workflows and deals flow seamlessly end-to-end across the bank.',
    benefits: [
      'Single pane of glass across client, deal and workflow',
      'No rekeying — data flows automatically across systems',
      'End-to-end "glass pipe" deal visibility',
      'CRM operates in the background (headless experience)',
      'Improves transparency, speed and adoption',
    ],
    outcome: {
      label: 'Technology',
      text: 'One event-driven platform; CRM runs headless in the background',
    },
  },
};
