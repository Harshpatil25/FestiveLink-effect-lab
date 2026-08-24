import { useState, useRef } from 'react';
import { Play, Pause, RotateCcw, Maximize2, Heart, Layers, Sparkles, Crown } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Effect, Package } from '@/types';
import { CATEGORY_MAP } from '@/categories';
import { useInView } from '@/lib/hooks';

interface EffectCardProps {
  effect: Effect;
  isFav: boolean;
  inStack: boolean;
  onToggleFav: (id: string) => void;
  onAddToStack: (id: string) => void;
  onFullPreview: (effect: Effect) => void;
  onUseEffect: (effect: Effect) => void;
}

const PACKAGE_STYLES: Record<Package, string> = {
  basic: 'bg-forest-600/40 text-forest-200 border-forest-400/30',
  standard: 'bg-saffron-500/15 text-saffron-300 border-saffron-400/30',
  premium: 'bg-gold-500/15 text-gold-300 border-gold-400/40',
};

export function EffectCard({ effect, isFav, inStack, onToggleFav, onAddToStack, onFullPreview, onUseEffect }: EffectCardProps) {
  const [ref, inView] = useInView<HTMLDivElement>(0.15);
  const [playing, setPlaying] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [hovered, setHovered] = useState(false);
  const controls = useRef<Record<string, number>>({});
  effect.controls?.forEach((c) => { if (controls.current[c.key] === undefined) controls.current[c.key] = c.default; });

  const Preview = effect.preview;
  const cat = CATEGORY_MAP[effect.category];
  const active = inView && (hovered || playing);

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => { setHovered(true); setPlaying(true); }}
      onMouseLeave={() => { setHovered(false); setPlaying(false); }}
      whileHover={{ y: -4 }}
      className="group relative flex flex-col rounded-2xl border border-cream-200/8 bg-forest-900/50 overflow-hidden transition-all duration-300 hover:border-gold-400/30 hover:shadow-card">

      {/* Live preview area */}
      <div className="relative aspect-[4/3] bg-forest-950 overflow-hidden">
        <Preview playing={active} resetKey={resetKey} controls={controls.current} />

        {/* Premium badge */}
        {effect.premium && (
          <div className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-full bg-gold-500/20 backdrop-blur border border-gold-400/40 px-2 py-0.5">
            <Crown className="w-2.5 h-2.5 text-gold-300" />
            <span className="text-[9px] font-bold tracking-wider text-gold-300">PREMIUM</span>
          </div>
        )}

        {/* Favorite button */}
        <button onClick={() => onToggleFav(effect.id)}
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-forest-950/60 backdrop-blur flex items-center justify-center transition-all duration-200 hover:bg-forest-950/80 hover:scale-110">
          <motion.span animate={{ scale: isFav ? [1, 1.3, 1] : 1 }} transition={{ duration: 0.3 }}>
            <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-maroon-400 text-maroon-400' : 'text-cream-200/60'}`} />
          </motion.span>
        </button>

        {/* Hover overlay controls */}
        <div className="absolute bottom-2 left-2 right-2 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button onClick={(e) => { e.stopPropagation(); setPlaying((p) => !p); }}
            className="flex-1 inline-flex items-center justify-center gap-1 rounded-md bg-forest-950/70 backdrop-blur py-1.5 text-[10px] text-cream-100 hover:bg-forest-950/90 transition-colors">
            {playing ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            {playing ? 'Pause' : 'Play'}
          </button>
          <button onClick={(e) => { e.stopPropagation(); setResetKey((k) => k + 1); }}
            className="w-7 h-7 rounded-md bg-forest-950/70 backdrop-blur flex items-center justify-center text-cream-100 hover:bg-forest-950/90 transition-colors">
            <RotateCcw className="w-3 h-3" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); onFullPreview(effect); }}
            className="w-7 h-7 rounded-md bg-forest-950/70 backdrop-blur flex items-center justify-center text-cream-100 hover:bg-forest-950/90 transition-colors">
            <Maximize2 className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Card content */}
      <div className="flex flex-col flex-1 p-3.5">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-display text-base text-cream-50 font-semibold leading-tight">{effect.name}</h3>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] text-gold-400/70 font-medium tracking-wide">{cat?.short}</span>
          <span className="text-[10px] text-cream-200/40">·</span>
          <span className="text-[10px] text-cream-200/50">{effect.difficulty}</span>
        </div>
        <p className="text-xs text-cream-200/60 leading-relaxed mb-3 flex-1">{effect.description}</p>

        {/* Package badges */}
        <div className="flex flex-wrap gap-1 mb-3">
          {effect.package.map((p) => (
            <span key={p} className={`inline-flex items-center rounded border px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wide ${PACKAGE_STYLES[p]}`}>{p}</span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-1.5">
          <button onClick={() => onFullPreview(effect)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-forest-800/60 border border-cream-200/10 py-2 text-[11px] font-medium text-cream-100 transition-all duration-200 hover:border-gold-400/30 hover:bg-forest-800">
            <Play className="w-3 h-3" /> Full Preview
          </button>
          <button onClick={() => onUseEffect(effect)}
            className={`flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg py-2 text-[11px] font-medium transition-all duration-200 ${inStack ? 'bg-gold-500/20 text-gold-300 border border-gold-400/40' : 'bg-gold-500 text-forest-950 hover:shadow-gold'}`}>
            {inStack ? <Sparkles className="w-3 h-3" /> : <Layers className="w-3 h-3" />}
            {inStack ? 'In Stack' : 'Use Effect'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
