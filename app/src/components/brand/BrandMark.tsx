import { useState } from 'react';

/**
 * BrandMark — Lloyds brand lockup for the concept demo.
 *
 * Logo slot: if `public/lloyds-logo.svg` is present it is shown automatically;
 * otherwise we fall back to an abstract placeholder mark (NOT the trademarked
 * Lloyds horse). Drop the official asset at that path to brand the prototype.
 */
type Props = {
  size?: number;
  withWordmark?: boolean;
  wordmark?: string;
  subtext?: string | null;
  /** 'light' = light text on dark bg · 'dark' = dark text on green bg */
  tone?: 'light' | 'dark';
  /** wrap the mark in the green Lloyds badge (black mark on green) */
  badge?: boolean;
};

const LOGO_SRC = '/lloyds-logo.jpeg';

function PlaceholderMark({ size, fill }: { size: number; fill: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-label="Brand mark" role="img">
      <path d="M24 6 L40 22 L33 22 L24 13 L15 22 L8 22 Z" fill={fill} />
      <path d="M24 20 L36 32 L30 32 L24 26 L18 32 L12 32 Z" fill={fill} opacity={0.7} />
      <path d="M24 32 L31 39 L26 39 L24 37 L22 39 L17 39 Z" fill={fill} opacity={0.45} />
    </svg>
  );
}

export function BrandMark({
  size = 32,
  withWordmark = true,
  wordmark = 'Lloyds',
  subtext = 'Illustrative concept',
  tone = 'light',
  badge = true,
}: Props) {
  const [useFallback, setUseFallback] = useState(false);
  const textColor = tone === 'light' ? 'text-text' : 'text-ink';
  const subColor = tone === 'light' ? 'text-muted' : 'text-ink/60';
  const markFill = badge
    ? 'var(--color-ink)'
    : tone === 'dark'
      ? 'var(--color-ink)'
      : 'var(--color-accent)';

  const dim = size + 14;

  // Real logo (its own green field) renders as a rounded tile everywhere.
  // Until the asset loads, fall back to the abstract placeholder mark.
  const logo = useFallback ? (
    badge ? (
      <span
        className="flex shrink-0 items-center justify-center rounded-xl bg-brand"
        style={{ width: dim, height: dim }}
      >
        <PlaceholderMark size={size} fill={markFill} />
      </span>
    ) : (
      <PlaceholderMark size={size} fill={markFill} />
    )
  ) : (
    <img
      src={LOGO_SRC}
      alt="Lloyds"
      onError={() => setUseFallback(true)}
      className="shrink-0 rounded-xl object-cover"
      style={{ width: dim, height: dim }}
    />
  );

  return (
    <div className="flex items-center gap-2.5">
      {logo}
      {withWordmark && (
        <div className="leading-tight">
          <div className={`text-[15px] font-extrabold ${textColor}`}>{wordmark}</div>
          {subtext && (
            <div className={`text-[10px] font-medium tracking-wide ${subColor}`}>{subtext}</div>
          )}
        </div>
      )}
    </div>
  );
}
