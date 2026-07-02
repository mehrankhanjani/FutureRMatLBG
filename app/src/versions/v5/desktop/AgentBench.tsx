import { useState } from 'react';
import { DesktopChrome } from '../../v2/desktop/DesktopChrome';
import { Card } from '../../../ui/primitives';
import { Icon, type IconName } from '../../../ui/icons';
import { SceneTabs, DEAL_DESK_TABS } from '../../v3/desktop/SceneTabs';
import {
  dealStages,
  opportunityOverview,
  controlHealth,
  controlNextActions,
  controlBlockers,
  originationJourney,
  activityFeed,
  type OppStatus,
  type JourneyStage,
} from '../scenario';
import { SectionCard } from '../../v4/desktop/SectionCard';
import { OwnerTag } from '../shared/trust';

const statusCfg: Record<OppStatus, { cls: string; label: string; icon: IconName }> = {
  'on-track': { cls: 'bg-accent/15 text-accent', label: 'On track', icon: 'check' },
  'at-risk': { cls: 'bg-chip-amber/20 text-chip-amber', label: 'At risk', icon: 'alert' },
  blocked: { cls: 'bg-risk/15 text-risk', label: 'Blocked', icon: 'alert' },
};

const prioCfg: Record<string, string> = {
  High: 'bg-risk/15 text-risk',
  Medium: 'bg-chip-amber/20 text-chip-amber',
  Low: 'bg-info/15 text-info',
};

const journeyCfg: Record<JourneyStage['status'], { dot: string; text: string; icon: IconName }> = {
  done: { dot: 'bg-accent text-on-accent', text: 'text-text', icon: 'check' },
  active: { dot: 'bg-accent text-on-accent ring-4 ring-accent/20', text: 'text-accent', icon: 'zap' },
  blocked: { dot: 'bg-risk text-white', text: 'text-risk', icon: 'alert' },
  upcoming: { dot: 'bg-surface-2 text-faint', text: 'text-muted', icon: 'clock' },
};

/**
 * Origination control centre — iteration 5 (Scene 7).
 *
 * Reframes the agent bench as a control centre per the Orchestrate feedback:
 *   O1 overview header · O13 health · O3 next best actions · O4/O6 blockers with
 *   nudge vs escalate · O2 origination journey · O14 activity feed · O5 ownership
 *   labels throughout.
 */
export function AgentBench() {
  const [nudged, setNudged] = useState<Set<number>>(new Set());
  const s = statusCfg[opportunityOverview.status];

  return (
    <DesktopChrome
      active="bench"
      title="Origination control centre"
      subtitle="Where the opportunity is, what's blocking it, and the next move"
      dealStage={dealStages.orchestrate}
    >
      <SceneTabs active="orchestrate" tabs={DEAL_DESK_TABS} />

      {/* O1 · Opportunity overview header */}
      <Card raised className="anim-fadeUp mb-4 p-5">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
            <Icon name="target" size={18} />
          </span>
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-wide text-faint">Opportunity</p>
            <p className="text-sm font-extrabold leading-tight">{opportunityOverview.deal}</p>
          </div>
          <span className={`ml-auto flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${s.cls}`}>
            <Icon name={s.icon} size={13} /> {s.label}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          <OverviewCell label="Current stage" value={opportunityOverview.stage} icon="shield" />
          <OverviewCell label="Next action" value={opportunityOverview.nextAction} icon="zap" accent />
          <div className="rounded-2xl bg-surface-2 p-3">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-wide text-faint">Current owner</p>
            <OwnerTag owner={opportunityOverview.owner} />
          </div>
          <OverviewCell label="Last interaction" value={opportunityOverview.lastInteraction} icon="clock" />
          <OverviewCell label="Main blocker" value={opportunityOverview.blocker} icon="alert" risk />
          <OverviewCell label="Next milestone" value={opportunityOverview.nextMilestone} icon="calendar" />
        </div>
        {/* O13 · health indicators */}
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {controlHealth.map((h) => (
            <div key={h.label} className="rounded-2xl border border-line p-3 text-center">
              <p className="text-lg font-extrabold leading-none">{h.value}</p>
              <p className="mt-1 text-[10px] font-semibold text-muted">{h.label}</p>
            </div>
          ))}
        </div>
      </Card>

      <div className="mb-4 grid grid-cols-2 items-start gap-4">
        {/* O3 · next best actions */}
        <SectionCard label="Next best actions" icon="zap" tone="accent">
          <div className="space-y-2">
            {controlNextActions.map((a, i) => (
              <div
                key={i}
                className={`rounded-2xl border p-3 ${a.done ? 'border-line opacity-70' : 'border-line bg-surface-2'}`}
              >
                <div className="mb-1 flex items-center gap-2">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${prioCfg[a.priority]}`}>
                    {a.priority}
                  </span>
                  <span className="min-w-0 flex-1 text-sm font-bold leading-snug">{a.action}</span>
                  {a.done && <Icon name="check" size={14} className="shrink-0 text-accent" />}
                </div>
                <p className="mb-2 flex items-center gap-1 text-[11px] text-muted">
                  <Icon name="sparkle" size={11} className="shrink-0 text-brand" /> {a.why}
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <OwnerTag owner={a.owner} />
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-faint">
                    <Icon name="clock" size={11} /> {a.due}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* O4 · blockers & dependencies with O6 nudge/escalate */}
        <SectionCard label="Blockers & dependencies" icon="alert" tone="risk">
          <div className="space-y-2">
            {controlBlockers.map((b, i) => {
              const done = nudged.has(i);
              return (
                <div key={i} className="rounded-2xl border border-line bg-surface-2 p-3">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-risk/15 text-risk">
                      <Icon name="alert" size={13} />
                    </span>
                    <span className="min-w-0 flex-1 text-sm font-bold leading-snug">{b.what}</span>
                    <span className="shrink-0 text-[11px] font-semibold text-faint">{b.age}</span>
                  </div>
                  <p className="mb-2 text-[11px] text-muted">{b.impact}</p>
                  <div className="flex flex-wrap items-center gap-2">
                    <OwnerTag owner={b.owner} />
                    {done ? (
                      <span className="flex items-center gap-1 rounded-full bg-accent/15 px-2.5 py-1 text-[11px] font-bold text-accent">
                        <Icon name="check" size={11} /> {b.escalate ? 'Escalated' : 'Nudge sent'}
                      </span>
                    ) : (
                      <button
                        onClick={() => setNudged((p) => new Set(p).add(i))}
                        className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold transition active:scale-[0.98] ${
                          b.escalate ? 'bg-risk text-white' : 'bg-accent text-on-accent'
                        }`}
                      >
                        <Icon name={b.escalate ? 'bell' : 'arrowRight'} size={11} />
                        {b.next}
                      </button>
                    )}
                    <span className="text-[10px] font-semibold text-faint">
                      {b.escalate ? 'Escalation' : 'Nudge'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </SectionCard>
      </div>

      {/* O2 · visual origination journey */}
      <SectionCard label="Origination journey" icon="target" tone="brand" className="mb-4">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {originationJourney.map((j, i) => {
            const c = journeyCfg[j.status];
            return (
              <div key={i} className="flex min-w-[120px] flex-1 flex-col items-center text-center">
                <div className="mb-2 flex w-full items-center">
                  <span className={`h-0.5 flex-1 ${i === 0 ? 'bg-transparent' : 'bg-line'}`} />
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${c.dot}`}>
                    <Icon name={c.icon} size={14} />
                  </span>
                  <span className={`h-0.5 flex-1 ${i === originationJourney.length - 1 ? 'bg-transparent' : 'bg-line'}`} />
                </div>
                <p className={`text-[11px] font-bold leading-tight ${c.text}`}>{j.stage}</p>
                <div className="mt-1.5">
                  <OwnerTag owner={j.owner} />
                </div>
                {j.dep && <p className="mt-1 text-[10px] leading-snug text-risk">{j.dep}</p>}
              </div>
            );
          })}
        </div>
        <p className="mt-3 flex items-center gap-1.5 border-t border-line pt-3 text-[11px] text-muted">
          <Icon name="chevronRight" size={12} className="text-faint" />
          Click any stage to drill into its actions, documents, decisions and evidence.
        </p>
      </SectionCard>

      {/* O14 · control-centre activity feed */}
      <SectionCard label="Recent activity" icon="clock" tone="brand">
        <div className="space-y-2.5">
          {activityFeed.map((f, i) => (
            <div key={i} className="flex items-center gap-3">
              <OwnerTag owner={f.who} />
              <span className="min-w-0 flex-1 text-sm">{f.text}</span>
              <span className="shrink-0 text-[11px] font-semibold text-faint">{f.when}</span>
            </div>
          ))}
        </div>
      </SectionCard>
    </DesktopChrome>
  );
}

function OverviewCell({
  label,
  value,
  icon,
  accent,
  risk,
}: {
  label: string;
  value: string;
  icon: IconName;
  accent?: boolean;
  risk?: boolean;
}) {
  return (
    <div className="rounded-2xl bg-surface-2 p-3">
      <p className="mb-1 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-faint">
        <Icon name={icon} size={11} /> {label}
      </p>
      <p className={`text-sm font-bold leading-snug ${accent ? 'text-accent' : risk ? 'text-risk' : ''}`}>
        {value}
      </p>
    </div>
  );
}
