import { PACKAGE_TIERS } from '@/categories';
import type { Package } from '@/types';
import { motion } from 'framer-motion';

interface FilterBarProps {
  packageFilter: Package | 'all';
  onPackageFilter: (p: Package | 'all') => void;
  total: number;
  shown: number;
}

export function FilterBar({ packageFilter, onPackageFilter, total, shown }: FilterBarProps) {
  const filters: { id: Package | 'all'; label: string }[] = [
    { id: 'all', label: 'All' },
    ...PACKAGE_TIERS.map((t) => ({ id: t.id as Package, label: `${t.price} ${t.label.toUpperCase()}` })),
  ];

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
      <div className="flex flex-wrap gap-1.5">
        {filters.map((f) => (
          <motion.button key={f.id} onClick={() => onPackageFilter(f.id)}
            whileTap={{ scale: 0.95 }}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200 ${packageFilter === f.id ? 'bg-gold-500 text-forest-950 shadow-gold' : 'bg-forest-800/50 text-cream-200/70 border border-cream-200/10 hover:border-gold-400/30 hover:text-cream-100'}`}>
            {f.label}
          </motion.button>
        ))}
      </div>
      <motion.span key={shown} initial={{ opacity: 0.5 }} animate={{ opacity: 1 }}
        className="text-xs text-cream-200/50 tabular-nums">
        <span className="text-gold-400/80 font-medium">{shown}</span> of {total} effects
      </motion.span>
    </div>
  );
}
