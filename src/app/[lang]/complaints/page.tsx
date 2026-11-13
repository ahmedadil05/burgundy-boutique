'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { Language } from '@/lib/i18n';
import { generateComplaintTicket } from './complaint-utils';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea, Select } from '@/components/ui/Controls';
import { complianceConfig } from '@/config/compliance';
import { ShieldAlert, CheckCircle, Scale, ShieldCheck } from 'lucide-react';

export default function ComplaintsPage() {
  const params = useParams();
  const lang = (params?.lang === 'en' ? 'en' : 'ar') as Language;
  const isAr = lang === 'ar';

  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    orderNumber: '',
    complaintType: 'sizing',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ticketId = generateComplaintTicket();

    // Save complaint locally for admin panel
    try {
      const existing = JSON.parse(localStorage.getItem('burgundy_complaints') || '[]');
      existing.unshift({
        ticketId,
        ...formData,
        status: 'pending',
        createdAt: new Date().toISOString(),
      });
      localStorage.setItem('burgundy_complaints', JSON.stringify(existing));
    } catch {}

    setSubmittedTicket(ticketId);
  };

  return (
    <div className="min-h-screen bg-canvas py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-white text-burgundy border border-gold-hairline shadow-sm">
            <Scale className="w-3.5 h-3.5 text-gold-line" />
            <span>
              {isAr
                ? 'بوابة الشكاوى وحماية المستهلك — وزارة التجارة والصناعة بقطر'
                : 'Consumer Complaints Portal — Qatar MOCI Decision 25/2026'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-burgundy font-display">
            {isAr ? 'تقديم شكوى أو استفسار رسمي' : 'File a Formal Consumer Complaint'}
          </h1>
          <p className="text-xs sm:text-sm text-slateText-secondary max-w-xl mx-auto leading-relaxed">
            {isAr
              ? 'تلتزم دار بيرغندي بالرد على جميع الشكاوى خلال 24 ساعة عمل مع منحكِ رقم تتبع رسمي للشكوى.'
              : 'BURGUNDY commits to resolving all formal consumer inquiries within 24 working hours with an official MOCI ticket.'}
          </p>
        </div>

        {submittedTicket ? (
          <div className="bg-white border border-gold-hairline rounded-3xl p-8 sm:p-10 text-center shadow-luxury animate-scaleUp">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-burgundy font-display mb-2">
              {isAr ? 'تم تسجيل شكواكِ بنجاح' : 'Complaint Successfully Registered'}
            </h2>
            <p className="text-xs text-slateText-secondary mb-6">
              {isAr
                ? 'تم إرسال نسخة إلى بريدكِ الإلكتروني وإدارة الجودة بدار بيرغندي.'
                : 'A confirmation has been logged with our luxury quality & compliance desk.'}
            </p>

            <div className="inline-block bg-canvas-warm/50 border border-gold-hairline p-5 rounded-2xl mb-6">
              <p className="text-xs text-slateText-secondary mb-1 font-semibold">
                {isAr ? 'رقم تذكرة الشكوى الرسمي:' : 'Official Ticket Reference:'}
              </p>
              <p className="text-2xl font-mono font-extrabold text-burgundy tracking-wider">
                {submittedTicket}
              </p>
            </div>

            <div className="text-xs text-slateText-secondary space-y-1 mb-8 max-w-md mx-auto">
              <p>
                {isAr
                  ? 'سيقوم فريق الدعم بالتواصل معكِ عبر الهاتف المسجل خلال ساعات الدوام الرسمية.'
                  : 'Our customer protection team will reach out via registered phone within official hours.'}
              </p>
              <p className="font-semibold text-burgundy">
                {complianceConfig.customerServiceHours[lang]}
              </p>
            </div>

            <Button
              variant="secondary"
              onClick={() => {
                setSubmittedTicket(null);
                setFormData({
                  fullName: '',
                  phone: '',
                  email: '',
                  orderNumber: '',
                  complaintType: 'sizing',
                  message: '',
                });
              }}
              className="border-gold-hairline text-burgundy hover:bg-canvas-warm"
            >
              {isAr ? 'تقديم استفسار آخر' : 'Submit Another Inquiry'}
            </Button>
          </div>
        ) : (
          <div className="bg-white border border-gold-hairline rounded-3xl p-6 sm:p-10 shadow-luxury">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label={isAr ? 'الاسم الكامل *' : 'Full Name *'}
                  required
                  placeholder={isAr ? 'مثال: فاطمة الكواري' : 'e.g. Fatima Al-Kuwari'}
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
                <Input
                  label={isAr ? 'رقم الجوال القطري (+974) *' : 'Qatar Mobile (+974) *'}
                  required
                  type="tel"
                  placeholder="+974 5500 0000"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label={isAr ? 'البريد الإلكتروني *' : 'Email Address *'}
                  required
                  type="email"
                  placeholder="name@domain.qa"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <Input
                  label={isAr ? 'رقم الطلب (إن وُجد)' : 'Order Reference (optional)'}
                  placeholder="#BURG-2026-001"
                  value={formData.orderNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, orderNumber: e.target.value })
                  }
                />
              </div>

              <Select
                label={isAr ? 'نوع الشكوى أو الملاحظة *' : 'Inquiry / Complaint Category *'}
                options={[
                  {
                    value: 'sizing',
                    label: isAr ? 'استفسار عن المقاس أو خامة القماش' : 'Sizing & Fabric Inquiries',
                  },
                  {
                    value: 'delivery',
                    label: isAr ? 'تأخر في موعد التوصيل' : 'Delivery Scheduling & Delays',
                  },
                  {
                    value: 'defect',
                    label: isAr ? 'ملاحظة على جودة التطريز أو الرسم' : 'Craftsmanship or Brushwork Concern',
                  },
                  {
                    value: 'refund',
                    label: isAr ? 'طلب استرجاع أو استبدال مالي' : 'Refund & Exchange Request',
                  },
                  {
                    value: 'other',
                    label: isAr ? 'ملاحظة عامة أخرى' : 'General Feedback',
                  },
                ]}
                value={formData.complaintType}
                onChange={(e) =>
                  setFormData({ ...formData, complaintType: e.target.value })
                }
              />

              <Textarea
                label={isAr ? 'تفاصيل الشكوى أو الملاحظة *' : 'Complaint Details *'}
                required
                rows={5}
                placeholder={
                  isAr
                    ? 'يرجى تزويدنا بأدق التفاصيل لنتمكن من خدمتكِ ومعالجة الأمر فوراً...'
                    : 'Please provide full details so we can assist you effectively...'
                }
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />

              <div className="pt-2">
                <Button type="submit" variant="primary" size="lg" className="w-full bg-burgundy hover:bg-burgundy-hover text-white shadow-luxury py-3.5">
                  {isAr ? 'إرسال الشكوى رسمياً' : 'Submit Formal Complaint'}
                </Button>
              </div>
            </form>

            {/* Legal Notice Footer Box */}
            <div className="mt-8 p-4 rounded-2xl bg-canvas-warm/40 border border-gold-hairline text-xs text-slateText-secondary flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-gold-line shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <p className="font-bold text-burgundy mb-0.5 font-display">
                  {isAr ? 'ضمان حماية المستهلك' : 'Consumer Protection Assurance'}
                </p>
                <p>
                  {isAr
                    ? `تخضع معالجة الشكاوى لرقابة وزارة التجارة والصناعة بدولة قطر وفق السجل التجاري ${complianceConfig.crNumber}. يمكنكِ أيضاً مراجعة إدارة حماية المستهلك عبر الخط الساخن 16001.`
                    : `Complaints are governed under Qatar MOCI Decision No. 25 of 2026 (CR: ${complianceConfig.crNumber}). Direct MOCI consumer helpline: 16001.`}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
