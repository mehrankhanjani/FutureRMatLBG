import type { Version } from '../types';
import { scenes } from './scenes';

/**
 * Iteration 4 — the "clear separation" cut. Same lifecycle and narrative as
 * iteration 3, restyled around the Option A principle: one concept per card.
 * The dense multi-concept hero/panel cards (Ignition, Structure, Review) are
 * broken into discrete, labelled boxes so each idea reads on its own.
 */
export const v4: Version = {
  id: 'v4',
  label: 'Iteration 4',
  blurb: 'Clear separation · one concept per card',
  scenes,
};
