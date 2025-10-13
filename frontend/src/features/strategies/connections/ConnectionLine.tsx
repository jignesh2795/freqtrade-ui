import React from 'react';

interface ConnectionLineProps {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  isSelected?: boolean;
}

export function ConnectionLine({
  id,
  x1,
  y1,
  x2,
  y2,
  isSelected = false
}: ConnectionLineProps) {
  // Calculate the length and angle of the line
  const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
  
  return (
    <div
      className={`
        absolute h-0.5 origin-left
        ${isSelected ? 'bg-primary-400' : 'bg-primary-500'}
      `}
      style={{
        left: x1,
        top: y1,
        width: length,
        transform: `rotate(${angle}deg)`,
        transformOrigin: '0 0',
      }}
    />
  );
}