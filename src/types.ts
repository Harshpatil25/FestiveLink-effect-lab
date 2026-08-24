import type { ComponentType } from 'react';

export type Package = 'basic' | 'standard' | 'premium';

export type CategoryId =
  | 'reveal'
  | 'text'
  | 'photo'
  | 'gallery'
  | 'scroll'
  | 'transition'
  | 'festive'
  | 'interactive'
  | 'background'
  | 'premium'
  | 'micro'
  | 'music'
  | 'modern';

export interface EffectControl {
  key: string;
  label: string;
  min: number;
  max: number;
  step: number;
  default: number;
  unit?: string;
}

export interface Effect {
  id: string;
  name: string;
  category: CategoryId;
  description: string;
  tags: string[];
  package: Package[];
  duration: number; // seconds
  difficulty: 'Easy' | 'Medium' | 'Advanced';
  recommendedFor: string;
  premium?: boolean;
  controls?: EffectControl[];
  preview: PreviewComponent;
}

export type PreviewProps = {
  playing: boolean;
  resetKey: number;
  controls: Record<string, number>;
  mobile?: boolean;
};

export type PreviewComponent = ComponentType<PreviewProps>;

export interface Category {
  id: CategoryId;
  name: string;
  short: string;
  icon: string; // lucide icon name
  blurb: string;
}
