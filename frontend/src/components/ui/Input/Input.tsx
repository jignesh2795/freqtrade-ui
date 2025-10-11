import React from 'react';
import { clsx } from 'clsx';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputStyles = clsx(
      'w-full px-4 py-2 bg-dark-800 border rounded-lg',
      'text-dark-100 placeholder-dark-500',
      'transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-0',
      error
        ? 'border-danger-500 focus:ring-danger-500'
        : 'border-dark-600 focus:ring-primary-500 focus:border-primary-500',
      disabled && 'opacity-50 cursor-not-allowed',
      leftIcon && 'pl-10',
      rightIcon && 'pr-10',
      className
    );

    return (
      <div className={clsx('flex flex-col gap-1', fullWidth ? 'w-full' : 'w-auto')}>
        {label && (
          <label className="text-sm font-medium text-dark-200">
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400">
              {leftIcon}
            </div>
          )}
          
          <input
            ref={ref}
            disabled={disabled}
            className={inputStyles}
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-400">
              {rightIcon}
            </div>
          )}
        </div>
        
        {error && (
          <span className="text-sm text-danger-500">{error}</span>
        )}
        
        {helperText && !error && (
          <span className="text-sm text-dark-400">{helperText}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';