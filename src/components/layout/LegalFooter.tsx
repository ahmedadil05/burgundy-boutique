'use client';

import React from 'react';
import Link from 'next/link';
import { complianceConfig } from '../../config/compliance';
import { useStoreSettings } from '../../lib/settings-store';
import { Language } from '../../lib/i18n';
import { ShieldCheck, Phone, Mail, Clock, MapPin, Scale, Instagram, ExternalLink, Palette, Megaphone } from 'lucide-react';

export interface LegalFooterProps {
  lang?: Language;
}

export function LegalFooter({ lang = 'ar' }: LegalFooterProps) {
  const { settings } = useStoreSettings();
  const isAr = lang === 'ar';

  return (
    <footer className="bg-canvas-warm border-t border-gold-hairline text-slateText-body pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-gold-hairline/60">
          
          {/* Brand & Wordmark */}
          <div className="space-y-3">
            <span className="brand-wordmark text-2xl text-burgundy block">
              {settings.storeName.en}
            </span>
            <p className="text-xs text-slateText-secondary leading-relaxed">
              {isAr
                ? 'دار بيرغندي للأزياء النسائية السودانية الراقية في الدوحة: ثياب، جلابيات، وشيلان مشغولة يدوياً بأرقى خامات الحرير والفوال السويسري الفاخر.'
                : 'BURGUNDY (@burgundy974_) - Curated Qatar-based boutique specializing in exquisite hand-painted Sudanese toubs, jalabiyas, and silk scarves.'}
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-burgundy">
              <ShieldCheck className="w-4 h-4 text-gold-line shrink-0" />
              <span>
                {isAr
                  ? 'مرخص رسمياً في دولة قطر وفق أحكام التجارة الإلكترونية'
                  : 'Official Licensed Qatar E-Commerce Boutique'}
              </span>
            </div>
            <div>
              <a
                href="https://www.instagram.com/burgundy974_"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-burgundy hover:underline pt-1"
              >
                <Instagram className="w-4 h-4" />
                <span dir="ltr">@burgundy974_</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-burgundy mb-3 font-cairo">
              {isAr ? 'المتجر والتصاميم' : 'Collections & Atelier'}
            </h4>
            <ul className="space-y-2 text-xs text-slateText-secondary">
              <li>
                <Link href={`/${lang}/shop?category=toubs`} className="hover:text-burgundy transition-colors">
                  {isAr ? 'ثياب سودانية مشغولة يدوياً' : 'Hand-Painted Sudanese Toubs'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/shop?category=jalabiyas`} className="hover:text-burgundy transition-colors">
                  {isAr ? 'جلابيات كتان وحرير راقية' : 'Luxury Linen Jalabiyas'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/shop?category=scarves`} className="hover:text-burgundy transition-colors">
                  {isAr ? 'شيلان وأوشحة شيفون' : 'Silk Chiffon Scarves'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/custom-order`} className="text-burgundy font-semibold hover:underline flex items-center gap-1">
                  <Palette className="w-3.5 h-3.5" />
                  <span>{isAr ? 'طلب تفصيل ورسم خاص' : 'Bespoke Commission'}</span>
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/advertise`} className="text-gold-shimmer font-semibold hover:underline flex items-center gap-1">
                  <Megaphone className="w-3.5 h-3.5" />
                  <span>{isAr ? 'الإعلان والرعاية معنا' : 'Advertise With Us'}</span>
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/about`} className="hover:text-burgundy transition-colors">
                  {isAr ? 'قصة بيرغندي ووراء الريشة' : 'About BURGUNDY & Craft'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/tracking`} className="hover:text-burgundy transition-colors">
                  {isAr ? 'تتبع شحنتكِ' : 'Track Order'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Consumer Rights & Policies (Qatar Compliance) */}
          <div>
            <h4 className="text-sm font-bold text-burgundy mb-3 font-cairo flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-gold-line" />
              <span>{isAr ? 'السياسات وحماية المستهلك' : 'Consumer Rights & Policies'}</span>
            </h4>
            <ul className="space-y-2 text-xs text-slateText-secondary">
              <li>
                <Link href={`/${lang}/policies/returns`} className="hover:text-burgundy transition-colors">
                  {isAr ? 'سياسة الاسترجاع والاستبدال (14 يوماً)' : 'Returns & Exchanges (14 Days)'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/policies/shipping`} className="hover:text-burgundy transition-colors">
                  {isAr ? 'الشحن والتوصيل في قطر' : 'Shipping & Delivery in Qatar'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/policies/privacy`} className="hover:text-burgundy transition-colors">
                  {isAr ? 'سياسة الخصوصية وسرية البيانات' : 'Privacy & Data Protection'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/policies/terms`} className="hover:text-burgundy transition-colors">
                  {isAr ? 'الشروط والأحكام' : 'Terms & Conditions'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/complaints`} className="hover:text-burgundy transition-colors text-coral font-medium">
                  {isAr ? 'تقديم شكوى أو اقتراح رسمي' : 'File a Formal Complaint'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details & Qatar Legal Compliance */}
          <div className="space-y-2.5 text-xs text-slateText-secondary">
            <h4 className="text-sm font-bold text-burgundy mb-3 font-cairo">
              {isAr ? 'بيانات التواصل والتراخيص' : 'Official Licensing & Support'}
            </h4>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-burgundy shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slateText-body">{settings.legalEntityName[lang]}</span>
                <p>
                  <a
                    href="https://maps.google.com/?q=Al+Waab,+Doha,+Qatar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline text-burgundy inline-flex items-center gap-1"
                  >
                    <span>{settings.address}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-burgundy shrink-0" />
              <a href={`tel:${settings.contactPhone}`} className="hover:underline font-semibold" dir="ltr">
                {settings.contactPhone}
              </a>
            </div>

            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-burgundy shrink-0" />
              <a href={`mailto:${settings.contactEmail}`} className="hover:underline">
                {settings.contactEmail}
              </a>
            </div>

            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-burgundy shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slateText-body">
                  {isAr ? 'ساعات خدمة العملاء:' : 'Support Hours:'}
                </span>
                <p className="text-[11px]">{settings.customerServiceHours[lang]}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Regulatory Ribbon */}
        <div className="pt-6 pb-2 text-[11px] text-slateText-secondary flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-1">
            <span>
              <strong className="text-slateText-body">{isAr ? 'السجل التجاري (CR):' : 'CR No:'}</strong>{' '}
              <span dir="ltr">{settings.crNumber}</span>
            </span>
            <span>•</span>
            <span>
              <strong className="text-slateText-body">{isAr ? 'رخصة التجارة الإلكترونية:' : 'E-Com License:'}</strong>{' '}
              <span dir="ltr">{settings.licenseNumber}</span>
            </span>
            <span>•</span>
            <span>{complianceConfig.mociDecisionReference}</span>
          </div>

          <p className="text-center md:text-end">
            {isAr
              ? `جميع الحقوق محفوظة لمؤسسة بيرغندي للأزياء © ${new Date().getFullYear()}`
              : `All Rights Reserved. BURGUNDY Fashion © ${new Date().getFullYear()}`}
          </p>
        </div>

      </div>
    </footer>
  );
}
