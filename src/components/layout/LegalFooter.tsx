import React from 'react';
import Link from 'next/link';
import { complianceConfig } from '../../config/compliance';
import { siteConfig } from '../../config/site';
import { Language } from '../../lib/i18n';
import { ShieldCheck, Phone, Mail, Clock, MapPin, Scale } from 'lucide-react';

export interface LegalFooterProps {
  lang?: Language;
}

export function LegalFooter({ lang = 'ar' }: LegalFooterProps) {
  const isAr = lang === 'ar';

  return (
    <footer className="bg-blush-surface border-t border-peach-soft text-cocoa-dark pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-peach-deep/30">
          {/* Brand & Heritage Story */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold font-cairo text-cocoa-dark">
              {siteConfig.name[lang]}
            </h3>
            <p className="text-xs text-cocoa-muted leading-relaxed">
              {siteConfig.description[lang]}
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-coral-warm">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>
                {isAr
                  ? 'متجر إلكتروني قطري مرخص ومعتمد رسمياً'
                  : 'Official Licensed Qatar E-Commerce Boutique'}
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-cocoa-dark mb-3 font-cairo">
              {isAr ? 'التصنيفات والخدمات' : 'Collections & Services'}
            </h4>
            <ul className="space-y-2 text-xs text-cocoa-muted">
              <li>
                <Link href={`/${lang}/shop?category=toubs`} className="hover:text-coral-warm transition-colors">
                  {isAr ? 'ثياب سودانية فاخرة' : 'Sudanese Toubs'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/shop?category=jalabiyas`} className="hover:text-coral-warm transition-colors">
                  {isAr ? 'جلابيات راقية' : 'Luxury Jalabiyas'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/shop?category=daraas`} className="hover:text-coral-warm transition-colors">
                  {isAr ? 'دراعات مطرزة' : 'Embroidered Dara’as'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/about`} className="hover:text-coral-warm transition-colors">
                  {isAr ? 'قصة كنداكة والتراث' : 'The Kandaka Legacy'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/tracking`} className="hover:text-coral-warm transition-colors">
                  {isAr ? 'تتبع شحنتكِ' : 'Track Your Order'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Consumer Rights (Qatar MOCI Requirements) */}
          <div>
            <h4 className="text-sm font-bold text-cocoa-dark mb-3 font-cairo flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-coral-warm" />
              <span>{isAr ? 'السياسات وحماية المستهلك' : 'Consumer Rights & Policies'}</span>
            </h4>
            <ul className="space-y-2 text-xs text-cocoa-muted">
              <li>
                <Link href={`/${lang}/policies/returns`} className="hover:text-coral-warm transition-colors">
                  {isAr ? 'سياسة الاسترجاع والاستبدال (14 يوماً)' : 'Returns & Exchanges (14 Days)'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/policies/shipping`} className="hover:text-coral-warm transition-colors">
                  {isAr ? 'الشحن والتوصيل داخل قطر' : 'Shipping & Delivery in Qatar'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/policies/privacy`} className="hover:text-coral-warm transition-colors">
                  {isAr ? 'سياسة الخصوصية وحماية البيانات' : 'Privacy & Data Protection'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/policies/terms`} className="hover:text-coral-warm transition-colors">
                  {isAr ? 'الشروط والأحكام' : 'Terms & Conditions'}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/complaints`}
                  className="font-bold text-coral-warm hover:underline inline-flex items-center gap-1"
                >
                  {isAr ? 'تقديم شكوى للمستهلك' : 'File a Consumer Complaint'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Regulatory & Contact Info */}
          <div>
            <h4 className="text-sm font-bold text-cocoa-dark mb-3 font-cairo">
              {isAr ? 'بيانات الترخيص والتواصل' : 'Licensing & Contact'}
            </h4>
            <div className="space-y-2.5 text-xs text-cocoa-muted">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-coral-warm shrink-0 mt-0.5" />
                <span>
                  {complianceConfig.address.building}, {complianceConfig.address.street}, {complianceConfig.address.zone}, {complianceConfig.address.city}, {complianceConfig.address.country}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-coral-warm shrink-0" />
                <span dir="ltr">{complianceConfig.contactPhone}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-coral-warm shrink-0" />
                <span>{complianceConfig.contactEmail}</span>
              </p>
              <p className="flex items-start gap-2 text-[11px] bg-white/60 p-2 rounded-xl border border-peach-soft/60">
                <Clock className="w-4 h-4 text-coral-warm shrink-0 mt-0.5" />
                <span>{complianceConfig.customerServiceHours[lang]}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Mandatory Qatar Regulatory Strip (Ministerial Decision No. 25 of 2026) */}
        <div className="mt-8 pt-6 border-t border-peach-deep/30 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-cocoa-muted text-center md:text-start">
          <div className="space-y-1">
            <p className="font-bold text-cocoa-dark">
              {complianceConfig.legalEntityName[lang]}
            </p>
            <p className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-1 text-[11px]">
              <span>
                <strong>{isAr ? 'السجل التجاري:' : 'CR Number:'}</strong>{' '}
                <span className="font-mono text-cocoa-dark bg-white/80 px-1.5 py-0.5 rounded border border-peach-soft">
                  {complianceConfig.crNumber}
                </span>
              </span>
              <span>
                <strong>{isAr ? 'رخصة التجارة الإلكترونية:' : 'E-Com License:'}</strong>{' '}
                <span className="font-mono text-cocoa-dark bg-white/80 px-1.5 py-0.5 rounded border border-peach-soft">
                  {complianceConfig.licenseNumber}
                </span>
              </span>
              <span className="text-coral-warm font-semibold">
                {complianceConfig.mociDecisionReference}
              </span>
            </p>
          </div>

          <p className="text-[11px]">
            {isAr
              ? 'جميع الحقوق محفوظة لمتجر كنداكة © 2026'
              : 'All Rights Reserved Kandaka Boutique © 2026'}
          </p>
        </div>
      </div>
    </footer>
  );
}
