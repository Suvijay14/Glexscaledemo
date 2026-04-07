"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone, Calendar, Send } from "lucide-react";
import type { Partner } from "@/data/partners";
import { GCSBreakdown } from "@/components/GCSBreakdown";
import { CollapsibleSection } from "@/components/CollapsibleSection";
import { EuropeMap } from "@/components/EuropeMap";

export function PartnerDetailClient({
  partner,
  directoryHref = "/directory",
  gcsSectionId,
}: {
  partner: Partner;
  /** Breadcrumb "Directory" link base, e.g. `/demo/directory` */
  directoryHref?: string;
  /** When set, applied to GCS section for hash navigation (e.g. `gcs`) */
  gcsSectionId?: string;
}) {
  return (
    <div className="min-h-screen px-4 py-10 md:px-8">
      <div className="mx-auto max-w-7xl">
        <nav className="mb-8 text-sm text-text-secondary">
          <Link href={directoryHref} className="hover:text-green-accent">
            Directory
          </Link>
          <span className="mx-2 text-text-muted">/</span>
          <span className="text-white">{partner.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.85fr)_minmax(280px,1fr)] lg:items-start">
          <div className="min-w-0 space-y-10">
            <header className="flex flex-col gap-6 md:flex-row md:items-start">
              <div
                className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl font-syne text-3xl font-bold text-white"
                style={{ backgroundColor: "rgba(87, 2, 132, 0.9)" }}
              >
                {partner.logo}
              </div>
              <div>
                <h1 className="font-syne text-4xl font-bold text-white md:text-5xl lg:text-[48px]">
                  {partner.name}
                </h1>
                <p className="mt-2 text-lg text-text-secondary">
                  {partner.tagline}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full border border-dark-border bg-dark-surface px-3 py-1 text-sm">
                    {partner.flag} {partner.country}
                  </span>
                  {partner.type.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-dark-border px-3 py-1 text-sm text-text-secondary"
                    >
                      {t}
                    </span>
                  ))}
                  <span className="inline-flex items-center gap-2 rounded-full border border-green-accent/40 bg-green-accent/10 px-3 py-1 text-xs font-semibold text-green-accent">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-green-accent" />
                    Active in last 30 days
                  </span>
                </div>
              </div>
            </header>

            <GCSBreakdown
              score={partner.gcs}
              rows={partner.dimensionDetails}
              summary={partner.matchSummary}
              sectionId={gcsSectionId}
            />

            <div className="space-y-4">
              <CollapsibleSection title="Geographic Coverage">
                <EuropeMap countries={partner.coverageCountries} />
                <ul className="mt-4 flex flex-wrap gap-2">
                  {partner.coverageCountries.map((c) => (
                    <li
                      key={c}
                      className="rounded-full bg-purple-primary/20 px-3 py-1 text-xs text-text-secondary"
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              </CollapsibleSection>

              <CollapsibleSection title="Capabilities & Services">
                <div className="flex flex-wrap gap-2">
                  {partner.capabilities.map((cap) => (
                    <span
                      key={cap}
                      className="rounded-lg border border-dark-border bg-dark-bg px-3 py-1.5 text-sm text-text-secondary"
                    >
                      {cap}
                    </span>
                  ))}
                </div>
              </CollapsibleSection>

              <CollapsibleSection title="Channel Delivery Profile">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[480px] text-left text-sm">
                    <tbody>
                      {partner.channelProfile.map((row) => (
                        <tr
                          key={row.label}
                          className="border-b border-dark-border last:border-0"
                        >
                          <th className="py-2 pr-4 font-medium text-text-muted">
                            {row.label}
                          </th>
                          <td className="py-2 text-text-secondary">
                            {row.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CollapsibleSection>

              <CollapsibleSection title="Social Proof" defaultOpen={false}>
                <div className="flex flex-wrap gap-4">
                  {partner.clientLogos.map((name) => (
                    <div
                      key={name}
                      className="flex h-14 min-w-[120px] items-center justify-center rounded-lg border border-dashed border-dark-border bg-dark-bg px-3 text-center text-xs font-semibold text-text-muted"
                    >
                      {name}
                    </div>
                  ))}
                </div>
              </CollapsibleSection>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-dark-border bg-dark-surface p-6"
            >
              <h2 className="font-syne text-lg font-bold text-white">
                Contact
              </h2>
              <p className="mt-1 font-medium text-white">
                {partner.contact.name}
              </p>
              <p className="text-sm text-text-secondary">
                {partner.contact.title}
              </p>
              <a
                href={`mailto:${partner.contact.email}`}
                className="mt-4 flex items-center gap-2 text-sm text-green-accent hover:underline"
              >
                <Mail className="h-4 w-4" />
                {partner.contact.email}
              </a>
              <a
                href={`tel:${partner.contact.phone.replace(/\s/g, "")}`}
                className="mt-2 flex items-center gap-2 text-sm text-text-secondary hover:text-white"
              >
                <Phone className="h-4 w-4" />
                {partner.contact.phone}
              </a>
              <button
                type="button"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-green-accent py-3 text-sm font-semibold text-dark-bg transition hover:bg-green-light"
              >
                <Calendar className="h-4 w-4" />
                Book a Meeting
              </button>
              <button
                type="button"
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-purple-primary py-3 text-sm font-semibold text-white transition hover:bg-purple-light"
              >
                <Send className="h-4 w-4" />
                Send Introduction
              </button>

              <div className="mt-8 border-t border-dark-border pt-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                  Profile completeness
                </p>
                <div className="mt-2 flex items-center gap-3">
                  <div className="relative h-14 w-14">
                    <svg viewBox="0 0 36 36" className="-rotate-90">
                      <circle
                        cx="18"
                        cy="18"
                        r="15.5"
                        fill="none"
                        stroke="#1E1A2E"
                        strokeWidth="3"
                      />
                      <circle
                        cx="18"
                        cy="18"
                        r="15.5"
                        fill="none"
                        stroke="#7DD855"
                        strokeWidth="3"
                        strokeDasharray={97.4}
                        strokeDashoffset={
                          97.4 * (1 - partner.profileCompleteness / 100)
                        }
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
                      {partner.profileCompleteness}%
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary">
                    High-trust profile — most Channel Delivery fields verified.
                  </p>
                </div>
                <p className="mt-4 text-xs text-text-muted">
                  Last updated: {partner.lastUpdated}
                </p>
              </div>
            </motion.div>
          </aside>
        </div>
      </div>
    </div>
  );
}
