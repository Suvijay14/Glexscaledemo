"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type FilterState = {
  search: string;
  countries: string[];
  types: string[];
  support: string[];
  salesCycle: string | null;
  gcsMin: number;
  gcsMax: number;
};

function Accordion({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-dark-border py-3">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between text-left text-sm font-semibold text-white"
      >
        {title}
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform",
            open && "rotate-180"
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="pt-3">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FilterSidebar({
  countries,
  types,
  salesCycles,
  value,
  onChange,
  onClear,
}: {
  countries: string[];
  types: string[];
  salesCycles: string[];
  value: FilterState;
  onChange: (next: FilterState) => void;
  onClear: () => void;
}) {
  function toggle(arr: string[], item: string): string[] {
    return arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item];
  }

  function toggleSupport(tier: string) {
    onChange({
      ...value,
      support: toggle(value.support, tier),
    });
  }

  return (
    <aside
      id="filters"
      className="w-full shrink-0 scroll-mt-28 md:w-[280px]"
    >
      <div className="sticky top-24 rounded-2xl border border-dark-border bg-dark-surface p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
          <input
            type="search"
            placeholder="Search partners..."
            value={value.search}
            onChange={(e) =>
              onChange({ ...value, search: e.target.value })
            }
            className="w-full rounded-xl border border-dark-border bg-dark-bg py-2.5 pl-10 pr-3 text-sm text-white placeholder:text-text-muted focus:border-purple-light focus:outline-none focus:ring-1 focus:ring-purple-light"
          />
        </div>

        <Accordion title="Country">
          <div className="flex max-h-48 flex-col gap-2 overflow-y-auto pr-1">
            {countries.map((c) => (
              <label
                key={c}
                className="flex cursor-pointer items-center gap-2 text-sm text-text-secondary"
              >
                <input
                  type="checkbox"
                  checked={value.countries.includes(c)}
                  onChange={() =>
                    onChange({
                      ...value,
                      countries: toggle(value.countries, c),
                    })
                  }
                  className="rounded border-dark-border bg-dark-bg text-green-accent focus:ring-green-accent"
                />
                {c}
              </label>
            ))}
          </div>
        </Accordion>

        <Accordion title="Partner Type">
          <div className="flex flex-col gap-2">
            {types.map((t) => (
              <label
                key={t}
                className="flex cursor-pointer items-center gap-2 text-sm text-text-secondary"
              >
                <input
                  type="checkbox"
                  checked={value.types.includes(t)}
                  onChange={() =>
                    onChange({
                      ...value,
                      types: toggle(value.types, t),
                    })
                  }
                  className="rounded border-dark-border bg-dark-bg text-green-accent focus:ring-green-accent"
                />
                {t}
              </label>
            ))}
          </div>
        </Accordion>

        <Accordion title="Support Tier">
          <div className="flex flex-wrap gap-2">
            {(["L1", "L2", "L3"] as const).map((tier) => (
              <button
                key={tier}
                type="button"
                onClick={() => toggleSupport(tier)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-semibold transition",
                  value.support.includes(tier)
                    ? "border-green-accent bg-green-accent/15 text-green-accent"
                    : "border-dark-border text-text-secondary hover:border-purple-light"
                )}
              >
                {tier}
              </button>
            ))}
          </div>
        </Accordion>

        <Accordion title="Sales Cycle">
          <div className="flex flex-col gap-2">
            <label className="flex cursor-pointer items-center gap-2 text-sm text-text-secondary">
              <input
                type="radio"
                name="salesCycle"
                checked={value.salesCycle === null}
                onChange={() => onChange({ ...value, salesCycle: null })}
                className="border-dark-border bg-dark-bg text-green-accent focus:ring-green-accent"
              />
              Any
            </label>
            {salesCycles.map((s) => (
              <label
                key={s}
                className="flex cursor-pointer items-center gap-2 text-sm text-text-secondary"
              >
                <input
                  type="radio"
                  name="salesCycle"
                  checked={value.salesCycle === s}
                  onChange={() => onChange({ ...value, salesCycle: s })}
                  className="border-dark-border bg-dark-bg text-green-accent focus:ring-green-accent"
                />
                {s}
              </label>
            ))}
          </div>
        </Accordion>

        <Accordion title="GCS Score Range" defaultOpen>
          <div className="space-y-3">
            <div className="flex justify-between text-xs text-text-muted">
              <span>{value.gcsMin}</span>
              <span>{value.gcsMax}</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={value.gcsMin}
              onChange={(e) =>
                onChange({
                  ...value,
                  gcsMin: Math.min(Number(e.target.value), value.gcsMax),
                })
              }
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-dark-border accent-purple-primary"
            />
            <input
              type="range"
              min={0}
              max={100}
              value={value.gcsMax}
              onChange={(e) =>
                onChange({
                  ...value,
                  gcsMax: Math.max(Number(e.target.value), value.gcsMin),
                })
              }
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-dark-border accent-green-accent"
            />
          </div>
        </Accordion>

        <button
          type="button"
          onClick={onClear}
          className="mt-4 w-full rounded-xl border border-dark-border py-2 text-sm font-semibold text-text-secondary transition hover:border-green-accent hover:text-green-accent"
        >
          Clear All
        </button>
      </div>
    </aside>
  );
}
