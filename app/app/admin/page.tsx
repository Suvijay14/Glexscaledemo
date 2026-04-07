"use client";

import { motion } from "framer-motion";
import {
  Check,
  X,
  Pencil,
} from "lucide-react";

const rows = [
  {
    company: "TechVendor EMEA",
    type: "Vendor",
    country: "Germany",
    gcs: "Calculated",
    completeness: "78%",
    status: "Active",
    pending: false,
  },
  {
    company: "Nexus Channel Group",
    type: "Partner",
    country: "France",
    gcs: "Calculated",
    completeness: "94%",
    status: "Active",
    pending: false,
  },
  {
    company: "Baltic Reseller Oy",
    type: "Partner",
    country: "Estonia",
    gcs: "Pending",
    completeness: "41%",
    status: "Pending",
    pending: true,
  },
  {
    company: "Meridian UK Partners",
    type: "Partner",
    country: "United Kingdom",
    gcs: "Calculated",
    completeness: "97%",
    status: "Active",
    pending: false,
  },
  {
    company: "CloudStride GmbH",
    type: "Vendor",
    country: "Austria",
    gcs: "Calculated",
    completeness: "62%",
    status: "Incomplete",
    pending: false,
  },
  {
    company: "Iberia Cloud Collective",
    type: "Partner",
    country: "Spain",
    gcs: "Calculated",
    completeness: "71%",
    status: "Active",
    pending: false,
  },
  {
    company: "Nordic Bridge AB",
    type: "Partner",
    country: "Sweden",
    gcs: "Calculated",
    completeness: "62%",
    status: "Pending",
    pending: true,
  },
  {
    company: "Helios Software Ltd",
    type: "Vendor",
    country: "Ireland",
    gcs: "Calculated",
    completeness: "85%",
    status: "Active",
    pending: false,
  },
];

export default function DemoAdminPage() {
  return (
    <div className="min-h-full px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-syne text-3xl font-bold text-white md:text-4xl">
              Admin Panel
            </h1>
            <p className="mt-2 text-text-secondary">
              PartnerMatch Platform Management
            </p>
          </div>
          <button
            type="button"
            className="rounded-xl bg-green-accent px-4 py-2.5 text-sm font-semibold text-dark-bg hover:bg-green-light"
          >
            Export User List CSV
          </button>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Total Users", value: "312" },
            { label: "Total Partners", value: "187" },
            { label: "Total Vendors", value: "125" },
            { label: "Avg GCS Score", value: "68.4" },
          ].map((c) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-dark-border bg-dark-surface p-5"
            >
              <p className="text-sm text-text-secondary">{c.label}</p>
              <p className="mt-2 font-syne text-3xl font-bold text-white">
                {c.value}
              </p>
            </motion.div>
          ))}
        </div>

        <section
          id="users"
          className="mt-12 scroll-mt-28 overflow-hidden rounded-2xl border border-dark-border bg-dark-surface"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left text-sm">
              <thead>
                <tr className="border-b border-dark-border text-text-muted">
                  <th className="px-4 py-3 font-medium">Company</th>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium">Country</th>
                  <th className="px-4 py-3 font-medium">GCS Status</th>
                  <th className="px-4 py-3 font-medium">Completeness</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr
                    key={r.company}
                    className={`border-b border-dark-border transition hover:bg-purple-primary/10 ${
                      r.pending ? "border-l-4 border-l-amber-500 bg-amber-500/5" : ""
                    }`}
                  >
                    <td className="px-4 py-3 font-medium text-white">
                      {r.company}
                    </td>
                    <td className="px-4 py-3 text-text-secondary">{r.type}</td>
                    <td className="px-4 py-3 text-text-secondary">
                      {r.country}
                    </td>
                    <td className="px-4 py-3 text-text-secondary">{r.gcs}</td>
                    <td className="px-4 py-3 text-text-secondary">
                      {r.completeness}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={r.status} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          className="inline-flex items-center gap-1 rounded-lg bg-green-accent/15 px-2 py-1 text-xs font-semibold text-green-accent hover:bg-green-accent/25"
                        >
                          <Check className="h-3 w-3" />
                          Approve
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center gap-1 rounded-lg border border-red-500/60 px-2 py-1 text-xs font-semibold text-red-400 hover:bg-red-500/10"
                        >
                          <X className="h-3 w-3" />
                          Reject
                        </button>
                        <button
                          type="button"
                          aria-label="Edit"
                          className="rounded-lg border border-dark-border p-1.5 text-text-muted hover:border-purple-light hover:text-white"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            { label: "Partners with GCS Active", value: "73%" },
            { label: "Avg Profile Completeness", value: "81%" },
            { label: "Partners Joined This Week", value: "12" },
          ].map((m) => (
            <div
              key={m.label}
              className="rounded-2xl border border-dark-border bg-dark-bg/80 p-5"
            >
              <p className="text-sm text-text-secondary">{m.label}</p>
              <p className="mt-2 font-syne text-2xl font-bold text-white">
                {m.value}
              </p>
            </div>
          ))}
        </div>

        <section className="mt-10 rounded-2xl border border-dark-border bg-dark-surface p-6">
          <h2 className="font-syne text-lg font-bold text-white">
            Activity Log
          </h2>
          <ul className="mt-4 space-y-4 text-sm text-text-secondary">
            <li className="flex justify-between gap-4 border-b border-dark-border pb-3">
              <span>Nexus Channel Group completed Channel Delivery Profile</span>
              <span className="shrink-0 text-xs text-text-muted">
                2h ago
              </span>
            </li>
            <li className="flex justify-between gap-4 border-b border-dark-border pb-3">
              <span>TechVendor EMEA ran first GCS calculation</span>
              <span className="shrink-0 text-xs text-text-muted">
                Yesterday
              </span>
            </li>
            <li className="flex justify-between gap-4">
              <span>3 new partner registrations pending approval</span>
              <span className="shrink-0 text-xs text-text-muted">
                Today
              </span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles =
    status === "Active"
      ? "bg-green-500/15 text-green-400 border-green-500/40"
      : status === "Pending"
        ? "bg-amber-500/15 text-amber-400 border-amber-500/40"
        : "bg-gray-500/15 text-gray-400 border-gray-500/40";
  return (
    <span
      className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-semibold ${styles}`}
    >
      {status}
    </span>
  );
}
