import { useEffect, useRef, useState } from 'react';
import { Avatar } from '../ui/primitives';
import { Icon, type IconName } from '../ui/icons';

type Role = {
  name: string;
  role: string;
  emphasis: string;
  icon: IconName;
};

/** The one lens this prototype is actually built as. */
const ACTIVE: Role = {
  name: 'Daisy Bennett',
  role: 'Relationship Manager',
  emphasis: 'Your book — clients, opportunities and live deals',
  icon: 'heart',
};

/** Other roles are illustrative only — they show the platform is role-aware. */
const OTHER_ROLES: Role[] = [
  {
    name: 'Managing Director',
    role: 'Franchise',
    emphasis: 'Sector strategy and the top opportunities across the book',
    icon: 'trendingUp',
  },
  {
    name: 'Regional Head',
    role: 'Coverage lead',
    emphasis: 'Team performance and portfolio health across RMs',
    icon: 'globe',
  },
  {
    name: 'Credit',
    role: 'Risk & approvals',
    emphasis: 'Appetite, limits and the live approval queue',
    icon: 'shield',
  },
  {
    name: 'Product',
    role: 'Specialist',
    emphasis: 'Solution fit and the cross-sell pipeline',
    icon: 'sparkle',
  },
  {
    name: 'Service',
    role: 'In-life',
    emphasis: 'Post-deal servicing and covenant monitoring',
    icon: 'users',
  },
];

/**
 * Persona / account chip for the top bar.
 *
 * The prototype is built as Daisy's RM view; this chip signals that the
 * platform is role-aware and personalised. Other roles are listed as
 * *preview only* (not selectable) so nothing reads as broken in the demo.
 */
export function PersonaChip() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener('mousedown', onDown);
    return () => window.removeEventListener('mousedown', onDown);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label="Signed in as Daisy Bennett, Relationship Manager"
        className="flex items-center gap-2.5 rounded-full border border-line bg-surface py-1 pl-1 pr-3 transition hover:border-accent/40"
      >
        <Avatar initials="DB" size={30} tone="accent" />
        <span className="hidden text-left leading-tight sm:block">
          <span className="block text-xs font-extrabold text-text">{ACTIVE.name}</span>
          <span className="block text-[10px] font-semibold text-muted">{ACTIVE.role}</span>
        </span>
        <Icon
          name="chevronRight"
          size={14}
          className={`text-muted transition-transform ${open ? 'rotate-90' : ''}`}
        />
      </button>

      {open && (
        <div className="anim-fadeUp absolute right-0 z-30 mt-2 w-72 rounded-2xl border border-line bg-surface p-2 shadow-xl">
          {/* signed in */}
          <div className="mb-1 px-2 pt-1 text-[10px] font-bold uppercase tracking-wide text-faint">
            Signed in as
          </div>
          <div className="flex items-start gap-2.5 rounded-xl bg-accent/10 p-2.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-on-accent">
              <Icon name={ACTIVE.icon} size={15} />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-extrabold text-text">{ACTIVE.name}</p>
              <p className="text-[11px] font-semibold text-accent">{ACTIVE.role}</p>
              <p className="mt-0.5 text-[11px] leading-snug text-muted">{ACTIVE.emphasis}</p>
            </div>
          </div>

          {/* other roles — preview only */}
          <div className="mb-1 mt-2 flex items-center gap-2 px-2 text-[10px] font-bold uppercase tracking-wide text-faint">
            Other roles
            <span className="rounded-full bg-surface-2 px-1.5 py-0.5 text-[9px] font-bold text-muted">
              preview
            </span>
          </div>
          <ul className="space-y-0.5">
            {OTHER_ROLES.map((r) => (
              <li key={r.name}>
                <div
                  title="Preview only in this prototype"
                  className="flex cursor-not-allowed items-start gap-2.5 rounded-xl px-2.5 py-2 opacity-70"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-2 text-muted">
                    <Icon name={r.icon} size={15} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-text">{r.name}</p>
                    <p className="text-[11px] leading-snug text-muted">{r.emphasis}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-2 border-t border-line px-2 pt-2 text-[10px] leading-snug text-faint">
            This prototype is built as Daisy's RM view. Other roles would see the
            same platform, re-prioritised for their job.
          </p>
        </div>
      )}
    </div>
  );
}
