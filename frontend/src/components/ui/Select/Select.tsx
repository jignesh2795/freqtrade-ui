import React, { useState } from 'react';
import { clsx } from 'clsx';
import { ChevronDown, Check } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  label?: string;
  options: SelectOption[];
  value?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  onChange?: (value: string) => void;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  value,
  placeholder = 'Select an option',
  error,
  disabled = false,
  fullWidth = false,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find((opt) => opt.value === value);

  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue);
    setIsOpen(false);
  };

  const selectStyles = clsx(
    'w-full px-4 py-2 bg-dark-800 border rounded-lg',
    'text-dark-100 cursor-pointer',
    'transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-0',
    error
      ? 'border-danger-500 focus:ring-danger-500'
      : 'border-dark-600 focus:ring-primary-500 focus:border-primary-500',
    disabled && 'opacity-50 cursor-not-allowed'
  );

  return (
    <div className={clsx('relative', fullWidth ? 'w-full' : 'w-auto')}>
      {label && (
        <label className="block text-sm font-medium text-dark-200 mb-1">
          {label}
        </label>
      )}

      <div className="relative">
        <button
          type="button"
          disabled={disabled}
          className={selectStyles}
          onClick={() => !disabled && setIsOpen(!isOpen)}
        >
          <div className="flex items-center justify-between">
            <span className={clsx(!selectedOption && 'text-dark-500')}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <ChevronDown
              className={clsx(
                'w-5 h-5 text-dark-400 transition-transform',
                isOpen && 'rotate-180'
              )}
            />
          </div>
        </button>

        {isOpen && !disabled && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown */}
            <div className="absolute z-20 w-full mt-2 bg-dark-800 border border-dark-600 rounded-lg shadow-lg max-h-60 overflow-auto">
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  disabled={option.disabled}
                  className={clsx(
                    'w-full px-4 py-2 text-left flex items-center justify-between',
                    'transition-colors duration-150',
                    option.disabled
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-dark-700 cursor-pointer',
                    option.value === value && 'bg-dark-700'
                  )}
                  onClick={() => !option.disabled && handleSelect(option.value)}
                >
                  <span className="text-dark-100">{option.label}</span>
                  {option.value === value && (
                    <Check className="w-4 h-4 text-primary-500" />
                  )}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {error && <span className="text-sm text-danger-500 mt-1">{error}</span>}
    </div>
  );
};