import type { Scene } from '../types';

/**
 * A self-contained iteration of the prototype: its own scene list (and,
 * once it forks, its own scenario data). Versions live side-by-side so we
 * can demo the evolution of the concept without losing earlier cuts.
 */
export type Version = {
  /** Stable id used in the URL (?v=) and the switcher */
  id: string;
  /** Short label shown in the switcher */
  label: string;
  /** One-line description of what this cut is about */
  blurb: string;
  /** The scripted scene order for this version */
  scenes: Scene[];
};
