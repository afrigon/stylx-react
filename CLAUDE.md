# stylx-react

Reusable React + TypeScript design-system primitives — the web port of the Swift
design system `afrigon/stylx-swift`. Published to **GitHub Packages**
(`@afrigon/stylx-react`) and consumed by application frontends (e.g.
`afrigon/backlog`). A GitHub Release triggers the `publish` workflow.

## Scope

- **Generic, reusable primitives only** — ThemeProvider + tokens, typography,
  Button, TextField, Card, Badge, Separator, Skeleton, layout. Anything
  application-specific (e.g. a game card, domain badges) lives in the consuming
  app, composed from these primitives.
- **Web port of `stylx-swift`** — mirror its model: the color palette (10 hues ×
  10 tints), `ThemedColor` (light / dark / increased-contrast), and `ColorRole`
  (`neutral`, `information`, `success`, `warning`, `critical`, `magic`). Two font
  roles, `text` and `code`, mirror its `TextRole`.

## Theming

- Tokens are **CSS custom properties**; **Tailwind** maps utilities onto the same
  variables (one token source for utilities and components). Tailwind is a **peer
  dependency**.
- A **`ThemeProvider`** sets scheme (light / dark) and contrast (standard /
  increased) via `data-*` attributes on a wrapper, defaulting to the OS
  preference. The active **role** is applied to a subtree via a **`data-role`**
  attribute, which rebinds the role token variables (mirrors stylx-swift's
  environment `colorRole`).
- **Fonts are injected, never bundled** — the two roles default to system fonts;
  the consuming app supplies a font by installing a `@fontsource-variable/*`
  package and pointing the font CSS variables at it.

## Stack

- React + TypeScript (strict), built with **tsup** → ESM + `.d.ts` + a CSS entry
  in `dist/`. A `prepare` script builds on install so a git-dependency consumer
  gets compiled output.
- A **Vite playground** (`pnpm dev`) renders the primitives during development.
- Package manager **pnpm**. Lint/format mirror the backlog frontend: ESLint 9 +
  Prettier — 4-space, no semicolons, `printWidth` 120, `trailingComma` none,
  `arrowParens: avoid`.

## Layout

| Path             | Purpose                                                                            |
| ---------------- | ---------------------------------------------------------------------------------- |
| `src/`           | Library source; `src/index.ts` is the public entry, `src/styles.css` the CSS entry |
| `playground/`    | Vite app that renders the primitives (`pnpm dev`)                                  |
| `dist/`          | Build output (ESM + types + CSS); generated, not committed                         |
| `tsup.config.ts` | Build config                                                                       |
| `vite.config.ts` | Playground dev server; aliases `@afrigon/stylx-react` → `src/`                     |

## Commands

- `pnpm dev` — playground dev server
- `pnpm build` — build `dist/`
- `pnpm typecheck` — `tsc --noEmit`
- `pnpm lint` · `pnpm format`

## Conventions

- Keep comments minimal; no doc comments in non-public code. Full words over
  abbreviations. Follow the existing file's style.
- No hardcoded colors or sizes in components — everything reads from tokens.
- `dist/` is never committed; it is rebuilt by `prepare` on install.
