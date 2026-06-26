import { DesktopChrome } from '../../v2/desktop/DesktopChrome';
import { Card, SectionLabel } from '../../../ui/primitives';
import { Icon, type IconName } from '../../../ui/icons';
import { HelpSpot } from '../help/Help';
import {
  dealStages,
  unifiedPlatform,
  group,
  interactionHistory,
  whatsNext,
} from '../scenario';

const stageStyle: Record<string, { dot: string; line: string; label: string }> = {
  done: { dot: 'bg-accent text-on-accent', line: 'bg-accent', label: 'text-text' },
  active: { dot: 'bg-accent text-on-accent ring-4 ring-accent/20', line: 'bg-line', label: 'text-accent' },
  next: { dot: 'bg-surface-2 text-faint', line: 'bg-line', label: 'text-muted' },
};

const channelIcon: Record<string, IconName> = {
  meeting: 'users',
  call: 'bell',
  email: 'mail',
  crm: 'building',
  teams: 'message',
};

/**
 * Unified platform — iteration 3 override.
 *
 * Keeps the three panes and the glass pipe, then adds a fourth panel: the full
 * interaction log across both coverage threads (#21), and replaces the static
 * close with a forward-looking "What's next" strip that points to the next
 * cycle (#3).
 */
export function UnifiedPlatform() {
  return (
    <DesktopChrome
      active="summary"
      title="Unified platform"
      subtitle="One pane of glass — across the whole group"
      dealStage={dealStages.unified}
    >
      <Card className="anim-fadeUp mb-4 flex items-start gap-3 border-l-4 border-l-accent p-4">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
          <Icon name="sparkle" size={18} />
        </span>
        <div>
          <p className="flex items-center gap-1.5 text-sm font-bold">{group.name} — one relationship <HelpSpot id="unified.panes" /></p>
          <p className="mt-0.5 text-xs leading-relaxed text-muted">{unifiedPlatform.intro}</p>
        </div>
      </Card>

      {/* three panes — client / deal / workflow */}
      <div className="grid grid-cols-3 gap-4">
        {unifiedPlatform.panes.map((p, i) => (
          <Card
            key={p.title}
            className="anim-fadeUp p-5"
            style={{ animationDelay: `${80 + i * 70}ms` }}
          >
            <div className="mb-3 flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/15 text-accent">
                <Icon name={p.icon} size={18} />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-extrabold">{p.title}</p>
                <p className="truncate text-[11px] text-muted">{p.subtitle}</p>
              </div>
            </div>
            <div className="space-y-2">
              {p.rows.map((r) => (
                <div
                  key={r.label}
                  className="flex items-center justify-between border-b border-line pb-2 text-xs last:border-0 last:pb-0"
                >
                  <span className="text-muted">{r.label}</span>
                  <span className="font-bold">{r.value}</span>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {/* glass pipe — the deal flowing end-to-end */}
      <Card className="anim-fadeUp mt-4 p-5" style={{ animationDelay: '300ms' }}>
        <div className="flex items-center gap-1.5">
          <SectionLabel>Captured once — group deal, end-to-end</SectionLabel>
          <HelpSpot id="unified.glasspipe" />
        </div>
        <div className="flex items-start justify-between">
          {unifiedPlatform.glassPipe.map((s, i) => {
            const st = stageStyle[s.status];
            const isLast = i === unifiedPlatform.glassPipe.length - 1;
            return (
              <div key={s.label} className="flex flex-1 flex-col items-center text-center">
                <div className="flex w-full items-center">
                  <span className="h-0.5 flex-1 bg-transparent" />
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${st.dot}`}
                  >
                    {s.status === 'next' ? i + 1 : <Icon name="check" size={14} />}
                  </span>
                  <span className={`h-0.5 flex-1 ${isLast ? 'bg-transparent' : st.line}`} />
                </div>
                <p className={`mt-2 text-xs font-bold ${st.label}`}>{s.label}</p>
                <p className="mt-0.5 px-1 text-[10px] leading-snug text-muted">{s.detail}</p>
              </div>
            );
          })}
        </div>
      </Card>

      {/* interaction log — full history across both coverage threads (#21) */}
      <Card className="anim-fadeUp mt-4 p-5" style={{ animationDelay: '380ms' }}>
        <div className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1">
          <SectionLabel>Interaction log — every touchpoint, both threads</SectionLabel>
          <HelpSpot id="unified.interactionlog" />
          <span className="ml-auto flex items-center gap-1.5 rounded-full bg-surface-2 px-2.5 py-1 text-[10px] font-bold text-muted">
            <Icon name="users" size={11} /> Daisy · BCB + Marcus · CIB
          </span>
        </div>
        <div className="space-y-2">
          {interactionHistory.map((e, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-xl bg-surface-2 px-3 py-2.5"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <Icon name={channelIcon[e.channel] ?? 'message'} size={15} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-text">{e.summary}</p>
                <p className="mt-0.5 text-[11px] text-faint">
                  {e.rm} · {e.entity}
                </p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1">
                <span className="text-[11px] font-bold text-muted">{e.date}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    e.shared ? 'bg-accent/10 text-accent' : 'bg-surface text-faint'
                  }`}
                >
                  {e.shared ? 'Shared' : 'Personal'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* forward-looking close — the next cycle starts here (#3) */}
      <Card className="anim-fadeUp mt-4 flex flex-wrap items-center gap-x-6 gap-y-3 border-l-4 border-l-brand p-5" style={{ animationDelay: '460ms' }}>
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand/15 text-brand">
            <Icon name="arrowRight" size={18} />
          </span>
          <div>
            <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-muted">What's next <HelpSpot id="unified.whatsnext" /></p>
            <p className="text-sm font-extrabold">This is where the next cycle starts</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Icon name="calendar" size={14} className="text-accent" />
          <span className="font-semibold text-text">{whatsNext.reviewDate}</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Icon name="target" size={14} className="text-accent" />
          <span className="font-semibold text-text">{whatsNext.nextSignal}</span>
        </div>
        <span className="ml-auto flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1.5 text-xs font-bold text-brand">
          {whatsNext.link} <Icon name="arrowRight" size={13} />
        </span>
      </Card>
    </DesktopChrome>
  );
}
