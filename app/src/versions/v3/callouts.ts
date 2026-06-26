/**
 * callouts.ts — presenter call-out content for iteration 3.
 *
 * Phase 2 rewrite of all v2 callouts. Key changes across the board:
 *   · "WorkIQ" replaced with REO throughout
 *   · Narrative leads with the RM–client relationship; REO is the enabler
 *   · Bank-centric anchors (win-probability, RoRWA) follow client context
 *   · Automation-first language ("glass pipe", "seamless flow",
 *     "straight-through") replaced with human-enabled equivalents
 *   · Needs and opportunities unified — they surface as one moment
 *   · Closing scene points forward, not backward
 *
 * Two new callouts added for Scene A (relationship) and Scene B (review).
 */

export type Callout = {
  concept: string;
  benefits: string[];
  outcome: { label: string; text: string };
};

export const callouts: Record<string, Callout> = {
  ignition: {
    concept:
      'Daisy has built a seven-year relationship with Avonmore. REO surfaces why today is different — two of her clients are now one group, and the window to shape the group mandate is open before competitors know it exists.',
    benefits: [
      'Relationship context first — the signal explains itself within the history Daisy already owns',
      'Clear "why this client, why now, why us" rationale before she picks up the phone',
      'Estimated opportunity value and confidence grounded in Ring 2 and Ring 3 data',
      'Early-mover position — REO detected the filing before the client has briefed advisers',
      'Powered by REO — internal, external and relationship data combined',
    ],
    outcome: {
      label: 'Risk management',
      text: 'Forward-looking intelligence grounded in cited, auditable data sources',
    },
  },
  relationship: {
    concept:
      'Before walking into the room, Daisy has the full picture — not just the latest signal. Seven years of touchpoints, the health of both relationships, the network across Avonmore and Calderwood, and how the sentiment has moved over time.',
    benefits: [
      'Longitudinal context, not just a point-in-time alert',
      'Relationship health score across engagement depth, recency and product breadth',
      'Interaction history across all channels — meetings, calls, emails, CRM notes',
      'Network map of key contacts at the group and internal coverage across both RMs',
      'Shared knowledge visible to the team — not locked to a single RM',
    ],
    outcome: {
      label: 'Operating model',
      text: 'Client knowledge that belongs to the bank, not just the individual RM',
    },
  },
  activate: {
    concept:
      'Consent unlocks live support for the conversation — real-time guidance for Daisy, structured outputs from everything said. If the client declines, notes mode captures the same information manually and structures it identically after the meeting.',
    benefits: [
      'Positions as enabling a better conversation, not enabling surveillance',
      'Unlocks real-time signals, risks and in-the-moment suggestions',
      'Converts conversation into structured actions either way — with or without recording',
      'Daisy remains fully in control at every step',
      'Clear, honest value trade-off if the client declines',
    ],
    outcome: {
      label: 'Operating model',
      text: 'Outcome-based intelligence that works across every consent scenario',
    },
  },
  shape: {
    concept:
      'Sarah names the need. At that instant REO recognises the intent, the risk and the opportunity simultaneously — and surfaces what Daisy needs to shape the next question, not just record the last one.',
    benefits: [
      'Need and opportunity surface as one moment — no lag between detection and guidance',
      'Detects intent (refinance the acquisition + consolidate), risk (fragmented ownership & banking) and deal shape (acquisition finance, cash, FX) together',
      'Gives Daisy the next question and the commercial rationale to ask it',
      'Explains why this need matters — two clients now one group, fragmentation risk, competitor timing',
      'Enables a sharper conversation before the meeting ends',
    ],
    outcome: {
      label: 'Business model',
      text: 'Revenue shaped in the room — not reconstructed from notes afterwards',
    },
  },
  structure: {
    concept:
      "Avonmore needs a structure that fits their cash-flow cycle, the integration of Calderwood and the combined group's cash and FX position. REO proposes three options built around the client's situation — Daisy picks the one that serves Avonmore best, and the economics follow.",
    benefits: [
      "Three structures, each grounded in the client's strategic context — not the bank's product catalogue",
      'Indicative credit eligibility per option so Daisy knows what will clear before she proposes it',
      'Explore mode — compare options freely before opening anything in the CRM',
      'Product specialist hand-off built in — one action to loop in the right colleague',
      'Deal economics rebuild around the chosen structure; bank returns are a consequence, not the anchor',
    ],
    outcome: {
      label: 'Operating model',
      text: 'RMs shape deals around client needs; REO handles analysis and credit readiness',
    },
  },
  capture: {
    concept:
      'The conversation is captured once and available to everyone who needs it — Marcus, the credit team, the product specialists. The CRM updates in the background. Daisy\'s next action is already in front of her.',
    benefits: [
      'Captured once — distributed automatically to every person and system that needs it',
      'CRM updates without Daisy touching it; no re-keying, no separate system to log into',
      'Marcus Reed notified — Calderwood thread merged into the group mandate immediately',
      'Follow-up email drafted in Daisy\'s voice, ready to review and send',
      'Credit narrative drafted by REO — ready for Daisy to review before it reaches the Agent Bench',
    ],
    outcome: {
      label: 'Technology',
      text: 'Event-driven capture — one record, shared across the bank, owned by no single system',
    },
  },
  orchestrate: {
    concept:
      'Daisy stays in the relationships — the conversations that only she can have. REO coordinates the bench: market research, credit narrative, pricing, product structuring and cross-coverage alignment, running in parallel so nothing waits.',
    benefits: [
      'Daisy focuses on the judgement calls and the human moments — not the administration',
      'Agents run autonomously where they can; they ask for approval only when it matters',
      'Cross-coverage: Marcus Reed approval surfaced as a human-in-loop item — not lost in email',
      'Credit and pricing workstreams visible in one place with blockers flagged clearly',
      'More client-facing time; fewer handoffs that fall through the cracks',
    ],
    outcome: {
      label: 'Operating model',
      text: 'RMs lead the relationship; REO runs the parallel workstreams',
    },
  },
  scale: {
    concept:
      "Today's three priorities across the book — surfaced from continuous monitoring, ranked by value and urgency. REO watches the whole portfolio so Daisy does not have to.",
    benefits: [
      'Smart digest: three actions for today by default — expand to the full list when needed',
      'Prevents overload — the RM sees a curated priority, not every raw signal',
      'Surfaces opportunities, risks and whitespace from CRM, transactions and market signals',
      'Product specialists can push relevant ideas to Daisy through the same surface',
      'Always-on origination — the Avonmore play repeats wherever the conditions are right',
    ],
    outcome: {
      label: 'Operating model',
      text: 'Always-on origination without adding headcount or overwhelming the RM',
    },
  },
  unified: {
    concept:
      'One view of the Avonmore Group relationship — client, deal and workflow, visible across the whole team. This is not the end of the story; it is where the next one starts.',
    benefits: [
      'Single pane of glass across the group mandate — both RMs, both entities, one record',
      'Full interaction log across Daisy and Marcus threads — knowledge that belongs to the team',
      'Data flows automatically to every downstream system; nothing is entered twice',
      'Next review date, next signal to watch and next recommended action already visible',
      'CRM operates in the background — present everywhere, intrusive nowhere',
    ],
    outcome: {
      label: 'Technology',
      text: 'One platform where the relationship is always live — not just when a deal is open',
    },
  },
  review: {
    concept:
      'The group mandate is live. The relationship continues. REO has already detected the next signal — a precision-engineering supplier in the Midlands is exploring a sale, a potential bolt-on to the Avonmore Group. The cycle restarts from a position of much greater strength.',
    benefits: [
      'The relationship does not go quiet when the deal closes — REO keeps watching',
      'Quarterly review card surfaces covenant status, engagement health and next actions automatically',
      'Next best actions grounded in the full history accumulated across the deal cycle',
      'The next "why this client, why now" is already forming — no cold start for the next opportunity',
      'Knowledge built through this cycle is retained, shared and ready for the next RM if needed',
    ],
    outcome: {
      label: 'Operating model',
      text: 'Continuous relationship intelligence — the cycle never stops, the knowledge never walks out the door',
    },
  },
};
