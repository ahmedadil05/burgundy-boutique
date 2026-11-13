/**
 * Minimal in-memory rate limiter & trusted client-IP resolution for public API routes.
 *
 * NOTE: in-memory. It resets on restart and is per-process (fine for a single
 * instance). For multi-instance deployments, back this with Redis/Upstash and
 * set TRUST_PROXY_HEADERS only behind a real proxy/CDN that strips client-
 * supplied forwarding headers.
 */

interface WindowRecord {
  count: number;
  windowStart: number;
}

const windows = new Map<string, WindowRecord>();
const MAX_ENTRIES = 5000;

function sweepExpired(windowMs: number, now: number) {
  if (windows.size <= MAX_ENTRIES) return;
  for (const [key, record] of windows) {
    if (now - record.windowStart > windowMs) {
      windows.delete(key);
    }
  }
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSec?: number;
}

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now();
  sweepExpired(windowMs, now);

  const record = windows.get(key);
  if (!record || now - record.windowStart >= windowMs) {
    windows.set(key, { count: 1, windowStart: now });
    return { allowed: true, remaining: limit - 1 };
  }

  record.count += 1;
  if (record.count > limit) {
    const retryAfterSec = Math.ceil((record.windowStart + windowMs - now) / 1000);
    return { allowed: false, remaining: 0, retryAfterSec };
  }
  return { allowed: true, remaining: limit - record.count };
}

/**
 * Resolve the client IP. Forwarding headers (x-forwarded-for / x-real-ip) are
 * ONLY honoured when TRUST_PROXY_HEADERS=true is set in the environment, i.e.
 * the app runs behind a proxy/CDN that strips or overwrites those headers.
 * Otherwise everything falls back to a shared bucket ('127.0.0.1'), which is
 * fail-safe (stricter, never spoofable) rather than fail-open.
 */
export function getClientIp(headers: Headers): string {
  if (process.env.TRUST_PROXY_HEADERS === 'true') {
    const forwarded = headers.get('x-forwarded-for');
    if (forwarded) {
      const first = forwarded.split(',')[0]?.trim();
      if (first) return first;
    }
    const real = headers.get('x-real-ip')?.trim();
    if (real) return real;
  }
  return '127.0.0.1';
}
