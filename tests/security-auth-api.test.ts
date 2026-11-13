import { describe, it, expect } from 'vitest';
import {
  verifyAdminPin,
  createSessionToken,
  verifySessionToken,
  checkRateLimit,
  registerFailedAttempt,
  resetRateLimit,
} from '../src/lib/server/auth/session';

describe('Security Hardening & Server Auth Rails', () => {
  it('correctly verifies valid admin PIN and rejects incorrect PINs using timing-safe logic', () => {
    expect(verifyAdminPin('9740')).toBe(true);
    expect(verifyAdminPin('0000')).toBe(false);
    expect(verifyAdminPin('974')).toBe(false);
    expect(verifyAdminPin('')).toBe(false);
    expect(verifyAdminPin('123456')).toBe(false);
  });

  it('generates HMAC signed tokens and validates them successfully', () => {
    const token = createSessionToken();
    expect(token).toBeDefined();
    expect(token.includes('.')).toBe(true);

    const isValid = verifySessionToken(token);
    expect(isValid).toBe(true);
  });

  it('rejects tampered or malformed session tokens', () => {
    const token = createSessionToken();
    const tampered = token.slice(0, -4) + 'abcd';
    expect(verifySessionToken(tampered)).toBe(false);
    expect(verifySessionToken('invalid.token.structure')).toBe(false);
    expect(verifySessionToken(null)).toBe(false);
    expect(verifySessionToken('')).toBe(false);
  });

  it('enforces rate limiting and locks out after 5 consecutive failed attempts', () => {
    const testIp = '192.168.1.99';
    resetRateLimit(testIp);

    // Initial check
    expect(checkRateLimit(testIp).allowed).toBe(true);

    // 4 failed attempts
    for (let i = 1; i <= 4; i++) {
      const res = registerFailedAttempt(testIp);
      expect(res.locked).toBe(false);
      expect(res.remainingAttempts).toBe(5 - i);
    }

    // 5th attempt triggers lockout
    const finalAttempt = registerFailedAttempt(testIp);
    expect(finalAttempt.locked).toBe(true);
    expect(finalAttempt.remainingAttempts).toBe(0);

    // Subsequent request is denied
    const checkAfterLock = checkRateLimit(testIp);
    expect(checkAfterLock.allowed).toBe(false);
    expect(checkAfterLock.retryAfterSec).toBeGreaterThan(0);

    // Clean up
    resetRateLimit(testIp);
  });
});
