import { useState } from 'react';
import { DesktopChrome } from './DesktopChrome';
import { Card } from '../../../ui/primitives';
import { Icon, type IconName } from '../../../ui/icons';
import { radar, intelligenceSources, dealStages, type RadarItem } from '../scenario';

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
 * Scale across the portfolio — the proactive, book-wide view. The Avonmore play
 * is now repeatable: trigger-based opportunities across the whole portfolio,
 * each with a priority and a reason to call today.
 */
export function OpportunityRadar() {
  const [actioned, setActioned] = useState<Set<number>>(new Set());
  const highCount = radar.filter((r) => r.priority === 'High').length;

  return (
    <DesktopChrome
      active="radar"
      title="Scale across the portfolio"
      subtitle="The same play, repeated across your whole book"
      dealStage={dealStages.scale}
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
                        Your deal
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

      {/* intelligence sources — what the always-on engine is grounded in */}
      <Card className="anim-fadeUp mt-4 p-4" style={{ animationDelay: '320ms' }}>
        <div className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/15 text-accent">
            <Icon name="sparkle" size={14} />
          </span>
          <h3 className="text-sm font-extrabold">{intelligenceSources.label}</h3>
          <span className="rounded-full bg-surface-2 px-2 py-0.5 text-[10px] font-bold text-faint">
            {intelligenceSources.example}
          </span>
          <p className="w-full text-xs text-muted sm:w-auto sm:flex-1 sm:pl-1">
            {intelligenceSources.blurb}
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {intelligenceSources.sources.map((s) => (
            <div key={s.name} className="flex items-start gap-3 rounded-2xl bg-surface-2 p-3.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <Icon name={s.icon} size={16} />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-bold">{s.name}</p>
                <p className="mt-0.5 text-xs leading-snug text-muted">{s.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <p className="mt-4 text-center text-[11px] text-faint">
        Every trigger is explainable — you see why it surfaced, and the sources behind it, before you act.
      </p>
    </DesktopChrome>
  );
}
