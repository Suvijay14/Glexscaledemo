"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { partners } from "@/data/partners";
import type { Partner } from "@/data/partners";
import { FilterSidebar, type FilterState } from "@/components/FilterSidebar";
import { PartnerCard } from "@/components/PartnerCard";
import { X } from "lucide-react";

const defaultFilters: FilterState = {
  search: "",
  countries: [],
  types: [],
  support: [],
  salesCycle: null,
  gcsMin: 0,
  gcsMax: 100,
};

function sortPartners(
  list: Partner[],
  sort: "match" | "az" | "newest"
): Partner[] {
  const copy = [...list];
  if (sort === "az") {
    copy.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === "newest") {
    copy.sort((a, b) => a.activeDays - b.activeDays);
  } else {
    copy.sort((a, b) => b.gcs - a.gcs);
  }
  return copy;
}

export default function DemoDirectoryPage() {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [sort, setSort] = useState<"match" | "az" | "newest">("match");

  const countries = useMemo(
    () => Array.from(new Set(partners.map((p) => p.country))).sort(),
    []
  );
  const types = useMemo(
    () => Array.from(new Set(partners.flatMap((p) => p.type))).sort(),
    []
  );
  const salesCycles = useMemo(
    () => Array.from(new Set(partners.map((p) => p.salesCycle))).sort(),
    []
  );

  const filtered = useMemo(() => {
    return partners.filter((p) => {
      const q = filters.search.trim().toLowerCase();
      if (q) {
        const blob = `${p.name} ${p.tagline} ${p.country} ${p.type.join(" ")}`.toLowerCase();
        if (!blob.includes(q)) return false;
      }
      if (
        filters.countries.length &&
        !filters.countries.includes(p.country)
      ) {
        return false;
      }
      if (filters.types.length) {
        const ok = p.type.some((t) => filters.types.includes(t));
        if (!ok) return false;
      }
      if (filters.support.length) {
        if (!filters.support.includes(p.support)) return false;
      }
      if (filters.salesCycle && p.salesCycle !== filters.salesCycle) {
        return false;
      }
      if (p.gcs < filters.gcsMin || p.gcs > filters.gcsMax) return false;
      return true;
    });
  }, [filters]);

  const sorted = useMemo(
    () => sortPartners(filtered, sort),
    [filtered, sort]
  );

  const activeTags: { key: string; label: string; onRemove: () => void }[] =
    [];
  filters.countries.forEach((c) =>
    activeTags.push({
      key: `c-${c}`,
      label: c,
      onRemove: () =>
        setFilters((f) => ({
          ...f,
          countries: f.countries.filter((x) => x !== c),
        })),
    })
  );
  filters.types.forEach((t) =>
    activeTags.push({
      key: `t-${t}`,
      label: t,
      onRemove: () =>
        setFilters((f) => ({ ...f, types: f.types.filter((x) => x !== t) })),
    })
  );
  filters.support.forEach((s) =>
    activeTags.push({
      key: `s-${s}`,
      label: s,
      onRemove: () =>
        setFilters((f) => ({
          ...f,
          support: f.support.filter((x) => x !== s),
        })),
    })
  );
  if (filters.salesCycle) {
    activeTags.push({
      key: "sc",
      label: filters.salesCycle,
      onRemove: () => setFilters((f) => ({ ...f, salesCycle: null })),
    });
  }
  if (filters.gcsMin > 0 || filters.gcsMax < 100) {
    activeTags.push({
      key: "gcs",
      label: `GCS ${filters.gcsMin}–${filters.gcsMax}`,
      onRemove: () =>
        setFilters((f) => ({ ...f, gcsMin: 0, gcsMax: 100 })),
    });
  }
  if (filters.search.trim()) {
    activeTags.push({
      key: "q",
      label: `"${filters.search.trim()}"`,
      onRemove: () => setFilters((f) => ({ ...f, search: "" })),
    });
  }

  return (
    <div className="min-h-full px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10">
          <h1 className="font-syne text-4xl font-bold text-white md:text-5xl">
            Partner Directory
          </h1>
          <p className="mt-3 max-w-2xl text-text-secondary">
            Explore verified channel partners across EMEA — filtered by
            geography, delivery model, and live GCS compatibility scores.
          </p>
          <p className="mt-2 text-sm text-text-muted">
            {filtered.length} partner{filtered.length !== 1 ? "s" : ""}{" "}
            match your criteria
          </p>
        </header>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          <FilterSidebar
            countries={countries}
            types={types}
            salesCycles={salesCycles}
            value={filters}
            onChange={setFilters}
            onClear={() => setFilters(defaultFilters)}
          />

          <div className="min-w-0 flex-1">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              {activeTags.map((tag) => (
                <button
                  key={tag.key}
                  type="button"
                  onClick={tag.onRemove}
                  className="inline-flex items-center gap-1 rounded-full border border-green-accent/50 bg-green-accent/10 px-3 py-1 text-xs font-medium text-green-accent"
                >
                  {tag.label}
                  <X className="h-3 w-3" />
                </button>
              ))}
            </div>

            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-text-secondary">
                Showing{" "}
                <span className="font-semibold text-white">
                  {sorted.length}
                </span>{" "}
                partners
              </p>
              <label className="flex items-center gap-2 text-sm text-text-secondary">
                Sort
                <select
                  value={sort}
                  onChange={(e) =>
                    setSort(e.target.value as typeof sort)
                  }
                  className="rounded-lg border border-dark-border bg-dark-surface px-3 py-2 text-white focus:border-purple-light focus:outline-none"
                >
                  <option value="match">Best Match</option>
                  <option value="az">A–Z</option>
                  <option value="newest">Newest</option>
                </select>
              </label>
            </div>

            <motion.div layout className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {sorted.map((p) => (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25 }}
                  >
                    <PartnerCard partner={p} linkPrefix="/demo/directory" />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {sorted.length === 0 && (
              <p className="rounded-2xl border border-dark-border bg-dark-surface p-10 text-center text-text-secondary">
                No partners match these filters. Try clearing filters or
                widening the GCS range.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
