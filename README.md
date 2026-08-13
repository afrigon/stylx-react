# stylx-react

Reusable React + TypeScript design-system primitives — the web port of
[`stylx-swift`](https://github.com/afrigon/stylx-swift). Generic primitives only
(theme + tokens, typography, Button, TextField, Card, Badge, Separator, Skeleton,
layout); application-specific components live in the consuming app.

## Install

Published to **GitHub Packages**. Point the `@afrigon` scope at the registry in
an `.npmrc`:

```
@afrigon:registry=https://npm.pkg.github.com
```

GitHub Packages requires authentication even for public packages, so also provide
a token with `read:packages` (e.g. `//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}`),
then:

```sh
pnpm add @afrigon/stylx-react
```

Releasing a new version: publish a GitHub Release — the `publish` workflow builds
and pushes the package to GitHub Packages.

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
