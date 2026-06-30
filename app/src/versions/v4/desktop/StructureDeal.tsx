import { useState } from 'react';
import { DesktopChrome } from '../../v2/desktop/DesktopChrome';
import { Chip } from '../../../ui/primitives';
import { Icon } from '../../../ui/icons';
import {
  structureOptions,
  dealStructure,
  dealStages,
  structureEligibility,
  productSpecialist,
  creditEscalation,
} from '../../v3/scenario';
import { SectionCard } from './SectionCard';
import { SceneTabs, DEAL_DESK_TABS } from '../../v3/desktop/SceneTabs';

const componentCount: Record<string, number> = {
  lean: 1,
  recommended: 2,
  stretch: 3,
};

const tagTone: Record<string, 'opportunity' | 'risk' | 'context'> = {
  Core: 'opportunity',
  Risk: 'risk',
  Upsell: 'context',
  Cash: 'context',
};

const eligibilityCfg: Record<string, { chip: string; icon: 'check' | 'alert' }> = {
  approvable: { chip: 'bg-accent/15 text-accent', icon: 'check' },
  review: { chip: 'bg-info/15 text-info', icon: 'check' },
  escalation: { chip: 'bg-risk/15 text-risk', icon: 'alert' },
};

/**
 * Structure the deal — iteration 4 (Option A: one concept = one card).
 *
 * The v3 sticky right panel crammed economics, the "why this structure"
 * rationale, the product-specialist hand-off and the confirm action into a
 * single box. This version splits each into its own labelled card so the
 * economics, the reasoning, the hand-off and the decision read separately.
 */
export function StructureDeal() {
  const recommended = structureOptions.find((o) => o.recommended) ?? structureOptions[0];
  const [selectedId, setSelectedId] = useState(recommended.id);
  const [confirmed, setConfirmed] = useState(false);
  const [mode, setMode] = useState<'exploring' | 'committed'>('exploring');
  const [specialistLooped, setSpecialistLooped] = useState(false);

  const selected = structureOptions.find((o) => o.id === selectedId) ?? recommended;
  const components = dealStructure.components.slice(0, componentCount[selected.id] ?? 2);
  const elig = structureEligibility[selected.id];
  const exploring = mode === 'exploring';

  return (
    <DesktopChrome
      active="bench"
      title="Structure the deal"
      subtitle="Shape the right facility before it goes to credit"
      dealStage={dealStages.structure}
    >
      <SceneTabs active="structure" tabs={DEAL_DESK_TABS} />

      <div className="anim-fadeUp mb-4 flex flex-col gap-4 lg:flex-row lg:items-stretch">
        {/* draft-mode toolbar */}
        <div className="flex flex-1 flex-wrap items-center gap-3 rounded-2xl border border-line bg-surface-2 px-4 py-2.5">
        <div className="flex items-center gap-1 rounded-full bg-surface p-1">
          {(['exploring', 'committed'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`rounded-full px-4 py-1.5 text-sm font-bold capitalize transition ${
                mode === m ? 'bg-accent text-on-accent' : 'text-muted'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
        {exploring && (
          <p className="flex items-center gap-1.5 text-[11px] font-semibold text-muted">
            <Icon name="target" size={13} className="text-muted" />
            Exploring — CRM is not updated. Compare options freely.
          </p>
        )}
        <div className="ml-auto flex items-center gap-2.5">
          {confirmed ? (
            <span className="flex items-center gap-1.5 rounded-full bg-accent/15 px-5 py-2 text-sm font-bold text-accent">
              <Icon name="check" size={16} /> Structure &amp; price locked — sent to credit, no re-keying
            </span>
          ) : exploring ? (
            <button
              onClick={() => setMode('committed')}
              className="flex items-center gap-1.5 rounded-full bg-surface px-5 py-2 text-sm font-bold text-muted transition active:scale-[0.98]"
            >
              <Icon name="target" size={16} /> Switch to Committed to confirm
            </button>
          ) : (
            <button
              onClick={() => setConfirmed(true)}
              className="flex items-center gap-1.5 rounded-full bg-accent px-5 py-2 text-sm font-bold text-on-accent transition active:scale-[0.98]"
            >
              <Icon name="check" size={16} /> Confirm structure
            </button>
          )}
        </div>
      </div>

        {/* product specialist — sits with the exploring/committing controls */}
        <SectionCard
          label="Product specialist"
          icon="users"
          tone="brand"
          helpId="structure.specialist"
          className="lg:w-[360px] lg:shrink-0"
        >
        {specialistLooped ? (
          <div className="anim-fadeUp rounded-2xl border border-brand/30 bg-brand/5 p-3.5">
            <div className="mb-1 flex items-center gap-2">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand">
                <Icon name="users" size={15} />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-extrabold leading-tight">{productSpecialist.name}</p>
                <p className="text-[10px] text-muted">{productSpecialist.role}</p>
              </div>
              <span className="ml-auto flex items-center gap-1 rounded-full bg-brand/15 px-2 py-0.5 text-[10px] font-bold text-brand">
                <Icon name="check" size={10} /> Looped in
              </span>
            </div>
            <p className="text-[11px] leading-relaxed text-muted">{productSpecialist.note}</p>
          </div>
        ) : (
          <button
            onClick={() => setSpecialistLooped(true)}
            className="flex w-full items-center justify-center gap-1.5 rounded-full border border-brand/40 py-2.5 text-sm font-bold text-brand transition active:scale-[0.98]"
          >
            <Icon name="users" size={15} /> Loop in product specialist
          </button>
        )}
      </SectionCard>
      </div>

      {/* structure options */}
      <SectionCard
        label="Structure options"
        icon="target"
        tone="brand"
        helpId="structure.options"
        className="mb-4"
      >
        <div className="grid grid-cols-3 gap-3">
          {structureOptions.map((o) => {
            const active = o.id === selectedId;
            const oe = structureEligibility[o.id];
            const ec = eligibilityCfg[oe.status];
            return (
              <button
                key={o.id}
                onClick={() => setSelectedId(o.id)}
                className={`flex flex-col rounded-2xl border p-4 text-left transition ${
                  active ? 'border-accent bg-accent/10' : 'border-line bg-surface-2 hover:border-accent/40'
                }`}
              >
                <div className="mb-1 flex items-center justify-between gap-2">
                  <span className="text-sm font-extrabold">{o.name}</span>
                  {o.recommended && (
                    <span className="flex items-center gap-1 rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-bold text-accent">
                      <Icon name="sparkle" size={10} /> Agent pick
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-muted">{o.subtitle}</p>
                <p className="mt-2 text-lg font-extrabold text-accent">{o.value}</p>
                <p className="mt-0.5 text-[11px] font-semibold text-muted">{o.fit}</p>
                <span
                  className={`mt-2 inline-flex w-fit items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${ec.chip}`}
                >
                  <Icon name={ec.icon} size={10} /> {oe.label} · {oe.detail}
                </span>
                <p className="mt-2.5 border-t border-line/60 pt-2.5 text-[11px] leading-relaxed text-muted">{o.note}</p>
                {o.id === 'stretch' && (
                  <div className="mt-2.5 space-y-1.5 border-t border-line/60 pt-2.5">
                    <div className="flex items-start gap-1.5">
                      <Icon name="sparkle" size={11} className="mt-0.5 shrink-0 text-accent" />
                      <span className="text-[10px] leading-snug text-muted">
                        <span className="font-bold text-accent">Shaping track — active.</span> Keep shaping with the client; no waiting on credit.
                      </span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <Icon name="alert" size={11} className="mt-0.5 shrink-0 text-risk" />
                      <span className="text-[10px] leading-snug text-muted">
                        <span className="font-bold text-risk">{creditEscalation.title}.</span> {creditEscalation.detail}
                      </span>
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </SectionCard>

      <div className="grid grid-cols-2 items-start gap-4">
        {/* facility build */}
          <SectionCard
            label="Facility components"
            icon="building"
            tone="brand"
            helpId="structure.components"
            style={{ animationDelay: '80ms' }}
          >
            <div className="space-y-2.5">
              {components.map((c, i) => (
                <div key={i} className="flex items-center gap-3 rounded-2xl bg-surface-2 p-3.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
                    <Icon name="trendingUp" size={16} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold leading-snug">{c.name}</p>
                    <p className="text-[11px] text-muted">{c.detail}</p>
                  </div>
                  <span className="shrink-0 text-sm font-extrabold">{c.value}</span>
                  <Chip tone={tagTone[c.tag] ?? 'context'}>{c.tag}</Chip>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Card · Indicative economics & terms */}
          <SectionCard
            label="Indicative economics"
            icon="trendingUp"
            tone="brand"
            helpId="structure.economics"
            raised
            style={{ animationDelay: '140ms' }}
            right={
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${eligibilityCfg[elig.status].chip}`}
              >
                <Icon name={eligibilityCfg[elig.status].icon} size={10} /> {elig.detail}
              </span>
            }
          >
            <div className="mb-2.5 flex items-center gap-1.5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-accent/15 text-accent">
                <Icon name="zap" size={11} />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wide text-accent">Priced live · ePricer / EPC engine</span>
            </div>
            <div key={selected.id} className="anim-fadeUp space-y-2.5">
              <Metric label="Deal value" value={selected.value} />
              <Metric label="Revenue (Y1)" value={selected.revenue} accent />
              <Metric label="RoRWA" value={selected.rorwa} />
              <Metric label="Client fit" value={selected.fit} />
            </div>

            <div className="mt-4 border-t border-line pt-4">
              <div className="mb-2.5 flex items-center gap-2">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand/15 text-brand">
                  <Icon name="calendar" size={14} />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wide text-brand">Indicative terms</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {dealStructure.terms.map((t, i) => (
                  <div key={i} className="rounded-2xl bg-surface-2 p-3.5">
                    <p className="text-[11px] uppercase tracking-wide text-faint">{t.label}</p>
                    <p className="mt-0.5 text-sm font-extrabold">{t.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </SectionCard>
      </div>
    </DesktopChrome>
  );
}

function Metric({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between border-b border-line pb-2.5 last:border-0 last:pb-0">
      <span className="text-xs text-muted">{label}</span>
      <span className={`text-sm font-extrabold ${accent ? 'text-accent' : ''}`}>{value}</span>
    </div>
  );
}
