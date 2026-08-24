import { useMemo } from 'react';
import { motion } from 'framer-motion';
import type { Effect, Package } from '@/types';
import { EffectCard } from './EffectCard';
import { ScrollDemoArea } from '@/effects/scroll';
import { CATEGORY_MAP } from '@/categories';
import * as Icons from 'lucide-react';

interface EffectGridProps {
  effects: Effect[];
  category: string;
  search: string;
  packageFilter: Package | 'all';
  favorites: string[];
  stack: string[];
  onToggleFav: (id: string) => void;
  onAddToStack: (id: string) => void;
  onFullPreview: (e: Effect) => void;
  onUseEffect: (e: Effect) => void;
}

export function EffectGrid({ effects, category, search, packageFilter, favorites, stack, onToggleFav, onAddToStack, onFullPreview, onUseEffect }: EffectGridProps) {
  const filtered = useMemo(() => {
    let list = effects;
    if (category !== 'all') list = list.filter((e) => e.category === category);
    if (packageFilter !== 'all') list = list.filter((e) => e.package.includes(packageFilter));
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((e) =>
        e.name.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.tags.some((t) => t.includes(q)) ||
        e.package.some((p) => p.includes(q))
      );
    }
    return list;
  }, [effects, category, packageFilter, search]);

  const cat = CATEGORY_MAP[category];

  const renderIcon = (iconName: string, className: string) => {
    const Icon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[iconName];
    return Icon ? <Icon className={className} /> : null;
  };

  return (
    <section id="effects" className="mx-auto max-w-7xl px-4 py-12">
      {/* Animated header */}
      <motion.div key={category}
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="mb-6 flex items-center gap-3">
        {cat && (
          <div className="w-11 h-11 rounded-xl bg-gold-500/15 border border-gold-400/30 flex items-center justify-center flex-shrink-0">
            {renderIcon(cat.icon, 'w-5 h-5 text-gold-300')}
          </div>
        )}
        <div>
          <h2 className="font-display text-3xl md:text-4xl text-cream-50">
            {category === 'all' ? 'All Effects' : cat?.name || category}
          </h2>
          <p className="mt-0.5 text-sm text-cream-200/60">{category === 'all' ? 'The complete effect library' : cat?.blurb || ''}</p>
        </div>
      </motion.div>

      {category === 'scroll' && <ScrollDemoArea />}

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-cream-200/40">
          <p className="text-lg font-display">No effects found</p>
          <p className="text-sm mt-2">Try a different search or filter.</p>
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((effect) => (
            <EffectCard key={effect.id} effect={effect}
              isFav={favorites.includes(effect.id)} inStack={stack.includes(effect.id)}
              onToggleFav={onToggleFav} onAddToStack={onAddToStack}
              onFullPreview={onFullPreview} onUseEffect={onUseEffect} />
          ))}
        </motion.div>
      )}
    </section>
  );
}
