import { motion } from 'framer-motion';
import { CATEGORIES } from '@/categories';
import { categoryCounts } from '@/effects/registry';
import * as Icons from 'lucide-react';
import { range } from '@/lib/hooks';

interface CategoryBrowserProps {
  active: string;
  onCategory: (id: string) => void;
}

const GRADIENTS: Record<string, string> = {
  reveal: 'from-gold-500/20 to-gold-700/5',
  text: 'from-saffron-500/20 to-saffron-700/5',
  photo: 'from-forest-400/20 to-forest-600/5',
  gallery: 'from-maroon-500/20 to-maroon-700/5',
  scroll: 'from-gold-400/20 to-saffron-600/5',
  transition: 'from-forest-500/20 to-forest-700/5',
  festive: 'from-saffron-400/20 to-gold-600/5',
  interactive: 'from-gold-500/20 to-maroon-600/5',
  background: 'from-forest-600/20 to-forest-800/5',
  premium: 'from-gold-400/25 to-gold-600/10',
  micro: 'from-saffron-500/20 to-saffron-700/5',
  music: 'from-maroon-400/20 to-gold-600/5',
  modern: 'from-gold-500/20 to-saffron-600/5',
};

export function CategoryBrowser({ active, onCategory }: CategoryBrowserProps) {
  const counts = categoryCounts();
  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  const renderIcon = (iconName: string, className: string) => {
    const Icon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[iconName];
    return Icon ? <Icon className={className} /> : null;
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8">
        <h2 className="font-display text-3xl md:text-4xl text-cream-50">
          Browse by <span className="gold-shimmer-text">Category</span>
        </h2>
        <p className="mt-2 text-sm text-cream-200/60">{total} effects across {CATEGORIES.length} categories</p>
      </motion.div>

      {/* All Effects button */}
      <div className="mb-3">
        <CategoryCard
          id="all"
          name="All Effects"
          blurb="Browse the complete library"
          icon="Layers"
          count={total}
          gradient="from-gold-500/20 to-saffron-600/10"
          isActive={active === 'all'}
          onClick={() => onCategory('all')}
          featured
        />
      </div>

      {/* Category grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {CATEGORIES.map((cat, i) => (
          <CategoryCard
            key={cat.id}
            id={cat.id}
            name={cat.name}
            blurb={cat.blurb}
            icon={cat.icon}
            count={counts[cat.id] || 0}
            gradient={GRADIENTS[cat.id] || 'from-gold-500/20 to-gold-700/5'}
            isActive={active === cat.id}
            onClick={() => onCategory(cat.id)}
            index={i}
          />
        ))}
      </div>
    </section>
  );
}

interface CardProps {
  id: string;
  name: string;
  blurb: string;
  icon: string;
  count: number;
  gradient: string;
  isActive: boolean;
  onClick: () => void;
  featured?: boolean;
  index?: number;
}

function CategoryCard({ name, blurb, icon, count, gradient, isActive, onClick, featured, index = 0 }: CardProps) {
  const renderIcon = (iconName: string, className: string) => {
    const Icon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[iconName];
    return Icon ? <Icon className={className} /> : null;
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.3), ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative group overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300 ${isActive ? 'border-gold-400/50 bg-gold-500/10' : 'border-cream-200/8 bg-forest-900/40 hover:border-gold-400/30'} ${featured ? 'flex items-center gap-4 p-4' : ''}`}>
      {/* Gradient backdrop */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-400`} />
      {/* Decorative dots */}
      <div className="absolute top-2 right-2 flex gap-1 opacity-30">
        {range(3).map((i) => <span key={i} className="w-1 h-1 rounded-full bg-gold-400" />)}
      </div>

      <div className={`relative z-10 ${featured ? 'flex items-center gap-4' : ''}`}>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2.5 transition-colors duration-300 ${isActive ? 'bg-gold-500/30 text-gold-200' : 'bg-forest-800/60 text-cream-200/60 group-hover:text-gold-300 group-hover:bg-gold-500/15'}`}>
          {renderIcon(icon, 'w-5 h-5')}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className={`font-display text-sm font-semibold ${isActive ? 'text-gold-200' : 'text-cream-50'}`}>{name}</h3>
          </div>
          <p className="text-[10px] text-cream-200/50 mt-0.5 line-clamp-1">{blurb}</p>
          <p className="text-[10px] font-bold text-gold-400/70 mt-1.5 tabular-nums">{count} effects</p>
        </div>
      </div>
    </motion.button>
  );
}
