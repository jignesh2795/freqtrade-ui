import React from 'react';
import { clsx } from 'clsx';

export interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  showValue?: boolean;
  disabled?: boolean;
  marks?: { value: number; label: string }[];
}

export const Slider: React.FC<SliderProps> = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  showValue = true,
  disabled = false,
  marks,
}) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={clsx('w-full', disabled && 'opacity-50 cursor-not-allowed')}>
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-2">
          {label && (
            <label className="text-sm font-medium text-dark-200">{label}</label>
          )}
          {showValue && (
            <span className="text-sm font-mono text-dark-300">{value}</span>
          )}
        </div>
      )}

      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          disabled={disabled}
          className="sr-only"
        />

        {/* Custom Track */}
        <div className="relative h-2 bg-dark-800 rounded-full">
          {/* Progress */}
          <div
            className="absolute h-2 bg-primary-600 rounded-full transition-all"
            style={{ width: `${percentage}%` }}
          />

          {/* Thumb */}
          <div
            className={clsx(
              'absolute top-1/2 -translate-y-1/2 -translate-x-1/2',
              'w-5 h-5 bg-white rounded-full shadow-md',
              'border-2 border-primary-600',
              'transition-all',
              !disabled && 'hover:scale-110 cursor-grab active:cursor-grabbing'
            )}
            style={{ left: `${percentage}%` }}
          />
        </div>

        {/* Marks */}
        {marks && marks.length > 0 && (
          <div className="relative mt-2">
            {marks.map((mark) => {
              const markPercentage = ((mark.value - min) / (max - min)) * 100;
              return (
                <div
                  key={mark.value}
                  className="absolute -translate-x-1/2"
                  style={{ left: `${markPercentage}%` }}
                >
                  <div className="w-px h-2 bg-dark-600 mx-auto" />
                  <span className="text-xs text-dark-400 mt-1 block whitespace-nowrap">
                    {mark.label}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};