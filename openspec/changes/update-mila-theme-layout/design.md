# Design Document: Mila Theme Implementation

## Context

The Shopify Hydrogen storefront currently uses a minimal skeleton theme. We're implementing the Mila theme design from Figma to create a polished, branded e-commerce experience. The design includes comprehensive desktop (1400px) and mobile (375px) layouts with a sophisticated color system, typography hierarchy, and reusable component patterns.

**Stakeholders:**
- Frontend developers implementing the theme
- Designers maintaining visual consistency
- End users expecting modern e-commerce UX

**Constraints:**
- Must maintain React Router v7 patterns (no Remix imports)
- Must work within Oxygen (Cloudflare Workers) runtime constraints
- Must preserve existing Hydrogen data loading patterns
- Must support server-side rendering (SSR)
- Must maintain existing functionality (cart, wishlist, search, customer account)

## Goals / Non-Goals

**Goals:**
- Implement complete Mila visual design from Figma template
- Integrate shadcn-ui for consistent, accessible component library
- Create responsive layouts that match desktop and mobile designs
- Establish design system with reusable tokens (colors, spacing, typography)
- Enhance user experience with proper visual hierarchy and interactions

**Non-Goals:**
- Not changing data fetching or GraphQL queries (unless required for new UI features)
- Not modifying Hydrogen context or session management
- Not adding new e-commerce functionality (this is purely visual/UX)
- Not replacing Tailwind CSS (we're extending it with theme tokens)
- Not changing deployment or build processes

## Decisions

### 1. Agent-Driven Design Workflow

**Decision:** Delegate design implementation to specialized `ui-designer` agent with MCP tool access

**Rationale:**
- ui-designer agent has specialized expertise in visual design, design systems, and accessibility
- Agent has direct access to Figma MCP (`mcp__Framelink_Figma_MCP`) for extracting design tokens and assets
- Agent has access to shadcn-ui MCP (`mcp__shadcn-ui`) for fetching optimized component implementations
- Agent has access to Playwright MCP (`mcp__playwright`) for automated UI/UX verification
- Parallel task execution allows faster implementation with specialized focus
- Consistent design decisions through single specialized agent
- Agent can leverage design principles, accessibility standards, and visual hierarchy expertise

**Agent Workflow:**
1. **Design Analysis Phase:**
   - ui-designer agent fetches Figma design data via `mcp__Framelink_Figma_MCP__get_figma_data`
   - Extract design tokens (colors, spacing, typography) from Figma
   - Analyze component structure and layout patterns

2. **Component Sourcing Phase:**
   - ui-designer agent retrieves shadcn-ui components via `mcp__shadcn-ui__get_component`
   - Review component demos via `mcp__shadcn-ui__get_component_demo`
   - Select appropriate components for each UI pattern

3. **Implementation Phase:**
   - ui-designer agent customizes components with Mila theme design tokens
   - Create layout primitives (Section, Container, Grid)
   - Build page-specific sections and compositions

4. **Verification Phase:**
   - ui-designer agent uses Playwright MCP to validate UI/UX
   - Test responsive behavior across viewports via `mcp__playwright__browser_resize`
   - Verify interactions via `mcp__playwright__browser_click`, `mcp__playwright__browser_type`
   - Capture visual snapshots via `mcp__playwright__browser_snapshot`
   - Validate accessibility via browser snapshot accessibility tree

**MCP Tools Available:**
- **Figma MCP:** `get_figma_data`, `download_figma_images`
- **shadcn-ui MCP:** `list_components`, `get_component`, `get_component_demo`, `get_component_metadata`
- **Playwright MCP:** `browser_navigate`, `browser_snapshot`, `browser_click`, `browser_type`, `browser_resize`, `browser_take_screenshot`, `browser_evaluate`, `browser_console_messages`

**Alternatives considered:**
- Manual implementation by developer → Slower, less design expertise, no automated verification
- No agent delegation → Misses optimization opportunity for parallel work and specialized skills
- Sequential implementation without verification → Higher risk of UI/UX issues found late

### 2. Component Library Integration Strategy

**Decision:** Use shadcn-ui components via MCP, copy source into `app/components/ui/`

**Rationale:**
- shadcn-ui provides accessible, well-tested components
- Copying source allows customization for Mila theme
- No additional runtime dependencies (components are source code, not npm package)
- Works seamlessly with Tailwind CSS v4
- MCP integration makes fetching components easy

**Alternatives considered:**
- Build all components from scratch → Too time-consuming, reinventing the wheel
- Use Hydrogen's built-in components → Too limited, doesn't match Figma design
- Use headless UI library like Radix directly → shadcn-ui already wraps Radix with good defaults

### 2. Design Token Management

**Decision:** Define design tokens in Tailwind CSS v4 config using CSS custom properties

**Approach:**
```css
@theme {
  --color-mila-primary: #E8E4DF;
  --color-gray-800: #212121;
  --color-overlay-300: rgba(0, 0, 0, 0.3);

  --spacing-section-mobile: 50px;
  --spacing-section-desktop: 90px;

  --max-width-desktop: 1400px;
  --max-width-mobile: 375px;
}
```

**Rationale:**
- Tailwind v4 has first-class CSS custom property support
- Easy to reference in components: `bg-[--color-mila-primary]` or via extended theme
- Matches Figma design token structure
- Easy to maintain and update
- No build-time complexity

**Alternatives considered:**
- JavaScript theme configuration → Less flexible, harder to hot-reload
- Hardcode values in components → Not maintainable, violates DRY principle

### 3. Layout Structure Pattern

**Decision:** Create layout composition components for common patterns

**Pattern:**
```tsx
<Section variant="default" padding="desktop">
  <Container maxWidth="desktop">
    <Grid columns={3} gap="lg">
      {/* Content */}
    </Grid>
  </Container>
</Section>
```

**Rationale:**
- Matches Figma's Frame structure and layout modes
- Provides consistent spacing and responsive behavior
- Easy to reason about and maintain
- Reduces duplication across route files

**Alternatives considered:**
- Inline Tailwind classes everywhere → Hard to maintain, inconsistent
- One giant Layout component with all variants → Too complex, hard to compose
- CSS Grid/Flexbox utilities only → Missing semantic meaning, harder to refactor

### 4. Image Asset Management

**Decision:** Keep images in Shopify CDN where possible, add critical brand assets to `app/assets/`

**Approach:**
- Product images: Already in Shopify, use existing URLs
- Background images from Figma: Export and add to `app/assets/images/`
- Icons: Use shadcn-ui's recommended icon library (lucide-react)
- Logo: Add to `app/assets/` as SVG

**Rationale:**
- Shopify CDN handles product images with optimization
- Critical assets (backgrounds, logo) should be in repo for SSR
- SVGs for icons provide scalability and performance
- Avoids large binary files in Git history

**Alternatives considered:**
- All images in repo → Too large, slow Git operations
- All images in external CDN → Adds complexity, latency
- Use Figma API for images → Unnecessary runtime dependency

### 5. Mobile vs Desktop Layout Strategy

**Decision:** Use responsive utilities with breakpoints, share components between viewports

**Approach:**
```tsx
<div className="flex flex-col gap-8 md:flex-row md:gap-20">
  {/* Adapts between mobile and desktop */}
</div>
```

**Rationale:**
- Single codebase for both viewports reduces duplication
- Tailwind's responsive utilities are well-suited for this
- Matches Figma's approach (separate mobile/desktop frames, but shared components)
- Better maintainability than separate mobile/desktop route files

**Alternatives considered:**
- Separate route files for mobile/desktop → Too much duplication
- Client-side detection → Breaks SSR, causes layout shift
- CSS media queries only → Less flexible than Tailwind utilities

### 6. Component Migration Strategy

**Decision:** Migrate components incrementally, starting with layout primitives, then page-specific components

**Order:**
1. Design tokens and theme setup
2. shadcn-ui base components (Button, Card, etc.)
3. Layout components (Section, Container, Grid)
4. Header and Footer
5. Page-specific sections (Banner, ProductCard, etc.)
6. Route pages (landing, product details, collection, cart)

**Rationale:**
- Bottom-up approach ensures foundation is solid
- Can test each layer independently
- Reduces risk of breaking changes
- Provides value incrementally (each step improves the design)

## Risks / Trade-offs

### Risk: Figma Design Not Fully Specified
**Mitigation:**
- Document assumptions in spec scenarios
- Create design review checklist
- Get stakeholder approval on ambiguous patterns before implementation

### Risk: Performance Impact from New Components
**Mitigation:**
- Use React Server Components by default
- Lazy load client components
- Monitor bundle size during implementation
- Keep client JavaScript minimal

### Risk: Accessibility Regression
**Mitigation:**
- shadcn-ui components are built on Radix (accessible by default)
- Add semantic HTML structure
- Test with keyboard navigation and screen readers
- Add ARIA labels where needed

### Risk: Breaking Existing Functionality
**Mitigation:**
- Maintain existing component APIs where possible
- Test cart, search, wishlist, authentication flows
- Run typecheck and lint before each commit
- Keep data loading patterns unchanged

### Trade-off: Design System Complexity
- **Pro:** Comprehensive design system ensures consistency
- **Con:** More files and abstractions to learn
- **Mitigation:** Document patterns clearly, provide examples, keep it simple

### Trade-off: CSS Custom Properties vs Tailwind JIT
- **Pro:** CSS variables are flexible and runtime-dynamic
- **Con:** Slightly less type-safe than Tailwind config
- **Mitigation:** Use TypeScript for component props, validate in development

## Migration Plan

### Phase 1: Foundation (Week 1) - Agent-Led

**Primary Agent:** ui-designer

**Tasks:**
1. Delegate to ui-designer: Analyze Figma design and extract design tokens
   - Use Figma MCP to fetch design data
   - Extract colors, spacing, typography, shadows from Figma
   - Document design token structure

2. Delegate to ui-designer: Set up shadcn-ui component structure
   - Use shadcn-ui MCP to list and fetch base components
   - Create `app/components/ui/` directory structure
   - Install lucide-react icon library

3. Delegate to ui-designer: Define design tokens in Tailwind config
   - Create CSS custom properties in `app/styles/tailwind.css`
   - Map Figma tokens to Tailwind theme
   - Test token application

4. Delegate to ui-designer: Create layout primitives
   - Design Section, Container, Grid components
   - Implement responsive behavior
   - Verify with Playwright MCP (test different viewports)

**Verification:**
- Run Playwright tests for layout primitives
- Visual snapshot comparison
- Run typecheck and lint

### Phase 2: Core Components (Week 1-2) - Agent-Led

**Primary Agent:** ui-designer

**Tasks:**
1. Delegate to ui-designer: Migrate Header component
   - Extract header design from Figma
   - Fetch Navigation Menu component from shadcn-ui
   - Implement desktop and mobile variants
   - Verify with Playwright (test navigation interactions)

2. Delegate to ui-designer: Migrate Footer component
   - Extract footer design from Figma
   - Implement multi-column layout
   - Test responsive behavior with Playwright

3. Delegate to ui-designer: Update PageLayout
   - Integrate Sheet/Dialog components from shadcn-ui
   - Update aside components (cart, search, mobile menu)
   - Verify overlays and backdrop behavior with Playwright

4. Delegate to ui-designer: Add Announcement Bar
   - Extract design from Figma
   - Implement scrolling animation (if needed)
   - Test dismissal functionality with Playwright

**Verification:**
- Playwright tests for all interactive elements
- Accessibility tree validation
- Console error checking

### Phase 3: Product UI (Week 2) - Agent-Led

**Primary Agent:** ui-designer

**Tasks:**
1. Delegate to ui-designer: Update ProductCard component
   - Fetch Card component from shadcn-ui
   - Extract product card design from Figma
   - Implement hover states
   - Verify with Playwright (test hover interactions)

2. Delegate to ui-designer: Update ProductForm and ProductImage
   - Fetch Button, Carousel components from shadcn-ui
   - Implement variant selector styling
   - Add image gallery
   - Test with Playwright (test form interactions, carousel swipes)

3. Delegate to ui-designer: Implement product page layout
   - Extract layout from Figma product detail page
   - Implement two-column responsive layout
   - Verify with Playwright (test responsive breakpoints)

4. Delegate to ui-designer: Add image galleries and overlays
   - Implement image zoom/lightbox (if in Figma)
   - Test touch gestures with Playwright

**Verification:**
- Playwright tests for product interactions
- Visual regression testing
- Performance validation

### Phase 4: Pages (Week 2-3) - Agent-Led

**Primary Agent:** ui-designer

**Tasks:**
1. Delegate to ui-designer: Landing page sections
   - Extract all landing page sections from Figma
   - Implement BannerSection, ProductGridSection, etc.
   - Verify section spacing and responsive behavior with Playwright

2. Delegate to ui-designer: Collection page
   - Extract collection page design from Figma
   - Implement filter sidebar and product grid
   - Test filtering interactions with Playwright

3. Delegate to ui-designer: Cart page
   - Extract cart page design from Figma
   - Update cart item styling
   - Test quantity updates and removal with Playwright

4. Delegate to ui-designer: Search and menu overlays
   - Fetch Dialog component from shadcn-ui
   - Implement search overlay design
   - Test overlay interactions with Playwright

**Verification:**
- End-to-end Playwright tests for all pages
- Cross-browser testing
- Mobile device testing

### Phase 5: Polish (Week 3) - Agent-Led

**Primary Agent:** ui-designer

**Tasks:**
1. Delegate to ui-designer: Mobile responsive refinements
   - Test all pages at mobile viewport (375px) with Playwright
   - Fix responsive issues found
   - Verify touch targets meet accessibility standards

2. Delegate to ui-designer: Hover states and animations
   - Implement micro-interactions from Figma
   - Test animation performance with Playwright
   - Ensure respect for reduced-motion preferences

3. Delegate to ui-designer: Loading states and skeletons
   - Design skeleton screens for product grids
   - Implement loading spinners
   - Test async loading states with Playwright

4. Delegate to ui-designer: Accessibility audit
   - Run Playwright accessibility tests
   - Verify keyboard navigation
   - Check color contrast ratios
   - Validate ARIA labels

**Verification:**
- Comprehensive Playwright test suite
- Lighthouse performance audit
- Accessibility compliance report (WCAG 2.1 AA)

**Rollback Strategy:**
- Each phase is a separate commit/PR
- Can revert to previous phase if issues arise
- Git tags for stable checkpoints
- Feature flags not needed (this is visual only)
- Playwright test snapshots for visual regression detection

## Open Questions

1. **Image Format:** Should we use WebP/AVIF for backgrounds, or stick with JPEG/PNG for compatibility?
   - *Recommendation:* Use modern formats with fallbacks

2. **Typography:** Should we load custom fonts (Google Fonts) or use system fonts?
   - *Recommendation:* Review Figma for font choices, prefer system fonts for performance

3. **Animation Library:** Do we need animations beyond CSS transitions?
   - *Recommendation:* Start with CSS, add Framer Motion only if complex animations needed

4. **Dark Mode:** Should we implement dark mode now or later?
   - *Recommendation:* Out of scope for this change, add in future proposal

5. **Component Storybook:** Should we set up Storybook for component development?
   - *Recommendation:* Out of scope for this change, but would be valuable future addition
