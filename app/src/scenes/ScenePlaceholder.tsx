import type { DeviceType } from '../types';

/**
 * Placeholder scene used in Step 2 to validate the shell, device frames and
 * navigation. Each of these is replaced by a real scene in Steps 4–9.
 */
export function ScenePlaceholder({
  title,
  device,
  note,
}: {
  title: string;
  device: DeviceType;
  note: string;
}) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-8 text-center">
      <div className="rounded-full bg-accent/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-accent">
        {device === 'mobile' ? 'Mobile' : 'Desktop'} scene
      </div>
      <h2 className="text-2xl font-extrabold">{title}</h2>
      <p className="max-w-sm text-sm text-muted">{note}</p>
      <div className="mt-2 rounded-full border border-line px-3 py-1 text-[11px] font-medium text-faint">
        Coming in a later step
      </div>
    </div>
  );
}
