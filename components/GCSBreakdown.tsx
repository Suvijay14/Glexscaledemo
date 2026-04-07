"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";
import { getGCSBand, dimensionBarColor } from "@/lib/gcs";
import type { DimensionExplained } from "@/data/partners";
import { cn } from "@/lib/utils";
import { gcsTrackColor, useDashTheme } from "@/context/DashThemeContext";

function CircularScore({ score }: { score: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [display, setDisplay] = useState(0);
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const { t, isDashDark } = useDashTheme();
  const track = gcsTrackColor(isDashDark);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, score, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, score]);

  const info = getGCSBand(score);
  const dashOffset = circumference - (display / 100) * circumference;

  return (
    <div ref={ref} className="flex flex-col items-center">
      <div className="relative h-40 w-40">
        <svg className="-rotate-90 transform" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke={track}
            strokeWidth="10"
          />
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke={t.dashGreen}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            className="transition-[stroke-dashoffset] duration-300"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="font-syne text-5xl font-bold tabular-nums"
            style={{ color: t.dashTextPrimary }}
          >
            {display}
          </span>
          <span className="text-xs" style={{ color: t.dashTextMuted }}>
            /100
          </span>
        </div>
      </div>
      <span
        className={cn(
          "mt-4 rounded-full border px-4 py-1 text-xs font-semibold uppercase tracking-wide",
          info.badgeClass
        )}
      >
        {info.label}
      </span>
    </div>
  );
}

function DimensionRow({ row }: { row: DimensionExplained }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const color = dimensionBarColor(row.score, row.friction);
  const { t, isDashDark } = useDashTheme();
  const track = gcsTrackColor(isDashDark);

  return (
    <div
      ref={ref}
      className="rounded-xl border p-4"
      style={{
        borderColor: t.dashCardBorder,
        backgroundColor: isDashDark ? "rgba(10, 10, 15, 0.4)" : "rgba(245, 240, 232, 0.5)",
      }}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <h4
            className="font-syne text-base font-semibold"
            style={{ color: t.dashTextPrimary }}
          >
            {row.name}{" "}
            <span
              className="text-sm font-normal"
              style={{ color: t.dashTextMuted }}
            >
              — {row.code}
            </span>
          </h4>
        </div>
        <span className="font-mono text-lg" style={{ color: t.dashTextPrimary }}>
          {row.score}
        </span>
      </div>
      <div
        className="mt-3 h-2 w-full overflow-hidden rounded-full"
        style={{ backgroundColor: track }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${row.score}%` } : { width: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <p
        className="mt-3 text-sm leading-relaxed"
        style={{ color: t.dashTextSecondary }}
      >
        {row.explanation}
      </p>
    </div>
  );
}

export function GCSBreakdown({
  score,
  rows,
  summary,
  sectionId,
}: {
  score: number;
  rows: DimensionExplained[];
  summary: string;
  sectionId?: string;
}) {
  const { t, isDashDark } = useDashTheme();

  return (
    <section id={sectionId} className="scroll-mt-28 space-y-8">
      <div>
        <h2
          className="font-syne text-2xl font-bold md:text-3xl"
          style={{ color: t.dashTextPrimary }}
        >
          GlexScale Compatibility Score
        </h2>
        <p className="mt-2" style={{ color: t.dashTextSecondary }}>
          Five dimensions explain fit — not just a single number.
        </p>
      </div>

      <div className="grid gap-10 md:grid-cols-[280px_1fr] md:items-start">
        <CircularScore score={score} />
        <div className="space-y-4">
          {rows.map((row) => (
            <DimensionRow key={row.code} row={row} />
          ))}
        </div>
      </div>

      <div
        className="rounded-2xl border border-purple-primary/40 p-6"
        style={{
          backgroundColor: isDashDark
            ? "rgba(87, 2, 132, 0.1)"
            : "rgba(87, 2, 132, 0.08)",
        }}
      >
        <p className="text-sm leading-relaxed" style={{ color: t.dashTextSecondary }}>
          {summary}
        </p>
      </div>
    </section>
  );
}
