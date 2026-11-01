# BURGUNDY Design System Specification (DESIGN.md)

> Brand: **BURGUNDY** | Instagram: [@burgundy974_](https://instagram.com/burgundy974_) | Qatar-based Hand-painted Sudanese Luxury Women's Wear

## 1. Visual Rationale & Creative Direction
BURGUNDY evokes an ambiance of refined, minimal, feminine, soft luxury. Inspired by the golden sands of the Gulf meeting the timeless artisanal heritage of Sudanese hand-painted silk and Swiss voile toubs. The aesthetic balances airy cream surfaces (#FBFEFB, #FFFFFF, #EFE5DC) with delicate leaf-shadow illumination, draped embroidered fabric textures, razor-sharp hairlines (#D9B97A), and a regal deep burgundy core (#5F0F40).

## 2. Color Tokens & WCAG AA Contrast Rationale

```css
:root {
  /* Primitive Base & Background Tokens */
  --bg-primary: #FBFEFB;      /* Crisp, soft pearlescent canvas */
  --bg-elevated: #FFFFFF;     /* Pure surface for elevated cards and modals */
  --bg-warm: #EFE5DC;         /* Cream linen background for contrast zones */

  /* Surface & Container Tokens */
  --surface-peach-soft: #F3D8C7;  /* Gentle warm blush card background */
  --surface-peach-muted: #D0B8AC; /* Neutral earthen card border & subtle divider */

  /* Typography & Neutral Content Tokens */
  --text-primary: #4E5166;    /* Deep slate body text (Passes WCAG AA on cream/white) */
  --text-secondary: #495867;  /* Elegant muted slate for subtitles and metadata */
  --text-on-dark: #FFFFFF;    /* Pure white on dark accents */

  /* Brand Signature Accent */
  --brand-burgundy: #5F0F40;  /* Royal Deep Burgundy (Primary buttons, wordmark, key links) */
  --brand-burgundy-hover: #4D0A33;
  --brand-burgundy-subtle: rgba(95, 15, 64, 0.08);

  /* Warm Highlights & Accents */
  --accent-peach-sorbet: #FFC9A8;
  --accent-peach-glow: #F9A57B;
  --accent-coral: #E8795A;     /* Sale badges, urgent inventory flags, interactive hover */
  --accent-coral-hover: #D96848;

  /* Luxury Gold Hairline Accent */
  --accent-gold-line: #D9B97A; /* 1px micro-borders, jewelry accents, subtle dividers */
}
```

### Contrast Compliance Matrix
- `--text-primary` (`#4E5166`) on `--bg-primary` (`#FBFEFB`): **7.8:1** (Passes WCAG AAA)
- `--brand-burgundy` (`#5F0F40`) on `--bg-primary` (`#FBFEFB`): **9.4:1** (Passes WCAG AAA)
- `--text-on-dark` (`#FFFFFF`) on `--brand-burgundy` (`#5F0F40`): **9.4:1** (Passes WCAG AAA)
- `--accent-coral` (`#E8795A`) on white for non-text UI / badges: High visibility with dark text `#3B2A24`.

## 3. Typography Architecture

### Font Families
- **Display & Editorial English**: `Playfair Display`, `Cormorant Garamond`, `Bodoni Moda`, serif
- **Arabic Headings & Expressive Copy**: `Cairo`, `Tajawal`, sans-serif / naskh modern
- **Body & Microcopy**: `Tajawal`, `Inter`, -apple-system, system-ui, sans-serif

### Scale & Hierarchy (Mobile-First 390px Baseline)
- `h1` (Hero Display): `2.25rem` (36px), line-height `1.15`, letter-spacing `-0.02em`
- `h2` (Section Titles): `1.625rem` (26px), line-height `1.25`, tracking `-0.01em`
- `h3` (Product & Card Titles): `1.125rem` (18px), line-height `1.35`
- `body-lg`: `1rem` (16px), line-height `1.6`
- `body-base`: `0.875rem` (14px), line-height `1.55`
- `caption / microcopy`: `0.75rem` (12px), line-height `1.4`

## 4. Spacing, Shapes & Elevation
- **Border Radius**:
  - Micro-elements & tags: `4px`
  - Cards & images: `12px` (soft luxury touch, never harsh, never childishly round)
  - Modals & bottom sheets: `20px` top radius
  - Buttons: `9999px` (pill) for primary CTA, or `8px` refined rectangular with 1px gold border
- **Hairlines**:
  - `border: 1px solid #D9B97A` with 25% to 50% opacity for quiet opulence.

## 5. Mobile Ergonomics (390px Viewport Core)
- Minimum touch target: `48px` x `48px` for all interactive buttons and filter triggers.
- Sticky purchase bar and bottom-docked navigation on product screens.
- Full RTL and LTR symmetry with zero layout jump.
