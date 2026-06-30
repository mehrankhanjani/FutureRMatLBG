import type { Scene } from '../../types';
import { scenes as v3Scenes } from '../v3/scenes';
import { OpportunityIgnition } from './desktop/OpportunityIgnition';
import { StructureDeal } from './desktop/StructureDeal';
import { RelationshipReview } from './desktop/RelationshipReview';

/**
 * Iteration 4 scene order — same 10-scene lifecycle as v3, but the desktop
 * scenes that crammed several concepts into one card are restructured into
 * the "one concept = one card" (Option A) layout.
 *
 * Overridden scenes: Ignition, Structure, Review. Every other scene reuses the
 * v3 component unchanged (it already follows one-concept-per-card).
 */
const overrides: Record<string, Scene['component']> = {
  ignition: OpportunityIgnition,
  structure: StructureDeal,
  review: RelationshipReview,
};

export const scenes: Scene[] = v3Scenes.map((s) =>
  overrides[s.id] ? { ...s, component: overrides[s.id] } : s,
);
