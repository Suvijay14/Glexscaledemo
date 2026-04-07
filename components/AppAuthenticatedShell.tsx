"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DemoShell } from "@/components/DemoShell";
import { readSession, clearSession } from "@/lib/auth";

export function AppAuthenticatedShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [name, setName] = useState("");
  const [initial, setInitial] = useState("U");

  useEffect(() => {
    const session = readSession();
    if (!session) {
      router.replace("/login");
      return;
    }
    setName(session.name);
    setInitial(session.name.trim().charAt(0).toUpperCase() || "U");
    setReady(true);
  }, [router]);

  function handleLogout() {
    clearSession();
    router.push("/login");
  }

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-dark-bg">
        <div
          className="h-10 w-10 animate-spin rounded-full border-2 border-green-accent border-t-transparent"
          aria-hidden
        />
      </div>
    );
  }

  return (
    <DemoShell
      variant="app"
      basePath="/app"
      userName={name}
      userInitial={initial}
      onLogout={handleLogout}
    >
      {children}
    </DemoShell>
  );
}
