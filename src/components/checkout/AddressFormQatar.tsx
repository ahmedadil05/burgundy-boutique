'use client';

import React from 'react';
import { Input } from '../ui/Input';
import { Select } from '../ui/Controls';
import { Language } from '../../lib/i18n';
import { MapPin, Phone, Mail, User } from 'lucide-react';

export interface AddressFormData {
  fullName: string;
  phone: string;
  email: string;
  destination: 'qatar' | 'gcc';
  municipality: string;
  zone: string;
  street: string;
  building: string;
  notes?: string;
}

export interface AddressFormQatarProps {
  formData: AddressFormData;
  onChange: (data: AddressFormData) => void;
  lang?: Language;
}

export function AddressFormQatar({
  formData,
  onChange,
  lang = 'ar',
}: AddressFormQatarProps) {
  const isAr = lang === 'ar';

  const municipalities = [
    { value: 'Doha', label: isAr ? 'بلدية الدوحة (Doha Municipality)' : 'Doha Municipality' },
    { value: 'Al Rayyan', label: isAr ? 'بلدية الريان (Al Rayyan Municipality)' : 'Al Rayyan Municipality' },
    { value: 'Al Wakrah', label: isAr ? 'بلدية الوكرة (Al Wakrah Municipality)' : 'Al Wakrah Municipality' },
    { value: 'Al Daayen', label: isAr ? 'بلدية الظعاين (Al Daayen / Lusail)' : 'Al Daayen / Lusail' },
    { value: 'Umm Salal', label: isAr ? 'بلدية أم صلال (Umm Salal)' : 'Umm Salal' },
    { value: 'Al Khor', label: isAr ? 'بلدية الخور والذخيرة (Al Khor)' : 'Al Khor & Al Dhakhira' },
  ];

  return (
    <div className="bg-white/85 rounded-3xl p-6 sm:p-8 border border-peach-soft shadow-sm space-y-6">
      <div className="flex items-center gap-2 pb-3 border-b border-peach-soft text-cocoa-dark font-bold font-cairo">
        <MapPin className="w-5 h-5 text-coral-warm" />
        <span>{isAr ? 'بيانات التوصيل والعنوان في قطر' : 'Qatar Delivery Address & Contact'}</span>
      </div>

      {/* Destination Switcher */}
      <div className="flex gap-2 p-1 bg-cream rounded-2xl border border-peach-soft">
        <button
          type="button"
          onClick={() => onChange({ ...formData, destination: 'qatar' })}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
            formData.destination === 'qatar'
              ? 'bg-coral-warm text-white shadow-sm'
              : 'text-cocoa-muted hover:text-cocoa-dark'
          }`}
        >
          {isAr ? 'توصيل داخل دولة قطر (24-48 ساعة)' : 'Domestic Qatar (24-48 hrs)'}
        </button>
        <button
          type="button"
          onClick={() => onChange({ ...formData, destination: 'gcc' })}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
            formData.destination === 'gcc'
              ? 'bg-coral-warm text-white shadow-sm'
              : 'text-cocoa-muted hover:text-cocoa-dark'
          }`}
        >
          {isAr ? 'شحن لدول الخليج (GCC)' : 'GCC Shipping (3-5 days)'}
        </button>
      </div>

      {/* Contact info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label={isAr ? 'الاسم الكامل *' : 'Full Name *'}
          required
          placeholder={isAr ? 'مثال: نورة السليطي' : 'e.g. Noora Al-Sulaiti'}
          value={formData.fullName}
          onChange={(e) => onChange({ ...formData, fullName: e.target.value })}
        />
        <Input
          label={isAr ? 'رقم الهاتف القطري (+974) *' : 'Qatar Mobile (+974) *'}
          required
          type="tel"
          placeholder="+974 5500 0000"
          value={formData.phone}
          onChange={(e) => onChange({ ...formData, phone: e.target.value })}
          helperText={isAr ? 'للاتصال وتنسيق التوصيل بدقة' : 'For delivery coordination'}
        />
      </div>

      <Input
        label={isAr ? 'البريد الإلكتروني (لاستلام الفاتورة الرسمية) *' : 'Email Address (for Official Tax Invoice) *'}
        required
        type="email"
        placeholder="name@domain.qa"
        value={formData.email}
        onChange={(e) => onChange({ ...formData, email: e.target.value })}
      />

      {/* Qatar Address Standard: Zone, Street, Building */}
      {formData.destination === 'qatar' ? (
        <div className="space-y-4 pt-2 border-t border-peach-soft/60">
          <Select
            label={isAr ? 'البلدية / المنطقة الكبرى *' : 'Municipality *'}
            options={municipalities}
            value={formData.municipality}
            onChange={(e) => onChange({ ...formData, municipality: e.target.value })}
          />

          <div className="grid grid-cols-3 gap-3">
            <Input
              label={isAr ? 'رقم المنطقة (Zone) *' : 'Zone Number *'}
              required
              placeholder="e.g. 55"
              value={formData.zone}
              onChange={(e) => onChange({ ...formData, zone: e.target.value })}
            />
            <Input
              label={isAr ? 'الشارع (Street) *' : 'Street No/Name *'}
              required
              placeholder="e.g. 840"
              value={formData.street}
              onChange={(e) => onChange({ ...formData, street: e.target.value })}
            />
            <Input
              label={isAr ? 'المبنى / الفيلا (Bldg) *' : 'Building/Villa *'}
              required
              placeholder="e.g. 12"
              value={formData.building}
              onChange={(e) => onChange({ ...formData, building: e.target.value })}
            />
          </div>
          <p className="text-[11px] text-cocoa-muted">
            {isAr
              ? 'نظام العنونة القطري الرسمي (المنطقة / الشارع / المبنى) يضمن وصول مندوبنا مباشرة لباب منزلكِ.'
              : 'Official Qatar National Addressing (Zone / Street / Building) ensures direct doorstep delivery.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4 pt-2 border-t border-peach-soft/60">
          <Input
            label={isAr ? 'الدولة والمدينة في الخليج *' : 'GCC Country & City *'}
            required
            placeholder={isAr ? 'مثال: السعودية — الرياض' : 'e.g. Saudi Arabia — Riyadh'}
            value={formData.municipality}
            onChange={(e) => onChange({ ...formData, municipality: e.target.value })}
          />
          <Input
            label={isAr ? 'تفاصيل العنوان والحي والشارع *' : 'Street, District, Postal Code *'}
            required
            placeholder={isAr ? 'الحي، اسم الشارع، الرمز البريدي' : 'District, Street, Zip'}
            value={formData.street}
            onChange={(e) => onChange({ ...formData, street: e.target.value })}
          />
        </div>
      )}
    </div>
  );
}
