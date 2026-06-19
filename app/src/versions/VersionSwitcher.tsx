import type { Version } from './types';

type Props = {
  versions: Version[];
  activeId: string;
  onSelect: (id: string) => void;
};

/** Compact pill switcher to flip between iterations of the prototype. */
export function VersionSwitcher({ versions, activeId, onSelect }: Props) {
  return (
    <div className="flex items-center gap-1 rounded-full border border-line p-1">
      {versions.map((v) => {
        const active = v.id === activeId;
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
