"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  BarChart3,
  Target,
  Settings,
  User,
} from "lucide-react";
import { InvestorDemoFlow } from "@/components/InvestorDemoFlow";

const cardMotion = {
  rest: { y: 0, boxShadow: "0 0 0 rgba(87,2,132,0)" },
  hover: {
    y: -4,
    boxShadow: "0 12px 40px rgba(87, 2, 132, 0.25)",
    transition: { duration: 0.2 },
  },
};

export default function DemoOverviewPage() {
  return (
    <div className="min-h-full px-4 py-8 md:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-12">
          <h1 className="font-syne text-4xl font-bold text-white">
            Welcome to PartnerMatch
          </h1>
          <p className="mt-3 max-w-2xl text-text-secondary">
            Explore the complete platform. All data is simulated for
            demonstration purposes.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          <FeatureCard
            icon={<Search className="h-8 w-8 text-green-accent" />}
            priority="P0"
            title="Partner Directory"
            description="Browse 12 channel partners across EMEA with real-time filtering by country, partner type, support tier, sales cycle, and GCS score range."
            stats="12 Partners · 8 Countries · 5 Score Bands"
            cta="Explore Directory →"
            href="/demo/directory"
          />
          <FeatureCard
            icon={<BarChart3 className="h-8 w-8 text-green-accent" />}
            priority="P0"
            title="GCS Compatibility Engine"
            description="The proprietary 5-dimension scoring model. Every partner is scored across PEM, MAI, TCS, SCSC, and RTA with complete explainability and dimension-level breakdowns."
            stats="5 Dimensions · 0–100 Score · Full Explainability"
            cta="See Score Breakdown →"
            href="/demo/directory/1"
          />
          <FeatureCard
            icon={<Target className="h-8 w-8 text-green-accent" />}
            priority="P0"
            title="Vendor Dashboard"
            description="Personalised match results for a vendor account. View top partners ranked by GCS, score distribution chart, and commercial profile completion."
            stats="147 Partners Analyzed · 23 Strong Fits"
            cta="Open Dashboard →"
            href="/demo/dashboard"
          />
          <FeatureCard
            icon={<Settings className="h-8 w-8 text-green-accent" />}
            priority="P1"
            title="Admin Panel"
            description="Platform management for approving partners, managing users, monitoring profile completeness and GCS activation rates, and exporting data."
            stats="312 Users · 73% GCS Active"
            cta="View Admin →"
            href="/demo/admin"
          />
          <div className="md:col-span-2">
            <FeatureCard
              icon={<User className="h-8 w-8 text-green-accent" />}
              priority="P0"
              title="Partner Profile + GCS Breakdown"
              description="Complete partner profile view including geographic coverage, Channel Delivery Profile fields, contact information, and the full animated GCS score breakdown across all 5 dimensions with explanation text."
              stats="Nexus Channel Group · GCS Score 87 · Strong Fit"
              cta="View Sample Profile →"
              href="/demo/directory/1"
            />
          </div>
        </div>

        <InvestorDemoFlow basePath="/demo" />
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  priority,
  title,
  description,
  stats,
  cta,
  href,
}: {
  icon: React.ReactNode;
  priority: "P0" | "P1";
  title: string;
  description: string;
  stats: string;
  cta: string;
  href: string;
}) {
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={cardMotion}
      className="relative rounded-xl border border-dark-border bg-[#12101A] p-6 transition-colors hover:border-purple-primary"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          {icon}
          <div>
            <h2 className="font-syne text-xl font-bold text-white">{title}</h2>
            <p className="mt-2 text-sm text-text-secondary">{description}</p>
          </div>
        </div>
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
            priority === "P0"
              ? "bg-purple-primary/30 text-purple-light"
              : "bg-amber-500/20 text-amber-400"
          }`}
        >
          {priority}
        </span>
      </div>
      <div className="mt-6 flex flex-wrap items-end justify-between gap-4 border-t border-dark-border pt-4">
        <p className="text-xs text-text-muted">{stats}</p>
        <Link
          href={href}
          className="text-sm font-semibold text-green-accent hover:text-green-light"
        >
          {cta}
        </Link>
      </div>
    </motion.div>
  );
}
