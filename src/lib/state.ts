import { useState, useEffect, useCallback, useRef } from 'react';
import type { Effect } from '@/types';

export function usePreviewController(effect: Effect) {
  const [playing, setPlaying] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [controls, setControls] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    effect.controls?.forEach((c) => { init[c.key] = c.default; });
    return init;
  });

  const reset = useCallback(() => {
    setPlaying(false);
    setResetKey((k) => k + 1);
    const init: Record<string, number> = {};
    effect.controls?.forEach((c) => { init[c.key] = c.default; });
    setControls(init);
  }, [effect]);

  const replay = useCallback(() => {
    setResetKey((k) => k + 1);
    setPlaying(true);
  }, []);

  const toggle = useCallback(() => setPlaying((p) => !p), []);

  return { playing, resetKey, controls, setControls, reset, replay, toggle, setPlaying };
}

const FAV_KEY = 'festivelink-favorites';
const STACK_KEY = 'festivelink-stack';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(FAV_KEY);
      if (raw) setFavorites(JSON.parse(raw));
    } catch { /* ignore */ }
  }, []);
  const save = useCallback((f: string[]) => {
    setFavorites(f);
    try { localStorage.setItem(FAV_KEY, JSON.stringify(f)); } catch { /* ignore */ }
  }, []);
  const toggleFav = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      try { localStorage.setItem(FAV_KEY, JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  }, []);
  const isFav = useCallback((id: string) => favorites.includes(id), [favorites]);
  return { favorites, toggleFav, isFav, save };
}

export function useEffectStack() {
  const [stack, setStack] = useState<string[]>([]);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STACK_KEY);
      if (raw) setStack(JSON.parse(raw));
    } catch { /* ignore */ }
  }, []);
  const add = useCallback((id: string) => {
    setStack((prev) => prev.includes(id) ? prev : [...prev, id]);
  }, []);
  const remove = useCallback((id: string) => {
    setStack((prev) => prev.filter((x) => x !== id));
  }, []);
  const reorder = useCallback((from: number, to: number) => {
    setStack((prev) => {
      const next = [...prev];
      const [item] = next.splice(from, 1);
      next.splice(to, 0, item);
      return next;
    });
  }, []);
  const clear = useCallback(() => setStack([]), []);
  useEffect(() => {
    try { localStorage.setItem(STACK_KEY, JSON.stringify(stack)); } catch { /* ignore */ }
  }, [stack]);
  return { stack, add, remove, reorder, clear };
}

export function useTheme() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add('dark'); else root.classList.remove('dark');
  }, [dark]);
  return { dark, toggle: () => setDark((d) => !d) };
}

/** Keyboard shortcut handler for preview controls. */
export function usePreviewKeys(onPlayPause: () => void, onReplay: () => void, onEsc?: () => void) {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (ref.current && !ref.current.contains(document.activeElement) && document.activeElement !== document.body) return;
      if (e.code === 'Space') { e.preventDefault(); onPlayPause(); }
      else if (e.code === 'KeyR') { e.preventDefault(); onReplay(); }
      else if (e.code === 'Escape' && onEsc) { onEsc(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onPlayPause, onReplay, onEsc]);
  return ref;
}
