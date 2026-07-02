import type { Version } from '../types';
import { scenes } from './scenes';

/**
 * Iteration 5 — the workshop-two cut. Forks iteration 4 and applies the
 * feedback captured in docs/plan_workshop_two/in_workshop_build_plan.md:
 * an origination control centre, a cross-cutting trust layer (reasoning,
 * source/freshness, ownership, manual/auto) and enrichments across all five
 * RM-journey components.
 */
export const v5: Version = {
  id: 'v5',
  label: 'Iteration 5',
  blurb: 'Workshop-two cut · control centre & trust layer',
  scenes,
};
