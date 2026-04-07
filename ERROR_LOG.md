# PartnerMatch — build & deployment error log

This file records issues encountered while building the GlexScale PartnerMatch demo MVP, what caused them, and how they were resolved.

---

## 1. `create-next-app` failed in workspace root (`Glexscale`)

**Symptom:** `Could not create a project called "Glexscale" because of npm naming restrictions: name can no longer contain capital letters`

**Cause:** npm package name must be lowercase; the folder name was used as the package name.

**Fix:** Create the app in a lowercase subdirectory: `partnermatch` (`/Users/suvijay/Glexscale/partnermatch`).

---

## 2. Lucide React: `Linkedin` / `Twitter` import errors

**Symptom:** Build warned that `Linkedin` and `Twitter` were not exported from `lucide-react` (barrel optimization).

**Cause:** Icon set / barrel exports differ by version; some social icons were renamed or removed.

**Fix:** Replace footer icons with widely available icons: `Share2` and `MessageCircle`.

---

## 3. ESLint: unused variables

**Symptom:** `next build` failed on `@typescript-eslint/no-unused-vars` (`Link` in `directory/[id]/page.tsx`, `cn` in `DimensionBar.tsx`, `progress` in `GCSBreakdown.tsx`).

**Fix:** Remove unused imports and variables.

---

## 4. TypeScript: `Set` iteration / spread

**Symptom:** `Type 'Set<string>' can only be iterated through when using the '--downlevelIteration' flag...`

**Cause:** Spreading a `Set` (`[...new Set(...)]`) triggered downlevelIteration requirements with the current `tsconfig` target.

**Fix:** Use `Array.from(new Set(...))` instead of spread.

---

## 5. Framer Motion: `ease` type in `Variants`

**Symptom:** `Type 'string' is not assignable to type 'Easing | Easing[] | undefined'` on `variants` objects.

**Cause:** Inferred type for `ease: "easeOut"` was `string`, not a literal.

**Fix:** Use `ease: "easeOut" as const` in `pageVariants` / `cardVariants` / `template.tsx`.

---

## Deployment checklist (Vercel + GitHub)

1. **Repository:** From the `partnermatch` folder, `git init` is already done by `create-next-app`. Add a remote and push:
   - `git remote add origin <your-repo-url>`
   - `git add . && git commit -m "Initial PartnerMatch MVP" && git push -u origin main`

2. **Vercel:** Import the GitHub repo in the Vercel dashboard.
   - **Root directory:** If the repo root is `Glexscale` and the app lives in `partnermatch`, set **Root Directory** to `partnermatch` in Project Settings → General.
   - **Build:** Default `npm run build` and Output `.next` are correct for Next.js.

3. **Verify:** After deploy, run through `/`, `/directory`, `/directory/1`, `/dashboard`, `/admin`.

---

## Maintenance

- Re-run `npm run build` before every release; fix any new ESLint/TS errors immediately.
- If `npm audit` reports vulnerabilities in dev tooling, evaluate `npm audit fix` (avoid `--force` unless you accept breaking changes).
