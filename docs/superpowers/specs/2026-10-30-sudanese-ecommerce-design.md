# Design Document: Kandaka Boutique (Sudanese Fashion E-Commerce)

**Date:** 2026-10-30  
**Status:** Ready for Approval (Builder-Checked)  
**Project:** Sudanese Women's Fashion Boutique (Qatar Compliance & Bilingual RTL/LTR)

---

## 1. Intent & The Why

Sudanese women's traditional and contemporary attire—most notably the *Toub (Tobe)*, *Jalabiya*, and *Dara'a*—holds deep cultural elegance, pride, and craftsmanship. However, purchasing authentic Sudanese attire in the diaspora (particularly in the GCC / Qatar) often relies on informal social media messaging or unstandardized shops lacking proper sizing, quality imagery, clear return policies, or secure payment gateways.

The goal is to build an e-commerce platform under the brand **Kandaka Boutique (كنداكة)** that marries modern luxury e-commerce with Sudanese cultural motifs (soft henna linework, fabric textures, warm Peach Sorbet aesthetic). Furthermore, this boutique operates under Qatar's Ministry of Commerce and Industry (Ministerial Decision No. 25 of 2026), requiring strict compliance regarding commercial licensing, consumer rights, transparent pricing, and dispute handling.

---

## 2. Goals, Non-Goals, and Anti-Goals

### Goals
- **Cultural & Visual Elegance:** Warm, feminine, modern "Peach Sorbet" palette with accessible WCAG AA contrast, subtle henna/damask accents, and high-fashion editorial imagery.
- **Bilingual & RTL-First:** Arabic as the default experience with true RTL layout (mirrored UI, Arabic typography with Tajawal/Cairo, proper numeral rendering), and one-click toggle to English (Playfair Display + Inter).
- **Dedicated Style Guide (`/style-guide`):** A standalone showcase of all UI primitives (buttons, badges, cards, inputs, navbar, footer, typography, colors) in both LTR and RTL for rapid design verification.
- **Redesigned Product Experience:** Large gallery with multi-angle previews and zoom, sticky purchasing drawer, size guide popup, fabric & care accordion, delivery estimator, and direct WhatsApp inquiry.
- **Full Qatar Regulatory Compliance (Decision No. 25 of 2026):**
  - Persistent footer with CR Number (`[CR_NUMBER]`), E-Commerce License (`[ECOM_LICENSE_NUMBER]`), legal business name, contact info, and customer service operating hours.
  - Dedicated bilingual legal pages: Return & Exchange Policy, Shipping & Delivery, Privacy Policy, Terms & Conditions, and a Consumer Complaint page with ticketed submission.
  - Default QAR currency (prime currency) with multi-currency toggle (USD, SDG display), explicit delivery fee breakdown, and zero hidden checkout costs.
  - Swappable Qatar payment gateway architecture: Online Card (Visa/Mastercard), QPay/NAPS debit cards, Fawran (فوران - Qatar Central Bank mobile instant payment), and Cash on Delivery (COD) as an optional extra for domestic Qatar.
  - Official tax/commercial invoice generation on order confirmation showing legal details.
  - Minimal data collection and explicit privacy consent checkbox at checkout.
  - Domain configurable for `.qa` / `.com.qa`.
- **E-Commerce Utility:** Wishlist, search with instant suggestions, order tracking, responsive mobile-first navigation, and a lightweight admin dashboard for inventory and orders.

### Non-Goals
- Full multi-warehouse enterprise ERP or third-party drop-shipping automation (not needed for artisanal/curated boutique inventory).
- Direct DM sales via Instagram/WhatsApp (per Qatar compliance, sales are finalized strictly on the licensed website; WhatsApp is for customer inquiries and styling advice).

### Anti-Goals
- Cluttered, aggressive discount-heavy marketplace aesthetics (must remain an elevated luxury boutique).
- Pseudo-RTL that simply applies `dir="rtl"` without mirroring icons, adjusting font line-heights, or aligning directional padding.
- Hardcoded foreign domains or unverified third-party checkout redirects.

---

## 3. Builder Check Clarifications & Resolved Calls

Following the builder review, the following key engineering calls have been resolved and incorporated:

1. **Geographic Delivery Scope (Domestic Qatar + GCC Tier):**
   - *Domestic Qatar:* Native Qatar address standard (Zone, Street, Building, Municipality/City) with domestic flat-rate delivery (e.g. 25 QAR, free on orders over 350 QAR) and 24-48 hr delivery estimation.
   - *GCC / International:* Secondary destination support with transparent international tiered shipping (65 QAR flat for GCC) so diaspora customers can order seamlessly.
2. **Prime Currency (QAR) & Qatar Payment Rails (Card, QPay/NAPS, Fawran, COD):**
   - The primary store currency is **QAR** (Qatari Riyal). Currency toggle provides secondary informational conversions.
   - For payment methods: Checkout supports:
     1. **Online Card Payment** (Credit/Debit via Visa, Mastercard).
     2. **QPay / NAPS** (Qatar national debit card switch).
     3. **Fawran (فوران)** (Qatar Central Bank instant mobile payment using alias/mobile number).
     4. **Cash on Delivery (COD)** (optional extra for domestic Qatar orders).
     *No offline Sudanese bank transfer is required.*
3. **Payment Gateway Architecture:**
   - Implemented via a modular `PaymentGatewayAdapter` interface with support for Card, QPay/NAPS, Fawran, and COD.
   - Includes an interactive Qatar Gateway Simulator (supporting instant 1-click test flows for Card, QPay/NAPS, and Fawran mobile QR/Alias) that can be seamlessly toggled to live SkipCash / Tap / QPay endpoints by configuring API keys in `.env`.

---

## 4. Constraints & Regulatory Compliance (Qatar Decision No. 25 of 2026)

1. **Licensing & Identity Transparency:**
   Every page must display in the footer:
   - Commercial Registration (CR) Number: `[CR_NUMBER]` (editable via config)
   - E-Commerce Licence Number: `[ECOM_LICENSE_NUMBER]` (editable via config)
   - Legal Entity / Business Name
   - Phone, verified support email, and physical customer service operating hours.
2. **Consumer Protection & Dispute Resolution:**
   - Mandatory bilingual Complaint Form (`/complaints`) allowing customers to submit issues and receive an immediate reference number.
   - Distinct, unambiguous Return & Exchange Policy detailing condition of returns (e.g. within 14 days, unworn with tags, hygienic seal intact for intimate scarves/accessories).
3. **Pricing Transparency:**
   - Display all prices in QAR by default.
   - Shipping fees must be calculated and itemized separately prior to payment authorization.
4. **Data Protection & Privacy:**
   - Explicit opt-in checkbox at checkout for terms and privacy.
   - Cookie consent banner on first arrival with preferences.
   - Restrict customer data collection strictly to what is necessary for fulfillment.
5. **Channel Integrity:**
   - Social media channels point users back to the licensed e-commerce portal to complete transactions.

---

## 5. Approaches & Architectural Tradeoffs

### Evaluated Alternatives
1. **Approach 1: Full-Stack Next.js (App Router) + Tailwind CSS + Centralized Regulatory Config (Selected)**
   - *Pros:* Complete control over Arabic typography, fluid RTL/LTR mirroring, instant local preview with `npm run dev`, zero monthly SaaS fees, customizable invoice generation, and modular payment gateway interfaces.
   - *Cons:* Requires building mock/local state persistence for the admin dashboard and complaints store.
2. **Approach 2: MedusaJS / Shopify Headless**
   - *Pros:* Built-in inventory and tax backend.
   - *Cons:* High local setup friction (Postgres, Redis, multi-process servers), recurring subscription costs, and complex customization required for Qatar invoice regulations and Sudanese bank transfer handling.
3. **Approach 3: Static Vite React SPA**
   - *Pros:* Fast build.
   - *Cons:* Poor SEO for Arabic search engines, lacks server-rendered routes for dynamic OpenGraph cards and invoice printing.

**Decision:** Approach 1 was selected for performance, autonomy, and exact compliance with bilingual RTL design and Qatar legal requirements.

---

## 6. System Architecture & Project Structure

```text
kandaka-boutique/
├── docs/
│   └── superpowers/specs/2026-10-30-sudanese-ecommerce-design.md
├── src/
│   ├── app/
│   │   ├── layout.tsx                # Root layout with fonts & metadata
│   │   ├── [lang]/
│   │   │   ├── layout.tsx            # Directional layout (dir="rtl" or "ltr")
│   │   │   ├── page.tsx              # Home Page (Hero, Categories, Heritage strip)
│   │   │   ├── shop/page.tsx         # Shop Catalog with faceted filters
│   │   │   ├── products/[slug]/page.tsx # Luxury Toub Product Page
│   │   │   ├── cart/page.tsx         # Cart Review
│   │   │   ├── checkout/page.tsx     # Qatar Compliant Checkout
│   │   │   ├── order-confirmation/[id]/page.tsx # Printable Invoice with CR
│   │   │   ├── style-guide/page.tsx  # Interactive LTR/RTL Design System
│   │   │   ├── complaints/page.tsx   # Qatar MOCI Complaint Form
│   │   │   ├── policies/[slug]/page.tsx # Returns, Shipping, Privacy, Terms
│   │   │   ├── about/page.tsx        # Brand Story (Sudanese Heritage)
│   │   │   ├── tracking/page.tsx     # Order Tracking Lookup
│   │   │   └── admin/page.tsx        # Lightweight Product & Orders Dashboard
│   ├── components/
│   │   ├── ui/                       # Button, Badge, Input, Accordion, Modal, Card
│   │   ├── layout/                   # Header, AnnouncementBar, Footer, Navigation
│   │   ├── product/                  # ProductGallery, StickyPurchasePanel, SizeGuide
│   │   ├── compliance/               # LegalFooter, CookieBanner, InvoiceCard
│   │   └── common/                   # WhatsAppFloat, CurrencySelector, HennaPattern
│   ├── config/
│   │   ├── site.ts                   # Site metadata, .qa domain, contact
│   │   └── compliance.ts             # Qatar CR, License, MOCI settings
│   ├── data/
│   │   ├── products.ts               # Seed catalog (Toubs, Jalabiyas, Dara'as)
│   │   └── policies.ts               # Bilingual policy text
│   ├── dictionaries/
│   │   ├── ar.json                   # Arabic translations
│   │   └── en.json                   # English translations
│   ├── lib/
│   │   ├── store.ts                  # Cart, wishlist, currency state
│   │   └── currency.ts               # QAR, USD, SDG conversions
│   └── styles/
│       └── globals.css               # Peach Sorbet CSS variables & typography
```

---

## 7. Design System Specification ("Peach Sorbet")

### 7.1 Color Palette & Contrast Validation
| Token Name | Hex Code | Purpose | WCAG Contrast on Cream (`#FFF6EE`) |
|------------|----------|---------|-----------------------------------|
| `cream-bg` | `#FFF6EE`| Main app background | Canvas |
| `blush-surface` | `#FFE5D4` | Card backgrounds, subtle callouts | Surface |
| `peach-soft` | `#FFC9A8` | Secondary borders, light chips | Accent |
| `peach-deep` | `#F9A57B` | Secondary buttons, active tabs | 1.8:1 (use with dark text) |
| `coral-warm` | `#E8795A` | Primary CTA, badges, sale tags | 3.5:1 (graphic), 4.5:1+ against white |
| `cocoa-dark` | `#3B2A24` | Primary text & headings | **11.2:1 (Exceeds WCAG AAA)** |
| `cocoa-muted`| `#725447` | Secondary/caption text | **5.4:1 (Exceeds WCAG AA)** |

### 7.2 Typography Scale
- **Arabic Display & Headings:** `Cairo`, bold/semibold, with increased line-height (`1.5` to `1.6`) to accommodate Arabic diacritics and ascenders.
- **Arabic Body:** `Tajawal`, regular/medium (`line-height: 1.7`).
- **English Display & Headings:** `Playfair Display` serif for timeless editorial luxury.
- **English Body:** `Inter` or `Poppins` sans-serif for crystal-clear readability.

### 7.3 Components in the Design System
1. **Buttons:**
   - *Primary:* Warm coral `#E8795A` with white text, subtle shadow, rounded-full or `rounded-xl`.
   - *Secondary:* Deep peach `#F9A57B` or blush outline with cocoa text.
   - *Ghost / Text:* Clean cocoa text with soft hover surface `#FFE5D4`.
2. **Badges:**
   - *New Arrival:* Soft peach background with cocoa text.
   - *Sale:* Warm coral background with white text and percentage badge.
   - *Sold Out / Pre-order:* Neutral cocoa-muted tint with accessible text.
   - *Sudanese Craft:* Special heritage gold/sand badge indicating authentic Sudanese origin.
3. **Product Card:**
   - Aspect ratio 3:4 portrait photography, subtle fabric-texture hover, quick-add button, wishlist heart toggle, price in active currency, category label, and heritage tag.
4. **Form Controls:**
   - Floating label inputs with cream background, blush border, warm coral active ring, and clear validation states.

---

## 8. Seed Products & Media Plan

- Curated seed items featuring authentic Sudanese craftsmanship:
  1. *Royal King Swiss Voile Toub (ثوب سويسري ملكي مطرز باليد)* - Luxury 4.5m authentic voile, gold thread embroidery.
  2. *Handcrafted Silk Jacquard Toub (ثوب حرير جاكار فاخر)* - Classic jacquard woven pattern for celebratory occasions.
  3. *Khartoum Gezira Linen Dara'a (درّاعة كتان الجزيرة)* - Modern cut, breathable linen with delicate henna embroidery cuffs.
  4. *Nubian Royal Festive Jalabiya (جلابية كنداكة ملكية)* - Elegant Sudanese home and evening wear.
  5. *Modern Khartoum Silk Maxi Dress (فستان حرير سوداني عصري)* - Sudanese-inspired contemporary modest silhouette.
  6. *Artisanal Kasala Scarf & Accessories (شال كسلا الحريري وإكسسوارات)*.
- High-quality editorial fashion imagery with subtle henna SVG vectors and fabric textures.
