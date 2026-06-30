import { Icon, type IconName } from '../../../ui/icons';
import { useSceneNav } from '../../../sceneNavContext';

export type SceneTab = { icon: IconName; label: string; sceneId: string };

/**
 * Sub-tabs that sit at the top of scenes which share a desktop nav tab, letting
 * the viewer jump between the two zoom levels / stages of the same tab.
 *
 *   Portfolio   → ignition  ⇄ scale
 *   Deal desk   → structure ⇄ orchestrate
 *   Client 360  → capture   ⇄ unified
 *   Relationships → relationship ⇄ review
 */
export function SceneTabs({ active, tabs }: { active: string; tabs: SceneTab[] }) {
  const nav = useSceneNav();
  return (
    <div className="anim-fadeUp mb-4 inline-flex items-center gap-1 rounded-full border border-line bg-surface p-1">
      {tabs.map((t) => {
        const isActive = t.sceneId === active;
        return (
          <button
            key={t.sceneId}
            onClick={() => nav?.goToScene(t.sceneId)}
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
              isActive ? 'bg-accent/15 text-accent' : 'text-muted hover:text-text'
            }`}
          >
            <Icon name={t.icon} size={14} />
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

export const PORTFOLIO_TABS: SceneTab[] = [
  { icon: 'zap', label: 'This opportunity', sceneId: 'ignition' },
  { icon: 'target', label: 'Across the book', sceneId: 'scale' },
];

export const DEAL_DESK_TABS: SceneTab[] = [
  { icon: 'building', label: 'Structure', sceneId: 'structure' },
  { icon: 'bot', label: 'Orchestrate', sceneId: 'orchestrate' },
];

export const CLIENT_360_TABS: SceneTab[] = [
  { icon: 'doc', label: 'Post-meeting', sceneId: 'capture' },
  { icon: 'globe', label: 'Unified view', sceneId: 'unified' },
];

export const RELATIONSHIP_TABS: SceneTab[] = [
  { icon: 'heart', label: 'Intelligence', sceneId: 'relationship' },
  { icon: 'clock', label: 'Review', sceneId: 'review' },
];
