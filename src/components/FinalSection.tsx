import { motion } from 'framer-motion';
import { Wand2, LayoutTemplate } from 'lucide-react';
import { range, SAMPLE } from '@/lib/hooks';

export function FinalSection({ onBuild, onExplore }: { onBuild: () => void; onExplore: () => void }) {
  return (
    <section className="relative overflow-hidden py-24 md:py-32 bg-rangoli">
      <div className="absolute inset-0 pointer-events-none">
        {range(15).map((i) => (
          <motion.div key={i} className="absolute w-1 h-1 rounded-full bg-gold-300/50"
            style={{ left: `${(i * 6.7) % 100}%` }}
            animate={{ y: [-10, -60], opacity: [0, 1, 0] }}
            transition={{ duration: 4 + (i % 3), repeat: Infinity, delay: i * 0.3 }} />
        ))}
        <motion.div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(228,197,81,0.08), transparent 70%)' }}
          animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 8, repeat: Infinity }} />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="font-deva text-gold-400/60 text-base mb-6">{SAMPLE.om}</motion.p>

        <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="font-display text-4xl md:text-6xl text-cream-50 leading-[1.1]">
          Your Invitation.<br />
          <span className="gold-shimmer-text italic">Your Style.</span><br />
          Your Effect.
        </motion.h2>

        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
          className="mt-6 text-base text-cream-200/70 max-w-xl mx-auto">
          Combine different effects to create a FestiveLink invitation that feels completely yours.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button onClick={onBuild}
            className="group inline-flex items-center gap-2 rounded-full bg-gold-500 px-7 py-3.5 text-sm font-semibold text-forest-950 shadow-gold transition-all hover:shadow-gold-lg hover:scale-105">
            <Wand2 className="w-4 h-4" /> Build My Invitation
          </button>
          <button onClick={onExplore}
            className="inline-flex items-center gap-2 rounded-full border border-cream-200/30 bg-forest-900/40 px-7 py-3.5 text-sm font-semibold text-cream-100 backdrop-blur transition-all hover:border-gold-400/50">
            <LayoutTemplate className="w-4 h-4 text-gold-300" /> View Templates
          </button>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 }}
          className="mt-12 pt-8 border-t border-cream-200/10">
          <p className="font-display text-lg text-cream-100">FestiveLink <span className="text-gold-400">Effect Lab</span></p>
          <p className="text-xs text-cream-200/40 mt-1">Make Every Invitation Come Alive.</p>
        </motion.div>
      </div>
    </section>
  );
}
