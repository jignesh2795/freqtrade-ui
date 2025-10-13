import React from 'react';
import { BlockBase } from './BlockBase';
import { ActionType } from '@/types/strategy';

interface ActionBlockProps {
  id: string;
  x: number;
  y: number;
  actionType: ActionType;
  onDragStart: (e: React.DragEvent, id: string) => void;
  onDragEnd: (e: React.DragEvent) => void;
  onConnectionStart?: (e: React.MouseEvent, id: string) => void;
  onConnectionEnd?: (e: React.MouseEvent, id: string) => void;
  isSelected?: boolean;
}

const actionConfig: Record<ActionType, { title: string; description: string; color: string }> = {
  buy: { title: 'Buy', description: 'Enter long position', color: 'bg-green-500' },
  sell: { title: 'Sell', description: 'Exit position', color: 'bg-red-500' },
  hold: { title: 'Hold', description: 'Maintain position', color: 'bg-yellow-500' }
};

export function ActionBlock({
  id,
  x,
  y,
  actionType,
  onDragStart,
  onDragEnd,
  onConnectionStart,
  onConnectionEnd,
  isSelected
}: ActionBlockProps) {
  const config = actionConfig[actionType];
  
  return (
    <BlockBase
      id={id}
      title={config.title}
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
        <div className={`w-4 h-4 rounded-full ${config.color}`}></div>
      </div>
      <div className="mt-2 text-xs text-dark-300">
        <div>Amount: 100%</div>
        <div>Leverage: 1x</div>
      </div>
    </BlockBase>
  );
}