# Security Notes — BURGUNDY Boutique

This file documents the security model for the reference deployment and how to harden it before production.

## Secrets & credentials

- `ADMIN_SECRET_PIN` and `ADMIN_SESSION_SECRET` **must be set in production** — the server throws on boot otherwise (no usable defaults, see `src/lib/server/auth/session.ts`).
- `.env*.local` is gitignored. `.env.example` ships placeholders only.
- Admin sessions: HMAC-signed token (SHA-256), `httpOnly` cookie, `sameSite=strict`, `secure` in production, 24h expiry. Login is rate-limited per IP (5 attempts / 5 min) **and** globally (20 attempts / 10 min) so rotating `x-forwarded-for` cannot help an attacker.

## Proxy & IP forwarding

- `x-forwarded-for`/`x-real-ip` are honoured **only** when `TRUST_PROXY_HEADERS=true` is set, i.e. behind a proxy/CDN that strips or overwrites client-supplied forwarding headers. Otherwise the limiter groups all traffic into one bucket (fail-closed). Set `TRUST_PROXY_HEADERS=true` only after confirming your proxy does this.

## Data protection

- Public order tracking (`GET /api/orders/[orderNumber]`) requires the **phone number used at checkout** (`?phone=…`) and rate-limits per IP (20 req/min). Without a match it behaves as if the order does not exist. Order numbers are never enumerated for PII.
- The tracker masks the phone (`+974 **** 1111`) and omits street addresses.
- Order creation (`POST /api/orders`): catalog pricing is always server-side (client prices are ignored), quantities are bounded (integers 1–99), payment rails are whitelisted, and unknown products are rejected. A 64 KB body cap and a 10-orders/10-minute per-IP limiter apply.

## Headers

- `X-Frame-Options: SAMEORIGIN` (cross-origin clickjacking blocked; same-origin embeds such as `/preview/devices` work), `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`, `Strict-Transport-Security: max-age=63072000; includeSubDomains`, and `Content-Security-Policy-Report-Only` (promote to enforcing once reports are clean).

## Before going live

1. Set `ADMIN_SECRET_PIN` (≥ 8 random chars) and `ADMIN_SESSION_SECRET` (≥ 32 random chars) — see `.env.example`.
2. Set `TRUST_PROXY_HEADERS=true` if behind a real proxy/CDN.
3. Replace the mock payment adapter (`src/lib/payment-gateway.ts`) with a real gateway integration (MyFatoorah / QCB rails) and derive order payment status from the gateway's signed response — the current integration accepts `fawran/card/qpay` as “captured” optimistically.
4. `npm audit` is clean except Next's bundled PostCSS (GHSA-qx2v-qp2m-jg93); plan the next-major upgrade and keep dependencies current.
5. Move the in-memory rate limiter to Redis/Upstash for multi-instance deployments; the in-memory store resets on restart.

Report vulnerabilities to the store owner via the Instagram DM listed in `src/config/site.ts` (`@burgundy974_`) or `care@burgundy.com.qa`.
