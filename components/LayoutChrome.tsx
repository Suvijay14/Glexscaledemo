"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/Navbar";

export function LayoutChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideMarketingNav =
    pathname?.startsWith("/demo") ||
    pathname?.startsWith("/app") ||
    pathname === "/login";

  if (hideMarketingNav) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-[4.5rem]">{children}</main>
    </>
  );
}
