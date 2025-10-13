import React from 'react';
import { BlockBase } from './BlockBase';
import { ConditionOperator } from '@/types/strategy';

interface ConditionBlockProps {
  id: string;
  x: number;
  y: number;
  operator: ConditionOperator;
  onDragStart: (e: React.DragEvent, id: string) => void;
  onDragEnd: (e: React.DragEvent) => void;
  onConnectionStart?: (e: React.MouseEvent, id: string) => void;
  onConnectionEnd?: (e: React.MouseEvent, id: string) => void;
  isSelected?: boolean;
}

const operatorConfig: Record<ConditionOperator, { symbol: string; description: string }> = {
  greater_than: { symbol: '>', description: 'Greater than' },
  less_than: { symbol: '<', description: 'Less than' },
  crosses_above: { symbol: '↑', description: 'Crosses above' },
  crosses_below: { symbol: '↓', description: 'Crosses below' },
  equals: { symbol: '=', description: 'Equals' }
};

export function ConditionBlock({
  id,
  x,
  y,
  operator,
  onDragStart,
  onDragEnd,
  onConnectionStart,
  onConnectionEnd,
  isSelected
}: ConditionBlockProps) {
  const config = operatorConfig[operator];
  
  return (
    <BlockBase
      id={id}
      title="Condition"
      description={config.description}
      x={x}
      y={y}
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