import { useState } from 'react';
import { DesktopChrome } from '../../v2/desktop/DesktopChrome';
import { Card, Chip, Avatar } from '../../../ui/primitives';
import { Icon } from '../../../ui/icons';
import {
  client,
  meeting,
  summary,
  dealStages,
  captureFlow,
  validationItems,
  decisionLog,
  type FlowStep,
} from '../scenario';
import { SectionCard } from '../../v4/desktop/SectionCard';
import { SceneTabs, CLIENT_360_TABS } from '../../v3/desktop/SceneTabs';
import { OwnerTag, AutomationTag, SourceChip } from '../shared/trust';

const flowDot: Record<FlowStep['state'], string> = {
  done: 'bg-accent text-on-accent',
  active: 'bg-accent text-on-accent ring-4 ring-accent/20',
  todo: 'bg-surface-2 text-faint',
};

/**
 * Post-meeting momentum — iteration 5 (Scene 6).
 *
 * Makes the capture flow explicit (O7), adds RM validation checkpoints with
 * confirm / edit / reject (O8), a decision log (O18), and renames "CRM updated"
 * to "Record updated" (I9), with source and automated/manual trust tags
 * (O9/O10).
 */
export function PostMeetingSummary() {
  const [confirmed, setConfirmed] = useState<Set<number>>(new Set());
  const [rejected, setRejected] = useState<Set<number>>(new Set());
  const [sent, setSent] = useState(false);
  const [discarded, setDiscarded] = useState(false);

  const confirm = (i: number) =>
    setConfirmed((p) => new Set(p).add(i));
  const reject = (i: number) =>
    setRejected((p) => new Set(p).add(i));

  return (
    <DesktopChrome
      active="summary"
      title="Capture momentum"
      subtitle={`${meeting.title} · ${meeting.date}`}
      dealStage={dealStages.capture}
    >
      <SceneTabs active="capture" tabs={CLIENT_360_TABS} />

      {/* O7 · capture flow */}
      <Card className="anim-fadeUp mb-4 p-4">
        <div className="mb-3 flex items-center gap-2">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent">
            <Icon name="sparkle" size={14} />
          </span>
          <span className="text-[11px] font-bold uppercase tracking-wide text-accent">
            From conversation to record
          </span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {captureFlow.map((f, i) => (
            <div key={i} className="flex min-w-[110px] flex-1 flex-col items-center text-center">
              <div className="mb-2 flex w-full items-center">
                <span className={`h-0.5 flex-1 ${i === 0 ? 'bg-transparent' : 'bg-line'}`} />
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${flowDot[f.state]}`}>
                  <Icon name={f.state === 'todo' ? 'clock' : 'check'} size={14} />
                </span>
                <span className={`h-0.5 flex-1 ${i === captureFlow.length - 1 ? 'bg-transparent' : 'bg-line'}`} />
              </div>
              <p className={`text-[11px] font-bold leading-tight ${f.state === 'active' ? 'text-accent' : f.state === 'done' ? 'text-text' : 'text-muted'}`}>
                {f.label}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* Record updated banner (I9) + source / automation tags */}
      <Card className="anim-fadeUp mb-4 flex flex-wrap items-center gap-3 p-4">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
          <Icon name="sparkle" size={16} />
        </span>
        <p className="min-w-0 text-xs text-muted">
          Generated from the live conversation · structured as a deal record
        </p>
        <span className="ml-auto flex flex-wrap items-center gap-2">
          <SourceChip source="meeting transcript" updated="2 min ago" confidence="High" />
          <AutomationTag kind="auto" />
          <span className="flex items-center gap-1.5 text-xs font-bold text-accent">
            <Icon name="check" size={14} /> Record updated
          </span>
        </span>
      </Card>

      {/* O8 · RM validation checkpoints */}
      <SectionCard label="Review before it enters the record" icon="shield" tone="brand" className="mb-4">
        <p className="mb-3 text-[11px] text-muted">
          REO extracted the following from the meeting. Nothing enters the record until you confirm.
        </p>
        <div className="space-y-2">
          {validationItems.map((v, i) => {
            const isConfirmed = confirmed.has(i);
            const isRejected = rejected.has(i);
            return (
              <div
                key={i}
                className={`rounded-2xl border p-3 ${
                  isRejected ? 'border-line opacity-60' : 'border-line bg-surface-2'
                }`}
              >
                <div className="mb-1.5 flex items-center gap-2">
                  <span className="min-w-0 flex-1 text-sm font-bold">{v.label}</span>
                  <AutomationTag kind={isConfirmed ? 'confirmed' : isRejected ? 'manual' : 'ai'} />
                </div>
                <p className="mb-2 text-[11px] leading-snug text-muted">{v.detail}</p>
                {isConfirmed ? (
                  <span className="flex items-center gap-1.5 text-[11px] font-bold text-accent">
                    <Icon name="check" size={12} /> Confirmed by Daisy
                  </span>
                ) : isRejected ? (
                  <span className="flex items-center gap-1.5 text-[11px] font-bold text-muted">
                    <Icon name="alert" size={12} /> Rejected — will not be saved
                  </span>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => confirm(i)}
                      className="flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-[11px] font-bold text-on-accent transition active:scale-[0.98]"
                    >
                      <Icon name="check" size={11} /> Confirm
                    </button>
                    <button className="rounded-full border border-line px-3 py-1 text-[11px] font-bold text-muted transition hover:text-text">
                      Edit
                    </button>
                    <button
                      onClick={() => reject(i)}
                      className="rounded-full border border-line px-3 py-1 text-[11px] font-bold text-muted transition hover:text-risk"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </SectionCard>

      <div className="mb-4 grid grid-cols-2 items-start gap-4">
        {/* key moments */}
        <SectionCard label="Key moments" icon="check" tone="brand">
          <ul className="space-y-2.5">
            {summary.keyMoments.map((m, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <Icon name="check" size={13} />
                </span>
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </SectionCard>

        {/* actions with owner tags */}
        <SectionCard label="Actions to progress the deal" icon="zap" tone="brand">
          <div className="space-y-2">
            {summary.actions.map((a, i) => (
              <div key={i} className="flex items-center gap-2 rounded-2xl bg-surface-2 px-3 py-2.5">
                <span className="min-w-0 flex-1 text-sm">{a.label}</span>
                <OwnerTag owner={a.owner === 'Agent' ? 'agent' : 'rm'} />
                <span className="flex shrink-0 items-center gap-1 text-[11px] text-muted">
                  <Icon name="clock" size={11} /> {a.due}
                </span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* O18 · decision log */}
      <SectionCard label="Decision log" icon="doc" tone="brand" className="mb-4">
        <p className="mb-3 text-[11px] text-muted">
          Key decisions captured for traceability and clean handovers.
        </p>
        <div className="space-y-2">
          {decisionLog.map((d, i) => (
            <div key={i} className="rounded-2xl bg-surface-2 p-3">
              <div className="mb-1 flex items-center gap-2">
                <span className="min-w-0 flex-1 text-sm font-bold leading-snug">{d.decision}</span>
                <OwnerTag owner={d.owner} />
                <span className="shrink-0 text-[11px] text-faint">{d.date}</span>
              </div>
              <p className="text-[11px] text-muted">
                <span className="font-semibold text-text">Why:</span> {d.rationale}
              </p>
              <p className="mt-0.5 flex items-center gap-1 text-[11px] text-muted">
                <Icon name="arrowRight" size={11} className="shrink-0 text-brand" />
                <span>{d.impact}</span>
              </p>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* comms draft — accept / edit / discard */}
      <SectionCard label="Drafted follow-up" icon="mail" tone="brand" right={<Chip tone="opportunity">Daisy&apos;s tone</Chip>}>
        <div className="mb-3 space-y-2 border-b border-line pb-3 text-xs">
          <div className="flex gap-2">
            <span className="w-12 shrink-0 text-faint">To</span>
            <span className="flex min-w-0 items-center gap-1.5 font-semibold">
              <Avatar initials="SW" size={18} tone="muted" />
              <span className="truncate">{summary.email.to}</span>
            </span>
          </div>
          <div className="flex gap-2">
            <span className="w-12 shrink-0 text-faint">Subject</span>
            <span className="font-semibold">{summary.email.subject}</span>
          </div>
        </div>
        {discarded ? (
          <p className="rounded-2xl bg-surface-2 px-4 py-6 text-center text-xs font-semibold text-muted">
            Draft discarded — nothing was sent.
          </p>
        ) : (
          <p className="whitespace-pre-line text-xs leading-relaxed text-muted">{summary.email.body}</p>
        )}
        <div className="mt-4 flex gap-2">
          {sent ? (
            <span className="flex w-full items-center justify-center gap-2 rounded-full bg-accent/15 py-2.5 text-sm font-bold text-accent">
              <Icon name="check" size={15} /> Sent to {client.contact.split(' ')[0]}
            </span>
          ) : discarded ? (
            <button
              onClick={() => setDiscarded(false)}
              className="flex w-full items-center justify-center gap-1.5 rounded-full border border-line py-2.5 text-sm font-bold text-muted transition hover:text-text"
            >
              Restore draft
            </button>
          ) : (
            <>
              <button
                onClick={() => setSent(true)}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-accent py-2.5 text-sm font-bold text-on-accent transition active:scale-[0.98]"
              >
                <Icon name="check" size={15} /> Accept &amp; send
              </button>
              <button className="rounded-full border border-line px-4 py-2.5 text-sm font-bold text-muted transition hover:text-text">
                Edit
              </button>
              <button
                onClick={() => setDiscarded(true)}
                className="rounded-full border border-line px-4 py-2.5 text-sm font-bold text-muted transition hover:text-risk"
              >
                Discard
              </button>
            </>
          )}
        </div>
      </SectionCard>
    </DesktopChrome>
  );
}
