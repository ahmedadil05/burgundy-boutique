import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken, COOKIE_NAME } from '@/lib/server/auth/session';
import { db } from '@/lib/server/repository/relational-store';
import { ReviewStatus } from '@/lib/domain/schema';

const ALLOWED_STATUSES: readonly ReviewStatus[] = ['pending', 'approved', 'rejected'];

export async function GET(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.json({ error: 'Unauthorized: Valid atelier session required' }, { status: 401 });
  }

  const reviews = db.listAllReviews();
  return NextResponse.json({ success: true, count: reviews.length, reviews });
}

export async function PATCH(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.json({ error: 'Unauthorized: Valid atelier session required' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const id = String(body?.id || '').trim();
    const status = String(body?.status || '') as ReviewStatus;

    if (!id) {
      return NextResponse.json({ error: 'Review id is required' }, { status: 400 });
    }
    if (!ALLOWED_STATUSES.includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const updated = db.updateReviewStatus(id, status);
    if (!updated) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, review: updated });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
