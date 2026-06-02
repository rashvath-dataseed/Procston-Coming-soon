import { createFileRoute } from "@tanstack/react-router";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import logoAsset from "@/assets/procston-logo.png.asset.json";
import bgImage from "@/assets/bg.jpg";
import { Particles } from "@/components/procston/Particles";
import { Countdown } from "@/components/procston/Countdown";
import { Waitlist } from "@/components/procston/Waitlist";
import TextType from "@/components/procston/TextType";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Procston — Launching Soon" },
      {
        name: "description",
        content:
          "Procston is launching soon. Next-Generation EPC Procurement Platform — join the waitlist.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [animKey, setAnimKey] = useState(0);
  useEffect(() => {
    setAnimKey((k) => k + 1);
  }, []);

  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);
  const springX = useSpring(cursorX, { stiffness: 120, damping: 20 });
  const springY = useSpring(cursorY, { stiffness: 120, damping: 20 });

  const orbLeftX = useMotionValue(0);
  const orbLeftY = useMotionValue(0);
  const orbRightX = useMotionValue(0);
  const orbRightY = useMotionValue(0);

  const springOrbLX = useSpring(orbLeftX, { stiffness: 40, damping: 18 });
  const springOrbLY = useSpring(orbLeftY, { stiffness: 40, damping: 18 });
  const springOrbRX = useSpring(orbRightX, { stiffness: 30, damping: 16 });
  const springOrbRY = useSpring(orbRightY, { stiffness: 30, damping: 16 });

  const cursorLeft = useTransform(springX, (v) => v - 128);
  const cursorTop = useTransform(springY, (v) => v - 128);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      const cx = (e.clientX / window.innerWidth - 0.5) * 2;
      const cy = (e.clientY / window.innerHeight - 0.5) * 2;
      orbLeftX.set(cx * 30);
      orbLeftY.set(cy * 30);
      orbRightX.set(cx * -24);
      orbRightY.set(cy * -24);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [cursorX, cursorY, orbLeftX, orbLeftY, orbRightX, orbRightY]);

  return (
    <div className="relative min-h-screen overflow-hidden mesh-bg text-foreground flex flex-col">
      {/* video background */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <img
          src={bgImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-black/62" />
      </div>

      {/* cursor glow */}
      <motion.div
        className="pointer-events-none fixed z-50 h-64 w-64 rounded-full"
        style={{
          x: cursorLeft,
          y: cursorTop,
          background: "radial-gradient(circle, rgba(80,200,120,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="pointer-events-none absolute inset-0 grid-lines" aria-hidden />
      <Particles />

      {/* floating orbs with mouse parallax */}
      <motion.div
        className="pointer-events-none absolute -left-10 top-1/4 hidden h-56 w-56 rounded-full bg-[color:var(--primary)]/20 blur-3xl animate-float md:block"
        style={{ x: springOrbLX, y: springOrbLY }}
      />
      <motion.div
        className="pointer-events-none absolute -right-10 top-1/2 hidden h-64 w-64 rounded-full bg-[color:var(--copper)]/20 blur-3xl animate-float md:block"
        style={{ x: springOrbRX, y: springOrbRY, animationDelay: "2s" }}
      />

      <header className="relative z-10 flex items-center justify-center px-6 py-8">
        <div className="relative">
          <div className="absolute -inset-3 rounded-2xl bg-[color:var(--primary)]/10 blur-xl" />
          <img
            src="https://olive-duck-672749.hostingersite.com/wp-content/uploads/2026/05/Procston-Light.png"
            alt="Procston"
            className="relative h-9 w-auto drop-shadow-[0_0_12px_rgba(80,200,120,0.5)]"
          />
        </div>
      </header>

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-[color:var(--primary)]/25 bg-[color:var(--primary)]/5 px-4 py-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--primary)]"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--primary)] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--primary)]" />
          </span>
          <Sparkles className="h-3.5 w-3.5" />
          Website Launching Soon
        </motion.div>

        <h1
          key={animKey}
          className="mt-8 font-display text-5xl sm:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight text-white"
        >
          <TextType
            as="span"
            text={["We're Launching Very Soon", "Next-Gen EPC Procurement"]}
            typingSpeed={60}
            deletingSpeed={35}
            pauseDuration={2000}
            showCursor={true}
            cursorCharacter="|"
            cursorClassName="text-[color:var(--primary)]"
            className="text-white"
          />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-soft-foreground"
        >
          Next-Generation EPC Procurement Platform. Be the first to know when we go live.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-12 w-full"
        >
          <p className="mb-5 text-[10px] sm:text-xs uppercase tracking-[0.3em] font-semibold text-[color:var(--primary)] drop-shadow-[0_0_8px_oklch(0.92_0.24_130/0.7)]">
            Launching In
          </p>
          <Countdown />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-24 w-full"
        >
          <Waitlist />
        </motion.div>
      </main>

      <footer className="relative z-10 px-6 py-8 text-center text-xs text-muted-foreground">
        © 2026 Procston. All rights reserved.
      </footer>
    </div>
  );
}