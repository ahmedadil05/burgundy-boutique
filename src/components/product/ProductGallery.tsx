'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Language } from '../../lib/i18n';

export interface ProductGalleryProps {
  images: string[];
  title: string;
  badge?: 'new' | 'sale' | 'soldout' | 'heritage' | 'sample' | 'madeToOrder' | string;
  lang?: Language;
}

export function ProductGallery({
  images,
  title,
  badge,
  lang = 'ar',
}: ProductGalleryProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const isAr = lang === 'ar';

  const nextImage = () => {
    setSelectedIdx((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails list */}
      <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto shrink-0 pb-2 md:pb-0">
        {images.map((img, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setSelectedIdx(idx)}
            className={`relative aspect-[3/4] w-16 sm:w-20 rounded-2xl overflow-hidden border transition-all ${
              selectedIdx === idx
                ? 'border-burgundy ring-2 ring-burgundy/20 scale-95 shadow-md'
                : 'border-gold-hairline opacity-75 hover:opacity-100'
            }`}
          >
            <img
              src={img}
              alt={`${title} thumbnail ${idx + 1}`}
              className="w-full h-full object-cover object-top"
            />
          </button>
        ))}
      </div>

      {/* Main Large Image Container */}
      <div className="relative flex-1 aspect-[3/4] rounded-3xl overflow-hidden bg-canvas-warm/30 border border-gold-hairline shadow-luxury group">
        <img
          src={images[selectedIdx]}
          alt={`${title} - angle ${selectedIdx + 1}`}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />

        {/* Badge Overlay */}
        <div className="absolute top-4 start-4 flex flex-col gap-2 z-10">
          {badge === 'heritage' && (
            <Badge variant="heritage" size="md">
              {isAr ? 'مشغول يدوياً' : 'Hand-Painted'}
            </Badge>
          )}
          {badge === 'new' && (
            <Badge variant="new" size="md">
              {isAr ? 'جديد' : 'New Arrival'}
            </Badge>
          )}
          {badge === 'sale' && (
            <Badge variant="sale" size="md">
              {isAr ? 'تخفيض' : 'Sale'}
            </Badge>
          )}
          {badge === 'sample' && (
            <Badge variant="sample" size="md">
              {isAr ? 'عينة تجريبية' : 'Sample Demo'}
            </Badge>
          )}
          {badge === 'madeToOrder' && (
            <Badge variant="madeToOrder" size="md">
              {isAr ? 'تفصيل يدوي بالطلب' : 'Made to Order'}
            </Badge>
          )}
        </div>

        {/* Zoom Trigger Button */}
        <button
          type="button"
          onClick={() => setIsZoomed(true)}
          className="absolute bottom-4 end-4 p-2.5 rounded-full bg-white/90 text-slateText-body hover:text-burgundy hover:bg-white shadow-md border border-gold-hairline transition-all backdrop-blur-sm"
          aria-label="Zoom image"
        >
          <ZoomIn className="w-5 h-5" />
        </button>

        {/* Nav Arrows (if multiple images) */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prevImage}
              className="absolute top-1/2 start-3 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-burgundy shadow-md border border-gold-hairline transition-all opacity-0 group-hover:opacity-100"
              aria-label="Previous image"
            >
              {isAr ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </button>
            <button
              type="button"
              onClick={nextImage}
              className="absolute top-1/2 end-3 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-burgundy shadow-md border border-gold-hairline transition-all opacity-0 group-hover:opacity-100"
              aria-label="Next image"
            >
              {isAr ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </button>
          </>
        )}
      </div>

      {/* Lightbox Zoom Modal */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fadeIn"
          onClick={() => setIsZoomed(false)}
        >
          <div className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl">
            <img
              src={images[selectedIdx]}
              alt={title}
              className="w-full h-full object-contain max-h-[85vh]"
            />
            <p className="text-center text-xs text-canvas-warm mt-2">
              {isAr ? 'انقري في أي مكان للإغلاق' : 'Click anywhere to close'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
