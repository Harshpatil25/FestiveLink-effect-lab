import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, ChevronDown } from 'lucide-react';
import { EFFECTS, EFFECT_MAP } from '@/effects/registry';
import { CATEGORY_MAP } from '@/categories';
import { SAMPLE } from '@/lib/hooks';
import type { Effect } from '@/types';

/** Build A Mini Invitation — interactive section with selectors + live preview. */
export function InvitationSimulator({ stack, onPreviewStack }: { stack: string[]; onPreviewStack: () => void }) {
  const slots = [
    { key: 'opening', label: 'Opening', category: 'reveal' as const, default: 'diya-light-reveal' },
    { key: 'text', label: 'Text', category: 'text' as const, default: 'text-letter' },
    { key: 'photo', label: 'Photos', category: 'photo' as const, default: 'photo-polaroid' },
    { key: 'scroll', label: 'Scroll', category: 'scroll' as const, default: 'scroll-fade' },
    { key: 'background', label: 'Background', category: 'background' as const, default: 'bg-golden-particles' },
    { key: 'ending', label: 'Ending', category: 'festive' as const, default: 'festive-confetti' },
  ];

  const [selections, setSelections] = useState<Record<string, string>>(() => Object.fromEntries(slots.map((s) => [s.key, s.default])));
  const [playing, setPlaying] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [phase, setPhase] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const selectedEffects = slots.map((s) => EFFECT_MAP[selections[s.key]]).filter(Boolean) as Effect[];

  const play = () => {
    timers.current.forEach(clearTimeout);
    setPhase(0);
    setResetKey((k) => k + 1);
    setPlaying(true);
    let acc = 0;
    selectedEffects.forEach((eff, i) => {
      acc += eff.duration * 1000;
      const t = setTimeout(() => setPhase(i + 1), acc);
      timers.current.push(t);
    });
    const end = setTimeout(() => { setPlaying(false); setPhase(selectedEffects.length); }, acc + 500);
    timers.current.push(end);
  };

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  // Current playing effect
  const currentEffect = playing && phase < selectedEffects.length ? selectedEffects[phase] : null;
  const CurrentPreview = currentEffect?.preview;

  return (
    <section id="simulator" className="mx-auto max-w-7xl px-4 py-16">
      <div className="text-center mb-10">
        <h2 className="font-display text-4xl md:text-5xl text-cream-50">Build A Mini Invitation</h2>
        <p className="mt-3 text-sm text-cream-200/60 max-w-xl mx-auto">Pick effects for each stage and watch them combine into a real FestiveLink invitation preview.</p>
      </div>

      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-6">
        {/* Left: controls */}
        <div className="rounded-2xl border border-cream-200/8 bg-forest-900/50 p-5 space-y-4">
          {slots.map((slot) => {
            const opts = EFFECTS.filter((e) => e.category === slot.category);
            return (
              <div key={slot.key}>
                <label className="text-xs font-medium text-gold-400/80 tracking-wide uppercase mb-1.5 block">{slot.label}</label>
                <div className="relative">
                  <select value={selections[slot.key]} onChange={(e) => setSelections((s) => ({ ...s, [slot.key]: e.target.value }))}
                    className="w-full appearance-none rounded-lg bg-forest-800/60 border border-cream-200/10 px-3 py-2.5 pr-9 text-sm text-cream-100 focus:outline-none focus:border-gold-400/40">
                    {opts.map((o) => <option key={o.id} value={o.id} className="bg-forest-800">{o.name}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-200/40 pointer-events-none" />
                </div>
              </div>
            );
          })}

          <button onClick={play} disabled={playing}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-gold-500 py-3 text-sm font-semibold text-forest-950 hover:shadow-gold disabled:opacity-50 disabled:cursor-not-allowed">
            <Play className="w-4 h-4" /> {playing ? 'Playing...' : 'Play Complete Invitation'}
          </button>
          {stack.length > 0 && (
            <button onClick={onPreviewStack} className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-forest-800 border border-gold-400/20 py-2.5 text-xs font-medium text-gold-300 hover:border-gold-400/40">
              Preview My Saved Stack ({stack.length})
            </button>
          )}
        </div>

        {/* Right: live invitation */}
        <div className="relative rounded-2xl border border-gold-400/20 bg-forest-950 overflow-hidden min-h-[480px] flex items-center justify-center">
          {/* Static invitation behind */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <p className="font-deva text-gold-400/30 text-sm mb-2">{SAMPLE.om}</p>
            <p className="font-deva text-gold-300/40 text-2xl mb-2">{SAMPLE.bappa}</p>
            <p className="font-display text-cream-50/40 text-lg mb-1">{SAMPLE.event}</p>
            <p className="text-cream-200/30 text-sm">{SAMPLE.family}</p>
            <p className="text-cream-200/30 text-sm">{SAMPLE.date} · {SAMPLE.time}</p>
            <p className="text-cream-200/30 text-xs">{SAMPLE.venue}</p>
          </div>

          {/* Playing overlay */}
          <AnimatePresence>
            {CurrentPreview && (
              <motion.div key={`${currentEffect!.id}-${resetKey}-${phase}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0">
                <CurrentPreview playing={playing} resetKey={resetKey} controls={{}} />
                <div className="absolute top-3 left-3 rounded-full bg-forest-950/70 backdrop-blur px-3 py-1 text-[10px] text-gold-300 font-medium">
                  Step {phase + 1}/{selectedEffects.length}: {currentEffect!.name}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Completion */}
          {phase >= selectedEffects.length && !playing && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-forest-950/80 flex items-center justify-center">
              <div className="text-center">
                <p className="font-deva text-gold-300 text-xl mb-2">{SAMPLE.bappa}</p>
                <p className="text-cream-200/70 text-sm">Invitation complete</p>
                <button onClick={play} className="mt-4 inline-flex items-center gap-2 rounded-full bg-gold-500 px-5 py-2 text-xs font-semibold text-forest-950">
                  <Play className="w-3 h-3" /> Play Again
                </button>
              </div>
            </motion.div>
          )}

          {/* Stage indicator */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {selectedEffects.map((_, i) => (
              <div key={i} className={`w-6 h-1 rounded-full transition-all ${i <= phase ? 'bg-gold-400' : 'bg-cream-200/20'}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Stack Preview Player — plays the saved stack in sequence, fullscreen. */
export function StackPreviewPlayer({ stack, open, onClose }: { stack: string[]; open: boolean; onClose: () => void }) {
  const [phase, setPhase] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const effects = stack.map((id) => EFFECT_MAP[id]).filter(Boolean) as Effect[];

  useEffect(() => {
    if (!open) return;
    timers.current.forEach(clearTimeout);
    setPhase(0);
    setResetKey((k) => k + 1);
    setPlaying(true);
    let acc = 0;
    effects.forEach((eff, i) => {
      const t1 = setTimeout(() => setPhase(i), acc);
      timers.current.push(t1);
      acc += eff.duration * 1000;
    });
    const end = setTimeout(() => { setPlaying(false); setPhase(effects.length); }, acc);
    timers.current.push(end);
    return () => timers.current.forEach(clearTimeout);
  }, [open, stack.join(',')]);

  if (!open) return null;
  const current = phase < effects.length ? effects[phase] : null;
  const CurrentPreview = current?.preview;

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[95] bg-forest-950 flex flex-col items-center justify-center">
          <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full bg-forest-800/60 text-cream-200/70 hover:text-cream-100 z-10"><X className="w-6 h-6" /></button>
          
          <div className="text-center mb-4 z-10">
            <p className="font-display text-2xl text-gradient-gold">My FestiveLink Invitation</p>
            <p className="text-xs text-cream-200/50 mt-1">{effects.length} effects · step {Math.min(phase + 1, effects.length)} of {effects.length}</p>
          </div>

          <div className="relative w-full max-w-3xl aspect-video rounded-xl overflow-hidden shadow-2xl border border-gold-400/20">
            {CurrentPreview ? (
              <CurrentPreview playing={playing} resetKey={resetKey} controls={{}} />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="font-deva text-gold-300 text-2xl mb-2">{SAMPLE.bappa}</p>
                  <p className="text-cream-200/70">{SAMPLE.event}</p>
                  <p className="text-cream-200/50 text-sm mt-2">— {SAMPLE.family}</p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 flex gap-1.5 z-10">
            {effects.map((eff, i) => (
              <div key={eff.id} className={`h-1.5 rounded-full transition-all ${i === phase ? 'w-10 bg-gold-400' : i < phase ? 'w-6 bg-gold-500/50' : 'w-6 bg-cream-200/20'}`} />
            ))}
          </div>

          <div className="mt-3 text-xs text-cream-200/40 z-10">
            {current ? `${current.name} · ${CATEGORY_MAP[current.category]?.short}` : 'Complete!'}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
