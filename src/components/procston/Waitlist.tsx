import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, ArrowRight } from "lucide-react";

export function Waitlist() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setSent(true);
  };

  return (
    <div className="mx-auto w-full max-w-xl">
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="ok"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="glass-card glow-green flex items-center justify-center gap-3 rounded-2xl px-6 py-5"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[color:var(--primary)] text-[color:var(--primary-foreground)]">
              <Check className="h-5 w-5" />
            </span>
            <span className="text-soft-foreground">
              You're on the list. We'll reach out to{" "}
              <span className="text-foreground">{email}</span>.
            </span>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={submit}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="glass-card flex items-center gap-2 rounded-2xl p-2"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="flex-1 bg-transparent px-4 py-3 text-sm sm:text-base text-foreground placeholder:text-muted-foreground outline-none"
            />
            <button
              type="submit"
              className="group inline-flex items-center gap-2 rounded-xl bg-[color:var(--primary)] px-5 py-3 text-sm font-semibold text-[color:var(--primary-foreground)] transition hover:brightness-110 glow-green"
            >
              Join Waitlist
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </motion.form>
        )}
      </AnimatePresence>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        No spam. Early enterprise access opens Q3 2026.
      </p>
    </div>
  );
}