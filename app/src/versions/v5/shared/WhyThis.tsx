import { useState } from 'react';
import { Icon } from '../../../ui/icons';

type WhyThisProps = {
  /** The signals, data and rules behind the output — one bullet each. */
  points: string[];
  /** Optional grounding line: the sources and confidence behind the output. */
  basis?: string;
  /** Button label. Defaults to "Why this?". */
  label?: string;
  className?: string;
};

/**
 * WhyThis — the cross-cutting "show the agent's reasoning" primitive.
 *
 * A small inline affordance attached to any AI-produced output. Expands to
 * reveal the reasoning (signals, data and rules) and an optional grounding
 * line, keeping the human in the loop. Always available (independent of the
 * global explain-mode Help drawer), so every enabler can carry its own "why".
 */
export function WhyThis({ points, basis, label = 'Why this?', className = '' }: WhyThisProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-2.5 py-1 text-[10px] font-bold text-brand transition hover:bg-brand/20"
      >
        <Icon name="sparkle" size={11} />
        {label}
        <Icon
          name="chevronRight"
          size={10}
          className={`transition-transform ${open ? 'rotate-90' : ''}`}
        />
      </button>

      {open && (
        <div className="anim-fadeUp mt-2 rounded-2xl border border-brand/20 bg-brand/5 p-3">
          <p className="mb-1.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-brand">
            <Icon name="bot" size={11} /> REO reasoning
          </p>
          <ul className="space-y-1.5">
            {points.map((p, i) => (
              <li key={i} className="flex items-start gap-1.5 text-[11px] leading-snug text-text">
                <Icon name="check" size={11} className="mt-0.5 shrink-0 text-brand" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
          {basis && (
            <p className="mt-2 flex items-start gap-1 border-t border-brand/15 pt-2 text-[10px] leading-snug text-muted">
              <Icon name="doc" size={10} className="mt-0.5 shrink-0" /> {basis}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
