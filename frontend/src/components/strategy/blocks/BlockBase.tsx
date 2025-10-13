import React, { useState } from 'react';
import { Trash2, Settings, GripVertical } from 'lucide-react';
import type { Block, BlockPosition } from '../../../types/strategy';

interface BlockBaseProps {
  block: Block;
  color: string;
  icon: string;
  label: string;
  inputs?: number;
  outputs?: number;
  onPositionChange: (id: string, position: BlockPosition) => void;
  onDelete: (id: string) => void;
  onSettings?: (id: string) => void;
  children?: React.ReactNode;
}

export const BlockBase: React.FC<BlockBaseProps> = ({
  block,
  color,
  icon,
  label,
  inputs = 0,
  outputs = 0,
  onPositionChange,
  onDelete,
  onSettings,
  children
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.block-action')) return;
    
    setIsDragging(true);
    setDragStart({
      x: e.clientX - block.position.x,
      y: e.clientY - block.position.y
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;

    // Snap to grid (20px)
    const snappedX = Math.round(newX / 20) * 20;
    const snappedY = Math.round(newY / 20) * 20;

    onPositionChange(block.id, { x: snappedX, y: snappedY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart]);

  return (
    <div
      className="absolute"
      style={{
        left: `${block.position.x}px`,
        top: `${block.position.y}px`,
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Input Connection Points */}
      {inputs > 0 && (
        <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-3">
          {Array.from({ length: inputs }).map((_, i) => (
            <div
              key={`input-${i}`}
              className="connection-point w-3 h-3 rounded-full bg-slate-700 border-2 border-slate-400 hover:border-blue-400 hover:bg-blue-500 cursor-pointer transition-all"
              data-block-id={block.id}
              data-type="input"
              data-index={i}
            />
          ))}
        </div>
      )}

      {/* Main Block */}
      <div
        className={`
          bg-slate-800 rounded-lg border-2 shadow-lg min-w-[200px] transition-all
          ${isDragging ? 'shadow-2xl scale-105' : 'shadow-lg'}
          ${isHovered ? 'border-blue-500' : 'border-slate-700'}
        `}
        style={{ borderColor: isHovered ? color : undefined }}
        onMouseDown={handleMouseDown}
      >
        {/* Header */}
        <div
          className="px-3 py-2 rounded-t-lg flex items-center gap-2 border-b border-slate-700"
          style={{ backgroundColor: `${color}20` }}
        >
          <GripVertical className="w-4 h-4 text-slate-400" />
          <span className="text-lg">{icon}</span>
          <span className="text-sm font-medium text-slate-200 flex-1">{label}</span>
          
          {/* Actions */}
          <div className="flex items-center gap-1">
            {onSettings && (
              <button
                className="block-action p-1 hover:bg-slate-700 rounded transition-colors"
                onClick={() => onSettings(block.id)}
                title="Settings"
              >
                <Settings className="w-4 h-4 text-slate-400 hover:text-blue-400" />
              </button>
            )}
            <button
              className="block-action p-1 hover:bg-slate-700 rounded transition-colors"
              onClick={() => onDelete(block.id)}
              title="Delete"
            >
              <Trash2 className="w-4 h-4 text-slate-400 hover:text-red-400" />
            </button>
          </div>
        </div>

        {/* Content */}
        {children && (
          <div className="px-3 py-2 text-sm text-slate-300">
            {children}
          </div>
        )}
      </div>

      {/* Output Connection Points */}
      {outputs > 0 && (
        <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 flex flex-col gap-3">
          {Array.from({ length: outputs }).map((_, i) => (
            <div
              key={`output-${i}`}
              className="connection-point w-3 h-3 rounded-full bg-slate-700 border-2 border-slate-400 hover:border-green-400 hover:bg-green-500 cursor-pointer transition-all"
              data-block-id={block.id}
              data-type="output"
              data-index={i}
            />
          ))}
        </div>
      )}
    </div>
  );
};