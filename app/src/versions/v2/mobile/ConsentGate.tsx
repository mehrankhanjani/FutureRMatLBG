import { useState } from 'react';
import { client, meeting } from '../scenario';
import { Icon } from '../../../ui/icons';
import { BrandMark } from '../../../components/brand/BrandMark';

type Stage = 'intro' | 'capturing' | 'fallback';

const rmFirst = client.rm.split(' ')[0];

/** Concentric-arc backdrop echoing the Lloyds welcome screen. */
function Arcs() {
  return (
    <svg
      className="pointer-events-none absolute inset-x-0 -top-24 mx-auto"
      width="520"
      height="520"
      viewBox="0 0 520 520"
      fill="none"
    >
      {[260, 200, 140, 80].map((r, i) => (
        <circle
          key={r}
          cx="260"
          cy="260"
          r={r}
          stroke="#000"
          strokeOpacity={0.06 + i * 0.02}
          strokeWidth="2"
        />
      ))}
    </svg>
  );
}

export function ConsentGate() {
  const [stage, setStage] = useState<Stage>('intro');

  if (stage === 'capturing') {
    return (
      <div className="flex min-h-full flex-col bg-ink px-6 py-8">
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <div className="relative mb-6 flex h-28 w-28 items-center justify-center">
            <span className="absolute inset-0 animate-ping rounded-full bg-accent/20" />
            <span className="absolute inset-3 animate-pulse rounded-full bg-accent/15" />
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-on-accent">
              <Icon name="mic" size={28} />
            </span>
          </div>
          <h2 className="text-xl font-extrabold">Live capture on</h2>
          <p className="mt-2 max-w-[15rem] text-sm text-muted">
            Transcribing securely on-device. Key moments and signals are detected
            in real time.
          </p>

          {/* waveform */}
          <div className="mt-6 flex h-10 items-center gap-1">
            {Array.from({ length: 22 }).map((_, i) => (
              <span
                key={i}
                className="w-1 rounded-full bg-accent/70"
                style={{
                  height: `${8 + Math.abs(Math.sin(i * 0.9)) * 28}px`,
                  transformOrigin: 'center',
                  animation: `bar 1.2s ease-in-out ${i * 0.05}s infinite`,
                }}
              />
            ))}
          </div>

          <div className="mt-6 flex items-center gap-2 rounded-full bg-surface px-3 py-1.5 text-xs font-semibold text-muted">
            <Icon name="shield" size={13} className="text-accent" />
            Consent confirmed · Sarah Whitfield
          </div>
        </div>
        <button
          onClick={() => setStage('intro')}
          className="mx-auto mt-4 text-xs font-semibold text-faint"
        >
          ↺ Replay consent flow
        </button>
      </div>
    );
  }

  if (stage === 'fallback') {
    return (
      <div className="flex min-h-full flex-col bg-ink px-6 py-8">
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-surface-2 text-muted">
            <Icon name="micOff" size={28} />
          </div>
          <h2 className="text-xl font-extrabold">Recording off</h2>
          <p className="mt-2 max-w-[16rem] text-sm text-muted">
            No problem. We have switched to{' '}
            <span className="font-bold text-text">notes mode</span> — you capture
            key points manually.
          </p>

          <div className="mt-6 w-full rounded-2xl bg-surface p-4 text-left">
            <div className="flex items-center gap-2 text-sm font-bold text-text">
              <Icon name="sparkle" size={16} className="text-accent" />
              Still fully supported
            </div>
            <p className="mt-1 text-xs text-muted">
              The assistant will structure your notes into a summary, CRM update
              and follow-ups after the meeting — exactly as it would from a
              transcript.
            </p>
          </div>
        </div>
        <button
          onClick={() => setStage('intro')}
          className="mx-auto mt-4 text-xs font-semibold text-faint"
        >
          ↺ Replay consent flow
        </button>
      </div>
    );
  }

  // intro
  return (
    <div className="flex min-h-full flex-col">
      {/* green hero */}
      <div className="relative overflow-hidden bg-brand px-6 pb-8 pt-6 text-ink">
        <Arcs />
        <div className="relative">
          <div className="mb-5 flex items-center justify-between">
            <BrandMark badge={false} tone="dark" size={22} wordmark="Lloyds" subtext={null} />
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink/10">
              <Icon name="bell" size={16} />
            </span>
          </div>
          <div className="mb-4 text-sm font-extrabold">Good afternoon, {rmFirst}</div>
          <div className="mb-1 text-xs font-bold uppercase tracking-wide text-ink/70">
            Next meeting · {meeting.date.split('·')[1]?.trim()}
          </div>
          <h1 className="text-2xl font-extrabold leading-tight">
            {client.name}
          </h1>
          <p className="mt-1 text-sm font-semibold text-ink/80">
            {client.contact} · {client.role}
          </p>
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-ink/10 px-3 py-1 text-xs font-bold">
            <Icon name="building" size={13} />
            {client.segment}
          </div>
        </div>
      </div>

      {/* consent body */}
      <div className="flex flex-1 flex-col gap-4 px-6 py-6">
        <div className="rounded-2xl border border-accent/30 bg-accent/10 p-4">
          <div className="flex items-center gap-2 text-sm font-bold text-accent">
            <Icon name="trendingUp" size={16} />
            M&A opportunity already on your radar
          </div>
          <p className="mt-1.5 text-xs text-muted">
            Pre-read flagged a group-level event — Avonmore has acquired Calderwood,
            another Lloyds client. You walk in already knowing where the opportunity is.
          </p>
        </div>

        <div className="rounded-2xl border border-chip-amber/30 bg-chip-amber/10 p-4">
          <div className="flex items-center gap-2 text-sm font-bold text-chip-amber">
            <Icon name="shield" size={16} />
            Confirm consent before capture
          </div>
          <p className="mt-1.5 text-xs text-muted">
            Reminder: confirm Sarah is happy for this meeting to be recorded and
            transcribed. She can decline — capture is always optional.
          </p>
        </div>

        <div className="rounded-2xl bg-surface p-4">
          <div className="text-xs font-bold uppercase tracking-wide text-muted">
            On file
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-on-accent">
              <Icon name="check" size={14} />
            </span>
            <span className="text-sm font-semibold text-text">
              Recording consent agreed (Mar 2026)
            </span>
          </div>
          <p className="mt-2 text-xs text-muted">
            Verbally re-confirm at the start, then begin.
          </p>
        </div>

        <div className="mt-auto flex flex-col gap-2.5">
          <button
            onClick={() => setStage('capturing')}
            className="flex items-center justify-between rounded-full bg-accent px-6 py-4 text-sm font-bold text-on-accent transition active:scale-[0.98]"
          >
            Consent given — start capture
            <Icon name="arrowRight" size={18} />
          </button>
          <button
            onClick={() => setStage('fallback')}
            className="rounded-full border border-text/25 px-6 py-4 text-sm font-bold text-text transition active:scale-[0.98]"
          >
            Client declined — use notes mode
          </button>
        </div>
      </div>
    </div>
  );
}
