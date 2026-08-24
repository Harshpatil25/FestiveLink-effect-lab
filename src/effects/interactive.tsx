import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import type { PreviewProps } from '@/types';
import { useAnimationLoop, range, SAMPLE } from '@/lib/hooks';
import { PHOTOS } from './photos';

/* 1. Tap To Reveal (interactive) */
export function IntTapReveal({ playing, resetKey }: PreviewProps) {
  const [open, setOpen] = useState(false);
  return (
    <Shell>
      {!open ? (
        <button onClick={() => setOpen(true)} className="px-4 py-2 rounded-full border border-gold-400/60 text-gold-200 text-xs">Tap to reveal</button>
      ) : (
        <motion.p className="font-deva text-gold-300 text-lg" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>{SAMPLE.bappa}</motion.p>
      )}
    </Shell>
  );
}

/* 2. Hold To Reveal */
export function IntHoldReveal({ playing, resetKey }: PreviewProps) {
  const [p, setP] = useState(0);
  const raf = useRef<number | null>(null);
  const start = () => {
    const t0 = performance.now();
    const tick = (now: number) => { setP(Math.min(1, (now - t0) / 1200)); if (now - t0 < 1200) raf.current = requestAnimationFrame(tick); };
    raf.current = requestAnimationFrame(tick);
  };
  const stop = () => { if (raf.current) cancelAnimationFrame(raf.current); };
  return (
    <Shell>
      <button onMouseDown={start} onMouseUp={stop} onMouseLeave={stop} onTouchStart={start} onTouchEnd={stop}
        className="relative w-32 h-32 rounded-full border-2 border-gold-400/60 flex items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0 bg-gold-400/30" style={{ scale: p }} />
        <span className="relative text-gold-200 text-xs">Hold</span>
      </button>
      {p >= 1 && <motion.p className="absolute font-deva text-gold-300 text-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{SAMPLE.bappa}</motion.p>}
    </Shell>
  );
}

/* 3. Swipe To Open */
export function IntSwipeOpen({ playing, resetKey }: PreviewProps) {
  const [x, setX] = useState(0);
  const [open, setOpen] = useState(false);
  const start = useRef<number>(0);
  return (
    <Shell>
      {!open ? (
        <div className="relative w-40 h-20 bg-forest-800 rounded-lg overflow-hidden flex items-center"
          onTouchStart={(e) => { start.current = e.touches[0].clientX; }}
          onTouchMove={(e) => { setX(Math.min(120, Math.max(0, e.touches[0].clientX - start.current))); }}
          onTouchEnd={() => { if (x > 60) setOpen(true); else setX(0); }}>
          <motion.div className="absolute inset-y-0 left-0 bg-gold-500 flex items-center justify-center w-full" animate={{ x }}>
            <span className="text-forest-950 text-xs font-medium">Swipe →</span>
          </motion.div>
        </div>
      ) : <motion.p className="font-deva text-gold-300 text-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{SAMPLE.bappa}</motion.p>}
    </Shell>
  );
}

/* 4. Drag To Reveal */
export function IntDragReveal({ playing, resetKey }: PreviewProps) {
  return (
    <Shell>
      <div className="relative w-36 h-24 bg-forest-800 rounded-lg overflow-hidden">
        <p className="absolute inset-0 flex items-center justify-center font-deva text-gold-300 text-sm">{SAMPLE.bappa}</p>
        <motion.div className="absolute inset-0 bg-maroon-800 cursor-grab active:cursor-grabbing flex items-center justify-center"
          drag="x" dragConstraints={{ left: -144, right: 0 }} dragElastic={0}
          whileDrag={{ cursor: 'grabbing' }}>
          <span className="text-cream-100 text-xs">Drag →</span>
        </motion.div>
      </div>
    </Shell>
  );
}

/* 5. Magnetic Button */
export function IntMagnetic({ playing, resetKey }: PreviewProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  return (
    <Shell>
      <button ref={ref} className="px-5 py-2.5 rounded-full bg-gold-500 text-forest-950 text-xs font-medium"
        onMouseMove={(e) => {
          const r = ref.current!.getBoundingClientRect();
          setPos({ x: (e.clientX - r.left - r.width / 2) * 0.3, y: (e.clientY - r.top - r.height / 2) * 0.3 });
        }}
        onMouseLeave={() => setPos({ x: 0, y: 0 })}
        style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}>
        Magnetic
      </button>
    </Shell>
  );
}

/* 6. Button Ripple */
export function IntRipple({ playing, resetKey }: PreviewProps) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  return (
    <Shell>
      <button className="relative px-6 py-3 rounded-full bg-saffron-500 text-white text-xs overflow-hidden"
        onClick={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          const id = Date.now();
          setRipples((rs) => [...rs, { x: e.clientX - r.left, y: e.clientY - r.top, id }]);
          setTimeout(() => setRipples((rs) => rs.filter((r2) => r2.id !== id)), 600);
        }}>
        Click me
        {ripples.map((r) => (
          <motion.span key={r.id} className="absolute rounded-full bg-white/40" style={{ left: r.x, top: r.y }}
            initial={{ width: 0, height: 0, x: 0, y: 0, opacity: 0.6 }} animate={{ width: 200, height: 200, x: -100, y: -100, opacity: 0 }} transition={{ duration: 0.6 }} />
        ))}
      </button>
    </Shell>
  );
}

/* 7. Button Glow */
export function IntButtonGlow({ playing, resetKey }: PreviewProps) {
  const t = useAnimationLoop(2, playing, resetKey);
  return (
    <Shell>
      <motion.button className="px-6 py-3 rounded-full bg-forest-700 text-gold-200 text-xs border border-gold-400/60"
        animate={{ boxShadow: `0 0 ${10 + Math.sin(t * Math.PI * 2) * 20}px rgba(228,197,81,0.6)` }}>
        Glow Button
      </motion.button>
    </Shell>
  );
}

/* 8. Hover Tilt */
export function IntHoverTilt({ playing, resetKey }: PreviewProps) {
  const [rot, setRot] = useState({ x: 0, y: 0 });
  return (
    <Shell>
      <div className="perspective-[800px]">
        <motion.img src={PHOTOS.ganesh3} className="w-28 h-32 object-cover rounded-lg shadow-xl"
          style={{ transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)`, transformStyle: 'preserve-3d' }}
          onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            setRot({ x: -((e.clientY - r.top) / r.height - 0.5) * 20, y: ((e.clientX - r.left) / r.width - 0.5) * 20 });
          }}
          onMouseLeave={() => setRot({ x: 0, y: 0 })} />
      </div>
    </Shell>
  );
}

/* 9. 3D Card Tilt */
export function Int3DCard({ playing, resetKey }: PreviewProps) {
  const [rot, setRot] = useState({ x: 0, y: 0 });
  return (
    <Shell>
      <div className="perspective-[1000px]">
        <motion.div className="w-32 h-40 rounded-xl bg-gradient-to-br from-maroon-700 to-forest-800 border border-gold-400/40 p-3 flex flex-col justify-between"
          style={{ transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)`, transformStyle: 'preserve-3d' }}
          onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            setRot({ x: -((e.clientY - r.top) / r.height - 0.5) * 25, y: ((e.clientX - r.left) / r.width - 0.5) * 25 });
          }}
          onMouseLeave={() => setRot({ x: 0, y: 0 })}>
          <p className="font-deva text-gold-300 text-xs">॥ श्री गणेशाय नमः ॥</p>
          <p className="text-cream-200 text-[10px]">Ganpati 2026</p>
        </motion.div>
      </div>
    </Shell>
  );
}

/* 10. Interactive Cursor Glow */
export function IntCursorGlow({ playing, resetKey }: PreviewProps) {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  return (
    <Shell>
      <div className="absolute inset-0" onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
      }}>
        <div className="absolute w-32 h-32 rounded-full bg-gold-400/30 blur-2xl pointer-events-none" style={{ left: pos.x - 64, top: pos.y - 64 }} />
        <p className="absolute inset-0 flex items-center justify-center text-cream-200 text-xs">Move cursor</p>
      </div>
    </Shell>
  );
}

/* 11. Cursor Particle Trail */
export function IntCursorTrail({ playing, resetKey }: PreviewProps) {
  const [parts, setParts] = useState<{ id: number; x: number; y: number }[]>([]);
  return (
    <Shell>
      <div className="absolute inset-0" onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        const id = Date.now() + Math.random();
        setParts((p) => [...p.slice(-15), { id, x: e.clientX - r.left, y: e.clientY - r.top }]);
        setTimeout(() => setParts((p) => p.filter((pp) => pp.id !== id)), 800);
      }}>
        {parts.map((p) => (
          <motion.div key={p.id} className="absolute w-1.5 h-1.5 rounded-full bg-gold-300" style={{ left: p.x, top: p.y }}
            initial={{ opacity: 1, scale: 1 }} animate={{ opacity: 0, scale: 0 }} transition={{ duration: 0.8 }} />
        ))}
      </div>
    </Shell>
  );
}

/* 12. Touch Ripple */
export function IntTouchRipple({ playing, resetKey }: PreviewProps) {
  const [rs, setRs] = useState<{ x: number; y: number; id: number }[]>([]);
  return (
    <Shell>
      <div className="absolute inset-0" onTouchStart={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        const id = Date.now();
        setRs((arr) => [...arr, { x: e.touches[0].clientX - r.left, y: e.touches[0].clientY - r.top, id }]);
        setTimeout(() => setRs((arr) => arr.filter((a) => a.id !== id)), 800);
      }}
        onClick={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          const id = Date.now();
          setRs((arr) => [...arr, { x: e.clientX - r.left, y: e.clientY - r.top, id }]);
          setTimeout(() => setRs((arr) => arr.filter((a) => a.id !== id)), 800);
        }}>
        {rs.map((r) => (
          <motion.div key={r.id} className="absolute rounded-full border-2 border-gold-400" style={{ left: r.x, top: r.y }}
            initial={{ width: 0, height: 0, x: 0, y: 0, opacity: 0.8 }} animate={{ width: 100, height: 100, x: -50, y: -50, opacity: 0 }} transition={{ duration: 0.7 }} />
        ))}
        <p className="absolute inset-0 flex items-center justify-center text-cream-200 text-xs pointer-events-none">Tap anywhere</p>
      </div>
    </Shell>
  );
}

/* 13. Image Tilt */
export function IntImageTilt({ playing, resetKey }: PreviewProps) {
  const [rot, setRot] = useState(0);
  return (
    <Shell>
      <motion.img src={PHOTOS.family1} className="w-24 h-32 object-cover rounded-lg shadow-xl"
        animate={{ rotate: rot }}
        onClick={() => setRot((r) => r + 360)} transition={{ duration: 0.6 }} />
    </Shell>
  );
}

/* 14. Interactive Diya */
export function IntDiya({ playing, resetKey }: PreviewProps) {
  const [lit, setLit] = useState(false);
  return (
    <Shell>
      <button onClick={() => setLit((v) => !v)} className="flex flex-col items-center gap-2">
        <motion.div className="text-3xl" animate={{ scale: lit ? 1.1 : 1 }}>{lit ? '🪔' : '🕯️'}</motion.div>
        {lit && <motion.div className="absolute rounded-full bg-saffron-400/40 blur-2xl" style={{ width: 100, height: 100 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} />}
        <span className="text-cream-200 text-[10px]">{lit ? 'Tap to extinguish' : 'Tap to light'}</span>
      </button>
    </Shell>
  );
}

/* 15. Tap Confetti */
export function IntTapConfetti({ playing, resetKey }: PreviewProps) {
  const [bursts, setBursts] = useState<{ id: number; parts: { x: number; y: number; c: string }[] }[]>([]);
  const colors = ['#e4c551', '#f97316', '#c03736', '#3c7457'];
  const burst = (cx: number, cy: number) => {
    const id = Date.now();
    const parts = range(14).map((i) => { const ang = (i / 14) * Math.PI * 2; return { x: Math.cos(ang) * 60, y: Math.sin(ang) * 60, c: colors[i % 4] }; });
    setBursts((b) => [...b, { id, parts }]);
    setTimeout(() => setBursts((b) => b.filter((bb) => bb.id !== id)), 900);
  };
  return (
    <Shell>
      <div className="absolute inset-0 flex items-center justify-center" onClick={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        burst(e.clientX - r.left - 90, e.clientY - r.top - 50);
      }}>
        <p className="text-cream-200 text-xs">Tap for confetti 🎉</p>
        {bursts.map((b) => (
          <div key={b.id} className="absolute" style={{ left: '50%', top: '50%' }}>
            {b.parts.map((p, i) => (
              <motion.div key={i} className="absolute w-1.5 h-1.5 rounded-full" style={{ background: p.c }}
                initial={{ x: 0, y: 0, opacity: 1 }} animate={{ x: p.x, y: p.y, opacity: 0 }} transition={{ duration: 0.8 }} />
            ))}
          </div>
        ))}
      </div>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return <div className="relative h-full w-full overflow-hidden rounded-xl bg-forest-950 flex items-center justify-center">{children}</div>;
}
