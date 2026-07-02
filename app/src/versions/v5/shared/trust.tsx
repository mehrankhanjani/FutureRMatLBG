import { Icon, type IconName } from '../../../ui/icons';

/* =========================================================================
 * The cross-cutting trust layer — small labels that make every surface
 * legible: who owns it, where it came from, how fresh it is, whether it was
 * automated or manual, and who can see it. Reused across all v5 components.
 * ========================================================================= */

/* ---- OwnerTag — who owns this task / stage / blocker / update ----------- */

export type Owner =
  | 'rm'
  | 'agent'
  | 'client'
  | 'service'
  | 'product'
  | 'risk'
  | 'system'
  | 'awaiting';

const ownerCfg: Record<Owner, { icon: IconName; cls: string; label: string }> = {
  rm: { icon: 'heart', cls: 'bg-brand/15 text-brand', label: 'RM owned' },
  agent: { icon: 'bot', cls: 'bg-accent/15 text-accent', label: 'Agent owned' },
  client: { icon: 'users', cls: 'bg-info/15 text-info', label: 'Client owned' },
  service: { icon: 'bell', cls: 'bg-chip-purple/15 text-chip-purple', label: 'Service team' },
  product: { icon: 'sparkle', cls: 'bg-chip-pink/20 text-chip-pink', label: 'Product' },
  risk: { icon: 'shield', cls: 'bg-risk/15 text-risk', label: 'Risk / approval' },
  system: { icon: 'zap', cls: 'bg-surface-2 text-muted', label: 'System generated' },
  awaiting: { icon: 'clock', cls: 'bg-chip-amber/20 text-chip-amber', label: 'Awaiting client' },
};

export function OwnerTag({ owner, className = '' }: { owner: Owner; className?: string }) {
  const c = ownerCfg[owner];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${c.cls} ${className}`}
    >
      <Icon name={c.icon} size={10} /> {c.label}
    </span>
  );
}

/* ---- AutomationTag — auto-captured vs manual vs AI vs confirmed ---------- */

export type Automation = 'auto' | 'manual' | 'ai' | 'confirmed' | 'system' | 'pending';

const autoCfg: Record<Automation, { icon: IconName; cls: string; label: string }> = {
  auto: { icon: 'zap', cls: 'bg-accent/10 text-accent', label: 'Auto-captured' },
  manual: { icon: 'doc', cls: 'bg-surface-2 text-muted', label: 'Manually entered' },
  ai: { icon: 'sparkle', cls: 'bg-brand/10 text-brand', label: 'AI suggested' },
  confirmed: { icon: 'check', cls: 'bg-accent/15 text-accent', label: 'RM confirmed' },
  system: { icon: 'bot', cls: 'bg-info/10 text-info', label: 'System updated' },
  pending: { icon: 'clock', cls: 'bg-chip-amber/20 text-chip-amber', label: 'Pending validation' },
};

export function AutomationTag({ kind, className = '' }: { kind: Automation; className?: string }) {
  const c = autoCfg[kind];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${c.cls} ${className}`}
    >
      <Icon name={c.icon} size={10} /> {c.label}
    </span>
  );
}

/* ---- SourceChip — where it came from, how fresh, how confident ---------- */

export type Confidence = 'High' | 'Medium' | 'Needs validation';

export function SourceChip({
  source,
  updated,
  confidence,
  className = '',
}: {
  source: string;
  updated?: string;
  confidence?: Confidence;
  className?: string;
}) {
  const confCls =
    confidence === 'High'
      ? 'text-accent'
      : confidence === 'Medium'
        ? 'text-chip-amber'
        : 'text-muted';
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-surface-2 px-2 py-0.5 text-[10px] font-semibold text-muted ${className}`}
    >
      <Icon name="doc" size={10} className="shrink-0" />
      <span>Source: {source}</span>
      {updated && <span className="text-faint">· {updated}</span>}
      {confidence && <span className={`font-bold ${confCls}`}>· {confidence}</span>}
    </span>
  );
}

/* ---- VisibilityBadge — consent, privacy and who can see it -------------- */

export type Visibility =
  | 'internal'
  | 'client'
  | 'restricted'
  | 'consent'
  | 'consent-required'
  | 'transcript'
  | 'no-transcript';

const visCfg: Record<Visibility, { icon: IconName; cls: string; label: string }> = {
  internal: { icon: 'shield', cls: 'bg-surface-2 text-muted', label: 'Internal only' },
  client: { icon: 'users', cls: 'bg-info/15 text-info', label: 'Client visible' },
  restricted: { icon: 'shield', cls: 'bg-risk/15 text-risk', label: 'Restricted' },
  consent: { icon: 'check', cls: 'bg-accent/15 text-accent', label: 'Consent captured' },
  'consent-required': { icon: 'alert', cls: 'bg-chip-amber/20 text-chip-amber', label: 'Consent required' },
  transcript: { icon: 'mic', cls: 'bg-accent/10 text-accent', label: 'Transcript available' },
  'no-transcript': { icon: 'micOff', cls: 'bg-surface-2 text-muted', label: 'No transcript' },
};

export function VisibilityBadge({ kind, className = '' }: { kind: Visibility; className?: string }) {
  const c = visCfg[kind];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${c.cls} ${className}`}
    >
      <Icon name={c.icon} size={10} /> {c.label}
    </span>
  );
}
