import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
  /** Render the single child element (e.g. a Next.js <Link>) with button styles. */
  asChild?: boolean;
}

const baseStyles =
  'inline-flex items-center justify-center font-semibold rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy focus-visible:ring-offset-2 focus-visible:ring-offset-canvas active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100';

const sizeStyles = {
  sm: 'text-xs px-3.5 py-1.5 gap-1.5 shadow-sm',
  md: 'text-sm px-5 py-2.5 gap-2 shadow',
  lg: 'text-base px-7 py-3.5 gap-2.5 shadow-md',
};

const variantStyles = {
  primary:
    'bg-burgundy text-white hover:bg-burgundy-hover border border-gold-hairline/40 shadow-luxury',
  secondary:
    'bg-surface-peachSoft text-burgundy-deep hover:bg-peach-sorbet border border-gold-hairline',
  ghost: 'bg-transparent text-burgundy hover:bg-burgundy-subtle',
  outline:
    'bg-transparent text-burgundy border border-gold-hairline hover:bg-burgundy-subtle',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  className,
  disabled,
  asChild = false,
  type = 'button',
  ...props
}: ButtonProps) {
  const composed = twMerge(
    clsx(baseStyles, sizeStyles[size], variantStyles[variant], className)
  );

  // Allows <Button asChild><Link href="…">…</Link></Button> without nesting
  // a <button> inside an <a>.
  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{
      className?: string;
      children?: React.ReactNode;
    }>;
    const childProps = child.props;
    // `disabled` and `type` are already destructured out of Button props,
    // so `props` only carries link-safe attributes (onClick, aria-*, data-*, …).
    const linkProps = props;

    return React.cloneElement(child, {
      ...linkProps,
      className: twMerge(composed, childProps.className),
      children: (
        <>
          {!isLoading && icon && <span className="inline-flex shrink-0">{icon}</span>}
          {childProps.children}
        </>
      ),
    });
  }

  return (
    <button
      type={type}
      className={composed}
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
