import { useState } from 'react';
import { DesktopChrome } from '../../v2/desktop/DesktopChrome';
import { Card, StatusPill } from '../../../ui/primitives';
import { Icon, type IconName } from '../../../ui/icons';
import { HelpSpot } from '../help/Help';
import { SceneTabs, DEAL_DESK_TABS } from './SceneTabs';
import {
  agentBench,
  creditProgress,
  dealStages,
  productWorkstream,
  crossCoverageApproval,
  teamAssembled,
} from '../scenario';

const toneCls: Record<'accent' | 'brand' | 'info', string> = {
  accent: 'bg-accent/15 text-accent',
  brand: 'bg-brand/15 text-brand',
  info: 'bg-info/15 text-info',
};

/**
 * Orchestrate the deal — iteration 3 override.
 *
 * Keeps the v2 three-tier bench intact and adds two cross-team additions:
 * an autonomous product-specialist workstream running in parallel, and a
 * cross-coverage human-in-the-loop approval (Marcus Reed) with Accept / Discuss
 * — making cross-team coordination visible.
 */
export function AgentBench() {
  const [approved, setApproved] = useState<Set<number>>(new Set());
  const [overridden, setOverridden] = useState<Set<number>>(new Set());
  const [crossSettled, setCrossSettled] = useState(false);
  const pending =
    agentBench.humanInLoop.length - approved.size - overridden.size + (crossSettled ? 0 : 1);

  const approve = (i: number) => setApproved((prev) => new Set(prev).add(i));
  const override = (i: number) => setOverridden((prev) => new Set(prev).add(i));

  return (
    <DesktopChrome
      active="bench"
      title="Orchestrate the deal"
      subtitle="You orchestrate — agents progress the deal"
      dealStage={dealStages.orchestrate}
    >
      <SceneTabs active="orchestrate" tabs={DEAL_DESK_TABS} />

      {/* credit progression strip */}
      <Card className="anim-fadeUp mb-4 flex flex-wrap items-center gap-x-6 gap-y-3 p-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-info/15 text-info">
            <Icon name="shield" size={18} />
          </span>
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-muted">Credit progression</p>
            <p className="text-sm font-extrabold">{creditProgress.stage}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-full bg-accent/10 px-2.5 py-1 text-[11px] font-bold text-accent">
            <Icon name="check" size={12} /> Narrative {creditProgress.narrative.toLowerCase()}
          </span>
          <span className="rounded-full bg-surface-2 px-2.5 py-1 text-[11px] font-bold text-muted">
            Approvals {creditProgress.approvals.done}/{creditProgress.approvals.total}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-bold text-chip-amber">Missing:</span>
          {creditProgress.missing.map((m) => (
            <span key={m} className="rounded-full bg-chip-amber/15 px-2.5 py-1 text-[11px] font-semibold text-chip-amber">
              {m}
            </span>
          ))}
        </div>
      </Card>

      {/* business-development agent — team assembled for the opportunity */}
      <Card className="anim-fadeUp mb-4 p-4">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand/15 text-brand">
            <Icon name="users" size={14} />
          </span>
          <span className="text-[11px] font-bold uppercase tracking-wide text-brand">
            {teamAssembled.agent} — team assembled
          </span>
          <span className="ml-auto flex items-center gap-1.5 rounded-full bg-brand/10 px-2.5 py-1 text-[10px] font-bold text-brand">
            <Icon name="bot" size={11} /> REO · pulled in for this deal
          </span>
        </div>
        <p className="mb-3 text-xs leading-relaxed text-muted">{teamAssembled.rationale}</p>
        <div className="grid grid-cols-4 gap-3">
          {teamAssembled.members.map((m) => (
            <div key={m.name} className="rounded-2xl bg-surface-2 p-3.5">
              <div className="mb-1.5 flex items-center gap-2">
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${toneCls[m.tone]}`}>
                  <Icon name={m.icon} size={15} />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-extrabold leading-tight">{m.name}</p>
                  <p className="truncate text-[10px] font-semibold text-muted">{m.role}</p>
                </div>
              </div>
              <p className="flex items-start gap-1 text-[11px] leading-snug text-faint">
                <Icon name="check" size={11} className="mt-0.5 shrink-0 text-accent" /> {m.reason}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* column headers + counts */}
      <div className="anim-fadeUp mb-4 grid grid-cols-3 gap-4">
        <ColHeader
          icon="bot"
          tone="info"
          value={agentBench.autonomous.length + 1}
          title="Running in parallel"
          note="Agents & colleagues"
          helpId="orchestrate.parallel"
        />
        <ColHeader
          icon="bell"
          tone="amber"
          value={pending}
          title="Human in the loop"
          note="Awaiting your approval"
          helpId="orchestrate.humanloop"
        />
        <ColHeader
          icon="heart"
          tone="accent"
          value={agentBench.rmOnly.length}
          title="Only you"
          note="Human judgement"
          helpId="orchestrate.rmonly"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* tier 1 — running in parallel (agents + product colleague) */}
        <Column delay={60}>
          {/* product-specialist parallel workstream */}
          <div className="rounded-2xl border border-brand/30 bg-brand/5 p-3.5">
            <div className="mb-1 flex items-center justify-between gap-2">
              <span className="flex items-center gap-1.5 text-sm font-bold">
                <Icon name="users" size={13} className="text-brand" /> {productWorkstream.name}
              </span>
              <StatusPill status="running" />
            </div>
            <p className="text-xs text-muted">{productWorkstream.desc}</p>
            <p className="mt-1.5 text-[11px] text-faint">{productWorkstream.meta}</p>
          </div>

          {agentBench.autonomous.map((a, i) => (
            <div key={i} className="rounded-2xl bg-surface-2 p-3.5">
              <div className="mb-1 flex items-center justify-between gap-2">
                <span className="text-sm font-bold">{a.name}</span>
                <StatusPill status={a.status} />
              </div>
              <p className="text-xs text-muted">{a.desc}</p>
              <p className="mt-1.5 text-[11px] text-faint">{a.meta}</p>
            </div>
          ))}
        </Column>

        {/* tier 2 — human in the loop */}
        <Column delay={120}>
          {/* cross-coverage approval */}
          <div
            className={`rounded-2xl border p-3.5 transition ${
              crossSettled ? 'border-accent/30 bg-accent/5' : 'border-brand/30 bg-brand/5'
            }`}
          >
            <div className="mb-1 flex items-center justify-between gap-2">
              <span className="flex items-center gap-1.5 text-sm font-bold">
                <Icon name="users" size={13} className="text-brand" /> {crossCoverageApproval.name}
              </span>
              <StatusPill status={crossSettled ? 'done' : 'waiting'} />
            </div>
            <p className="mb-2 text-xs text-muted">{crossCoverageApproval.desc}</p>
            <p className="mb-3 flex items-center gap-1 text-[11px] font-semibold text-brand">
              <Icon name="bell" size={11} /> {crossCoverageApproval.who}
            </p>
            {crossSettled ? (
              <span className="flex items-center gap-1.5 text-xs font-bold text-accent">
                <Icon name="check" size={14} /> Consolidation approved
              </span>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => setCrossSettled(true)}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-accent py-2 text-xs font-bold text-on-accent transition active:scale-[0.98]"
                >
                  <Icon name="check" size={13} /> Accept
                </button>
                <button className="rounded-full border border-line px-3 py-2 text-xs font-bold text-muted transition hover:text-text">
                  Discuss
                </button>
              </div>
            )}
          </div>

          {agentBench.humanInLoop.map((a, i) => {
            const isApproved = approved.has(i);
            const isOverridden = overridden.has(i);
            const settled = isApproved || isOverridden;
            return (
              <div
                key={i}
                className={`rounded-2xl border p-3.5 transition ${
                  settled ? 'border-accent/30 bg-accent/5' : 'border-chip-amber/30 bg-chip-amber/5'
                }`}
              >
                <div className="mb-1 flex items-center justify-between gap-2">
                  <span className="text-sm font-bold">{a.name}</span>
                  <StatusPill status={settled ? 'done' : 'waiting'} />
                </div>
                <p className="mb-3 text-xs text-muted">{a.desc}</p>

                {/* override moment — agent recommends, Daisy holds the judgement */}
                {a.override && (
                  <div className="mb-3 flex items-center gap-2 rounded-xl bg-surface-2 px-3 py-2 text-xs">
                    <span className={`font-bold ${isOverridden ? 'text-faint line-through' : 'text-muted'}`}>
                      {a.override.agentValue}
                    </span>
                    <Icon name="arrowRight" size={12} className="text-faint" />
                    <span className={`font-extrabold ${isOverridden ? 'text-accent' : 'text-text'}`}>
                      {a.override.rmValue}
                    </span>
                  </div>
                )}

                {settled ? (
                  <span className="flex items-center gap-1.5 text-xs font-bold text-accent">
                    <Icon name="check" size={14} />
                    {isOverridden ? 'Overridden by you' : 'Approved by you'}
                  </span>
                ) : a.override ? (
                  <>
                    <div className="flex gap-2">
                      <button
                        onClick={() => approve(i)}
                        className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-line py-2 text-xs font-bold text-muted transition hover:text-text"
                      >
                        Accept agent
                      </button>
                      <button
                        onClick={() => override(i)}
                        className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-accent py-2 text-xs font-bold text-on-accent transition active:scale-[0.98]"
                      >
                        <Icon name="check" size={13} /> Override
                      </button>
                    </div>
                    <p className="mt-2 text-[11px] leading-relaxed text-faint">{a.override.note}</p>
                  </>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => approve(i)}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-accent py-2 text-xs font-bold text-on-accent transition active:scale-[0.98]"
                    >
                      <Icon name="check" size={13} /> Approve
                    </button>
                    <button className="rounded-full border border-line px-3 py-2 text-xs font-bold text-muted transition hover:text-text">
                      Review
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </Column>

        {/* tier 3 — RM only */}
        <Column delay={180}>
          {agentBench.rmOnly.map((a, i) => (
            <div key={i} className="rounded-2xl bg-gradient-to-b from-accent/10 to-transparent p-3.5">
              <div className="mb-1 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <Icon name="users" size={13} />
                </span>
                <span className="text-sm font-bold">{a.name}</span>
              </div>
              <p className="text-xs text-muted">{a.desc}</p>
            </div>
          ))}
          <p className="px-1 pt-1 text-[11px] leading-relaxed text-faint">
            Agents clear the busywork so your time goes to relationships, judgement and winning the deal.
          </p>
        </Column>
      </div>
    </DesktopChrome>
  );
}

/* ---- helpers ------------------------------------------------------------- */
function ColHeader({
  icon,
  tone,
  value,
  title,
  note,
  helpId,
}: {
  icon: IconName;
  tone: 'info' | 'amber' | 'accent';
  value: number;
  title: string;
  note: string;
  helpId: string;
}) {
  const map = {
    info: 'bg-info/15 text-info',
    amber: 'bg-chip-amber/20 text-chip-amber',
    accent: 'bg-accent/15 text-accent',
  }[tone];
  return (
    <Card className="relative flex items-center gap-3 p-4 pr-9">
      <div className="absolute right-3 top-3 z-10">
        <HelpSpot id={helpId} />
      </div>
      <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${map}`}>
        <Icon name={icon} size={20} />
      </span>
      <div>
        <div className="flex items-baseline gap-2">
          <p className="text-2xl font-extrabold leading-none">{value}</p>
          <h3 className="text-sm font-extrabold leading-tight">{title}</h3>
        </div>
        <p className="mt-1 text-xs text-muted">{note}</p>
      </div>
    </Card>
  );
}

function Column({
  delay,
  children,
}: {
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <Card className="anim-fadeUp p-4" style={{ animationDelay: `${delay}ms` }}>
      <div className="space-y-2.5">{children}</div>
    </Card>
  );
}
