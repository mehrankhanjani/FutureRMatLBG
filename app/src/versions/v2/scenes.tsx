import type { Scene } from '../../types';
import { ConsentGate } from './mobile/ConsentGate';
import { LiveMoment } from './mobile/LiveMoment';
import { OpportunityIgnition } from './desktop/OpportunityIgnition';
import { PostMeetingSummary } from './desktop/PostMeetingSummary';
import { StructureDeal } from './desktop/StructureDeal';
import { AgentBench } from './desktop/AgentBench';
import { OpportunityRadar } from './desktop/OpportunityRadar';
import { UnifiedPlatform } from './desktop/UnifiedPlatform';

/**
 * Iteration 2 scene order — the M&A event journey: an acquisition turns two
 * Lloyds clients into one group. The RM, Daisy, originates and shapes the
 * group mandate, progresses it with a bench of agents, then scales the play
 * across the book — all on one unified platform.
 */
export const scenes: Scene[] = [
  {
    id: 'ignition',
    title: 'Opportunity ignition',
    caption:
      'An M&A event surfaces — two of your clients just became one group.',
    device: 'desktop',
    chapter: 'Originate & shape',
    component: OpportunityIgnition,
  },
  {
    id: 'activate',
    title: 'Activate intelligence',
    caption:
      'Walking into the room — consent on file, and the M&A opportunity already on your radar.',
    device: 'mobile',
    chapter: 'Originate & shape',
    component: ConsentGate,
  },
  {
    id: 'shape',
    title: 'Live client moment',
    caption:
      'The CFO names the need — the system shapes it into a qualified, structured group deal.',
    device: 'mobile',
    chapter: 'Originate & shape',
    component: LiveMoment,
  },
  {
    id: 'structure',
    title: 'Deal structuring & win strategy',
    caption:
      'Shape the right group mandate — the agent recommends, you choose, the economics rebuild live.',
    device: 'desktop',
    chapter: 'Progress the deal',
    component: StructureDeal,
  },
  {
    id: 'capture',
    title: 'Post-meeting momentum',
    caption:
      'Minutes later — the conversation becomes a structured deal, with momentum captured in the CRM.',
    device: 'desktop',
    chapter: 'Progress the deal',
    component: PostMeetingSummary,
  },
  {
    id: 'orchestrate',
    title: 'Agent bench & orchestration',
    caption: 'You orchestrate a bench of agents to progress the group deal toward credit.',
    device: 'desktop',
    chapter: 'Progress the deal',
    component: AgentBench,
  },
  {
    id: 'scale',
    title: 'Portfolio opportunity radar',
    caption: 'The same M&A play, repeated across the book — every relationship a place to win.',
    device: 'desktop',
    chapter: 'Win & scale',
    component: OpportunityRadar,
  },
  {
    id: 'unified',
    title: 'Unified platform',
    caption: 'One platform — client, deal and workflow flow end-to-end across the bank.',
    device: 'desktop',
    chapter: 'Win & scale',
    component: UnifiedPlatform,
  },
];
