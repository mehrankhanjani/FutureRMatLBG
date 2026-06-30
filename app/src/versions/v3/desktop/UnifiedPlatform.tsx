import { DesktopChrome } from '../../v2/desktop/DesktopChrome';
import { Card } from '../../../ui/primitives';
import { Icon, type IconName } from '../../../ui/icons';
import { HelpSpot } from '../help/Help';
import { SceneTabs, CLIENT_360_TABS } from './SceneTabs';
import { useSceneNav } from '../../../sceneNavContext';
import {
  dealStages,
  unifiedPlatform,
  interactionHistory,
  whatsNext,
  groupGlassPipe,
  stageTrigger,
  workflowQueue,
} from '../scenario';

const stageStyle: Record<string, { dot: string; line: string; label: string }> = {
  done: { dot: 'bg-accent text-on-accent', line: 'bg-accent', label: 'text-text' },
  active: { dot: 'bg-accent text-on-accent ring-4 ring-accent/20', line: 'bg-line', label: 'text-accent' },
  next: { dot: 'bg-surface-2 text-faint', line: 'bg-line', label: 'text-muted' },
};

const queueStyle: Record<
  'done' | 'active' | 'waiting',
  { pill: string; label: string; icon: IconName }
> = {
  done: { pill: 'bg-accent/10 text-accent', label: 'Done', icon: 'check' },
  active: { pill: 'bg-accent text-on-accent', label: 'Live', icon: 'zap' },
  waiting: { pill: 'bg-surface-2 text-muted', label: 'Awaiting', icon: 'clock' },
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
  const nav = useSceneNav();
  return (
    <DesktopChrome
      active="summary"
      title="Unified platform"
      subtitle="One pane of glass — across the whole group"
      dealStage={dealStages.unified}
    >
      <SceneTabs active="unified" tabs={CLIENT_360_TABS} />

      {/* three panes — client / deal / workflow */}
      <div className="grid grid-cols-3 gap-4">
        {unifiedPlatform.panes.slice(0, 2).map((p, i) => (
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

        {/* workflow — live action queue, triggered by deal stage (replaces PEGA + email/Teams) */}
        <Card className="anim-fadeUp p-5" style={{ animationDelay: '220ms' }}>
          <div className="mb-3 flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand/15 text-brand">
              <Icon name="bot" size={18} />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-extrabold">Workflow — driven by REO</p>
              <p className="truncate text-[11px] text-muted">Next actions triggered by deal stage</p>
            </div>
          </div>
          <div className="space-y-2">
            {workflowQueue.map((q) => {
              const qs = queueStyle[q.state];
              return (
                <div
                  key={q.action}
                  className="flex items-center gap-2 rounded-xl bg-surface-2 px-2.5 py-2"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-bold text-text">{q.action}</p>
                    <p className="truncate text-[10px] text-faint">{q.trigger}</p>
                  </div>
                  <span
                    className={`flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${qs.pill}`}
                  >
                    <Icon name={qs.icon} size={10} /> {qs.label}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* glass pipe — the deal flowing end-to-end */}
      <Card className="anim-fadeUp relative mt-4 p-5" style={{ animationDelay: '300ms' }}>
        <div className="absolute right-3 top-3 z-10">
          <HelpSpot id="unified.glasspipe" />
        </div>
        <div className="mb-3 flex items-center gap-2 pr-7">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand/15 text-brand">
            <Icon name="doc" size={14} />
          </span>
          <span className="text-[11px] font-bold uppercase tracking-wide text-brand">Captured once — group deal, end-to-end</span>
        </div>
        <div className="flex items-start justify-between">
          {groupGlassPipe.map((s, i) => {
            const st = stageStyle[s.status];
            const isLast = i === groupGlassPipe.length - 1;
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

        {/* triggered next action — the stage change fires the workflow, not the RM */}
        <div className="mt-4 flex items-start gap-3 rounded-2xl bg-accent/10 p-3.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-accent text-on-accent">
            <Icon name="zap" size={16} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-extrabold text-text">
              <span className="text-accent">{stageTrigger.stage} reached</span> · {stageTrigger.action}
            </p>
            <p className="mt-0.5 text-[11px] text-muted">{stageTrigger.meta}</p>
          </div>
        </div>
      </Card>

      {/* interaction log — full history across both coverage threads (#21) */}
      <Card className="anim-fadeUp relative mt-4 p-5" style={{ animationDelay: '380ms' }}>
        <div className="absolute right-3 top-3 z-10">
          <HelpSpot id="unified.interactionlog" />
        </div>
        <div className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1 pr-7">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand/15 text-brand">
            <Icon name="clock" size={14} />
          </span>
          <span className="text-[11px] font-bold uppercase tracking-wide text-brand">Interaction log — every touchpoint, both threads</span>
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
      <Card className="anim-fadeUp relative mt-4 border-l-4 border-l-brand p-5" style={{ animationDelay: '460ms' }}>
        <div className="absolute right-3 top-3 z-10">
          <HelpSpot id="unified.whatsnext" />
        </div>
        <div className="mb-3 flex items-center gap-2">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand/15 text-brand">
            <Icon name="arrowRight" size={14} />
          </span>
          <span className="text-[11px] font-bold uppercase tracking-wide text-brand">What's next</span>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <div className="flex items-center gap-2 text-xs">
            <Icon name="calendar" size={14} className="text-accent" />
            <span className="font-semibold text-text">{whatsNext.reviewDate}</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Icon name="target" size={14} className="text-accent" />
            <span className="font-semibold text-text">{whatsNext.nextSignal}</span>
          </div>
          <button
            type="button"
            onClick={() => nav?.goToScene('review')}
            className="ml-auto flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1.5 text-xs font-bold text-brand transition hover:bg-brand/20"
          >
            {whatsNext.link} <Icon name="arrowRight" size={13} />
          </button>
        </div>
      </Card>
    </DesktopChrome>
  );
}
