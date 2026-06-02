import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  Brain,
  ShieldCheck,
  Workflow,
  Activity,
  Linkedin,
  Mail,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import logoAsset from "@/assets/procston-logo.png.asset.json";
import { Particles } from "@/components/procston/Particles";
import { Countdown } from "@/components/procston/Countdown";
import { Waitlist } from "@/components/procston/Waitlist";
import { FeatureCard } from "@/components/procston/FeatureCard";
import { Stat } from "@/components/procston/Stat";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Procston — AI-Powered Procurement Intelligence" },
      {
        name: "description",
        content:
          "Something powerful is coming. AI-driven procurement intelligence, supplier insights, and enterprise data automation — all in one platform.",
      },
      { property: "og:title", content: "Procston — Coming Soon" },
      {
        property: "og:description",
        content:
          "AI-driven procurement intelligence, supplier insights, and enterprise data automation.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen overflow-hidden mesh-bg text-foreground">
      {/* ambient layers */}
      <div className="pointer-events-none absolute inset-0 grid-lines" aria-hidden />
      <Particles />

      {/* Nav */}
      <header className="relative z-10 flex items-center justify-between px-6 py-6 sm:px-10">
        <img src={logoAsset.url} alt="Procston" className="h-7 sm:h-8 w-auto" />
        <a
          href="#contact"
          className="hidden sm:inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-soft-foreground backdrop-blur transition hover:border-[color:var(--primary)]/40 hover:text-foreground"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--primary)] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--primary)]" />
          </span>
          Launching Q3 2026
        </a>
      </header>

      {/* Hero */}
      <section className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 pt-12 pb-24 text-center sm:pt-20">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-[color:var(--primary)]/25 bg-[color:var(--primary)]/5 px-4 py-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--primary)]"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Next Generation Procurement Platform
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-8 font-display text-5xl sm:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight"
        >
          Something{" "}
          <span className="text-gradient-green">Powerful</span>
          <br />
          is Coming
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-soft-foreground"
        >
          AI-driven procurement intelligence, supplier insights, and enterprise data
          automation — all in one platform built for the world's most ambitious teams.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#waitlist"
            className="group inline-flex items-center gap-2 rounded-xl bg-[color:var(--primary)] px-6 py-3 text-sm font-semibold text-[color:var(--primary-foreground)] glow-green transition hover:brightness-110"
          >
            Notify Me
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur transition hover:border-white/30 hover:bg-white/10"
          >
            Contact Us
          </a>
        </motion.div>

        {/* floating orbs */}
        <div className="pointer-events-none absolute left-10 top-1/3 hidden h-32 w-32 rounded-full bg-[color:var(--primary)]/20 blur-3xl animate-float md:block" />
        <div className="pointer-events-none absolute right-10 top-1/2 hidden h-40 w-40 rounded-full bg-[color:var(--copper)]/20 blur-3xl animate-float md:block" style={{ animationDelay: "2s" }} />
      </section>

      {/* Countdown */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-8 text-center"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Launch Countdown
          </p>
        </motion.div>
        <Countdown />
      </section>

      {/* Features */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-24">
        <div className="mb-12 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--primary)]">
            What's Inside
          </p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold">
            An intelligence layer for{" "}
            <span className="text-gradient-copper">modern procurement</span>.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon={Brain}
            title="AI Procurement Intelligence"
            description="Contextual sourcing copilots that learn your categories, contracts, and counterparties."
            delay={0}
          />
          <FeatureCard
            icon={ShieldCheck}
            title="Supplier Risk Analytics"
            description="Continuous risk scoring across financial, geopolitical, and ESG signals."
            accent="copper"
            delay={0.08}
          />
          <FeatureCard
            icon={Workflow}
            title="Automated Data Processing"
            description="Ingest contracts, invoices, and PO data into a single, queryable graph."
            delay={0.16}
          />
          <FeatureCard
            icon={Activity}
            title="Real-Time Business Insights"
            description="Live dashboards and anomaly alerts that turn spend into decisions."
            accent="copper"
            delay={0.24}
          />
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-24">
        <div className="glass-card rounded-3xl p-10 sm:p-14">
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            <Stat value={10_000_000} suffix="+" label="Data records processed" />
            <Stat value={500} suffix="+" label="Enterprise workflows" />
            <Stat value={98} suffix="%" label="Automation accuracy" />
            <Stat value={24} suffix="/7" label="AI monitoring" />
          </div>
        </div>
      </section>

      {/* Waitlist */}
      <section id="waitlist" className="relative z-10 mx-auto max-w-3xl px-6 pb-28 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display text-3xl sm:text-5xl font-bold"
        >
          Be First to Experience{" "}
          <span className="text-gradient-green">Procston</span>
        </motion.h2>
        <p className="mx-auto mt-4 max-w-xl text-soft-foreground">
          Join a private cohort of procurement and data leaders shaping the launch.
        </p>
        <div className="mt-8">
          <Waitlist />
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="relative z-10 border-t border-white/10 bg-black/40 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 sm:flex-row">
          <div className="flex items-center gap-3">
            <img src={logoAsset.url} alt="Procston" className="h-6 w-auto" />
            <span className="text-xs text-muted-foreground">
              AI-Powered Procurement Intelligence
            </span>
          </div>
          <div className="flex items-center gap-6 text-xs text-soft-foreground">
            <a href="mailto:hello@procston.com" className="inline-flex items-center gap-1.5 transition hover:text-foreground">
              <Mail className="h-3.5 w-3.5" /> Contact
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 transition hover:text-foreground">
              <Linkedin className="h-3.5 w-3.5" /> LinkedIn
            </a>
            <a href="#" className="transition hover:text-foreground">Privacy</a>
          </div>
          <p className="text-xs text-muted-foreground">
            © 2025 Procston. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
