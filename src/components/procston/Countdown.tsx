import { useEffect, useState } from "react";
import { motion } from "motion/react";

const TARGET = new Date("2026-09-01T09:00:00Z").getTime();

function getRemaining() {
  const diff = Math.max(0, TARGET - Date.now());
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { d, h, m, s };
}

const Cell = ({ value, label }: { value: number; label: string }) => (
  <div className="glass-card relative flex flex-col items-center justify-center rounded-2xl px-4 py-6 sm:px-8 sm:py-8 min-w-[88px] sm:min-w-[140px]">
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
  </div>
);

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