import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Play } from 'lucide-react';
import { EFFECT_MAP } from '@/effects/registry';
import { CATEGORY_MAP } from '@/categories';
import type { Effect } from '@/types';

interface FavoritesPanelProps {
  open: boolean;
  onClose: () => void;
  favorites: string[];
  onToggleFav: (id: string) => void;
  onFullPreview: (e: Effect) => void;
}

export function FavoritesPanel({ open, onClose, favorites, onToggleFav, onFullPreview }: FavoritesPanelProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] bg-forest-950/70 backdrop-blur-sm" onClick={onClose}>
          <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="absolute left-0 top-0 bottom-0 w-full max-w-md bg-forest-900 border-r border-gold-400/20 flex flex-col">
            
            <div className="flex items-center justify-between p-5 border-b border-cream-200/8">
              <div>
                <h2 className="font-display text-xl text-cream-50 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-maroon-400" /> My Favorites
                </h2>
                <p className="text-xs text-cream-200/50 mt-0.5">{favorites.length} favorited effects</p>
              </div>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-forest-800 text-cream-200/70"><X className="w-5 h-5" /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {favorites.length === 0 ? (
                <div className="text-center py-16 text-cream-200/40">
                  <Heart className="w-10 h-10 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">No favorites yet.</p>
                  <p className="text-xs mt-1">Tap the heart on any effect to save it here.</p>
                </div>
              ) : (
                favorites.map((id) => {
                  const effect = EFFECT_MAP[id];
                  if (!effect) return null;
                  const cat = CATEGORY_MAP[effect.category];
                  return (
                    <div key={id} className="flex items-center gap-3 rounded-lg border border-cream-200/8 bg-forest-800/40 p-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-cream-100 font-medium truncate">{effect.name}</p>
                        <p className="text-[10px] text-cream-200/50">{cat?.short} · {effect.difficulty}</p>
                      </div>
                      <button onClick={() => { onFullPreview(effect); onClose(); }} className="p-1.5 rounded text-gold-300 hover:bg-gold-500/10"><Play className="w-3.5 h-3.5" /></button>
                      <button onClick={() => onToggleFav(id)} className="p-1.5 rounded text-maroon-400 hover:bg-maroon-500/10"><Heart className="w-3.5 h-3.5 fill-maroon-400" /></button>
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
