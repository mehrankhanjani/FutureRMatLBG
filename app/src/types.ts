import type { ComponentType } from 'react';

export type DeviceType = 'mobile' | 'desktop' | 'custom';

export type Scene = {
  id: string;
  /** Short label shown in the navigator */
  title: string;
  /** Longer caption shown under the device for the presenter */
  caption: string;
  /** Which device frame this scene renders inside */
  device: DeviceType;
  /** Chapter grouping for the pitch narrative */
  chapter: string;
  /** The scene component */
  component: ComponentType;
};
