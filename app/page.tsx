"use client";

import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Sparkles,
  LineChart,
  Handshake,
  Globe2,
  Leaf,
  ShieldCheck,
  Share2,
  MessageCircle,
  X,
  Building2,
  Users,
  Check,
} from "lucide-react";
import {
  useState,
  useLayoutEffect,
  useEffect,
  useMemo,
  useRef,
  type CSSProperties,
} from "react";
import { CountUp } from "@/components/CountUp";
import { GlexScaleLogo } from "@/components/GlexScaleLogo";
import {
  FONTS,
  GLEX_FONT_CHANGE_EVENT,
  GLEX_FONT_PREVIEW_EVENT,
  GLEX_FONT_STORAGE_KEY,
} from "@/lib/fonts";

const DARK_TOKENS = {
  bgPrimary: "#0A0A0F",
  bgSurface: "#12101A",
  bgCard: "#1A1625",
  bgBorder: "#1E1A2E",
  textPrimary: "#FFFFFF",
  textSecondary: "#A89BC2",
  textMuted: "#6B5F82",
  brandPurple: "#570284",
  brandGreen: "#7DD855",
  btnPrimaryBg: "#570284",
  btnPrimaryText: "#FFFFFF",
  btnSecondaryBorder: "#7DD855",
  btnSecondaryText: "#7DD855",
  btnDemoBg: "#FFFFFF",
  btnDemoText: "#0A0A0F",
  statValue: "#FFFFFF",
  stepCardBg: "#1A1625",
  stepCardBorder: "#1E1A2E",
  diffCardBg: "#1A1625",
  diffCardBorder: "#1E1A2E",
  diffAccent: "#7DD855",
  statsBannerBg: "#570284",
  orb1: "#570284",
  orb2: "#3D015C",
  orb3: "#7B35B8",
  floatingBarBg: "rgba(10,10,15,0.92)",
  floatingBarBorder: "#1E1A2E",
  heroRadial:
    "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(87, 2, 132, 0.45) 0%, #0A0A0F 55%)",
};

const LIGHT_TOKENS = {
  bgPrimary: "#F5F0E8",
  bgSurface: "#EDE5D5",
  bgCard: "#FFFFFF",
  bgBorder: "#D0C8B8",
  textPrimary: "#1A1614",
  textSecondary: "#555555",
  textMuted: "#888888",
  brandPurple: "#570284",
  brandGreen: "#4A9E2E",
  btnPrimaryBg: "#570284",
  btnPrimaryText: "#FFFFFF",
  btnSecondaryBorder: "#570284",
  btnSecondaryText: "#570284",
  btnDemoBg: "#1A1614",
  btnDemoText: "#FFFFFF",
  statValue: "#570284",
  stepCardBg: "#FFFFFF",
  stepCardBorder: "#D0C8B8",
  diffCardBg: "#FFFFFF",
  diffCardBorder: "#D0C8B8",
  diffAccent: "#570284",
  statsBannerBg: "#1A1614",
  orb1: "#D4B8E8",
  orb2: "#C4A8DC",
  orb3: "#E8D4F5",
  floatingBarBg: "rgba(245,240,232,0.95)",
  floatingBarBorder: "#D0C8B8",
  heroRadial:
    "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(212, 184, 232, 0.4) 0%, #F5F0E8 55%)",
};

type Theme = typeof DARK_TOKENS;

const cardVariants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

function hexToRgba(hex: string, alpha: number) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

const whoForContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const whoForItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function HomePage() {
  const [persona, setPersona] = useState<"vendor" | "partner">("vendor");
  const [isDark, setIsDark] = useState(true);
  const [demoBarVisible, setDemoBarVisible] = useState(false);
  const [demoBarDismissed, setDemoBarDismissed] = useState(false);
  const [activeFont, setActiveFont] = useState("syne");
  const [previewFont, setPreviewFont] = useState<string | null>(null);

  const theme = useMemo(
    () => (isDark ? DARK_TOKENS : LIGHT_TOKENS),
    [isDark]
  );
  const t = theme;

  useLayoutEffect(() => {
    const root = document.querySelector("main > div");
    if (root instanceof HTMLElement) {
      root.style.opacity = "1";
      root.style.transform = "translateY(0px)";
    }
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("glexTheme");
    if (saved === "light") setIsDark(false);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem(GLEX_FONT_STORAGE_KEY);
    if (saved && FONTS.some((f) => f.id === saved)) {
      setActiveFont(saved);
    }
  }, []);

  useEffect(() => {
    const onFontChange = (e: Event) => {
      const d = (e as CustomEvent<{ fontId: string }>).detail;
      if (d?.fontId && FONTS.some((f) => f.id === d.fontId)) {
        setActiveFont(d.fontId);
      }
    };
    const onFontPreview = (e: Event) => {
      const d = (e as CustomEvent<{ fontId: string | null }>).detail;
      const id = d?.fontId ?? null;
      setPreviewFont(id && FONTS.some((f) => f.id === id) ? id : null);
    };
    window.addEventListener(GLEX_FONT_CHANGE_EVENT, onFontChange);
    window.addEventListener(GLEX_FONT_PREVIEW_EVENT, onFontPreview);
    return () => {
      window.removeEventListener(GLEX_FONT_CHANGE_EVENT, onFontChange);
      window.removeEventListener(GLEX_FONT_PREVIEW_EVENT, onFontPreview);
    };
  }, []);

  useEffect(() => {
    const onTheme = (e: Event) => {
      const d = (e as CustomEvent<{ isDark: boolean }>).detail;
      if (d && typeof d.isDark === "boolean") setIsDark(d.isDark);
    };
    window.addEventListener("glexThemeChange", onTheme as EventListener);
    return () =>
      window.removeEventListener("glexThemeChange", onTheme as EventListener);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setDemoBarVisible(true), 2500);
    return () => window.clearTimeout(timer);
  }, []);

  const transition =
    "background-color 0.4s ease, color 0.4s ease, border-color 0.3s ease";

  const eyebrowColor = isDark ? DARK_TOKENS.brandGreen : LIGHT_TOKENS.brandPurple;
  const headlineLine2Color = isDark
    ? DARK_TOKENS.brandGreen
    : LIGHT_TOKENS.brandPurple;

  const orDividerLine = isDark ? "#1E1A2E" : "#D0C8B8";
  const orPillBg = isDark ? "#1A1625" : "#F5F0E8";
  const orPillText = isDark ? "#6B5F82" : "#888888";

  const currentFont = FONTS.find((f) => f.id === activeFont) ?? FONTS[0];
  const displayFontCss = previewFont
    ? (FONTS.find((f) => f.id === previewFont)?.cssVar ?? currentFont.cssVar)
    : currentFont.cssVar;
  const heading = { fontFamily: currentFont.cssVar };
  const heroHeading = { fontFamily: displayFontCss };
  const heroTransition = `${transition}, font-family 0s`;

  return (
    <motion.div
      className="relative isolate z-[51] overflow-hidden pb-24"
      animate={{ backgroundColor: t.bgPrimary }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      style={{
        transition:
          "background-color 0.4s ease, color 0.4s ease, border-color 0.3s ease",
      }}
    >
      {/* Hero */}
      <section className="relative flex min-h-[calc(100vh-4.5rem)] flex-col justify-center px-4 pb-16 pt-8 md:px-8">
        <motion.div
          className="pointer-events-none absolute inset-0"
          animate={{ background: t.heroRadial }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />

        {!isDark && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
            {[80, 150, 220, 290, 360].map((size, i) => (
              <div
                key={i}
                className="absolute rounded-full border"
                style={{
                  width: size * 2,
                  height: size * 2,
                  borderColor: "rgba(87, 2, 132, 0.08)",
                }}
              />
            ))}
          </div>
        )}

        <ThemedOrb
          isDark={isDark}
          className="left-[10%] top-[20%]"
          size={320}
          delay={0}
          colorDark={DARK_TOKENS.orb1}
          colorLight={LIGHT_TOKENS.orb1}
        />
        <ThemedOrb
          isDark={isDark}
          className="right-[5%] top-[30%]"
          size={260}
          delay={1.2}
          duration={10}
          colorDark={DARK_TOKENS.brandGreen}
          colorLight={LIGHT_TOKENS.orb2}
        />
        <ThemedOrb
          isDark={isDark}
          className="bottom-[10%] left-[30%]"
          size={200}
          delay={2}
          duration={9}
          colorDark={DARK_TOKENS.orb3}
          colorLight={LIGHT_TOKENS.orb3}
        />

        <div className="relative z-10 mx-auto w-full max-w-5xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-xs font-medium uppercase tracking-widest"
            style={{ color: eyebrowColor }}
          >
            Channel Partner Intelligence · EMEA
          </motion.p>

          <div className="mt-4 space-y-1">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[40px] font-bold leading-tight tracking-tight md:text-[64px]"
              style={{ color: t.textPrimary, transition: heroTransition, ...heroHeading }}
            >
              Find the Right Partners.
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="text-[40px] font-bold leading-tight tracking-tight md:text-[64px]"
              style={{ color: headlineLine2Color, transition: heroTransition, ...heroHeading }}
            >
              Get Found by the Right Vendors.
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.26 }}
            className="mx-auto mt-6 max-w-3xl font-dm text-[18px] leading-relaxed"
            style={{ color: t.textSecondary, transition }}
          >
            PartnerMatch by GlexScale scores every vendor-partner match across 5
            dimensions — so you stop guessing and start closing.
          </motion.p>

          {/* Two CTA cards */}
          <div className="mx-auto mt-12 w-full max-w-[920px]">
            <div className="flex flex-col items-stretch gap-0 lg:flex-row lg:items-stretch">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-1 flex-col rounded-xl border p-6 text-left shadow-lg"
                style={{
                  backgroundColor: isDark ? "#1A1625" : "#FFFFFF",
                  borderColor: "#570284",
                  transition,
                }}
              >
                <span
                  className="inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white"
                  style={{ backgroundColor: "#570284" }}
                >
                  For vendors
                </span>
                <Building2
                  className="mt-4 h-8 w-8 shrink-0"
                  style={{ color: "#570284" }}
                  aria-hidden
                />
                <h2
                  className="mt-4 text-xl font-bold"
                  style={{ color: t.textPrimary, transition, ...heading }}
                >
                  I&apos;m a SaaS Vendor
                </h2>
                <p
                  className="mt-3 font-dm text-sm leading-relaxed"
                  style={{ color: t.textSecondary, transition }}
                >
                  I have a SaaS product and I need qualified channel partners to
                  sell it across Europe.
                </p>
                <ul className="mt-4 space-y-2 text-left">
                  {[
                    "Discover 200+ scored channel partners",
                    "GCS compatibility score for every match",
                    "Filter by country, support tier, deal size",
                  ].map((line) => (
                    <li
                      key={line}
                      className="flex items-start gap-2 font-dm text-sm"
                      style={{ color: t.textSecondary }}
                    >
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#7DD855]"
                        aria-hidden
                      />
                      {line}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/login?role=vendor"
                  className="mt-6 flex w-full items-center justify-center rounded-lg py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:brightness-110"
                  style={{ backgroundColor: "#570284" }}
                >
                  Find Channel Partners →
                </Link>
                <Link
                  href="/login"
                  className="mt-3 text-center font-dm text-xs transition hover:underline"
                  style={{ color: t.textMuted }}
                >
                  Already have an account? Log in →
                </Link>
              </motion.div>

              {/* Mobile OR */}
              <div
                className="flex items-center gap-3 py-4 lg:hidden"
                aria-hidden
              >
                <div
                  className="h-px flex-1"
                  style={{ backgroundColor: orDividerLine }}
                />
                <span
                  className="rounded-full px-3 py-1 text-xs font-medium"
                  style={{
                    backgroundColor: orPillBg,
                    color: orPillText,
                  }}
                >
                  OR
                </span>
                <div
                  className="h-px flex-1"
                  style={{ backgroundColor: orDividerLine }}
                />
              </div>

              {/* Desktop OR */}
              <div
                className="relative hidden min-h-[280px] w-12 shrink-0 flex-col items-center justify-center self-center lg:flex"
                aria-hidden
              >
                <div
                  className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2"
                  style={{ backgroundColor: orDividerLine }}
                />
                <span
                  className="relative z-10 rounded-full px-3 py-1.5 text-xs font-medium"
                  style={{
                    backgroundColor: orPillBg,
                    color: orPillText,
                  }}
                >
                  OR
                </span>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-1 flex-col rounded-xl border p-6 text-left shadow-lg"
                style={{
                  backgroundColor: isDark ? "#1A1625" : "#FFFFFF",
                  borderColor: isDark ? "#7DD855" : "#4A9E2E",
                  transition,
                }}
              >
                <span
                  className="inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide"
                  style={{
                    backgroundColor: "#7DD855",
                    color: "#0A0A0F",
                  }}
                >
                  For partners
                </span>
                <Handshake
                  className="mt-4 h-8 w-8 shrink-0"
                  style={{ color: isDark ? "#7DD855" : "#4A9E2E" }}
                  aria-hidden
                />
                <h2
                  className="mt-4 text-xl font-bold"
                  style={{ color: t.textPrimary, transition, ...heading }}
                >
                  I&apos;m a Channel Partner
                </h2>
                <p
                  className="mt-3 font-dm text-sm leading-relaxed"
                  style={{ color: t.textSecondary, transition }}
                >
                  I&apos;m a reseller, VAR, consultancy or systems integrator
                  looking for SaaS vendors to represent across EMEA.
                </p>
                <ul className="mt-4 space-y-2 text-left">
                  {[
                    "Build your channel capability profile",
                    "Get discovered by vendors matching your profile",
                    "Receive scored partnership opportunities",
                  ].map((line) => (
                    <li
                      key={line}
                      className="flex items-start gap-2 font-dm text-sm"
                      style={{ color: t.textSecondary }}
                    >
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#7DD855]"
                        aria-hidden
                      />
                      {line}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/login?role=partner"
                  className="mt-6 flex w-full items-center justify-center rounded-lg py-3 text-sm font-semibold shadow-md transition hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(125,216,85,0.35)]"
                  style={
                    isDark
                      ? { backgroundColor: "#7DD855", color: "#0A0A0F" }
                      : { backgroundColor: "#4A9E2E", color: "#FFFFFF" }
                  }
                >
                  Register as a Partner →
                </Link>
                <Link
                  href="/login"
                  className="mt-3 text-center font-dm text-xs transition hover:underline"
                  style={{ color: t.textMuted }}
                >
                  Already registered? Log in →
                </Link>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="mt-12 flex flex-col items-center"
          >
            <p className="font-dm text-sm" style={{ color: t.textMuted }}>
              Not sure yet?
            </p>
            <Link
              href="/demo"
              className="mt-3 inline-flex rounded-full border-2 px-8 py-3.5 text-sm font-semibold transition hover:opacity-90"
              style={{
                borderColor: isDark ? "#FFFFFF" : t.textPrimary,
                backgroundColor: isDark ? "transparent" : "#FFFFFF",
                color: isDark ? "#FFFFFF" : t.textPrimary,
                transition,
              }}
            >
              Explore the Demo →
            </Link>
            <p
              className="mt-2 text-center font-dm text-xs"
              style={{ color: t.textMuted, transition }}
            >
              No login required · All features visible · Simulated data
            </p>
          </motion.div>
        </div>
      </section>

      {/* Trust stats bar */}
      <section
        className="border-t px-4 py-12 md:px-8"
        style={{
          borderColor: t.bgBorder,
          backgroundColor: t.bgPrimary,
          transition,
        }}
      >
        <div
          className={`mx-auto max-w-5xl ${!isDark ? "border-x px-6 py-2 md:px-10" : ""}`}
          style={
            !isDark
              ? { borderColor: t.bgBorder, transition }
              : undefined
          }
        >
          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4 md:gap-4">
            {(
              [
                {
                  kind: "count" as const,
                  num: 200,
                  suf: "+",
                  label: "Partners Indexed",
                  key: "p",
                },
                {
                  kind: "count" as const,
                  num: 14,
                  suf: "",
                  label: "EMEA Countries",
                  key: "c",
                },
                {
                  kind: "count" as const,
                  num: 5,
                  suf: "",
                  label: "Scoring Dimensions",
                  key: "d",
                },
                {
                  kind: "text" as const,
                  value: "4–6",
                  label: "Week Pilot Ready",
                  key: "w",
                },
              ] as const
            ).map((row, i) => (
              <div key={row.key} className="relative px-2">
                {row.kind === "text" ? (
                  <p
                    className="font-dm text-3xl font-bold tabular-nums md:text-4xl"
                    style={{
                      color: !isDark ? "#570284" : t.statValue,
                      transition,
                    }}
                  >
                    {row.value}
                  </p>
                ) : (
                  <p
                    className="font-dm text-3xl font-bold md:text-4xl"
                    style={{
                      color: !isDark ? "#570284" : t.statValue,
                      transition,
                    }}
                  >
                    <CountUp value={row.num} suffix={row.suf} />
                  </p>
                )}
                <p
                  className="mt-1 font-dm text-sm"
                  style={{
                    color: !isDark ? "#888888" : t.textMuted,
                    transition,
                  }}
                >
                  {row.label}
                </p>
                {!isDark && i < 3 && (
                  <div
                    className="absolute right-0 top-1/2 hidden h-8 w-px -translate-y-1/2 md:block"
                    style={{ backgroundColor: t.bgBorder }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who is this for */}
      <WhoIsThisForSection
        t={t}
        isDark={isDark}
        transition={transition}
        headingStyle={heading}
      />

      {/* How it works */}
      <section
        className="relative border-t px-4 py-24 md:px-8"
        style={{
          borderColor: t.bgBorder,
          backgroundColor: t.bgPrimary,
          transition,
        }}
      >
        <div className="mx-auto max-w-6xl">
          <p
            className="text-center text-sm font-semibold uppercase tracking-[0.2em]"
            style={{ color: t.brandPurple }}
          >
            How it works
          </p>
          <h2
            className="mt-3 text-center text-3xl font-bold md:text-4xl"
            style={{ color: t.textPrimary, transition, ...heading }}
          >
            Intelligent Channel Matching
          </h2>
          <p
            className="mx-auto mt-4 max-w-2xl text-center font-dm"
            style={{ color: t.textSecondary, transition }}
          >
            PartnerMatch replaces spreadsheet chaos with a structured,
            explainable compatibility layer built for how EMEA channels
            actually sell.
          </p>

          <div
            className="mt-10 flex justify-center gap-2 rounded-full border p-1"
            style={{
              borderColor: t.bgBorder,
              backgroundColor: t.bgSurface,
              transition,
            }}
          >
            <button
              type="button"
              onClick={() => setPersona("vendor")}
              className="rounded-full px-6 py-2 text-sm font-semibold transition"
              style={
                persona === "vendor"
                  ? {
                      backgroundColor: t.brandPurple,
                      color: "#FFFFFF",
                    }
                  : {
                      color: t.textSecondary,
                      backgroundColor: "transparent",
                    }
              }
            >
              For Vendors
            </button>
            <button
              type="button"
              onClick={() => setPersona("partner")}
              className="rounded-full px-6 py-2 text-sm font-semibold transition"
              style={
                persona === "partner"
                  ? isDark
                    ? {
                        backgroundColor: hexToRgba(t.brandGreen, 0.2),
                        color: DARK_TOKENS.brandGreen,
                      }
                    : {
                        backgroundColor: hexToRgba(t.brandPurple, 0.12),
                        color: t.brandPurple,
                      }
                  : {
                      color: t.textSecondary,
                      backgroundColor: "transparent",
                    }
              }
            >
              For Partners
            </button>
          </div>

          <div className="relative mt-16 grid gap-8 md:grid-cols-3">
            <div
              className="pointer-events-none absolute left-[16%] right-[16%] top-12 hidden h-0.5 md:block"
              style={{
                background: `linear-gradient(90deg, ${t.brandPurple}, ${isDark ? t.brandGreen : t.brandPurple}, ${t.brandPurple})`,
                opacity: isDark ? 1 : 0.35,
              }}
            />
            <StepCard
              theme={t}
              isDark={isDark}
              headingStyle={heading}
              icon={
                <Sparkles
                  className="h-8 w-8"
                  style={{
                    color: isDark ? DARK_TOKENS.brandGreen : t.brandPurple,
                  }}
                />
              }
              title={
                persona === "vendor"
                  ? "Build your commercial profile"
                  : "Complete your channel profile"
              }
              desc={
                persona === "vendor"
                  ? "Define your ICP, deal size, target geographies"
                  : "Fill in your capabilities, coverage, and delivery model"
              }
            />
            <StepCard
              theme={t}
              isDark={isDark}
              headingStyle={heading}
              icon={
                <LineChart
                  className="h-8 w-8"
                  style={{
                    color: isDark ? DARK_TOKENS.brandGreen : t.brandPurple,
                  }}
                />
              }
              title={
                persona === "vendor"
                  ? "Browse scored partners"
                  : "Get GCS activated"
              }
              desc={
                persona === "vendor"
                  ? "Every partner gets a GCS score tailored to your profile"
                  : "Your profile goes live in the directory once complete"
              }
            />
            <StepCard
              theme={t}
              isDark={isDark}
              headingStyle={heading}
              icon={
                <Handshake
                  className="h-8 w-8"
                  style={{
                    color: isDark ? DARK_TOKENS.brandGreen : t.brandPurple,
                  }}
                />
              }
              title={
                persona === "vendor" ? "Connect and close" : "Receive vendor interest"
              }
              desc={
                persona === "vendor"
                  ? "Reach out to Strong Fit partners directly"
                  : "Vendors discover you based on compatibility score"
              }
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={persona}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="mx-auto mt-12 max-w-3xl rounded-2xl border p-6 text-center font-dm text-sm"
              style={{
                borderColor: t.bgBorder,
                backgroundColor: t.bgSurface,
                color: t.textSecondary,
                transition,
              }}
            >
              {persona === "vendor" ? (
                <p>
                  Vendors use PartnerMatch to shrink partner discovery from
                  weeks to days — with a defendable score that procurement,
                  alliances, and leadership can trust.
                </p>
              ) : (
                <p>
                  Partners use PartnerMatch to win visibility with vendors that
                  fit their model — reducing random inbound and focusing on
                  accounts you can actually serve.
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Differentiators */}
      <section
        className="px-4 py-24 md:px-8"
        style={{ backgroundColor: t.bgPrimary, transition }}
      >
        <div className="mx-auto max-w-6xl">
          <h2
            className="text-center text-3xl font-bold md:text-4xl"
            style={{ color: t.textPrimary, transition, ...heading }}
          >
            Why PartnerMatch
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <DiffCard
              theme={t}
              headingStyle={heading}
              icon={<Sparkles className="h-6 w-6" />}
              title="Proprietary GCS Engine"
              body="Five dimensions — from ecosystem maturity to regulated tender alignment — deliver a score you can explain in a board deck, not a black box."
            />
            <DiffCard
              theme={t}
              headingStyle={heading}
              icon={<Globe2 className="h-6 w-6" />}
              title="EMEA-Native"
              body="Built for European channel dynamics: multi-country coverage, procurement complexity, and data residency expectations that US-centric tools miss."
            />
            <DiffCard
              theme={t}
              headingStyle={heading}
              icon={<Leaf className="h-6 w-6" />}
              title="Sustainability Focus"
              body="Surface partners aligned with cleantech and ESG-led buyers so your route-to-market matches your mission and your customers' procurement criteria."
            />
            <DiffCard
              theme={t}
              headingStyle={heading}
              icon={<ShieldCheck className="h-6 w-6" />}
              title="Quality-Gated Network"
              body="Partners complete a full Channel Delivery Profile before they appear in rankings — reducing noise and protecting your enterprise brand."
            />
          </div>
        </div>
      </section>

      {/* Stats banner */}
      <section
        className="px-4 py-14 md:px-8"
        style={{
          backgroundColor: t.statsBannerBg,
          transition: "background-color 0.4s ease",
        }}
      >
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-10 text-center font-dm text-lg font-semibold text-white md:gap-16 md:text-xl">
          <span>200+ Partners</span>
          <span className="hidden text-white/40 md:inline">|</span>
          <span>14 Countries</span>
          <span className="hidden text-white/40 md:inline">|</span>
          <span>5 Scoring Dimensions</span>
          <span className="hidden text-white/40 md:inline">|</span>
          <span>4–6 Week Pilot Ready</span>
        </div>
      </section>

      {/* Floating demo bar */}
      <AnimatePresence>
        {demoBarVisible && !demoBarDismissed && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", damping: 26, stiffness: 260 }}
            className="fixed bottom-0 left-0 right-0 z-[60] flex h-[60px] items-center border-t px-4 shadow-[0_-8px_32px_rgba(0,0,0,0.12)]"
            style={{
              background: t.floatingBarBg,
              backdropFilter: "blur(12px)",
              borderColor: t.floatingBarBorder,
              transition,
            }}
          >
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4">
              <p
                className="min-w-0 text-sm sm:text-base"
                style={{ color: t.textPrimary, transition }}
              >
                👋 See PartnerMatch in action — explore all 5 platform features
              </p>
              <div className="flex shrink-0 items-center gap-2">
                <Link
                  href="/demo"
                  className="rounded-full bg-[#7DD855] px-4 py-2 text-sm font-semibold text-[#0A0A0F] transition hover:bg-[#9EE876]"
                >
                  Launch Demo →
                </Link>
                <button
                  type="button"
                  aria-label="Dismiss"
                  onClick={() => setDemoBarDismissed(true)}
                  className="rounded-lg p-2 transition"
                  style={{ color: t.textMuted }}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer — always ink */}
      <footer
        className="border-t px-4 py-14 md:px-8"
        style={{
          borderColor: "#2a2624",
          backgroundColor: "#1A1614",
          transition: "background-color 0.4s ease",
        }}
      >
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-10 md:flex-row md:items-start">
          <div>
            <GlexScaleLogo compact />
            <p className="mt-4 text-sm text-text-muted">
              Global Growth Accelerator
            </p>
          </div>
          <nav className="flex flex-wrap justify-center gap-8 text-sm text-text-secondary">
            <Link href="/demo" className="hover:text-white">
              Try Demo
            </Link>
            <Link href="/login" className="hover:text-white">
              Log in
            </Link>
            <Link href="/login" className="hover:text-white">
              Partner access
            </Link>
          </nav>
          <div className="flex gap-4 text-text-secondary">
            <a href="#" aria-label="Social" className="hover:text-green-accent">
              <Share2 className="h-5 w-5" />
            </a>
            <a
              href="#"
              aria-label="Contact"
              className="hover:text-green-accent"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}

function WhoIsThisForSection({
  t,
  isDark,
  transition,
  headingStyle,
}: {
  t: Theme;
  isDark: boolean;
  transition: string;
  headingStyle: CSSProperties;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const cardBg = isDark ? "#1A1625" : "#FFFFFF";
  const cardBorder = isDark ? "#1E1A2E" : "#D0C8B8";

  return (
    <section
      className="border-t px-4 py-24 md:px-8"
      style={{
        borderColor: t.bgBorder,
        backgroundColor: t.bgPrimary,
        transition,
      }}
    >
      <motion.div
        ref={ref}
        className="mx-auto max-w-6xl"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={whoForContainer}
      >
        <motion.h2
          variants={whoForItem}
          className="text-center text-3xl font-bold md:text-4xl"
          style={{ color: t.textPrimary, transition, ...headingStyle }}
        >
          Two sides. One platform.
        </motion.h2>
        <motion.p
          variants={whoForItem}
          className="mx-auto mt-3 max-w-2xl text-center font-dm"
          style={{ color: t.textSecondary, transition }}
        >
          PartnerMatch connects both sides of the channel equation.
        </motion.p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <motion.div
            variants={whoForItem}
            className="group rounded-xl border p-6 transition hover:-translate-y-0.5"
            style={{
              backgroundColor: cardBg,
              borderColor: cardBorder,
              transition: `${transition}, transform 0.3s ease, box-shadow 0.3s ease`,
            }}
            whileHover={{
              borderColor: "#570284",
              boxShadow: `0 12px 40px ${hexToRgba("#570284", 0.15)}`,
            }}
          >
            <Building2
              className="h-10 w-10"
              style={{ color: "#570284" }}
              aria-hidden
            />
            <h3
              className="mt-4 text-xl font-bold"
              style={{ color: t.textPrimary, transition, ...headingStyle }}
            >
              SaaS Vendors
            </h3>
            <p
              className="mt-3 font-dm text-sm leading-relaxed"
              style={{ color: t.textSecondary, transition }}
            >
              You&apos;ve built a great product. Now you need the right people to
              sell it across Europe — resellers, consultancies, and systems
              integrators who already have the relationships, the market
              knowledge, and the trust of your target buyers. PartnerMatch finds
              them and scores the fit.
            </p>
            <p
              className="mt-4 rounded-lg border px-3 py-2 font-dm text-xs italic leading-snug"
              style={{
                borderColor: t.bgBorder,
                color: t.textMuted,
                transition,
              }}
            >
              e.g. A Paris-based cleantech SaaS expanding to Germany and Benelux
            </p>
          </motion.div>

          <motion.div
            variants={whoForItem}
            className="group rounded-xl border p-6 transition hover:-translate-y-0.5"
            style={{
              backgroundColor: cardBg,
              borderColor: cardBorder,
              transition: `${transition}, transform 0.3s ease, box-shadow 0.3s ease`,
            }}
            whileHover={{
              borderColor: isDark ? "#7DD855" : "#4A9E2E",
              boxShadow: `0 12px 40px ${hexToRgba(isDark ? "#7DD855" : "#4A9E2E", 0.18)}`,
            }}
          >
            <Users
              className="h-10 w-10"
              style={{ color: isDark ? "#7DD855" : "#4A9E2E" }}
              aria-hidden
            />
            <h3
              className="mt-4 text-xl font-bold"
              style={{ color: t.textPrimary, transition, ...headingStyle }}
            >
              Channel Partners
            </h3>
            <p
              className="mt-3 font-dm text-sm leading-relaxed"
              style={{ color: t.textSecondary, transition }}
            >
              You&apos;re a VAR, reseller, MSP, or consultancy with deep market
              relationships across EMEA. You sell enterprise software to your
              clients and you&apos;re always looking for the next great product to
              add to your portfolio. PartnerMatch puts you in front of vendors
              who match exactly what you do.
            </p>
            <p
              className="mt-4 rounded-lg border px-3 py-2 font-dm text-xs italic leading-snug"
              style={{
                borderColor: t.bgBorder,
                color: t.textMuted,
                transition,
              }}
            >
              e.g. A Berlin-based systems integrator with 50 enterprise clients
            </p>
          </motion.div>
        </div>

        <motion.p
          variants={whoForItem}
          className="mx-auto mt-10 max-w-3xl text-center font-dm text-sm leading-relaxed"
          style={{ color: t.textSecondary, transition }}
        >
          The GCS engine scores every match across 5 dimensions — so both sides
          know it&apos;s worth their time before the first call.
        </motion.p>
      </motion.div>
    </section>
  );
}

function ThemedOrb({
  isDark,
  className,
  size,
  delay = 0,
  duration = 8,
  colorDark,
  colorLight,
}: {
  isDark: boolean;
  className: string;
  size: number;
  delay?: number;
  duration?: number;
  colorDark: string;
  colorLight: string;
}) {
  const opacity = isDark ? 0.3 : 0.15;
  return (
    <motion.div
      className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
      style={{ width: size, height: size }}
      animate={{
        y: [0, -30, 0],
        x: [0, 15, 0],
        scale: [1, 1.05, 1],
        backgroundColor: isDark
          ? hexToRgba(colorDark, opacity)
          : hexToRgba(colorLight, opacity),
      }}
      transition={{
        y: { duration, repeat: Infinity, ease: "easeInOut", delay },
        x: { duration, repeat: Infinity, ease: "easeInOut", delay },
        scale: { duration, repeat: Infinity, ease: "easeInOut", delay },
        backgroundColor: { duration: 0.4, ease: "easeInOut" },
      }}
    />
  );
}

function StepCard({
  icon,
  title,
  desc,
  theme,
  isDark,
  headingStyle,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  theme: Theme;
  isDark: boolean;
  headingStyle: CSSProperties;
}) {
  const transition =
    "background-color 0.4s ease, color 0.4s ease, border-color 0.3s ease";
  return (
    <div
      className="relative rounded-2xl border p-6 text-left"
      style={{
        borderColor: theme.stepCardBorder,
        backgroundColor: theme.stepCardBg,
        transition,
      }}
    >
      <div
        className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
        style={{
          backgroundColor: hexToRgba(theme.brandPurple, isDark ? 0.3 : 0.15),
        }}
      >
        {icon}
      </div>
      <h3
        className="text-xl font-bold"
        style={{ color: theme.textPrimary, transition, ...headingStyle }}
      >
        {title}
      </h3>
      <AnimatePresence mode="wait">
        <motion.p
          key={desc}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
          className="mt-3 font-dm text-sm leading-relaxed"
          style={{ color: theme.textSecondary, transition }}
        >
          {desc}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

function DiffCard({
  icon,
  title,
  body,
  theme,
  headingStyle,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  theme: Theme;
  headingStyle: CSSProperties;
}) {
  const transition =
    "background-color 0.4s ease, color 0.4s ease, border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease";
  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-40px" }}
      className="group rounded-2xl border border-l-4 p-6 transition hover:-translate-y-1 hover:shadow-xl"
      style={{
        borderColor: theme.diffCardBorder,
        borderLeftColor: theme.diffAccent,
        backgroundColor: theme.diffCardBg,
        transition,
      }}
      whileHover={{
        borderColor: theme.brandPurple,
        boxShadow: `0 12px 40px ${hexToRgba(theme.brandPurple, 0.2)}`,
      }}
    >
      <div
        className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl"
        style={{
          backgroundColor: hexToRgba(theme.brandPurple, 0.25),
          color: theme.diffAccent,
        }}
      >
        {icon}
      </div>
      <h3
        className="text-xl font-bold"
        style={{ color: theme.textPrimary, transition, ...headingStyle }}
      >
        {title}
      </h3>
      <p
        className="mt-3 font-dm text-sm leading-relaxed"
        style={{ color: theme.textSecondary, transition }}
      >
        {body}
      </p>
    </motion.div>
  );
}
