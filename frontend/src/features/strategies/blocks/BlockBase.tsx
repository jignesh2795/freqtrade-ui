import React, { ReactNode } from 'react';
import { Card } from '@/components/ui';
import { ConnectionPoint } from '@/features/strategies/connections/ConnectionPoint';
import { BaseBlock } from '@/types/strategy';

interface BlockBaseProps extends BaseBlock {
  children: ReactNode;
  onDragStart: (e: React.DragEvent, id: string) => void;
  onDragEnd: (e: React.DragEvent) => void;
  onConnectionStart?: (e: React.MouseEvent, id: string) => void;
  onConnectionEnd?: (e: React.MouseEvent, id: string) => void;
  isSelected?: boolean;
  label?: string;
}

export function BlockBase({
  id,
  type,
  position,
  label,
  children,
  onDragStart,
  onDragEnd,
  onConnectionStart,
  onConnectionEnd,
  isSelected = false
}: BlockBaseProps) {
  const { x, y } = position;
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('blockId', id);
    onDragStart(e, id);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={onDragEnd}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        cursor: 'move'
      }}
      className={`
        ${isSelected ? 'ring-2 ring-primary-500' : ''}
        transition-all duration-200 hover:shadow-lg
      `}
    >
      <Card className="w-48 bg-dark-800 border-dark-700">
        <div className="p-3">
          <h3 className="font-semibold text-dark-50 text-sm">{label || type}</h3>
          <div className="mt-2">
            {children}
          </div>
        </div>
      </Card>
      
      {/* Input connection point */}
      <ConnectionPoint 
        id={`${id}-input`} 
        type="input" 
        x={0} 
        y={0}
        onConnectionStart={onConnectionStart}
        onConnectionEnd={onConnectionEnd}
      />
      
      {/* Output connection point */}
      <ConnectionPoint 
        id={`${id}-output`} 
        type="output" 
        x={0} 
        y={0}
        onConnectionStart={onConnectionStart}
        onConnectionEnd={onConnectionEnd}
      />
    </div>
  );
}