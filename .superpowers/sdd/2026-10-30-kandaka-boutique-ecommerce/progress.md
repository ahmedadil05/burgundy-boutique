# SDD ledger — plan: docs/superpowers/plans/2026-10-30-kandaka-boutique-ecommerce.md

Pre-flight: Interfaces check:
- Task 1 produces siteConfig, complianceConfig, Tailwind tokens.
- Task 2 consumes siteConfig; produces getDictionary, formatPrice, useStore.
- Task 3 consumes useStore; produces UI Primitives (Button, Badge, Input, ProductCard) & /style-guide.
- Task 4 consumes complianceConfig, siteConfig, policies; produces Header, LegalFooter, CookieBanner, legal pages, complaint form.
- Task 5 consumes Product types, useStore; produces ProductGallery, StickyPurchasePanel, /products/[slug].
- Task 6 consumes ProductCard, HennaDivider; produces Home page components and /[lang]/page.tsx.
- Task 7 consumes products, useStore; produces /shop, FilterSidebar, SearchModal, /wishlist.
- Task 8 consumes useStore, complianceConfig; produces Qatar payment adapter (Card, QPay, Fawran, COD), checkout, /orders/[id] printable invoice.
- Task 9 consumes useStore, complianceConfig; produces /admin dashboard.
- Task 10 verifies RTL audit, accessibility WCAG AA, full test suite and clean build.
All interfaces align with spec.
