import { useState, useCallback } from 'react';
import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { StatsCounter } from '@/components/StatsCounter';
import { CategoryBrowser } from '@/components/CategoryBrowser';
import { FilterBar } from '@/components/FilterBar';
import { EffectGrid } from '@/components/EffectGrid';
import { FullPreviewModal } from '@/components/FullPreview';
import { EffectStackPanel } from '@/components/EffectStack';
import { FavoritesPanel } from '@/components/FavoritesPanel';
import { InvitationSimulator, StackPreviewPlayer } from '@/components/InvitationSimulator';
import { FinalSection } from '@/components/FinalSection';
import { EFFECTS } from '@/effects/registry';
import type { Effect, Package } from '@/types';
import { useFavorites, useEffectStack, useTheme } from '@/lib/state';

export default function App() {
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [packageFilter, setPackageFilter] = useState<Package | 'all'>('all');
  const [fullPreview, setFullPreview] = useState<Effect | null>(null);
  const [showStack, setShowStack] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showStackPreview, setShowStackPreview] = useState(false);

  const { favorites, toggleFav } = useFavorites();
  const { stack, add, remove, reorder, clear } = useEffectStack();
  const { dark, toggle: toggleTheme } = useTheme();

  const handleCategory = useCallback((id: string) => {
    setCategory(id);
    const el = document.getElementById('effects');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const handleUseEffect = useCallback((effect: Effect) => {
    add(effect.id);
    setShowStack(true);
  }, [add]);

  const handleExplore = useCallback(() => {
    const el = document.getElementById('effects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleBuild = useCallback(() => {
    const el = document.getElementById('simulator');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-forest-950 text-cream-100">
      <Nav active={category} onCategory={handleCategory}
        search={search} onSearch={setSearch}
        dark={dark} onToggleTheme={toggleTheme}
        favCount={favorites.length} stackCount={stack.length}
        onShowFavorites={() => setShowFavorites(true)} onShowStack={() => setShowStack(true)} />

      <Hero onExplore={handleExplore} onBuild={handleBuild} />

      <StatsCounter />

      <CategoryBrowser active={category} onCategory={handleCategory} />

      <div className="mx-auto max-w-7xl px-4">
        <FilterBar packageFilter={packageFilter} onPackageFilter={setPackageFilter}
          total={EFFECTS.length} shown={filteredCount(category, search, packageFilter)} />
      </div>

      <EffectGrid effects={EFFECTS} category={category} search={search} packageFilter={packageFilter}
        favorites={favorites} stack={stack}
        onToggleFav={toggleFav} onAddToStack={add}
        onFullPreview={setFullPreview} onUseEffect={handleUseEffect} />

      <InvitationSimulator stack={stack} onPreviewStack={() => setShowStackPreview(true)} />

      <FinalSection onBuild={handleBuild} onExplore={handleExplore} />

      {/* Modals & panels */}
      <FullPreviewModal effect={fullPreview} onClose={() => setFullPreview(null)}
        inStack={fullPreview ? stack.includes(fullPreview.id) : false}
        onAddToStack={add} />

      <EffectStackPanel open={showStack} onClose={() => setShowStack(false)}
        stack={stack} onRemove={remove} onReorder={reorder} onClear={clear}
        onPreview={() => { setShowStack(false); setShowStackPreview(true); }} />

      <FavoritesPanel open={showFavorites} onClose={() => setShowFavorites(false)}
        favorites={favorites} onToggleFav={toggleFav} onFullPreview={setFullPreview} />

      <StackPreviewPlayer stack={stack} open={showStackPreview} onClose={() => setShowStackPreview(false)} />
    </div>
  );
}

function filteredCount(category: string, search: string, packageFilter: Package | 'all'): number {
  let list = EFFECTS;
  if (category !== 'all') list = list.filter((e) => e.category === category);
  if (packageFilter !== 'all') list = list.filter((e) => e.package.includes(packageFilter));
  if (search.trim()) {
    const q = search.toLowerCase();
    list = list.filter((e) =>
      e.name.toLowerCase().includes(q) || e.category.toLowerCase().includes(q) ||
      e.description.toLowerCase().includes(q) || e.tags.some((t) => t.includes(q)) ||
      e.package.some((p) => p.includes(q))
    );
  }
  return list.length;
}
