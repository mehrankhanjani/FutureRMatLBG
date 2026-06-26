import {
  createContext,
  useContext,
  useEffect,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { Icon } from '../../../ui/icons';
import { helpContent, type HelpEntry } from './helpContent';

/* ========================================================================
 * Context — explain mode + which help entry is open
 * ====================================================================== */

type HelpCtx = {
  explain: boolean;
  toggleExplain: () => void;
  openId: string | null;
  open: (id: string) => void;
  close: () => void;
};

const Ctx = createContext<HelpCtx | null>(null);

export function HelpProvider({ children }: { children: ReactNode }) {
  const [explain, setExplain] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <Ctx.Provider
      value={{
        explain,
        toggleExplain: () => setExplain((v) => !v),
        openId,
        open: setOpenId,
        close: () => setOpenId(null),
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useHelp(): HelpCtx {
  const c = useContext(Ctx);
  if (!c) throw new Error('useHelp must be used within HelpProvider');
  return c;
}

/* ========================================================================
 * HelpSpot — the small "?" affordance placed next to a component title.
 * Renders as a span (role=button) so it can safely nest inside a <button>.
 * Only visible when explain mode is on and content exists for the id.
 * ====================================================================== */

export function HelpSpot({ id, className = '' }: { id: string; className?: string }) {
  const { explain, open } = useHelp();
  if (!explain || !helpContent[id]) return null;

  const activate = (e: { stopPropagation: () => void; preventDefault: () => void }) => {
    e.stopPropagation();
    e.preventDefault();
    open(id);
  };

  return (
    <span
      role="button"
      tabIndex={0}
      title="Explain this"
      aria-label="Explain this component"
      onClick={activate}
      onKeyDown={(e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') activate(e);
      }}
      className={`inline-flex h-[18px] w-[18px] shrink-0 cursor-help select-none items-center justify-center rounded-full align-middle text-[11px] font-extrabold leading-none text-white ring-1 ring-accent transition hover:bg-accent/20 ${className}`}
    >
      ?
    </span>
  );
}

/* ========================================================================
 * ExplainToggle — top-bar pill to turn explain mode on/off
 * ====================================================================== */

export function ExplainToggle() {
  const { explain, toggleExplain } = useHelp();
  return (
    <button
      type="button"
      onClick={toggleExplain}
      aria-pressed={explain}
      title="Show an explanation marker on each component"
      className={
        explain
          ? 'flex items-center gap-1.5 rounded-full bg-accent/15 px-3 py-1.5 text-xs font-bold text-accent ring-1 ring-accent/30 transition'
          : 'flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-semibold text-muted transition hover:text-white'
      }
    >
      <span
        className={
          explain
            ? 'flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-extrabold text-on-accent'
            : 'flex h-4 w-4 items-center justify-center rounded-full bg-surface-2 text-[10px] font-extrabold text-muted'
        }
      >
        ?
      </span>
      Explain
    </button>
  );
}

/* ========================================================================
 * HelpDrawer — right-hand panel that slides in with the open entry
 * ====================================================================== */

const dimTone = (primary: boolean) =>
  primary
    ? 'bg-accent/15 text-accent ring-1 ring-accent/30'
    : 'bg-surface-2 text-muted ring-1 ring-line';

export function HelpDrawer() {
  const { openId, close } = useHelp();
  const entry = openId ? helpContent[openId] : null;
  const isOpen = !!entry;

  // keep last entry mounted during slide-out
  const [shown, setShown] = useState<HelpEntry | null>(null);
  useEffect(() => {
    if (entry) setShown(entry);
  }, [entry]);

  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [close]);

  return (
    <>
      {/* backdrop */}
      <div
        onClick={close}
        className={`fixed inset-0 z-[60] bg-black/50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      {/* panel */}
      <aside
        className={`fixed right-0 top-0 z-[61] flex h-full w-[400px] max-w-[92vw] flex-col border-l border-line bg-surface shadow-2xl shadow-black/60 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!isOpen}
      >
        {shown && <HelpBody entry={shown} onClose={close} />}
      </aside>
    </>
  );
}

function HelpBody({ entry, onClose }: { entry: HelpEntry; onClose: () => void }) {
  return (
    <>
      {/* header */}
      <div className="flex items-start gap-3 border-b border-line bg-ink px-5 py-4">
        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/15 text-base font-extrabold text-accent ring-1 ring-accent/30">
          ?
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-wide text-faint">Explain this</p>
          <h2 className="text-base font-extrabold leading-tight">{entry.title}</h2>
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                entry.isNew ? 'bg-accent/15 text-accent' : 'bg-surface-2 text-muted'
              }`}
            >
              {entry.isNew ? 'New this iteration' : 'Carried over'}
            </span>
            {entry.maturity && (
              <span className="rounded-full bg-brand/15 px-2 py-0.5 text-[10px] font-bold text-brand">
                {entry.maturity}
              </span>
            )}
          </div>
        </div>
        <button
          onClick={onClose}
          aria-label="Close"
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-muted transition hover:bg-surface-2 hover:text-text"
        >
          <span className="text-base leading-none">✕</span>
        </button>
      </div>

      {/* body */}
      <div className="no-scrollbar flex-1 space-y-4 overflow-y-auto px-5 py-5">
        <Section label="What it is">
          <p className="text-sm leading-relaxed text-text">{entry.whatItIs}</p>
        </Section>

        <Section label="Why it’s here">
          <p className="text-sm leading-relaxed text-muted">{entry.whyItsHere}</p>
        </Section>

        {entry.newNote && (
          <Section label={entry.isNew ? 'New this iteration' : 'What changed'} icon="sparkle">
            <p className="text-sm leading-relaxed text-muted">{entry.newNote}</p>
          </Section>
        )}

        {entry.addresses && (
          <Section label="What this improves" icon="check">
            <p className="text-sm leading-relaxed text-muted">{entry.addresses}</p>
          </Section>
        )}

        {entry.youAskedFor && (
          <div className="rounded-2xl border-l-4 border-l-brand bg-surface-2 px-4 py-3">
            <p className="text-[10px] font-bold uppercase tracking-wide text-brand">You asked for</p>
            <p className="mt-1 text-sm font-semibold italic leading-relaxed text-text">
              “{entry.youAskedFor}”
            </p>
          </div>
        )}

        <Section label="What great looks like">
          <div className="flex flex-wrap gap-1.5">
            {entry.dimensions.map((d) => (
              <span
                key={d.name}
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold ${dimTone(
                  d.primary,
                )}`}
              >
                <span className="text-[8px]">{d.primary ? '●' : '◐'}</span>
                {d.name}
              </span>
            ))}
          </div>
          <p className="mt-1.5 text-[10px] text-faint">● Primary focus · ◐ Supporting</p>
        </Section>

        <div className="grid grid-cols-1 gap-3">
          <Meta label="RM journey stage" value={entry.stage} icon="target" />
          {entry.reoRole && <Meta label="REO’s role" value={entry.reoRole} icon="bot" />}
          {entry.source && <Meta label="Where the intelligence comes from" value={entry.source} icon="globe" />}
        </div>
      </div>

      {/* footer */}
      <div className="border-t border-line px-5 py-3">
        <p className="text-[10px] leading-relaxed text-faint">
          Mapped to the workshop’s six “what great looks like” dimensions and the four-stage RM journey.
        </p>
      </div>
    </>
  );
}

function Section({
  label,
  icon,
  children,
}: {
  label: string;
  icon?: 'sparkle' | 'check';
  children: ReactNode;
}) {
  return (
    <div>
      <p className="mb-1.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-faint">
        {icon && <Icon name={icon} size={12} className="text-accent" />}
        {label}
      </p>
      {children}
    </div>
  );
}

function Meta({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: 'target' | 'bot' | 'globe';
}) {
  return (
    <div className="flex items-start gap-2.5 rounded-2xl bg-surface-2 px-3.5 py-3">
      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
        <Icon name={icon} size={14} />
      </span>
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-wide text-faint">{label}</p>
        <p className="mt-0.5 text-[13px] font-semibold leading-snug text-text">{value}</p>
      </div>
    </div>
  );
}
