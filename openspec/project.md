# Project Context

## Purpose

This is a **Shopify Hydrogen** headless commerce storefront built with **React Router v7** (NOT Remix). The project provides a modern, type-safe e-commerce experience deployed on Shopify Oxygen (Cloudflare Workers runtime).

**Key Goals:**
- Deliver fast, server-rendered storefront experiences for Shopify merchants
- Provide type-safe interactions with Shopify Storefront API and Customer Account API
- Maintain optimal performance through strategic data loading and caching
- Enable flexible customization while adhering to Hydrogen conventions

## Tech Stack

### Core Framework
- **React Router v7** (7.9.2) - Full-stack web framework with file-based routing
- **React** (18.3.1) - UI library
- **Vite** (6.2.4) - Build tool and dev server
- **TypeScript** (5.9.2) - Type safety

### Shopify & Hydrogen
- **@shopify/hydrogen** (2025.7.0) - Shopify's headless commerce framework
- **@shopify/mini-oxygen** - Local development server (Oxygen emulator)
- **Shopify Storefront API** - Product catalog, cart, checkout
- **Shopify Customer Account API** - Customer authentication and account management

### Styling & UI
- **Tailwind CSS** (4.1.6) - Utility-first CSS framework via `@tailwindcss/vite`
- Custom CSS reset and app styles

### GraphQL & Code Generation
- **GraphQL** (16.10.0) - Query language
- **@graphql-codegen/cli** - Type generation for GraphQL operations
- **@shopify/hydrogen-codegen** - Hydrogen-specific codegen
- Two separate GraphQL projects: Storefront API (default) and Customer Account API

### Development & Quality
- **ESLint** (9.18.0) - Linting with TypeScript, React, and a11y plugins
- **Prettier** (@shopify/prettier-config) - Code formatting
- **@total-typescript/ts-reset** - Enhanced TypeScript types

### Runtime
- **Node.js** >= 18.0.0
- **Shopify Oxygen** (Cloudflare Workers) - Production deployment target

## Project Conventions

### Code Style

**Formatting:**
- Uses `@shopify/prettier-config` for consistent formatting
- Run `npm run lint` to check code style
- Prettier runs automatically on save (if configured in IDE)

**Naming Conventions:**
- Files: kebab-case for routes (e.g., `product-detail.tsx`), PascalCase for components
- Routes: Follow React Router v7 conventions:
  - `_index.tsx` = index route
  - `$param.tsx` = dynamic segment
  - `_` prefix = pathless layout route
  - `[file.ext].tsx` = resource route (non-UI)
- GraphQL: SCREAMING_SNAKE_CASE for queries/mutations/fragments
- TypeScript: PascalCase for types/interfaces, camelCase for functions/variables

**Import Patterns:**
- **CRITICAL:** Always use `react-router` imports, NEVER `@remix-run/*` or `react-router-dom`
- Use path alias `~/` for `app/` directory (configured via vite-tsconfig-paths)
- Organize imports: external deps, internal modules, types, styles

### Architecture Patterns

**1. Context-Driven Architecture**
- Hydrogen context system provides Storefront API, Customer Account API, Cart, and Session
- Context created in [lib/context.ts](app/lib/context.ts) and available in all loaders/actions via `args.context`
- Extend context via `HydrogenAdditionalContext` interface for custom properties (CMS clients, 3P SDKs)

**2. Type-Safe Routing**
- Use generated route types: `import type { Route } from './+types/route-name';`
- Type loader args: `loader(args: Route.LoaderArgs)`
- Type action args: `action(args: Route.ActionArgs)`
- Type meta functions: `meta: Route.MetaFunction = ({ data }) => { }`

**3. Data Loading Strategy**
- **Critical vs Deferred pattern** (see [root.tsx](app/root.tsx)):
  - Critical: Above-the-fold data, must complete before render (await)
  - Deferred: Below-the-fold data, loads after paint (return promises, catch errors)
- Use appropriate Storefront API cache strategies: `CacheLong()`, `CacheShort()`, `CacheNone()`, `CacheCustom()`
- Implement `shouldRevalidate` in root loader to prevent unnecessary refetches

**4. GraphQL Fragments**
- Define reusable fragments in [lib/fragments.ts](app/lib/fragments.ts)
- Use fragments consistently across queries (e.g., `CART_QUERY_FRAGMENT`, `HEADER_QUERY`, `FOOTER_QUERY`)
- Ensure fragments match their GraphQL project (Storefront vs Customer Account)

**5. Component Patterns**
- Prefer server components (default) over client components
- Use client components only when needed (interactivity, browser APIs, React hooks)
- Co-locate component-specific queries near component definitions
- Keep components focused and composable

**6. Performance Optimization**
- Minimize server response time through parallel data fetching
- Use Hydrogen's built-in caching for Storefront API queries
- Implement code splitting for large routes
- Optimize images and assets for web delivery

### Testing Strategy

**Current State:**
- No test framework currently configured
- Type safety via TypeScript provides compile-time guarantees
- ESLint catches common issues and anti-patterns

**Future Testing Approach (when implemented):**
- Unit tests: Component logic and utility functions
- Integration tests: Route loaders/actions with mocked context
- E2E tests: Critical user flows (product browsing, cart, checkout)
- GraphQL query testing: Validate query structure and types

### Git Workflow

**Branch Strategy:**
- `main` - Production-ready code, deployed to Oxygen
- Feature branches: Descriptive names (e.g., `add-wishlist`, `fix-cart-bug`)
- Use `main-claude` or similar for AI-assisted development work

**Commit Conventions:**
- Use descriptive commit messages
- Structure: `<type>: <description>` (e.g., `feat: add product recommendations`)
- Types: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`

**Pull Request Process:**
- Create feature branch from `main`
- Make focused, reviewable changes
- Run `npm run typecheck` and `npm run lint` before committing
- Use PR descriptions to explain why and what changed
- Squash merge to `main` for clean history

## Domain Context

**E-Commerce Domain:**
- **Products:** Catalog items with variants, options, images, prices
- **Collections:** Curated groups of products
- **Cart:** Session-based shopping cart (managed by Hydrogen)
- **Checkout:** Shopify-hosted checkout experience
- **Customer Accounts:** Authentication and order history
- **Storefront:** Public-facing shop pages

**Shopify Concepts:**
- **Handles:** URL-safe identifiers (e.g., `blue-t-shirt`)
- **GraphQL IDs:** Global identifiers (e.g., `gid://shopify/Product/123`)
- **Variants:** Product variations (size, color, etc.)
- **Metafields:** Custom data fields on Shopify resources
- **Liquid:** Shopify's template language (not used in Hydrogen, but merchants may reference it)

## Important Constraints

**Technical Constraints:**
- **React Router v7 only** - No Remix imports allowed; this is a hard requirement
- **Node.js >= 18.0.0** - Required for development and build
- **Cloudflare Workers runtime** - Oxygen deployment limits (1MB bundle size, no Node.js APIs)
- **SSR-first** - All routes are server-rendered by default
- **GraphQL only** - No REST API; all Shopify data via GraphQL

**Performance Constraints:**
- Minimize Time to First Byte (TTFB) through efficient loaders
- Keep bundle size small for fast hydration
- Cache aggressively with appropriate strategies
- Minimize client-side JavaScript for Core Web Vitals

**Security Constraints:**
- Environment variables for secrets (never commit `.env`)
- Content Security Policy (CSP) enforced in production
- Secure session management via Hydrogen utilities
- HTTPS required for Customer Account API

**Business Constraints:**
- Must work with Shopify's checkout (cannot customize checkout fully)
- Storefront API rate limits apply
- Merchant configuration in Shopify Admin affects storefront behavior

## External Dependencies

**Shopify Services:**
- **Storefront API** - Product catalog, collections, cart operations
  - Access via `context.storefront` in loaders/actions
  - Configured with `PUBLIC_STOREFRONT_API_TOKEN` and `PUBLIC_STORE_DOMAIN`
- **Customer Account API** - Customer authentication, order history
  - Access via `context.customerAccount` in loaders/actions
  - Requires public domain for local development
- **Shopify Admin** - Merchant configuration (products, settings, themes)
- **Checkout** - Shopify-hosted checkout flow at `PUBLIC_CHECKOUT_DOMAIN`

**Development Services:**
- **Shopify CLI** - Project scaffolding, dev server, deployment
- **Mini Oxygen** - Local Oxygen emulator for development
- **GraphQL Code Generator** - Type generation from GraphQL schemas

**Build & Deploy:**
- **Vite** - Bundling, HMR, SSR
- **Oxygen** - Cloudflare Workers-based hosting platform
- **NPM Registry** - Package management

## Development Workflow

**Starting Development:**
```bash
npm run dev          # Start dev server with codegen
npm run typecheck    # Generate types and check TypeScript
npm run lint         # Check code style
```

**Building for Production:**
```bash
npm run build        # Production build with codegen
npm run preview      # Preview production build locally
```

**Code Generation:**
```bash
npm run codegen      # Generate GraphQL types and React Router types
```

**Key Files:**
- [vite.config.ts](vite.config.ts) - Vite configuration with Hydrogen plugins
- [app/routes.ts](app/routes.ts) - Route configuration
- [app/root.tsx](app/root.tsx) - Root layout and global data
- [lib/context.ts](app/lib/context.ts) - Hydrogen context setup
- [lib/fragments.ts](app/lib/fragments.ts) - GraphQL fragments
- [.graphqlrc.ts](.graphqlrc.ts) - GraphQL codegen configuration
- [CLAUDE.md](CLAUDE.md) - AI assistant instructions

## OpenSpec Guidelines

**When to Create Proposals:**
- New features (wishlists, recommendations, search)
- Breaking changes (API changes, schema changes)
- Architecture changes (new patterns, refactoring)
- Performance optimizations (behavior changes)
- Security enhancements (authentication, authorization)

**Skip Proposals For:**
- Bug fixes (restoring intended behavior)
- Typos, formatting, comments
- Dependency updates (non-breaking)
- Configuration changes
- Tests for existing behavior

**Capability Naming:**
- Use verb-noun format: `product-catalog`, `user-auth`, `cart-management`
- Keep capabilities focused (10-minute understandability rule)
- Split if description needs "AND"

**Implementation Principles:**
- Favor straightforward, minimal implementations first
- Add complexity only when clearly required
- Keep changes tightly scoped to the requested outcome
- Validate with `openspec validate <id> --strict` before implementation
