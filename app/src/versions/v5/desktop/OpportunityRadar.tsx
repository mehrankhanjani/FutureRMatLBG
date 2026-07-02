import { useState } from 'react';
import { DesktopChrome } from '../../v2/desktop/DesktopChrome';
import { Card } from '../../../ui/primitives';
import { Icon, type IconName } from '../../../ui/icons';
import { HelpSpot } from '../../v3/help/Help';
import { SceneTabs, PORTFOLIO_TABS } from '../../v3/desktop/SceneTabs';
import {
  radar,
  dealStages,
  radarDigest,
  radarHorizons,
  productSuggestion,
  portfolioScorecard,
  pipelineHorizon,
  radarGaps,
  type RadarItem,
} from '../scenario';

const priorityStyle: Record<RadarItem['priority'], { chip: string; bar: string }> = {
  High: { chip: 'bg-risk/15 text-risk', bar: 'bg-risk' },
  Medium: { chip: 'bg-chip-amber/20 text-chip-amber', bar: 'bg-chip-amber' },
  Low: { chip: 'bg-info/15 text-info', bar: 'bg-info' },
};

const meterCls: Record<'accent' | 'brand' | 'info' | 'amber', string> = {
  accent: 'bg-accent',
  brand: 'bg-brand',
  info: 'bg-info',
  amber: 'bg-chip-amber',
};

const productIcon: Record<string, IconName> = {
  'Acquisition finance · Cash · FX': 'trendingUp',
  'Acquisition finance': 'trendingUp',
  'Working capital · FX': 'trendingUp',
  'Liquidity / deposits': 'building',
  'Sustainable finance': 'globe',
  'FX risk solutions': 'globe',
  Refinancing: 'clock',
};

const horizonTone: Record<'accent' | 'brand' | 'info', string> = {
  accent: 'text-accent',
  brand: 'text-brand',
  info: 'text-info',
};

const gapCfg: Record<string, { icon: IconName; cls: string }> = {
  pricing: { icon: 'alert', cls: 'bg-chip-amber/20 text-chip-amber' },
  dormant: { icon: 'clock', cls: 'bg-chip-amber/20 text-chip-amber' },
  whitespace: { icon: 'target', cls: 'bg-brand/15 text-brand' },
};

type Filter = 'all' | 'High' | 'Medium';

/**
 * Scale across the portfolio — iteration 5.
 *
 * Forks the v3 radar and adds the Identify feedback: a pipeline horizon strip
 * (I5), a configurable priority filter to counter alert overload (I19), and a
 * gaps & attention lens surfacing missing pricing, dormant clients and
 * white-space (I1, I2).
 */
export function OpportunityRadar() {
  const [actioned, setActioned] = useState<Set<number>>(new Set());
  const [expanded, setExpanded] = useState(false);
  const [filter, setFilter] = useState<Filter>('all');
  const highCount = radar.filter((r) => r.priority === 'High').length;

  const filteredRadar = radar
    .map((r, i) => ({ r, i }))
    .filter(({ r }) => filter === 'all' || r.priority === filter);

  return (
    <DesktopChrome
      active="radar"
      title="Scale across the portfolio"
      subtitle="The same play, repeated across your whole book"
      dealStage={dealStages.scale}
    >
      <SceneTabs active="scale" tabs={PORTFOLIO_TABS} />

      {/* your portfolio — scorecard ribbon */}
      <Card className="anim-fadeUp mb-4 p-4">
        <div className="mb-1 flex flex-wrap items-center gap-2">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand/15 text-brand">
            <Icon name="target" size={14} />
          </span>
          <span className="text-[11px] font-bold uppercase tracking-wide text-brand">Your portfolio</span>
          <span className="ml-auto flex items-baseline gap-1.5">
            <span className="text-lg font-extrabold leading-none">{portfolioScorecard.bookValue}</span>
            <span className="text-[11px] text-muted">book value</span>
          </span>
        </div>
        <p className="mb-3 flex items-center gap-1 text-[11px] text-faint">
          <Icon name="globe" size={11} className="text-brand" /> {portfolioScorecard.bookValueNote}
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {portfolioScorecard.targets.map((t) => (
            <div key={t.label} className="rounded-2xl bg-surface-2 p-3">
              <div className="mb-1.5 flex items-baseline justify-between gap-1">
                <span className="truncate text-[11px] font-bold text-muted">{t.label}</span>
                <span className="shrink-0 text-[10px] text-faint">of {t.target}</span>
              </div>
              <p className="text-base font-extrabold leading-none">{t.value}</p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line">
                <span className={`block h-full rounded-full ${meterCls[t.tone]}`} style={{ width: `${t.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-start gap-2 rounded-2xl bg-accent/10 p-3 text-xs">
          <Icon name="sparkle" size={14} className="mt-0.5 shrink-0 text-accent" />
          <p className="leading-snug text-text">{portfolioScorecard.drive}</p>
        </div>
      </Card>

      {/* pipeline horizon — this month / quarter / year (I5) */}
      <Card className="anim-fadeUp mb-4 p-4">
        <div className="mb-3 flex items-center gap-2">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent">
            <Icon name="calendar" size={14} />
          </span>
          <span className="text-[11px] font-bold uppercase tracking-wide text-accent">Pipeline horizon</span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {pipelineHorizon.map((h) => (
            <div key={h.period} className="rounded-2xl bg-surface-2 p-3.5">
              <p className="text-[11px] font-bold text-muted">{h.period}</p>
              <p className={`mt-1 text-2xl font-extrabold leading-none ${horizonTone[h.tone]}`}>{h.count}</p>
              <p className="mt-1 text-[11px] text-faint">opportunities · {h.value}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* smart-filter digest bar — calm summary first, expand for the full list */}
      <div className="anim-fadeUp relative mb-4">
        <button
          onClick={() => setExpanded((v) => !v)}
          className="flex w-full items-center gap-3 rounded-2xl border border-line bg-surface px-4 py-3 pr-11 text-left transition hover:border-accent/40"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
            <Icon name="target" size={18} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold">
              {radarDigest.label} · {radar.length + 1} need your attention
            </p>
            <p className="truncate text-xs text-muted">{radarDigest.note}</p>
          </div>
          <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1.5 text-xs font-bold text-accent">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            Live scan
          </span>
          <Icon
            name="chevronRight"
            size={18}
            className={`shrink-0 text-faint transition-transform ${expanded ? 'rotate-90' : ''}`}
          />
        </button>
        <div className="absolute right-3 top-3 z-10">
          <HelpSpot id="scale.digest" />
        </div>
      </div>

      {expanded ? (
        <>
          <div className="mb-3 flex flex-wrap items-center gap-2 px-1">
            <p className="text-xs font-bold text-muted">
              {filteredRadar.length + (filter === 'all' ? 1 : 0)} shown · {highCount} need action today
            </p>
            {/* configurable priority filter (I19) — cut the noise */}
            <div className="ml-auto flex items-center gap-1 rounded-full border border-line bg-surface p-0.5">
              <Icon name="target" size={12} className="ml-1.5 text-faint" />
              {(['all', 'High', 'Medium'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`rounded-full px-2.5 py-1 text-[11px] font-bold capitalize transition ${
                    filter === f ? 'bg-accent text-on-accent' : 'text-muted hover:text-text'
                  }`}
                >
                  {f === 'all' ? 'All' : f}
                </button>
              ))}
            </div>
          </div>

          {/* opportunity rows */}
          <div className="space-y-3">
            {/* product-suggests card — shown only when not filtering to a priority */}
            {filter === 'all' && (
              <Card className="anim-fadeUp relative flex items-stretch gap-0 overflow-hidden border-brand/30">
                <div className="absolute right-3 top-3 z-10">
                  <HelpSpot id="scale.productsuggest" />
                </div>
                <span className="w-1.5 shrink-0 bg-brand" />
                <div className="flex flex-1 items-center gap-4 p-4 pr-9">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <Icon name="users" size={20} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="truncate text-sm font-extrabold">{productSuggestion.client}</span>
                      <span className="shrink-0 rounded-full bg-brand/20 px-2 py-0.5 text-[10px] font-bold text-brand">
                        Product suggests
                      </span>
                    </div>
                    <p className="mt-0.5 flex items-center gap-1.5 text-xs font-semibold text-text">
                      <Icon name="sparkle" size={12} className="text-brand" /> {productSuggestion.trigger}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-muted">{productSuggestion.reason}</p>
                    <p className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-brand">
                      <Icon name="bell" size={11} /> {productSuggestion.origin}
                    </p>
                  </div>
                  <div className="hidden w-40 shrink-0 flex-col items-start gap-1.5 sm:flex">
                    <span className="rounded-full bg-surface-2 px-2.5 py-1 text-[11px] font-bold text-muted">
                      {productSuggestion.product}
                    </span>
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${priorityStyle[productSuggestion.priority].chip}`}>
                      {productSuggestion.priority} priority
                    </span>
                    <span className="text-[10px] font-semibold text-faint">{productSuggestion.horizon}</span>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-2">
                    <span className="flex items-center gap-1 text-[11px] font-bold text-faint">
                      <Icon name="clock" size={12} /> {productSuggestion.when}
                    </span>
                    <button className="flex items-center gap-1.5 rounded-full bg-brand px-3.5 py-1.5 text-xs font-bold text-ink transition active:scale-[0.98]">
                      Review <Icon name="arrowRight" size={13} />
                    </button>
                  </div>
                </div>
              </Card>
            )}

            {filteredRadar.map(({ r, i }) => {
              const ps = priorityStyle[r.priority];
              const isOwn = r.client === 'Avonmore Group';
              const isActioned = actioned.has(i);
              return (
                <Card
                  key={i}
                  className="anim-fadeUp flex items-stretch gap-0 overflow-hidden"
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
                      <p className="mt-1 text-[11px] font-semibold text-faint">
                        Detected from · {radarHorizons[i] ?? 'Live scan'}
                      </p>
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

          {/* gaps & attention — missing pricing, dormant, white-space (I1, I2) */}
          <Card className="anim-fadeUp mt-4 p-4">
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-chip-amber/20 text-chip-amber">
                <Icon name="alert" size={14} />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wide text-chip-amber">Gaps &amp; attention</span>
              <span className="ml-auto text-[10px] text-faint">What the scan says is missing</span>
            </div>
            <div className="grid gap-2 sm:grid-cols-3">
              {radarGaps.map((g) => {
                const c = gapCfg[g.kind];
                return (
                  <div key={g.label} className="rounded-2xl bg-surface-2 p-3">
                    <p className={`mb-1 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${c.cls}`}>
                      <Icon name={c.icon} size={10} /> {g.label}
                    </p>
                    <p className="text-[11px] leading-snug text-muted">{g.detail}</p>
                  </div>
                );
              })}
            </div>
          </Card>
        </>
      ) : null}
    </DesktopChrome>
  );
}
