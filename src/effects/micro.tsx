import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import type { PreviewProps } from '@/types';
import { useAnimationLoop, SAMPLE } from '@/lib/hooks';

/* 1. Button Hover */
export function MicroButtonHover({ playing, resetKey }: PreviewProps) {
  return (
    <Shell>
      <motion.button className="px-5 py-2 rounded-full bg-gold-500 text-forest-950 text-xs"
        whileHover={{ scale: 1.1, backgroundColor: '#e4c551' }} whileTap={{ scale: 0.95 }}>
        Hover me
      </motion.button>
    </Shell>
  );
}

/* 2. Button Press */
export function MicroButtonPress({ playing, resetKey }: PreviewProps) {
  return (
    <Shell>
      <motion.button className="px-5 py-2 rounded-full bg-saffron-500 text-white text-xs"
        whileTap={{ scale: 0.85, y: 2 }}>
        Press me
      </motion.button>
    </Shell>
  );
}

/* 3. Icon Bounce */
export function MicroIconBounce({ playing, resetKey }: PreviewProps) {
  const [b, setB] = useState(0);
  return (
    <Shell>
      <motion.div className="text-3xl cursor-pointer" onClick={() => setB((v) => v + 1)} animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 0.4 }} key={b}>
        🔔
      </motion.div>
    </Shell>
  );
}

/* 4. Icon Rotate */
export function MicroIconRotate({ playing, resetKey }: PreviewProps) {
  const [r, setR] = useState(0);
  return (
    <Shell>
      <motion.div className="text-3xl cursor-pointer" onClick={() => setR((v) => v + 1)} animate={{ rotate: r * 360 }} transition={{ duration: 0.6 }}>
        ⚙️
      </motion.div>
    </Shell>
  );
}

/* 5. Heart Beat */
export function MicroHeartBeat({ playing, resetKey }: PreviewProps) {
  const t = useAnimationLoop(1.2, playing, resetKey);
  const beat = t < 0.15 ? 1 + Math.sin(t / 0.15 * Math.PI) * 0.25 : t < 0.3 ? 1 + Math.sin((t - 0.15) / 0.15 * Math.PI) * 0.15 : 1;
  return (
    <Shell>
      <motion.div className="text-3xl" style={{ scale: beat }}>❤️</motion.div>
    </Shell>
  );
}

/* 6. Share Button Ripple */
export function MicroShareRipple({ playing, resetKey }: PreviewProps) {
  const [clicked, setClicked] = useState(false);
  return (
    <Shell>
      <button onClick={() => { setClicked(true); setTimeout(() => setClicked(false), 800); }} className="relative px-4 py-2 rounded-full bg-forest-700 text-gold-200 text-xs overflow-hidden">
        Share
        <AnimatePresence>
          {clicked && <motion.span className="absolute inset-0 rounded-full border-2 border-gold-400" initial={{ scale: 1, opacity: 1 }} animate={{ scale: 1.8, opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }} />}
        </AnimatePresence>
      </button>
    </Shell>
  );
}

/* 7. Copy Success */
export function MicroCopySuccess({ playing, resetKey }: PreviewProps) {
  const [copied, setCopied] = useState(false);
  return (
    <Shell>
      <button onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 1500); }} className="flex items-center gap-2 px-4 py-2 rounded bg-forest-700 text-cream-100 text-xs">
        <AnimatePresence mode="wait">
          {copied ? (
            <motion.span key="ok" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="text-green-400">✓ Copied</motion.span>
          ) : (
            <motion.span key="copy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>Copy link</motion.span>
          )}
        </AnimatePresence>
      </button>
    </Shell>
  );
}

/* 8. RSVP Success */
export function MicroRSVPSuccess({ playing, resetKey }: PreviewProps) {
  const [done, setDone] = useState(false);
  return (
    <Shell>
      <button onClick={() => setDone(true)} className="px-5 py-2 rounded-full bg-green-600 text-white text-xs">
        <AnimatePresence mode="wait">
          {!done ? <motion.span key="r" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>RSVP</motion.span>
            : <motion.span key="d" initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-1">✓ Attending</motion.span>}
        </AnimatePresence>
      </button>
    </Shell>
  );
}

/* 9. Form Success */
export function MicroFormSuccess({ playing, resetKey }: PreviewProps) {
  const [sent, setSent] = useState(false);
  return (
    <Shell>
      <button onClick={() => setSent(true)} className="px-4 py-1.5 rounded bg-gold-500 text-forest-950 text-xs">Send</button>
      <AnimatePresence>
        {sent && (
          <motion.div className="absolute inset-0 bg-forest-950/90 flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center">
              <div className="w-10 h-10 rounded-full bg-green-500 mx-auto mb-2 flex items-center justify-center text-white">✓</div>
              <p className="text-cream-100 text-xs">Sent!</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Shell>
  );
}

/* 10. Loading Spinner */
export function MicroSpinner({ playing, resetKey }: PreviewProps) {
  return (
    <Shell>
      <motion.div className="w-8 h-8 rounded-full border-2 border-gold-400/30 border-t-gold-400" animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} />
    </Shell>
  );
}

/* 11. Checkmark Morph */
export function MicroCheckmark({ playing, resetKey }: PreviewProps) {
  const [show, setShow] = useState(false);
  return (
    <Shell>
      <button onClick={() => setShow(true)} className="px-4 py-2 rounded bg-forest-700 text-cream-100 text-xs">Submit</button>
      <AnimatePresence>
        {show && (
          <motion.svg className="absolute" width="40" height="40" viewBox="0 0 40 40" initial={{ scale: 0 }} animate={{ scale: 1 }}>
            <motion.circle cx="20" cy="20" r="18" fill="#10b981" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
            <motion.path d="M12 20 L18 26 L28 14" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.3, duration: 0.4 }} />
          </motion.svg>
        )}
      </AnimatePresence>
    </Shell>
  );
}

/* 12. Heart Burst */
export function MicroHeartBurst({ playing, resetKey }: PreviewProps) {
  const [burst, setBurst] = useState(0);
  return (
    <Shell>
      <button onClick={() => setBurst((v) => v + 1)} className="relative">
        <motion.div className="text-2xl" key={burst} animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 0.4 }}>🤍</motion.div>
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const ang = (i / 6) * Math.PI * 2;
          return <motion.span key={`${burst}-${i}`} className="absolute text-xs" style={{ left: '50%', top: '50%' }} initial={{ x: 0, y: 0, opacity: 1 }} animate={{ x: Math.cos(ang) * 30, y: Math.sin(ang) * 30, opacity: 0 }} transition={{ duration: 0.6 }}>❤️</motion.span>;
        })}
      </button>
    </Shell>
  );
}

/* 13. Notification Slide */
export function MicroNotification({ playing, resetKey }: PreviewProps) {
  const [show, setShow] = useState(false);
  return (
    <Shell>
      <button onClick={() => { setShow(true); setTimeout(() => setShow(false), 2000); }} className="px-4 py-2 rounded bg-forest-700 text-cream-100 text-xs">Notify</button>
      <AnimatePresence>
        {show && (
          <motion.div className="absolute top-2 right-2 left-2 rounded-md bg-forest-700 border border-gold-400/40 p-2 text-xs text-cream-100" initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -60, opacity: 0 }}>
            New invitation received!
          </motion.div>
        )}
      </AnimatePresence>
    </Shell>
  );
}

/* 14. Tooltip Reveal */
export function MicroTooltip({ playing, resetKey }: PreviewProps) {
  return (
    <Shell>
      <div className="relative group">
        <span className="px-3 py-1 rounded bg-gold-500 text-forest-950 text-xs cursor-help">Hover</span>
        <motion.div className="absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-forest-700 text-cream-100 text-[10px] opacity-0 group-hover:opacity-100" initial={{ y: 5 }} whileHover={{ y: 0 }}>
          FestiveLink tip!
        </motion.div>
      </div>
    </Shell>
  );
}

/* 15. Menu Animation */
export function MicroMenu({ playing, resetKey }: PreviewProps) {
  const [open, setOpen] = useState(false);
  return (
    <Shell>
      <div className="flex flex-col gap-1.5 cursor-pointer" onClick={() => setOpen((v) => !v)}>
        <motion.div className="w-6 h-0.5 bg-cream-100" animate={{ rotate: open ? 45 : 0, y: open ? 8 : 0 }} />
        <motion.div className="w-6 h-0.5 bg-cream-100" animate={{ opacity: open ? 0 : 1 }} />
        <motion.div className="w-6 h-0.5 bg-cream-100" animate={{ rotate: open ? -45 : 0, y: open ? -8 : 0 }} />
      </div>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return <div className="relative h-full w-full rounded-xl bg-forest-950 flex items-center justify-center overflow-hidden">{children}</div>;
}
