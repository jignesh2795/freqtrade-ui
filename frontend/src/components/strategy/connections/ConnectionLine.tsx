import React from 'react';
import type { Connection, Block } from '../../../types/strategy';

interface ConnectionLineProps {
  connection: Connection;
  blocks: Block[];
  isHovered?: boolean;
  onDelete?: (connectionId: string) => void;
}

export const ConnectionLine: React.FC<ConnectionLineProps> = ({
  connection,
  blocks,
  isHovered,
  onDelete
}) => {
  const fromBlock = blocks.find(b => b.id === connection.from.blockId);
  const toBlock = blocks.find(b => b.id === connection.to.blockId);

  if (!fromBlock || !toBlock) return null;

  // Calculate connection point positions
  const fromX = fromBlock.position.x + 200; // Block width
  const fromY = fromBlock.position.y + 40 + (connection.from.index * 30);
  const toX = toBlock.position.x;
  const toY = toBlock.position.y + 40 + (connection.to.index * 30);

  // Create bezier curve path
  const midX = (fromX + toX) / 2;
  const path = `M ${fromX} ${fromY} C ${midX} ${fromY}, ${midX} ${toY}, ${toX} ${toY}`;

  return (
    <g className="connection-group">
      {/* Shadow/Outline */}
      <path
        d={path}
        fill="none"
        stroke="rgba(0, 0, 0, 0.5)"
        strokeWidth={isHovered ? "5" : "4"}
        strokeLinecap="round"
      />
      
      {/* Main Line */}
      <path
        d={path}
        fill="none"
        stroke={isHovered ? "#3b82f6" : "#64748b"}
        strokeWidth={isHovered ? "3" : "2"}
        strokeLinecap="round"
        className="transition-all cursor-pointer"
        onMouseEnter={(e) => {
          (e.target as SVGPathElement).style.stroke = "#3b82f6";
          (e.target as SVGPathElement).style.strokeWidth = "3";
        }}
        onMouseLeave={(e) => {
          if (!isHovered) {
            (e.target as SVGPathElement).style.stroke = "#64748b";
            (e.target as SVGPathElement).style.strokeWidth = "2";
          }
        }}
        onClick={() => onDelete?.(connection.id)}
      />

      {/* Arrow Head */}
      <defs>
        <marker
          id={`arrowhead-${connection.id}`}
          markerWidth="10"
          markerHeight="10"
          refX="9"
          refY="3"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path
            d="M0,0 L0,6 L9,3 z"
            fill={isHovered ? "#3b82f6" : "#64748b"}
          />
        </marker>
      </defs>
      
      <path
        d={path}
        fill="none"
        stroke="transparent"
        strokeWidth="2"
        markerEnd={`url(#arrowhead-${connection.id})`}
      />

      {/* Animated Flow Dots */}
      {isHovered && (
        <>
          <circle r="3" fill="#3b82f6">
            <animateMotion
              dur="2s"
              repeatCount="indefinite"
              path={path}
            />
          </circle>
          <circle r="3" fill="#3b82f6">
            <animateMotion
              dur="2s"
              repeatCount="indefinite"
              path={path}
              begin="0.5s"
            />
          </circle>
        </>
      )}
    </g>
  );
};