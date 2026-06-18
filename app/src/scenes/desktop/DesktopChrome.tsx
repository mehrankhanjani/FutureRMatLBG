import type { ReactNode } from 'react';
import { Icon, type IconName } from '../../ui/icons';
import { Avatar } from '../../ui/primitives';
import { BrandMark } from '../../components/brand/BrandMark';
import { client } from '../../data/scenario';

type NavId = 'summary' | 'bench' | 'radar' | 'graph';

const nav: { id: NavId; label: string; icon: IconName }[] = [
  { id: 'summary', label: 'Client 360', icon: 'doc' },
  { id: 'bench', label: 'Agent bench', icon: 'bot' },
  { id: 'radar', label: 'Opportunities', icon: 'target' },
  { id: 'graph', label: 'Relationships', icon: 'heart' },
];

/**
 * DesktopChrome — shared cockpit frame for desktop scenes: a left icon rail,
 * a top bar with page title + client + RM, and a scrollable content area.
 */
export function DesktopChrome({
  active,
  title,
  subtitle,
  children,
}: {
  active: NavId;
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex h-full bg-ink text-text">
      {/* left rail */}
      <aside className="flex w-16 shrink-0 flex-col items-center gap-1 border-r border-line py-4">
        <div className="mb-4">
          <BrandMark withWordmark={false} size={22} />
        </div>
        {nav.map((n) => {
          const isActive = n.id === active;
          return (
            <div
              key={n.id}
              className={`flex w-12 flex-col items-center gap-1 rounded-xl py-2 text-[9px] font-bold ${
                isActive ? 'bg-accent/15 text-accent' : 'text-muted'
              }`}
            >
              <Icon name={n.icon} size={18} />
              {n.label.split(' ')[0]}
            </div>
          );
        })}
      </aside>

      {/* main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* top bar */}
        <header className="flex items-center justify-between border-b border-line px-6 py-3">
          <div>
            <h2 className="text-base font-extrabold leading-tight">{title}</h2>
            {subtitle && <p className="text-xs text-muted">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full bg-surface px-3 py-1.5">
              <Avatar initials={client.initials} size={24} />
              <span className="text-xs font-bold">{client.name.split(' ')[0]} Components</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-line px-3 py-1.5">
              <Avatar initials="JO" size={24} tone="muted" />
              <span className="text-xs font-semibold text-muted">{client.rm}</span>
            </div>
          </div>
        </header>

        {/* scroll area */}
        <main className="no-scrollbar flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
