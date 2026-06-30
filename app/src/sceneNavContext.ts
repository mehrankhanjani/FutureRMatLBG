import { createContext, useContext } from 'react';

type SceneNavValue = { goToScene: (id: string) => void };

/** Lets in-scene controls (e.g. the Portfolio tabs) jump to another scene. */
export const SceneNavContext = createContext<SceneNavValue | null>(null);

export function useSceneNav() {
  return useContext(SceneNavContext);
}
