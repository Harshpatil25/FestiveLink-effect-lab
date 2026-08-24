import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Maximize, X, Smartphone, Monitor, Copy, Check, Plus, Crown } from 'lucide-react';
import type { Effect } from '@/types';
import { CATEGORY_MAP } from '@/categories';
import { usePreviewKeys } from '@/lib/state';

interface FullPreviewProps {
  effect: Effect | null;
  onClose: () => void;
  inStack: boolean;
  onAddToStack: (id: string) => void;
}

export function FullPreviewModal({ effect, onClose, inStack, onAddToStack }: FullPreviewProps) {
  const [playing, setPlaying] = useState(true);
  const [resetKey, setResetKey] = useState(0);
  const [mobile, setMobile] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [controls, setControls] = useState<Record<string, number>>({});
  const [copied, setCopied] = useState(false);

  // Reset controls when effect changes
  const effectiveControls = (() => {
    const c: Record<string, number> = {};
    effect?.controls?.forEach((ctrl) => { c[ctrl.key] = controls[ctrl.key] ?? ctrl.default; });
    return c;
  })();

  const keyRef = usePreviewKeys(
    () => setPlaying((p) => !p),
    () => setResetKey((k) => k + 1),
    onClose,
  );

  if (!effect) return null;
  const Preview = effect.preview;
  const cat = CATEGORY_MAP[effect.category];

  const copyConfig = () => {
    const cfg = { effect: effect.name, id: effect.id, package: effect.package, recommendedFor: effect.recommendedFor, duration: effect.duration, controls: effectiveControls };
    navigator.clipboard?.writeText(JSON.stringify(cfg, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <AnimatePresence>
      {effect && (
        <motion.div key={effect.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-6 bg-forest-950/90 backdrop-blur-md"
          onClick={onClose} ref={keyRef as React.RefObject<HTMLDivElement>} tabIndex={-1}>
          <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }}
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full ${fullscreen ? 'max-w-none h-full' : 'max-w-5xl'} bg-forest-900 rounded-2xl border border-gold-400/20 shadow-2xl overflow-hidden flex flex-col`}>
            
            {/* Header */}
            <div className="flex items-start justify-between p-4 md:p-5 border-b border-cream-200/8">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="font-display text-xl md:text-2xl text-cream-50 font-semibold">{effect.name}</h2>
                  {effect.premium && <Crown className="w-4 h-4 text-gold-400" />}
                </div>
                <div className="flex items-center gap-3 text-xs text-cream-200/60">
                  <span className="text-gold-400/80">{cat?.name}</span>
                  <span>·</span>
                  <span>Recommended: {effect.recommendedFor}</span>
                  <span>·</span>
                  <span>{effect.duration}s</span>
                </div>
              </div>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-forest-800 text-cream-200/70 hover:text-cream-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex flex-1 flex-col lg:flex-row overflow-hidden">
              {/* Preview area */}
              <div className="flex-1 flex items-center justify-center p-4 md:p-8 bg-forest-950/50 min-h-[300px]">
                <div className={mobile
                  ? "relative w-[280px] h-[480px] rounded-[2rem] border-8 border-forest-800 bg-black overflow-hidden shadow-2xl"
                  : "relative w-full max-w-2xl aspect-video rounded-xl overflow-hidden shadow-2xl"}>
                  {mobile && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-forest-800 rounded-b-2xl z-10" />}
                  <div className={mobile ? "absolute inset-0 pt-6" : "absolute inset-0"}>
                    <Preview playing={playing} resetKey={resetKey} controls={effectiveControls} mobile={mobile} />
                  </div>
                </div>
              </div>

              {/* Controls sidebar */}
              <div className="lg:w-72 border-t lg:border-t-0 lg:border-l border-cream-200/8 p-4 md:p-5 flex flex-col gap-4 overflow-y-auto">
                {/* Description */}
                <div>
                  <h3 className="text-[10px] font-bold tracking-wider text-gold-400/70 mb-1.5">DESCRIPTION</h3>
                  <p className="text-sm text-cream-200/80 leading-relaxed">{effect.description}</p>
                </div>

                {/* Package compatibility */}
                <div>
                  <h3 className="text-[10px] font-bold tracking-wider text-gold-400/70 mb-1.5">PACKAGE COMPATIBILITY</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {effect.package.map((p) => (
                      <span key={p} className="rounded-md border border-gold-400/30 bg-gold-500/10 px-2 py-1 text-[10px] font-semibold uppercase text-gold-300">{p}</span>
                    ))}
                  </div>
                </div>

                {/* Device toggle */}
                <div>
                  <h3 className="text-[10px] font-bold tracking-wider text-gold-400/70 mb-1.5">PREVIEW DEVICE</h3>
                  <div className="flex gap-1 rounded-lg bg-forest-800/60 p-1">
                    <button onClick={() => setMobile(false)} className={`flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 rounded text-xs font-medium transition-all ${!mobile ? 'bg-gold-500 text-forest-950' : 'text-cream-200/60'}`}>
                      <Monitor className="w-3.5 h-3.5" /> Desktop
                    </button>
                    <button onClick={() => setMobile(true)} className={`flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 rounded text-xs font-medium transition-all ${mobile ? 'bg-gold-500 text-forest-950' : 'text-cream-200/60'}`}>
                      <Smartphone className="w-3.5 h-3.5" /> Mobile
                    </button>
                  </div>
                </div>

                {/* Adjustable controls */}
                {effect.controls && effect.controls.length > 0 && (
                  <div>
                    <h3 className="text-[10px] font-bold tracking-wider text-gold-400/70 mb-2">CONTROLS</h3>
                    <div className="space-y-3">
                      {effect.controls.map((ctrl) => (
                        <div key={ctrl.key}>
                          <div className="flex justify-between text-xs text-cream-200/70 mb-1">
                            <span>{ctrl.label}</span>
                            <span className="text-gold-300">{(controls[ctrl.key] ?? ctrl.default).toFixed(1)}{ctrl.unit || 'x'}</span>
                          </div>
                          <input type="range" min={ctrl.min} max={ctrl.max} step={ctrl.step}
                            value={controls[ctrl.key] ?? ctrl.default}
                            onChange={(e) => setControls((c) => ({ ...c, [ctrl.key]: parseFloat(e.target.value) }))}
                            className="w-full accent-gold-500" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Playback controls */}
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => setPlaying((p) => !p)} className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-gold-500 py-2.5 text-xs font-semibold text-forest-950 hover:shadow-gold">
                    {playing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />} {playing ? 'Pause' : 'Play'}
                  </button>
                  <button onClick={() => setResetKey((k) => k + 1)} className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-forest-800 border border-cream-200/10 py-2.5 text-xs font-medium text-cream-100 hover:border-gold-400/30">
                    <RotateCcw className="w-3.5 h-3.5" /> Replay
                  </button>
                  <button onClick={() => { setResetKey((k) => k + 1); setPlaying(false); setControls({}); }} className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-forest-800 border border-cream-200/10 py-2.5 text-xs font-medium text-cream-100 hover:border-gold-400/30">
                    <RotateCcw className="w-3.5 h-3.5" /> Reset
                  </button>
                  <button onClick={() => setFullscreen((f) => !f)} className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-forest-800 border border-cream-200/10 py-2.5 text-xs font-medium text-cream-100 hover:border-gold-400/30">
                    <Maximize className="w-3.5 h-3.5" /> {fullscreen ? 'Shrink' : 'Fullscreen'}
                  </button>
                </div>

                {/* Use effect config */}
                <div className="rounded-lg bg-forest-800/40 border border-cream-200/8 p-3 space-y-2">
                  <h3 className="text-[10px] font-bold tracking-wider text-gold-400/70">USE THIS EFFECT</h3>
                  <div className="text-xs text-cream-200/70 space-y-1">
                    <div className="flex justify-between"><span>Package:</span><span className="text-cream-100">{effect.package.join(', ')}</span></div>
                    <div className="flex justify-between"><span>Usage:</span><span className="text-cream-100">{effect.recommendedFor}</span></div>
                    <div className="flex justify-between"><span>Duration:</span><span className="text-cream-100">{effect.duration}s</span></div>
                  </div>
                  <div className="flex gap-1.5 pt-1">
                    <button onClick={copyConfig} className="flex-1 inline-flex items-center justify-center gap-1 rounded-md bg-forest-700 py-1.5 text-[10px] text-cream-100 hover:bg-forest-600">
                      {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />} {copied ? 'Copied' : 'Copy Config'}
                    </button>
                    <button onClick={() => onAddToStack(effect.id)} className={`flex-1 inline-flex items-center justify-center gap-1 rounded-md py-1.5 text-[10px] font-medium ${inStack ? 'bg-gold-500/20 text-gold-300 border border-gold-400/40' : 'bg-gold-500 text-forest-950'}`}>
                      {inStack ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />} {inStack ? 'In Stack' : 'Add To Template'}
                    </button>
                  </div>
                </div>

                <p className="text-[10px] text-cream-200/30 text-center">Space = Play/Pause · R = Replay · Esc = Close</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
