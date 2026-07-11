# B2C Plumbing Supply eCommerce Website (Maa Sharde) - Design System & UI Specs

---

## Part 1: Design System Primitives (Design System Agent)

### 1.1 Color Tokens
The color palette represents a premium corporate retail style, combining industrial blue tones with high-visibility call-to-actions.

| Token Name | Hex Code | Category | Usage Description |
| :--- | :--- | :--- | :--- |
| `--color-primary` | `#0D2B45` | Brand Primary | Used for dark background headers, primary page actions, high-level typography. |
| `--color-secondary` | `#F97316` | Brand Accent / CTA | Reserved for high-conversion CTAs (Add to Cart, Checkout), active alerts. |
| `--color-tertiary` | `#FACC15` | Accent Highlight | Reserved for star ratings, special deals tags, quality trust stamps. |
| `--color-background` | `#F9F9FF` | Surface Background | Main page background color; soft neutral color to reduce eye strain. |
| `--color-surface-lowest`| `#FFFFFF` | Container Surface | Background color for product cards, input blocks, drop-down menus. |
| `--color-surface-high` | `#E1E8FD` | Interactive Hover | Muted blue-gray hover states for lists, inputs, and container backdrops. |
| `--color-outline` | `#73777E` | Structural Borders | Hair-line borders, passive form inputs, helper text labels. |
| `--color-outline-variant`| `#C3C6CE` | Light Dividers | Table line divisions, separator borders, inactive state lines. |
| `--color-text-dark` | `#111827` | Primary Text | Headings, titles, labels requiring maximum readability. |
| `--color-text-muted` | `#6B7280` | Secondary Text | Helper text, breadcrumbs, passive metadata notes. |
| `--color-success` | `#ba1a1a` | Semantic Alert | Warning codes, error validation text, container deletions. |

### 1.2 Typographic Hierarchy
The website uses **Inter** as the core font family. Hierarchy is established through weight transitions, line heights, and letter tracking.

| Style Name | Font Size | Line Height | Weight | Letter Spacing | Semantic Usage |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `display-lg` | `48px` | `1.1 (52px)` | `700` (Bold) | `-0.02em` | Main desktop hero banners. |
| `display-lg-mobile`| `32px` | `1.2 (38px)` | `700` (Bold) | `-0.01em` | Mobile hero headers, main promo blocks. |
| `headline-md` | `24px` | `1.3 (32px)` | `600` (Semi-Bold)| `0em` | Product title on PDPs, major section titles. |
| `headline-sm` | `20px` | `1.4 (28px)` | `600` (Semi-Bold)| `0em` | Product card titles on PLP grids. |
| `body-lg` | `18px` | `1.6 (28px)` | `400` (Regular) | `0em` | High-level marketing intros, subheadings. |
| `body-md` | `16px` | `1.5 (24px)` | `400` (Regular) | `0em` | Product descriptions, reviews body copy. |
| `body-sm` | `14px` | `1.5 (20px)` | `400` (Regular) | `0em` | Fine print specs, table info lists, footer links. |
| `label-md` | `14px` | `1.0 (14px)` | `600` (Semi-Bold)| `0.05em` | Buttons, navigation links, form labels. |
| `label-sm` | `12px` | `1.0 (12px)` | `500` (Medium) | `0em` | Badges, small helper alerts, tag categories. |

### 1.3 Spacing & Rhythm System
Built on a strict 8px grid alignment scale.

| Token | Dimension | Common Application |
| :--- | :--- | :--- |
| `scale-xs` | `4px` | Text-to-icon padding, small badge internal margin. |
| `scale-sm` | `8px` | Content-to-content item padding, checkbox alignments. |
| `scale-md` | `16px` | Card internal padding, small element spacing, text paragraph gaps. |
| `scale-lg` | `24px` | Column gutters, standard vertical section block gaps. |
| `scale-xl` | `48px` | Heavy form padding sections, major component divisions. |
| `scale-xxl` | `80px` | Homepage layout vertical block separation padding. |

### 1.4 Elevation & Shadows
Depth signifies interactivity and page hierarchies on the white/light surface grid.

* **Level 0 (Flat Page Background)**: No shadow. Applied to basic page surfaces and borders.
* **Level 1 (Hover-Lift & Dynamic Cards)**: `0 10px 30px rgba(0, 0, 0, 0.08)`. Applied to passive product cards, header bars, and navigation elements.
* **Level 2 (Intense Interactive Glow)**: `0 15px 35px rgba(0, 0, 0, 0.12)`. Applied to active hover states of cards and buttons.
* **Level 3 (Overlays & Modals)**: `0 20px 40px rgba(0, 0, 0, 0.18)`. Applied to search autocomplete drawers, cart popups, and dropdown menus.

---

## Part 2: Homepage Layout Blueprint (UI Designer Agent)

### 2.1 Grid & Viewport Dimensions
* **Base Viewport**: Desktop size, `1440px` wide.
* **Content Container Max-Width**: `1320px` centered.
* **Margins (Left/Right)**: `60px` outer margins.
* **Grid Pattern**: 12-column grid.
  * **Column Width**: `88px`
  * **Gutter Width**: `24px` (`scale-lg`)
  * **Grid Layout Equation**: `(12 * 88px) + (11 * 24px) = 1056px + 264px = 1320px` (matches container width).
* **Responsive Breakpoints**:
  * Desktop: `1200px`+
  * Tablet: `768px - 1199px` (8 columns, 20px gutters, 24px margins)
  * Mobile: `Up to 767px` (4 columns, 16px gutters, 16px margins)

### 2.2 Layout Sections (Figma Specs)

```
+-----------------------------------------------------------------------+
|  Top Utility Bar (40px) - Shipping Alert (L) | Store Locator, Help (R)|
+-----------------------------------------------------------------------+
|  Main Header (90px) - Logo (L) | Visual Search (C) | Account/Wish/Cart|
+-----------------------------------------------------------------------+
|  Navigation Bar (56px) - MegaMenu (L) | Kitchen, Bath, Pipes (C) | Deal|
+-----------------------------------------------------------------------+
|                                                                       |
|  Hero Banner (560px)                                                  |
|  +-------------------------------------+ +--------------------------+ |
|  | Main Promo: "THE BEST PLUMBING..."   | | Secondary Promo Banner:  | |
|  | Image: Chrome pipes & Wrench        | | "SEASON SALE - 50% OFF"  | |
|  +-------------------------------------+ +--------------------------+ |
|                                                                       |
+-----------------------------------------------------------------------+
|  Horizontal Features (4 Columns) - Ship | Returns | Payment | Support  |
+-----------------------------------------------------------------------+
|  Trusted Brand Logos Grid (6 Columns) - Kohler | Grohe | Moen | etc.  |
+-----------------------------------------------------------------------+
|  Featured Products Grid (4 Columns) - Product Cards (10px rounded)    |
+-----------------------------------------------------------------------+
|  Promo Action Banners (2 Columns) - Help Support | Free Shipping      |
+-----------------------------------------------------------------------+
|  Bottom Features Bar (4 Columns) - Selection | Quality | Price | Fast |
+-----------------------------------------------------------------------+
|  Footer Index (5 Columns) - Brand | Shop | Customer | Account | Contact|
+-----------------------------------------------------------------------+
```

### 2.3 Component Specifications
1. **Header Block**: Sticky behavior (`position: sticky`, `top: 0`). Outer container includes a bottom thin hairline border `#C3C6CE` (`--color-outline-variant`).
2. **Hero Section (Grid Layout)**: 
  * Left card spans 8 columns. Uses Auto Layout vertically centered. Inner content padding `48px`. Contains tag, headline, text body, and two action buttons. Right side features absolute positioned product clipping path.
  * Right card spans 4 columns. High contrast `--color-primary` background with `--color-secondary` accent badges.
3. **Features Row**: 4-column cards. Width: `312px` each. Auto Layout horizontal structure. Left alignment contains an icon container (`48px` circular, `--color-background`), and right side contains details (title, subtitle). Rounded corners `10px`.
4. **Brand Logos Row**: 6-column grid. Cards size `196px` wide, `96px` high. Center aligned logo text (color: `#9CA3AF`). Focus hover scale increases opacity and triggers a shadow lift.
5. **Featured Products**: 4-column product card layout. Row gaps: `24px`. Each card contains:
  * Badge absolute container (Top-left, rounded `4px`).
  * Image container (Height `240px` with `4:5` aspect ratio centered image).
  * Text section (Auto Layout vertical, gap `8px`): Title, star reviews, price, add to cart button.
  * Corner radius: `10px` (`rounded-md`).
6. **Banners Row**: 2-column cards. Width `648px` each. Left card features deep `--color-primary` background. Right card uses clear `#FFFFFF` background with outlines.
