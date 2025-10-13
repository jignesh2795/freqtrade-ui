import React from 'react';
import { BlockBase } from './BlockBase';
import { ConditionType, CONDITION_CONFIGS } from '@/types/strategy';

interface ConditionBlockProps {
  id: string;
  x: number;
  y: number;
  conditionType: ConditionType;
  parameters: Record<string, number | string>;
  inputs: number;
  outputs: number;
  onDragStart: (e: React.DragEvent, id: string) => void;
  onDragEnd: (e: React.DragEvent) => void;
  onConnectionStart?: (e: React.MouseEvent, id: string) => void;
  onConnectionEnd?: (e: React.MouseEvent, id: string) => void;
  isSelected?: boolean;
};

export function ConditionBlock({
  id,
  x,
  y,
  conditionType,
  parameters,
  inputs,
  outputs,
  onDragStart,
  onDragEnd,
  onConnectionStart,
  onConnectionEnd,
  isSelected
}: ConditionBlockProps) {
  const config = CONDITION_CONFIGS[conditionType];
  
  return (
    <BlockBase
      id={id}
      type="condition"
      position={{ x, y }}
      label={config.label}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onConnectionStart={onConnectionStart}
      onConnectionEnd={onConnectionEnd}
      isSelected={isSelected}
    >
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-dark-700">
        <span className="text-lg font-bold text-dark-100">{config.symbol}</span>
      </div>
      <div className="mt-2 text-xs text-dark-300">
        <div>Left: Indicator</div>
        <div>Right: Value</div>
      </div>
    </BlockBase>
  );
}