# Calorie Calculator

A calorie tracking app for foods, meals, profile settings, and daily summary.
Stack: Vue 3, Vite, TypeScript, Vue Router, TanStack Query, Vitest, Storybook.

## Requirements

- Node.js: `^20.19.0` or `>=22.12.0`
- pnpm

## Quick Start

```sh
pnpm install
pnpm dev
```

## Scripts

- `pnpm dev` - local Vite dev server
- `pnpm build` - type-check + production build
- `pnpm preview` - preview production build
- `pnpm test:unit` - unit tests (Vitest)
- `pnpm lint` - ESLint (`--fix`)
- `pnpm format` - Prettier for `src/`
- `pnpm storybook` - local Storybook
- `pnpm build-storybook` - Storybook build

## Architecture

Code is split into layers:

- `src/domain` - domain types and pure client-side calculations
- `src/features` - feature action contracts used by UI and infra
- `src/infra` - adapters and implementations (fake API, mappers, storage)
- `src/ui` - pages, components, query-hooks, UI kit
- `src/ui/router` - routing and route wiring
- `src/shared` - shared pure utilities such as `Result`
- `src/lib` - local UI-oriented helpers

### Dependency Flow

- `domain` is pure and does not depend on `features/infra/ui`
- `features` define action contracts over domain types
- `infra` implements feature actions and maps DTOs to domain models
- `ui/query-hooks` adapt feature actions to TanStack Query
- page views define their own `deps` contract from the actions they actually use

Import boundaries are enforced in [eslint.config.boundaries.ts](./eslint.config.boundaries.ts).

## Error Model

Actions return `Result<T, E>`:

- `ok: true` -> success result
- `ok: false` -> error
  - `infra` -> infrastructure error
  - `not-found` -> expected domain case for delete operations

The UI handles expected errors through `Result` instead of relying on exceptions across layer boundaries.

## Tests

- Unit tests for `domain`, `infra`, and helpers
- Storybook stories for main page-view components

Run:

```sh
pnpm test:unit
```
