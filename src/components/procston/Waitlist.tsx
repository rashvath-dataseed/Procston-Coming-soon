import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, ArrowRight, Loader2 } from "lucide-react";

const FORM_ENDPOINT =
  "https://docs.google.com/forms/d/e/1FAIpQLSdmSLfpTOlduoQJYTYv4jhbY47Fd5BZCLIpy-q4CRfLLw3y7w/formResponse";

export function Waitlist() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("entry.1167444150", name.trim());
      formData.append("entry.827599957", email.trim());
      formData.append("entry.233859029", message.trim());

      await fetch(FORM_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });

      setSent(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md">
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
            <span className="text-soft-foreground">Thank you! Your message has been received.</span>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={submit}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="glass-card flex flex-col gap-3 rounded-xl p-4 ring-1 ring-white/10 shadow-[0_0_30px_-10px_oklch(0.92_0.24_130/0.2)] backdrop-blur-xl"
          >
            <div className="mb-0.5 border-b border-white/8 pb-3">
              <h2 className="text-sm font-semibold text-white/80 tracking-tight">
                Let's Stay Connected...!
              </h2>
              <p className="mt-0.5 text-[11px] text-white/35">
                Leave your details and we'll keep you posted.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <label className="flex flex-col gap-1 flex-1 items-start">
                <span className="text-[9px] uppercase tracking-[0.2em] text-white/40 px-0.5">
                  Name
                </span>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full rounded-lg bg-white/[0.05] px-3 py-2 text-xs text-white placeholder:text-white/25 outline-none border border-white/8 focus:border-[color:var(--primary)]/40 transition-all"
                />
              </label>
              <label className="flex flex-col gap-1 flex-1 items-start">
                <span className="text-[9px] uppercase tracking-[0.2em] text-white/40 px-0.5">
                  Email
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full rounded-lg bg-white/[0.05] px-3 py-2 text-xs text-white placeholder:text-white/25 outline-none border border-white/8 focus:border-[color:var(--primary)]/40 transition-all"
                />
              </label>
            </div>
            <label className="flex flex-col gap-1 items-start">
              <span className="text-[9px] uppercase tracking-[0.2em] text-white/40 px-0.5">
                Message
              </span>
              <textarea
                required
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us about your EPC procurement challenges…"
                className="w-full rounded-lg bg-white/[0.05] px-3 py-2 text-xs text-white placeholder:text-white/25 outline-none border border-white/8 focus:border-[color:var(--primary)]/40 transition-all resize-none"
              />
            </label>
            {error && <p className="text-xs text-destructive px-1">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-[color:var(--primary)]/90 px-4 py-2 text-xs font-semibold text-[color:var(--primary-foreground)] transition hover:bg-[color:var(--primary)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  Join Waitlist
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </>
              )}
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
