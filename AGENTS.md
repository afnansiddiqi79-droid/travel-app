<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Commands

```bash
npm run dev         # dev server (re-adds the Next.js block above)
npm run build       # production build
npm run lint        # eslint (core-web-vitals + typescript configs)
npm run typecheck   # tsc --noEmit
npm run format      # prettier on ts/tsx only
```

- No tests are configured. Verify changes with `lint` → `typecheck` → `build`.
- Prettier: no semicolons, double quotes, LF line endings, 2-space indent; class strings sorted via `prettier-plugin-tailwindcss` (`cn`/`cva` are sorted too). Run `npm run format` before committing.

# Stack & conventions

- Next.js 16 (App Router only, `app/`), React 19, Tailwind v4 via `@tailwindcss/postcss` — there is no `tailwind.config.*`; theme tokens live in `app/globals.css` (`@theme inline` maps CSS vars to Tailwind color utilities). The local Next.js API differs from what you may know — check `node_modules/next/dist/docs/` before using older patterns.
- shadcn/ui with the `base-nova` style (see `components.json`). Components use **Base UI** (`@base-ui/react/...`), not Radix — don't install Radix primitives for them. Add new components with `npx shadcn@latest add <name>`; they land in `components/ui/`.
- The class-name helper is the `cn` **npm package** (`import { cn } from "cn"`), not `@/lib/utils`. Follow the pattern used by existing `components/ui/*` files.
- Dark mode is class-based (`@custom-variant dark (&:is(.dark *));` in `globals.css` + `ThemeProvider` from `components/theme-provider.tsx`). `app/layout.tsx` must keep `suppressHydrationWarning` on `<html>`.
- Path aliases: `@/*` → repo root (`components`, `hooks`, `lib`, `app`). Pre-existing hooks/code-highlight utilities live in `hooks/` and `lib/highlighter.tsx` (shiki).

# Repository state

- Working tree is ahead of git: many `components/ui/*` files, `public/` images, and `package.json` deps are uncommitted. Don't treat `git status` output (or the template boilerplate in `app/page.tsx`) as the full picture of what components exist on disk — check `components/ui/` first.
