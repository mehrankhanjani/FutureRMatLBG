import { useCallback, useEffect, useState } from 'react';
import { BrandMark } from './components/brand/BrandMark';
import { DeviceFrame } from './components/DeviceFrame';
import { SceneNav } from './components/SceneNav';
import { Icon } from './ui/icons';
import {
  DEFAULT_VERSION_ID,
  LOCKED_VERSION_IDS,
  SHOW_SWITCHER,
  getVersion,
  versionFromUrl,
  versions,
} from './versions/registry';
import { VersionSwitcher } from './versions/VersionSwitcher';
import { DigitalTwin } from './versions/v2/twin/DigitalTwin';
import { DigitalTwin as DigitalTwinV3 } from './versions/v3/twin/DigitalTwin';
import { callouts as calloutsV2 } from './versions/v2/callouts';
import { callouts as calloutsV3 } from './versions/v3/callouts';
import { HelpProvider, ExplainToggle, HelpDrawer } from './versions/v3/help/Help';
import { SceneNavContext } from './sceneNavContext';

/** The five RM-journey components, mapped to the scenes that own them (3-2-1-2-2). */
type ComponentId = 'identify' | 'qualify' | 'shape' | 'handover' | 'deepen';
const COMPONENTS: { id: ComponentId; label: string; sceneIds: string[] }[] = [
  { id: 'identify', label: 'Identify', sceneIds: ['ignition', 'relationship', 'scale'] },
  { id: 'qualify', label: 'Qualify', sceneIds: ['activate', 'shape'] },
  { id: 'shape', label: 'Shape', sceneIds: ['structure'] },
  { id: 'handover', label: 'Handover', sceneIds: ['capture', 'orchestrate'] },
  { id: 'deepen', label: 'Deepen', sceneIds: ['unified', 'review'] },
];

function ComponentTabs({
  active,
  onSelect,
}: {
  active: ComponentId | null;
  onSelect: (id: ComponentId | null) => void;
}) {
  return (
    <div className="flex items-center gap-1 rounded-full border border-line bg-surface p-1">
      {COMPONENTS.map((c) => {
        const on = active === c.id;
        return (
          <button
            key={c.id}
            onClick={() => onSelect(on ? null : c.id)}
            aria-pressed={on}
            className={`rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide transition ${
              on ? 'bg-accent text-on-accent' : 'text-muted hover:text-text'
            }`}
          >
            {c.label}
          </button>
        );
      })}
    </div>
  );
}

export default function App() {
  const [versionId, setVersionId] = useState(
    () => getVersion(versionFromUrl() ?? DEFAULT_VERSION_ID).id,
  );
  const [index, setIndex] = useState(0);
  const [calloutOpen, setCalloutOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState<ComponentId | null>(null);

  const version = getVersion(versionId);
  // Iterations 3 and 4 share the same enriched narrative layer (callouts,
  // explain-mode help and the REO digital twin); v4 only restyles the cards.
  const isV3Like = version.id === 'v3' || version.id === 'v4';
  const scenes = version.scenes;
  const scene = scenes[index] ?? scenes[0];
  const SceneComponent = scene.component;
  const calloutMap = isV3Like ? calloutsV3 : version.id === 'v2' ? calloutsV2 : undefined;
  const callout = calloutMap?.[scene.id];

  const selectVersion = useCallback((id: string) => {
    setVersionId(id);
    setIndex(0);
    setActiveComponent(null);
  }, []);

  const highlightIds =
    activeComponent ? COMPONENTS.find((c) => c.id === activeComponent)?.sceneIds ?? null : null;

  const goPrev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);
  const goNext = useCallback(
    () => setIndex((i) => Math.min(scenes.length - 1, i + 1)),
    [scenes.length],
  );

  const goToScene = useCallback(
    (id: string) => {
      const i = scenes.findIndex((s) => s.id === id);
      if (i >= 0) setIndex(i);
    },
    [scenes],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goPrev, goNext]);

  // collapse the call-out whenever the scene changes
  useEffect(() => {
    setCalloutOpen(false);
  }, [index]);

  return (
    <HelpProvider>
    <SceneNavContext.Provider value={{ goToScene }}>
    <div className="min-h-screen bg-ink">
      {/* top bar */}
      <header className="relative flex items-center justify-between border-b border-line px-8 py-4">
        <BrandMark wordmark="Lloyds" subtext="CIB Relationship · concept" />
        {isV3Like && (
          <div className="absolute left-1/2 -translate-x-1/2">
            <ComponentTabs active={activeComponent} onSelect={setActiveComponent} />
          </div>
        )}
        <div className="flex items-center gap-3">
          {isV3Like && <ExplainToggle />}
          {SHOW_SWITCHER && (
            <VersionSwitcher
              versions={versions}
              activeId={version.id}
              onSelect={selectVersion}
              lockedIds={LOCKED_VERSION_IDS}
            />
          )}
        </div>
      </header>

      <div className="px-8 py-6">
        {/* presenter call-out — full-width banner across the whole stage */}
        <div className="mb-6 w-full rounded-2xl border border-line border-l-4 border-l-accent bg-surface px-5 py-4">
          <button
            onClick={() => setCalloutOpen((o) => !o)}
            aria-expanded={calloutOpen}
            className="flex w-full items-center gap-2 text-left"
          >
            <h1 className="text-lg font-extrabold">
              {scene.title}
              {scene.subtitle && (
                <span className="font-semibold text-muted">: {scene.subtitle}</span>
              )}
            </h1>
            <Icon
              name="chevronRight"
              size={18}
              className={`ml-auto shrink-0 text-muted transition-transform ${calloutOpen ? 'rotate-90' : ''}`}
            />
          </button>
          {calloutOpen &&
            (callout ? (
              <div className="anim-fadeUp">
                <p className="mt-2 text-sm text-muted">{callout.concept}</p>
                <ul className="mt-2.5 flex flex-wrap gap-x-5 gap-y-1.5">
                  {callout.benefits.map((b) => (
                    <li key={b} className="flex items-center gap-1.5 text-xs text-text">
                      <Icon name="check" size={12} className="text-accent" /> {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-3 inline-flex items-center gap-2 rounded-xl bg-accent/10 px-3 py-2 text-xs">
                  <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-on-accent">
                    {callout.outcome.label}
                  </span>
                  <span className="font-semibold text-text">{callout.outcome.text}</span>
                </div>
              </div>
            ) : (
              <p className="anim-fadeUp mt-2 text-sm text-muted">{scene.caption}</p>
            ))}
        </div>

        <div className="flex gap-6">
          {/* navigator */}
          <SceneNav
            scenes={scenes}
            index={index}
            onSelect={setIndex}
            highlightIds={highlightIds}
          />

          {/* device stage */}
          <main className="flex min-w-0 flex-1 items-center justify-center py-2">
            <DeviceFrame device={scene.device}>
              <SceneComponent />
            </DeviceFrame>
          </main>
        </div>
      </div>

      {/* always-on digital twin */}
      {version.id === 'v2' && <DigitalTwin onNavigate={goToScene} />}
      {isV3Like && <DigitalTwinV3 onNavigate={goToScene} />}

      {/* explain-mode help drawer — iterations 3 & 4 */}
      {isV3Like && <HelpDrawer />}
    </div>
    </SceneNavContext.Provider>
    </HelpProvider>
  );
}
