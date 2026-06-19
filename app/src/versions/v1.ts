import type { Version } from './types';
import { scenes } from '../scenes/scenes';

/**
 * Iteration 1 — the original "AI insights" cut. Wrapped in place (the files
 * still live under src/scenes + src/data) so this version stays frozen and
 * the working build is never at risk.
 */
export const v1: Version = {
  id: 'v1',
  label: 'Iteration 1',
  blurb: 'Original cut · AI insights in the meeting',
  scenes,
};
