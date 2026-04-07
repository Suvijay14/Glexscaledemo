"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Partner } from "@/data/partners";
import { getGCSBand } from "@/lib/gcs";
import { DimensionBar } from "./DimensionBar";
import { cn } from "@/lib/utils";

const codes = ["PEM", "MAI", "TCS", "SCSC", "RTA"] as const;

export function PartnerCard({
  partner,
  horizontal,
  linkPrefix = "/directory",
}: {
  partner: Partner;
  horizontal?: boolean;
  /** Base path without trailing slash, e.g. `/demo/directory` */
  linkPrefix?: string;
}) {
  const info = getGCSBand(partner.gcs);

  const cardClass = cn(
    "block rounded-2xl border border-dark-border bg-dark-surface p-5 transition hover:-translate-y-1 hover:border-purple-primary hover:shadow-[0_12px_40px_rgba(87,2,132,0.35)]",
    horizontal && "min-w-[300px] max-w-sm shrink-0"
  );

  const content = (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-syne text-lg font-bold text-white"
            style={{ backgroundColor: "rgba(87, 2, 132, 0.85)" }}
          >
            {partner.logo}
          </div>
          <div>
            <p className="flex items-center gap-2 font-syne text-lg font-semibold text-white">
              {partner.name}
              <span className="text-xl">{partner.flag}</span>
            </p>
            <p className="line-clamp-2 text-sm text-text-secondary">
              {partner.tagline}
            </p>
          </div>
        </div>
        <div className="text-right">
          <span
            className="font-syne text-3xl font-bold tabular-nums"
            style={{ color: info.color }}
          >
            {partner.gcs}
          </span>
          <p className="text-[10px] font-semibold uppercase text-text-muted">
            {info.label}
          </p>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {partner.type.map((t) => (
          <span
            key={t}
            className="rounded-full border border-dark-border bg-dark-card px-2 py-0.5 text-[11px] text-text-secondary"
          >
            {t}
          </span>
        ))}
      </div>
      <div
        className={cn("mt-4 flex gap-1.5", horizontal ? "max-w-md" : "w-full")}
      >
        {codes.map((c) => (
          <DimensionBar
            key={c}
            label={c}
            score={partner.dimensions[c]}
            tiny
            friction={
              partner.dimensions[c] < 50 && (c === "TCS" || c === "SCSC")
            }
          />
        ))}
      </div>
      <span className="mt-4 inline-flex items-center text-sm font-semibold text-green-accent">
        View Profile →
      </span>
    </>
  );

  return (
    <Link href={`${linkPrefix}/${partner.id}`} className={cardClass}>
      <motion.div
        layout
        initial={{ opacity: 0, y: horizontal ? 16 : 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {content}
      </motion.div>
    </Link>
  );
}
