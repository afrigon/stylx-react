# stylx-react

Reusable React + TypeScript design-system primitives — the web port of
[`stylx-swift`](https://github.com/afrigon/stylx-swift). Generic primitives only
(theme + tokens, typography, Button, TextField, Card, Badge, Separator, Skeleton,
layout); application-specific components live in the consuming app.

## Install

Consumed as a git dependency (no registry publish):

```sh
pnpm add github:afrigon/stylx-react
```

The package builds on install (`prepare`), producing `dist/` (ESM + types + CSS).

## Usage

```tsx
import { ThemeProvider } from "stylx-react"
import "stylx-react/styles.css"

export function App() {
    return <ThemeProvider>{/* ... */}</ThemeProvider>
}
```

Tailwind is a peer dependency; point your Tailwind setup at the shipped token
variables (see the Tailwind preset). Fonts are injected by the app — install a
`@fontsource-variable/*` package and point the font CSS variables at it.

## Development

```sh
pnpm install
pnpm dev        # playground
pnpm build      # dist/
pnpm lint
pnpm typecheck
```
