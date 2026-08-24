import { useState, useEffect } from 'react';
import { Search, Sun, Moon, Menu, X, Heart, Layers, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CATEGORIES } from '@/categories';
import { categoryCounts } from '@/effects/registry';
import * as Icons from 'lucide-react';

interface NavProps {
  active: string;
  onCategory: (id: string) => void;
  search: string;
  onSearch: (v: string) => void;
  dark: boolean;
  onToggleTheme: () => void;
  favCount: number;
  stackCount: number;
  onShowFavorites: () => void;
  onShowStack: () => void;
}

export function Nav({ active, onCategory, search, onSearch, dark, onToggleTheme, favCount, stackCount, onShowFavorites, onShowStack }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catMenuOpen, setCatMenuOpen] = useState(false);
  const counts = categoryCounts();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const activeCat = CATEGORIES.find((c) => c.id === active);
  const navItems = [{ id: 'all', short: 'All Effects' }, ...CATEGORIES.map((c) => ({ id: c.id, short: c.short }))];

  const renderIcon = (iconName: string, className: string) => {
    const Icon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[iconName];
    return Icon ? <Icon className={className} /> : null;
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-500 ${scrolled ? 'bg-forest-950/85 backdrop-blur-xl border-b border-gold-500/15' : 'bg-transparent'}`}>
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <button onClick={() => onCategory('all')} className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-forest-950 font-display font-bold text-lg shadow-gold">F</div>
            <div className="hidden sm:block leading-tight text-left">
              <div className="font-display text-cream-50 text-base font-semibold">FestiveLink</div>
              <div className="text-[10px] tracking-[0.2em] text-gold-400/80 font-medium">EFFECT LAB</div>
            </div>
          </button>

          {/* Desktop: quick pills for first few + dropdown */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 overflow-x-auto no-scrollbar">
            {navItems.slice(0, 5).map((item) => (
              <button key={item.id} onClick={() => onCategory(item.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 ${active === item.id ? 'bg-gold-500/20 text-gold-300 border border-gold-400/30' : 'text-cream-200/70 hover:text-cream-100 hover:bg-forest-800/50'}`}>
                {item.short}
              </button>
            ))}

            {/* Category dropdown */}
            <div className="relative">
              <button onClick={() => setCatMenuOpen((v) => !v)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 ${!navItems.slice(0, 5).some((i) => i.id === active) ? 'bg-gold-500/20 text-gold-300 border border-gold-400/30' : 'text-cream-200/70 hover:text-cream-100 hover:bg-forest-800/50'}`}>
                {activeCat ? activeCat.short : 'Categories'}
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${catMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {catMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setCatMenuOpen(false)} />
                    <motion.div initial={{ opacity: 0, y: 8, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute top-full left-0 mt-2 w-80 rounded-2xl bg-forest-900/95 backdrop-blur-xl border border-gold-400/20 shadow-2xl p-2 z-50 max-h-[60vh] overflow-y-auto">
                      {CATEGORIES.map((cat) => (
                        <button key={cat.id} onClick={() => { onCategory(cat.id); setCatMenuOpen(false); }}
                          className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors duration-200 ${active === cat.id ? 'bg-gold-500/15' : 'hover:bg-forest-800/60'}`}>
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${active === cat.id ? 'bg-gold-500/20 text-gold-300' : 'bg-forest-800/60 text-cream-200/60'}`}>
                            {renderIcon(cat.icon, 'w-4 h-4')}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-medium truncate ${active === cat.id ? 'text-gold-300' : 'text-cream-100'}`}>{cat.name}</p>
                            <p className="text-[10px] text-cream-200/50 truncate">{cat.blurb}</p>
                          </div>
                          <span className="text-[10px] font-bold text-gold-400/60 tabular-nums flex-shrink-0">{counts[cat.id] || 0}</span>
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-cream-200/50" />
              <input value={search} onChange={(e) => onSearch(e.target.value)} placeholder="Search effects..."
                className="w-44 lg:w-52 rounded-full bg-forest-800/60 border border-cream-200/10 pl-9 pr-3 py-1.5 text-xs text-cream-100 placeholder:text-cream-200/40 focus:outline-none focus:border-gold-400/40 focus:w-56 transition-all duration-300" />
            </div>

            <button onClick={onShowFavorites} title="Favorites" className="relative p-2 rounded-full hover:bg-forest-800/60 transition-colors duration-200">
              <Heart className="w-4 h-4 text-cream-200/80" />
              {favCount > 0 && <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-maroon-500 text-cream-50 text-[9px] font-bold flex items-center justify-center">{favCount}</span>}
            </button>

            <button onClick={onShowStack} title="My Effect Stack" className="relative p-2 rounded-full hover:bg-forest-800/60 transition-colors duration-200">
              <Layers className="w-4 h-4 text-cream-200/80" />
              {stackCount > 0 && <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-gold-500 text-forest-950 text-[9px] font-bold flex items-center justify-center">{stackCount}</span>}
            </button>

            <button onClick={onToggleTheme} title="Toggle theme" className="p-2 rounded-full hover:bg-forest-800/60 transition-colors duration-200">
              {dark ? <Sun className="w-4 h-4 text-gold-300" /> : <Moon className="w-4 h-4 text-cream-200" />}
            </button>

            <button onClick={() => setMobileOpen((v) => !v)} className="lg:hidden p-2 rounded-full hover:bg-forest-800/60">
              {mobileOpen ? <X className="w-4 h-4 text-cream-100" /> : <Menu className="w-4 h-4 text-cream-100" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden">
              <div className="pb-4 space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-cream-200/50" />
                  <input value={search} onChange={(e) => { onSearch(e.target.value); setMobileOpen(false); }} placeholder="Search effects..."
                    className="w-full rounded-full bg-forest-800/60 border border-cream-200/10 pl-9 pr-3 py-2 text-xs text-cream-100 placeholder:text-cream-200/40 focus:outline-none focus:border-gold-400/40" />
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {navItems.map((item) => (
                    <button key={item.id} onClick={() => { onCategory(item.id); setMobileOpen(false); }}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${active === item.id ? 'bg-gold-500/20 text-gold-300' : 'text-cream-200/70 bg-forest-800/40'}`}>
                      {item.short}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
