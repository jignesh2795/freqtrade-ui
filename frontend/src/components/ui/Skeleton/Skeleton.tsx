import React from 'react';
import { clsx } from 'clsx';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'rectangular',
  width,
  height,
  animation = 'pulse',
  className,
  style,
  ...props
}) => {
  const variantStyles = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  const animationStyles = {
    pulse: 'animate-pulse',
    wave: 'shimmer',
    none: '',
  };

  return (
    <div
      className={clsx(
        'bg-dark-700',
        variantStyles[variant],
        animationStyles[animation],
        className
      )}
      style={{
        width,
        height: variant === 'text' ? undefined : height,
        ...style,
      }}
      {...props}
    />
  );
};