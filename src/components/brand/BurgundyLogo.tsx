'use client';

import React from 'react';
import Link from 'next/link';

export interface BurgundyLogoProps {
  variant?: 'full' | 'compact' | 'emblem' | 'wordmark';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  lang?: 'ar' | 'en';
  className?: string;
  isLight?: boolean;
}

export function BurgundyLogo({
  variant = 'full',
  size = 'md',
  href,
  lang = 'ar',
  className = '',
  isLight = false,
}: BurgundyLogoProps) {
  const isAr = lang === 'ar';

  const emblemSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  const wordmarkSizes = {
    sm: 'text-lg',
    md: 'text-xl sm:text-2xl',
    lg: 'text-2xl sm:text-3xl',
  };

  const burgundyColor = isLight ? '#FFFFFF' : '#5F0F40';
  const goldColor = '#D9B97A';
  const textColor = isLight ? 'text-white' : 'text-burgundy';
  const subtextColor = isLight ? 'text-gold/90' : 'text-gold';

  // Bespoke Luxury Emblem SVG: Royal Crown + Kandaka Lotus Monogram
  const Emblem = (
    <div className={`relative shrink-0 flex items-center justify-center ${emblemSizes[size]}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm"
        aria-hidden="true"
      >
        {/* Outer Fine Gold Diamond / Octagonal Seal */}
        <polygon
          points="50,4 96,50 50,96 4,50"
          stroke={goldColor}
          strokeWidth="1.5"
          strokeOpacity="0.75"
          fill="none"
        />
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke={goldColor}
          strokeWidth="0.8"
          strokeDasharray="2 3"
          strokeOpacity="0.6"
        />

        {/* Inner Solid Crest Background */}
        <polygon
          points="50,12 88,50 50,88 12,50"
          fill={burgundyColor}
          fillOpacity={isLight ? '0.2' : '0.06'}
        />

        {/* Regal Kandaka Crown (Top Arc) */}
        <path
          d="M34 32 L40 40 L50 26 L60 40 L66 32 L64 45 L36 45 Z"
          fill={goldColor}
          fillOpacity="0.9"
        />
        <circle cx="50" cy="23" r="2.2" fill={goldColor} />
        <circle cx="34" cy="29" r="1.6" fill={goldColor} />
        <circle cx="66" cy="29" r="1.6" fill={goldColor} />

        {/* Haute Couture Stylized Monogram "B" */}
        <path
          d="M40 47 H52 C56 47 58 49 58 52 C58 55 55 57 52 57 H43 V47 Z"
          fill={burgundyColor}
        />
        <path
          d="M40 56 H54 C58 56 61 58 61 62 C61 66 57 69 52 69 H40 V56 Z"
          fill={burgundyColor}
        />
        <line x1="40" y1="45" x2="40" y2="72" stroke={burgundyColor} strokeWidth="3.2" strokeLinecap="round" />

        {/* Symmetrical Fine Gold Quill / Brush Accent */}
        <path
          d="M50 74 C44 79 38 82 34 83 C38 81 44 76 50 74 Z"
          fill={goldColor}
        />
        <path
          d="M50 74 C56 79 62 82 66 83 C62 81 56 76 50 74 Z"
          fill={goldColor}
        />
        <circle cx="50" cy="74" r="1.8" fill={goldColor} />
      </svg>
    </div>
  );

  const Content = (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 ${className}`}>
      {variant !== 'wordmark' && Emblem}

      {variant !== 'emblem' && (
        <div className="flex flex-col items-start leading-none select-none">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-cormorant font-bold uppercase tracking-[0.22em] ${wordmarkSizes[size]} ${textColor} transition-colors`}
            >
              BURGUNDY
            </span>
          </div>

          {variant === 'full' && (
            <div className="flex items-center gap-1.5 mt-0.5">
              <span
                className={`text-[8px] sm:text-[9.5px] uppercase tracking-[0.24em] font-medium ${subtextColor}`}
              >
                {isAr ? 'دار بيرغندي • الدوحة' : 'HAUTE COUTURE • DOHA'}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="group inline-flex items-center focus:outline-none">
        {Content}
      </Link>
    );
  }

  return Content;
}
