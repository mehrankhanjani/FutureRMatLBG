import { useState } from 'react';
import { DesktopChrome } from '../../v2/desktop/DesktopChrome';
import { Card, Chip, SectionLabel } from '../../../ui/primitives';
import { Icon } from '../../../ui/icons';
import { HelpSpot } from '../help/Help';
import {
  structureOptions,
  dealStructure,
  dealStages,
  structureEligibility,
  productSpecialist,
  creditEscalation,
} from '../scenario';

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

const eligibilityCfg: Record<
  string,
  { chip: string; icon: 'check' | 'alert' }
> = {
  approvable:  { chip: 'bg-accent/15 text-accent',     icon: 'check' },
  review:      { chip: 'bg-info/15 text-info',         icon: 'check' },
  escalation:  { chip: 'bg-risk/15 text-risk',         icon: 'alert' },
};

/**
 * Structure the deal — iteration 3 override.
 *
 * Adds the shaping/qualification tooling: an Exploring/Committed draft toggle
 * (CRM untouched while exploring), indicative credit eligibility per option,
 * a product-specialist hand-off, and a parallel credit-escalation track that
 * appears when the stretch option is chosen — making the non-linear flow visible.
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
  const isStretch = selected.id === 'stretch';
  const exploring = mode === 'exploring';

  return (
    <DesktopChrome
      active="bench"
      title="Structure the deal"
      subtitle="Shape the right facility before it goes to credit"
      dealStage={dealStages.structure}
    >
      {/* draft-mode toolbar */}
      <div className="anim-fadeUp mb-4 flex flex-wrap items-center gap-3 rounded-2xl border border-line bg-surface-2 px-4 py-2.5">
        <div className="flex items-center gap-1 rounded-full bg-surface p-1">
          {(['exploring', 'committed'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`rounded-full px-3 py-1 text-xs font-bold capitalize transition ${
                mode === m ? 'bg-accent text-on-accent' : 'text-muted'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
        <p className="flex items-center gap-1.5 text-[11px] font-semibold text-muted">
          <Icon name={exploring ? 'target' : 'check'} size={13} className={exploring ? 'text-muted' : 'text-accent'} />
          {exploring
            ? 'Exploring — CRM is not updated. Compare options freely.'
            : 'Committed — selections are recorded to the deal record.'}
        </p>
        <HelpSpot id="structure.draftmode" />
      </div>

      {/* structure options */}
      <div className="anim-fadeUp mb-2 flex items-center gap-1.5">
        <span className="text-[11px] font-bold uppercase tracking-wide text-faint">Structure options</span>
        <HelpSpot id="structure.options" />
      </div>
      <div className="anim-fadeUp mb-4 grid grid-cols-3 gap-3">
        {structureOptions.map((o) => {
          const active = o.id === selectedId;
          const oe = structureEligibility[o.id];
          const ec = eligibilityCfg[oe.status];
          return (
            <button
              key={o.id}
              onClick={() => setSelectedId(o.id)}
              className={`rounded-2xl border p-4 text-left transition ${
                active
                  ? 'border-accent bg-accent/10'
                  : 'border-line bg-surface-2 hover:border-accent/40'
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
              {/* indicative credit eligibility */}
              <span
                className={`mt-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${ec.chip}`}
              >
                <Icon name={ec.icon} size={10} /> {oe.label} · {oe.detail}
              </span>
            </button>
          );
        })}
      </div>

      {/* parallel decision-fork tracks — only when stretch is selected */}
      {isStretch && (
        <div className="anim-fadeUp mb-4 grid grid-cols-2 gap-3">
          <Card className="border border-accent/30 p-4">
            <div className="mb-1 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/15 text-accent">
                <Icon name="sparkle" size={13} />
              </span>
              <span className="text-sm font-extrabold text-accent">Shaping track — active</span>
              <HelpSpot id="structure.fork" />
            </div>
            <p className="text-[11px] leading-relaxed text-muted">
              You keep shaping the structure and economics with the client. No waiting on credit.
            </p>
          </Card>
          <Card className="border border-risk/30 p-4">
            <div className="mb-1 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-risk/15 text-risk">
                <Icon name="alert" size={13} />
              </span>
              <span className="text-sm font-extrabold text-risk">{creditEscalation.title}</span>
            </div>
            <p className="text-[11px] leading-relaxed text-muted">{creditEscalation.detail}</p>
            <p className="mt-1.5 flex items-center gap-1 text-[10px] font-semibold text-faint">
              <Icon name="users" size={11} /> {creditEscalation.owner}
            </p>
          </Card>
        </div>
      )}

      <div className="grid grid-cols-5 gap-4">
        {/* facility build */}
        <div className="col-span-3 space-y-4">
          <Card className="anim-fadeUp p-5" style={{ animationDelay: '80ms' }}>
            <SectionLabel>Facility components</SectionLabel>
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
          </Card>

          <Card className="anim-fadeUp p-5" style={{ animationDelay: '140ms' }}>
            <SectionLabel>Indicative terms</SectionLabel>
            <div className="grid grid-cols-2 gap-3">
              {dealStructure.terms.map((t, i) => (
                <div key={i} className="rounded-2xl bg-surface-2 p-3.5">
                  <p className="text-[11px] uppercase tracking-wide text-faint">{t.label}</p>
                  <p className="mt-0.5 text-sm font-extrabold">{t.value}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* economics + action */}
        <div className="col-span-2">
          <Card raised className="anim-fadeUp sticky top-0 p-5" style={{ animationDelay: '200ms' }}>
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <SectionLabel>Indicative economics</SectionLabel>
                <HelpSpot id="structure.economics" />
              </div>
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${eligibilityCfg[elig.status].chip}`}
              >
                <Icon name={eligibilityCfg[elig.status].icon} size={10} /> {elig.detail}
              </span>
            </div>
            <div className="space-y-2.5">
              <Metric label="Deal value" value={selected.value} />
              <Metric label="Revenue (Y1)" value={selected.revenue} accent />
              <Metric label="RoRWA" value={selected.rorwa} />
              <Metric label="Client fit" value={selected.fit} />
            </div>

            <div className="mt-4 rounded-2xl bg-surface-2 p-3.5">
              <div className="mb-1 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-accent">
                <Icon name="sparkle" size={12} /> Why this structure
              </div>
              <p className="text-xs leading-relaxed text-muted">{selected.note}</p>
            </div>

            {/* product specialist hand-off */}
            <div className="mt-4">
              <div className="mb-1.5 flex items-center gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wide text-faint">Product specialist</span>
                <HelpSpot id="structure.specialist" />
              </div>
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
            </div>

            {/* confirm — gated on committed mode */}
            <div className="mt-3">
              {confirmed ? (
                <span className="flex w-full items-center justify-center gap-2 rounded-full bg-accent/15 py-2.5 text-sm font-bold text-accent">
                  <Icon name="check" size={15} /> Structure locked — sent to credit
                </span>
              ) : exploring ? (
                <button
                  onClick={() => setMode('committed')}
                  className="flex w-full items-center justify-center gap-1.5 rounded-full bg-surface-2 py-2.5 text-sm font-bold text-muted transition active:scale-[0.98]"
                >
                  <Icon name="target" size={15} /> Switch to Committed to confirm
                </button>
              ) : (
                <button
                  onClick={() => setConfirmed(true)}
                  className="flex w-full items-center justify-center gap-1.5 rounded-full bg-accent py-2.5 text-sm font-bold text-on-accent transition active:scale-[0.98]"
                >
                  <Icon name="check" size={15} /> Confirm structure
                </button>
              )}
            </div>
            <p className="mt-3 text-center text-[11px] text-faint">
              You shape it — the agent does the modelling
            </p>
          </Card>
        </div>
      </div>

      <p className="mt-4 text-center text-[11px] leading-relaxed text-faint">
        {dealStructure.rationale}
      </p>
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
