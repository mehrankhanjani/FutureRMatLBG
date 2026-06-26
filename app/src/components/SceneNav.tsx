import type { Scene } from '../types';

export function SceneNav({
  scenes,
  index,
  onSelect,
}: {
  scenes: Scene[];
  index: number;
  onSelect: (i: number) => void;
}) {
  const current = scenes[index];

  return (
    <aside className="flex w-72 shrink-0 flex-col gap-4 pt-2">
      {/* progress */}
      <div className="flex items-center gap-2">
        {scenes.map((s, i) => (
          <span
            key={s.id}
            className={`h-1.5 flex-1 rounded-full transition ${
              i <= index ? 'bg-accent' : 'bg-line'
            }`}
          />
        ))}
      </div>

      <div className="text-xs font-semibold uppercase tracking-wide text-muted">
        {current.chapter} · {index + 1} of {scenes.length}
      </div>

      {/* scene list */}
      <nav className="flex flex-col gap-1.5">
        {scenes.map((s, i) => {
          const active = i === index;
          return (
            <button
              key={s.id}
              onClick={() => onSelect(i)}
              className={`flex items-center gap-3 rounded-2xl border px-3 py-2.5 text-left transition ${
                active
                  ? 'border-accent/40 bg-accent/10'
                  : 'border-line bg-surface hover:border-line/80'
              }`}
            >
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                  active ? 'bg-accent text-on-accent' : 'bg-surface-2 text-muted'
                }`}
              >
                {i + 1}
              </span>
              <span className="min-w-0">
                <span
                  className={`block text-sm font-bold ${active ? 'text-text' : 'text-muted'}`}
                >
                  {s.title}
                </span>
                <span className="block truncate text-[11px] text-faint">
                  {s.device === 'desktop' ? 'Desktop' : 'Mobile'}
                </span>
              </span>
            </button>
          );
        })}
      </nav>

      <p className="mt-auto text-center text-[11px] text-faint">Use ← → arrow keys</p>
    </aside>
  );
}
