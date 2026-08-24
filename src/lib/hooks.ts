import { useEffect, useRef, useState } from 'react';

/* Easing functions for buttery-smooth animations */
export const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
export const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
export const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
export const easeOutBack = (t: number) => {
  const c1 = 1.70158, c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return reduced;
}

/** Drives a looping animation cycle of `duration` seconds while `playing`. */
export function useAnimationLoop(duration: number, playing: boolean, resetKey: number): number {
  const [t, setT] = useState(0);
  const raf = useRef<number | null>(null);
  const start = useRef<number>(0);

  useEffect(() => {
    if (!playing) return;
    start.current = performance.now();
    const tick = (now: number) => {
      const elapsed = (now - start.current) / 1000;
      const loop = duration > 0 ? elapsed % duration : 0;
      setT(loop);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [playing, duration, resetKey]);

  return t;
}

/** One-shot progress 0..1 over `duration` on play; restarts on resetKey. Returns eased progress. */
export function useProgress(duration: number, playing: boolean, resetKey: number): number {
  const [p, setP] = useState(0);
  const raf = useRef<number | null>(null);
  const start = useRef<number>(0);

  useEffect(() => {
    if (!playing) return;
    start.current = performance.now();
    const tick = (now: number) => {
      const elapsed = (now - start.current) / 1000;
      const np = Math.min(1, elapsed / duration);
      setP(easeOutCubic(np));
      if (np < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [playing, duration, resetKey]);

  return p;
}

/** IntersectionObserver-based visibility hook for pausing offscreen previews. */
export function useInView<T extends HTMLElement>(threshold = 0.2): [React.RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

export const SAMPLE = {
  om: '॥ श्री गणेशाय नमः ॥',
  bappa: 'गणपति बप्पा मोरया',
  invite: 'आपणांस आग्रहाचे निमंत्रण',
  event: 'Ganpati Chaturthi 2026',
  family: 'The Sharma Family',
  date: '27 August 2026',
  time: '6:30 PM onwards',
  venue: 'Pune, Maharashtra',
};

export function range(n: number): number[] {
  return Array.from({ length: n }, (_, i) => i);
}
