# Shopify Theme Clone - Mila Design System

This document outlines the design system for the Mila theme, based on the Figma design file.

## Colors

### Primary Palette
- `white`: `#FFFFFF`
- `Gray/800`: `#212121`
- `Gray/500`: `#6D6D6D`
- `Gray/400`: `#9C9B9B`
- `Gray/200`: `#DADADA`
- `Mila (branding)`: `#E8E4DF`
- `Beaver`: `#B79987`

### Secondary Palette
- `fill_OQ6V21`: `#E21836`
- `fill_YIF4MR`: `#00447C`
- `fill_JZCJJI`: `#007B84`
- `fill_7OEE0F`: `#172B85`
- `fill_A50ITC`: `#FD6020`
- `fill_5IGEE8`: `#3C4043`
- `fill_YJFEQY`: `#4285F4`
- `fill_FQPMEU`: `#34A853`
- `fill_4BTIGH`: `#FBBC04`
- `fill_ISK0IB`: `#EA4335`
- `fill_IP3CA9`: `#1F72CD`
- `fill_0CANIE`: `#ED0006`
- `fill_1D6831`: `#F9A000`
- `fill_FSUDLL`: `#6D6DBB`
- `fill_H935R7`: `#FF5E00`

### System Colors
- `Warning/500`: `#D98E2B`
- `Success/700`: `#19743F`
- `Overlay/300`: `rgba(0, 0, 0, 0.3)`

## Typography

### Font Families
- **Avenir Next**: Used for body text and UI elements.
- **Big Caslon**: Used for headings.

### Font Styles
- `Avenir Next/sm`: 400, 14px
- `Avenir Next/md`: 400, 15px
- `Avenir Next/md - bold`: 700, 15px
- `Avenir Next/md - medium`: 500, 15px
- `Avenir Next/lg`: 400, 18px
- `Avenir Next/lg - medium`: 500, 18px
- `Avenir Next/xl`: 400, 22px
- `Avenir Next/2xl`: 400, 34px
- `Avenir Next/xs`: 400, 13px
- `Avenir Next/xs - all cap`: 400, 13px, UPPERCASE
- `Big Caslon/2xs`: 500, 13px, UPPERCASE
- `Big Caslon/xs`: 500, 15px
- `Big Caslon/sm`: 500, 18px
- `Big Caslon/md`: 500, 21px
- `Big Caslon/lg`: 500, 27px
- `Big Caslon/xl`: 500, 34px
- `Big Caslon/2xl`: 500, 60px

## Components

- **Header / mobile**: `color=white`, `color=black`
- **Collection banner**: `status=normal`, `style=center`, `status=status3`, `style=bottom left`, `status=hover`, `style=bottom left`
- **Primary button**: `Style=Solid- dark`, `hover=off`, `Style=Solid - light`, `hover=off`, `Style=Outline - dark`, `hover=off`
- **product**: `hover=off`, `hover=on`
- **text button**: `style=secondary`, `hover=on`, `style=secondary`, `hover=off`, `style=Primary`, `hover=off`
- **icon button**: `style=white`, `style=gray`
- **Desktop**: `hover=off`, `hover=on`
- **item**: `hover=off`
- **checkbox**: `checked=off`, `checked=on`
- **Color thumbnail**: `selected=Variant2`

## Layout

The layout is based on a responsive flexbox grid. Spacing is managed with `gap` and `padding` properties. The design includes separate layouts for mobile and desktop.

## Pages

The Figma file includes the following pages:

- Mobile - Collection
- Mobile - landing
- Mobile - menu
- Mobile - product details
- Mobile - cart
- Desktop - landing
- Desktop - menu
- Desktop - Collection
- Desktop - Product details
- Desktop -add to cart
- Desktop - search
- Desktop - cart
