import type { Version } from './types';
import { v1 } from './v1';
import { v2 } from './v2';
import { v3 } from './v3';
import { v4 } from './v4';

/** All cuts of the prototype, in display order. */
export const versions: Version[] = [v1, v2, v3, v4];

/** Which version loads by default (when there is no ?v= in the URL). */
export const DEFAULT_VERSION_ID = 'v4';

/** Flip to false for the final cut to hide the switcher entirely. */
export const SHOW_SWITCHER = false;

/** Iterations that are shown in the switcher but cannot be opened. */
export const LOCKED_VERSION_IDS = ['v1'];

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
