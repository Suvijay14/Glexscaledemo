"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Eye, EyeOff, Info } from "lucide-react";
import { DemoLogoMark } from "@/components/DemoLogoMark";
import {
  findValidCredential,
  saveSession,
  type GlexSession,
} from "@/lib/auth";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const cardControls = useAnimation();

  const title =
    role === "vendor"
      ? "Welcome, Vendor."
      : role === "partner"
        ? "Welcome, Partner."
        : "Welcome back";

  const subtitle =
    role === "vendor"
      ? "Sign in to find your channel partners."
      : role === "partner"
        ? "Sign in to get discovered by vendors."
        : "Sign in to access PartnerMatch";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(false);
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const cred = findValidCredential(email, password);
    if (!cred) {
      setError(true);
      setLoading(false);
      await cardControls.start({
        x: [0, -12, 12, -8, 8, -4, 4, 0],
        transition: { duration: 0.45 },
      });
      cardControls.set({ x: 0 });
      return;
    }
    const session: GlexSession = {
      token: "glex_demo_session",
      role: cred.role,
      name: cred.name,
      loggedIn: true,
    };
    saveSession(session);
    setLoading(false);
    router.push("/app");
  }

  function continueDemo() {
    router.push("/demo");
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-[#0A0A0F] px-4 py-12">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(87,2,132,0.35)_0%,transparent_55%)]"
        aria-hidden
      />
      <motion.div
        animate={cardControls}
        className="relative z-10 w-full max-w-[420px] rounded-2xl border border-dark-border bg-[#12101A] p-10 shadow-2xl"
      >
        <div className="flex flex-col items-center">
          <DemoLogoMark className="h-10 w-10" />
          <p className="mt-4 font-syne text-[22px] font-bold text-white">
            GlexScale
          </p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-[#7DD855]">
            PartnerMatch
          </p>
        </div>

        <div className="my-8 h-px bg-[#1E1A2E]" />

        <h1 className="text-center font-syne text-[28px] font-bold text-white">
          {title}
        </h1>
        <p className="mt-2 text-center text-sm text-text-secondary">{subtitle}</p>

        <div className="mt-8 flex rounded-lg border border-dark-border bg-dark-bg p-1">
          <div className="flex-1 rounded-md bg-purple-primary py-2 text-center text-sm font-semibold text-white">
            Log in
          </div>
          <button
            type="button"
            disabled
            title="Coming soon"
            className="flex-1 cursor-not-allowed rounded-md py-2 text-sm font-semibold text-text-muted opacity-50"
          >
            Sign up
          </button>
        </div>
        <p className="mt-1 text-center text-[10px] text-text-muted">
          Sign up —{" "}
          <span
            className="cursor-help border-b border-dotted border-text-muted"
            title="Coming soon"
          >
            Coming soon
          </span>
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-text-secondary"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-dark-border bg-[#1A1625] px-4 py-3 text-white placeholder:text-text-muted focus:border-purple-primary focus:outline-none focus:ring-1 focus:ring-purple-primary"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-text-secondary"
            >
              Password
            </label>
            <div className="relative mt-1.5">
              <input
                id="password"
                type={showPw ? "text" : "password"}
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-dark-border bg-[#1A1625] py-3 pl-4 pr-12 text-white placeholder:text-text-muted focus:border-purple-primary focus:outline-none focus:ring-1 focus:ring-purple-primary"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-white"
                onClick={() => setShowPw((v) => !v)}
                aria-label={showPw ? "Hide password" : "Show password"}
              >
                {showPw ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <span className="cursor-pointer text-xs text-text-secondary hover:text-white">
              Forgot password?
            </span>
          </div>

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0 }}
                className="text-sm text-red-400"
              >
                Invalid email or password. Try demo@glexscale.com / demo1234
              </motion.p>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-purple-primary py-3 text-sm font-semibold text-white transition hover:bg-purple-light disabled:opacity-70"
          >
            {loading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Signing in...
              </>
            ) : (
              "Log in"
            )}
          </button>
        </form>

        <div className="my-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-dark-border" />
          <span className="text-xs text-text-muted">or</span>
          <div className="h-px flex-1 bg-dark-border" />
        </div>

        <button
          type="button"
          onClick={continueDemo}
          className="w-full rounded-lg border border-dark-border bg-[#1A1625] py-3 text-sm font-semibold text-white transition hover:border-green-accent"
        >
          Continue as Demo User →
        </button>
        <p className="mt-2 text-center text-xs text-text-muted">
          No login required · Explore all features
        </p>

        <div className="mt-8 flex items-start gap-3 rounded-lg border border-[#2D1F4E] bg-[#1A0A2E] p-3">
          <Info
            className="mt-0.5 h-5 w-5 shrink-0 text-purple-light"
            aria-hidden
          />
          <div>
            <p className="text-sm text-text-secondary">
              <span className="font-medium text-white">Demo credentials:</span>{" "}
              demo@glexscale.com · demo1234
            </p>
            <p className="mt-1 text-xs text-text-muted">
              Or click &apos;Continue as Demo User&apos; to skip login
            </p>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-text-secondary">
          Partner access?{" "}
          <span className="cursor-pointer font-medium text-green-accent hover:underline">
            Apply to join →
          </span>
        </p>
      </motion.div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#0A0A0F] text-text-secondary">
          Loading…
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
