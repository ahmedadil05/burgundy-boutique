import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export function Input({
  label,
  error,
  helperText,
  id,
  className,
  ...props
}: InputProps) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-semibold text-cocoa-dark mb-1.5"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={twMerge(
          clsx(
            'w-full px-3.5 py-2.5 rounded-xl border bg-white/80 text-cocoa-dark placeholder:text-cocoa-light/60 transition-colors duration-150',
            'focus:outline-none focus:ring-2 focus:ring-coral-warm/50 focus:border-coral-warm',
            error
              ? 'border-red-500 focus:ring-red-300'
              : 'border-peach-soft hover:border-peach-deep',
            className
          )
        )}
        {...props}
      />
      {error ? (
        <p className="mt-1 text-xs text-red-600">{error}</p>
      ) : helperText ? (
        <p className="mt-1 text-xs text-cocoa-muted">{helperText}</p>
      ) : null}
    </div>
  );
}
