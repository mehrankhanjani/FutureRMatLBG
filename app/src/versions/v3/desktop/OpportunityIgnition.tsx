import { useState } from 'react';
import { DesktopChrome } from '../../v2/desktop/DesktopChrome';
import { Card, Chip } from '../../../ui/primitives';
import { Icon } from '../../../ui/icons';
import { HelpSpot } from '../help/Help';
import { client, meeting, ignition, dealStages, ignitionQualification } from '../scenario';

/**
 * Opportunity ignition — iteration 3 override.
 *
 * Extends the v2 alert into a qualification moment: a qualification chip on the
 * hero card, a data-horizon prefix on every source, a disqualifier pass row, a
 * peer/sector benchmark panel, and an ownership-confirmation line showing the
 * group is jointly covered before Daisy acts.
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
      {/* hero ignition card */}
      <Card raised className="anim-fadeUp mb-4 overflow-hidden p-0">
        <div className="flex items-start gap-4 border-b border-line bg-accent/10 p-5">
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
              <HelpSpot id="ignition.hero" />
            </h3>
            <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted">
              <Icon name="clock" size={13} /> {ignition.when}
            </p>
            {/* qualification summary chip */}
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

        {/* why now signals */}
        <div className="p-5">
          <div className="mb-3 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-accent">
            <Icon name="sparkle" size={13} className="text-accent" /> Why this, why now
            <HelpSpot id="ignition.signals" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {ignition.signals.map((s, i) => (
              <div
                key={i}
                className="anim-fadeUp rounded-2xl bg-surface-2 p-4"
                style={{ animationDelay: `${80 + i * 70}ms` }}
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
                {/* data-horizon prefix + source */}
                <p className="mt-2 flex items-center gap-1 text-[11px] text-faint">
                  <Icon name="doc" size={11} />
                  <span className="font-semibold text-muted">{q.horizons[i]}</span>
                  <span>· {s.source}</span>
                </p>
              </div>
            ))}
          </div>

          {/* disqualifier pass row */}
          <div className="mt-3 flex flex-wrap items-center gap-2 rounded-2xl bg-surface-2 px-4 py-3">
            <span className="mr-1 text-[10px] font-bold uppercase tracking-wide text-faint">
              Pre-qualification
            </span>
            <HelpSpot id="ignition.prequal" />
            {q.disqualifiers.map((d) => (
              <span
                key={d.label}
                className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-[11px] font-bold text-accent"
              >
                <Icon name="check" size={12} />
                {d.label}: <span className="font-semibold text-muted">{d.value}</span>
              </span>
            ))}
          </div>

          {/* ownership confirmation */}
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 px-1 text-[11px] text-muted">
            <span className="flex items-center gap-1.5">
              <Icon name="users" size={12} className="text-accent" />
              Coverage: <span className="font-bold text-text">{q.coverage.owner}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Icon name="bell" size={12} className="text-brand" />
              Notify: <span className="font-bold text-text">{q.coverage.notify}</span>
            </span>
          </div>
        </div>
      </Card>

      {/* peer / sector benchmark panel */}
      <Card className="anim-fadeUp mb-4 p-5" style={{ animationDelay: '360ms' }}>
        <div className="mb-3 flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand">
            <Icon name="trendingUp" size={18} />
          </span>
          <div className="min-w-0">
            <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-brand">
              Peer / sector benchmark <HelpSpot id="ignition.benchmark" />
            </p>
            <p className="mt-0.5 text-sm font-semibold leading-snug">{q.benchmark.headline}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {q.benchmark.rows.map((r) => (
            <div key={r.label} className="rounded-2xl bg-surface-2 px-4 py-3">
              <p className="text-lg font-extrabold text-brand">{r.value}</p>
              <p className="text-[11px] leading-snug text-muted">{r.label}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* why-now explainability + action */}
      <Card className="anim-fadeUp flex items-center gap-4 p-5" style={{ animationDelay: '440ms' }}>
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

      <p className="mt-4 text-center text-[11px] text-faint">
        You decide what to act on — every trigger shows its data horizon and source before you move.
      </p>
    </DesktopChrome>
  );
}
