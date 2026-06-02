import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

const TARGET = new Date("2026-09-01T09:00:00Z").getTime();

function getRemaining() {
  const diff = Math.max(0, TARGET - Date.now());
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { d, h, m, s };
}

const Cell = ({ value, label }: { value: number; label: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const springRotX = useSpring(rotX, { stiffness: 150, damping: 20 });
  const springRotY = useSpring(rotY, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = (e.clientX - rect.left) / rect.width - 0.5;
    const cy = (e.clientY - rect.top) / rect.height - 0.5;
    rotY.set(cx * 18);
    rotX.set(-cy * 18);
  };
  const handleMouseLeave = () => {
    rotX.set(0);
    rotY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springRotX,
        rotateY: springRotY,
        transformPerspective: 600,
      }}
      whileHover={{ scale: 1.06 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      className="glass-card relative flex flex-col items-center justify-center rounded-2xl px-4 py-6 sm:px-8 sm:py-8 min-w-[88px] sm:min-w-[140px] cursor-default select-none overflow-hidden"
    >
      {/* shimmer sweep */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0"
        whileHover={{ opacity: 1 }}
        style={{
          background:
            "linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)",
          backgroundSize: "200% 100%",
        }}
        animate={{ backgroundPositionX: ["200%", "-200%"] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute inset-0 rounded-2xl ring-1 ring-[color:var(--primary)]/20" />
      <motion.span
        key={value}
        initial={{ y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="font-display text-4xl sm:text-6xl font-bold text-gradient-green tabular-nums"
      >
        {String(value).padStart(2, "0")}
      </motion.span>
      <span className="mt-2 text-[10px] sm:text-xs uppercase tracking-[0.3em] text-muted-foreground">
        {label}
      </span>
    </motion.div>
  );
};

export function Countdown() {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    setT(getRemaining());
    const i = setInterval(() => setT(getRemaining()), 1000);
    return () => clearInterval(i);
  }, []);
  if (!mounted) {
    return <div className="h-[140px] sm:h-[180px]" aria-hidden />;
  }
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
      <Cell value={t.d} label="Days" />
      <Cell value={t.h} label="Hours" />
      <Cell value={t.m} label="Minutes" />
      <Cell value={t.s} label="Seconds" />
    </div>
  );
}
