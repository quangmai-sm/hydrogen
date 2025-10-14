# Visual Theme Specification

## ADDED Requirements

### Requirement: Agent-Driven Visual Theme Design
The system SHALL delegate visual theme design and implementation to the ui-designer agent with MCP tools for extracting design tokens and verifying visual consistency.

#### Scenario: Figma design token extraction
- **WHEN** implementing visual theme from Figma
- **THEN** the ui-designer agent SHALL use Figma MCP (`mcp__Framelink_Figma_MCP__get_figma_data`) to extract globalVars and styles
- **AND** the agent SHALL parse color variables from Figma (Mila branding color, grays, overlays)
- **AND** the agent SHALL extract spacing tokens (section padding, component gaps)
- **AND** the agent SHALL extract typography scales (font sizes, weights, line heights)
- **AND** the agent SHALL extract shadow definitions (elevation system)
- **AND** the agent SHALL export design tokens to Tailwind CSS custom properties

#### Scenario: Figma image asset download
- **WHEN** implementing visual theme with images
- **THEN** the ui-designer agent SHALL use Figma MCP (`mcp__Framelink_Figma_MCP__download_figma_images`) to download images
- **AND** the agent SHALL download background images for banners
- **AND** the agent SHALL download icons and logos (as SVG when possible)
- **AND** the agent SHALL optimize images for web delivery
- **AND** the agent SHALL place images in appropriate directories (`app/assets/images/`)

#### Scenario: Visual consistency verification with Playwright
- **WHEN** validating visual theme implementation
- **THEN** the ui-designer agent SHALL use Playwright MCP for visual testing
- **AND** the agent SHALL capture screenshots of themed pages via `mcp__playwright__browser_take_screenshot`
- **AND** the agent SHALL verify color application across components
- **AND** the agent SHALL verify typography rendering and hierarchy
- **AND** the agent SHALL verify spacing consistency using browser snapshots
- **AND** the agent SHALL test theme across different viewports (mobile, tablet, desktop)

#### Scenario: Accessibility verification with Playwright
- **WHEN** ensuring theme meets accessibility standards
- **THEN** the ui-designer agent SHALL use Playwright to verify accessibility
- **AND** the agent SHALL capture accessibility tree via `mcp__playwright__browser_snapshot`
- **AND** the agent SHALL verify color contrast ratios meet WCAG AA standards
- **AND** the agent SHALL test focus indicators visibility
- **AND** the agent SHALL evaluate color usage (`mcp__playwright__browser_evaluate`) for contrast checking

### Requirement: Mila Color System
The system SHALL implement the Mila color system with branded and functional colors.

#### Scenario: Primary brand color usage
- **WHEN** applying brand color in UI
- **THEN** the system SHALL use Mila primary color (#E8E4DF)
- **AND** the color SHALL be applied to:
  - Footer background
  - Accent sections and callouts
  - Button hover states (where appropriate)
  - Badge backgrounds for featured content

#### Scenario: Neutral color palette
- **WHEN** applying neutral colors in UI
- **THEN** the system SHALL use grayscale palette:
  - White (#FFFFFF) for primary backgrounds
  - Gray/800 (#212121) for primary text and borders
  - Gray/600, 400, 200 for secondary text and dividers
- **AND** colors SHALL provide adequate contrast ratios (WCAG AA minimum)

#### Scenario: Overlay colors
- **WHEN** displaying image overlays or backdrops
- **THEN** the system SHALL use overlay colors with opacity:
  - Overlay/300: rgba(0, 0, 0, 0.3) for dialog backdrops
  - Overlay/200: rgba(0, 0, 0, 0.2) for image overlays on banners
  - Overlay/100: rgba(0, 0, 0, 0.1) for subtle darkening effects

#### Scenario: Semantic colors
- **WHEN** displaying status or semantic information
- **THEN** the system SHALL use semantic colors:
  - Error/danger: Red tones for errors, remove buttons
  - Success: Green tones for success messages, stock availability
  - Warning: Yellow/orange tones for alerts
- **AND** colors SHALL be accessible and distinguishable from each other

### Requirement: Typography System
The system SHALL implement a typography system with clear hierarchy and consistent styling.

#### Scenario: Heading hierarchy
- **WHEN** rendering headings
- **THEN** the system SHALL use typography scale:
  - H1: 48-64px, bold, for page titles and hero sections
  - H2: 36-48px, bold, for major section headings
  - H3: 24-32px, semibold, for subsection headings
  - H4: 18-24px, semibold, for card titles and smaller headings
  - H5: 16-18px, semibold, for labels and small headings
- **AND** headings SHALL have appropriate line-height (1.1-1.3)
- **AND** headings SHALL have letter-spacing adjustments for readability

#### Scenario: Body text styling
- **WHEN** rendering body text
- **THEN** the system SHALL use body text styles:
  - Body large: 18px, regular, for prominent paragraphs
  - Body default: 16px, regular, for standard content
  - Body small: 14px, regular, for captions and metadata
- **AND** body text SHALL have line-height of 1.5-1.6 for readability
- **AND** body text SHALL have appropriate paragraph spacing

#### Scenario: Font family
- **WHEN** rendering any text
- **THEN** the system SHALL use consistent font family:
  - Primary: System font stack or custom brand font (TBD from Figma)
  - Fallback: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
- **AND** fonts SHALL load efficiently (swap or optional display)

### Requirement: Spacing System
The system SHALL implement a consistent spacing system for layout and components.

#### Scenario: Section spacing
- **WHEN** applying spacing to page sections
- **THEN** the system SHALL use spacing scale:
  - Mobile: 50px vertical padding for sections, 20px horizontal padding
  - Desktop: 90-100px vertical padding for sections, 90-100px horizontal padding
- **AND** spacing SHALL be consistent across similar section types

#### Scenario: Component spacing
- **WHEN** applying spacing within components
- **THEN** the system SHALL use spacing tokens:
  - xs: 4px
  - sm: 8px
  - md: 16px
  - lg: 24px
  - xl: 32px
  - 2xl: 40px
  - 3xl: 48px
- **AND** spacing SHALL follow 4px or 8px baseline grid

#### Scenario: Gap spacing in grids
- **WHEN** applying gap between grid items
- **THEN** the system SHALL use appropriate gap values:
  - Product grids: 20-40px gap
  - Content grids: 30-50px gap
  - Tight layouts: 10-20px gap
- **AND** gaps SHALL be responsive (smaller on mobile, larger on desktop)

### Requirement: Border Radius System
The system SHALL implement a consistent border radius system for rounded corners.

#### Scenario: Card and button border radius
- **WHEN** rendering cards, buttons, or inputs
- **THEN** the system SHALL use border radius scale:
  - None: 0px for sharp corners
  - Small: 4px for subtle rounding
  - Medium: 8px for standard rounding (default for buttons, cards)
  - Large: 12px for prominent elements
  - XL: 16px for hero cards or feature elements
  - Full: 9999px for pill shapes

#### Scenario: Image border radius
- **WHEN** rendering product images or content images
- **THEN** the system SHALL apply appropriate border radius:
  - Product cards: 0px or 4px (check Figma)
  - Avatar images: Full (circular)
  - Banner images: 0px (full bleed)

### Requirement: Shadow System
The system SHALL implement elevation shadows for depth and hierarchy.

#### Scenario: Card elevation
- **WHEN** rendering elevated cards or hover states
- **THEN** the system SHALL use shadow scale:
  - Small: Subtle shadow for hover states
  - Medium: Standard shadow for cards
  - Large: Prominent shadow for modals and overlays
  - XL: box-shadow: 0px 8px 24px 0px rgba(149, 157, 165, 0.2) (from Figma)

#### Scenario: Interactive elevation changes
- **WHEN** user hovers over interactive elements
- **THEN** the element SHALL increase shadow elevation
- **AND** the transition SHALL be smooth (200-300ms)

### Requirement: Image Styling
The system SHALL apply consistent styling to images throughout the site.

#### Scenario: Product image display
- **WHEN** displaying product images
- **THEN** the image SHALL maintain aspect ratio (typically 1:1 or 3:4)
- **AND** the image SHALL use object-fit: cover for consistent sizing
- **AND** the image SHALL load lazily (except above fold)
- **AND** the image SHALL show placeholder or skeleton during load

#### Scenario: Banner background images
- **WHEN** displaying banner sections with background images
- **THEN** the image SHALL use object-fit: cover to fill container
- **AND** the image SHALL have overlay with configurable opacity (10-30%)
- **AND** the image SHALL ensure text content remains readable
- **AND** the image SHALL be optimized for web (WebP/AVIF preferred)

#### Scenario: Image aspect ratios
- **WHEN** constraining image dimensions
- **THEN** the system SHALL support common aspect ratios:
  - Square: 1:1 (product thumbnails)
  - Portrait: 3:4 (product images)
  - Landscape: 16:9 or 3:2 (banners, hero images)
  - Wide: 21:9 (cinematic banners)

### Requirement: Transition and Animation
The system SHALL provide subtle transitions and animations for interactive elements.

#### Scenario: Hover state transitions
- **WHEN** user hovers over interactive elements (buttons, cards, links)
- **THEN** the element SHALL transition smoothly:
  - Color changes: 200ms ease
  - Transform changes: 300ms ease-out
  - Shadow changes: 200ms ease
- **AND** transitions SHALL feel responsive, not sluggish

#### Scenario: Page section animations
- **WHEN** page sections come into view
- **THEN** sections MAY animate in subtly (fade-in, slide-up)
- **AND** animations SHALL be optional and respectful of reduced-motion preferences
- **AND** animations SHALL not block content visibility or interaction

#### Scenario: Loading states
- **WHEN** content is loading asynchronously
- **THEN** the system SHALL show loading indicator:
  - Spinner for buttons and small components
  - Skeleton screens for product grids and content sections
  - Progress bars for multi-step processes
- **AND** loading states SHALL animate smoothly (pulse or shimmer effect)

### Requirement: Responsive Image Sizing
The system SHALL serve appropriately sized images based on viewport and device pixel ratio.

#### Scenario: Product image optimization
- **WHEN** displaying product images
- **THEN** the system SHALL use Shopify CDN image transformations:
  - Generate multiple sizes (thumbnail, small, medium, large)
  - Serve appropriate size based on rendered dimensions
  - Support 2x pixel ratio for retina displays
- **AND** images SHALL use srcset for responsive sizing

#### Scenario: Background image optimization
- **WHEN** displaying banner background images
- **THEN** the system SHALL provide multiple image sizes:
  - Mobile: 375-768px width
  - Tablet: 768-1200px width
  - Desktop: 1200-1920px width
- **AND** images SHALL be compressed for web delivery
- **AND** images SHALL use modern formats (WebP, AVIF) with fallbacks

### Requirement: Icon System
The system SHALL implement a consistent icon system for UI elements.

#### Scenario: Icon library usage
- **WHEN** rendering icons in UI
- **THEN** the system SHALL use lucide-react icon library (recommended by shadcn-ui)
- **AND** icons SHALL be consistent size (16px, 20px, 24px based on context)
- **AND** icons SHALL inherit color from parent text color
- **AND** icons SHALL be semantically appropriate for their function

#### Scenario: Icon accessibility
- **WHEN** icons convey meaning without text
- **THEN** icons SHALL include accessible labels (aria-label or sr-only text)
- **AND** interactive icons SHALL have focus states
- **AND** icon buttons SHALL meet minimum touch target size (44x44px on mobile)

## MODIFIED Requirements

N/A - This is a new capability being added to the project.

## REMOVED Requirements

N/A - No existing visual theme requirements are being removed.
