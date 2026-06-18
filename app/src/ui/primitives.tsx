import type { CSSProperties, ReactNode } from 'react';

/* ---- Card --------------------------------------------------------------- */
export function Card({
  children,
  className = '',
  raised,
  style,
}: {
  children: ReactNode;
  className?: string;
  raised?: boolean;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`rounded-[18px] ${raised ? 'bg-surface-2' : 'bg-surface'} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

/* ---- Pill button -------------------------------------------------------- */
export function Pill({
  children,
  variant = 'primary',
  full,
  onClick,
  className = '',
}: {
  children: ReactNode;
  variant?: 'primary' | 'dark' | 'outline' | 'ghost';
  full?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  const styles = {
    primary: 'bg-accent text-on-accent',
    dark: 'bg-black text-white',
    outline: 'border border-text/30 text-text',
    ghost: 'text-muted hover:text-text',
  }[variant];
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-6 py-3.5 text-sm font-bold transition active:scale-[0.98] ${styles} ${
        full ? 'w-full' : ''
      } ${className}`}
    >
      {children}
    </button>
  );
}

/* ---- Tag / signal chip -------------------------------------------------- */
const toneMap = {
  need: 'bg-info/15 text-info',
  risk: 'bg-risk/15 text-risk',
  opportunity: 'bg-accent/15 text-accent',
  context: 'bg-chip-purple/15 text-chip-purple',
  emotion: 'bg-chip-pink/20 text-chip-pink',
  neutral: 'bg-surface-2 text-muted',
} as const;

export function Chip({
  children,
  tone = 'neutral',
  className = '',
}: {
  children: ReactNode;
  tone?: keyof typeof toneMap;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${toneMap[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

/* ---- Status pill (agent states) ----------------------------------------- */
export function StatusPill({ status }: { status: 'running' | 'done' | 'waiting' }) {
  const map = {
    running: { label: 'Running', cls: 'bg-info/15 text-info', dot: 'bg-info animate-pulse' },
    done: { label: 'Done', cls: 'bg-accent/15 text-accent', dot: 'bg-accent' },
    waiting: { label: 'Needs approval', cls: 'bg-chip-amber/20 text-chip-amber', dot: 'bg-chip-amber animate-pulse' },
  }[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ${map.cls}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${map.dot}`} />
      {map.label}
    </span>
  );
}

/* ---- Icon chip (pastel circle) ------------------------------------------ */
export function IconChip({
  color = '--color-chip-teal',
  children,
  size = 44,
}: {
  color?: string;
  children: ReactNode;
  size?: number;
}) {
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-full text-ink"
      style={{ background: `var(${color})`, width: size, height: size }}
    >
      {children}
    </div>
  );
}

/* ---- Avatar (initials) -------------------------------------------------- */
export function Avatar({
  initials,
  size = 40,
  tone = 'brand',
}: {
  initials: string;
  size?: number;
  tone?: 'brand' | 'accent' | 'muted';
}) {
  const bg = {
    brand: 'var(--color-brand)',
    accent: 'var(--color-accent)',
    muted: 'var(--color-surface-2)',
  }[tone];
  const fg = tone === 'muted' ? 'var(--color-text)' : 'var(--color-ink)';
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-full text-sm font-extrabold"
      style={{ background: bg, color: fg, width: size, height: size }}
    >
      {initials}
    </div>
  );
}

/* ---- Section label ------------------------------------------------------ */
export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="mb-2 text-xs font-bold uppercase tracking-wide text-muted">
      {children}
    </div>
  );
}
