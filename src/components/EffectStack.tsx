import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Eye, GripVertical, ArrowUp, ArrowDown, Wand2 } from 'lucide-react';
import { EFFECT_MAP } from '@/effects/registry';
import { CATEGORY_MAP } from '@/categories';

interface EffectStackProps {
  open: boolean;
  onClose: () => void;
  stack: string[];
  onRemove: (id: string) => void;
  onReorder: (from: number, to: number) => void;
  onClear: () => void;
  onPreview: () => void;
}

export function EffectStackPanel({ open, onClose, stack, onRemove, onReorder, onClear, onPreview }: EffectStackProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] bg-forest-950/70 backdrop-blur-sm" onClick={onClose}>
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-forest-900 border-l border-gold-400/20 flex flex-col">
            
            <div className="flex items-center justify-between p-5 border-b border-cream-200/8">
              <div>
                <h2 className="font-display text-xl text-cream-50 flex items-center gap-2">
                  <Wand2 className="w-4 h-4 text-gold-400" /> My Effect Stack
                </h2>
                <p className="text-xs text-cream-200/50 mt-0.5">{stack.length} effects selected</p>
              </div>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-forest-800 text-cream-200/70"><X className="w-5 h-5" /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {stack.length === 0 ? (
                <div className="text-center py-16 text-cream-200/40">
                  <Wand2 className="w-10 h-10 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">No effects yet.</p>
                  <p className="text-xs mt-1">Click "Use Effect" on any card to add it here.</p>
                </div>
              ) : (
                stack.map((id, idx) => {
                  const effect = EFFECT_MAP[id];
                  if (!effect) return null;
                  const cat = CATEGORY_MAP[effect.category];
                  return (
                    <motion.div key={id} layout initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-2 rounded-lg border border-cream-200/8 bg-forest-800/40 p-3">
                      <div className="flex flex-col">
                        <button onClick={() => onReorder(idx, Math.max(0, idx - 1))} disabled={idx === 0} className="text-cream-200/50 hover:text-gold-300 disabled:opacity-20"><ArrowUp className="w-3 h-3" /></button>
                        <GripVertical className="w-3 h-3 text-cream-200/30" />
                        <button onClick={() => onReorder(idx, Math.min(stack.length - 1, idx + 1))} disabled={idx === stack.length - 1} className="text-cream-200/50 hover:text-gold-300 disabled:opacity-20"><ArrowDown className="w-3 h-3" /></button>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-gold-500/20 border border-gold-400/30 flex items-center justify-center text-[10px] font-bold text-gold-300">{idx + 1}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-cream-100 font-medium truncate">{effect.name}</p>
                        <p className="text-[10px] text-cream-200/50">{cat?.short} · {effect.duration}s</p>
                      </div>
                      <button onClick={() => onRemove(id)} className="p-1.5 rounded text-cream-200/40 hover:text-maroon-400 hover:bg-maroon-500/10"><Trash2 className="w-3.5 h-3.5" /></button>
                    </motion.div>
                  );
                })
              )}
            </div>

            {stack.length > 0 && (
              <div className="p-4 border-t border-cream-200/8 space-y-2">
                <button onClick={onPreview} className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-gold-500 py-3 text-sm font-semibold text-forest-950 hover:shadow-gold">
                  <Eye className="w-4 h-4" /> Preview My Invitation
                </button>
                <button onClick={onClear} className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-forest-800 border border-cream-200/10 py-2.5 text-xs font-medium text-cream-200/70 hover:border-maroon-400/30 hover:text-maroon-400">
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
