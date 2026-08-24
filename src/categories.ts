import type { Category } from './types';

export const CATEGORIES: Category[] = [
  { id: 'reveal', name: 'Opening & Reveal', short: 'Reveal', icon: 'DoorOpen', blurb: 'Cinematic ways to unveil an invitation.' },
  { id: 'text', name: 'Text Effects', short: 'Text', icon: 'Type', blurb: 'How your invitation words come alive.' },
  { id: 'photo', name: 'Photo Effects', short: 'Photos', icon: 'Image', blurb: 'Reveal, animate and frame your photos.' },
  { id: 'gallery', name: 'Photo Galleries', short: 'Galleries', icon: 'LayoutGrid', blurb: 'Interactive gallery experiences.' },
  { id: 'scroll', name: 'Scroll Effects', short: 'Scroll', icon: 'ScrollText', blurb: 'Effects that respond to scrolling.' },
  { id: 'transition', name: 'Page Transitions', short: 'Transitions', icon: 'ArrowLeftRight', blurb: 'Cinematic transitions between screens.' },
  { id: 'festive', name: 'Festive Effects', short: 'Festive', icon: 'Sparkles', blurb: 'Marigolds, diyas, particles and aura.' },
  { id: 'interactive', name: 'Interactive Effects', short: 'Interactive', icon: 'Hand', blurb: 'Effects triggered by touch and cursor.' },
  { id: 'background', name: 'Background Effects', short: 'Background', icon: 'Wallpaper', blurb: 'Living backgrounds for any screen.' },
  { id: 'premium', name: 'Premium Cinematic', short: 'Cinematic', icon: 'Crown', blurb: 'Luxe, cinematic, multi-layer effects.' },
  { id: 'micro', name: 'Micro Interactions', short: 'Micro', icon: 'MousePointerClick', blurb: 'Small polish details that delight.' },
  { id: 'music', name: 'Music & Audio', short: 'Music', icon: 'Music', blurb: 'Audio interactions and visualizations.' },
  { id: 'modern', name: 'Modern & Trendy', short: 'Modern', icon: 'Zap', blurb: 'Cutting-edge, trendy effects for next-gen invitations.' },
];

export const CATEGORY_MAP: Record<string, Category> = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c]),
);

export const PACKAGE_TIERS: { id: 'basic' | 'standard' | 'premium'; label: string; price: string; perks: string[]; color: string }[] = [
  { id: 'basic', label: 'Basic', price: '₹150', perks: ['Fade & Slide', 'Simple Reveal', 'Basic Text'], color: 'forest' },
  { id: 'standard', label: 'Standard', price: '₹200', perks: ['Photo & Video Effects', 'Music Effects', 'Scroll Effects', 'Standard Particles'], color: 'saffron' },
  { id: 'premium', label: 'Premium', price: '₹399', perks: ['Cinematic 3D', 'Advanced Particles', 'Luxury Reveals', 'Complex Transitions'], color: 'gold' },
];
