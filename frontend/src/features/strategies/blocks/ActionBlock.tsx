import React from 'react';
import { BlockBase } from '@/components/strategy/blocks/BlockBase';
import { ActionType, ACTION_CONFIGS } from '@/types/strategy';

interface ActionBlockProps {
  id: string;
  x: number;
  y: number;
  actionType: ActionType;
  parameters: Record<string, number | string>;
  inputs: number;
  onDragStart: (e: React.DragEvent, id: string) => void;
  onDragEnd: (e: React.DragEvent) => void;
  onConnectionStart?: (e: React.MouseEvent, id: string) => void;
  onConnectionEnd?: (e: React.MouseEvent, id: string) => void;
  isSelected?: boolean;
};

export function ActionBlock({
  id,
  x,
  y,
  actionType,
  parameters,
  inputs,
  onDragStart,
  onDragEnd,
  onConnectionStart,
  onConnectionEnd,
  isSelected
}: ActionBlockProps) {
  const config = ACTION_CONFIGS[actionType];
  
  return (
    <BlockBase
      block={{
        id,
        type: 'action',
        position: { x, y },
        actionType,
        parameters,
        inputs
      }}
      color={config.color}
      icon={config.icon}
      label={config.label}
      inputs={inputs}
      onPositionChange={(id, position) => {
        // Handle position change
      }}
      onDelete={(id) => {
        // Handle delete
      }}
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