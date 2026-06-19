import { useCallback, useEffect, useState } from 'react';
import { BrandMark } from './components/brand/BrandMark';
import { DeviceFrame } from './components/DeviceFrame';
import { SceneNav } from './components/SceneNav';
import {
  DEFAULT_VERSION_ID,
  SHOW_SWITCHER,
  getVersion,
  versionFromUrl,
  versions,
} from './versions/registry';
import { VersionSwitcher } from './versions/VersionSwitcher';
import { DigitalTwin } from './versions/v2/twin/DigitalTwin';

export default function App() {
  const [versionId, setVersionId] = useState(
    () => getVersion(versionFromUrl() ?? DEFAULT_VERSION_ID).id,
  );
  const [index, setIndex] = useState(0);

  const version = getVersion(versionId);
  const scenes = version.scenes;
  const scene = scenes[index] ?? scenes[0];
  const SceneComponent = scene.component;

  const selectVersion = useCallback((id: string) => {
    setVersionId(id);
    setIndex(0);
  }, []);

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

  return (
    <div className="min-h-screen bg-ink">
      {/* top bar */}
      <header className="flex items-center justify-between border-b border-line px-6 py-4">
        <BrandMark wordmark="Lloyds" subtext="CIB Relationship · concept" />
        <div className="flex items-center gap-3">
          {SHOW_SWITCHER && (
            <VersionSwitcher
              versions={versions}
              activeId={version.id}
              onSelect={selectVersion}
            />
          )}
          <span className="rounded-full border border-line px-3 py-1 text-xs font-semibold text-muted">
            CIB &amp; BCB
          </span>
          <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-bold text-accent">
            Concept demo
          </span>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl gap-8 px-6 py-8">
        {/* navigator */}
        <SceneNav
          scenes={scenes}
          index={index}
          onSelect={setIndex}
          onPrev={goPrev}
          onNext={goNext}
        />

        {/* stage */}
        <main className="flex min-w-0 flex-1 flex-col items-center">
          <div className="flex w-full min-w-0 flex-1 items-center justify-center py-2">
            <DeviceFrame device={scene.device}>
              <SceneComponent />
            </DeviceFrame>
          </div>
          {/* presenter caption */}
          <div className="mt-6 max-w-xl text-center">
            <h1 className="text-lg font-extrabold">{scene.title}</h1>
            <p className="mt-1 text-sm text-muted">{scene.caption}</p>
          </div>
        </main>
      </div>

      {/* always-on digital twin — v2 only */}
      {version.id === 'v2' && <DigitalTwin onNavigate={goToScene} />}
    </div>
  );
}
