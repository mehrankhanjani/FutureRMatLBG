import { useCallback, useEffect, useState } from 'react';
import { BrandMark } from './components/brand/BrandMark';
import { DeviceFrame } from './components/DeviceFrame';
import { SceneNav } from './components/SceneNav';
import { Icon } from './ui/icons';
import {
  DEFAULT_VERSION_ID,
  SHOW_SWITCHER,
  getVersion,
  versionFromUrl,
  versions,
} from './versions/registry';
import { VersionSwitcher } from './versions/VersionSwitcher';
import { DigitalTwin } from './versions/v2/twin/DigitalTwin';
import { callouts } from './versions/v2/callouts';

export default function App() {
  const [versionId, setVersionId] = useState(
    () => getVersion(versionFromUrl() ?? DEFAULT_VERSION_ID).id,
  );
  const [index, setIndex] = useState(0);

  const version = getVersion(versionId);
  const scenes = version.scenes;
  const scene = scenes[index] ?? scenes[0];
  const SceneComponent = scene.component;
  const callout = version.id === 'v2' ? callouts[scene.id] : undefined;

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
      <header className="flex items-center justify-between border-b border-line px-8 py-4">
        <BrandMark wordmark="Lloyds" subtext="CIB Relationship · concept" />
        <div className="flex items-center gap-3">
          {SHOW_SWITCHER && (
            <VersionSwitcher
              versions={versions}
              activeId={version.id}
              onSelect={selectVersion}
            />
          )}
        </div>
      </header>

      <div className="px-8 py-6">
        {/* presenter call-out — full-width banner across the whole stage */}
        <div className="mb-6 w-full rounded-2xl border border-line border-l-4 border-l-accent bg-surface px-5 py-4">
          <h1 className="text-lg font-extrabold">{scene.title}</h1>
          {callout ? (
            <>
              <p className="mt-1 text-sm text-muted">{callout.concept}</p>
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
            </>
          ) : (
            <p className="mt-0.5 text-sm text-muted">{scene.caption}</p>
          )}
        </div>

        <div className="flex gap-6">
          {/* navigator */}
          <SceneNav scenes={scenes} index={index} onSelect={setIndex} />

          {/* device stage */}
          <main className="flex min-w-0 flex-1 items-center justify-center py-2">
            <DeviceFrame device={scene.device}>
              <SceneComponent />
            </DeviceFrame>
          </main>
        </div>
      </div>

      {/* always-on digital twin — v2 only */}
      {version.id === 'v2' && <DigitalTwin onNavigate={goToScene} />}
    </div>
  );
}
