# BURGUNDY (بيرغندي) — Luxury Hand-Painted Apparel
### Qatar E-Commerce Platform | MOCI Compliant

Official e-commerce and pre-launch web platform for **BURGUNDY** (Instagram: [`@burgundy974_`](https://instagram.com/burgundy974_)), a Doha-based boutique specializing in bespoke hand-painted Sudanese women's wear (royal toubs, tailored linen jalabiyas, artisanal scarves, and bridal daraas).

---

## 🎨 Three-Line Design Summary
> **Warm cream and draped embroidered fabrics bathed in soft leaf-shadow light establish a serene, tactile feminine sanctuary.**  
> **A high-contrast velvet burgundy (`#5F0F40`) wordmark paired with delicate gold hairlines (`#D9B97A`) and peach sorbet touches conveys understated Gulf luxury.**  
> **Mobile-first 390px ergonomics with fluid Arabic-first RTL typography and purposeful transform parallax deliver an intuitive, poetic shopping experience.**

---

## 🚀 Key Features

### 1. Pre-Launch Teaser & Live Mode Toggle
- **"Something's on the Horizon – Stay Tuned" (شيءٌ استثنائي يلوح في الأفق):** Pre-launch mode features the verified brand teaser visual, leaf shadows, WhatsApp VIP direct link, and email waitlist.
- **Instant Admin Toggle:** The owner flips between Pre-Launch and Full Live Storefront with one tap in the Admin Settings tab without touching code or redeploying.

### 2. Hand-Painted Sudanese Collection & "Behind the Brush"
- Curated categories: Royal Swiss Voile Toubs (توب توتال سويسري), Hand-Painted Silk Toubs (حرير طبيعي مشغول باليد), Tailored Linen Jalabiyas (جلابيات كتان رسم يدوي), and Pure Silk Scarves (شيلان حريرية).
- **Artisanal Storytelling:** "Behind the Brush" (وراء الريشة) highlights natural pigments, delicate textile painting, and Sudanese cultural heritage.
- **Garment Specifications:** Free-size dimensions (4.5m length × 110cm width), drape guides, fabric care instructions, and made-to-order lead time indicators (7–14 days).
- **Client Sample Cleansing:** Pre-seeded items are clearly tagged as `[عينة تجريبية / Demo Sample]`. A single "Remove All Samples" button in the admin clears all seed products before launch.

### 3. Qatar E-Commerce & Ministry Compliance (MOCI)
- Verified CR Number (`CR-189420-QA`) and E-Commerce License (`ECOM-2026-974`) displayed in the persistent footer, checkout, and invoices.
- Full consumer disclosure: Total cost breakdown in QAR, delivery estimator (1–2 days Doha, 2–3 days Al Rayyan/Al Wakrah/Al Khor), return/exchange terms, privacy policy, and consumer complaint handling.
- Consent banners and minimal, secure data collection.

### 4. Qatar Payment Rails & Sequential Bilingual Tax Invoices
- Swappable gateway adapter supporting:
  - **Credit / Debit Cards** (Visa, Mastercard)
  - **QPay / NAPS** (Qatar National ATM & Debit Card Gateway)
  - **Fawran** (Qatar Central Bank Instant Mobile Payment via mobile number / alias)
  - **Direct Bank Wire Transfer** (QNB with receipt slip upload & admin verification workflow)
- **Sequential Invoicing:** Automated `INV-2026-XXXX` generation with printable A4/mobile PDF view, embedded QR code verification, Arabic/English bilingual layouts, and downloadable receipts.

### 5. Sponsored Advertising Engine & Inbound CRM
- **Non-Intrusive Sponsored Spaces:** Home banner, shop grid insertion (every 6th item), and footer strip clearly labelled with "Sponsored" / "إعلان ممول" tags.
- **Live Ad Analytics:** Automatic impression (view) and outbound click counter for advertisers.
- **Inbound CRM Pipeline:** Public Bespoke Commissioning form (`/custom-order`) and Advertising Enquiry form (`/advertise`) stream directly into the Admin CRM with status management, notes, tags, and CSV export.

### 6. Mobile-First Admin Operations Hub
- Designed for 390px smartphone screens (compact swipeable order cards, single-tap status progression).
- Direct phone camera photo upload with client-side canvas compression (<250KB JPEG).
- Central settings editor for store metadata, CR/License numbers, brand color, and tax rates.
- Instant alert simulators for Telegram Bot (with interactive approve/ship quick actions) and WhatsApp Cloud API.

---

## 🛠️ Specialized Agent Skills Available & Implemented

| Skill Name | Location / Specification | Role in Project |
| :--- | :--- | :--- |
| **`design-taste-frontend`** | Built-in / Rules | Curated soft-luxury aesthetics, custom typography pairs, avoiding generic purple/Inter tropes. |
| **`impeccable` & `ui-ux-pro-max`** | Built-in / Rules | Responsive mobile micro-interactions, WCAG AAA contrast audits, polished touch targets. |
| **`diagram-design`** | Built-in / Rules | Mermaid system architecture, order state machine, and data models in `docs/ARCHITECTURE.md`. |
| **`qatar-payments`** | `~/.agents/skills/qatar-payments` | Swappable adapter for Qatar payment rails (QPay, Fawran, Cards, Bank Wire with slip upload). |
| **`invoice-pdf-generator`** | `~/.agents/skills/invoice-pdf-generator` | Sequential bilingual RTL/LTR tax invoices (`INV-YYYY-XXXX`) compliant with Qatar MOCI rules. |
| **`arabic-rtl-typography`** | `~/.agents/skills/arabic-rtl-typography` | High-contrast Bodoni serif wordmark, Amiri Naskh typography for Arabic, full bidirectional layouts. |
| **`telegram-whatsapp-notifications`** | `~/.agents/skills/telegram-whatsapp-notifications`| Immediate Telegram push with inline approval buttons; WhatsApp Cloud API templates under feature flag. |
| **`email-notifications`** | `~/.agents/skills/email-notifications` | Transactional bilingual email templates for orders, receipts, and order tracking. |

---

## 📐 Color Tokens (WCAG AAA Contrast Verified)

| Token Name | Hex Code | Purpose |
| :--- | :--- | :--- |
| `cream-base` | `#FBFEFB` | Primary body background (soft morning light) |
| `cream-pure` | `#FFFFFF` | Card surfaces & modal backdrops |
| `cream-subtle` | `#EFE5DC` | Section alternating backgrounds & divider lines |
| `blush-surface` | `#F3D8C7` | Soft card fills & badge backgrounds |
| `taupe-accent` | `#D0B8AC` | Subdued borders & placeholder frames |
| `cocoa-dark` | `#4E5166` | Primary body text (contrast ratio > 7.1:1 on cream) |
| `cocoa-muted` | `#495867` | Secondary text & metadata captions |
| `burgundy` | `#5F0F40` | Primary brand accent, wordmark, CTA buttons |
| `burgundy-deep` | `#421417` | Velvet shadow & active button state |
| `peach-soft` | `#FFC9A8` | Soft highlights & filter chips |
| `peach-deep` | `#F9A57B` | Secondary badges & active borders |
| `coral-warm` | `#E8795A` | Sale tags, hover accents, and alerts |
| `gold-line` | `#D9B97A` | Luxury gold hairlines & embroidery motifs |

---

## 🔐 Admin Dashboard Access

- **Direct URL:** `http://localhost:3000/ar/admin` (or `/en/admin`)
- **Owner PIN:** set `ADMIN_SECRET_PIN` in `.env.local` (see `.env.example`; the app **refuses to boot in production without it** and ships no usable default).
- **Roles Supported:** Owner (full privileges including launch toggle and data purging) & Staff (order updates, CRM follow-ups).

---

## 💻 Quick Start & Local Development

### Prerequisites
- Node.js 18+ (tested on Node v24.20.0)
- npm 9+

### Installation & Run
```bash
# 1. Navigate to the project directory
cd kandaka-boutique

# 2. Install dependencies
npm install

# 3. Run unit & integration test suite (54 tests)
npm test

# 4. Build for production
npm run build

# 5. Start production server
npm run start
```
The website will be live at `http://localhost:3000` (defaults to Arabic RTL `/ar`, switcher toggles to English `/en`).

---

## 🧪 Verification & Testing Suite

All 16 test suites (54 tests) run via Vitest:
```bash
npm test
```
Tests verify:
1. Brand identity, teaser visibility, and waitlist signup (`tests/burgundy-brand-and-teaser.test.tsx`)
2. Qatar payment rails, Fawran, bank wire receipts, and Bank Wire verification (`tests/checkout-invoice.test.ts`)
3. Sequential invoice PDF generation and bilingual layout (`tests/invoice-pdf-and-payments.test.tsx`)
4. Mobile-first admin order management and status transitions (`tests/admin-mobile-orders.test.tsx`)
5. Phone camera image compression and stock sync (`tests/image-compressor-catalog.test.ts`)
6. RTL typography and WCAG accessibility standards (`tests/accessibility-rtl.test.ts`)
7. Sponsored advertising views/clicks and CRM lead pipelines (`tests/advertising-and-crm.test.tsx`)
8. Qatar MOCI legal compliance disclosures (`tests/compliance.test.tsx`)

---

## 📦 Production Deployment Checklist

1. **Staging / Vercel Deployment:** Run `npm run build` or deploy directory to Vercel / Cloudflare Pages / Node.js container.
2. **Domain Configuration:** Point `.qa` or `.com.qa` licensed domain.
3. **Payment Credentials:** Populate `PAYMENT_GATEWAY_PROVIDER` and gateway API tokens in `.env`.
4. **Purge Seed Data:** Log in to Admin (`/ar/admin` — PIN from `ADMIN_SECRET_PIN`), navigate to **Products**, and click **"حذف العينات التجريبية" (Remove Sample Products)** before entering live inventory.
5. **Launch Flip:** When client approves public launch, switch **"وضع إطلاق المتجر" (Store Launch Mode)** from ON to OFF in the Admin **Settings** tab.

---
**BURGUNDY TRADING W.L.L. (شركة بيرغندي للتجارة ذ.م.م)**  
Doha, State of Qatar | CR: `CR-189420-QA` | License: `ECOM-2026-974` | Instagram: `@burgundy974_`
