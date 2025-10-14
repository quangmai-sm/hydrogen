<!-- OPENSPEC:START -->
# OpenSpec Instructions

These instructions are for AI assistants working in this project.

Always open `@/openspec/AGENTS.md` when the request:
- Mentions planning or proposals (words like proposal, spec, change, plan)
- Introduces new capabilities, breaking changes, architecture shifts, or big performance/security work
- Sounds ambiguous and you need the authoritative spec before coding

Use `@/openspec/AGENTS.md` to learn:
- How to create and apply change proposals
- Spec format and conventions
- Project structure and guidelines

Keep this managed block so 'openspec update' can refresh the instructions.

<!-- OPENSPEC:END -->

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Shopify Hydrogen** storefront built with **React Router v7** (NOT Remix). Hydrogen is Shopify's stack for headless commerce, deployed on Shopify Oxygen (Cloudflare Workers runtime).

## Critical: React Router vs Remix

**NEVER USE REMIX IMPORTS!** This project uses React Router v7, not Remix.

### Correct Import Patterns

```typescript
// ✅ CORRECT - Use React Router
import { useLoaderData, Link, Form, useActionData, useNavigation, useSubmit } from 'react-router';
import type { Route } from './+types/route-name';

// ❌ WRONG - Never use these
import { ... } from '@remix-run/react';
import { ... } from 'react-router-dom';  // NEVER use this either!
```

### Package Mapping Reference

| Remix Package | React Router v7 Equivalent |
|--------------|---------------------------|
| `@remix-run/react` | `react-router` |
| `@remix-run/dev` | `@react-router/dev` |
| `@remix-run/node` | `@react-router/node` |
| `@remix-run/server-runtime` | `react-router` |
| `@remix-run/testing` | `react-router` |

When following Hydrogen docs or examples that show Remix imports, always translate to React Router equivalents.

## Development Commands

```bash
# Development server with codegen
npm run dev

# Production build with codegen
npm run build

# Preview production build
npm run preview

# Linting
npm run lint

# Type checking (includes React Router type generation)
npm run typecheck

# Generate GraphQL types and React Router types
npm run codegen
```

## Architecture & Key Concepts

### 1. Context System (Hydrogen)

The app uses Hydrogen's context system for Storefront API, Customer Account API, Cart, and Session management.

- **Context creation**: [lib/context.ts](app/lib/context.ts) - Creates `HydrogenRouterContextProvider` with Storefront, Customer Account, Cart, and Session
- **Entry point**: [server.ts](server.ts) - Oxygen worker entry, creates context and request handler
- **Type augmentation**: Extend `HydrogenAdditionalContext` interface in [lib/context.ts](app/lib/context.ts) to add custom properties (CMS clients, 3P SDKs, etc.)

Context is available in all loaders/actions via `args.context`:
```typescript
export async function loader({ context }: Route.LoaderArgs) {
  const { storefront, customerAccount, cart, session } = context;
  // Use context properties...
}
```

### 2. Route Type Safety

React Router v7 provides full type safety through generated types:

```typescript
import type { Route } from './+types/route-name';

export async function loader(args: Route.LoaderArgs) { }
export async function action(args: Route.ActionArgs) { }
export const meta: Route.MetaFunction = ({ data }) => { };
```

Generated types are in `.react-router/types/` and automatically updated by `react-router typegen`.

### 3. Data Loading Patterns

**Critical vs Deferred Data Pattern** - Used in [root.tsx](app/root.tsx) and route loaders:

```typescript
export async function loader(args: Route.LoaderArgs) {
  const deferredData = loadDeferredData(args);  // Don't await
  const criticalData = await loadCriticalData(args);  // Await
  return { ...deferredData, ...criticalData };
}

// Critical: Above the fold, required for initial render
async function loadCriticalData({ context }: Route.LoaderArgs) {
  const [data] = await Promise.all([
    // Queries that MUST complete before render
  ]);
  return { data };
}

// Deferred: Below the fold, can load after paint
function loadDeferredData({ context }: Route.LoaderArgs) {
  return {
    // Return promises, don't await
    // Catch errors to prevent 500s
    data: storefront.query(...).catch(err => { console.error(err); return null; })
  };
}
```

### 4. GraphQL & Code Generation

**Two GraphQL projects** (configured in [.graphqlrc.ts](.graphqlrc.ts)):

1. **Storefront API** (`default` project)
   - Schema: Shopify Storefront API
   - Documents: All app files except `app/graphql/customer-account/`
   - Generated types: `storefrontapi.generated.d.ts`

2. **Customer Account API** (`customer` project)
   - Schema: Shopify Customer Account API
   - Documents: `app/graphql/customer-account/*.{ts,tsx,js,jsx}`
   - Generated types: `customer-accountapi.generated.d.ts`

**GraphQL fragments** are defined in [lib/fragments.ts](app/lib/fragments.ts):
- `CART_QUERY_FRAGMENT` - Used by Hydrogen cart context
- `HEADER_QUERY` / `FOOTER_QUERY` - Layout queries
- Reuse fragments across queries for consistency

### 5. Routing & File Structure

- **Routes**: File-based routing via `@react-router/fs-routes` in [app/routes/](app/routes/)
- **Route config**: [app/routes.ts](app/routes.ts) uses `hydrogenRoutes()` wrapper
- React Router v7 conventions:
  - `_index.tsx` = index route
  - `$param.tsx` = dynamic segment
  - `_` prefix = pathless layout route
  - `[file.ext].tsx` = resource route (non-UI, like robots.txt)

### 6. Vite & Build Configuration

**Vite plugins** ([vite.config.ts](vite.config.ts)):
1. `tailwindcss()` - Tailwind v4
2. `hydrogen()` - Hydrogen-specific optimizations
3. `oxygen()` - Mini Oxygen dev server
4. `reactRouter()` - React Router bundling
5. `tsconfigPaths()` - TypeScript path resolution (`~/*` → `app/*`)

**SSR optimizations**: Include CJS dependencies in `ssr.optimizeDeps.include` if they throw module errors.

### 7. Performance Optimization

**Root loader revalidation** ([root.tsx](app/root.tsx)):
- `shouldRevalidate` function prevents unnecessary root data fetches
- Only revalidates on mutations (POST/PUT/DELETE) or manual revalidation
- Critical for performance but requires careful consideration

**Storefront API caching**:
```typescript
storefront.query(QUERY, {
  cache: storefront.CacheLong(),  // Long cache
  // or storefront.CacheShort(), CacheNone(), CacheCustom()
});
```

### 8. Styling

- **Tailwind v4** via `@tailwindcss/vite`
- Config: [app/styles/tailwind.css](app/styles/tailwind.css)
- Reset: [app/styles/reset.css](app/styles/reset.css)
- Custom: [app/styles/app.css](app/styles/app.css)
- Loaded in [root.tsx](app/root.tsx) `Layout` component

## Environment Variables

Required in `.env` (Oxygen automatically provides these in production):

```bash
SESSION_SECRET=xxx
PUBLIC_STORE_DOMAIN=xxx.myshopify.com
PUBLIC_STOREFRONT_API_TOKEN=xxx
PUBLIC_STOREFRONT_ID=xxx
PUBLIC_CHECKOUT_DOMAIN=xxx
```

Accessed via `context.env` in loaders/actions.

## Testing Utilities

**Variant selection**: [lib/variants.ts](app/lib/variants.ts)
- Hydrogen provides utilities for product variant logic
- Use `getSelectedProductOptions`, `useOptimisticVariant`, `getProductOptions`

**Search**: [lib/search.ts](app/lib/search.ts) - Predictive search utilities

**Session**: [lib/session.ts](app/lib/session.ts) - Custom session implementation using Hydrogen's session utilities

## Common Patterns

### Adding a new route

1. Create file in `app/routes/` following naming conventions
2. Import types: `import type { Route } from './+types/route-name';`
3. Use `react-router` imports (not Remix!)
4. Run `npm run typecheck` to generate types

### Querying Storefront API

```typescript
const { product } = await context.storefront.query(PRODUCT_QUERY, {
  variables: { handle },
  cache: context.storefront.CacheLong(),
});
```

### Extending context

Edit [lib/context.ts](app/lib/context.ts):
```typescript
const additionalContext = {
  cms: await createCMSClient(env),
} as const;
```

The type is automatically augmented via `HydrogenAdditionalContext` interface.

## Notes

- Node.js >= 18.0.0 required
- Deployed to Shopify Oxygen (Cloudflare Workers)
- Entry server: [entry.server.tsx](app/entry.server.tsx) handles SSR with CSP
- Entry client: [entry.client.tsx](app/entry.client.tsx) hydrates the app
- Uses `@total-typescript/ts-reset` for enhanced TypeScript types
