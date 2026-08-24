import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Wand2 } from 'lucide-react';
import { SAMPLE, range } from '@/lib/hooks';

export function Hero({ onExplore, onBuild }: { onExplore: () => void; onBuild: () => void }) {
  return (
    <section className="relative overflow-hidden min-h-[88vh] flex items-center bg-rangoli">
      {/* Animated background layers */}
      <FestiveBackground />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center pt-28 pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-forest-900/40 px-4 py-1.5 mb-6">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          <span className="text-xs tracking-[0.2em] text-gold-300 font-medium">FESTIVELINK · EFFECT LAB</span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }}
          className="font-display text-5xl md:text-7xl leading-[1.05] text-cream-50">
          Make Every <span className="gold-shimmer-text italic">Invitation</span><br />Come Alive.
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 text-base md:text-lg text-cream-200/80 max-w-2xl mx-auto">
          Explore interactive reveals, animations, transitions and festive effects designed specially for FestiveLink digital invitations.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button onClick={onExplore}
            className="group inline-flex items-center gap-2 rounded-full bg-gold-500 px-7 py-3.5 text-sm font-semibold text-forest-950 shadow-gold transition-all hover:shadow-gold-lg hover:scale-105">
            Explore Effects <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          <button onClick={onBuild}
            className="group inline-flex items-center gap-2 rounded-full border border-cream-200/30 bg-forest-900/40 px-7 py-3.5 text-sm font-semibold text-cream-100 backdrop-blur transition-all hover:border-gold-400/50 hover:bg-forest-800/60">
            <Wand2 className="w-4 h-4 text-gold-300" /> Build An Invitation
          </button>
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.7 }}
          className="mt-6 text-sm text-gold-300/80 font-medium tracking-wide">
          192 effects & combinations
        </motion.p>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.9 }}
          className="mt-4 font-deva text-gold-400/50 text-sm">
          {SAMPLE.om}
        </motion.div>
      </div>
    </section>
  );
}

function FestiveBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Soft light rays */}
      <motion.div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[120%] h-[80%]"
        style={{ background: 'conic-gradient(from 180deg at 50% 100%, transparent 0deg, rgba(228,197,81,0.06) 40deg, transparent 80deg, rgba(228,197,81,0.05) 120deg, transparent 160deg)' }}
        animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: 'linear' }} />

      {/* Floating golden particles */}
      {range(20).map((i) => (
        <motion.div key={`g${i}`} className="absolute w-1 h-1 rounded-full bg-gold-300/60"
          style={{ left: `${(i * 5.3) % 100}%`, top: `${(i * 7.7) % 100}%` }}
          animate={{ y: [-10, -50], opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
          transition={{ duration: 4 + (i % 4), repeat: Infinity, delay: i * 0.25, ease: 'easeOut' }} />
      ))}

      {/* Slow marigold petals */}
      {range(10).map((i) => (
        <motion.div key={`p${i}`} className="absolute w-2.5 h-2.5 rounded-full bg-saffron-400/40"
          style={{ left: `${(i * 11) % 100}%` }}
          animate={{ y: ['-5%', '105%'], rotate: [0, 360], x: [0, 30, 0], opacity: [0, 0.7, 0] }}
          transition={{ duration: 10 + (i % 4), repeat: Infinity, delay: i * 0.5, ease: 'linear' }} />
      ))}

      {/* Subtle rangoli glow center */}
      <motion.div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(228,197,81,0.08), transparent 70%)' }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-forest-950/40 via-transparent to-forest-950" />
    </div>
  );
}
