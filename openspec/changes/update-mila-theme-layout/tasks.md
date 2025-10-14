# Implementation Tasks

## Agent Delegation Overview

This implementation leverages the **ui-designer** agent with MCP tools for:
- **Figma MCP**: Extract design tokens, layouts, and download assets
- **shadcn-ui MCP**: Fetch optimized UI components
- **Playwright MCP**: Automated UI/UX testing and visual verification

**Primary Agent**: ui-designer (for all design-related tasks)

---

## 1. Setup and Foundation (Delegate to ui-designer agent)

### 1.0 Agent Initialization
- [ ] 1.0.1 **DELEGATE TO ui-designer:** Analyze Figma design file
  - Use `mcp__Framelink_Figma_MCP__get_figma_data` with fileKey `NIG3x0ZWMvR6TlK3pG8yj1`
  - Extract globalVars (colors, spacing, typography)
  - Document design system structure

### 1.1 Design Token Extraction (Agent-Led)
- [ ] 1.1.1 **DELEGATE TO ui-designer:** Extract color tokens from Figma
  - Mila primary color (#E8E4DF)
  - Grayscale palette
  - Overlay colors (rgba values)
  - Semantic colors (success, error, warning)
- [ ] 1.1.2 **DELEGATE TO ui-designer:** Extract spacing tokens from Figma
  - Section padding (mobile: 50px, desktop: 90px)
  - Component gaps and margins
  - Container max-widths
- [ ] 1.1.3 **DELEGATE TO ui-designer:** Extract typography tokens from Figma
  - Heading scales (H1-H5)
  - Body text sizes
  - Font weights and line heights
  - Letter spacing
- [ ] 1.1.4 **DELEGATE TO ui-designer:** Extract shadow and border radius tokens
  - Elevation system (shadow scale)
  - Border radius scale (sm, md, lg, xl, full)

### 1.2 Environment Setup
- [ ] 1.2.1 Install lucide-react for icon library: `npm install lucide-react`
- [ ] 1.2.2 Create `app/components/ui/` directory structure
- [ ] 1.2.3 Create `app/components/layout/` directory structure
- [ ] 1.2.4 Create `app/assets/images/` directory for Figma assets

### 1.3 Design Token Implementation (Agent-Led)
- [ ] 1.3.1 **DELEGATE TO ui-designer:** Create Tailwind CSS custom properties
  - Write design tokens to `app/styles/tailwind.css`
  - Use `@theme` directive for Tailwind v4
  - Map Figma tokens to CSS custom properties
- [ ] 1.3.2 **DELEGATE TO ui-designer:** Update global styles
  - Base typography styles in `app/styles/app.css`
  - Link styles and focus states
  - Reset overrides if needed

### 1.4 Figma Asset Download (Agent-Led)
- [ ] 1.4.1 **DELEGATE TO ui-designer:** Download image assets from Figma
  - Use `mcp__Framelink_Figma_MCP__download_figma_images`
  - Download hero banner backgrounds
  - Download category showcase images
  - Download section backgrounds (vision, magazine, subscription)
  - Download logo (SVG format preferred)
  - Place all images in `app/assets/images/`
- [ ] 1.4.2 **DELEGATE TO ui-designer:** Optimize images for web
  - Convert to WebP/AVIF with fallbacks
  - Compress images appropriately
  - Generate responsive image sizes

### 1.5 Verification
- [ ] 1.5.1 Run `npm run typecheck` to ensure no type errors
- [ ] 1.5.2 Run `npm run lint` to check code style
- [ ] 1.5.3 Verify design tokens are accessible in components

---

## 2. Install shadcn-ui Base Components (Delegate to ui-designer agent)

### 2.0 Component Discovery (Agent-Led)
- [ ] 2.0.1 **DELEGATE TO ui-designer:** List available shadcn-ui components
  - Use `mcp__shadcn-ui__list_components`
  - Identify components needed for Mila theme

### 2.1 Core Component Installation (Agent-Led)
- [ ] 2.1.1 **DELEGATE TO ui-designer:** Fetch Button component
  - Use `mcp__shadcn-ui__get_component` with componentName "button"
  - Review demo via `mcp__shadcn-ui__get_component_demo`
  - Place in `app/components/ui/button.tsx`
  - Customize with Mila theme colors
- [ ] 2.1.2 **DELEGATE TO ui-designer:** Fetch Card component
  - Use `mcp__shadcn-ui__get_component` with componentName "card"
  - Place in `app/components/ui/card.tsx`
  - Customize for product cards
- [ ] 2.1.3 **DELEGATE TO ui-designer:** Fetch Sheet component
  - Use `mcp__shadcn-ui__get_component` with componentName "sheet"
  - Place in `app/components/ui/sheet.tsx`
  - For mobile drawers (cart, menu)
- [ ] 2.1.4 **DELEGATE TO ui-designer:** Fetch Dialog component
  - Use `mcp__shadcn-ui__get_component` with componentName "dialog"
  - Place in `app/components/ui/dialog.tsx`
  - For desktop modals (search)
- [ ] 2.1.5 **DELEGATE TO ui-designer:** Fetch Accordion component
  - Use `mcp__shadcn-ui__get_component` with componentName "accordion"
  - Place in `app/components/ui/accordion.tsx`
  - For FAQ sections
- [ ] 2.1.6 **DELEGATE TO ui-designer:** Fetch Badge component
  - Use `mcp__shadcn-ui__get_component` with componentName "badge"
  - Place in `app/components/ui/badge.tsx`
  - For cart/wishlist counters
- [ ] 2.1.7 **DELEGATE TO ui-designer:** Fetch Navigation Menu component
  - Use `mcp__shadcn-ui__get_component` with componentName "navigation-menu"
  - Place in `app/components/ui/navigation-menu.tsx`
  - For header navigation
- [ ] 2.1.8 **DELEGATE TO ui-designer:** Fetch Carousel component
  - Use `mcp__shadcn-ui__get_component` with componentName "carousel"
  - Place in `app/components/ui/carousel.tsx`
  - For product image galleries
- [ ] 2.1.9 **DELEGATE TO ui-designer:** Fetch additional components
  - Separator component
  - Input component
  - Other components as needed

### 2.2 Component Testing with Playwright (Agent-Led)
- [ ] 2.2.1 **DELEGATE TO ui-designer:** Test Button component
  - Start dev server: `npm run dev`
  - Use `mcp__playwright__browser_navigate` to component page
  - Test button click via `mcp__playwright__browser_click`
  - Verify hover states via `mcp__playwright__browser_hover`
  - Capture snapshot via `mcp__playwright__browser_snapshot`
- [ ] 2.2.2 **DELEGATE TO ui-designer:** Test interactive components
  - Test Dialog open/close
  - Test Sheet slide behavior
  - Test Accordion expand/collapse
  - Verify keyboard navigation via `mcp__playwright__browser_press_key`

---

## 3. Create Layout Primitive Components (Delegate to ui-designer agent)

**Note:** All remaining tasks (3-28) should be delegated to the ui-designer agent following the same pattern as sections 1-2. The agent will use Figma MCP to extract designs, shadcn-ui MCP to source components, and Playwright MCP to verify implementations.

- [ ] 3.1 **DELEGATE TO ui-designer:** Create `app/components/layout/Section.tsx`:
  - Props: variant (default, branded, image-background), padding (mobile, desktop, none)
  - Apply appropriate spacing based on props
  - Support full-width or constrained layouts
- [ ] 3.2 Create `app/components/layout/Container.tsx`:
  - Props: maxWidth (mobile, desktop, full)
  - Center content horizontally
  - Apply responsive padding
- [ ] 3.3 Create `app/components/layout/Grid.tsx`:
  - Props: columns (1, 2, 3, 4), gap (sm, md, lg, xl)
  - Responsive columns based on viewport
  - Use CSS Grid with gap spacing
- [ ] 3.4 Test layout primitives compose correctly together
- [ ] 3.5 Document layout primitive usage with examples

## 4. Update Header Component

- [ ] 4.1 Read existing `app/components/Header.tsx` to understand current structure
- [ ] 4.2 Update Header for desktop viewport:
  - Logo on left
  - Navigation Menu in center (horizontal)
  - Icons on right (search, wishlist with badge, account, cart with badge)
  - White background with subtle border
  - Hover states on navigation items
- [ ] 4.3 Update Header for mobile viewport:
  - Hamburger menu icon on left
  - Logo in center
  - Search and cart icons on right
  - Compact height (84px)
- [ ] 4.4 Integrate Navigation Menu component for desktop nav
- [ ] 4.5 Add Badge component to wishlist and cart icons for counts
- [ ] 4.6 Test header responsiveness (desktop → mobile)
- [ ] 4.7 Test navigation menu interactions (hover, keyboard navigation)

## 5. Update Footer Component

- [ ] 5.1 Read existing `app/components/Footer.tsx` to understand current structure
- [ ] 5.2 Update Footer for desktop viewport:
  - Multi-column layout (4 columns)
  - Column 1: Logo and tagline
  - Column 2: Shop navigation links
  - Column 3: Customer service links
  - Column 4: Social media icons and newsletter signup
  - Mila branding background color (#E8E4DF)
  - Copyright and legal links at bottom
- [ ] 5.3 Update Footer for mobile viewport:
  - Stack columns vertically
  - Maintain same content
  - Consistent branding background
- [ ] 5.4 Test footer responsiveness
- [ ] 5.5 Test all footer links are functional

## 6. Create Announcement Bar Component

- [ ] 6.1 Create `app/components/AnnouncementBar.tsx`:
  - Centered text content
  - Mila branding background or contrasting color
  - Optional scrolling text animation
  - Dismissible option (with localStorage persistence)
- [ ] 6.2 Integrate AnnouncementBar into `app/components/PageLayout.tsx` (optional, above header)
- [ ] 6.3 Test announcement bar displays correctly
- [ ] 6.4 Test dismissal functionality (if implemented)

## 7. Update PageLayout Component

- [ ] 7.1 Read existing `app/components/PageLayout.tsx` to understand current structure
- [ ] 7.2 Update aside components to use Sheet/Dialog from shadcn-ui:
  - CartAside: Use Sheet for mobile, Dialog for desktop (optional)
  - SearchAside: Use Dialog with proper styling
  - MobileMenuAside: Use Sheet from left side
- [ ] 7.3 Update PageLayout structure with new components
- [ ] 7.4 Test cart aside opens/closes correctly
- [ ] 7.5 Test search aside opens/closes correctly
- [ ] 7.6 Test mobile menu aside opens/closes correctly
- [ ] 7.7 Verify backdrop overlays work on all asides

## 8. Update Product Components

- [ ] 8.1 Update `app/components/ProductItem.tsx` (product card):
  - Use Card component from shadcn-ui
  - Product image with proper aspect ratio
  - Image overlay effect (if in design)
  - Product title and price with typography styles
  - Hover state with elevation or overlay
  - Link to product detail page
- [ ] 8.2 Update `app/components/ProductImage.tsx`:
  - Support Carousel component for galleries
  - Lazy loading for images
  - Placeholder/skeleton during load
  - Proper aspect ratio and object-fit
- [ ] 8.3 Update `app/components/ProductForm.tsx`:
  - Use Button component from shadcn-ui
  - Variant selector styling
  - Quantity selector styling
  - Add to cart button with loading state
- [ ] 8.4 Update `app/components/ProductPrice.tsx`:
  - Typography styles for price display
  - Sale price handling (strikethrough regular price)
  - Badge for sale/discount
- [ ] 8.5 Test all product components render correctly
- [ ] 8.6 Test product card hover states
- [ ] 8.7 Test add to cart functionality still works

## 9. Create Banner Section Component

- [ ] 9.1 Create `app/components/sections/BannerSection.tsx`:
  - Full-width or constrained layout
  - Background image with overlay
  - Centered content (title, subtitle, CTA button)
  - Responsive height (800px desktop, 510px mobile)
  - Use Button component for CTA
- [ ] 9.2 Test banner section with different images
- [ ] 9.3 Test text remains readable over images
- [ ] 9.4 Test responsive behavior (desktop → mobile)

## 10. Create Product Grid Section Component

- [ ] 10.1 Create `app/components/sections/ProductGridSection.tsx`:
  - Section heading
  - Grid layout using Grid component (3 columns desktop, 1 column mobile)
  - ProductItem cards
  - Optional "View All" CTA
- [ ] 10.2 Test product grid section renders correctly
- [ ] 10.3 Test grid adapts responsively

## 11. Create Category Showcase Section Component

- [ ] 11.1 Create `app/components/sections/CategoryShowcase.tsx`:
  - 4-column grid on desktop (2 columns mobile)
  - Each category: image with text overlay
  - Hover effect on categories
  - Link to collection page
- [ ] 11.2 Test category showcase section renders correctly
- [ ] 11.3 Test hover effects
- [ ] 11.4 Test responsive behavior

## 12. Create Rich Text Content Section Component

- [ ] 12.1 Create `app/components/sections/RichTextSection.tsx`:
  - Centered content with max-width
  - Typography styles for headings and body text
  - Appropriate spacing between paragraphs
  - Support for embedded images
- [ ] 12.2 Test rich text section with various content
- [ ] 12.3 Test typography hierarchy

## 13. Create Feature Section Component

- [ ] 13.1 Create `app/components/sections/FeatureSection.tsx`:
  - Two-column layout (image + text, or text + image)
  - Responsive (stack vertically on mobile)
  - Typography styles for heading and body
  - Optional CTA button
- [ ] 13.2 Test feature section with different content
- [ ] 13.3 Test image/text ordering variations
- [ ] 13.4 Test responsive stacking

## 14. Create Scrolling Banner Component

- [ ] 14.1 Create `app/components/ScrollingBanner.tsx`:
  - Horizontal scrolling text animation
  - Repeating text pattern
  - CSS animation or JavaScript-based
  - Pause on hover (optional)
- [ ] 14.2 Test scrolling banner animation
- [ ] 14.3 Test performance (should be smooth)

## 15. Create FAQ Section Component

- [ ] 15.1 Create `app/components/sections/FAQSection.tsx`:
  - Section heading
  - Accordion component from shadcn-ui
  - FAQ question/answer pairs
  - Single or multiple expand mode
- [ ] 15.2 Test FAQ section renders correctly
- [ ] 15.3 Test accordion expand/collapse
- [ ] 15.4 Test keyboard navigation

## 16. Create Newsletter Subscription Component

- [ ] 16.1 Create `app/components/NewsletterSubscription.tsx`:
  - Banner with background image
  - Centered form (email input + submit button)
  - Typography styles for heading and subheading
  - Form validation
  - Success/error states
- [ ] 16.2 Integrate with email service or Shopify customer API
- [ ] 16.3 Test newsletter form submission
- [ ] 16.4 Test form validation and error handling

## 17. Update Landing Page Route

- [ ] 17.1 Read existing `app/routes/_index.tsx`
- [ ] 17.2 Update landing page with new section components:
  - Hero BannerSection
  - "Our Collection" ProductGridSection
  - CategoryShowcase
  - RichTextSection
  - Feature sections (The Elite Story, Lola Shimmer)
  - "Our Vision" BannerSection
  - "More for you" content
  - "Black Friday Sale" ProductGridSection
  - ScrollingBanner
  - Product section with sidebar (custom layout)
  - "From the Magazine" section
- [ ] 17.3 Ensure loader data provides all necessary content
- [ ] 17.4 Test landing page renders completely
- [ ] 17.5 Test all sections are properly spaced
- [ ] 17.6 Test responsive behavior across all sections

## 18. Update Product Detail Page Route

- [ ] 18.1 Read existing `app/routes/products.$handle.tsx`
- [ ] 18.2 Update product detail layout:
  - Two-column layout (gallery + info)
  - Product image Carousel (if multiple images)
  - ProductForm with updated styling
  - Product description with RichTextSection styling
  - Additional sections below (Sustainability, FAQ, etc.)
- [ ] 18.3 Ensure loader provides all necessary product data
- [ ] 18.4 Test product detail page renders correctly
- [ ] 18.5 Test variant selection updates images and price
- [ ] 18.6 Test add to cart functionality
- [ ] 18.7 Test responsive layout (two-column → stacked)

## 19. Update Collection Page Route

- [ ] 19.1 Read existing `app/routes/collections.$handle.tsx`
- [ ] 19.2 Update collection page layout:
  - Collection BannerSection at top
  - Collection title and description
  - Sidebar + Product grid layout on desktop
  - Filter/sort button + Product grid on mobile
  - Pagination or "Load More"
- [ ] 19.3 Ensure loader provides collection data and products
- [ ] 19.4 Test collection page renders correctly
- [ ] 19.5 Test filtering and sorting (if implemented)
- [ ] 19.6 Test pagination
- [ ] 19.7 Test responsive behavior

## 20. Update Cart Page Route

- [ ] 20.1 Read existing `app/routes/cart.tsx`
- [ ] 20.2 Update cart page layout:
  - Cart items list with updated styling
  - Cart summary with total and checkout button
  - "Our Collection" upsell ProductGridSection below
  - Footer
- [ ] 20.3 Test cart page renders correctly
- [ ] 20.4 Test cart item quantity updates
- [ ] 20.5 Test cart item removal
- [ ] 20.6 Test checkout button navigation
- [ ] 20.7 Test upsell section displays products

## 21. Update Search Functionality

- [ ] 21.1 Update `app/components/SearchFormPredictive.tsx` styling:
  - Use Input component from shadcn-ui
  - Proper search icon placement
  - Focus states
- [ ] 21.2 Update `app/components/SearchResultsPredictive.tsx` styling:
  - Use Card components for result items
  - Typography styles
  - Hover states on results
- [ ] 21.3 Update search Dialog/Sheet styling to match Mila theme
- [ ] 21.4 Test search form input
- [ ] 21.5 Test predictive search results display
- [ ] 21.6 Test search result navigation

## 22. Mobile Responsiveness Testing

- [ ] 22.1 Test all pages on mobile viewport (375px):
  - Landing page
  - Product detail page
  - Collection page
  - Cart page
  - Search overlay
- [ ] 22.2 Test header mobile menu opens and navigates correctly
- [ ] 22.3 Test cart drawer opens and functions on mobile
- [ ] 22.4 Test touch interactions (swipe, tap)
- [ ] 22.5 Test viewport meta tag is correct for mobile scaling
- [ ] 22.6 Fix any responsive issues found

## 23. Desktop Testing

- [ ] 23.1 Test all pages on desktop viewport (1400px):
  - Landing page
  - Product detail page
  - Collection page
  - Cart page
  - Search dialog
- [ ] 23.2 Test header navigation hover states
- [ ] 23.3 Test product card hover states
- [ ] 23.4 Test interactive elements (buttons, links, forms)
- [ ] 23.5 Fix any desktop-specific issues

## 24. Cross-Browser Testing

- [ ] 24.1 Test in Chrome/Edge (Chromium)
- [ ] 24.2 Test in Firefox
- [ ] 24.3 Test in Safari (macOS/iOS)
- [ ] 24.4 Fix any browser-specific issues

## 25. Accessibility Audit

- [ ] 25.1 Test keyboard navigation through all interactive elements
- [ ] 25.2 Test screen reader compatibility (NVDA, VoiceOver)
- [ ] 25.3 Verify color contrast ratios meet WCAG AA standards
- [ ] 25.4 Verify focus indicators are visible on all interactive elements
- [ ] 25.5 Verify images have appropriate alt text
- [ ] 25.6 Verify form inputs have associated labels
- [ ] 25.7 Verify ARIA labels on icon buttons
- [ ] 25.8 Fix any accessibility issues found

## 26. Performance Optimization

- [ ] 26.1 Run Lighthouse audit on key pages
- [ ] 26.2 Optimize images (compress, use WebP/AVIF, proper sizing)
- [ ] 26.3 Verify lazy loading on below-fold images
- [ ] 26.4 Check bundle size (should not significantly increase)
- [ ] 26.5 Test page load speed (Time to First Byte, Largest Contentful Paint)
- [ ] 26.6 Optimize any performance bottlenecks

## 27. Final Quality Assurance

- [ ] 27.1 Run `npm run typecheck` and fix any type errors
- [ ] 27.2 Run `npm run lint` and fix any linting errors
- [ ] 27.3 Review all components for code quality and consistency
- [ ] 27.4 Verify all Figma design elements are implemented
- [ ] 27.5 Verify no existing functionality is broken (cart, wishlist, account)
- [ ] 27.6 Test all user flows end-to-end:
  - Browse products → View product → Add to cart → Checkout
  - Search products → View results → Navigate to product
  - Create account → Login → View account
  - Add to wishlist → View wishlist
- [ ] 27.7 Document any deviations from Figma design with rationale

## 28. Documentation

- [ ] 28.1 Update README with Mila theme information (if applicable)
- [ ] 28.2 Document new component usage in code comments
- [ ] 28.3 Create component examples for common patterns
- [ ] 28.4 Update CLAUDE.md if new patterns or conventions established
