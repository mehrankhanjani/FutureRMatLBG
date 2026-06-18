import { useState } from 'react';
import { DesktopChrome } from './DesktopChrome';
import { Card } from '../../ui/primitives';
import { Icon, type IconName } from '../../ui/icons';
import { radar, type RadarItem } from '../../data/scenario';

const priorityStyle: Record<RadarItem['priority'], { chip: string; bar: string }> = {
  High: { chip: 'bg-risk/15 text-risk', bar: 'bg-risk' },
  Medium: { chip: 'bg-chip-amber/20 text-chip-amber', bar: 'bg-chip-amber' },
  Low: { chip: 'bg-info/15 text-info', bar: 'bg-info' },
};

const productIcon: Record<string, IconName> = {
  'Working capital · FX': 'trendingUp',
  'Liquidity / deposits': 'building',
  'Sustainable finance': 'globe',
  Refinancing: 'clock',
};

/**
 * OpportunityRadar — the proactive, book-wide view. Trigger-based opportunities
 * across the whole portfolio, each with a priority and a reason to call today.
 */
export function OpportunityRadar() {
  const [actioned, setActioned] = useState<Set<number>>(new Set());
  const highCount = radar.filter((r) => r.priority === 'High').length;

  return (
    <DesktopChrome
      active="radar"
      title="Opportunity radar"
      subtitle="Proactive triggers across your whole book"
    >
      {/* header strip */}
      <div className="anim-fadeUp mb-4 flex items-center gap-3 rounded-2xl border border-line bg-surface px-4 py-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/15 text-accent">
          <Icon name="target" size={18} />
        </span>
        <div>
          <p className="text-sm font-bold">
            {radar.length} opportunities surfaced · {highCount} need action today
          </p>
          <p className="text-xs text-muted">
            Detected from meetings, filings and market signals — ranked by priority
          </p>
        </div>
        <span className="ml-auto flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1.5 text-xs font-bold text-accent">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          Live scan
        </span>
      </div>

      {/* opportunity rows */}
      <div className="space-y-3">
        {radar.map((r, i) => {
          const ps = priorityStyle[r.priority];
          const isOwn = r.client === 'Avonmore Components';
          const isActioned = actioned.has(i);
          return (
            <Card
              key={i}
              className="anim-fadeUp flex items-stretch gap-0 overflow-hidden"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              {/* priority bar */}
              <span className={`w-1.5 shrink-0 ${ps.bar}`} />

              <div className="flex flex-1 items-center gap-4 p-4">
                {/* product icon */}
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-surface-2 text-accent">
                  <Icon name={productIcon[r.product] ?? 'sparkle'} size={20} />
                </span>

                {/* main */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm font-extrabold">{r.client}</span>
                    {isOwn && (
                      <span className="shrink-0 rounded-full bg-brand/20 px-2 py-0.5 text-[10px] font-bold text-brand">
                        Your client
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 flex items-center gap-1.5 text-xs font-semibold text-text">
                    <Icon name="zap" size={12} className="text-accent" /> {r.trigger}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-muted">{r.reason}</p>
                </div>

                {/* product + priority */}
                <div className="hidden w-40 shrink-0 flex-col items-start gap-1.5 sm:flex">
                  <span className="rounded-full bg-surface-2 px-2.5 py-1 text-[11px] font-bold text-muted">
                    {r.product}
                  </span>
                  <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${ps.chip}`}>
                    {r.priority} priority
                  </span>
                </div>

                {/* timing + action */}
                <div className="flex shrink-0 flex-col items-end gap-2">
                  <span className="flex items-center gap-1 text-[11px] font-bold text-faint">
                    <Icon name="clock" size={12} /> {r.when}
                  </span>
                  {isActioned ? (
                    <span className="flex items-center gap-1.5 rounded-full bg-accent/15 px-3 py-1.5 text-xs font-bold text-accent">
                      <Icon name="check" size={13} /> On it
                    </span>
                  ) : (
                    <button
                      onClick={() => setActioned((p) => new Set(p).add(i))}
                      className="flex items-center gap-1.5 rounded-full bg-accent px-3.5 py-1.5 text-xs font-bold text-on-accent transition active:scale-[0.98]"
                    >
                      Act now <Icon name="arrowRight" size={13} />
                    </button>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <p className="mt-4 text-center text-[11px] text-faint">
        Every trigger is explainable — you see why it surfaced before you act.
      </p>
    </DesktopChrome>
  );
}
