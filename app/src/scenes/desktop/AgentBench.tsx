import { useState } from 'react';
import { DesktopChrome } from './DesktopChrome';
import { Card, StatusPill } from '../../ui/primitives';
import { Icon, type IconName } from '../../ui/icons';
import { agentBench } from '../../data/scenario';

/**
 * AgentBench — the "future of work" view. A bench of agents the RM oversees,
 * split into three tiers: fully autonomous, human-in-the-loop (awaiting the
 * RM's approval), and the judgement work only the RM does.
 */
export function AgentBench() {
  const [approved, setApproved] = useState<Set<number>>(new Set());
  const pending = agentBench.humanInLoop.length - approved.size;

  const approve = (i: number) =>
    setApproved((prev) => new Set(prev).add(i));

  return (
    <DesktopChrome
      active="bench"
      title="Agent bench"
      subtitle="You orchestrate — agents do the legwork"
    >
      {/* summary strip */}
      <div className="anim-fadeUp mb-4 grid grid-cols-3 gap-3">
        <Stat icon="bot" tone="info" value={agentBench.autonomous.length} label="Working autonomously" />
        <Stat icon="bell" tone="amber" value={pending} label="Awaiting your approval" />
        <Stat icon="heart" tone="accent" value={agentBench.rmOnly.length} label="Only you can do" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* tier 1 — autonomous */}
        <Column
          icon="bot"
          title="Autonomous"
          note="Runs without you"
          accent="text-info"
          delay={60}
        >
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
        <Column
          icon="bell"
          title="Human in the loop"
          note="Needs your approval"
          accent="text-chip-amber"
          delay={120}
        >
          {agentBench.humanInLoop.map((a, i) => {
            const isApproved = approved.has(i);
            return (
              <div
                key={i}
                className={`rounded-2xl border p-3.5 transition ${
                  isApproved ? 'border-accent/30 bg-accent/5' : 'border-chip-amber/30 bg-chip-amber/5'
                }`}
              >
                <div className="mb-1 flex items-center justify-between gap-2">
                  <span className="text-sm font-bold">{a.name}</span>
                  <StatusPill status={isApproved ? 'done' : 'waiting'} />
                </div>
                <p className="mb-3 text-xs text-muted">{a.desc}</p>
                {isApproved ? (
                  <span className="flex items-center gap-1.5 text-xs font-bold text-accent">
                    <Icon name="check" size={14} /> Approved by you
                  </span>
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
        <Column
          icon="heart"
          title="Only you"
          note="Human judgement"
          accent="text-accent"
          delay={180}
        >
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
            Agents clear the busywork so your time goes to relationships, judgement and the hard conversations.
          </p>
        </Column>
      </div>
    </DesktopChrome>
  );
}

/* ---- helpers ------------------------------------------------------------- */
function Stat({
  icon,
  tone,
  value,
  label,
}: {
  icon: IconName;
  tone: 'info' | 'amber' | 'accent';
  value: number;
  label: string;
}) {
  const map = {
    info: 'bg-info/15 text-info',
    amber: 'bg-chip-amber/20 text-chip-amber',
    accent: 'bg-accent/15 text-accent',
  }[tone];
  return (
    <Card className="flex items-center gap-3 p-3.5">
      <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${map}`}>
        <Icon name={icon} size={18} />
      </span>
      <div>
        <p className="text-xl font-extrabold leading-none">{value}</p>
        <p className="mt-1 text-xs text-muted">{label}</p>
      </div>
    </Card>
  );
}

function Column({
  icon,
  title,
  note,
  accent,
  delay,
  children,
}: {
  icon: IconName;
  title: string;
  note: string;
  accent: string;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <Card className="anim-fadeUp p-4" style={{ animationDelay: `${delay}ms` }}>
      <div className="mb-3 flex items-center gap-2">
        <Icon name={icon} size={16} className={accent} />
        <div>
          <h3 className="text-sm font-extrabold leading-tight">{title}</h3>
          <p className="text-[11px] text-muted">{note}</p>
        </div>
      </div>
      <div className="space-y-2.5">{children}</div>
    </Card>
  );
}
