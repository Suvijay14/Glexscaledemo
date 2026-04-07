export const SESSION_STORAGE_KEY = "glexSession";

export type UserRole = "vendor" | "admin";

export interface GlexSession {
  token: string;
  role: UserRole;
  name: string;
  loggedIn: boolean;
}

export const VALID_CREDENTIALS: {
  email: string;
  password: string;
  role: UserRole;
  name: string;
}[] = [
  {
    email: "vendor@glexscale.com",
    password: "GlexDemo2026",
    role: "vendor",
    name: "TechVendor EMEA",
  },
  {
    email: "admin@glexscale.com",
    password: "GlexAdmin2026",
    role: "admin",
    name: "GlexScale Admin",
  },
  {
    email: "demo@glexscale.com",
    password: "demo1234",
    role: "vendor",
    name: "Demo User",
  },
];

export function findValidCredential(
  email: string,
  password: string
): (typeof VALID_CREDENTIALS)[0] | undefined {
  const e = email.trim().toLowerCase();
  return VALID_CREDENTIALS.find(
    (c) => c.email.toLowerCase() === e && c.password === password
  );
}

export function saveSession(session: GlexSession): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
}

export function clearSession(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SESSION_STORAGE_KEY);
}

export function readSession(): GlexSession | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(SESSION_STORAGE_KEY);
  if (!raw) return null;
  try {
    const s = JSON.parse(raw) as GlexSession;
    if (!s.loggedIn || !s.token) return null;
    return s;
  } catch {
    return null;
  }
}
