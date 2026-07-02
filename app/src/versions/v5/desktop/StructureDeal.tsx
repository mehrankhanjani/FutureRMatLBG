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
  solutioning,
  precedentDeals,
  precedentNote,
  securitySuggestions,
  pricingByOption,
  pricingReasoning,
  pricingBasis,
  dealRules,
  dealRulesNote,
  structureReasoning,
  structureBasis,
} from '../scenario';
import { SectionCard } from '../../v4/desktop/SectionCard';
import { SceneTabs, DEAL_DESK_TABS } from '../../v3/desktop/SceneTabs';
import { WhyThis } from '../shared/WhyThis';

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

const fitCfg: Record<string, string> = {
  'Best fit': 'bg-accent/15 text-accent',
  'Partial fit': 'bg-chip-amber/20 text-chip-amber',
  'Poor fit': 'bg-surface-2 text-muted',
};

const ruleStatusCfg: Record<string, { chip: string; label: string; icon: 'check' | 'alert' }> = {
  met: { chip: 'bg-accent/15 text-accent', label: 'Met', icon: 'check' },
  applied: { chip: 'bg-info/15 text-info', label: 'Applied', icon: 'check' },
  flag: { chip: 'bg-chip-amber/20 text-chip-amber', label: 'Flag', icon: 'alert' },
};

/** S3 · human override affordance — proposes, RM can amend. */
function AmendControl({ amended, onAmend }: { amended: boolean; onAmend: () => void }) {
  if (amended) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-brand/15 px-2.5 py-0.5 text-[10px] font-bold text-brand">
        <Icon name="check" size={10} /> Amended by RM
      </span>
    );
  }
  return (
    <button
      type="button"
      onClick={onAmend}
      className="inline-flex items-center gap-1 rounded-full border border-line px-2.5 py-1 text-[10px] font-bold text-muted transition hover:border-brand/40 hover:text-text"
    >
      <Icon name="doc" size={10} /> Amend
    </button>
  );
}

/**
 * Structure the deal — iteration 5 (Shape the proposition).
 *
 * Forks the v4 "one concept = one card" layout and lands the workshop feedback:
 *   S1 deal solutioning (which product) · S2 precedent deals · S3 human override ·
 *   S4 business-rules editor · S5 likely security · S6 integrated pricing ·
 *   S7 the agent's reasoning on every enabler (the cross-cutting WhyThis).
 */
export function StructureDeal() {
  const recommended = structureOptions.find((o) => o.recommended) ?? structureOptions[0];
  const [selectedId, setSelectedId] = useState(recommended.id);
  const [confirmed, setConfirmed] = useState(false);
  const [mode, setMode] = useState<'exploring' | 'committed'>('exploring');
  const [specialistLooped, setSpecialistLooped] = useState(false);
  const [solutionAmended, setSolutionAmended] = useState(false);
  const [structureAmended, setStructureAmended] = useState(false);

  const selected = structureOptions.find((o) => o.id === selectedId) ?? recommended;
  const components = dealStructure.components.slice(0, componentCount[selected.id] ?? 2);
  const elig = structureEligibility[selected.id];
  const pricing = pricingByOption[selected.id];
  const exploring = mode === 'exploring';

  return (
    <DesktopChrome
      active="bench"
      title="Structure the deal"
      subtitle="Shape the right facility before it goes to credit"
      dealStage={dealStages.structure}
    >
      <SceneTabs active="structure" tabs={DEAL_DESK_TABS} />

      {/* draft-mode toolbar + product specialist */}
      <div className="anim-fadeUp mb-4 flex flex-col gap-4 lg:flex-row lg:items-stretch">
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

      {/* S1 · Recommended solution — which product fits the confirmed need */}
      <SectionCard
        label="Recommended solution"
        icon="sparkle"
        tone="brand"
        className="mb-4"
        right={<AmendControl amended={solutionAmended} onAmend={() => setSolutionAmended(true)} />}
      >
        <p className="mb-3 flex items-start gap-1.5 text-xs text-muted">
          <Icon name="target" size={13} className="mt-0.5 shrink-0 text-brand" />
          <span>
            <span className="font-bold text-text">Confirmed need:</span> {solutioning.need}
          </span>
        </p>
        <div className="grid grid-cols-3 gap-3">
          {solutioning.options.map((o) => (
            <div
              key={o.id}
              className={`flex flex-col rounded-2xl border p-3.5 ${
                o.recommended ? 'border-accent bg-accent/10' : 'border-line bg-surface-2'
              }`}
            >
              <div className="mb-1 flex items-center justify-between gap-2">
                <span className="text-sm font-extrabold leading-tight">{o.product}</span>
                {o.recommended && (
                  <span className="flex shrink-0 items-center gap-1 rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-bold text-accent">
                    <Icon name="sparkle" size={10} /> Pick
                  </span>
                )}
              </div>
              <span className={`mb-1.5 inline-flex w-fit rounded-full px-2 py-0.5 text-[10px] font-bold ${fitCfg[o.fit]}`}>
                {o.fit}
              </span>
              <p className="text-[11px] leading-snug text-muted">{o.why}</p>
            </div>
          ))}
        </div>
        <WhyThis className="mt-3" points={solutioning.reasoning} basis={solutioning.basis} />
      </SectionCard>

      {/* structure options */}
      <SectionCard
        label="Structure options"
        icon="target"
        tone="brand"
        helpId="structure.options"
        className="mb-4"
        right={<AmendControl amended={structureAmended} onAmend={() => setStructureAmended(true)} />}
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
        <WhyThis className="mt-3" points={structureReasoning} basis={structureBasis} />
      </SectionCard>

      <div className="mb-4 grid grid-cols-2 items-start gap-4">
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

        {/* S6 · Indicative pricing & economics — pricing integrated in-view */}
        <SectionCard
          label="Indicative pricing & economics"
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

          {/* pricing breakdown — updates with the selected structure */}
          <div key={`${selected.id}-price`} className="anim-fadeUp mb-3 grid grid-cols-3 gap-2">
            <div className="rounded-2xl bg-surface-2 p-3">
              <p className="text-[10px] uppercase tracking-wide text-faint">Margin</p>
              <p className="mt-0.5 text-sm font-extrabold text-accent">{pricing.margin}</p>
            </div>
            <div className="rounded-2xl bg-surface-2 p-3">
              <p className="text-[10px] uppercase tracking-wide text-faint">Arrangement fee</p>
              <p className="mt-0.5 text-sm font-extrabold">{pricing.arrangementFee}</p>
            </div>
            <div className="rounded-2xl bg-surface-2 p-3">
              <p className="text-[10px] uppercase tracking-wide text-faint">Priced revenue</p>
              <p className="mt-0.5 text-sm font-extrabold">{pricing.price}</p>
            </div>
          </div>

          <div key={selected.id} className="anim-fadeUp space-y-2.5">
            <Metric label="Deal value" value={selected.value} />
            <Metric label="Revenue (Y1)" value={selected.revenue} accent />
            <Metric label="RoRWA" value={selected.rorwa} />
            <Metric label="Client fit" value={selected.fit} />
          </div>

          <WhyThis className="mt-3" points={pricingReasoning} basis={pricingBasis} />
        </SectionCard>
      </div>

      <div className="mb-4 grid grid-cols-2 items-start gap-4">
        {/* S5 · Likely security / collateral */}
        <SectionCard
          label="Likely security"
          icon="shield"
          tone="brand"
          style={{ animationDelay: '80ms' }}
        >
          <div className="space-y-2">
            {securitySuggestions.items.map((s) => (
              <div key={s.label} className="flex items-start gap-3 rounded-2xl bg-surface-2 p-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand/15 text-brand">
                  <Icon name="shield" size={15} />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-bold leading-snug">{s.label}</p>
                  <p className="text-[11px] text-muted">{s.detail}</p>
                </div>
              </div>
            ))}
          </div>
          <WhyThis className="mt-3" points={securitySuggestions.reasoning} basis={securitySuggestions.basis} />
        </SectionCard>

        {/* S2 · Similar deals across the bank */}
        <SectionCard
          label="Similar deals across the bank"
          icon="users"
          tone="brand"
          style={{ animationDelay: '140ms' }}
        >
          <p className="mb-2.5 text-[11px] text-muted">{precedentNote}</p>
          <div className="space-y-2">
            {precedentDeals.map((d) => (
              <div key={d.client} className="rounded-2xl bg-surface-2 p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-bold leading-tight">{d.client}</p>
                  <span className="shrink-0 text-[10px] text-faint">{d.rm}</span>
                </div>
                <p className="text-[11px] text-muted">{d.sector}</p>
                <p className="mt-1.5 flex items-start gap-1.5 text-[11px]">
                  <Icon name="target" size={12} className="mt-0.5 shrink-0 text-brand" />
                  <span>{d.structure}</span>
                </p>
                <p className="mt-1 flex items-start gap-1.5 text-[11px] font-semibold text-accent">
                  <Icon name="check" size={12} className="mt-0.5 shrink-0" />
                  <span>{d.outcome}</span>
                </p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* S4 · Business rules / logic that shaped the outputs */}
      <SectionCard label="Rules & logic" icon="shield" tone="info">
        <p className="mb-2.5 flex items-center gap-1.5 text-[11px] text-muted">
          <Icon name="bot" size={13} className="shrink-0 text-info" />
          {dealRulesNote}
        </p>
        <div className="space-y-1.5">
          {dealRules.map((r) => {
            const c = ruleStatusCfg[r.status];
            return (
              <div key={r.rule} className="flex items-center gap-3 rounded-xl bg-surface-2 px-3 py-2">
                <span className={`flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${c.chip}`}>
                  <Icon name={c.icon} size={10} /> {c.label}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold leading-tight">{r.rule}</p>
                  <p className="text-[11px] text-muted">{r.logic}</p>
                </div>
                <span
                  title="Rules are maintained by product & credit teams — preview only in this prototype"
                  className="flex cursor-not-allowed shrink-0 items-center gap-1 rounded-full border border-line px-2.5 py-1 text-[10px] font-bold text-muted opacity-70"
                >
                  <Icon name="doc" size={10} /> Edit rule
                </span>
              </div>
            );
          })}
        </div>
      </SectionCard>
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
