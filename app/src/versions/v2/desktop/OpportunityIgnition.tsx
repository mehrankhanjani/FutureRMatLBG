import { useState } from 'react';
import { DesktopChrome } from './DesktopChrome';
import { Card, Chip } from '../../../ui/primitives';
import { Icon } from '../../../ui/icons';
import { client, meeting, ignition, dealStages } from '../scenario';

/**
 * Opportunity ignition — the proactive spark. Before Daisy even dials, the
 * system surfaces Avonmore as her highest-value call today and explains why,
 * with the triggers and their sources laid out for an instant judgement call.
 */
export function OpportunityIgnition() {
  const [prepped, setPrepped] = useState(false);

  return (
    <DesktopChrome
      active="radar"
      title="Opportunity ignition"
      subtitle="A reason to call today — surfaced before you dial"
      dealStage={dealStages.ignition}
    >
      {/* hero ignition card */}
      <Card raised className="anim-fadeUp mb-4 overflow-hidden p-0">
        <div className="flex items-start gap-4 border-b border-line bg-accent/10 p-5">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent text-on-accent">
            <Icon name="zap" size={24} />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <p className="text-xs font-bold uppercase tracking-wide text-accent">
                {ignition.headline}
              </p>
              <Chip tone="opportunity">{ignition.confidence} confidence</Chip>
            </div>
            <h3 className="mt-1 text-xl font-extrabold leading-tight">{client.name}</h3>
            <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted">
              <Icon name="clock" size={13} /> {ignition.when}
            </p>
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
                <p className="mt-2 flex items-center gap-1 text-[11px] text-faint">
                  <Icon name="doc" size={11} /> Source · {s.source}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* why-now explainability + action */}
      <Card className="anim-fadeUp flex items-center gap-4 p-5" style={{ animationDelay: '420ms' }}>
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
        You decide what to act on — every trigger shows its source before you move.
      </p>
    </DesktopChrome>
  );
}
