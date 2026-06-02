import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

export function Stat({
  value,
  suffix = "",
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const dur = 1600;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(value * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  const display =
    value >= 1_000_000
      ? `${(n / 1_000_000).toFixed(n >= value ? 0 : 1)}M`
      : value >= 1000
        ? `${Math.round(n).toLocaleString()}`
        : `${Math.round(n)}`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <div className="font-display text-5xl sm:text-6xl font-bold text-gradient-green">
        {display}
        {suffix}
      </div>
      <div className="mt-3 text-xs sm:text-sm uppercase tracking-[0.25em] text-soft-foreground">
        {label}
      </div>
    </motion.div>
  );
}