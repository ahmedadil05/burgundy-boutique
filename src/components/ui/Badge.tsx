import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'new' | 'sale' | 'soldout' | 'heritage' | 'neutral' | 'sample' | 'madeToOrder';
  size?: 'sm' | 'md';
}

export function Badge({
  children,
  variant = 'neutral',
  size = 'md',
  className,
  ...props
}: BadgeProps) {
  const baseStyles = 'inline-flex items-center font-medium rounded-full tracking-wide uppercase';

  const sizeStyles = {
    sm: 'text-[10px] px-2 py-0.5 leading-tight',
    md: 'text-xs px-2.5 py-1 leading-tight',
  };

  const variantStyles: Record<string, string> = {
    new: 'bg-peach-soft text-cocoa-dark font-semibold border border-peach-deep/30',
    sale: 'bg-coral-ink text-white font-bold shadow-sm',
    soldout: 'bg-cocoa-muted text-cream-light font-medium',
    heritage: 'bg-[#E3B873] text-[#3B2A24] font-semibold border border-[#CBA05C]',
    neutral: 'bg-blush-surface text-cocoa-dark border border-peach-soft/40',
    sample: 'bg-burgundy text-white font-semibold border border-burgundy/30',
    madeToOrder: 'bg-peach-soft/60 text-burgundy font-semibold border border-peach-deep/40',
  };

  return (
    <span
      className={twMerge(clsx(baseStyles, sizeStyles[size], variantStyles[variant], className))}
      {...props}
    >
      {children}
    </span>
  );
}
