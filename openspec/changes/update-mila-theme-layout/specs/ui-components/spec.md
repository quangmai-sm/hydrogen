# UI Components Specification

## ADDED Requirements

### Requirement: Agent-Driven UI Component Development
The system SHALL delegate UI component development to the ui-designer agent with MCP tool access for expert design implementation and automated verification.

#### Scenario: Figma component analysis
- **WHEN** designing UI components
- **THEN** the ui-designer agent SHALL use Figma MCP (`mcp__Framelink_Figma_MCP__get_figma_data`) to analyze component designs
- **AND** the agent SHALL extract component properties (variants, states, styles)
- **AND** the agent SHALL identify reusable patterns across Figma components
- **AND** the agent SHALL document component specifications

#### Scenario: shadcn-ui component sourcing
- **WHEN** implementing UI components
- **THEN** the ui-designer agent SHALL use shadcn-ui MCP to list available components (`mcp__shadcn-ui__list_components`)
- **AND** the agent SHALL fetch appropriate components (`mcp__shadcn-ui__get_component`)
- **AND** the agent SHALL review component demos (`mcp__shadcn-ui__get_component_demo`) for usage patterns
- **AND** the agent SHALL get component metadata (`mcp__shadcn-ui__get_component_metadata`) for props and variants

#### Scenario: Component interaction testing with Playwright
- **WHEN** verifying UI component behavior
- **THEN** the ui-designer agent SHALL use Playwright MCP for interaction testing
- **AND** the agent SHALL test button clicks via `mcp__playwright__browser_click`
- **AND** the agent SHALL test form inputs via `mcp__playwright__browser_type`
- **AND** the agent SHALL test hover states via `mcp__playwright__browser_hover`
- **AND** the agent SHALL test keyboard navigation via `mcp__playwright__browser_press_key`
- **AND** the agent SHALL capture component snapshots via `mcp__playwright__browser_snapshot` for accessibility validation

#### Scenario: Component visual regression testing
- **WHEN** ensuring component visual consistency
- **THEN** the ui-designer agent SHALL use Playwright to capture component screenshots
- **AND** the agent SHALL test all component variants and states
- **AND** the agent SHALL compare screenshots for visual regression
- **AND** the agent SHALL verify component rendering across different viewports

### Requirement: shadcn-ui Component Integration
The system SHALL integrate shadcn-ui component library to provide accessible, reusable UI primitives.

#### Scenario: Component installation via MCP
- **WHEN** a shadcn-ui component is needed (button, card, dialog, etc.)
- **THEN** the component source code SHALL be fetched via MCP shadcn-ui tool
- **AND** the component SHALL be placed in `app/components/ui/` directory
- **AND** the component SHALL be customized to match Mila theme design tokens

#### Scenario: Component composition
- **WHEN** building complex UI patterns
- **THEN** shadcn-ui primitives SHALL be composed together
- **AND** components SHALL maintain accessibility features (ARIA labels, keyboard navigation)
- **AND** components SHALL work in server-side rendering (SSR) context

### Requirement: Layout Primitive Components
The system SHALL provide layout primitive components for consistent spacing and structure.

#### Scenario: Section component usage
- **WHEN** creating a page section
- **THEN** the Section component SHALL accept variant props (default, branded, image-background)
- **AND** the Section component SHALL apply appropriate padding based on viewport (mobile: 50px, desktop: 90px)
- **AND** the Section component SHALL support full-width or constrained layouts

#### Scenario: Container component usage
- **WHEN** constraining content width
- **THEN** the Container component SHALL enforce max-width (mobile: 375px, desktop: 1400px)
- **AND** the Container component SHALL center content horizontally
- **AND** the Container component SHALL provide responsive padding

#### Scenario: Grid component usage
- **WHEN** arranging items in a grid
- **THEN** the Grid component SHALL support configurable column counts (1, 2, 3, 4)
- **AND** the Grid component SHALL adapt columns based on viewport size
- **AND** the Grid component SHALL provide consistent gap spacing

### Requirement: Button Component
The system SHALL provide a Button component with consistent styling and interaction states.

#### Scenario: Primary button rendering
- **WHEN** rendering a primary button
- **THEN** the button SHALL use Mila branding colors
- **AND** the button SHALL have proper hover and focus states
- **AND** the button SHALL support loading state with spinner
- **AND** the button SHALL be keyboard accessible

#### Scenario: Button variants
- **WHEN** different button styles are needed
- **THEN** the Button SHALL support variants (primary, secondary, outline, ghost)
- **AND** the Button SHALL support sizes (sm, md, lg)
- **AND** the Button SHALL maintain consistent styling within each variant

### Requirement: Card Component
The system SHALL provide a Card component for product cards and content blocks.

#### Scenario: Product card rendering
- **WHEN** displaying a product in a grid
- **THEN** the Card SHALL show product image with proper aspect ratio
- **AND** the Card SHALL show product title and price
- **AND** the Card SHALL have hover state with subtle elevation or overlay
- **AND** the Card SHALL link to product detail page

#### Scenario: Card image overlay
- **WHEN** Card contains a background image
- **THEN** the Card SHALL support image overlay with configurable opacity
- **AND** the Card SHALL ensure text remains readable over image
- **AND** the Card SHALL load images efficiently (lazy loading)

### Requirement: Dialog and Sheet Components
The system SHALL provide Dialog (desktop) and Sheet (mobile) components for modals and drawers.

#### Scenario: Cart drawer on mobile
- **WHEN** user opens cart on mobile viewport
- **THEN** the Sheet component SHALL slide in from right side
- **AND** the Sheet SHALL overlay content with backdrop
- **AND** the Sheet SHALL be dismissible by clicking backdrop or close button
- **AND** the Sheet SHALL trap focus within the drawer

#### Scenario: Search dialog on desktop
- **WHEN** user opens search on desktop viewport
- **THEN** the Dialog component SHALL appear centered on screen
- **AND** the Dialog SHALL focus the search input automatically
- **AND** the Dialog SHALL close on Escape key press
- **AND** the Dialog SHALL restore focus to trigger element on close

### Requirement: Navigation Menu Component
The system SHALL provide a Navigation Menu component for header navigation.

#### Scenario: Desktop navigation rendering
- **WHEN** rendering header navigation on desktop
- **THEN** the Navigation Menu SHALL display horizontal menu items
- **AND** the Navigation Menu SHALL support dropdown submenus on hover
- **AND** the Navigation Menu SHALL highlight active menu item based on current route
- **AND** the Navigation Menu SHALL be keyboard navigable (arrow keys, Enter, Escape)

#### Scenario: Mobile navigation rendering
- **WHEN** rendering header navigation on mobile
- **THEN** the Navigation Menu SHALL collapse into hamburger menu icon
- **AND** the Navigation Menu SHALL open in Sheet drawer when activated
- **AND** the Navigation Menu SHALL display vertical stacked menu items
- **AND** the Navigation Menu SHALL support nested menu expansion

### Requirement: Accordion Component
The system SHALL provide an Accordion component for expandable content sections.

#### Scenario: FAQ section usage
- **WHEN** displaying FAQ items
- **THEN** the Accordion SHALL render collapsible question/answer pairs
- **AND** the Accordion SHALL animate expansion and collapse smoothly
- **AND** the Accordion SHALL support single or multiple items open at once
- **AND** the Accordion SHALL have accessible button semantics

### Requirement: Badge Component
The system SHALL provide a Badge component for status indicators and labels.

#### Scenario: Sale badge display
- **WHEN** product has a discount or special offer
- **THEN** the Badge SHALL render with appropriate color (e.g., red for sale)
- **AND** the Badge SHALL display sale text or percentage
- **AND** the Badge SHALL position correctly on product cards

#### Scenario: Wishlist counter badge
- **WHEN** showing wishlist icon with count
- **THEN** the Badge SHALL show count as small pill on icon
- **AND** the Badge SHALL update count when items added/removed
- **AND** the Badge SHALL hide when count is zero

### Requirement: Carousel Component
The system SHALL provide a Carousel component for image galleries and product showcases.

#### Scenario: Product image gallery
- **WHEN** viewing product detail page
- **THEN** the Carousel SHALL display product images in scrollable gallery
- **AND** the Carousel SHALL provide thumbnail navigation
- **AND** the Carousel SHALL support touch gestures on mobile (swipe)
- **AND** the Carousel SHALL indicate current slide position

#### Scenario: Featured products carousel
- **WHEN** displaying featured products on landing page
- **THEN** the Carousel SHALL show products in horizontal scroll
- **AND** the Carousel SHALL provide arrow navigation buttons
- **AND** the Carousel SHALL auto-scroll on interval (optional)
- **AND** the Carousel SHALL pause on hover or focus

## MODIFIED Requirements

N/A - This is a new capability being added to the project.

## REMOVED Requirements

N/A - No existing UI component requirements are being removed.
