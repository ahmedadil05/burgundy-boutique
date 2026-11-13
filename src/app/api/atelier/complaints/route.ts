import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken, COOKIE_NAME } from '@/lib/server/auth/session';
import { db } from '@/lib/server/repository/relational-store';
import { ComplaintStatus } from '@/lib/domain/schema';

const ALLOWED_STATUSES: readonly ComplaintStatus[] = ['pending', 'reviewing', 'resolved'];

export async function GET(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.json({ error: 'Unauthorized: Valid atelier session required' }, { status: 401 });
  }

  const complaints = db.listComplaints();
  return NextResponse.json({ success: true, count: complaints.length, complaints });
}

export async function PATCH(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.json({ error: 'Unauthorized: Valid atelier session required' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const ticketId = String(body?.ticketId || '').trim();
    const status = String(body?.status || '') as ComplaintStatus;

    if (!ticketId) {
      return NextResponse.json({ error: 'ticketId is required' }, { status: 400 });
    }
    if (!ALLOWED_STATUSES.includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const updated = db.updateComplaintStatus(ticketId, status);
    if (!updated) {
      return NextResponse.json({ error: 'Complaint not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, complaint: updated });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
