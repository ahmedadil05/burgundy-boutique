import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/server/repository/relational-store';
import { rateLimit, getClientIp } from '@/lib/server/rate-limit';

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  const rl = rateLimit(`complaints-create:${ip}`, 5, 10 * 60 * 1000);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: 'Too many complaint submissions. Please try again later.', retryAfterSec: rl.retryAfterSec },
      { status: 429 }
    );
  }

  const contentLength = Number(req.headers.get('content-length') || '0');
  if (Number.isFinite(contentLength) && contentLength > 64 * 1024) {
    return NextResponse.json({ error: 'Request body too large' }, { status: 413 });
  }

  try {
    const body = await req.json();

    const fullName = String(body?.fullName || '').trim();
    const phone = String(body?.phone || '').trim();
    const message = String(body?.message || '').trim();

    if (!fullName) {
      return NextResponse.json({ error: 'Full name is required' }, { status: 400 });
    }
    if (fullName.length > 200) {
      return NextResponse.json({ error: 'Full name is too long' }, { status: 400 });
    }
    if (!phone) {
      return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
    }
    if (phone.replace(/\D/g, '').length < 8 || phone.length > 32) {
      return NextResponse.json({ error: 'Phone number looks invalid' }, { status: 400 });
    }
    if (!message || message.length < 10) {
      return NextResponse.json(
        { error: 'Please describe the issue (at least 10 characters)' },
        { status: 400 }
      );
    }
    if (message.length > 4000) {
      return NextResponse.json({ error: 'Message is too long' }, { status: 400 });
    }

    const orderNumber = body?.orderNumber ? String(body.orderNumber).trim().slice(0, 64) : undefined;
    const email = body?.email ? String(body.email).trim().slice(0, 254) : undefined;
    if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json({ error: 'Email address looks invalid' }, { status: 400 });
    }

    const complaint = db.createComplaint({
      fullName,
      phone,
      email,
      orderNumber,
      complaintType: body?.complaintType ? String(body.complaintType) : 'other',
      message,
    });

    return NextResponse.json(
      {
        success: true,
        ticketId: complaint.ticketId,
        message:
          'Your complaint was received. A BURGUNDY consumer-relations agent will contact you within 24-48 hours.',
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
