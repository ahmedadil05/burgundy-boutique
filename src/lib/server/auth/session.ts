import crypto from 'crypto';

const ADMIN_PIN = process.env.ADMIN_SECRET_PIN || '9740';
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || 'burgundy_luxury_artisan_secret_token_974';
export const COOKIE_NAME = 'burgundy_atelier_session';

// In-Memory Rate Limiter (IP / Client lockout)
interface RateLimitRecord {
  attempts: number;
  lockedUntil?: number;
}
const rateLimitMap = new Map<string, RateLimitRecord>();

const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 5 * 60 * 1000; // 5 minutes

export function checkRateLimit(clientKey: string): { allowed: boolean; remainingAttempts: number; retryAfterSec?: number } {
  const now = Date.now();
  const record = rateLimitMap.get(clientKey);

  if (record?.lockedUntil && record.lockedUntil > now) {
    const retryAfterSec = Math.ceil((record.lockedUntil - now) / 1000);
    return { allowed: false, remainingAttempts: 0, retryAfterSec };
  }

  const attempts = record?.attempts || 0;
  return { allowed: true, remainingAttempts: Math.max(0, MAX_ATTEMPTS - attempts) };
}

export function registerFailedAttempt(clientKey: string): { remainingAttempts: number; locked: boolean } {
  const now = Date.now();
  const record = rateLimitMap.get(clientKey) || { attempts: 0 };
  record.attempts += 1;

  if (record.attempts >= MAX_ATTEMPTS) {
    record.lockedUntil = now + LOCKOUT_MS;
    rateLimitMap.set(clientKey, record);
    return { remainingAttempts: 0, locked: true };
  }

  rateLimitMap.set(clientKey, record);
  return { remainingAttempts: MAX_ATTEMPTS - record.attempts, locked: false };
}

export function resetRateLimit(clientKey: string) {
  rateLimitMap.delete(clientKey);
}

// Timing-safe PIN verification
export function verifyAdminPin(providedPin: string): boolean {
  if (!providedPin || typeof providedPin !== 'string') return false;

  const expectedBuffer = Buffer.from(ADMIN_PIN, 'utf-8');
  const providedBuffer = Buffer.from(providedPin, 'utf-8');

  if (expectedBuffer.length !== providedBuffer.length) {
    // Prevent timing leak on length
    crypto.timingSafeEqual(expectedBuffer, expectedBuffer);
    return false;
  }

  return crypto.timingSafeEqual(expectedBuffer, providedBuffer);
}

// HMAC-Signed Session Token
export function createSessionToken(): string {
  const timestamp = Date.now();
  const payload = `atelier_admin_${timestamp}`;
  const signature = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('hex');
  return `${payload}.${signature}`;
}

export function verifySessionToken(token: string | null | undefined): boolean {
  if (!token) return false;

  const parts = token.split('.');
  if (parts.length !== 2) return false;

  const [payload, signature] = parts;
  const expectedSignature = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('hex');

  const sigBuffer = Buffer.from(signature, 'utf-8');
  const expectedSigBuffer = Buffer.from(expectedSignature, 'utf-8');

  if (sigBuffer.length !== expectedSigBuffer.length) return false;
  if (!crypto.timingSafeEqual(sigBuffer, expectedSigBuffer)) return false;

  // Check token age (24 hours expiry)
  const timeStr = payload.replace('atelier_admin_', '');
  const tokenTime = parseInt(timeStr, 10);
  if (isNaN(tokenTime)) return false;

  const maxAge = 24 * 60 * 60 * 1000;
  return Date.now() - tokenTime < maxAge;
}
