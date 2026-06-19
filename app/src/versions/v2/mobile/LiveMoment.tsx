import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { client, transcript, signals, prompts } from '../scenario';
import { Icon } from '../../../ui/icons';
import { Chip, Avatar } from '../../../ui/primitives';
import { PromptCard } from '../../../ui/PromptCard';

const toneForSignal = {
  need: 'need',
  risk: 'risk',
  opportunity: 'opportunity',
  context: 'context',
  emotion: 'emotion',
} as const;

function fmt(s: number) {
  const m = Math.floor(s / 60);
  const ss = s % 60;
  return `${m}:${ss.toString().padStart(2, '0')}`;
}

export function LiveMoment() {
  const [lines, setLines] = useState(0); // transcript lines revealed
  const [sigCount, setSigCount] = useState(0); // detection chips revealed
  const [showPrompt, setShowPrompt] = useState(false);
  const [promptIdx, setPromptIdx] = useState(0);
  const [seconds, setSeconds] = useState(38);
  const timers = useRef<number[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // draggable bottom sheet — lets the user slide the detected/prompt panel
  // up and down so the conversation underneath can always be read.
  const sheetRef = useRef<HTMLDivElement>(null);
  const [dragY, setDragY] = useState(0);
  const [dragging, setDragging] = useState(false);
  const drag = useRef<{ startY: number; startDragY: number } | null>(null);

  function collapseMax() {
    const h = sheetRef.current?.offsetHeight ?? 280;
    return Math.max(h - 52, 0); // keep the grab handle peeking
  }
  function onSheetDown(e: ReactPointerEvent<HTMLDivElement>) {
    drag.current = { startY: e.clientY, startDragY: dragY };
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  }
  function onSheetMove(e: ReactPointerEvent<HTMLDivElement>) {
    if (!drag.current) return;
    const delta = e.clientY - drag.current.startY;
    setDragY(Math.min(Math.max(drag.current.startDragY + delta, 0), collapseMax()));
  }
  function onSheetUp(e: ReactPointerEvent<HTMLDivElement>) {
    if (!drag.current) return;
    const max = collapseMax();
    setDragY((y) => (y > max / 2 ? max : 0)); // snap open / collapsed
    drag.current = null;
    setDragging(false);
    e.currentTarget.releasePointerCapture?.(e.pointerId);
  }
  const collapsed = dragY > collapseMax() / 2;

  const keyIndex = transcript.findIndex((t) => t.key);

  function clearTimers() {
    timers.current.forEach((t) => clearTimeout(t));
    timers.current = [];
  }

  function play() {
    clearTimers();
    setLines(0);
    setSigCount(0);
    setShowPrompt(false);
    setPromptIdx(0);
    setDragY(0);

    // reveal transcript lines
    transcript.forEach((_, i) => {
      timers.current.push(
        window.setTimeout(() => setLines(i + 1), 700 + i * 1700),
      );
    });

    const afterTranscript = 700 + transcript.length * 1700;

    // reveal detection chips one by one
    signals.forEach((_, i) => {
      timers.current.push(
        window.setTimeout(() => setSigCount(i + 1), afterTranscript + 300 + i * 320),
      );
    });

    // slide up the prompt
    timers.current.push(
      window.setTimeout(
        () => setShowPrompt(true),
        afterTranscript + 300 + signals.length * 320 + 400,
      ),
    );
  }

  useEffect(() => {
    play();
    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ticking timer
  useEffect(() => {
    const id = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  // keep transcript scrolled to newest
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [lines, sigCount]);

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-ink">
      {/* meeting header */}
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <div className="flex items-center gap-2">
          <Avatar initials={client.initials} size={32} />
          <div className="leading-tight">
            <div className="text-sm font-extrabold">{client.name.split(' ')[0]} Components</div>
            <div className="text-[11px] text-muted">{client.contact}</div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-risk/15 px-2.5 py-1 text-[11px] font-bold text-risk">
          <span className="h-1.5 w-1.5 rounded-full bg-risk" style={{ animation: 'bar 1.5s infinite' }} />
          REC {fmt(seconds)}
        </div>
      </div>

      {/* transcript */}
      <div ref={scrollRef} className="no-scrollbar flex-1 space-y-3 overflow-y-auto px-4 pt-4 pb-24">
        {transcript.slice(0, lines).map((t, i) => {
          const isClient = t.speaker === 'client';
          return (
            <div
              key={i}
              className={`anim-fadeUp flex ${isClient ? 'justify-start' : 'justify-end'}`}
            >
              <div className="max-w-[80%]">
                <div
                  className={`rounded-2xl px-3.5 py-2.5 text-[13px] leading-snug ${
                    isClient
                      ? 'rounded-tl-sm bg-surface text-text'
                      : 'rounded-tr-sm bg-brand text-ink'
                  } ${t.key ? 'ring-2 ring-accent/60' : ''}`}
                >
                  {t.text}
                </div>
                <div className={`mt-0.5 text-[10px] text-faint ${isClient ? 'text-left' : 'text-right'}`}>
                  {t.name}
                </div>
              </div>
            </div>
          );
        })}

        {/* analysing shimmer right after key line lands, before chips */}
        {lines > keyIndex && sigCount === 0 && (
          <div className="anim-fadeUp flex items-center gap-2 px-1 text-xs text-accent">
            <Icon name="sparkle" size={14} />
            Shaping the opportunity…
          </div>
        )}
      </div>

      {/* detected + prompt — draggable bottom sheet, slide it down to read the chat */}
      {sigCount > 0 && (
        <div
          ref={sheetRef}
          className="absolute inset-x-0 bottom-0 flex max-h-[82%] flex-col rounded-t-2xl border-t border-line bg-ink shadow-2xl shadow-black/60"
          style={{
            transform: `translateY(${dragY}px)`,
            transition: dragging ? 'none' : 'transform 0.25s ease',
          }}
        >
          {/* grab handle */}
          <div
            onPointerDown={onSheetDown}
            onPointerMove={onSheetMove}
            onPointerUp={onSheetUp}
            className="flex shrink-0 cursor-grab touch-none select-none flex-col items-center gap-1 py-2 active:cursor-grabbing"
          >
            <span className="h-1 w-10 rounded-full bg-line" />
            <span className="flex items-center gap-1 text-[10px] font-semibold text-faint">
              <Icon name={collapsed ? 'chevronRight' : 'chevronRight'} size={11} className={collapsed ? '-rotate-90' : 'rotate-90'} />
              {collapsed ? 'Drag up for insights' : 'Drag down to read the chat'}
            </span>
          </div>

          <div className="no-scrollbar anim-slideUp flex-1 overflow-y-auto px-4 pb-4">
            {/* detected */}
            <div className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-muted">
              <Icon name="sparkle" size={13} className="text-accent" />
              Detected
            </div>
            <div className="flex flex-wrap gap-1.5">
              {signals.slice(0, sigCount).map((s) => (
                <span key={s.id} className="anim-popIn">
                  <Chip tone={toneForSignal[s.tone]}>
                    <span className="opacity-70">{s.label}:</span> {s.detail}
                  </Chip>
                </span>
              ))}
            </div>

            {/* prompt */}
            {showPrompt && (
              <div className="anim-slideUp mt-3">
                <PromptCard
                  insight={prompts[promptIdx].insight}
                  rationale={prompts[promptIdx].rationale}
                  action={prompts[promptIdx].action}
                  value={prompts[promptIdx].value}
                  timing={prompts[promptIdx].timing}
                  onAccept={() => setPromptIdx((i) => (i + 1) % prompts.length)}
                  onDismiss={() => setPromptIdx((i) => (i + 1) % prompts.length)}
                />
                <div className="mt-2 flex items-center justify-center gap-3">
                  <div className="flex gap-1.5">
                    {prompts.map((_, i) => (
                      <span
                        key={i}
                        className={`h-1.5 rounded-full transition-all ${
                          i === promptIdx ? 'w-5 bg-accent' : 'w-1.5 bg-line'
                        }`}
                      />
                    ))}
                  </div>
                  <button onClick={play} className="text-[11px] font-semibold text-faint">
                    ↺ Replay
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
