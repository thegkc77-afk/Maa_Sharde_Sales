# B2C Plumbing Supply eCommerce Website (Maa Sharde) - Information Architecture

---

## 1. Sitemap & Page Directory

```mermaid
graph TD
    Home["Home (Level 1)"]
    
    %% Main Sections
    Category["Category Browse (Level 2)"]
    Brands["Brands Showcase (Level 2)"]
    Deals["Deals & Clearance (Level 2)"]
    About["About Us (Level 2)"]
    Contact["Contact Us (Level 2)"]
    Support["Support Hub (Level 2)"]
    TrackOrder["Track Order (Level 2)"]
    
    %% Deep Browsing
    PLP["Product Listing (Level 3)"]
    PDP["Product Details (Level 4)"]
    
    %% Checkout Funnel
    Cart["Shopping Cart (Level 2)"]
    Checkout["Checkout (Level 3)"]
    
    %% User Accounts
    Account["My Account (Level 2)"]
    Wishlist["Wishlist / Project Board (Level 3)"]

    %% Connections
    Home --> Category
    Home --> Brands
    Home --> Deals
    Home --> About
    Home --> Contact
    Home --> Support
    Home --> TrackOrder
    Home --> Cart
    Home --> Account
    
    Category --> PLP
    PLP --> PDP
    Brands --> PLP
    Deals --> PLP
    
    Cart --> Checkout
    Account --> Wishlist
    Account --> TrackOrder
```

---

## 2. Navigation Architecture

### 2.1 Utility Navigation (Height: 40px, Dark Muted Background)
* **Goal**: Highlight key trust points and secondary operational page entries.
* **Layout (Left-to-Right)**:
  * **Trust Tagline**: "Free Shipping on Orders over $150 | Store Locator" (Icon + Text)
  * **Link Index**: [About Us] | [Track Order] | [Customer Support] | [Contact Us]

### 2.2 Global Header Navigation (Height: 90px, Main Surface Color)
* **Goal**: Primary branding, search, conversion triggers, and account management.
* **Layout (Left-to-Right)**:
  * **Brand Logo**: "PLUMBING SUPPLY PRO" (with secondary-themed color highlights)
  * **Global Search Box**: Integrated "Category Select" dropdown + input text search + [Search Icon] submit button.
  * **Phone Support Info**: "Need Help? 1-800-234-5677" (Bold, professional font).
  * **Action Icons**:
    * **My Account**: Icon + Text label "Account" (Triggers dropdown menu for log-in, profile, orders).
    * **Wishlist**: Icon + Text label "Wishlist" + Badge indicator (count).
    * **Shopping Cart**: Icon + Text label "Cart" + High-contrast Badge indicator (item count, price summary).

### 2.3 Category Bar (Height: 56px, Deep Primary Background)
* **Goal**: Structural browsing and product categorization.
* **Layout (Left-to-Right)**:
  * **Mega Menu Toggle Button**: "SHOP BY CATEGORY" (with grid icon, dropdown arrow).
  * **Main Links**: [Kitchen] | [Bathroom] | [Pipes & Fittings] | [Water Heaters] | [Valves & Accessories] | [Tools & Brands].
  * **Action Link (Right-aligned)**: "DEALS" (high-contrast orange font + sale badge icon).

### 2.4 Footer Navigation (Tonal Surface Dark Background)
* **Goal**: Comprehensive catalog index and legal declarations.
* **Structure (5 Columns)**:
  * **Column 1 (Corporate)**: Brand logo, 2-line description, social media icons, certifications.
  * **Column 2 (Shop)**: Kitchen, Bathroom, Pipes & Fittings, Water Heaters, Tools, All Categories.
  * **Column 3 (Customer Service)**: Contact Us, Shipping Info, Returns, FAQ, Size Guides.
  * **Column 4 (My Account)**: Profile Details, Order History, Invoices, Wishlists, Newsletter Signup.
  * **Column 5 (Contact Details)**: Toll-Free Phone, Email, HQ Location Address, Business Hours.
  * **Bottom Copyright Strip**: Legal copyright notice, links to Privacy Policy, Terms of Service, and XML Sitemap.

---

## 3. Page Hierarchy Levels

| Level | Description | Key Focus | Primary Pages |
| :--- | :--- | :--- | :--- |
| **Level 1** | Entry Pages | Engagement, Search, Identity | Homepage |
| **Level 2** | Department & Core Hubs | Directional choice, Navigation, Branding | Category Browse, Brands, Deals, About, Contact, Support, Track Order, Cart, My Account |
| **Level 3** | Filtering & Collection Lists | Faceted search, List review, Quick comparison | Product Listing Page (PLP), Wishlist/Project Boards, Checkout Page |
| **Level 4** | Product Final details | High-detail specification sheets, compatibility checking | Product Details Page (PDP) |

---

## 4. User Flow Diagrams

### 4.1 B2C Homeowner Faucet Checkout Flow
This flow represents a consumer landing on the home page, researching a faucet, ensuring compatibility, and completing a standard purchase.

```mermaid
sequenceDiagram
    actor User as DIY Homeowner
    participant Home as Homepage
    participant PLP as Product Listing Page (PLP)
    participant PDP as Product Details Page (PDP)
    participant Cart as Shopping Cart
    participant Pay as Checkout Funnel

    User->>Home: Enters Site
    User->>Home: Clicks "Bathroom Faucets" Category
    Home->>PLP: Displays Bathroom Faucets
    User->>PLP: Filters by Finish (Chrome) & Installation (Centerset)
    PLP->>PLP: Refines list to matches
    User->>PLP: Clicks "Delta Modern Kitchen Faucet"
    PLP->>PDP: Displays Product Details Page
    User->>PDP: Checks "Compatible Rough-in Valve" widget
    User->>PDP: Selects Faucet + Valve bundle checkbox
    User->>PDP: Clicks "Add to Cart"
    PDP->>Cart: Adds Bundle items, updates cart counter
    User->>Cart: Clicks "Proceed to Checkout"
    Cart->>Pay: Initiates Checkout
    User->>Pay: Inputs shipping address, selects Credit Card
    User->>Pay: Submits Order
    Pay->>User: Displays Success Screen & Order Confirmation Email
```

### 4.2 Pro Contractor SKU Bulk Procurement Flow
This flow details a contractor utilizing the platform on a job site to order bulk items quickly using SKU search and Pro account credits.

```mermaid
sequenceDiagram
    actor Pro as Pro Contractor
    participant Search as Global Search
    participant PLP as Product Listing Page (PLP)
    participant Cart as Shopping Cart
    participant Pay as Pro Checkout Portal

    Pro->>Search: Types SKU "RIDGID-12-PEX"
    Search->>PLP: Direct search match / displays results
    Pro->>PLP: Toggles "List Spec View" (compact grid)
    Pro->>PLP: Changes Qty box to "25 units"
    Pro->>PLP: Clicks "Quick Add" button directly
    PLP->>Cart: Updates Cart without leaving page
    Pro->>Cart: Direct click to "Checkout"
    Cart->>Pay: Initiates Pro Checkout
    Pro->>Pay: Applies Tax-Exempt ID
    Pro->>Pay: Chooses payment via "Pro Account Credit Line"
    Pro->>Pay: Selects "Jobsite Delivery (Next Morning)"
    Pay->>Pro: Displays "Delivery Confirmed - Invoice Sent"
```
