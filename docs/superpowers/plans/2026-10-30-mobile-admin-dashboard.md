# Mobile-First Admin Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a mobile-optimized admin dashboard allowing the shop owner on a phone to add products with locally uploaded photos, sizes, colors, and stock; delete products with confirmation; view and update order status via mobile cards; and view an executive sales summary with payment rail metrics.

**Architecture:** Client-side canvas image downscaler for local phone camera photos, localStorage-synchronized catalog state (`kandaka_products`), mobile card UI components, and integrated sales KPI analytics.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS, Lucide React, HTML5 Canvas API.

**Spec:** [`docs/superpowers/specs/2026-10-30-mobile-admin-dashboard-design.md`](file:///C:/Users/ahmed/kandaka-boutique/docs/superpowers/specs/2026-10-30-mobile-admin-dashboard-design.md)

## Global Constraints
- Easy to use on a phone: Large touch targets (min 44x44px), card layouts instead of wide tables, mobile drawer for product creation.
- Local photo upload: Files uploaded from phone camera/gallery must be compressed client-side before storing to avoid browser quota limits.
- Prime currency: All sales figures and prices are formatted in QAR.
- Bilingual support: Supports Arabic (RTL) and English (LTR).

## Review Focus
1. Canvas downscaling efficiency: Photos taken by phone cameras (often 5-15MB) must compress into lightweight JPEG data URLs (~100-250KB).
2. Product Deletion Safety: Deleting a product must prompt with a confirmation modal before removing from the catalog.
3. Multi-image Support: Shop owner can upload multiple photos and remove individual photos before saving.
4. Live Catalog Propagation: When a product is added or deleted in `/admin`, `/shop` and Home page reflect the change immediately.
5. Mobile Order Card Accessibility: Order status updates work seamlessly via thumb taps.

---

### Task 1: Local Image Compressor & Client Catalog State Engine

**Files:**
- Create: `src/lib/image-utils.ts`
- Create: `src/lib/catalog-store.tsx`
- Test: `tests/image-compressor-catalog.test.ts`

**Interfaces:**
- Produces: `compressImageFile(file: File, maxWidth?: number): Promise<string>`, `useCatalogStore()` (`products`, `addProduct`, `updateProduct`, `deleteProduct`, `updateStock`).

- [ ] **Step 1: Write failing test for image compression and catalog state management**
- [ ] **Step 2: Run test to verify it fails**
- [ ] **Step 3: Implement `src/lib/image-utils.ts` with canvas compression**
- [ ] **Step 4: Implement `src/lib/catalog-store.tsx` with localStorage synchronization and seed fallback**
- [ ] **Step 5: Run test to verify it passes**
- [ ] **Step 6: Commit**

---

### Task 2: Mobile Sales Summary & Mobile Orders List Components

**Files:**
- Create: `src/components/admin/SalesSummaryCards.tsx`
- Create: `src/components/admin/MobileOrdersList.tsx`
- Test: `tests/admin-mobile-orders.test.tsx`

**Interfaces:**
- Consumes: `OrderRow` from `OrdersTable.tsx`, `formatPrice`
- Produces: `SalesSummaryCards` (Revenue, Orders, AOV, Payment rails), `MobileOrdersList` (touch cards with one-tap status updates).

- [ ] **Step 1: Write failing test for SalesSummaryCards and MobileOrdersList rendering**
- [ ] **Step 2: Run test to verify it fails**
- [ ] **Step 3: Implement `SalesSummaryCards.tsx` with mobile metric cards and payment rail badges**
- [ ] **Step 4: Implement `MobileOrdersList.tsx` with customer call button and status selector**
- [ ] **Step 5: Run test to verify it passes**
- [ ] **Step 6: Commit**

---

### Task 3: Phone-Optimized Product Creation Drawer & Management List

**Files:**
- Create: `src/components/admin/AddProductDrawer.tsx`
- Create: `src/components/admin/MobileProductList.tsx`
- Test: `tests/admin-product-management.test.tsx`

**Interfaces:**
- Consumes: `useCatalogStore`, `compressImageFile`
- Produces: `AddProductDrawer` (multi-image local upload, sizes, colors, stock, bilingual inputs) and `MobileProductList` (stock stepper, delete confirmation).

- [ ] **Step 1: Write failing test for AddProductDrawer and MobileProductList**
- [ ] **Step 2: Run test to verify it fails**
- [ ] **Step 3: Implement `AddProductDrawer.tsx` with local camera/photo picker and instant previews**
- [ ] **Step 4: Implement `MobileProductList.tsx` with delete confirmation modal and stock adjuster**
- [ ] **Step 5: Run test to verify it passes**
- [ ] **Step 6: Commit**

---

### Task 4: Assemble Mobile Admin Dashboard & Catalog Sync Verification

**Files:**
- Modify: `src/app/[lang]/admin/page.tsx`
- Modify: `src/app/[lang]/shop/page.tsx`
- Modify: `src/app/[lang]/page.tsx`
- Modify: `src/app/[lang]/layout.tsx`
- Test: `tests/admin.test.tsx`

**Interfaces:**
- Consumes: `SalesSummaryCards`, `MobileOrdersList`, `AddProductDrawer`, `MobileProductList`, `useCatalogStore`
- Produces: Complete phone-friendly admin console at `/admin` and synchronized live store.

- [ ] **Step 1: Update `src/app/[lang]/admin/page.tsx` with mobile pill navigation and floating add button**
- [ ] **Step 2: Update `/shop` and `/` to consume `useCatalogStore`**
- [ ] **Step 3: Run full vitest suite `npm test` and verify all tests pass**
- [ ] **Step 4: Run `npm run build` to verify clean production build**
- [ ] **Step 5: Commit**
