import { useState } from 'react';
import { DesktopChrome } from './DesktopChrome';
import { Card, Chip, SectionLabel, Avatar } from '../../../ui/primitives';
import { Icon } from '../../../ui/icons';
import { client, meeting, summary, dealStages, captureCapabilities } from '../scenario';

/**
 * Capture momentum — the CRM "one-view" that writes itself minutes after the
 * meeting. The conversation becomes a structured deal: key moments, deal
 * components, follow-up actions and a ready-to-send email draft.
 */
export function PostMeetingSummary() {
  const [sent, setSent] = useState(false);

  return (
    <DesktopChrome
      active="summary"
      title="Capture momentum"
      subtitle={`${meeting.title} · ${meeting.date}`}
      dealStage={dealStages.capture}
    >
      {/* auto-generated banner */}
      <div className="anim-fadeUp mb-4 flex items-center gap-3 rounded-2xl border border-accent/25 bg-accent/10 px-4 py-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-on-accent">
          <Icon name="sparkle" size={16} />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-bold text-accent">Conversation captured as a structured deal</p>
          <p className="text-xs text-muted">
            Generated from the live conversation · synced to CRM 2 minutes after the meeting
          </p>
        </div>
        <span className="ml-auto flex items-center gap-1.5 text-xs font-bold text-accent">
          <Icon name="check" size={14} /> CRM updated
        </span>
      </div>

      {/* capability tags — the architecture beneath the magic */}
      <div className="anim-fadeUp mb-4 flex flex-wrap gap-2" style={{ animationDelay: '30ms' }}>
        {captureCapabilities.map((c) => (
          <span
            key={c.label}
            className="flex items-center gap-2 rounded-full border border-line bg-surface-2 py-1.5 pl-2.5 pr-3.5 text-xs"
          >
            <Icon name={c.icon} size={13} className="text-accent" />
            <span className="font-bold">{c.label}</span>
            <span className="text-faint">·</span>
            <span className="text-muted">{c.detail}</span>
          </span>
        ))}
      </div>

      <div className="grid grid-cols-5 gap-4">
        {/* main column */}
        <div className="col-span-3 space-y-4">
          {/* key moments */}
          <Card className="anim-fadeUp p-5" style={{ animationDelay: '60ms' }}>
            <SectionLabel>Key moments</SectionLabel>
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
          </Card>

          {/* deal components */}
          <Card className="anim-fadeUp p-5" style={{ animationDelay: '120ms' }}>
            <SectionLabel>Deal components</SectionLabel>
            <div className="grid grid-cols-2 gap-3">
              {summary.opportunities.map((o, i) => (
                <div key={i} className="rounded-2xl bg-surface-2 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <Icon name="trendingUp" size={18} className="text-accent" />
                    <Chip tone={o.confidence === 'High' ? 'opportunity' : 'context'}>
                      {o.confidence} confidence
                    </Chip>
                  </div>
                  <p className="text-sm font-bold leading-snug">{o.title}</p>
                  <p className="mt-1 text-lg font-extrabold text-accent">{o.value}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* actions */}
          <Card className="anim-fadeUp p-5" style={{ animationDelay: '180ms' }}>
            <SectionLabel>Actions to progress the deal</SectionLabel>
            <div className="divide-y divide-line">
              {summary.actions.map((a, i) => (
                <div key={i} className="flex items-center gap-3 py-2.5">
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                      a.owner === 'Agent' ? 'bg-accent/15 text-accent' : 'bg-brand/20 text-brand'
                    }`}
                  >
                    <Icon name={a.owner === 'Agent' ? 'bot' : 'users'} size={13} />
                  </span>
                  <span className="flex-1 text-sm">{a.label}</span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                      a.owner === 'Agent' ? 'bg-accent/10 text-accent' : 'bg-brand/15 text-brand'
                    }`}
                  >
                    {a.owner}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted">
                    <Icon name="clock" size={12} /> {a.due}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* email draft */}
        <div className="col-span-2">
          <Card raised className="anim-fadeUp sticky top-0 p-5" style={{ animationDelay: '240ms' }}>
            <div className="mb-3 flex items-center gap-2">
              <Icon name="mail" size={16} className="text-accent" />
              <SectionLabel>Drafted follow-up</SectionLabel>
            </div>

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

            <p className="whitespace-pre-line text-xs leading-relaxed text-muted">
              {summary.email.body}
            </p>

            <div className="mt-4 flex gap-2">
              {sent ? (
                <span className="flex w-full items-center justify-center gap-2 rounded-full bg-accent/15 py-2.5 text-sm font-bold text-accent">
                  <Icon name="check" size={15} /> Sent to {client.contact.split(' ')[0]}
                </span>
              ) : (
                <>
                  <button
                    onClick={() => setSent(true)}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-accent py-2.5 text-sm font-bold text-on-accent transition active:scale-[0.98]"
                  >
                    <Icon name="check" size={15} /> Approve &amp; send
                  </button>
                  <button className="rounded-full border border-line px-4 py-2.5 text-sm font-bold text-muted transition hover:text-text">
                    Edit
                  </button>
                </>
              )}
            </div>
            <p className="mt-3 text-center text-[11px] text-faint">
              You stay in control — nothing sends without your approval
            </p>
          </Card>
        </div>
      </div>
    </DesktopChrome>
  );
}
