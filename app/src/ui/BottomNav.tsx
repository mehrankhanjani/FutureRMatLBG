import { Icon, type IconName } from './icons';

/** Bottom tab nav matching the Lloyds app pattern. Active tab = green. */
export type NavTab = { id: string; label: string; icon: IconName };

export function BottomNav({
  tabs,
  active,
  onChange,
}: {
  tabs: NavTab[];
  active: string;
  onChange?: (id: string) => void;
}) {
  return (
    <nav className="flex items-stretch justify-around border-t border-line bg-ink px-2 py-2">
      {tabs.map((t) => {
        const isActive = t.id === active;
        return (
          <button
            key={t.id}
            onClick={() => onChange?.(t.id)}
            className={`flex flex-1 flex-col items-center gap-1 rounded-xl py-1 text-[10px] font-bold ${
              isActive ? 'text-accent' : 'text-muted'
            }`}
          >
            <Icon name={t.icon} size={20} />
            {t.label}
          </button>
        );
      })}
    </nav>
  );
}
