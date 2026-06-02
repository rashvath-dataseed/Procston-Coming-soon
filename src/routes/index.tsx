import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import logoAsset from "@/assets/procston-logo.png.asset.json";
import { Particles } from "@/components/procston/Particles";
import { Countdown } from "@/components/procston/Countdown";
import { Waitlist } from "@/components/procston/Waitlist";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Procston — Launching Soon" },
      {
        name: "description",
        content:
          "Procston is launching soon. AI-Powered Procurement Intelligence — join the waitlist.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen overflow-hidden mesh-bg text-foreground flex flex-col">
      <div className="pointer-events-none absolute inset-0 grid-lines" aria-hidden />
      <Particles />

      {/* floating orbs */}
      <div className="pointer-events-none absolute -left-10 top-1/4 hidden h-56 w-56 rounded-full bg-[color:var(--primary)]/20 blur-3xl animate-float md:block" />
      <div
        className="pointer-events-none absolute -right-10 top-1/2 hidden h-64 w-64 rounded-full bg-[color:var(--copper)]/20 blur-3xl animate-float md:block"
        style={{ animationDelay: "2s" }}
      />

      <header className="relative z-10 flex items-center justify-center px-6 py-8">
        <img src={logoAsset.url} alt="Procston" className="h-8 w-auto" />
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

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mt-8 font-display text-5xl sm:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight"
        >
          We're <span className="text-gradient-green">Launching</span>
          <br />
          <span className="text-gradient-copper">Very Soon</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-soft-foreground"
        >
          AI-Powered Procurement Intelligence. Be the first to know when we go live.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-12 w-full"
        >
          <p className="mb-5 text-[10px] sm:text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Launching In
          </p>
          <Countdown />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-14 w-full"
        >
          <Waitlist />
        </motion.div>
      </main>

      <footer className="relative z-10 px-6 py-8 text-center text-xs text-muted-foreground">
        © 2025 Procston. All rights reserved.
      </footer>
    </div>
  );
}