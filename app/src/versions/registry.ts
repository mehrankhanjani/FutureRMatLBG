import type { Version } from './types';
import { v1 } from './v1';
import { v2 } from './v2';

/** All cuts of the prototype, in display order. */
export const versions: Version[] = [v1, v2];

/** Which version loads by default (when there is no ?v= in the URL). */
export const DEFAULT_VERSION_ID = 'v2';

/** Flip to false for the final cut to hide the switcher entirely. */
export const SHOW_SWITCHER = true;

export function getVersion(id: string | null | undefined): Version {
  return versions.find((v) => v.id === id) ?? versions[0];
}

/** Read the requested version id from the URL (?v=v1). */
export function versionFromUrl(): string | null {
  if (typeof window === 'undefined') return null;
  return new URLSearchParams(window.location.search).get('v');
}
