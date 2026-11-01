'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Sparkles, CheckCircle2, Send, Megaphone, Target, BarChart3, ShieldCheck } from 'lucide-react';
import { useCRM } from '../../../lib/crm-store';
import { Language } from '../../../lib/i18n';

export default function AdvertisePage() {
  const params = useParams();
  const lang = (params?.lang as Language) || 'ar';
  const isRtl = lang === 'ar';
  const { addLead } = useCRM();

  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    phone: '',
    email: '',
    placement: 'home_banner',
    details: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    addLead({
      type: 'advertise_inquiry',
      name: formData.name,
      companyName: formData.companyName,
      phone: formData.phone,
      email: formData.email,
      details: `Placement: ${formData.placement} | Details: ${formData.details}`,
    });

    setIsSubmitted(true);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-peachSoft/40 border border-gold-hairline text-burgundy text-xs font-semibold uppercase tracking-wider">
          <Megaphone className="w-3.5 h-3.5 text-gold-line" />
          <span>{isRtl ? 'فرص الشراكة والرعاية' : 'PARTNERSHIP & ADVERTISING'}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-burgundy font-cairo">
          {isRtl ? 'أعلِن معنا لدى دار بيرغندي' : 'Advertise with BURGUNDY'}
        </h1>

        <p className="text-sm text-slateText-body leading-relaxed">
          {isRtl
            ? 'نصل بعلامتك التجارية إلى جمهور راقٍ ونخبوي من عاشقات الأناقة والفخامة الناعمة في دولة قطر ودول الخليج.'
            : 'Connect your luxury brand with an affluent, discerning audience of women passionate about soft luxury in Qatar.'}
        </p>
      </div>

      {/* Value Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
        <div className="bg-white p-5 rounded-2xl border border-gold-hairline shadow-soft text-center space-y-2">
          <div className="w-10 h-10 rounded-xl bg-burgundy/10 text-burgundy flex items-center justify-center mx-auto">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-burgundy font-cairo">
            {isRtl ? 'جمهور نسائي نخبوي' : 'Affluent Audience'}
          </h3>
          <p className="text-xs text-slateText-body">
            {isRtl ? 'حضور قوي ومباشر لسيدات المجتمع في قطر والخليج.' : 'High engagement from women seeking bespoke luxury.'}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gold-hairline shadow-soft text-center space-y-2">
          <div className="w-10 h-10 rounded-xl bg-burgundy/10 text-burgundy flex items-center justify-center mx-auto">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-burgundy font-cairo">
            {isRtl ? 'بيئة إعلانية مصقولة' : 'Curated Brand Space'}
          </h3>
          <p className="text-xs text-slateText-body">
            {isRtl ? 'مساحات إعلانية راقية متناغمة مع الهوية البصرية للدار.' : 'Elegant layouts that respect brand aesthetics.'}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gold-hairline shadow-soft text-center space-y-2">
          <div className="w-10 h-10 rounded-xl bg-burgundy/10 text-burgundy flex items-center justify-center mx-auto">
            <BarChart3 className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-burgundy font-cairo">
            {isRtl ? 'تقارير أداء ومتابعة' : 'Transparent Analytics'}
          </h3>
          <p className="text-xs text-slateText-body">
            {isRtl ? 'إحصائيات دقيقة لعدد المشاهدات والنقرات من الإدارة.' : 'Direct metrics on impressions and verified clicks.'}
          </p>
        </div>
      </div>

      {/* Inquiry Form */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gold-hairline shadow-luxury max-w-xl mx-auto">
        {isSubmitted ? (
          <div className="text-center py-10 space-y-4 animate-fadeIn">
            <div className="w-14 h-14 rounded-full bg-surface-peachSoft/50 text-burgundy flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-burgundy" />
            </div>
            <h2 className="text-xl font-bold text-burgundy font-cairo">
              {isRtl ? 'تم استلام طلبكم بنجاح' : 'Inquiry Received with Pleasure'}
            </h2>
            <p className="text-xs text-slateText-body leading-relaxed max-w-sm mx-auto">
              {isRtl
                ? 'شكراً لاهتمامكم بالشراكة مع دار بيرغندي. سيقوم فريق العلاقات العامة بالتواصل معكم خلال 24 ساعة.'
                : 'Thank you for your interest in partnering with BURGUNDY. Our brand team will reach out within 24 hours.'}
            </p>
            <Link
              href={`/${lang}`}
              className="inline-block mt-4 px-6 py-2.5 rounded-full bg-burgundy text-white text-xs font-bold uppercase tracking-wider"
            >
              {isRtl ? 'العودة للرئيسية' : 'Back to Home'}
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-lg font-bold text-burgundy mb-2 font-cairo text-start">
              {isRtl ? 'نموذج طلب حجز مساحة إعلانية' : 'Advertising Booking Inquiry'}
            </h2>

            <div>
              <label className="block text-xs font-semibold text-slateText-body mb-1 text-start">
                {isRtl ? 'اسم المسؤول / جهة الاتصال *' : 'Contact Person Name *'}
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-surface-peachMuted/50 text-sm focus:outline-none focus:ring-2 focus:ring-burgundy/40"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slateText-body mb-1 text-start">
                {isRtl ? 'اسم الشركة أو العلامة التجارية *' : 'Company or Brand Name *'}
              </label>
              <input
                type="text"
                required
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-surface-peachMuted/50 text-sm focus:outline-none focus:ring-2 focus:ring-burgundy/40"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slateText-body mb-1 text-start">
                  {isRtl ? 'رقم الهاتف / الواتساب (+974) *' : 'Phone / WhatsApp (+974) *'}
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+974 5000 0000"
                  dir="ltr"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-surface-peachMuted/50 text-sm focus:outline-none focus:ring-2 focus:ring-burgundy/40"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slateText-body mb-1 text-start">
                  {isRtl ? 'البريد الإلكتروني' : 'Email Address'}
                </label>
                <input
                  type="email"
                  dir="ltr"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-surface-peachMuted/50 text-sm focus:outline-none focus:ring-2 focus:ring-burgundy/40"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slateText-body mb-1 text-start">
                {isRtl ? 'المساحة الإعلانية المفضلة' : 'Preferred Placement'}
              </label>
              <select
                value={formData.placement}
                onChange={(e) => setFormData({ ...formData, placement: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-surface-peachMuted/50 text-sm focus:outline-none focus:ring-2 focus:ring-burgundy/40 bg-white"
              >
                <option value="home_banner">{isRtl ? 'شريط الصفحة الرئيسية (Home Banner)' : 'Home Page Banner'}</option>
                <option value="shop_grid">{isRtl ? 'سلوت شبكة المتجر (Shop Grid Slot)' : 'Shop Grid Slot'}</option>
                <option value="footer_strip">{isRtl ? 'شريط التذييل (Footer Strip)' : 'Footer Strip'}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slateText-body mb-1 text-start">
                {isRtl ? 'تفاصيل الحملة أو رسالتكم' : 'Campaign Notes or Objectives'}
              </label>
              <textarea
                rows={3}
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                placeholder={isRtl ? 'أخبرونا عن مدة الحملة والجمهور المستهدف...' : 'Tell us about your timing and audience goals...'}
                className="w-full px-4 py-2.5 rounded-xl border border-surface-peachMuted/50 text-sm focus:outline-none focus:ring-2 focus:ring-burgundy/40"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-burgundy hover:bg-burgundy-hover text-white text-xs font-bold tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>{isRtl ? 'إرسال طلب الرعاية' : 'Submit Inquiry'}</span>
              <Send className="w-3.5 h-3.5 rtl-flip" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
