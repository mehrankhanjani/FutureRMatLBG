import { useState, type ReactNode } from 'react';
import { Icon, type IconName } from '../../../ui/icons';
import { Avatar } from '../../../ui/primitives';
import { BrandMark } from '../../../components/brand/BrandMark';
import { client, deal, type DealSnapshot } from '../scenario';

type NavId = 'summary' | 'bench' | 'radar' | 'graph';

const nav: { id: NavId; label: string; icon: IconName }[] = [
  { id: 'summary', label: 'Client 360', icon: 'doc' },
  { id: 'bench', label: 'Deal desk', icon: 'bot' },
  { id: 'graph', label: 'Relationships', icon: 'heart' },
  { id: 'radar', label: 'Portfolio', icon: 'target' },
];

/**
 * DesktopChrome (v2) — shared cockpit frame with a persistent deal strip that
 * evolves scene by scene, so the same Avonmore deal is always in view as it
 * progresses from "Identified" to "Positioned to win".
 */
export function DesktopChrome({
  active,
  title,
  subtitle,
  dealStage,
  children,
}: {
  active: NavId;
  title: string;
  subtitle?: string;
  /** The deal's state on this scene — drives the deal strip. */
  dealStage?: DealSnapshot;
  children: ReactNode;
}) {
  const [dealOpen, setDealOpen] = useState(false);
  return (
    <div className="flex h-full bg-ink text-text">
      {/* left rail */}
      <aside className="flex w-16 shrink-0 flex-col items-center gap-1 border-r border-line py-4">
        <div className="mb-4">
          <BrandMark withWordmark={false} size={22} />
        </div>
        {nav.map((n) => {
          const isActive = n.id === active;
          return (
            <div
              key={n.id}
              className={`flex w-12 flex-col items-center gap-1 rounded-xl py-2 text-[9px] font-bold ${
                isActive ? 'bg-accent/15 text-accent' : 'text-muted'
              }`}
            >
              <Icon name={n.icon} size={18} />
              {n.label.split(' ')[0]}
            </div>
          );
        })}
      </aside>

      {/* main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* top bar */}
        <header className="flex items-center justify-end border-b border-line px-6 py-3">
          {/* title now lives in the presenter call-out; kept here for screen readers */}
          <h2 className="sr-only">{subtitle ? `${title} — ${subtitle}` : title}</h2>
          <div className="relative flex items-center gap-3">
            {dealStage ? (
              <button
                onClick={() => setDealOpen((o) => !o)}
                aria-expanded={dealOpen}
                className="flex items-center gap-2 rounded-full bg-surface px-3 py-1.5 transition hover:bg-surface-2"
              >
                <Avatar initials={client.initials} size={24} />
                <span className="text-xs font-bold">{client.name.split(' ')[0]} Components</span>
                <Icon
                  name="chevronRight"
                  size={13}
                  className={`text-muted transition-transform ${dealOpen ? 'rotate-90' : ''}`}
                />
              </button>
            ) : (
              <div className="flex items-center gap-2 rounded-full bg-surface px-3 py-1.5">
                <Avatar initials={client.initials} size={24} />
                <span className="text-xs font-bold">{client.name.split(' ')[0]} Components</span>
              </div>
            )}
            <div className="flex items-center gap-2 rounded-full border border-line px-3 py-1.5">
              <Avatar initials={client.rmInitials} size={24} tone="muted" />
              <span className="text-xs font-semibold text-muted">{client.rm}</span>
            </div>

            {/* deal summary dropdown — opened from the Avonmore Components chip */}
            {dealStage && dealOpen && (
              <>
                <button
                  aria-label="Close deal summary"
                  onClick={() => setDealOpen(false)}
                  className="fixed inset-0 z-10 cursor-default"
                />
                <DealDropdown stage={dealStage} />
              </>
            )}
          </div>
        </header>

        {/* scroll area */}
        <main className="no-scrollbar flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}

/* ---- deal dropdown ------------------------------------------------------- */
function DealDropdown({ stage }: { stage: DealSnapshot }) {
  return (
    <div className="anim-fadeUp absolute left-0 top-full z-20 mt-2 w-80 rounded-2xl border border-line bg-surface p-4 shadow-2xl">
      {/* deal identity */}
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent">
          <Icon name="trendingUp" size={16} />
        </span>
        <div className="min-w-0 leading-tight">
          <p className="text-sm font-extrabold">{deal.name}</p>
          <p className="text-[11px] text-muted">{deal.summary}</p>
        </div>
      </div>

      {/* pipeline progress */}
      <div className="mt-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1">
          {Array.from({ length: deal.totalStages }).map((_, i) => (
            <span
              key={i}
              className={`h-1.5 w-5 rounded-full ${i < stage.stageIndex ? 'bg-accent' : 'bg-line'}`}
            />
          ))}
        </div>
        <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-[11px] font-bold text-accent">
          {stage.stage}
        </span>
      </div>

      {/* value + win prob */}
      <div className="mt-3 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-surface-2 px-3 py-2">
          <p className="text-[10px] uppercase tracking-wide text-faint">Value</p>
          <p className="text-sm font-extrabold">{stage.value}</p>
        </div>
        <div className="rounded-xl bg-surface-2 px-3 py-2">
          <p className="text-[10px] uppercase tracking-wide text-faint">Win-probability</p>
          <p className="flex items-center gap-1 text-sm font-extrabold text-accent">
            <Icon name="trendingUp" size={13} /> {stage.winProb}%
            {stage.winProbDelta ? (
              <span className="rounded-full bg-accent/15 px-1.5 text-[10px] font-bold text-accent">
                +{stage.winProbDelta}
              </span>
            ) : null}
          </p>
        </div>
      </div>

      {/* downside callout */}
      {stage.downside && (
        <span className="mt-3 flex items-center gap-1.5 rounded-full bg-risk/10 px-3 py-1.5 text-[11px] font-bold text-risk">
          <Icon name="alert" size={12} /> {stage.downside}
        </span>
      )}
    </div>
  );
}
