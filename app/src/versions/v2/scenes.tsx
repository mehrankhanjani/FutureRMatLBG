import type { Scene } from '../../types';
import { ConsentGate } from './mobile/ConsentGate';
import { LiveMoment } from './mobile/LiveMoment';
import { OpportunityIgnition } from './desktop/OpportunityIgnition';
import { PostMeetingSummary } from './desktop/PostMeetingSummary';
import { StructureDeal } from './desktop/StructureDeal';
import { AgentBench } from './desktop/AgentBench';
import { RelationshipGraph } from './desktop/RelationshipGraph';
import { OpportunityRadar } from './desktop/OpportunityRadar';

/**
 * Iteration 2 scene order — the deal journey: ignite & shape the opportunity,
 * progress the deal back at the desk, then win and scale across the book.
 * Eight scenes; the opportunity radar is the closing "scale" beat.
 */
export const scenes: Scene[] = [
  {
    id: 'ignition',
    title: 'Opportunity ignition',
    caption:
      'Before you dial — the system surfaces your highest-value call today and explains why.',
    device: 'desktop',
    chapter: 'Originate & shape',
    component: OpportunityIgnition,
  },
  {
    id: 'activate',
    title: 'Activate intelligence',
    caption:
      'Walking into the room — consent on file, and the deal signal already on your radar.',
    device: 'mobile',
    chapter: 'Originate & shape',
    component: ConsentGate,
  },
  {
    id: 'shape',
    title: 'Shape the opportunity',
    caption:
      'The client names the need — the system shapes it into a qualified, structured deal.',
    device: 'mobile',
    chapter: 'Originate & shape',
    component: LiveMoment,
  },
  {
    id: 'capture',
    title: 'Capture momentum',
    caption:
      'Minutes later — the conversation becomes a structured deal, with momentum captured in the CRM.',
    device: 'desktop',
    chapter: 'Progress the deal',
    component: PostMeetingSummary,
  },
  {
    id: 'structure',
    title: 'Structure the deal',
    caption:
      'Shape the right facility — the agent recommends, you choose, the economics rebuild in real time.',
    device: 'desktop',
    chapter: 'Progress the deal',
    component: StructureDeal,
  },
  {
    id: 'orchestrate',
    title: 'Orchestrate the deal',
    caption: 'You orchestrate a bench of agents to progress the deal toward credit.',
    device: 'desktop',
    chapter: 'Progress the deal',
    component: AgentBench,
  },
  {
    id: 'where-you-win',
    title: 'Where you win',
    caption: 'The relationship map shows exactly where — and with whom — this deal is won.',
    device: 'desktop',
    chapter: 'Win & scale',
    component: RelationshipGraph,
  },
  {
    id: 'scale',
    title: 'Scale across the portfolio',
    caption: 'The same play, repeated across the book — every relationship a place to win.',
    device: 'desktop',
    chapter: 'Win & scale',
    component: OpportunityRadar,
  },
];
