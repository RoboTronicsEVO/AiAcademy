import React, { forwardRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onValidate?: (value: string) => string | undefined;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  onValidate,
  className,
  onBlur,
  onChange,
  id,
  ...props
}, ref) => {
  const [touched, setTouched] = useState(false);
  const [validationError, setValidationError] = useState<string>();
  
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;
  
  const displayError = touched ? (error || validationError) : undefined;

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched(true);
    if (onValidate) {
      const validationResult = onValidate(e.target.value);
      setValidationError(validationResult);
    }
    onBlur?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only validate on change if already touched (NN/g guidelines)
    if (touched && onValidate) {
      const validationResult = onValidate(e.target.value);
      setValidationError(validationResult);
    }
    onChange?.(e);
  };

  const inputClasses = cn(
    'w-full px-3 py-2.5 rounded-xl border transition-all duration-200',
    'font-body text-base min-h-touch', // 16px minimum, 44px touch target
    'focus:outline-none focus:ring-3 focus:ring-primary-500/20',
    'placeholder:text-neutral-400',
    {
      'border-neutral-200 focus:border-primary-500': !displayError,
      'border-error focus:border-error': displayError,
      'pl-10': leftIcon,
      'pr-10': rightIcon,
    },
    className
  );

  return (
    <div className="space-y-1">
      {label && (
        <label 
          htmlFor={inputId}
          className="block text-sm font-medium text-neutral-900"
        >
          {label}
          {props.required && (
            <span className="text-error ml-1" aria-label="required">*</span>
          )}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400">
            {leftIcon}
          </div>
        )}
        
        <input
          ref={ref}
          id={inputId}
          className={inputClasses}
          onBlur={handleBlur}
          onChange={handleChange}
          aria-invalid={!!displayError}
          aria-describedby={cn(
            displayError && errorId,
            helperText && helperId
          )}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400">
            {rightIcon}
          </div>
        )}
      </div>
      
      {displayError && (
        <p 
          id={errorId}
          className="text-sm text-error flex items-center gap-1"
          role="alert"
          aria-live="polite"
        >
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {displayError}
        </p>
      )}
      
      {helperText && !displayError && (
        <p 
          id={helperId}
          className="text-sm text-neutral-500"
        >
          {helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;