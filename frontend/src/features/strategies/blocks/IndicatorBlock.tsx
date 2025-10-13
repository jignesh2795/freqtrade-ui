import React from 'react';
import { BlockBase } from './BlockBase';
import { IndicatorType, INDICATOR_CONFIGS } from '@/types/strategy';

interface IndicatorBlockProps {
  id: string;
  x: number;
  y: number;
  indicatorType: IndicatorType;
  parameters: Record<string, number | string>;
  outputs: number;
  onDragStart: (e: React.DragEvent, id: string) => void;
  onDragEnd: (e: React.DragEvent) => void;
  onConnectionStart?: (e: React.MouseEvent, id: string) => void;
  onConnectionEnd?: (e: React.MouseEvent, id: string) => void;
  isSelected?: boolean;
}

export function IndicatorBlock({
  id,
  x,
  y,
  indicatorType,
  parameters,
  outputs,
  onDragStart,
  onDragEnd,
  onConnectionStart,
  onConnectionEnd,
  isSelected
}: IndicatorBlockProps) {
  const config = INDICATOR_CONFIGS[indicatorType];
  
  return (
    <BlockBase
      id={id}
      type="indicator"
      position={{ x, y }}
      label={config.label}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onConnectionStart={onConnectionStart}
      onConnectionEnd={onConnectionEnd}
      isSelected={isSelected}
    >
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-dark-700">
        <div className={`w-4 h-4 rounded-full ${config.color}`}></div>
      </div>
      <div className="mt-2 text-xs text-dark-300">
        <div>Period: 14</div>
        <div>Source: Close</div>
      </div>
    </BlockBase>
  );
}