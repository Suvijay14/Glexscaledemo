"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { vendorProfile } from "@/data/vendor";
import { partners } from "@/data/partners";
import { CountUp } from "@/components/CountUp";
import { PartnerCard } from "@/components/PartnerCard";

const bandLabels = [
  "Poor Fit",
  "Weak Fit",
  "Conditional",
  "Good Fit",
  "Strong Fit",
] as const;

const bandKeys = [
  "poorFit",
  "weakFit",
  "conditional",
  "goodFit",
  "strongFit",
] as const;

export default function DemoDashboardPage() {
  const top = [...partners].sort((a, b) => b.gcs - a.gcs).slice(0, 5);
  const maxBar = Math.max(...bandKeys.map((k) => vendorProfile.distribution[k]));

  return (
    <div className="min-h-full px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10">
          <h1 className="font-syne text-3xl font-bold text-white md:text-4xl">
            Welcome back, {vendorProfile.companyName}
          </h1>
          <p className="mt-2 text-text-secondary">
            Your GCS matches have been calculated — prioritise introductions
            where fit, margin model, and delivery depth align.
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { label: "Partners Analyzed", value: vendorProfile.analyzedPartners },
            { label: "Strong Fit Matches", value: vendorProfile.strongFit },
            { label: "Profiles Viewed", value: vendorProfile.profilesViewed },
            { label: "Introductions Sent", value: vendorProfile.introductionsSent },
          ].map((s) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-dark-border bg-dark-surface p-5"
            >
              <p className="text-sm text-text-secondary">{s.label}</p>
              <p className="mt-2 font-syne text-3xl font-bold text-white">
                <CountUp value={s.value} />
              </p>
            </motion.div>
          ))}
        </div>

        <section className="mt-14">
          <div className="mb-6 flex items-center justify-between gap-4">
            <h2 className="font-syne text-2xl font-bold text-white">
              Your Top Channel Partners
            </h2>
            <Link
              href="/app/directory"
              className="text-sm font-semibold text-green-accent hover:underline"
            >
              View directory
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 pt-1">
            {top.map((p) => (
              <PartnerCard
                key={p.id}
                partner={p}
                horizontal
                linkPrefix="/app/directory"
              />
            ))}
          </div>
        </section>

        <section
          id="analytics"
          className="mt-14 scroll-mt-28 rounded-2xl border border-dark-border bg-dark-surface p-6"
        >
          <h2 className="font-syne text-xl font-bold text-white">
            GCS Distribution
          </h2>
          <p className="mt-1 text-sm text-text-secondary">
            Where your analysed partners fall across compatibility bands.
          </p>
          <div className="mt-8 flex h-52 items-stretch gap-3 sm:gap-4 md:gap-6">
            {bandKeys.map((key, i) => {
              const val = vendorProfile.distribution[key];
              const pct = maxBar ? (val / maxBar) * 100 : 0;
              return (
                <div
                  key={key}
                  className="flex min-w-0 flex-1 flex-col items-center gap-2"
                >
                  <div className="flex h-40 w-full max-w-[72px] flex-col justify-end">
                    <motion.div
                      className="w-full rounded-t-lg bg-gradient-to-t from-purple-dark to-purple-primary"
                      initial={{ height: "0%" }}
                      animate={{ height: `${Math.max(pct, val > 0 ? 8 : 0)}%` }}
                      transition={{
                        duration: 0.9,
                        delay: 0.05 * i,
                        ease: "easeOut" as const,
                      }}
                    />
                  </div>
                  <span className="font-syne text-lg font-bold text-white">
                    {val}
                  </span>
                  <span className="text-center text-[10px] font-medium leading-tight text-text-muted sm:text-xs">
                    {bandLabels[i]}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-14 grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-dark-border bg-dark-surface p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-syne text-xl font-bold text-white">
                  Commercial Profile Summary
                </h2>
                <p className="mt-2 text-sm text-text-secondary">
                  {vendorProfile.tagline}
                </p>
              </div>
              <button
                type="button"
                className="shrink-0 rounded-lg border border-dark-border px-3 py-1.5 text-xs font-semibold text-text-secondary hover:border-green-accent hover:text-green-accent"
              >
                Edit Profile
              </button>
            </div>
            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-text-muted">ACV band</dt>
                <dd className="text-text-secondary">{vendorProfile.commercial.acvBand}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-text-muted">Primary markets</dt>
                <dd className="text-text-secondary">
                  {vendorProfile.commercial.primaryMarkets.join(", ")}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-text-muted">Motion</dt>
                <dd className="text-text-secondary">
                  {vendorProfile.commercial.motion}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-text-muted">Support expectation</dt>
                <dd className="text-text-secondary">
                  {vendorProfile.commercial.supportExpectation}
                </dd>
              </div>
            </dl>
            <div className="mt-6">
              <div className="flex justify-between text-xs text-text-muted">
                <span>Profile completeness</span>
                <span>{vendorProfile.completeness}%</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-dark-border">
                <motion.div
                  className="h-full rounded-full bg-green-accent"
                  initial={{ width: 0 }}
                  animate={{ width: `${vendorProfile.completeness}%` }}
                  transition={{ duration: 1.2, ease: "easeOut" as const }}
                />
              </div>
              <p className="mt-2 text-xs text-amber-400/90">
                Complete your Commercial Profile to sharpen GCS weighting on MAI
                and SCSC.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-dark-border bg-dark-surface p-6">
            <h2 className="font-syne text-xl font-bold text-white">
              Recent Activity
            </h2>
            <ul className="mt-6 space-y-6 border-l border-dark-border pl-6">
              {[
                {
                  t: "GCS scores calculated for 147 partners after profile update.",
                  time: "Today · 09:12 CET",
                },
                {
                  t: "3 new Strong Fit partners surfaced in DACH and Benelux.",
                  time: "This week",
                },
                {
                  t: "Profile viewed by Nexus Channel Group (France).",
                  time: "Yesterday · 16:40 CET",
                },
              ].map((item) => (
                <li key={item.t} className="relative">
                  <span className="absolute -left-[25px] top-1.5 h-2.5 w-2.5 rounded-full bg-green-accent ring-4 ring-dark-surface" />
                  <p className="text-sm text-text-secondary">{item.t}</p>
                  <p className="mt-1 text-xs text-text-muted">{item.time}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
