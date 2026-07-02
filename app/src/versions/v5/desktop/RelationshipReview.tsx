import { DesktopChrome } from '../../v2/desktop/DesktopChrome';
import { Card, Chip, SectionLabel } from '../../../ui/primitives';
import { Icon } from '../../../ui/icons';
import { HelpSpot } from '../../v3/help/Help';
import { SceneTabs, RELATIONSHIP_TABS } from '../../v3/desktop/SceneTabs';
import {
  dealStages,
  groupMandate,
  relationshipReview,
  nextSignal,
  nextBestActions,
  hiddenRisks,
  externalIntel,
} from '../scenario';
import { SectionCard } from '../../v4/desktop/SectionCard';

const GR = 38;
const CIRC = 2 * Math.PI * GR;

/**
 * RelationshipReview — iteration 5 (Deepen).
 *
 * Forks the v4 next-cycle layout and adds Deepen feedback: hidden risks &
 * opportunities incl. sentiment (D5/D1) and external market / sector / peer
 * intelligence (D9), before the next-cycle signal.
 */
export function RelationshipReview() {
  const offset = CIRC * (1 - relationshipReview.engagementScore / 100);

  return (
    <DesktopChrome
      active="graph"
      title="Relationship review & next cycle"
      subtitle="The deal is live — and the next cycle has already begun"
      dealStage={dealStages.review}
    >
      <SceneTabs active="review" tabs={RELATIONSHIP_TABS} />

      {/* ---- top row: live mandate + relationship review ------------------ */}
      <Card className="anim-fadeUp p-4">
        <div className="mb-3 flex items-center gap-2">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand/15 text-brand">
            <Icon name="shield" size={14} />
          </span>
          <span className="text-[11px] font-bold uppercase tracking-wide text-brand">Live mandate &amp; relationship review</span>
        </div>
        <div className="grid grid-cols-5 gap-4">
          {/* group mandate — live */}
          <Card className="anim-fadeUp relative col-span-3 p-4">
            <div className="absolute right-4 top-4 z-10">
              <HelpSpot id="review.mandate" />
            </div>
            <div className="mb-3 flex items-start justify-between gap-3 pr-7">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
                  <Icon name="check" size={18} />
                </span>
                <div>
                  <p className="text-sm font-extrabold leading-tight">{groupMandate.name}</p>
                  <p className="text-[11px] text-muted">{groupMandate.product}</p>
                </div>
              </div>
              <Chip tone="opportunity">{groupMandate.status}</Chip>
            </div>

            <div className="mb-3 grid grid-cols-3 gap-2">
              <div className="rounded-2xl bg-surface-2 px-3 py-2.5">
                <p className="text-[10px] font-bold uppercase tracking-wide text-faint">Facility</p>
                <p className="text-lg font-extrabold text-accent">{groupMandate.facility}</p>
              </div>
              <div className="rounded-2xl bg-surface-2 px-3 py-2.5">
                <p className="text-[10px] font-bold uppercase tracking-wide text-faint">Status</p>
                <p className="mt-0.5 text-xs font-bold leading-tight">{groupMandate.closed}</p>
              </div>
              <div className="rounded-2xl bg-surface-2 px-3 py-2.5">
                <p className="text-[10px] font-bold uppercase tracking-wide text-faint">Next review</p>
                <p className="mt-0.5 flex items-center gap-1 text-xs font-bold leading-tight">
                  <Icon name="calendar" size={12} className="text-muted" /> {groupMandate.nextReview}
                </p>
              </div>
            </div>

            <SectionLabel>Covenants — tracking</SectionLabel>
            <div className="mt-2 space-y-1.5">
              {groupMandate.covenants.map((c) => (
                <div key={c.label} className="flex items-center gap-3 rounded-xl bg-surface-2 px-3 py-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                    <Icon name="check" size={12} />
                  </span>
                  <span className="w-28 text-xs font-bold">{c.label}</span>
                  <span className="text-sm font-extrabold text-accent">{c.value}</span>
                  <span className="ml-auto text-[11px] font-semibold text-muted">limit {c.limit}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* relationship review card */}
          <Card raised className="anim-fadeUp relative col-span-2 p-4" style={{ animationDelay: '80ms' }}>
            <div className="absolute right-4 top-4 z-10">
              <HelpSpot id="review.relreview" />
            </div>
            <div className="flex items-center gap-4">
              <div className="relative shrink-0">
                <svg width="90" height="90" className="-rotate-90">
                  <circle cx="45" cy="45" r={GR} fill="none" stroke="var(--color-surface)" strokeWidth="8" />
                  <circle cx="45" cy="45" r={GR} fill="none" stroke="var(--color-accent)" strokeWidth="8" strokeLinecap="round" strokeDasharray={CIRC} strokeDashoffset={offset} />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-extrabold leading-none">{relationshipReview.engagementScore}</span>
                  <span className="text-[9px] text-muted">/ 100</span>
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-muted">Relationship review</p>
                <p className="flex items-center gap-1 text-sm font-extrabold text-accent">
                  <Icon name="trendingUp" size={13} /> {relationshipReview.engagementTrend}
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-muted">{relationshipReview.period}</p>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              {relationshipReview.stats.map((s) => (
                <div key={s.label} className="flex items-center gap-2 rounded-xl bg-surface-2 px-3 py-2">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <Icon name={s.icon} size={13} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-extrabold leading-none">{s.value}</p>
                    <p className="text-[10px] text-muted">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 space-y-1.5 border-t border-line pt-3">
              {relationshipReview.highlights.map((h, i) => (
                <p key={i} className="flex items-start gap-1.5 text-[11px] leading-relaxed text-muted">
                  <Icon name="check" size={12} className="mt-0.5 shrink-0 text-accent" /> {h}
                </p>
              ))}
            </div>
          </Card>
        </div>
      </Card>

      {/* D5/D1 · hidden risks & opportunities + D9 · external intelligence */}
      <div className="anim-fadeUp mt-4 grid gap-4 md:grid-cols-2" style={{ animationDelay: '120ms' }}>
        <SectionCard label="Hidden risks & opportunities" icon="alert" tone="brand">
          <div className="space-y-2">
            {hiddenRisks.map((h) => (
              <div key={h.label} className="flex items-start gap-3 rounded-2xl bg-surface-2 p-3">
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${
                    h.kind === 'risk' ? 'bg-chip-amber/20 text-chip-amber' : 'bg-accent/15 text-accent'
                  }`}
                >
                  <Icon name={h.kind === 'risk' ? 'alert' : 'target'} size={15} />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-bold leading-snug">{h.label}</p>
                  <p className="text-[11px] text-muted">{h.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard label="External market intelligence" icon="globe" tone="brand">
          <div className="space-y-2">
            {externalIntel.map((x) => (
              <div key={x.label} className="rounded-2xl bg-surface-2 p-3">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-brand/15 px-2 py-0.5 text-[10px] font-bold text-brand">{x.label}</span>
                  <span className="ml-auto flex items-center gap-1 text-[10px] text-faint">
                    <Icon name="doc" size={10} /> {x.source}
                  </span>
                </div>
                <p className="mt-1 text-[11px] leading-snug text-muted">{x.detail}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* ---- the next cycle — grouped forward-look box --------------------- */}
      <Card className="anim-fadeUp mt-4 p-4" style={{ animationDelay: '160ms' }}>
        <div className="mb-3 flex items-center gap-2">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand/15 text-brand">
            <Icon name="trendingUp" size={14} />
          </span>
          <span className="text-[11px] font-bold uppercase tracking-wide text-brand">The next cycle — proactive opportunity</span>
        </div>
        <div className="space-y-4">
          {/* Card · The next signal */}
          <Card raised className="anim-fadeUp relative overflow-hidden p-0" style={{ animationDelay: '200ms' }}>
            <div className="absolute right-4 top-4 z-10">
              <HelpSpot id="review.nextsignal" />
            </div>
            <div className="flex items-start gap-4 bg-accent/10 p-5 pr-12">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent text-on-accent">
                <Icon name="zap" size={24} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-xs font-bold uppercase tracking-wide text-accent">{nextSignal.headline}</p>
                  <Chip tone="opportunity">{nextSignal.confidence} confidence</Chip>
                </div>
                <h3 className="mt-1 flex items-center gap-2 text-xl font-extrabold leading-tight">Hartfield Precision — potential bolt-on</h3>
                <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted">
                  <Icon name="clock" size={13} /> {nextSignal.when}
                </p>
              </div>
              <div className="hidden shrink-0 text-right sm:block">
                <p className="text-[10px] uppercase tracking-wide text-faint">Predicted opportunity</p>
                <p className="text-lg font-extrabold text-accent">{nextSignal.estValue}</p>
                <p className="text-[11px] font-semibold text-muted">{nextSignal.predictedNeed}</p>
              </div>
            </div>
          </Card>

          {/* Card · Why this, why now — already forming */}
          <SectionCard label="Why this, why now — already forming" icon="sparkle" tone="brand" style={{ animationDelay: '240ms' }}>
            <div className="grid grid-cols-3 gap-3">
              {nextSignal.triggers.map((t, i) => (
                <div key={i} className="anim-fadeUp rounded-2xl bg-surface-2 p-4" style={{ animationDelay: `${280 + i * 70}ms` }}>
                  <div className="mb-1.5 flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent/15 text-accent">
                      <Icon name={t.icon} size={16} />
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wide text-muted">{t.label}</span>
                  </div>
                  <p className="text-sm font-semibold leading-snug">{t.detail}</p>
                  <p className="mt-2 flex items-center gap-1 text-[11px] text-faint">
                    <Icon name="doc" size={11} /> Source · {t.source}
                  </p>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* next best actions strip */}
          <SectionCard label="Next best actions · from the full relationship history" icon="target" tone="brand" helpId="review.nextactions" style={{ animationDelay: '320ms' }}>
            <div className="grid grid-cols-3 gap-3">
              {nextBestActions.map((a) => (
                <div key={a.rank} className="flex flex-col rounded-2xl bg-surface-2 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-on-accent text-xs font-extrabold">
                      {a.rank}
                    </span>
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent">
                      <Icon name={a.icon} size={14} />
                    </span>
                  </div>
                  <p className="text-sm font-extrabold leading-snug">{a.title}</p>
                  <p className="mt-1 flex-1 text-[11px] leading-relaxed text-muted">{a.rationale}</p>
                  <p className="mt-2 flex items-center gap-1 text-[10px] font-semibold text-faint">
                    <Icon name="sparkle" size={10} /> {a.basis}
                  </p>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </Card>
    </DesktopChrome>
  );
}
