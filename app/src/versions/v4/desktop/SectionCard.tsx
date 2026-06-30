import type { CSSProperties, ReactNode } from 'react';
import { Card } from '../../../ui/primitives';
import { Icon, type IconName } from '../../../ui/icons';
import { HelpSpot } from '../../v3/help/Help';

type Tone = 'accent' | 'brand' | 'risk' | 'info';

const toneCfg: Record<Tone, { text: string; bg: string }> = {
  accent: { text: 'text-accent', bg: 'bg-accent/15' },
  brand: { text: 'text-brand', bg: 'bg-brand/15' },
  risk: { text: 'text-risk', bg: 'bg-risk/15' },
  info: { text: 'text-info', bg: 'bg-info/15' },
};

/**
 * SectionCard — the iteration 4 "one concept = one card" primitive.
 *
 * Every card carries a single, clearly-labelled idea: an uppercase section
 * header (icon + label + optional explain spot + optional right-aligned slot)
 * sitting above its own bordered surface. Used to break the dense multi-concept
 * hero cards from v3 into separate, scannable boxes.
 */
export function SectionCard({
  label,
  icon,
  tone = 'accent',
  helpId,
  right,
  raised,
  className = '',
  style,
  children,
}: {
  label: string;
  icon?: IconName;
  tone?: Tone;
  helpId?: string;
  right?: ReactNode;
  raised?: boolean;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const cfg = toneCfg[tone];
  return (
    <Card raised={raised} className={`anim-fadeUp relative p-5 ${className}`} style={style}>
      {helpId && (
        <div className="absolute right-4 top-4 z-10">
          <HelpSpot id={helpId} />
        </div>
      )}
      <div className={`mb-3 flex items-center gap-2 ${helpId ? 'pr-7' : ''}`}>
        {icon && (
          <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${cfg.bg} ${cfg.text}`}>
            <Icon name={icon} size={14} />
          </span>
        )}
        <span className={`text-[11px] font-bold uppercase tracking-wide ${cfg.text}`}>{label}</span>
        {right && <div className="ml-auto">{right}</div>}
      </div>
      {children}
    </Card>
  );
}
