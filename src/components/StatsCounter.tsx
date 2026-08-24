import { motion } from 'framer-motion';
import { CATEGORIES } from '@/categories';
import { categoryCounts } from '@/effects/registry';

export function StatsCounter() {
  const counts = categoryCounts();
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  const featured = ['reveal', 'text', 'photo', 'festive', 'interactive', 'premium', 'modern', 'music'];

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 md:py-16">
      <div className="text-center mb-10">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-4xl md:text-5xl text-cream-50">
          <span className="gold-shimmer-text">{total}</span> Creative Effects
        </motion.h2>
        <p className="mt-2 text-sm text-cream-200/60">A growing library, each with a live interactive preview.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
        {featured.map((catId, i) => {
          const cat = CATEGORIES.find((c) => c.id === catId)!;
          return (
            <motion.div key={catId}
              initial={{ opacity: 0, scale: 0.9, y: 12 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -3 }}
              className="rounded-xl border border-cream-200/8 bg-forest-900/50 p-4 text-center hover:border-gold-400/30 transition-colors duration-300">
              <div className="font-display text-3xl text-gradient-gold font-bold tabular-nums">{counts[catId] || 0}+</div>
              <div className="text-xs text-cream-200/60 mt-1">{cat.short}</div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
