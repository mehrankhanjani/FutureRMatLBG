import type { Version } from '../types';
import { scenes } from './scenes';

/**
 * Iteration 3 — the full lifecycle cut. Builds on the v2 M&A story with two
 * new scenes (Relationship Intelligence before the meeting; Relationship Review
 * closing the loop) and enriched versions of all eight existing scenes.
 *
 * The narrative centres on the RM–client relationship; REO is the enabler, not
 * the lead. Language, framing and agent references are aligned to LBG's North
 * Star (REO, not WorkIQ).
 */
export const v3: Version = {
  id: 'v3',
  label: 'Iteration 3',
  blurb: 'Full lifecycle · relationship intelligence & closing the loop',
  scenes,
};
