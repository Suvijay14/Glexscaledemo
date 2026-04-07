"use client";

import { DashThemeProvider } from "@/context/DashThemeContext";
import { AppAuthenticatedShell } from "@/components/AppAuthenticatedShell";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashThemeProvider>
      <AppAuthenticatedShell>{children}</AppAuthenticatedShell>
    </DashThemeProvider>
  );
}
