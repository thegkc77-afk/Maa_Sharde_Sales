# B2C Plumbing Supply eCommerce Website (Maa Sharde) - Component Specifications

This document outlines the detailed specifications for the 15 reusable UI components. Each component supports specific props, visual variants, interactive states, and responsive styling behaviors in accordance with the design system.

---

## 1. Navbar
* **Description**: Dual-tier global navigation containing utility links, branding, account utilities, and the category sub-navigation bar.
* **Props**:
  * `sticky?: boolean` (defaults to `true`)
  * `cartItemCount: number`
  * `wishlistItemCount: number`
  * `onCategoryClick: (category: string) => void`
* **Variants & States**:
  * *Standard State*: Sticky navigation header with thin bottom boundary line.
  * *Scroll State*: Header shadow deepens to Level 1 and background becomes opaque.
* **Responsive Behavior**:
  * *Desktop*: Full logo, search bar, auxiliary phone numbers, and full category links.
  * *Mobile/Tablet*: Collapses category links into a drawer hamburger toggle. Search bar goes full width below the logo tier. Helper phone text is hidden.

---

## 2. Search Bar
* **Description**: Main global autocomplete search utility integrated into the header.
* **Props**:
  * `placeholder?: string`
  * `onSearchSubmit: (query: string, category: string) => void`
  * `onSuggestionsFetch: (query: string) => Promise<Suggestion[]>`
* **Variants & States**:
  * *Default state*: Outline input box.
  * *Focus state*: Outline highlights to `--color-primary` (Deep Blue), displays categories selection dropdown, and shows search suggestion popover drawer (Level 3 shadow).
  * *Loading state*: Displays minor spinner on search action button.
* **Responsive Behavior**: Toggles between horizontal inline layout on desktop and stacked full-width layout on mobile header.

---

## 3. Product Card
* **Description**: Standard grid item card displaying product imagery, ratings, brand, price, and cart triggers.
* **Props**:
  * `id: string`
  * `title: string`
  * `price: number`
  * `originalPrice?: number`
  * `imageSrc: string`
  * `rating: number`
  * `reviewCount: number`
  * `isProGrade?: boolean`
  * `isSale?: boolean`
  * `onAddToCart: (id: string) => void`
  * `onToggleWishlist: (id: string) => void`
  * `isWishlisted?: boolean`
* **Variants & States**:
  * *Standard Grid Variant*: Image, text, and rating block enclosed in a `--color-surface-lowest` container with a soft border.
  * *Compact List Variant*: Table row format with technical specifications shown horizontally. Used for quick bulk ordering.
  * *Hover state*: Triggers Hover-Lift translation `-4px` and deepens shadow to Level 2. Bottom cart button transitions from Deep Blue background to Accent Orange.
* **Responsive Behavior**: Layout transforms from 4 columns on desktop to 2 columns on tablet/mobile screens.

---

## 4. Category Card
* **Description**: Visual entry point card to departments.
* **Props**:
  * `title: string`
  * `imageSrc: string`
  * `itemCount?: number`
  * `onClick: () => void`
* **Variants & States**:
  * *Circular Accent*: Small round visual image with label below.
  * *Square Card Grid*: Standard card with background image and text label overlay.
  * *Hover state*: Outer boundary scale rises `1.05x`. Text label turns to Accent Orange color.
* **Responsive Behavior**: Grid reduces automatically to 2 items per row on mobile viewports.

---

## 5. Brand Card
* **Description**: Card listing supporting manufacturer logo.
* **Props**:
  * `brandName: string`
  * `logoUrl: string`
  * `onClick: () => void`
* **Variants & States**:
  * *Active Brand*: Displayed as a clean white rectangle container.
  * *Hover state*: Soft shadow appears, and grayscale filter is removed.
* **Responsive Behavior**: Scales columns dynamically from 6 to 3 to 2 columns as screen width narrows.

---

## 6. Feature Card
* **Description**: Highlight icon box expressing trust guarantees.
* **Props**:
  * `iconName: string` (matches Google Material Icon tags)
  * `title: string`
  * `description: string`
* **Variants & States**:
  * *Inline Row Item*: Horizontal orientation (icon on the left).
  * *Vertical Grid Box*: Centered icon and title text (used on mobile screens).
* **Responsive Behavior**: Columns re-wrap from a single horizontal row on desktop to a vertical stack on mobile.

---

## 7. Banner
* **Description**: Marketing promo display block containing call-to-actions.
* **Props**:
  * `title: string`
  * `subtitle?: string`
  * `badgeText?: string`
  * `imageSrc?: string`
  * `buttonText: string`
  * `variant: 'primary' | 'secondary' | 'dark'`
  * `onButtonClick: () => void`
* **Variants & States**:
  * *Primary (Orange)*: High contrast callout layout.
  * *Secondary (Light)*: Outlined cards containing grey accents.
  * *Dark (Deep Blue)*: Professional contractor-focused theme layout.
* **Responsive Behavior**: Rearranges split layouts (text-left, image-right) to vertical top-and-bottom alignments on smaller devices.

---

## 8. Footer
* **Description**: Site directory, certifications, and support entries.
* **Props**:
  * `onNewsletterSubmit: (email: string) => void`
* **Variants & States**: Static layout block. Form elements in newsletter subscription include validation error/success flags.
* **Responsive Behavior**: Collapses the 5 columns of directory links into expandable vertical accordion toggles on mobile screens.

---

## 9. Buttons
* **Description**: Core system interaction controls.
* **Props**:
  * `label: string`
  * `variant: 'primary' | 'secondary' | 'ghost' | 'icon'`
  * `size?: 'sm' | 'md' | 'lg'`
  * `isDisabled?: boolean`
  * `isLoading?: boolean`
  * `icon?: string`
  * `onClick: () => void`
* **Variants & States**:
  * *Primary*: Solid Ink Black with white text. Hover transitions background to Brand Accent Orange.
  * *Secondary*: Outlined Blue border. Hover transitions to light tint `--color-surface-high`.
  * *Ghost*: Text only. Focus shows light outline.
  * *Loading*: Displays inline spinner; clicks are blocked.
  * *Disabled*: 30% opacity, pointer events disabled.
* **Responsive Behavior**: Small sizes on mobile to accommodate touch regions.

---

## 10. Forms (Inputs & Dropdowns)
* **Description**: Data entry fields and selection controls.
* **Props (Input)**:
  * `type: string`
  * `label: string`
  * `placeholder?: string`
  * `value: string`
  * `errorMsg?: string`
  * `onChange: (val: string) => void`
* **Props (Dropdown)**:
  * `options: { label: string, value: string }[]`
  * `selectedValue: string`
  * `onChange: (val: string) => void`
* **Variants & States**:
  * *Default*: Thin `--color-outline-variant` borders.
  * *Focus*: Border highlights to `--color-primary` (Deep Blue) with a thin focus ring.
  * *Invalid*: Border turns red; validation error messages display below input.
  * *Disabled*: Input field background changes to light gray; pointer inputs blocked.

---

## 11. Pagination
* **Description**: Controls to navigate multi-page product lists.
* **Props**:
  * `currentPage: number`
  * `totalPages: number`
  * `onPageChange: (page: number) => void`
* **Variants & States**:
  * *Active page*: Filled square circle.
  * *Hover page number*: Light gray background circle toggle.
  * *Previous/Next Arrow Buttons*: Disabled when on bounds.
* **Responsive Behavior**: Hides specific middle page numbers on mobile screens to save horizontal space.

---

## 12. Breadcrumb
* **Description**: Hierarchy trail linking back to parent directories.
* **Props**:
  * `paths: { label: string, url: string }[]`
* **Variants & States**:
  * Links support standard underline actions on hover. Current path text style uses `label-caps` in neutral muted dark gray.
* **Responsive Behavior**: Hides intermediate parent directories on mobile viewports, displaying only the root page and immediate parent.

---

## 13. Rating
* **Description**: Display stars showing customer reviews.
* **Props**:
  * `score: number` (0 to 5 decimal)
  * `size?: 'sm' | 'md'`
* **Variants & States**: Uses Google Material symbols font icons.
  * *Full Star*: Filled Star in `--color-tertiary` (Yellow).
  * *Half Star*: Half-filled Star design.
  * *Empty Star*: Outlined star shape.
* **Responsive Behavior**: Rescales size values based on device parameters.

---

## 14. Wishlist Icon
* **Description**: Heart shaped click toggle to store items.
* **Props**:
  * `productId: string`
  * `isWishlisted: boolean`
  * `onToggle: (id: string, state: boolean) => void`
* **Variants & States**:
  * *Unselected State*: Outlined dark heart icon.
  * *Selected State*: Filled deep red/pink heart icon.
  * *Click action state*: Pop scale bounce animation (`scale: 0.9` -> `scale: 1.1` -> `scale: 1.0`).

---

## 15. Cart Controls
* **Description**: Quantity adjusters and cart action sheets.
* **Props (Quantity Adjuster)**:
  * `quantity: number`
  * `maxLimit?: number`
  * `onChange: (newQty: number) => void`
* **Props (Mini-Cart)**:
  * `isOpen: boolean`
  * `cartItems: CartItem[]`
  * `onClose: () => void`
* **Variants & States**:
  * *Quantity Adjuster*: Grouped button component containing a minus button, visual center count number, and plus button.
  * *Mini-Cart Slider*: Side drawer overlay utilizing Level 3 shadow depth. Transitioning from right-hand offscreen limits.
* **Responsive Behavior**: Mini-Cart takes over the entire mobile viewport when toggled open instead of standard sliding drawers.
