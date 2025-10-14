# Update Layout and Theme to Mila Design

## Why

The current Hydrogen storefront uses a minimal skeleton theme with basic styling. To create a more polished, visually appealing e-commerce experience that matches modern design standards, we need to implement the Mila theme design from Figma. This will provide:

- A cohesive, professional visual identity with proper branding colors
- Enhanced user experience with well-designed components and layouts
- Consistent design patterns across desktop and mobile viewports
- Improved accessibility and usability through shadcn-ui components

## What Changes

- **Integrate shadcn-ui component library** for consistent, accessible UI components (buttons, cards, navigation, dialogs, etc.)
- **Implement Mila theme design system** from Figma including:
  - Color palette (Mila branding color: `#E8E4DF`, grayscale, overlay colors)
  - Typography system (heading hierarchy, body text, spacing)
  - Layout patterns (desktop 1400px width, mobile 375px width, consistent padding/gaps)
  - Component styling (announcement bar, header, footer, product cards, banners)
- **Update layout structure** to match Figma template pages:
  - Desktop and mobile landing page layouts
  - Product detail page layout
  - Collection page layout
  - Cart page layout
  - Search and menu overlays
- **Enhance existing components** with new visual design:
  - Header with hover states and proper navigation
  - Footer with multi-column layout
  - Product cards with image overlays
  - Banner sections with background images
  - Scrolling announcement bar
- **Add new layout sections** from Figma:
  - Category showcase sections
  - Rich text content blocks
  - Magazine/blog sections
  - Subscription CTAs
  - FAQ accordions
  - Scrolling text banners

## Impact

**Affected specs:**
- `ui-components` - New shadcn-ui components and updated existing components
- `layout-system` - Page layout structure, responsive design patterns
- `visual-theme` - Color system, typography, spacing, visual design tokens

**Affected code:**
- [app/components/Header.tsx](app/components/Header.tsx) - Updated with Mila design
- [app/components/Footer.tsx](app/components/Footer.tsx) - Updated with Mila design
- [app/components/PageLayout.tsx](app/components/PageLayout.tsx) - Enhanced layout structure
- [app/styles/tailwind.css](app/styles/tailwind.css) - New design tokens and theme variables
- [app/styles/app.css](app/styles/app.css) - Additional custom styles for Mila theme
- [app/routes/_index.tsx](app/routes/_index.tsx) - Landing page layout matching Figma
- [app/routes/products.$handle.tsx](app/routes/products.$handle.tsx) - Product detail page layout
- [app/routes/collections.$handle.tsx](app/routes/collections.$handle.tsx) - Collection page layout
- [app/routes/cart.tsx](app/routes/cart.tsx) - Cart page layout
- New component files for shadcn-ui components under `app/components/ui/`

**Breaking changes:** None - this is a visual enhancement that maintains existing functionality and data flow

**Dependencies:**
- shadcn-ui components (to be installed via MCP)
- Figma assets (images, icons) may need to be exported and added to project
