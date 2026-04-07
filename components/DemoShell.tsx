"use client";

import { useState } from "react";
import { DemoSidebar } from "@/components/DemoSidebar";
import { DemoHeader } from "@/components/DemoHeader";
import { FeatureSpecPanel } from "@/components/FeatureSpecPanel";
import { PhaseRoadmapModal } from "@/components/PhaseRoadmapModal";
import { useDashTheme } from "@/context/DashThemeContext";

export type ShellVariant = "demo" | "app";

export function DemoShell({
  children,
  variant = "demo",
  basePath = "/demo",
  userName = "TechVendor EMEA",
  userInitial = "T",
  onLogout,
}: {
  children: React.ReactNode;
  variant?: ShellVariant;
  basePath?: "/demo" | "/app";
  userName?: string;
  userInitial?: string;
  onLogout?: () => void;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [featureOpen, setFeatureOpen] = useState(false);
  const [roadmapOpen, setRoadmapOpen] = useState(false);
  const { t } = useDashTheme();

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: t.dashBg,
        transition: "background-color 0.35s ease, color 0.35s ease",
      }}
    >
      <DemoSidebar
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
        onOpenFeatureSpec={() => setFeatureOpen(true)}
        onOpenRoadmap={() => setRoadmapOpen(true)}
        basePath={basePath}
        variant={variant}
      />
      <div className="flex min-h-screen flex-col md:pl-[260px]">
        <DemoHeader
          onMenuClick={() => setMobileOpen(true)}
          variant={variant}
          userName={userName}
          userInitial={userInitial}
          onLogout={variant === "app" ? onLogout : undefined}
        />
        <div className="flex-1 overflow-y-auto pt-14">{children}</div>
      </div>
      <FeatureSpecPanel
        open={featureOpen}
        onClose={() => setFeatureOpen(false)}
      />
      <PhaseRoadmapModal
        open={roadmapOpen}
        onClose={() => setRoadmapOpen(false)}
      />
    </div>
  );
}
