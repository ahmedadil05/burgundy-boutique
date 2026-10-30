# Short Design Document: Mobile-First Admin Dashboard & Product Management

**Date:** 2026-10-30  
**Status:** Approved by Human Partner  
**Scope:** Kandaka Boutique Admin Dashboard (Mobile Phone Optimized)

---

## 1. Intent & User Goal
The shop owner needs to manage Kandaka Boutique entirely from their mobile phone. They must be able to:
- Review high-level sales metrics at a glance.
- View customer orders with customer details, and update delivery status with one tap.
- Add new garments with multiple locally uploaded photos directly from their phone camera or photo library, with automatic client-side canvas compression.
- Configure multiple sizes, colors, and stock counts.
- Delete discontinued products safely with a confirmation dialog.
- Reflect all product additions, edits, and deletions instantly in the public catalog (`/shop`, `/`, and `/products/[slug]`).

---

## 2. Approach Selected
**Approach 1: Unified Mobile-First Console with Slide-over Product Creator & Canvas-Compressed Local Photo Vault**
- Replaces wide desktop tables with touch-friendly mobile cards.
- Client-side canvas image downscaling to ~1000px width JPEG to ensure high-resolution phone camera photos fit smoothly in local storage.
- Synchronized product store using `kandaka_products` in localStorage with initial fallback to seed data.

---

## 3. Key Components & Interfaces
1. `SalesSummaryCards.tsx`: Displays Revenue (QAR), Total Orders, AOV (QAR), and Payment Rail distribution (Fawran, QPay, Card, COD).
2. `MobileOrdersList.tsx`: Phone-optimized order cards with customer name, phone click-to-call, address, item list, and instant status dropdown (*Confirmed*, *Processing*, *Shipped*, *Delivered*).
3. `AddProductDrawer.tsx`: Slide-over/modal form with:
   - Local photo file/camera input (`accept="image/*" multiple`) with instant preview and remove button.
   - Bilingual title & fabric inputs.
   - Category selector.
   - Price in QAR & optional original price.
   - Multi-size selector (Free Size, S, M, L, XL).
   - Color adder (hex picker + name).
   - Stock counter.
4. `MobileProductList.tsx`: Inventory card list with stock modifier, edit trigger, and delete confirmation modal.
5. Unified catalog state hook (`useCatalog` or updated `store.tsx`) to propagate product changes to the live store.
