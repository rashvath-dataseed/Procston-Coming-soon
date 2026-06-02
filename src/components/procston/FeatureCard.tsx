import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";

export function FeatureCard({
  icon: Icon,
  title,
  description,
  accent = "green",
  delay = 0,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  accent?: "green" | "copper";
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -4 }}
      className="group glass-card relative overflow-hidden rounded-2xl p-6 transition-shadow duration-500 hover:glow-green"
    >
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
        style={{
          background:
            accent === "green"
              ? "var(--gradient-green)"
              : "var(--gradient-copper)",
        }}
      />
      <div
        className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ring-1 ${
          accent === "green"
            ? "bg-[color:var(--primary)]/10 ring-[color:var(--primary)]/30 text-[color:var(--primary)]"
            : "bg-[color:var(--copper)]/10 ring-[color:var(--copper)]/30 text-[color:var(--copper)]"
        }`}
      >
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-5 font-display text-lg font-semibold text-foreground">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-soft-foreground">
        {description}
      </p>
      <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-[color:var(--primary)]/30 to-transparent opacity-50" />
    </motion.div>
  );
}