import React from 'react';

interface ConnectionPointProps {
  id: string;
  type: 'input' | 'output';
  x: number;
  y: number;
  onConnectionStart?: (e: React.MouseEvent, id: string) => void;
  onConnectionEnd?: (e: React.MouseEvent, id: string) => void;
}

export function ConnectionPoint({
  id,
  type,
  x,
  y,
  onConnectionStart,
  onConnectionEnd
}: ConnectionPointProps) {
  const handleMouseDown = (e: React.MouseEvent) => {
    if (onConnectionStart) {
      onConnectionStart(e, id);
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (onConnectionEnd) {
      onConnectionEnd(e, id);
    }
  };

  return (
    <div
      className={`
        absolute w-3 h-3 rounded-full border-2 cursor-crosshair
        ${type === 'input' 
          ? 'bg-dark-800 border-primary-500 -ml-1.5 -mt-1.5' 
          : 'bg-primary-500 border-dark-800 -mr-1.5 -mt-1.5'
        }
        hover:scale-125 transition-transform
      `}
      style={{
        left: type === 'input' ? 0 : '100%',
        top: '50%',
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    />
  );
}