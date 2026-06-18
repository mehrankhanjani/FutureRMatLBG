import type { Scene } from '../types';
import { ConsentGate } from './mobile/ConsentGate';
import { LiveMoment } from './mobile/LiveMoment';
import { PostMeetingSummary } from './desktop/PostMeetingSummary';
import { AgentBench } from './desktop/AgentBench';
import { OpportunityRadar } from './desktop/OpportunityRadar';
import { RelationshipGraph } from './desktop/RelationshipGraph';

/**
 * The scripted narrative order for the pitch.
 * Mobile = in the meeting (phone in hand). Desktop = back at the desk (cockpit).
 * Scene components are placeholders until their build step lands.
 */
export const scenes: Scene[] = [
  {
    id: 'consent',
    title: 'Consent gate',
    caption: 'Start of meeting — consent on file or a prompt to ask, with a graceful no-recording fallback.',
    device: 'mobile',
    chapter: 'In the meeting',
    component: ConsentGate,
  },
  {
    id: 'live-moment',
    title: 'Live moment',
    caption: 'The client mentions Germany — the system detects signals and surfaces a subtle prompt.',
    device: 'mobile',
    chapter: 'In the meeting',
    component: LiveMoment,
  },
  {
    id: 'summary',
    title: 'Post-meeting summary',
    caption: 'Moments after the meeting — an auto-generated summary lands in the CRM.',
    device: 'desktop',
    chapter: 'Back at the desk',
    component: PostMeetingSummary,
  },
  {
    id: 'agent-bench',
    title: 'Agent bench',
    caption: 'The RM oversees a bench of agents handling the workload.',
    device: 'desktop',
    chapter: 'Back at the desk',
    component: AgentBench,
  },
  {
    id: 'radar',
    title: 'Opportunity radar',
    caption: 'Book-wide proactive triggers — a reason to call today.',
    device: 'desktop',
    chapter: 'Proactive',
    component: OpportunityRadar,
  },
  {
    id: 'graph',
    title: 'Relationship graph',
    caption: 'The relationship intelligence map and health score.',
    device: 'desktop',
    chapter: 'Proactive',
    component: RelationshipGraph,
  },
];
