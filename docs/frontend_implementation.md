# B2C Plumbing Supply eCommerce Website (Maa Sharde) - Frontend Implementation Plan

---

## 1. Folder Structure (Next.js App Router Setup)

We will organize the codebase utilizing the Next.js App Router architecture. Reusable components will be split by scope, and global states/hooks will be separated.

```
/maa-sharde
├── /public                   # Static assets (images, icons.svg)
├── /src
│   ├── /app                  # Next.js Pages and App Router Routing
│   │   ├── layout.jsx        # Root Layout (wraps Header, Navbar, Footer)
│   │   ├── page.jsx          # Homepage (Level 1)
│   │   ├── /categories       # Category department browsing pages
│   │   │   ├── page.jsx
│   │   │   └── /[categoryId] # Dynamic Product Listing Pages (PLP)
│   │   │       ├── page.jsx
│   │   │       └── /[productId] # Dynamic Product Details Pages (PDP)
│   │   │           └── page.jsx
│   │   ├── /brands           # Brands directory and brand-specific listing
│   │   ├── /deals            # Deals & Clearance list
│   │   ├── /cart             # Shopping Cart detailed page
│   │   ├── /checkout         # Checkout funnel
│   │   ├── /account          # Account dashboard & Pro list pages
│   │   ├── /track-order      # Track order entry
│   │   └── /support          # Customer Support & FAQ pages
│   ├── /components           # Reusable Component Modules
│   │   ├── /common           # Primitives (Buttons, Badges, Ratings)
│   │   ├── /layout           # Structural layout blocks (Header, Navbar, Footer)
│   │   └── /product          # Product items (ProductCard, CategoryCard)
│   ├── /hooks                # Custom React hooks (useSearch, useIntersection)
│   ├── /store                # Global State Stores (Zustand)
│   │   ├── useCartStore.js   # Cart and quantities state
│   │   └── useUserStore.js   # User sessions, invoices, & wishlist state
│   └── /styles               # Styling assets
│       └── globals.css       # Core Tailwind / CSS variables configuration
```

---

## 2. Reusable Component Hierarchy Map

This map outlines how individual structural sections compose larger pages.

```
RootLayout (app/layout.jsx)
 ├── TopAppBar (Utility Bar)
 ├── GlobalHeader (Main brand, Search bar, Account dropdown triggers)
 │    └── SearchBar (Dynamic Category selector + suggestions popover)
 ├── StickyNavBar (Shop MegaMenu + Deals shortcut)
 └── Footer (Site index directory, social icons, newsletter sign-up)

Homepage (app/page.jsx)
 ├── HeroSection (Desktop Split Banner Layout)
 │    ├── Button (Primary CTA to PLP)
 │    └── SeasonSalePromoCard (Secondary Banner layout)
 ├── FeaturesRow (4 x FeatureCard containers)
 ├── BrandsGrid (6 x BrandCard icons)
 ├── ProductGridSection (4 x ProductCard items)
 │    ├── Badge (Sale or Pro-Grade indicator tags)
 │    ├── Rating (Average review stars display)
 │    └── WishlistButton (Heart selector toggling wishlist status)
 └── PromosGrid (2-Column Custom Banners)

ProductListingPage (app/categories/[categoryId]/page.jsx)
 ├── Breadcrumb (Contextual location paths)
 ├── FilterSidebar (Collapsible faceted filters for materials, dimensions)
 │    └── FormInput / FormCheckbox (Dynamic options filters)
 ├── ProductGrid (Multi-column ProductCards display)
 └── Pagination (List control arrows and page indices)
```

---

## 3. Props Interfaces & Type Contracts

To ensure component predictability and clean data typing, we define these standard JavaScript objects:

### 3.1 Product Card Data Definition
```javascript
/**
 * @typedef {Object} ProductCardProps
 * @property {string} id - Product SKU unique indicator.
 * @property {string} title - Product catalog description name.
 * @property {number} price - Current active price.
 * @property {number} [originalPrice] - Original retail price (for clearance tags).
 * @property {string} imageSrc - Path URL to the product image asset.
 * @property {number} rating - Average star review score (0 to 5).
 * @property {number} reviewCount - Total customer reviews submitted.
 * @property {boolean} [isProGrade] - Display professional quality tag status.
 * @property {boolean} [isSale] - Display sale promotion badge status.
 * @property {function} onAddToCart - Callback triggered on quantity action addition.
 */
```

### 3.2 Form Controls Props Definition
```javascript
/**
 * @typedef {Object} InputProps
 * @property {string} id - Unique identifier.
 * @property {string} label - Input label description text.
 * @property {string} type - Input element value type (text, password, email).
 * @property {string} [placeholder] - Guide placeholder value.
 * @property {string} value - Text context state value.
 * @property {string} [errorMsg] - Field validation error display string.
 * @property {function} onChange - Triggered on key character modifications.
 */
```

---

## 4. State Management Strategy (Zustand Store Layout)

We will use **Zustand** for lightweight, high-performance global state management. This avoids prop drilling and keeps components decoupled.

### 4.1 Cart Store (`/store/useCartStore.js`)
* **State Values**:
  * `cartItems`: Array of active items in the cart: `[{ id, title, price, imageSrc, quantity }]`
  * `isCartOpen`: Boolean representing side checkout drawer status.
* **Actions**:
  * `addToCart(product, quantity)`: Inserts product or increments quantity.
  * `removeFromCart(productId)`: Removes matching item completely.
  * `updateQuantity(productId, quantity)`: Modifies count directly.
  * `clearCart()`: Empties item lists.
  * `toggleCart()`: Flips drawer visibility.

### 4.2 User & Wishlist Store (`/store/useUserStore.js`)
* **State Values**:
  * `userSession`: Session details `[{ token, name, isProContractor, taxExemptId }]`
  * `wishlistItems`: Set containing product IDs: `Set(['SKU-1', 'SKU-2'])`
* **Actions**:
  * `loginUser(credentials)`: Handles user authentication.
  * `logoutUser()`: Destroys session.
  * `toggleWishlistItem(productId)`: Adds/removes item from wishlist.

---

## 5. Responsive Breakpoint Rules

We configure layout breakpoints in our global styling tokens to align with the UI grids.

```css
/* src/styles/globals.css */
:root {
  /* Breakpoints matched with Figma layouts */
  --breakpoint-mobile: 767px;
  --breakpoint-tablet: 1199px;
  --breakpoint-desktop: 1200px;
  
  /* Layout constraints */
  --container-max-desktop: 1320px;
  --container-max-tablet: 720px;
  --container-max-mobile: 100%;
}
```
* **Media Query Implementation**:
  ```css
  /* Example mobile-first css styling */
  .layout-container {
    width: var(--container-max-mobile);
    padding-left: 16px;
    padding-right: 16px;
  }
  @media (min-width: 768px) {
    .layout-container {
      width: var(--container-max-tablet);
      padding-left: 24px;
      padding-right: 24px;
    }
  }
  @media (min-width: 1200px) {
    .layout-container {
      width: var(--container-max-desktop);
      margin-left: auto;
      margin-right: auto;
      padding-left: 40px;
      padding-right: 40px;
    }
  }
  ```
