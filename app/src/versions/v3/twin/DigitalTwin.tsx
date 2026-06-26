import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Icon, type IconName } from '../../../ui/icons';
import {
  twinExchanges,
  twinFallback,
  twinIntro,
  twinName,
  twinSubtitle,
  type TwinAction,
  type TwinSource,
} from './twinScript';

const sourceIcon: Record<TwinSource, IconName> = {
  'Internal systems': 'building',
  'External market data': 'globe',
  'Conversation capture': 'mic',
};

type Msg =
  | { role: 'twin'; text: string; sources?: TwinSource[]; actions?: TwinAction[] }
  | { role: 'user'; text: string }
  | { role: 'system'; text: string };

/**
 * Daisy's digital twin (iteration 3) — a persistent, always-on assistant
 * available on every scene, powered by REO. Scripted Q&A grounded in named
 * sources; some answers carry actions that jump to the relevant scene or
 * acknowledge work done on her behalf.
 */
export function DigitalTwin({ onNavigate }: { onNavigate: (sceneId: string) => void }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([{ role: 'twin', text: twinIntro }]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, open]);

  function ask(q: string) {
    const ex = twinExchanges.find((e) => e.q.toLowerCase() === q.toLowerCase());
    setMessages((m) => [
      ...m,
      { role: 'user', text: q },
      ex
        ? { role: 'twin', text: ex.a, sources: ex.sources, actions: ex.actions }
        : { role: 'twin', text: twinFallback },
    ]);
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    const q = input.trim();
    if (!q) return;
    setInput('');
    ask(q);
  }

  function runAction(a: TwinAction) {
    setMessages((m) => [...m, { role: 'system', text: a.ack }]);
    if (a.sceneId) onNavigate(a.sceneId);
  }

  return (
    <>
      {/* launcher — present on every scene */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-full bg-accent py-3 pl-3 pr-5 text-on-accent shadow-2xl shadow-accent/30 transition hover:scale-[1.03] active:scale-95"
        aria-label="Open your digital twin"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-on-accent/20">
          <Icon name="sparkle" size={18} />
        </span>
        <span className="text-sm font-extrabold">Ask your twin</span>
      </button>

      {/* chat panel */}
      {open && (
        <div className="anim-fadeUp fixed bottom-24 right-6 z-50 flex h-[560px] max-h-[80vh] w-[380px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-3xl border border-line bg-surface shadow-2xl shadow-black/60">
          {/* header */}
          <div className="flex items-center gap-3 border-b border-line bg-ink px-4 py-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-accent to-brand text-on-accent">
              <Icon name="sparkle" size={20} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-1.5 text-sm font-extrabold">
                {twinName}
                <span className="h-1.5 w-1.5 rounded-full bg-accent" style={{ animation: 'bar 1.5s infinite' }} />
              </p>
              <p className="truncate text-[11px] text-muted">{twinSubtitle}</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="flex h-7 w-7 items-center justify-center rounded-full text-muted transition hover:bg-surface-2 hover:text-text"
              aria-label="Close"
            >
              <Icon name="chevronRight" size={16} className="rotate-90" />
            </button>
          </div>

          {/* messages */}
          <div ref={scrollRef} className="no-scrollbar flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => {
              if (m.role === 'user') {
                return (
                  <div key={i} className="anim-fadeUp flex justify-end">
                    <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-brand px-3.5 py-2 text-[13px] font-semibold leading-snug text-ink">
                      {m.text}
                    </div>
                  </div>
                );
              }
              if (m.role === 'system') {
                return (
                  <div key={i} className="anim-fadeUp flex items-center justify-center gap-1.5 text-[11px] font-bold text-accent">
                    <Icon name="check" size={13} /> {m.text}
                  </div>
                );
              }
              return (
                <div key={i} className="anim-fadeUp flex gap-2">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent to-brand text-on-accent">
                    <Icon name="sparkle" size={12} />
                  </span>
                  <div className="min-w-0 max-w-[85%]">
                    <div className="rounded-2xl rounded-tl-sm bg-surface-2 px-3.5 py-2.5 text-[13px] leading-snug text-text">
                      {m.text}
                    </div>
                    {m.sources && (
                      <div className="mt-1.5 flex flex-wrap gap-1.5">
                        {m.sources.map((s) => (
                          <span
                            key={s}
                            className="flex items-center gap-1 rounded-full bg-surface px-2 py-0.5 text-[10px] font-bold text-muted"
                          >
                            <Icon name={sourceIcon[s]} size={11} className="text-accent" /> {s}
                          </span>
                        ))}
                      </div>
                    )}
                    {m.actions && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {m.actions.map((a) => (
                          <button
                            key={a.label}
                            onClick={() => runAction(a)}
                            className="flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-[11px] font-bold text-on-accent transition active:scale-95"
                          >
                            {a.label} <Icon name="arrowRight" size={12} />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* suggested questions */}
          <div className="no-scrollbar flex gap-1.5 overflow-x-auto border-t border-line px-3 py-2">
            {twinExchanges.map((e) => (
              <button
                key={e.q}
                onClick={() => ask(e.q)}
                className="shrink-0 rounded-full border border-line px-3 py-1.5 text-[11px] font-semibold text-muted transition hover:border-accent/40 hover:text-text"
              >
                {e.q}
              </button>
            ))}
          </div>

          {/* input */}
          <form onSubmit={submit} className="flex items-center gap-2 border-t border-line px-3 py-2.5">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask your twin…"
              className="min-w-0 flex-1 bg-transparent px-1 text-[13px] text-text outline-none placeholder:text-faint"
            />
            <button
              type="submit"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-on-accent transition active:scale-95"
              aria-label="Send"
            >
              <Icon name="arrowRight" size={15} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
