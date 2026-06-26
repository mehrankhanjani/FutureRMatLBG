import type { Version } from './types';

type Props = {
  versions: Version[];
  activeId: string;
  onSelect: (id: string) => void;
  lockedIds?: string[];
};

/** Compact pill switcher to flip between iterations of the prototype. */
export function VersionSwitcher({ versions, activeId, onSelect, lockedIds = [] }: Props) {
  return (
    <div className="flex items-center gap-1 rounded-full border border-line p-1">
      {versions.map((v) => {
        const active = v.id === activeId;
        const locked = lockedIds.includes(v.id);
        if (locked) {
          return (
            <span
              key={v.id}
              title="This iteration is locked"
              aria-disabled="true"
              className="flex cursor-not-allowed items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold text-muted/40"
            >
              {v.label}
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="5" y="11" width="14" height="9" rx="2" fill="currentColor" />
                <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </span>
          );
        }
        return (
          <button
            key={v.id}
            type="button"
            onClick={() => onSelect(v.id)}
            title={v.blurb}
            className={
              active
                ? 'rounded-full bg-accent/15 px-3 py-1 text-xs font-bold text-accent'
                : 'rounded-full px-3 py-1 text-xs font-semibold text-muted hover:text-white'
            }
          >
            {v.label}
          </button>
        );
      })}
    </div>
  );
}
