import React from 'react';
import { cn } from '@/lib/utils';
import type { BaseComponentProps } from '@/types/global';

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'>, BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  startIcon,
  endIcon,
  className,
  disabled,
  children,
  'data-testid': dataTestId,
  ...props
}) => {
  const baseClasses = [
    'inline-flex items-center justify-center gap-2',
    'font-medium rounded-xl transition-all duration-200',
    'focus:outline-none focus:ring-3 focus:ring-primary-500/20',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'min-w-touch min-h-touch', // WCAG touch target
    'active:scale-95',
    fullWidth && 'w-full',
  ];

  const variants = {
    primary: [
      'bg-primary-500 text-white',
      'hover:bg-primary-600 active:bg-primary-700',
      'shadow-md hover:shadow-lg',
    ],
    secondary: [
      'bg-neutral-100 text-neutral-900',
      'hover:bg-neutral-200 active:bg-neutral-300',
      'border border-neutral-200',
    ],
    accent: [
      'bg-accent-500 text-white text-lg', // ≥18px for contrast
      'hover:bg-accent-600 active:bg-red-700',
      'shadow-md hover:shadow-lg',
    ],
    outline: [
      'bg-transparent text-primary-500',
      'border-2 border-primary-500',
      'hover:bg-primary-50 active:bg-primary-100',
    ],
    ghost: [
      'bg-transparent text-primary-500',
      'hover:bg-primary-50 active:bg-primary-100',
    ],
  };

  const sizes = {
    sm: 'px-3 py-2 text-sm h-9',
    md: 'px-4 py-2.5 text-base h-11',
    lg: 'px-6 py-3 text-lg h-12',
  };

  const classes = cn(
    baseClasses,
    variants[variant],
    sizes[size],
    className
  );

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading}
      data-testid={dataTestId}
      {...props}
    >
      {(loading || startIcon) && (
        <span className="flex-shrink-0">
          {loading ? (
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          ) : (
            startIcon
          )}
        </span>
      )}
      {children}
      {endIcon && !loading && (
        <span className="flex-shrink-0">
          {endIcon}
        </span>
      )}
    </button>
  );
};

export default Button;