# Kandaka Boutique (Sudanese Fashion E-Commerce) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete, responsive, bilingual (Arabic RTL / English LTR) e-commerce web application for women's Sudanese fashion (Kandaka Boutique) with the Peach Sorbet design system, full Qatar regulatory compliance (Ministerial Decision No. 25 of 2026), interactive style guide, redesigned product showcase, checkout with Qatar payment rails (Card, QPay/NAPS, Fawran, COD), and official invoice generation.

**Architecture:** Full-Stack Next.js 15 (App Router) with TypeScript, Tailwind CSS, Lucide icons, unified bilingual dictionary engine, central Qatar compliance configuration, interactive payment gateway simulator/adapter, and persistent client/server state.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS, Lucide React, clsx, tailwind-merge.

**Spec:** [`docs/superpowers/specs/2026-10-30-sudanese-ecommerce-design.md`](file:///C:/Users/ahmed/kandaka-boutique/docs/superpowers/specs/2026-10-30-sudanese-ecommerce-design.md)

## Global Constraints

- Primary color palette "Peach Sorbet": Primary `#FFC9A8`, Deep Peach `#F9A57B`, Warm Coral `#E8795A`, Cream `#FFF6EE`, Blush `#FFE5D4`, Cocoa Dark `#3B2A24`, Cocoa Muted `#725447`.
- Contrast: All text against background must satisfy WCAG AA (minimum 4.5:1 for body text, 3:1 for large text).
- Typography: Arabic headers `Cairo`, body `Tajawal`. English headers `Playfair Display`, body `Inter`.
- Languages: Arabic default with complete RTL mirroring (`dir="rtl"`), instant toggle to English (`dir="ltr"`).
- Regulatory: Every page must display CR Number (`[CR_NUMBER]`), E-Commerce License (`[ECOM_LICENSE_NUMBER]`), legal entity name, phone, email, and service hours in the footer.
- Currency: Base currency is QAR (Qatari Riyal) with optional conversion display for USD and SDG.
- Domain: Configurable `.qa` or `.com.qa` domain placeholder; no hardcoded foreign domains.
- Payment Rails: Online Card (Visa/Mastercard), QPay/NAPS debit, Fawran (فوران) instant mobile payment, and Cash on Delivery.

## Review Focus

1. **RTL Icon & Layout Inversion:** Icons with directional intent (back/forward arrows, chevron selectors, shipping trucks, drawer exits) must flip in RTL mode while non-directional icons (search, cart, heart, phone) must not.
2. **Qatar Address Precision:** Checkout address validation for domestic Qatar orders must require Municipality/City, Zone Number, Street, and Building Number before order submission.
3. **Price Breakdown Clarity (Decision No. 25 of 2026):** Checkout and invoice must explicitly separate subtotal, delivery fee, discounts, and total in QAR with zero unexpected charges.
4. **Mandatory Privacy Checkbox Enforcement:** Order completion must be strictly blocked if the privacy policy and terms agreement checkbox is unselected.
5. **Invoice Legal Details:** The printable order invoice must render legal business name, CR number, E-Commerce license number, date, and itemized breakdown.

---

### Task 1: Next.js Project Foundation, Tailwind Peach Sorbet Tokens & Typography Setup

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.mjs`
- Create: `tailwind.config.ts`
- Create: `postcss.config.mjs`
- Create: `src/styles/globals.css`
- Create: `src/config/site.ts`
- Create: `src/config/compliance.ts`
- Test: `tests/config.test.ts`

**Interfaces:**
- Produces: `siteConfig` (brand name, domain, social links, support contact), `complianceConfig` (CR number, license number, MOCI settings, operating hours), Tailwind theme color tokens (`peach`, `blush`, `coral`, `cream`, `cocoa`).

- [ ] **Step 1: Write the failing test for configuration and color tokens**
- [ ] **Step 2: Run test to verify it fails**
- [ ] **Step 3: Scaffold Next.js project with Tailwind CSS and install dependencies (`lucide-react`, `clsx`, `tailwind-merge`)**
- [ ] **Step 4: Configure `tailwind.config.ts` with Peach Sorbet palette and Google Fonts (`Cairo`, `Tajawal`, `Playfair Display`, `Inter`)**
- [ ] **Step 5: Implement `src/config/site.ts` and `src/config/compliance.ts` with Qatar legal placeholders**
- [ ] **Step 6: Run test to verify it passes**
- [ ] **Step 7: Commit**
  ```bash
  git add package.json tsconfig.json next.config.mjs tailwind.config.ts src/ config/
  git commit -m "feat: initialize Next.js 15 app with Peach Sorbet Tailwind tokens and Qatar compliance config"
  ```

---

### Task 2: Bilingual i18n Engine, RTL/LTR Directional Routing & Currency Store

**Files:**
- Create: `src/dictionaries/ar.json`
- Create: `src/dictionaries/en.json`
- Create: `src/lib/i18n.ts`
- Create: `src/lib/currency.ts`
- Create: `src/lib/store.ts`
- Test: `tests/i18n-currency.test.ts`

**Interfaces:**
- Consumes: `siteConfig`
- Produces: `getDictionary(lang: 'ar' | 'en')`, `formatPrice(amountInQAR: number, currency: 'QAR' | 'USD' | 'SDG', lang: 'ar' | 'en')`, `useStore` (cart, wishlist, language, currency state).

- [ ] **Step 1: Write the failing test for bilingual dictionary keys parity and QAR currency formatting**
- [ ] **Step 2: Run test to verify it fails**
- [ ] **Step 3: Create comprehensive `ar.json` and `en.json` dictionaries with warm, elegant Sudanese heritage copy and short sentences**
- [ ] **Step 4: Implement `src/lib/i18n.ts` with dictionary loader and RTL detection helper**
- [ ] **Step 5: Implement `src/lib/currency.ts` with QAR default, USD / SDG conversion rates, and Arabic Eastern/Western numeral options**
- [ ] **Step 6: Implement `src/lib/store.ts` using lightweight React state / local persistence**
- [ ] **Step 7: Run test to verify it passes**
- [ ] **Step 8: Commit**
  ```bash
  git add src/dictionaries/ src/lib/ tests/
  git commit -m "feat: implement bilingual i18n dictionary engine and QAR currency formatter"
  ```

---

### Task 3: Design System Primitives & Interactive `/style-guide` Page

**Files:**
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/Badge.tsx`
- Create: `src/components/ui/Input.tsx`
- Create: `src/components/ui/Textarea.tsx`
- Create: `src/components/ui/Select.tsx`
- Create: `src/components/ui/Checkbox.tsx`
- Create: `src/components/ui/Accordion.tsx`
- Create: `src/components/ui/Modal.tsx`
- Create: `src/components/ui/ProductCard.tsx`
- Create: `src/app/[lang]/style-guide/page.tsx`
- Test: `tests/components.test.tsx`

**Interfaces:**
- Consumes: `useStore`, `ButtonProps`, `BadgeProps`, `ProductCardProps`
- Produces: Reusable UI component library and full interactive `/style-guide` route showing all components in LTR and RTL.

- [ ] **Step 1: Write the failing test for Button variants, Badge styles, and ProductCard rendering**
- [ ] **Step 2: Run test to verify it fails**
- [ ] **Step 3: Implement `Button.tsx` (primary coral `#E8795A`, secondary deep peach `#F9A57B`, ghost, outline) with loading and icon slot**
- [ ] **Step 4: Implement `Badge.tsx` (New, Sale, Sold Out, Sudanese Heritage Craft)**
- [ ] **Step 5: Implement form controls (`Input.tsx`, `Select.tsx`, `Checkbox.tsx`) with accessible WCAG AA contrast**
- [ ] **Step 6: Implement `Accordion.tsx` and `Modal.tsx`**
- [ ] **Step 7: Implement `ProductCard.tsx` with 3:4 portrait image, quick-add, wishlist button, and badge display**
- [ ] **Step 8: Build `src/app/[lang]/style-guide/page.tsx` featuring side-by-side or toggled LTR/RTL design showcase**
- [ ] **Step 9: Run test to verify it passes**
- [ ] **Step 10: Commit**
  ```bash
  git add src/components/ui/ src/app/[lang]/style-guide/ tests/
  git commit -m "feat: create Peach Sorbet UI primitives and interactive LTR/RTL style guide"
  ```

---

### Task 4: Qatar Regulatory Layout Components & Legal Pages

**Files:**
- Create: `src/components/layout/Header.tsx`
- Create: `src/components/layout/AnnouncementBar.tsx`
- Create: `src/components/layout/LegalFooter.tsx`
- Create: `src/components/compliance/CookieBanner.tsx`
- Create: `src/components/common/WhatsAppFloat.tsx`
- Create: `src/data/policies.ts`
- Create: `src/app/[lang]/policies/[slug]/page.tsx`
- Create: `src/app/[lang]/complaints/page.tsx`
- Create: `src/app/[lang]/about/page.tsx`
- Test: `tests/compliance.test.tsx`

**Interfaces:**
- Consumes: `complianceConfig`, `siteConfig`, `policies.ts`
- Produces: Header, Footer with CR and license display, cookie consent banner, policy routes (`returns`, `shipping`, `privacy`, `terms`), and Qatar MOCI consumer complaint form.

- [ ] **Step 1: Write the failing test verifying legal footer renders `[CR_NUMBER]`, `[ECOM_LICENSE_NUMBER]`, and complaint form submission returns a reference number**
- [ ] **Step 2: Run test to verify it fails**
- [ ] **Step 3: Implement `LegalFooter.tsx` with all mandatory Qatar Decision No. 25 of 2026 data points**
- [ ] **Step 4: Implement `Header.tsx` with search, wishlist, cart count, currency selector, and language switcher**
- [ ] **Step 5: Implement `CookieBanner.tsx` and `WhatsAppFloat.tsx` (linking to support inquiry)**
- [ ] **Step 6: Implement bilingual legal content in `src/data/policies.ts` (Returns within 14 days, shipping rules, privacy, terms)**
- [ ] **Step 7: Implement dynamic policy page `src/app/[lang]/policies/[slug]/page.tsx` and `/about/page.tsx`**
- [ ] **Step 8: Implement `src/app/[lang]/complaints/page.tsx` with formal complaint ticket generator**
- [ ] **Step 9: Run test to verify it passes**
- [ ] **Step 10: Commit**
  ```bash
  git add src/components/layout/ src/components/compliance/ src/app/[lang]/policies/ src/app/[lang]/complaints/ tests/
  git commit -m "feat: implement Qatar regulatory footer, legal policy pages, and complaint form"
  ```

---

### Task 5: Seed Catalog & Redesigned Luxury Product Page (`/products/[slug]`)

**Files:**
- Create: `src/data/products.ts`
- Create: `src/components/product/ProductGallery.tsx`
- Create: `src/components/product/StickyPurchasePanel.tsx`
- Create: `src/components/product/SizeGuideModal.tsx`
- Create: `src/components/product/DeliveryEstimator.tsx`
- Create: `src/app/[lang]/products/[slug]/page.tsx`
- Test: `tests/product-page.test.tsx`

**Interfaces:**
- Consumes: `Product` type, `ProductGallery`, `StickyPurchasePanel`
- Produces: Product detail page with zoom gallery on the left, sticky checkout panel on the right, size chart modal, fabric/care accordion, delivery estimator, and WhatsApp item inquiry.

- [ ] **Step 1: Write the failing test verifying product slug route loads product data, sticky panel mounts, and size guide opens**
- [ ] **Step 2: Run test to verify it fails**
- [ ] **Step 3: Define authentic Sudanese seed products in `src/data/products.ts` (Swiss Voile Toub, Silk Jacquard Toub, Linen Dara'a, Kasala Scarf)**
- [ ] **Step 4: Implement `ProductGallery.tsx` with main view, thumbnails, and zoom modal**
- [ ] **Step 5: Implement `StickyPurchasePanel.tsx` with size/color selectors, price, add to cart, and WhatsApp inquiry button**
- [ ] **Step 6: Implement `SizeGuideModal.tsx` with Sudanese toub and dress sizing specifications**
- [ ] **Step 7: Implement `DeliveryEstimator.tsx` with Qatar domestic (24-48 hrs) and GCC schedules**
- [ ] **Step 8: Assemble `src/app/[lang]/products/[slug]/page.tsx` with fabric/care accordion and recommendations**
- [ ] **Step 9: Run test to verify it passes**
- [ ] **Step 10: Commit**
  ```bash
  git add src/data/products.ts src/components/product/ src/app/[lang]/products/ tests/
  git commit -m "feat: build redesigned luxury product page with gallery and sticky purchase panel"
  ```

---

### Task 6: Home Page with Sudanese Heritage Cultural Motifs

**Files:**
- Create: `src/components/common/HennaDivider.tsx`
- Create: `src/components/home/HeroBanner.tsx`
- Create: `src/components/home/CategoryGrid.tsx`
- Create: `src/components/home/HeritageStoryStrip.tsx`
- Create: `src/components/home/CustomerReviews.tsx`
- Create: `src/components/home/NewsletterSection.tsx`
- Create: `src/app/[lang]/page.tsx`
- Test: `tests/home-page.test.tsx`

**Interfaces:**
- Consumes: `ProductCard`, `HennaDivider`, `products.ts`
- Produces: Engaging, high-fashion Home page with bilingual copy, category showcases, best sellers, testimonials, and brand story.

- [ ] **Step 1: Write the failing test for Home page sections rendering**
- [ ] **Step 2: Run test to verify it fails**
- [ ] **Step 3: Create custom SVG henna ornamental divider `HennaDivider.tsx`**
- [ ] **Step 4: Build `HeroBanner.tsx` with large editorial photography, headline, and "Shop Now" CTA**
- [ ] **Step 5: Build `CategoryGrid.tsx` (Toubs, Jalabiyas, Dara'a, Modern Dresses, Accessories)**
- [ ] **Step 6: Build `HeritageStoryStrip.tsx` highlighting authentic Khartoum craftsmanship and Swiss voile**
- [ ] **Step 7: Build `CustomerReviews.tsx` and `NewsletterSection.tsx`**
- [ ] **Step 8: Assemble `src/app/[lang]/page.tsx` with New Arrivals and Best Sellers grids**
- [ ] **Step 9: Run test to verify it passes**
- [ ] **Step 10: Commit**
  ```bash
  git add src/components/home/ src/components/common/HennaDivider.tsx src/app/[lang]/page.tsx tests/
  git commit -m "feat: implement high-fashion Home page with Sudanese heritage motifs"
  ```

---

### Task 7: Shop Catalog with Faceted Filters, Search, and Wishlist

**Files:**
- Create: `src/components/shop/FilterSidebar.tsx`
- Create: `src/components/shop/SortDropdown.tsx`
- Create: `src/components/shop/SearchModal.tsx`
- Create: `src/app/[lang]/shop/page.tsx`
- Create: `src/app/[lang]/wishlist/page.tsx`
- Test: `tests/shop-filter.test.ts`

**Interfaces:**
- Consumes: `products.ts`, `useStore`
- Produces: Shop catalog with filtering (category, fabric, size, price, color) and sorting; live search modal; wishlist page.

- [ ] **Step 1: Write the failing test for filtering products by category and fabric**
- [ ] **Step 2: Run test to verify it fails**
- [ ] **Step 3: Implement `FilterSidebar.tsx` with mobile drawer and desktop sidebar**
- [ ] **Step 4: Implement `SortDropdown.tsx` (Newest, Price Low/High)**
- [ ] **Step 5: Implement `SearchModal.tsx` with instant live search suggestions and keyboard navigation**
- [ ] **Step 6: Implement `src/app/[lang]/shop/page.tsx` and `src/app/[lang]/wishlist/page.tsx`**
- [ ] **Step 7: Run test to verify it passes**
- [ ] **Step 8: Commit**
  ```bash
  git add src/components/shop/ src/app/[lang]/shop/ src/app/[lang]/wishlist/ tests/
  git commit -m "feat: implement shop catalog with faceted filters, live search, and wishlist"
  ```

---

### Task 8: Qatar-Compliant Checkout, Payment Rails (Card, QPay/NAPS, Fawran, COD) & Official Invoice

**Files:**
- Create: `src/lib/payment-gateway.ts`
- Create: `src/components/checkout/AddressFormQatar.tsx`
- Create: `src/components/checkout/PaymentMethodSelector.tsx`
- Create: `src/components/checkout/CostBreakdown.tsx`
- Create: `src/app/[lang]/cart/page.tsx`
- Create: `src/app/[lang]/checkout/page.tsx`
- Create: `src/app/[lang]/orders/[id]/page.tsx`
- Create: `src/app/[lang]/tracking/page.tsx`
- Test: `tests/checkout-invoice.test.ts`

**Interfaces:**
- Consumes: `useStore`, `complianceConfig`, `PaymentGatewayAdapter`
- Produces: Cart page, 4-step Qatar checkout (guest info, Qatar address, payment method with Fawran/QPay/Card/COD, privacy consent), printable commercial invoice with CR number, and order tracking.

- [ ] **Step 1: Write the failing test for checkout price calculation, privacy agreement requirement, and invoice generation**
- [ ] **Step 2: Run test to verify it fails**
- [ ] **Step 3: Implement `payment-gateway.ts` adapter with simulation for Card, QPay/NAPS, and Fawran mobile payment**
- [ ] **Step 4: Implement `AddressFormQatar.tsx` validating Qatar Zone, Street, Building, and Municipality**
- [ ] **Step 5: Implement `PaymentMethodSelector.tsx` and `CostBreakdown.tsx` with transparent delivery itemization**
- [ ] **Step 6: Implement `src/app/[lang]/cart/page.tsx` and `src/app/[lang]/checkout/page.tsx` with privacy policy checkbox**
- [ ] **Step 7: Implement `src/app/[lang]/orders/[id]/page.tsx` with printable commercial invoice containing `[CR_NUMBER]` and `[ECOM_LICENSE_NUMBER]`**
- [ ] **Step 8: Implement `src/app/[lang]/tracking/page.tsx`**
- [ ] **Step 9: Run test to verify it passes**
- [ ] **Step 10: Commit**
  ```bash
  git add src/lib/payment-gateway.ts src/components/checkout/ src/app/[lang]/cart/ src/app/[lang]/checkout/ src/app/[lang]/orders/ src/app/[lang]/tracking/ tests/
  git commit -m "feat: implement Qatar compliant checkout with Fawran, QPay, Card, COD and printable invoice"
  ```

---

### Task 9: Lightweight Admin Dashboard (`/admin`)

**Files:**
- Create: `src/app/[lang]/admin/page.tsx`
- Create: `src/components/admin/OrdersTable.tsx`
- Create: `src/components/admin/ComplaintsTable.tsx`
- Create: `src/components/admin/InventoryManager.tsx`
- Test: `tests/admin.test.tsx`

**Interfaces:**
- Consumes: `useStore`, `complianceConfig`
- Produces: Admin management panel for orders, stock counts, submitted complaints, and compliance settings.

- [ ] **Step 1: Write the failing test for admin order status toggling and inventory stock update**
- [ ] **Step 2: Run test to verify it fails**
- [ ] **Step 3: Implement `OrdersTable.tsx` with filters by payment method (Fawran, QPay, Card, COD) and status**
- [ ] **Step 4: Implement `ComplaintsTable.tsx` allowing viewing and resolving customer complaints**
- [ ] **Step 5: Implement `InventoryManager.tsx` allowing editing product stock and prices**
- [ ] **Step 6: Implement `src/app/[lang]/admin/page.tsx` with tabbed navigation**
- [ ] **Step 7: Run test to verify it passes**
- [ ] **Step 8: Commit**
  ```bash
  git add src/app/[lang]/admin/ src/components/admin/ tests/
  git commit -m "feat: implement lightweight admin dashboard for orders, stock, and complaints"
  ```

---

### Task 10: Full RTL/Accessibility Audit, Verification & Final Delivery

**Files:**
- Modify: `src/styles/globals.css`
- Modify: `src/components/layout/Header.tsx`
- Modify: `src/components/layout/LegalFooter.tsx`
- Test: `tests/accessibility-rtl.test.ts`

**Interfaces:**
- Consumes: All UI components and pages
- Produces: Audited, verified, accessible RTL/LTR implementation with passing tests and clean build.

- [ ] **Step 1: Audit all components for RTL mirroring (directional paddings `ps-`, `pe-`, chevron rotations, Arabic line-heights)**
- [ ] **Step 2: Validate WCAG AA color contrast across all text elements in Peach Sorbet theme**
- [ ] **Step 3: Execute full test suite `npm test` and verify all tests pass**
- [ ] **Step 4: Execute production build `npm run build` to confirm zero lint or TypeScript errors**
- [ ] **Step 5: Commit**
  ```bash
  git add .
  git commit -m "test: complete RTL and accessibility audit with clean production build"
  ```
