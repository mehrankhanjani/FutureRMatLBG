import type { Scene } from '../../types';
import { scenes as v4Scenes } from '../v4/scenes';
import { OpportunityIgnition } from './desktop/OpportunityIgnition';
import { OpportunityRadar } from './desktop/OpportunityRadar';
import { StructureDeal } from './desktop/StructureDeal';
import { AgentBench } from './desktop/AgentBench';
import { PostMeetingSummary } from './desktop/PostMeetingSummary';
import { UnifiedPlatform } from './desktop/UnifiedPlatform';
import { RelationshipReview } from './desktop/RelationshipReview';

/**
 * Iteration 5 scene order — same 10-scene lifecycle as v4.
 *
 * v5 forks v4 and overrides only the scenes that change per the in-workshop
 * build plan (docs/plan_workshop_two/in_workshop_build_plan.md). Every other
 * scene reuses the v4 component unchanged. Overrides are added here as each
 * component's work lands.
 */
const overrides: Record<string, Scene['component']> = {
  // Identify (Scene 1) — credit/appetite/risk, related opportunities, activity.
  ignition: OpportunityIgnition,
  // Shape the proposition (Scene 5) — deal solutioning, precedent, security,
  // integrated pricing, business-rules and per-enabler reasoning.
  structure: StructureDeal,
  // Orchestrate (Scene 6) — post-meeting capture flow, RM validation, decisions.
  capture: PostMeetingSummary,
  // Orchestrate (Scene 7) — origination control centre.
  orchestrate: AgentBench,
  // Identify (Scene 8) — pipeline horizon, configurable filter, gaps lens.
  scale: OpportunityRadar,
  // Deepen (Scene 9) — client hub, relationship & portfolio health.
  unified: UnifiedPlatform,
  // Deepen (Scene 10) — hidden risks, external intelligence, next cycle.
  review: RelationshipReview,
};

export const scenes: Scene[] = v4Scenes.map((s) =>
  overrides[s.id] ? { ...s, component: overrides[s.id] } : s,
);
