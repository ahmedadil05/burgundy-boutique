import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export function Textarea({
  label,
  error,
  helperText,
  id,
  className,
  ...props
}: TextareaProps) {
  const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-xs font-semibold text-cocoa-dark mb-1.5"
        >
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        rows={4}
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

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Array<{ value: string; label: string }>;
}

export function Select({ label, error, options, id, className, ...props }: SelectProps) {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={selectId}
          className="block text-xs font-semibold text-cocoa-dark mb-1.5"
        >
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={twMerge(
          clsx(
            'w-full px-3.5 py-2.5 rounded-xl border bg-white/80 text-cocoa-dark transition-colors duration-150',
            'focus:outline-none focus:ring-2 focus:ring-coral-warm/50 focus:border-coral-warm',
            error ? 'border-red-500' : 'border-peach-soft hover:border-peach-deep',
            className
          )
        )}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
}

export function Checkbox({ label, id, className, ...props }: CheckboxProps) {
  const checkboxId = id || (typeof label === 'string' ? label.slice(0, 15).replace(/\s+/g, '-') : undefined);

  return (
    <label htmlFor={checkboxId} className="flex items-start gap-2.5 cursor-pointer text-xs text-cocoa-dark select-none leading-relaxed">
      <input
        type="checkbox"
        id={checkboxId}
        className={twMerge(
          clsx(
            'mt-0.5 w-4 h-4 rounded text-coral-ink border-peach-deep/60 focus:ring-coral-warm transition-colors cursor-pointer accent-coral-warm',
            className
          )
        )}
        {...props}
      />
      <span>{label}</span>
    </label>
  );
}
