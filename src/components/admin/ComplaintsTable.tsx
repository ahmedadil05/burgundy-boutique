'use client';

import React from 'react';
import { Language } from '../../lib/i18n';
import { Scale, CheckCircle2, Clock } from 'lucide-react';
import { Button } from '../ui/Button';

export interface ComplaintRow {
  ticketId: string;
  fullName: string;
  complaintType: string;
  message: string;
  status: string;
  createdAt: string;
}

export function ComplaintsTable({
  complaints,
  onResolve,
  lang = 'ar',
}: {
  complaints: ComplaintRow[];
  onResolve?: (ticketId: string) => void;
  lang?: Language;
}) {
  const isAr = lang === 'ar';

  return (
    <div className="bg-white/90 rounded-3xl p-6 border border-peach-soft shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-peach-soft">
        <h3 className="font-bold text-base text-cocoa-dark font-display flex items-center gap-2">
          <Scale className="w-5 h-5 text-coral-ink" />
          <span>{isAr ? 'شكاوى المستهلكين (رقابة وزارة التجارة والصناعة)' : 'Consumer Complaints (MOCI)'}</span>
        </h3>
        <span className="text-xs text-cocoa-muted font-semibold">
          {isAr ? `${complaints.length} شكاوى مسجلة` : `${complaints.length} Filed`}
        </span>
      </div>

      {complaints.length === 0 ? (
        <p className="text-center py-8 text-xs text-cocoa-muted">
          {isAr ? 'لا توجد شكاوى مستهلكين مفتوحة حالياً.' : 'No open consumer complaints.'}
        </p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-peach-soft">
          <table className="w-full text-xs text-start">
            <thead>
              <tr className="bg-blush-surface font-bold text-cocoa-dark border-b border-peach-soft">
                <th className="p-3 text-start">{isAr ? 'رقم التذكرة' : 'Ticket ID'}</th>
                <th className="p-3 text-start">{isAr ? 'المشتكية' : 'Complainant'}</th>
                <th className="p-3 text-start">{isAr ? 'النوع' : 'Category'}</th>
                <th className="p-3 text-start">{isAr ? 'نص الشكوى' : 'Details'}</th>
                <th className="p-3 text-center">{isAr ? 'الحالة والإجراء' : 'Resolution'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-peach-soft/50">
              {complaints.map((c) => (
                <tr key={c.ticketId} className="hover:bg-cream/60 transition-colors">
                  <td className="p-3 font-mono font-bold text-coral-ink">{c.ticketId}</td>
                  <td className="p-3 font-bold text-cocoa-dark">{c.fullName}</td>
                  <td className="p-3 text-cocoa-muted">{c.complaintType}</td>
                  <td className="p-3 text-cocoa-dark max-w-xs truncate" title={c.message}>
                    {c.message}
                  </td>
                  <td className="p-3 text-center">
                    {c.status === 'resolved' ? (
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        {isAr ? 'تمت التسوية' : 'Resolved'}
                      </span>
                    ) : onResolve ? (
                      <Button size="sm" variant="outline" onClick={() => onResolve(c.ticketId)}>
                        {isAr ? 'إغلاق الشكوى' : 'Resolve'}
                      </Button>
                    ) : (
                      <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                        {isAr ? 'قيد المتابعة' : 'Pending'}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
