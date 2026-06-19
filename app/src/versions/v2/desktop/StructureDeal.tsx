import { useState } from 'react';
import { DesktopChrome } from './DesktopChrome';
import { Card, Chip, SectionLabel } from '../../../ui/primitives';
import { Icon } from '../../../ui/icons';
import { structureOptions, dealStructure, dealStages } from '../scenario';

const componentCount: Record<string, number> = {
  lean: 1,
  recommended: 2,
  stretch: 3,
};

const tagTone: Record<string, 'opportunity' | 'risk' | 'context'> = {
  Core: 'opportunity',
  Risk: 'risk',
  Upsell: 'context',
};

/**
 * Structure the deal — the shaping screen. The agent recommends a structure;
 * Daisy chooses. Each option rebuilds the facility components and economics in
 * real time, so she can shape the right deal before it goes to credit.
 */
export function StructureDeal() {
  const recommended = structureOptions.find((o) => o.recommended) ?? structureOptions[0];
  const [selectedId, setSelectedId] = useState(recommended.id);
  const [confirmed, setConfirmed] = useState(false);

  const selected = structureOptions.find((o) => o.id === selectedId) ?? recommended;
  const components = dealStructure.components.slice(0, componentCount[selected.id] ?? 2);

  return (
    <DesktopChrome
      active="bench"
      title="Structure the deal"
      subtitle="Shape the right facility before it goes to credit"
      dealStage={dealStages.structure}
    >
      {/* structure options */}
      <div className="anim-fadeUp mb-4 grid grid-cols-3 gap-3">
        {structureOptions.map((o) => {
          const active = o.id === selectedId;
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
            </button>
          );
        })}
      </div>

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
            <SectionLabel>Indicative economics</SectionLabel>
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

            <div className="mt-4">
              {confirmed ? (
                <span className="flex w-full items-center justify-center gap-2 rounded-full bg-accent/15 py-2.5 text-sm font-bold text-accent">
                  <Icon name="check" size={15} /> Structure locked — sent to credit
                </span>
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
