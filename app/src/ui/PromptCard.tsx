import { Icon } from './icons';

/**
 * PromptCard — the signature "subtle prompt" surfaced on the RM's device.
 * Shows insight + rationale + a suggested action. Carries a visible source so
 * the RM can trust and explain it.
 */
export function PromptCard({
  insight,
  rationale,
  action,
  value,
  timing,
  onAccept,
  onDismiss,
}: {
  insight: string;
  rationale: string;
  action: string;
  /** Optional commercial value of acting on this prompt */
  value?: string;
  /** Optional timing advantage \u2014 why acting now wins */
  timing?: string;
  onAccept?: () => void;
  onDismiss?: () => void;
}) {
  return (
    <div className="rounded-[18px] border border-accent/30 bg-surface p-4 shadow-lg shadow-black/40">
      <div className="mb-2 flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-on-accent">
          <Icon name="sparkle" size={14} />
        </span>
        <span className="text-xs font-bold uppercase tracking-wide text-accent">
          Suggested by your assistant
        </span>
      </div>

      <p className="text-[15px] font-bold leading-snug text-text">{insight}</p>

      <div className="mt-2 flex items-start gap-1.5 text-xs text-muted">
        <Icon name="message" size={13} className="mt-0.5 shrink-0" />
        <span>{rationale}</span>
      </div>

      {value && (
        <div className="mt-2.5 flex items-center gap-1.5 rounded-xl bg-accent/10 px-3 py-1.5">
          <Icon name="trendingUp" size={13} className="shrink-0 text-accent" />
          <span className="text-xs font-bold text-accent">{value}</span>
        </div>
      )}

      <div className="mt-3 flex items-center gap-2 rounded-xl bg-surface-2 px-3 py-2">
        <Icon name="zap" size={14} className="text-accent" />
        <span className="text-sm font-semibold text-text">{action}</span>
      </div>

      {timing && (
        <div className="mt-2 flex items-start gap-1.5 px-1 text-[11px] font-semibold text-chip-amber">
          <Icon name="clock" size={12} className="mt-0.5 shrink-0" />
          <span>{timing}</span>
        </div>
      )}

      {(onAccept || onDismiss) && (
        <div className="mt-3 flex gap-2">
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="flex-1 rounded-full border border-text/20 py-2.5 text-xs font-bold text-muted transition active:scale-[0.98]"
            >
              Dismiss
            </button>
          )}
          {onAccept && (
            <button
              onClick={onAccept}
              className="flex-1 rounded-full bg-accent py-2.5 text-xs font-bold text-on-accent transition active:scale-[0.98]"
            >
              Use this
            </button>
          )}
        </div>
      )}
    </div>
  );
}
