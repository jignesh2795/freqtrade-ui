import React from 'react';
import { clsx } from 'clsx';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'success' | 'danger' | 'warning' | 'info';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  size = 'md',
  dot = false,
  children,
  className,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center font-medium rounded-full';

  const variantStyles = {
    default: 'bg-dark-700 text-dark-200',
    primary: 'bg-primary-500/10 text-primary-400 border border-primary-500/30',
    success: 'bg-success-500/10 text-success-400 border border-success-500/30',
    danger: 'bg-danger-500/10 text-danger-400 border border-danger-500/30',
    warning: 'bg-warning-500/10 text-warning-400 border border-warning-500/30',
    info: 'bg-accent-500/10 text-accent-400 border border-accent-500/30',
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };

  const dotColors = {
    default: 'bg-dark-400',
    primary: 'bg-primary-500',
    success: 'bg-success-500',
    danger: 'bg-danger-500',
    warning: 'bg-warning-500',
    info: 'bg-accent-500',
  };

  return (
    <span
      className={clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={clsx(
            'w-1.5 h-1.5 rounded-full mr-1.5',
            dotColors[variant]
          )}
        />
      )}
      {children}
    </span>
  );
};