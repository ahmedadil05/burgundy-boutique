import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/server/repository/relational-store';
import { rateLimit, getClientIp } from '@/lib/server/rate-limit';

/**
 * Public reviews feed — returns ONLY admin-approved testimonials.
 * Pending or rejected submissions are never exposed.
 */
export async function GET() {
  const reviews = db.listApprovedReviews().map((r) => ({
    id: r.id,
    authorName: r.authorName,
    rating: r.rating,
    item: r.item,
    text: r.text,
    createdAt: r.approvedAt || r.createdAt,
  }));

  return NextResponse.json({
    success: true,
    count: reviews.length,
    reviews,
  });
}

/**
 * Public review submission — always lands in the moderation queue as
 * 'pending' and is only shown publicly after admin approval.
 */
export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  const rl = rateLimit(`reviews-create:${ip}`, 8, 10 * 60 * 1000);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: 'Too many review submissions. Please try again later.', retryAfterSec: rl.retryAfterSec },
      { status: 429 }
    );
  }

  const contentLength = Number(req.headers.get('content-length') || '0');
  if (Number.isFinite(contentLength) && contentLength > 16 * 1024) {
    return NextResponse.json({ error: 'Request body too large' }, { status: 413 });
  }

  try {
    const body = await req.json();

    const authorName = String(body?.authorName || '').trim();
    const text = String(body?.text || '').trim();
    const ratingRaw = Number(body?.rating);
    const item = body?.item ? String(body.item).trim().slice(0, 140) : undefined;

    if (!authorName || authorName.length > 120) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    if (!Number.isFinite(ratingRaw) || ratingRaw < 1 || ratingRaw > 5) {
      return NextResponse.json({ error: 'Rating must be between 1 and 5 stars' }, { status: 400 });
    }
    if (!text || text.length < 15) {
      return NextResponse.json(
        { error: 'Please write a few words about your experience (at least 15 characters)' },
        { status: 400 }
      );
    }
    if (text.length > 1200) {
      return NextResponse.json({ error: 'Review is too long (max 1200 characters)' }, { status: 400 });
    }

    const review = db.createReview({ authorName, rating: ratingRaw, item, text });

    return NextResponse.json(
      {
        success: true,
        status: 'pending',
        message:
          'Thank you! Your review was received and will appear after BURGUNDY review approval.',
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
