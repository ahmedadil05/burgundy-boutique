import { NextRequest, NextResponse } from 'next/server';
import {
  verifyAdminPin,
  createSessionToken,
  verifySessionToken,
  checkRateLimit,
  registerFailedAttempt,
  resetRateLimit,
  COOKIE_NAME,
} from '@/lib/server/auth/session';

export async function GET(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  const isAuthenticated = verifySessionToken(token);
  return NextResponse.json({ authenticated: isAuthenticated });
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
  const rateLimit = checkRateLimit(ip);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        error: 'Too many failed PIN attempts. Locked out for security.',
        retryAfterSec: rateLimit.retryAfterSec,
      },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const pin = body?.pin;

    if (!pin) {
      return NextResponse.json({ error: 'PIN is required' }, { status: 400 });
    }

    const isValid = verifyAdminPin(String(pin));

    if (!isValid) {
      const failed = registerFailedAttempt(ip);
      return NextResponse.json(
        {
          error: 'Invalid master PIN',
          remainingAttempts: failed.remainingAttempts,
          locked: failed.locked,
        },
        { status: 401 }
      );
    }

    // Success: Reset rate limits & issue signed HTTP-only cookie
    resetRateLimit(ip);
    const token = createSessionToken();

    const response = NextResponse.json({
      success: true,
      message: 'Atelier portal unlocked',
    });

    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  const response = NextResponse.json({ success: true, message: 'Logged out' });
  response.cookies.delete(COOKIE_NAME);
  return response;
}
