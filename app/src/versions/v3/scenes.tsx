import type { Scene } from '../../types';
import { OpportunityIgnition } from './desktop/OpportunityIgnition';
import { ConsentGate } from './mobile/ConsentGate';
import { LiveMoment } from '../v2/mobile/LiveMoment';
import { StructureDeal } from './desktop/StructureDeal';
import { PostMeetingSummary } from './desktop/PostMeetingSummary';
import { AgentBench } from './desktop/AgentBench';
import { OpportunityRadar } from './desktop/OpportunityRadar';
import { UnifiedPlatform } from './desktop/UnifiedPlatform';
import { RelationshipIntelligence } from './desktop/RelationshipIntelligence';
import { RelationshipReview } from './desktop/RelationshipReview';

/**
 * Iteration 3 scene order — 10 scenes.
 *
 * Two new scenes are inserted relative to v2:
 *   · Relationship Intelligence (Scene A) — between Ignition and Activate
 *   · Relationship Review (Scene B) — after Unified Platform
 *
 * Captions are Phase 2 rewrites: client-relationship-first, REO as enabler,
 * no "WorkIQ", no automation-first language.
 */
export const scenes: Scene[] = [
  {
    id: 'ignition',
    title: 'Opportunity ignition',
    subtitle: 'A reason to call today — surfaced and qualified before you dial',
    caption:
      'Daisy knows her client — REO surfaces why now is the moment to act.',
    device: 'desktop',
    chapter: 'Originate & shape',
    component: OpportunityIgnition,
  },
  {
    id: 'relationship',
    title: 'Relationship intelligence',
    subtitle: 'The full group picture — before you walk in',
    caption:
      'Before walking in — seven years of context, the health of the group, and every touchpoint, in one place.',
    device: 'desktop',
    chapter: 'Originate & shape',
    component: RelationshipIntelligence,
  },
  {
    id: 'activate',
    title: 'Activate intelligence',
    caption:
      'Walking into the room — consent on file, live support for the conversation already on.',
    device: 'custom',
    chapter: 'Originate & shape',
    component: ConsentGate,
  },
  {
    id: 'shape',
    title: 'Live client moment',
    caption:
      'Sarah names the need — at that instant REO shapes it into a qualified group opportunity and gives Daisy what to say next.',
    device: 'mobile',
    chapter: 'Originate & shape',
    component: LiveMoment,
  },
  {
    id: 'structure',
    title: 'Deal structuring & win strategy',
    subtitle: 'Shape the right facility before it goes to credit',
    caption:
      'REO proposes three structures built around the client\'s situation — Daisy picks the one that serves Avonmore best.',
    device: 'desktop',
    chapter: 'Progress the deal',
    component: StructureDeal,
  },
  {
    id: 'capture',
    title: 'Post-meeting momentum',
    subtitle: 'Captured once — available to everyone who needs it',
    caption:
      'Captured once and available to everyone who needs it — Marcus, credit, product. Daisy\'s next action is already in front of her.',
    device: 'desktop',
    chapter: 'Progress the deal',
    component: PostMeetingSummary,
  },
  {
    id: 'orchestrate',
    title: 'Agent bench & orchestration',
    subtitle: 'You orchestrate — agents progress the deal',
    caption:
      'Daisy stays in the relationships — REO orchestrates the bench to progress the deal toward credit.',
    device: 'desktop',
    chapter: 'Progress the deal',
    component: AgentBench,
  },
  {
    id: 'scale',
    title: 'Portfolio opportunity radar',
    subtitle: 'The same play, repeated across your whole book',
    caption:
      "Today's three priorities across the book — ranked and ready. REO monitors continuously; Daisy focuses on what matters most.",
    device: 'desktop',
    chapter: 'Win & scale',
    component: OpportunityRadar,
  },
  {
    id: 'unified',
    title: 'Unified platform',
    subtitle: 'One pane of glass — across the whole group',
    caption:
      'One view of the Avonmore Group relationship — client, deal and workflow. And a clear line of sight to what comes next.',
    device: 'desktop',
    chapter: 'Win & scale',
    component: UnifiedPlatform,
  },
  {
    id: 'review',
    title: 'Relationship review & next cycle',
    subtitle: 'The deal is live — and the next cycle has already begun',
    caption:
      'The deal is live — and REO has already detected the next signal. The cycle restarts from a stronger position.',
    device: 'desktop',
    chapter: 'Win & scale',
    component: RelationshipReview,
  },
];
