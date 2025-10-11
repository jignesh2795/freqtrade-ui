import React from 'react';
import { clsx } from 'clsx';

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  size = 'md',
}) => {
  const sizeStyles = {
    sm: {
      track: 'w-8 h-4',
      thumb: 'w-3 h-3',
      translate: 'translate-x-4',
    },
    md: {
      track: 'w-11 h-6',
      thumb: 'w-5 h-5',
      translate: 'translate-x-5',
    },
    lg: {
      track: 'w-14 h-7',
      thumb: 'w-6 h-6',
      translate: 'translate-x-7',
    },
  };

  const currentSize = sizeStyles[size];

  return (
    <label
      className={clsx(
        'flex items-center gap-3',
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
      )}
    >
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only"
        />
        
        <div
          className={clsx(
            currentSize.track,
            'rounded-full transition-colors duration-200',
            checked
              ? 'bg-primary-600'
              : 'bg-dark-700 border-2 border-dark-600'
          )}
        />
        
        <div
          className={clsx(
            currentSize.thumb,
            'absolute top-0.5 left-0.5 rounded-full',
            'bg-white shadow-md',
            'transition-transform duration-200',
            checked && currentSize.translate
          )}
        />
      </div>

      {label && (
        <span className="text-sm font-medium text-dark-200">{label}</span>
      )}
    </label>
  );
};