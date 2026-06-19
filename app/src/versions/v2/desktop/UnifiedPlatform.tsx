import { DesktopChrome } from './DesktopChrome';
import { Card, SectionLabel } from '../../../ui/primitives';
import { Icon } from '../../../ui/icons';
import { dealStages, unifiedPlatform, group } from '../scenario';

const stageStyle: Record<string, { dot: string; line: string; label: string }> = {
  done: { dot: 'bg-accent text-on-accent', line: 'bg-accent', label: 'text-text' },
  active: { dot: 'bg-accent text-on-accent ring-4 ring-accent/20', line: 'bg-line', label: 'text-accent' },
  next: { dot: 'bg-surface-2 text-faint', line: 'bg-line', label: 'text-muted' },
};

/**
 * Unified platform — the closing beat. One single pane of glass where client,
 * deal and workflow flow end-to-end across the bank: glass-pipe visibility, a
 * headless CRM and no rekeying. The whole group mandate, visible at once.
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
          <p className="text-sm font-bold">{group.name} — one relationship</p>
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
        <SectionLabel>Glass pipe — group deal, end-to-end</SectionLabel>
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

      {/* platform principles */}
      <div className="anim-fadeUp mt-4 grid grid-cols-3 gap-4" style={{ animationDelay: '360ms' }}>
        {unifiedPlatform.principles.map((pr) => (
          <div key={pr.title} className="flex items-start gap-3 rounded-2xl bg-surface-2 p-4">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <Icon name={pr.icon} size={16} />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-bold">{pr.title}</p>
              <p className="mt-0.5 text-xs leading-snug text-muted">{pr.detail}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-4 text-center text-[11px] text-faint">
        CRM runs headless in the background — the platform writes the record, so nothing is keyed twice.
      </p>
    </DesktopChrome>
  );
}
