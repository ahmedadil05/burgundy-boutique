'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Sparkles, Send, Palette, Heart, MessageCircle, ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCRM } from '../../../lib/crm-store';
import { Language } from '../../../lib/i18n';
import { siteConfig } from '../../../config/site';

export default function CustomOrderPage() {
  const params = useParams();
  const lang = (params?.lang as Language) || 'ar';
  const isRtl = lang === 'ar';
  const { addLead } = useCRM();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    fabricPreference: 'حرير طبيعي خالص (Pure Silk)',
    occasionDate: '',
    budgetQAR: 1800,
    details: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    addLead({
      type: 'custom_order',
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      fabricPreference: formData.fabricPreference,
      occasionDate: formData.occasionDate,
      budgetQAR: Number(formData.budgetQAR),
      details: formData.details,
    });

    setIsSubmitted(true);
  };

  const directWhatsappUrl = `https://wa.me/${siteConfig.support.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    isRtl
      ? `مرحباً دار بيرغندي، أود استشارة خاصة بخصوص تفصيل قطعة ورسم يدوي لمناسبة قادمة.`
      : `Hello BURGUNDY Atelier, I would like to consult on commissioning a bespoke hand-painted piece.`
  )}`;

  return (
    <div className="py-14 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto min-h-screen bg-canvas">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-gold-hairline text-burgundy text-xs font-semibold uppercase tracking-wider shadow-sm">
          <Palette className="w-3.5 h-3.5 text-gold-line" />
          <span>{isRtl ? 'تفصيل ورسم يدوي خاص' : 'BESPOKE ATELIER TAILORING'}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-burgundy font-cairo">
          {isRtl ? 'طلب تفصيل قطعة خاصة بكِ' : 'Commission a Bespoke Creation'}
        </h1>

        <p className="text-sm text-slateText-secondary leading-relaxed">
          {isRtl
            ? 'نسعد بتحويل رؤيتكِ وذوقكِ الخاص إلى ثوب أو جلابية فريدة مرسومة يدوياً بأنامل فناناتنا بالمرسم لمناسباتكِ الاستثنائية.'
            : 'Allow our master artisans to paint a one-of-a-kind silk or Swiss voile heirloom tailored precisely to your palette and occasion in Qatar.'}
        </p>
      </div>

      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-gold-hairline shadow-luxury max-w-2xl mx-auto">
        {isSubmitted ? (
          <div className="text-center py-10 space-y-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-surface-peachSoft/40 text-burgundy flex items-center justify-center mx-auto border border-gold-hairline">
              <Heart className="w-8 h-8 text-burgundy fill-burgundy/20" />
            </div>
            <h2 className="text-2xl font-bold text-burgundy font-cairo">
              {isRtl ? 'شكراً لكِ.. تم استلام طلب التفصيل' : 'Your Bespoke Request Has Been Received'}
            </h2>
            <p className="text-xs text-slateText-secondary leading-relaxed max-w-sm mx-auto">
              {isRtl
                ? 'سيتواصل معكِ مرسم بيرغندي عبر الواتساب لتأكيد خيارات القماش والألوان وإرسال رسومات تمهيدية قبل البدء.'
                : 'Our atelier representative in Doha will contact you via WhatsApp to align on fabric samples, palettes, and preliminary sketches.'}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <a
                href={directWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{isRtl ? 'التواصل المباشر مع المرسم' : 'Direct Concierge Chat'}</span>
              </a>
              <Link
                href={`/${lang}/shop`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-burgundy hover:bg-burgundy-hover text-white text-xs font-bold transition-all shadow-luxury"
              >
                <span>{isRtl ? 'استكشاف التشكيلات' : 'Explore Collections'}</span>
                {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-gold-hairline">
              <h2 className="text-base font-bold text-burgundy font-cairo">
                {isRtl ? 'بيانات المناسبة ومواصفات التصميم' : 'Design & Event Specifications'}
              </h2>
              <a
                href={directWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>{isRtl ? 'محادثة فورية' : 'Live Concierge'}</span>
              </a>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slateText-body mb-1 text-start">
                {isRtl ? 'الاسم الكريم *' : 'Your Name *'}
              </label>
              <input
                type="text"
                required
                placeholder={isRtl ? 'مثال: فاطمة المهندي' : 'e.g., Fatima Al-Mohannadi'}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gold-hairline bg-canvas/30 text-xs text-slateText-body focus:outline-none focus:ring-2 focus:ring-burgundy/30 focus:border-burgundy"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slateText-body mb-1 text-start">
                  {isRtl ? 'رقم الهاتف / الواتساب القطري (+974) *' : 'Qatar Mobile / WhatsApp *'}
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+974 5000 0000"
                  dir="ltr"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gold-hairline bg-canvas/30 text-xs text-slateText-body focus:outline-none focus:ring-2 focus:ring-burgundy/30 focus:border-burgundy"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slateText-body mb-1 text-start">
                  {isRtl ? 'البريد الإلكتروني' : 'Email Address'}
                </label>
                <input
                  type="email"
                  dir="ltr"
                  placeholder="name@domain.qa"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gold-hairline bg-canvas/30 text-xs text-slateText-body focus:outline-none focus:ring-2 focus:ring-burgundy/30 focus:border-burgundy"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slateText-body mb-1 text-start">
                  {isRtl ? 'الخامة المفضلة' : 'Preferred Fabric'}
                </label>
                <select
                  value={formData.fabricPreference}
                  onChange={(e) => setFormData({ ...formData, fabricPreference: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gold-hairline bg-canvas/30 text-xs text-slateText-body focus:outline-none focus:ring-2 focus:ring-burgundy/30 focus:border-burgundy"
                >
                  <option value="حرير طبيعي خالص (Pure Silk)">{isRtl ? 'حرير طبيعي خالص 100%' : '100% Pure Natural Silk'}</option>
                  <option value="فوال سويسري فاخر (Swiss Voile)">{isRtl ? 'فوال سويسري قطن توتال' : 'Swiss Cotton Voile'}</option>
                  <option value="كتان طبيعي بارد (Linen)">{isRtl ? 'كتان طبيعي بارد' : 'Natural Cooling Linen'}</option>
                  <option value="شيفون حريري (Silk Chiffon)">{isRtl ? 'شيفون حريري رقيق' : 'Delicate Silk Chiffon'}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slateText-body mb-1 text-start">
                  {isRtl ? 'تاريخ المناسبة التقريبي' : 'Event Date'}
                </label>
                <input
                  type="date"
                  value={formData.occasionDate}
                  onChange={(e) => setFormData({ ...formData, occasionDate: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gold-hairline bg-canvas/30 text-xs text-slateText-body focus:outline-none focus:ring-2 focus:ring-burgundy/30 focus:border-burgundy"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slateText-body mb-1 text-start">
                {isRtl ? 'الميزانية التقديرية (بالريال القطري QAR)' : 'Target Budget (QAR)'}
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="800"
                  max="4000"
                  step="100"
                  value={formData.budgetQAR}
                  onChange={(e) => setFormData({ ...formData, budgetQAR: Number(e.target.value) })}
                  className="flex-1 accent-burgundy"
                />
                <span className="text-xs font-bold text-burgundy bg-surface-peachSoft/40 px-3 py-1.5 rounded-xl border border-gold-hairline min-w-[95px] text-center font-mono">
                  {formData.budgetQAR} QAR
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slateText-body mb-1 text-start">
                {isRtl ? 'فكرة التصميم، الألوان المطلوبة، أو تفاصيل القياس' : 'Design Vision, Colors, or Measurement Details'}
              </label>
              <textarea
                rows={3}
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                placeholder={isRtl ? 'مثال: أود درجات البيرغندي مع رسم نباتي ذهبي على الأكتاف والأطراف، طول 4.5 متر...' : 'e.g., I would love delicate leaf patterns in gold and burgundy on a 4.5m Swiss voile canvas...'}
                className="w-full px-4 py-2.5 rounded-xl border border-gold-hairline bg-canvas/30 text-xs text-slateText-body focus:outline-none focus:ring-2 focus:ring-burgundy/30 focus:border-burgundy"
              />
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slateText-secondary pt-1">
              <ShieldCheck className="w-4 h-4 text-gold-line shrink-0" />
              <span>{isRtl ? 'المرسم معتمد في دولة قطر ويضمن سرية تفاصيل وتصاميم العملاء.' : 'All bespoke commissions are crafted under Qatar artisan licenses with complete exclusivity.'}</span>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-burgundy hover:bg-burgundy-hover text-white text-xs font-bold tracking-wider uppercase transition-all shadow-luxury flex items-center justify-center gap-2"
            >
              <span>{isRtl ? 'إرسال طلب التفصيل الخاص' : 'Submit Bespoke Commission'}</span>
              <Send className="w-3.5 h-3.5 rtl-flip" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
