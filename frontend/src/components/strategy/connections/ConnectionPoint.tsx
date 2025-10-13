import React from 'react';
import type { Block, BlockType } from '../../../types/strategy';

interface ConnectionPointProps {
  blockId: string;
  blockType: BlockType;
  type: 'input' | 'output';
  index: number;
  position: { x: number; y: number };
  isConnected: boolean;
  isHovered: boolean;
  onMouseDown?: (e: React.MouseEvent, blockId: string, type: 'input' | 'output', index: number) => void;
  onMouseUp?: (e: React.MouseEvent, blockId: string, type: 'input' | 'output', index: number) => void;
  onMouseEnter?: (blockId: string, type: 'input' | 'output', index: number) => void;
  onMouseLeave?: (blockId: string, type: 'input' | 'output', index: number) => void;
}

export const ConnectionPoint: React.FC<ConnectionPointProps> = ({
  blockId,
  blockType,
  type,
  index,
  position,
  isConnected,
  isHovered,
  onMouseDown,
  onMouseUp,
  onMouseEnter,
  onMouseLeave
}) => {
  const handleMouseDown = (e: React.MouseEvent) => {
    onMouseDown?.(e, blockId, type, index);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    onMouseUp?.(e, blockId, type, index);
  };

  const handleMouseEnter = () => {
    onMouseEnter?.(blockId, type, index);
  };

  const handleMouseLeave = () => {
    onMouseLeave?.(blockId, type, index);
  };

  // Determine color based on type and connection status
  let backgroundColor = '#475569'; // slate-600
  if (isConnected) {
    backgroundColor = type === 'input' ? '#f59e0b' : '#10b981'; // amber-500 for input, emerald-500 for output
  } else if (isHovered) {
    backgroundColor = '#3b82f6'; // blue-500
  }

  return (
    <div
      className="absolute w-3 h-3 rounded-full border-2 cursor-crosshair transition-all duration-200"
      style={{
        left: type === 'input' ? '-6px' : 'calc(100% + 6px)',
        top: `calc(50% + ${index * 20}px - 6px)`,
        backgroundColor,
        borderColor: isHovered ? '#3b82f6' : '#94a3b8', // blue-500 or slate-400
        transform: 'translateY(-50%)',
        zIndex: 10
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  );
};