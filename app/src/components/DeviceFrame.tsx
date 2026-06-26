import type { ReactNode } from 'react';
import type { DeviceType } from '../types';

/** Phone mock — status bar, content, bottom indicator. ~390×844 (iPhone-ish). */
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-[740px] w-[360px] shrink-0 rounded-[48px] bg-neutral-800 p-[11px] shadow-[0_30px_80px_-15px_rgba(0,0,0,0.85)] ring-1 ring-white/15">
      {/* side buttons */}
      <span className="absolute -left-[2px] top-28 h-9 w-[3px] rounded-l bg-neutral-700" />
      <span className="absolute -left-[2px] top-44 h-14 w-[3px] rounded-l bg-neutral-700" />
      <span className="absolute -right-[2px] top-40 h-20 w-[3px] rounded-r bg-neutral-700" />

      {/* screen */}
      <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[38px] bg-ink">
        {/* notch */}
        <div className="absolute left-1/2 top-0 z-20 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-black" />
        {/* status bar */}
        <div className="flex items-center justify-between px-7 pb-1 pt-3 text-[12px] font-semibold text-text">
          <span>12:26</span>
          <span className="flex items-center gap-1 text-[10px]">
            <span>5G</span>
            <span>▮▮▮</span>
            <span className="rounded-sm border border-text/60 px-1">83</span>
          </span>
        </div>
        {/* content */}
        <div className="no-scrollbar relative flex-1 overflow-y-auto">
          {children}
        </div>
        {/* home indicator */}
        <div className="flex justify-center py-2">
          <div className="h-1 w-32 rounded-full bg-text/40" />
        </div>
      </div>
    </div>
  );
}

/** Tablet mock — slim-bezel slate with a resting digital pen down the right edge. */
export function TabletFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-[660px] w-[520px] shrink-0 rounded-[34px] bg-neutral-800 p-[14px] shadow-[0_30px_80px_-15px_rgba(0,0,0,0.85)] ring-1 ring-white/15">
      {/* front camera */}
      <span className="absolute left-1/2 top-[7px] z-20 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-neutral-600" />

      {/* screen */}
      <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[24px] bg-ink">
        {children}
      </div>

      {/* digital pen / stylus resting against the right edge */}
      <div className="pointer-events-none absolute -right-[10px] top-28 z-30 h-72 w-[14px] rotate-[7deg]">
        {/* barrel */}
        <span className="absolute inset-0 rounded-full bg-gradient-to-b from-neutral-100 via-neutral-300 to-neutral-400 shadow-[0_10px_24px_-6px_rgba(0,0,0,0.7)]" />
        {/* side button */}
        <span className="absolute left-1/2 top-16 h-6 w-[3px] -translate-x-1/2 rounded-full bg-neutral-400/70" />
        {/* tip */}
        <span
          className="absolute -bottom-3 left-1/2 h-0 w-0 -translate-x-1/2"
          style={{
            borderLeft: '7px solid transparent',
            borderRight: '7px solid transparent',
            borderTop: '14px solid #9ca3af',
          }}
        />
        <span className="absolute -bottom-[18px] left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-neutral-700" />
      </div>
    </div>
  );
}

/** Laptop / desktop mock — browser chrome with URL bar. */
function LaptopFrame({ children }: { children: ReactNode }) {
  return (
    <div className="w-full max-w-5xl min-w-0">
      <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl shadow-black/60">
        {/* browser chrome */}
        <div className="flex items-center gap-3 border-b border-line bg-surface-2 px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="ml-2 flex-1">
            <div className="mx-auto flex max-w-md items-center gap-2 rounded-full bg-ink px-4 py-1.5 text-xs text-muted">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              cib-relationship.lloyds.internal
            </div>
          </div>
        </div>
        {/* content */}
        <div className="no-scrollbar h-[640px] overflow-y-auto bg-ink">
          {children}
        </div>
      </div>
    </div>
  );
}

export function DeviceFrame({
  device,
  children,
}: {
  device: DeviceType;
  children: ReactNode;
}) {
  if (device === 'custom') {
    // The scene composes its own device frames (e.g. phone + tablet).
    return <div className="flex w-full items-center justify-center">{children}</div>;
  }
  return device === 'mobile' ? (
    <PhoneFrame>{children}</PhoneFrame>
  ) : (
    <LaptopFrame>{children}</LaptopFrame>
  );
}
