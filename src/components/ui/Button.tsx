import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5 shadow-sm',
    md: 'text-sm px-5 py-2.5 gap-2 shadow',
    lg: 'text-base px-7 py-3.5 gap-2.5 shadow-md',
  };

  const variantStyles = {
    primary:
      'bg-coral-warm text-white hover:bg-coral-hover focus:ring-coral-warm shadow-warm hover:shadow-warm-lg',
    secondary:
      'bg-peach-deep text-cocoa-dark hover:bg-peach-soft focus:ring-peach-deep border border-peach-soft/50',
    ghost:
      'bg-transparent text-cocoa-dark hover:bg-blush-surface focus:ring-peach-deep',
    outline:
      'bg-transparent text-cocoa-dark border-2 border-peach-deep hover:bg-blush-surface focus:ring-coral-warm',
  };

  return (
    <button
      className={twMerge(
        clsx(baseStyles, sizeStyles[size], variantStyles[variant], className)
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        icon && <span className="inline-flex shrink-0">{icon}</span>
      )}
      <span>{children}</span>
    </button>
  );
}
