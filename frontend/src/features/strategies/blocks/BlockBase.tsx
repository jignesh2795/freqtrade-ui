import React, { ReactNode } from 'react';
import { Card } from '@/components/ui';
import { ConnectionPoint } from '@/features/strategies/connections/ConnectionPoint';

interface BlockBaseProps {
  id: string;
  title: string;
  description: string;
  children: ReactNode;
  x: number;
  y: number;
  onDragStart: (e: React.DragEvent, id: string) => void;
  onDragEnd: (e: React.DragEvent) => void;
  onConnectionStart?: (e: React.MouseEvent, id: string) => void;
  onConnectionEnd?: (e: React.MouseEvent, id: string) => void;
  isSelected?: boolean;
}

export function BlockBase({
  id,
  title,
  description,
  children,
  x,
  y,
  onDragStart,
  onDragEnd,
  onConnectionStart,
  onConnectionEnd,
  isSelected = false
}: BlockBaseProps) {
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
          <h3 className="font-semibold text-dark-50 text-sm">{title}</h3>
          <p className="text-xs text-dark-400 mt-1">{description}</p>
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