import { useState } from 'react';
import { DesktopChrome } from '../../v2/desktop/DesktopChrome';
import { Card, Chip, SectionLabel, Avatar } from '../../../ui/primitives';
import { Icon } from '../../../ui/icons';
import { HelpSpot } from '../help/Help';
import {
  client,
  meeting,
  summary,
  dealStages,
  crossCoverageNotice,
  teamVisibility,
  creditNarrativePreview,
} from '../scenario';

/**
 * Capture momentum — iteration 3 override.
 *
 * Extends the v2 capture screen into a full handoff moment: a cross-coverage
 * notification to the other RM, a shared activity log showing who can see the
 * record, an AI-drafted credit-narrative preview, and a comms draft in Daisy's
 * tone with Accept / Edit / Discard.
 */
export function PostMeetingSummary() {
  const [sent, setSent] = useState(false);
  const [discarded, setDiscarded] = useState(false);
  const [narrativeOpen, setNarrativeOpen] = useState(false);

  return (
    <DesktopChrome
      active="summary"
      title="Capture momentum"
      subtitle={`${meeting.title} · ${meeting.date}`}
      dealStage={dealStages.capture}
    >
      {/* auto-generated banner */}
      <div className="anim-fadeUp mb-3 flex items-center gap-3 rounded-2xl border border-accent/25 bg-accent/10 px-4 py-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-on-accent">
          <Icon name="sparkle" size={16} />
        </div>
        <div className="min-w-0">
          <p className="flex items-center gap-1.5 text-sm font-bold text-accent">Conversation captured as a structured deal <HelpSpot id="capture.banner" /></p>
          <p className="text-xs text-muted">
            Generated from the live conversation · synced to CRM 2 minutes after the meeting
          </p>
        </div>
        <span className="ml-auto flex items-center gap-1.5 text-xs font-bold text-accent">
          <Icon name="check" size={14} /> CRM updated
        </span>
      </div>

      {/* cross-coverage notification + shared activity log */}
      <div className="anim-fadeUp mb-4 flex flex-wrap items-center gap-x-5 gap-y-2 rounded-2xl border border-brand/25 bg-brand/5 px-4 py-3">
        <span className="flex items-center gap-2 text-xs font-semibold">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand">
            <Icon name="bell" size={14} />
          </span>
          <span className="font-bold text-brand">{crossCoverageNotice.who} notified</span>
          <span className="text-muted">— {crossCoverageNotice.detail}</span>
          <HelpSpot id="capture.crosscoverage" />
        </span>
        <span className="flex items-center gap-2 text-[11px] text-muted">
          <Icon name="users" size={13} className="text-muted" />
          <span className="font-bold text-text">Visible to team:</span>
          {teamVisibility.map((m) => (
            <span key={m} className="rounded-full bg-surface-2 px-2 py-0.5 font-semibold">
              {m}
            </span>
          ))}
        </span>
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

          {/* AI credit narrative preview — collapsible */}
          <Card className="anim-fadeUp p-0 overflow-hidden" style={{ animationDelay: '220ms' }}>
            <button
              onClick={() => setNarrativeOpen((o) => !o)}
              className="flex w-full items-center gap-3 p-4 text-left"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-info/15 text-info">
                <Icon name="shield" size={17} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1.5 text-sm font-extrabold leading-tight">{creditNarrativePreview.title} <HelpSpot id="capture.creditnarrative" /></p>
                <p className="text-[11px] text-muted">{creditNarrativePreview.summary}</p>
              </div>
              <Icon
                name="chevronRight"
                size={16}
                className={`shrink-0 text-muted transition-transform ${narrativeOpen ? 'rotate-90' : ''}`}
              />
            </button>
            {narrativeOpen && (
              <div className="anim-fadeUp border-t border-line bg-surface-2 px-4 py-4">
                <p className="whitespace-pre-line text-xs leading-relaxed text-muted">
                  {creditNarrativePreview.body}
                </p>
                <p className="mt-3 flex items-center gap-1.5 text-[11px] font-semibold text-info">
                  <Icon name="sparkle" size={12} /> Review before Agent Bench progresses it to credit
                </p>
              </div>
            )}
          </Card>
        </div>

        {/* comms draft */}
        <div className="col-span-2">
          <Card raised className="anim-fadeUp sticky top-0 p-5" style={{ animationDelay: '240ms' }}>
            <div className="mb-3 flex items-center gap-2">
              <Icon name="mail" size={16} className="text-accent" />
              <SectionLabel>Drafted follow-up</SectionLabel>
              <HelpSpot id="capture.comms" />
              <span className="ml-auto flex items-center gap-1 rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-bold text-accent">
                <Icon name="sparkle" size={10} /> Daisy’s tone
              </span>
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

            {discarded ? (
              <p className="rounded-2xl bg-surface-2 px-4 py-6 text-center text-xs font-semibold text-muted">
                Draft discarded — nothing was sent.
              </p>
            ) : (
              <p className="whitespace-pre-line text-xs leading-relaxed text-muted">
                {summary.email.body}
              </p>
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
            <p className="mt-3 text-center text-[11px] text-faint">
              You stay in control — nothing sends without your approval
            </p>
          </Card>
        </div>
      </div>
    </DesktopChrome>
  );
}
