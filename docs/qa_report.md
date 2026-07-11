# B2C Plumbing Supply eCommerce Website (Maa Sharde) - Visual & Accessibility QA Report

This QA report audits the visual mockup structure, design tokens, and components of the Plumbing Supply Pro landing page layout. It reviews spacing, grid alignment, accessibility standards (WCAG), responsiveness, and component reuse consistency.

---

## 1. Visual Spacing & Grid Alignment Audit

### Issue 1.1: Column Container Misalignment
* **Observation**: The Top Utility Bar has an outer padding value of `margin-desktop` (40px) with width set to `max-w-container-max` (1320px). However, the main body layout uses different container configurations in some sections, leading to vertical jagged lines on large viewports.
* **Severity**: Medium
* **Recommendation**: Standardize the wrapping container across all sections. Every full-width section wrapper must use the exact class combination: `w-full max-w-[1320px] mx-auto px-10` (or `px-margin-desktop`). This ensures that the left border of the logo, the hero promo card, and the brand category titles align perfectly to the same vertical guideline.

### Issue 1.2: Inconsistent Grid Gutters in Banners
* **Observation**: The Banners Section features a 2-column layout. In mobile mockups, these stack vertically. The horizontal spacing is defined by `--spacing-gutter` (24px). However, the internal card text elements use `p-12` (48px) padding. The gutter between the cards is visually smaller than the internal text margins, making the containers feel crowded.
* **Severity**: Low
* **Recommendation**: Maintain a strict ratio of: `Outer margins > Section gaps > Card internal margins > Component element spacing`. Standardize section dividers to `scale-xxl` (80px) and item gutters to `scale-lg` (24px) to restore vertical balance.

---

## 2. Color Contrast & Accessibility (WCAG 2.1) Audit

### Issue 2.1: White Text on Brand Accent Orange (Contrast Ratio check)
* **Observation**: Primary buttons use a background color of `#F97316` (Brand Orange) with text color `#FFFFFF` (White). 
* **Audit**:
  * White text on Orange: Contrast ratio is **3.4:1**.
  * **WCAG Compliance**: **FAILED**. Minimum contrast ratio required for normal text (under 18pt or 14pt bold) is **4.5:1** (WCAG AA). It is only acceptable for large text (above 18pt or 14pt bold) which requires **3:1**.
* **Severity**: **High (Conversion Barrier)**
* **Recommendation**: To maintain WCAG AA compliance for buttons, change the primary button text color from `#FFFFFF` (White) to `#111827` (Ink Black) which yields a contrast ratio of **6.1:1** (PASSES WCAG AA/AAA). Alternatively, darken the primary brand orange to a rust orange shade (e.g., `#C2410C`) if white text is mandatory.

### Issue 2.2: Grayscale Brand Logos Contrast
* **Observation**: The brand logos container shows manufacturer brand marks with text colors like gray `#Gray-400` (`#9CA3AF`) on a white card background.
* **Audit**:
  * Gray `#9CA3AF` on White `#FFFFFF`: Contrast ratio is **2.5:1**.
  * **WCAG Compliance**: **FAILED** (if text is meaningful). Note: If logo marks are purely decorative, they are exempt; however, if they serve as links to brand pages, they must satisfy WCAG AA.
* **Severity**: Medium
* **Recommendation**: Darken the inactive brand logo gray from `#9CA3AF` to `#6B7280` (yielding **4.5:1** contrast) to ensure logos are readable by low-vision users.

### Issue 2.3: Screen Reader Image Alt Descriptions
* **Observation**: High-quality lifestyle assets (e.g., the pipes photo in the hero section and the plumber photo in the banner) are declared in markdown as: `<img ... data-alt="A professional plumber in blue work uniform..." />`. Using `data-alt` instead of standard `alt` tags renders these images invisible to screen readers.
* **Severity**: Medium
* **Recommendation**: Ensure standard HTML properties are used in production code: `<img src="..." alt="A professional plumber..." />`. For purely decorative layouts (such as the SVG wrench icons), set `aria-hidden="true"` or `alt=""` so screen readers skip them.

---

## 3. Responsiveness & Mobile UI Audit

### Issue 3.1: Desktop Horizontal Elements Overflowing on Mobile
* **Observation**: The Sticky Nav Bar holds 6 category text links and a right-aligned deals section. On viewports below 1024px, the menu text links wrap onto multiple lines, colliding with the deals badge.
* **Severity**: High
* **Recommendation**: 
  * Disable horizontal wrapping. Apply `overflow-x-auto` to the menu container with hidden scrollbars for medium screen widths (tablets).
  * On mobile screens (under 768px), hide the horizontal bar completely and move category lists into an overlay hamburger drawer.

### Issue 3.2: Grid Scaling for Featured Products
* **Observation**: The Featured Products section uses a 4-column layout (`grid-cols-4`). On mobile viewports, this collapses into a single column (`grid-cols-1`). This results in very long vertical scrolling pages.
* **Severity**: Medium
* **Recommendation**: On mobile viewports (widths under 640px), transition the products display to a 2-column card layout (`grid-cols-2`) with slightly smaller typography, or utilize a horizontal scroll carousel. This increases content density and improves conversion on mobile.

---

## 4. Typography & Design Consistency Audit

### Issue 4.1: Mixed Corner Radiuses
* **Observation**: Buttons utilize a `10px` rounded corner radius (`rounded-lg` in theme settings). However, small status badges (like the "PRO GRADE" tag) use a square 4px corner radius, and inputs use a separate standard border radius.
* **Severity**: Low
* **Recommendation**: Establish a systematic shape system:
  * **Interactive Primitives**: 10px (`rounded-md` / `--rounded-md`) for all buttons, search input bars, and quantity selector blocks.
  * **Badges/Chips**: 4px (`rounded-sm`) for status indicators (In stock, Sale).
  * **Marketing Components**: 16px (`rounded-lg`) for major hero sections and banner cards.

### Issue 4.2: Inline Event Handlers and Script Bloat
* **Observation**: The reference layout utilizes native browser inline click handlers for micro-interactions (e.g., shopping cart bounces).
* **Severity**: Medium
* **Recommendation**: Remove all inline vanilla JS events in production. Encapsulate animations and interactions inside React hooks and state triggers using CSS transition classes or libraries like Framer Motion.
