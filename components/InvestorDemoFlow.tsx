"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, Fragment, useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

function useHash(pathname: string | null) {
  const [hash, setHash] = useState("");
  useEffect(() => {
    const sync = () => setHash(window.location.hash.replace(/^#/, ""));
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [pathname]);
  return hash;
}

export function InvestorDemoFlow({
  basePath = "/demo",
}: {
  basePath?: "/demo" | "/app";
}) {
  const pathname = usePathname() ?? "";
  const hash = useHash(pathname);

  const steps = useMemo(
    () => [
      { n: 1, title: "Landing Page", href: "/" },
      { n: 2, title: "Partner Directory", href: `${basePath}/directory` },
      { n: 3, title: "Apply Filters", href: `${basePath}/directory#filters` },
      { n: 4, title: "Partner Profile", href: `${basePath}/directory/1` },
      { n: 5, title: "GCS Breakdown", href: `${basePath}/directory/1#gcs` },
      { n: 6, title: "Vendor Dashboard", href: `${basePath}/dashboard` },
    ],
    [basePath]
  );

  function activeIndex(): number {
    if (pathname === "/") return 0;
    const dir = `${basePath}/directory`;
    const prof = `${basePath}/directory/1`;
    const dash = `${basePath}/dashboard`;

    if (pathname === dir) {
      if (hash === "filters") return 2;
      return 1;
    }
    if (pathname === prof) {
      if (hash === "gcs") return 4;
      return 3;
    }
    if (pathname === dash) return 5;
    return -1;
  }

  const active = activeIndex();

  return (
    <section className="mt-16 border-t border-dark-border pt-12">
      <h2 className="font-syne text-2xl font-bold text-white">
        Investor Demo Flow
      </h2>
      <p className="mt-2 text-text-secondary">
        Follow this sequence to walk an investor through the platform
      </p>
      <div className="mt-10 overflow-x-auto pb-4">
        <div className="flex min-w-[720px] items-start">
          {steps.map((step, i) => (
            <Fragment key={step.n}>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 * i, duration: 0.4 }}
                className="flex w-[120px] shrink-0 flex-col items-center"
              >
                <Link href={step.href} className="flex flex-col items-center text-center">
                  <span
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full font-syne text-sm font-bold transition",
                      active === i
                        ? "bg-purple-primary text-white ring-2 ring-green-accent/50"
                        : "bg-dark-surface text-text-secondary ring-1 ring-dark-border"
                    )}
                  >
                    {step.n}
                  </span>
                  <span
                    className={cn(
                      "mt-2 max-w-[100px] text-xs leading-tight",
                      active === i ? "text-white" : "text-text-muted"
                    )}
                  >
                    {step.title}
                  </span>
                </Link>
              </motion.div>
              {i < steps.length - 1 && (
                <div
                  className="mt-5 h-0 min-w-[32px] flex-1 border-t border-dashed border-dark-border"
                  aria-hidden
                />
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
