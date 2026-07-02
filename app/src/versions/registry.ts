import type { Version } from './types';
import { v1 } from './v1';
import { v2 } from './v2';
import { v3 } from './v3';
import { v4 } from './v4';
import { v5 } from './v5';

/** All cuts of the prototype, in display order. */
export const versions: Version[] = [v1, v2, v3, v4, v5];

/** Which version loads by default (when there is no ?v= in the URL). */
export const DEFAULT_VERSION_ID = 'v5';

/** Flip to false for the final cut to hide the switcher entirely. */
export const SHOW_SWITCHER = true;

/**
 * Iterations shown in the switcher. Earlier cuts remain in the codebase and
 * reachable via ?v= but are hidden from the pill switcher.
 */
export const SWITCHER_VERSION_IDS = ['v4', 'v5'];

/** Iterations that are shown in the switcher but cannot be opened. */
export const LOCKED_VERSION_IDS: string[] = [];

export function getVersion(id: string | null | undefined): Version {
  const requested = versions.find((v) => v.id === id);
  if (!requested || LOCKED_VERSION_IDS.includes(requested.id)) {
    return versions.find((v) => v.id === DEFAULT_VERSION_ID) ?? versions[0];
  }
  return requested;
}

/** Read the requested version id from the URL (?v=v1). */
export function versionFromUrl(): string | null {
  if (typeof window === 'undefined') return null;
  return new URLSearchParams(window.location.search).get('v');
}
