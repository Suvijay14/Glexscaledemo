"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { motion, LayoutGroup } from "framer-motion";
import {
  LayoutDashboard,
  Search,
  User,
  BarChart3,
  Target,
  TrendingUp,
  Settings,
  Users,
  FileText,
  Map,
  X,
  ArrowRight,
  Sun,
  Moon,
} from "lucide-react";
import { DemoLogoMark, DemoLogoMarkSmall } from "@/components/DemoLogoMark";
import { cn } from "@/lib/utils";
import { useDashTheme } from "@/context/DashThemeContext";

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  match: (ctx: { pathname: string; hash: string }) => boolean;
};

function buildNavItems(
  basePath: "/demo" | "/app",
  st: {
    overview: string;
    directory: string;
    profile: string;
    gcs: string;
    dashboard: string;
    analytics: string;
    adminPanel: string;
    userMgmt: string;
  }
): {
  platform: NavItem[];
  vendor: NavItem[];
  admin: NavItem[];
} {
  const dir = `${basePath}/directory`;
  const dash = `${basePath}/dashboard`;
  const adm = `${basePath}/admin`;
  const profile = `${basePath}/directory/1`;
  const gcs = `${basePath}/directory/1#gcs`;

  const dirRe = new RegExp(`^${basePath}/directory/[^/]+$`);

  return {
    platform: [
      {
        href: basePath,
        label: st.overview,
        icon: LayoutDashboard,
        match: ({ pathname }) => pathname === basePath,
      },
      {
        href: dir,
        label: st.directory,
        icon: Search,
        match: ({ pathname }) => pathname === dir,
      },
      {
        href: profile,
        label: st.profile,
        icon: User,
        match: ({ pathname, hash }) =>
          dirRe.test(pathname) && hash !== "gcs",
      },
      {
        href: gcs,
        label: st.gcs,
        icon: BarChart3,
        match: ({ pathname, hash }) =>
          dirRe.test(pathname) && hash === "gcs",
      },
    ],
    vendor: [
      {
        href: dash,
        label: st.dashboard,
        icon: Target,
        match: ({ pathname, hash }) =>
          pathname === dash && hash !== "analytics",
      },
      {
        href: `${dash}#analytics`,
        label: st.analytics,
        icon: TrendingUp,
        match: ({ pathname, hash }) =>
          pathname === dash && hash === "analytics",
      },
    ],
    admin: [
      {
        href: adm,
        label: st.adminPanel,
        icon: Settings,
        match: ({ pathname, hash }) =>
          pathname === adm && hash !== "users",
      },
      {
        href: `${adm}#users`,
        label: st.userMgmt,
        icon: Users,
        match: ({ pathname, hash }) =>
          pathname === adm && hash === "users",
      },
    ],
  };
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  const { t } = useDashTheme();
  return (
    <p
      className="mb-1 mt-4 px-3 text-xs font-medium uppercase tracking-widest"
      style={{ color: t.dashSectionLabel }}
    >
      {children}
    </p>
  );
}

function NavRow({
  item,
  active,
  onNavigate,
  layoutGroupId,
}: {
  item: NavItem;
  active: boolean;
  onNavigate?: () => void;
  layoutGroupId: string;
}) {
  const { t } = useDashTheme();
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className="relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors duration-[350ms]"
      style={{
        color: active ? t.dashNavActiveText : t.dashNavInactiveText,
      }}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.backgroundColor = t.dashNavHoverBg;
          e.currentTarget.style.color = t.dashTextPrimary;
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.color = t.dashNavInactiveText;
        }
      }}
    >
      {active && (
        <motion.span
          layoutId={`activeIndicator-${layoutGroupId}`}
          className="absolute inset-0 rounded-lg"
          style={{
            backgroundColor: t.dashNavActiveBg,
            borderLeft: `2px solid ${t.dashNavActiveBorder}`,
          }}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
      <Icon
        className="relative z-10 h-4 w-4 shrink-0"
        style={{ color: active ? t.dashGreen : t.dashTextMuted }}
      />
      <span className="relative z-10">{item.label}</span>
    </Link>
  );
}

export function DemoSidebar({
  mobileOpen,
  onCloseMobile,
  onOpenFeatureSpec,
  onOpenRoadmap,
  basePath = "/demo",
  variant = "demo",
}: {
  mobileOpen: boolean;
  onCloseMobile: () => void;
  onOpenFeatureSpec: () => void;
  onOpenRoadmap: () => void;
  basePath?: "/demo" | "/app";
  variant?: "demo" | "app";
}) {
  const { t, isDashDark, toggleDashTheme } = useDashTheme();
  const pathname = usePathname() ?? "";
  const [hash, setHash] = useState("");
  const [lang, setLang] = useState<"en" | "fr">("en");

  useEffect(() => {
    const saved = localStorage.getItem("glexLang");
    if (saved === "fr") setLang("fr");
  }, []);

  const toggleLang = () => {
    const next = lang === "en" ? "fr" : "en";
    setLang(next);
    localStorage.setItem("glexLang", next);
  };

  const SIDEBAR_T = {
    en: {
      platform: "PLATFORM",
      overview: "Overview",
      directory: "Partner Directory",
      profile: "Partner Profile",
      gcs: "GCS Score Engine",
      vendor: "VENDOR",
      dashboard: "Vendor Dashboard",
      analytics: "Match Analytics",
      admin: "ADMINISTRATION",
      adminPanel: "Admin Panel",
      userMgmt: "User Management",
      aboutDemo: "ABOUT THIS DEMO",
      featureSpec: "Feature Specification",
      roadmap: "Phase Roadmap",
      exitDemo: "← Back to Home",
      loginAccess: "Contact GlexScale →",
      version: "v1.0 · Demo Build · Phase 1 of 3",
      demoBadge: "DEMO MODE — Data is simulated",
      lightMode: "Light Mode",
      darkMode: "Dark Mode",
      switchFr: "Passer en Français",
      switchEn: "Switch to English",
    },
    fr: {
      platform: "PLATEFORME",
      overview: "Vue d'ensemble",
      directory: "Annuaire des Partenaires",
      profile: "Profil Partenaire",
      gcs: "Moteur de Score GCS",
      vendor: "ÉDITEUR",
      dashboard: "Tableau de Bord Éditeur",
      analytics: "Analyses de Matching",
      admin: "ADMINISTRATION",
      adminPanel: "Panneau Admin",
      userMgmt: "Gestion des Utilisateurs",
      aboutDemo: "À PROPOS DE LA DÉMO",
      featureSpec: "Spécification des Fonctionnalités",
      roadmap: "Feuille de Route",
      exitDemo: "← Retour à l'accueil",
      loginAccess: "Contacter GlexScale →",
      version: "v1.0 · Démo · Phase 1 sur 3",
      demoBadge: "MODE DÉMO — Données simulées",
      lightMode: "Mode Clair",
      darkMode: "Mode Sombre",
      switchFr: "Passer en Français",
      switchEn: "Switch to English",
    },
  } as const;
  const st = SIDEBAR_T[lang];

  const { platform, vendor, admin } = useMemo(
    () => buildNavItems(basePath, st),
    [basePath, st]
  );

  const layoutGroupId = basePath.replace("/", "");

  useEffect(() => {
    const sync = () => setHash(window.location.hash.replace(/^#/, ""));
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [pathname]);

  const ctx = { pathname, hash };

  const sidebarSurfaceStyle: React.CSSProperties = {
    backgroundColor: t.dashSidebar,
    borderRight: `1px solid ${t.dashSidebarBorder}`,
    transition: "background-color 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease",
    ...(isDashDark
      ? {}
      : { boxShadow: "2px 0 12px rgba(0,0,0,0.08)" }),
  };

  const navBlock = (
    <LayoutGroup id={`sidebar-nav-${layoutGroupId}`}>
      <SectionLabel>{st.platform}</SectionLabel>
      <div className="space-y-0.5">
        {platform.map((item) => (
          <NavRow
            key={item.label + item.href}
            item={item}
            active={item.match(ctx)}
            onNavigate={onCloseMobile}
            layoutGroupId={layoutGroupId}
          />
        ))}
      </div>

      <SectionLabel>{st.vendor}</SectionLabel>
      <div className="space-y-0.5">
        {vendor.map((item) => (
          <NavRow
            key={item.label}
            item={item}
            active={item.match(ctx)}
            onNavigate={onCloseMobile}
            layoutGroupId={layoutGroupId}
          />
        ))}
      </div>

      <SectionLabel>{st.admin}</SectionLabel>
      <div className="space-y-0.5">
        {admin.map((item) => (
          <NavRow
            key={item.label}
            item={item}
            active={item.match(ctx)}
            onNavigate={onCloseMobile}
            layoutGroupId={layoutGroupId}
          />
        ))}
      </div>

      <SectionLabel>{st.aboutDemo}</SectionLabel>
      <div className="space-y-0.5">
        <button
          type="button"
          onClick={() => {
            onOpenFeatureSpec();
            onCloseMobile();
          }}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors duration-[350ms]"
          style={{ color: t.dashNavInactiveText }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = t.dashNavHoverBg;
            e.currentTarget.style.color = t.dashTextPrimary;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = t.dashNavInactiveText;
          }}
        >
          <FileText className="h-4 w-4" style={{ color: t.dashTextMuted }} />
          {st.featureSpec}
        </button>
        <button
          type="button"
          onClick={() => {
            onOpenRoadmap();
            onCloseMobile();
          }}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors duration-[350ms]"
          style={{ color: t.dashNavInactiveText }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = t.dashNavHoverBg;
            e.currentTarget.style.color = t.dashTextPrimary;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = t.dashNavInactiveText;
          }}
        >
          <Map className="h-4 w-4" style={{ color: t.dashTextMuted }} />
          {st.roadmap}
        </button>
      </div>
    </LayoutGroup>
  );

  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={onCloseMobile}
        />
      )}
      <aside
        className={cn(
          "fixed bottom-0 left-0 top-0 z-50 flex w-[260px] flex-col transition-transform duration-300 ease-out md:z-30 md:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
        style={sidebarSurfaceStyle}
      >
        {variant === "demo" && (
          <div
            className="py-1 text-center text-xs font-medium"
            style={{
              backgroundColor: t.dashBadgeDemoBg,
              color: t.dashBadgeDemoText,
              borderBottom: `1px solid ${t.dashSidebarBorder}`,
            }}
          >
            {st.demoBadge}
          </div>
        )}

        <div
          className="flex items-center justify-end p-2 md:hidden"
          style={{ borderBottom: `1px solid ${t.dashSidebarBorder}` }}
        >
          <button
            type="button"
            onClick={onCloseMobile}
            className="rounded-lg p-2 transition-colors"
            style={{ color: t.dashTextSecondary }}
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div
          className="p-4 md:border-b-0"
          style={{ borderBottom: `1px solid ${t.dashSidebarBorder}` }}
        >
          <div className="flex items-start gap-3">
            <DemoLogoMark
              className="h-8 w-8 shrink-0"
              variant={isDashDark ? "dark" : "light"}
            />
            <div>
              <p
                className="font-syne text-[18px] font-bold leading-tight"
                style={{ color: t.dashTextPrimary }}
              >
                GlexScale
              </p>
              <p
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: isDashDark ? "#7DD855" : "#570284" }}
              >
                PartnerMatch
              </p>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 pb-4 pt-2">{navBlock}</nav>

        <div
          className="mt-auto p-4"
          style={{ borderTop: `1px solid ${t.dashSidebarBorder}` }}
        >
          <div
            className="mx-2 mb-2 flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 transition-all duration-[350ms]"
            onClick={toggleLang}
            style={{
              backgroundColor: isDashDark ? "#1A1625" : "#F9F7F4",
              border: `1px solid ${isDashDark ? "#1E1A2E" : "#E0D8CC"}`,
            }}
          >
            <span className="text-sm">{lang === "en" ? "🇫🇷" : "🇬🇧"}</span>
            <span
              className="text-xs font-medium"
              style={{ color: isDashDark ? "#A89BC2" : "#666666" }}
            >
              {lang === "en" ? st.switchFr : st.switchEn}
            </span>
          </div>
          <div
            className="mx-2 mb-2 flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 transition-all duration-[350ms]"
            onClick={toggleDashTheme}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleDashTheme();
              }
            }}
            role="button"
            tabIndex={0}
            style={{
              backgroundColor: isDashDark ? "#1A1625" : "#F9F7F4",
              border: `1px solid ${isDashDark ? "#1E1A2E" : "#E0D8CC"}`,
            }}
          >
            <div className="flex items-center gap-2">
              {isDashDark ? (
                <Sun size={14} style={{ color: "#F59E0B" }} />
              ) : (
                <Moon size={14} style={{ color: "#570284" }} />
              )}
              <span
                className="text-xs font-medium"
                style={{
                  color: isDashDark ? "#A89BC2" : "#666666",
                }}
              >
                {isDashDark ? st.lightMode : st.darkMode}
              </span>
            </div>
            <div
              className="relative h-4 w-8 rounded-full transition-colors duration-300"
              style={{
                backgroundColor: isDashDark ? "#1E1A2E" : "#570284",
              }}
            >
              <motion.div
                className="absolute top-0.5 h-3 w-3 rounded-full"
                animate={{ x: isDashDark ? 2 : 16 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                style={{
                  backgroundColor: isDashDark ? "#6B5F82" : "#FFFFFF",
                }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <DemoLogoMarkSmall
              className="h-4 w-4 shrink-0"
              variant={isDashDark ? "dark" : "light"}
            />
            <div className="min-w-0">
              <p
                className="text-xs font-semibold"
                style={{ color: t.dashTextPrimary }}
              >
                PartnerMatch
              </p>
              <p className="text-xs" style={{ color: t.dashVersionText }}>
                {st.version}
              </p>
            </div>
          </div>
          {variant === "demo" && (
            <div
              className="mt-4 space-y-2 pt-4"
              style={{ borderTop: `1px solid ${t.dashSidebarBorder}` }}
            >
              <Link
                href="/"
                onClick={onCloseMobile}
                className="flex items-center justify-center gap-2 rounded-lg py-2 text-sm transition-colors duration-[350ms]"
                style={{
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: t.dashCardBorder,
                  backgroundColor: t.dashBg,
                  color: t.dashTextSecondary,
                }}
              >
                {st.exitDemo}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/"
                onClick={onCloseMobile}
                className="block text-center text-sm font-semibold transition-colors"
                style={{ color: t.dashGreen }}
              >
                {st.loginAccess}
              </Link>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
