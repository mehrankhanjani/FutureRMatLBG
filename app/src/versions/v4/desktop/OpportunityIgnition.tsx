import { useState } from 'react';
import { DesktopChrome } from '../../v2/desktop/DesktopChrome';
import { Card, Chip } from '../../../ui/primitives';
import { Icon } from '../../../ui/icons';
import { HelpSpot } from '../../v3/help/Help';
import { client, meeting, ignition, dealStages, ignitionQualification } from '../../v3/scenario';
import { SectionCard } from './SectionCard';
import { SceneTabs, PORTFOLIO_TABS } from '../../v3/desktop/SceneTabs';

/**
 * Opportunity ignition — iteration 4 (Option A: one concept = one card).
 *
 * The v3 hero card crammed five distinct ideas into a single box. This version
 * separates them into discrete, labelled cards so each idea reads on its own:
 *   1. The opportunity      — what surfaced, value, at-a-glance qualification
 *   2. Why this, why now     — the supporting signals
 *   3. Pre-qualification     — the pass/flag checks, as their own rows
 *   4. Coverage & ownership  — who owns and who is notified
 *   5. Peer / sector benchmark
 *   6. Why now + action
 */
export function OpportunityIgnition() {
  const [prepped, setPrepped] = useState(false);
  const q = ignitionQualification;

  return (
    <DesktopChrome
      active="radar"
      title="Opportunity ignition"
      subtitle="A reason to call today — surfaced and qualified before you dial"
      dealStage={dealStages.ignition}
    >
      <SceneTabs active="ignition" tabs={PORTFOLIO_TABS} />

      {/* ── Card 1 · The opportunity ──────────────────────────────────── */}
      <Card raised className="anim-fadeUp relative mb-4 overflow-hidden p-0">
        <div className="absolute right-4 top-4 z-10">
          <HelpSpot id="ignition.hero" />
        </div>
        <div className="flex items-start gap-4 bg-accent/10 p-5 pr-12">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent text-on-accent">
            <Icon name="zap" size={24} />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-xs font-bold uppercase tracking-wide text-accent">
                {ignition.headline}
              </p>
              <Chip tone="opportunity">{ignition.confidence} confidence</Chip>
            </div>
            <h3 className="mt-1 flex items-center gap-2 text-xl font-extrabold leading-tight">
              {client.name}
            </h3>
            <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted">
              <Icon name="clock" size={13} /> {ignition.when}
            </p>
            {/* qualification summary chip — at-a-glance */}
            <div className="mt-2 inline-flex flex-wrap items-center gap-1.5 rounded-full bg-surface px-3 py-1 text-[11px] font-bold">
              <Icon name="shield" size={12} className="text-accent" />
              <span className="text-accent">{q.appetite}</span>
              <span className="text-faint">·</span>
              <span className="text-muted">Confidence {q.confidence}</span>
              <span className="text-faint">·</span>
              <span className="text-muted">Suitability: {q.suitability}</span>
            </div>
          </div>
          <div className="hidden shrink-0 text-right sm:block">
            <p className="text-[10px] uppercase tracking-wide text-faint">Predicted opportunity</p>
            <p className="text-lg font-extrabold text-accent">{ignition.estValue}</p>
            <p className="text-[11px] font-semibold text-muted">{ignition.predictedNeed}</p>
          </div>
        </div>
      </Card>

      {/* ── Card 2 · Why this, why now ────────────────────────────────── */}
      <SectionCard
        label="Why this, why now"
        icon="sparkle"        tone="brand"        helpId="ignition.signals"
        className="mb-4"
        style={{ animationDelay: '80ms' }}
      >
        <div className="grid grid-cols-2 gap-3">
          {ignition.signals.map((s, i) => (
            <div
              key={i}
              className="anim-fadeUp rounded-2xl bg-surface-2 p-4"
              style={{ animationDelay: `${120 + i * 70}ms` }}
            >
              <div className="mb-1.5 flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent/15 text-accent">
                  <Icon name={s.icon} size={16} />
                </span>
                <span className="text-xs font-bold uppercase tracking-wide text-muted">
                  {s.label}
                </span>
              </div>
              <p className="text-sm font-semibold leading-snug">{s.detail}</p>
              <p className="mt-2 flex items-center gap-1 text-[11px] text-faint">
                <Icon name="doc" size={11} />
                <span className="font-semibold text-muted">{q.horizons[i]}</span>
                <span>· {s.source}</span>
              </p>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* ── Card 3 · Pre-qualification checks ─────────────────────────── */}
      <SectionCard
        label="Pre-qualification checks"
        icon="shield"        tone="brand"        helpId="ignition.prequal"
        className="mb-4"
        style={{ animationDelay: '160ms' }}
      >
        <div className="space-y-2">
          {q.disqualifiers.map((d) => {
            const pass = d.status === 'pass';
            return (
              <div
                key={d.label}
                className="flex items-center gap-3 rounded-2xl bg-surface-2 px-4 py-3"
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                    pass ? 'bg-accent/15 text-accent' : 'bg-chip-amber/20 text-chip-amber'
                  }`}
                >
                  <Icon name={pass ? 'check' : 'alert'} size={13} />
                </span>
                <span className="w-32 shrink-0 text-sm font-bold">{d.label}</span>
                <span className="text-sm text-muted">{d.value}</span>
                {d.source && <span className="text-[11px] text-faint">· {d.source}</span>}
                <span
                  className={`ml-auto rounded-full px-2.5 py-1 text-[11px] font-bold capitalize ${
                    pass ? 'bg-accent/10 text-accent' : 'bg-chip-amber/15 text-chip-amber'
                  }`}
                >
                  {d.status}
                </span>
              </div>
            );
          })}
        </div>
      </SectionCard>

      {/* ── Card 4 · Coverage & ownership ─────────────────────────────── */}
      <SectionCard
        label="Coverage & ownership"
        icon="users"
        tone="brand"
        helpId="ignition.coverage"
        className="mb-4"
        style={{ animationDelay: '200ms' }}
      >
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-3 rounded-2xl bg-surface-2 px-4 py-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
              <Icon name="users" size={15} />
            </span>
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-wide text-faint">Coverage</p>
              <p className="text-sm font-bold">{q.coverage.owner}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl bg-surface-2 px-4 py-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand">
              <Icon name="bell" size={15} />
            </span>
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-wide text-faint">Notify</p>
              <p className="text-sm font-bold">{q.coverage.notify}</p>
            </div>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-3 rounded-2xl bg-surface-2 px-4 py-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand">
            <Icon name="heart" size={15} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold uppercase tracking-wide text-faint">Private-side hook</p>
            <p className="text-sm font-bold">{q.coverage.privateSide}</p>
          </div>
          <span className="shrink-0 text-[11px] text-faint">{q.coverage.privateSideSource}</span>
        </div>
      </SectionCard>

      {/* ── Card 5 · Peer / sector benchmark ──────────────────────────── */}
      <SectionCard
        label="Peer / sector benchmark"
        icon="trendingUp"
        tone="brand"
        helpId="ignition.benchmark"
        className="mb-4"
        style={{ animationDelay: '240ms' }}
      >
        <p className="mb-3 text-sm font-semibold leading-snug">{q.benchmark.headline}</p>
        <div className="grid grid-cols-2 gap-3">
          {q.benchmark.rows.map((r) => (
            <div key={r.label} className="rounded-2xl bg-surface-2 px-4 py-3">
              <p className="text-lg font-extrabold text-brand">{r.value}</p>
              <p className="text-[11px] leading-snug text-muted">{r.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {q.benchmark.evidence.map((s, i) => (
            <div
              key={s.label}
              className="anim-fadeUp rounded-2xl bg-surface-2 p-4"
              style={{ animationDelay: `${280 + i * 70}ms` }}
            >
              <div className="mb-1.5 flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand/15 text-brand">
                  <Icon name={s.icon} size={16} />
                </span>
                <span className="text-xs font-bold uppercase tracking-wide text-muted">
                  {s.label}
                </span>
              </div>
              <p className="text-sm font-semibold leading-snug">{s.detail}</p>
              <p className="mt-2 flex items-center gap-1 text-[11px] text-faint">
                <Icon name="doc" size={11} />
                <span>{s.source}</span>
              </p>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* ── Card 6 · Why now + action ─────────────────────────────────── */}
      <Card className="anim-fadeUp flex items-center gap-4 p-5" style={{ animationDelay: '280ms' }}>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
          <Icon name="sparkle" size={18} />
        </span>
        <p className="flex-1 text-sm leading-relaxed text-muted">{ignition.whyNow}</p>
        {prepped ? (
          <span className="flex shrink-0 items-center gap-2 rounded-full bg-accent/15 px-4 py-2.5 text-sm font-bold text-accent">
            <Icon name="check" size={15} /> Briefing ready for {meeting.date.split('·')[1]?.trim()}
          </span>
        ) : (
          <button
            onClick={() => setPrepped(true)}
            className="flex shrink-0 items-center gap-1.5 rounded-full bg-accent px-4 py-2.5 text-sm font-bold text-on-accent transition active:scale-[0.98]"
          >
            Prep this meeting <Icon name="arrowRight" size={15} />
          </button>
        )}
      </Card>
    </DesktopChrome>
  );
}
