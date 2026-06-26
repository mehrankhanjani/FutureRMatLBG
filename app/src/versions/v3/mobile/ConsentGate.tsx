import { useState } from 'react';
import { client, meeting } from '../scenario';
import { Icon } from '../../../ui/icons';
import { BrandMark } from '../../../components/brand/BrandMark';
import { PhoneFrame, TabletFrame } from '../../../components/DeviceFrame';

type Stage = 'intro' | 'capturing' | 'fallback';

const rmFirst = client.rm.split(' ')[0];
const handwriting = "'Bradley Hand', 'Segoe Script', 'Comic Sans MS', cursive";

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

/**
 * Activate intelligence — iteration 3 override.
 *
 * Renders its own device frames (scene device is `custom`). Identical to v2
 * except the no-consent fallback: the RM gets an active capture surface on the
 * phone — and a tablet appears beside it where Daisy can hand-write notes with a
 * digital pen. Either way the agent structures the capture identically to a
 * transcript after the meeting (#9).
 */
export function ConsentGate() {
  const [stage, setStage] = useState<Stage>('intro');
  const [note, setNote] = useState('');
  const [voice, setVoice] = useState(false);

  let phoneScreen;

  if (stage === 'capturing') {
    phoneScreen = (
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
  } else if (stage === 'fallback') {
    phoneScreen = (
      <div className="flex min-h-full flex-col bg-ink px-6 py-7">
        <div className="flex flex-1 flex-col">
          <div className="mb-5 flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-surface-2 text-muted">
              <Icon name="micOff" size={24} />
            </div>
            <h2 className="text-xl font-extrabold">Recording off — notes mode</h2>
            <p className="mt-1.5 max-w-[17rem] text-sm text-muted">
              No problem. Capture key points here as you go — by typing, by voice,
              or by hand on your tablet. The agent structures them after the meeting.
            </p>
          </div>

          {/* active note-capture surface */}
          <div className="rounded-2xl bg-surface p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-muted">
                <Icon name="doc" size={14} className="text-accent" />
                Meeting notes
              </span>
              {/* voice-to-text toggle */}
              <button
                onClick={() => setVoice((v) => !v)}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition active:scale-[0.97] ${
                  voice ? 'bg-accent text-on-accent' : 'bg-surface-2 text-muted'
                }`}
              >
                <Icon name={voice ? 'mic' : 'micOff'} size={13} />
                {voice ? 'Voice on' : 'Voice to text'}
              </button>
            </div>

            {voice && (
              <div className="mb-3 flex items-center gap-2 rounded-xl bg-accent/10 px-3 py-2">
                <span className="flex h-2 w-2 animate-pulse rounded-full bg-accent" />
                <span className="text-xs font-semibold text-accent">
                  Listening — speak your note, it appears below
                </span>
              </div>
            )}

            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={4}
              placeholder="e.g. Sarah confirmed the Calderwood acquisition completed — wants combined funding and FX in one structure…"
              className="w-full resize-none rounded-xl border border-line bg-ink px-3 py-2.5 text-sm text-text placeholder:text-faint focus:border-accent focus:outline-none"
            />

            <button className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-full bg-accent py-3 text-sm font-bold text-on-accent transition active:scale-[0.98]">
              <Icon name="check" size={16} /> Save note
            </button>
          </div>

          <div className="mt-3 flex items-start gap-2 rounded-2xl border border-accent/30 bg-accent/10 p-3.5">
            <Icon name="sparkle" size={16} className="mt-0.5 shrink-0 text-accent" />
            <p className="text-xs leading-relaxed text-muted">
              However you capture it, after the meeting the agent turns your notes
              into a summary, CRM update and follow-ups —{' '}
              <span className="font-bold text-text">exactly as it would from a transcript</span>.
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
  } else {
    // intro
    phoneScreen = (
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

  return (
    <div className="flex items-end justify-center gap-8">
      <PhoneFrame>{phoneScreen}</PhoneFrame>

      {stage === 'fallback' && (
        <TabletFrame>
          <NotebookSurface note={note} />
        </TabletFrame>
      )}
    </div>
  );
}

/** The handwriting notebook shown on the tablet in notes mode. */
function NotebookSurface({ note }: { note: string }) {
  return (
    <div className="flex h-full flex-col">
      {/* notebook header + pen toolbar */}
      <div className="flex items-center justify-between border-b border-line bg-surface px-5 py-3">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/15 text-accent">
            <Icon name="doc" size={18} />
          </span>
          <div>
            <p className="text-sm font-extrabold">Notebook · handwritten</p>
            <p className="text-[11px] text-muted">
              {client.name} · {meeting.date.split('·')[1]?.trim()}
            </p>
          </div>
        </div>
        {/* pen tools */}
        <div className="flex items-center gap-1.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-on-accent" title="Pen">
            <Icon name="trendingUp" size={15} />
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-2 text-muted" title="Highlighter">
            <Icon name="zap" size={15} />
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-2 text-muted" title="Erase">
            <Icon name="micOff" size={15} />
          </span>
        </div>
      </div>

      {/* paper — dotted grid + handwritten strokes */}
      <div
        className="relative flex-1 overflow-hidden"
        style={{
          backgroundColor: '#0e1420',
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      >
        <div className="absolute inset-0 px-8 py-7">
          <p
            className="text-[26px] leading-relaxed text-text/90"
            style={{ fontFamily: handwriting, transform: 'rotate(-1.2deg)' }}
          >
            Sarah — Calderwood deal <span className="text-accent">DONE ✓</span>
          </p>
          <p
            className="mt-4 text-[24px] leading-relaxed text-text/85"
            style={{ fontFamily: handwriting, transform: 'rotate(0.6deg)' }}
          >
            wants ONE structure:
          </p>
          <p
            className="mt-1 text-[24px] leading-relaxed text-text/85"
            style={{ fontFamily: handwriting, transform: 'rotate(-0.5deg)' }}
          >
            acq finance + group FX → ~£12m
          </p>
          <p
            className="mt-4 text-[22px] leading-relaxed text-text/80"
            style={{ fontFamily: handwriting, transform: 'rotate(0.8deg)' }}
          >
            follow up: Marcus (CIB) + credit
          </p>

          {/* a doodled underline + arrow */}
          <svg className="mt-2" width="260" height="40" viewBox="0 0 260 40" fill="none">
            <path
              d="M4 22 C 60 8, 140 34, 210 14"
              stroke="#00B945"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M210 14 l -14 -2 M210 14 l -6 11"
              stroke="#00B945"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
          </svg>

          {/* whatever the RM types echoes onto the page as ink */}
          {note.trim() && (
            <p
              className="mt-5 text-[20px] leading-relaxed text-text/70"
              style={{ fontFamily: handwriting, transform: 'rotate(-0.4deg)' }}
            >
              {note}
            </p>
          )}
        </div>
      </div>

      {/* footer — pen status + sync */}
      <div className="flex items-center gap-2 border-t border-line bg-surface px-5 py-3 text-xs">
        <span className="flex h-2 w-2 animate-pulse rounded-full bg-accent" />
        <span className="font-semibold text-text">Digital pen connected</span>
        <span className="text-muted">· handwriting recognised live</span>
        <span className="ml-auto flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1.5 font-bold text-accent">
          <Icon name="check" size={13} /> Synced to notes
        </span>
      </div>
    </div>
  );
}
