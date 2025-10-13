import React, { useState, useRef } from 'react';
import { IndicatorBlock, ConditionBlock, ActionBlock, BlockBase } from '@/features/strategies/blocks';
import { ConnectionLine } from './connections/ConnectionLine';
import { v4 as uuidv4 } from 'uuid';
import { IndicatorType, ConditionOperator, ActionType } from '@/types/strategy';

interface CanvasBlock {
  id: string;
  type: string;
  x: number;
  y: number;
  data: any;
}

interface Connection {
  id: string;
  sourceId: string;
  targetId: string;
}

export function StrategyCanvas() {
  const [blocks, setBlocks] = useState<CanvasBlock[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [selectedConnectionId, setSelectedConnectionId] = useState<string | null>(null);
  const [tempConnection, setTempConnection] = useState<{ x1: number; y1: number; x2: number; y2: number } | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleCanvasDrop = (e: React.DragEvent) => {
    e.preventDefault();
    
    if (!canvasRef.current) return;
    
    const blockType = e.dataTransfer.getData('blockType');
    const blockData = JSON.parse(e.dataTransfer.getData('blockData'));
    
    if (!blockType) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newBlock: CanvasBlock = {
      id: uuidv4(),
      type: blockType,
      x,
      y,
      data: blockData
    };
    
    setBlocks([...blocks, newBlock]);
  };

  const handleCanvasDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleBlockDragStart = (e: React.DragEvent, id: string) => {
    // Handle block movement within canvas
  };

  const handleBlockDragEnd = (e: React.DragEvent) => {
    // Handle block drop within canvas
  };

  const handleBlockClick = (id: string) => {
    setSelectedBlockId(id);
    setSelectedConnectionId(null);
  };

  const handleConnectionStart = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x1 = e.clientX - rect.left;
    const y1 = e.clientY - rect.top;
    
    setTempConnection({
      x1,
      y1,
      x2: x1,
      y2: y1
    });
  };

  const handleConnectionMove = (e: React.MouseEvent) => {
    if (tempConnection && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x2 = e.clientX - rect.left;
      const y2 = e.clientY - rect.top;
      
      setTempConnection({
        ...tempConnection,
        x2,
        y2
      });
    }
  };

  const handleConnectionEnd = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    
    if (tempConnection) {
      // In a real implementation, we would create a connection between blocks
      // For now, we'll just clear the temporary connection
      setTempConnection(null);
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    handleConnectionMove(e);
  };

  const handleCanvasMouseUp = (e: React.MouseEvent) => {
    if (tempConnection) {
      setTempConnection(null);
    }
  };

  const renderBlock = (block: CanvasBlock) => {
    const isSelected = selectedBlockId === block.id;
    
    switch (block.type) {
      case 'indicator':
        return (
          <div onClick={() => handleBlockClick(block.id)}>
            <IndicatorBlock
              id={block.id}
              x={block.x}
              y={block.y}
              indicatorType={block.data.indicatorType as IndicatorType}
              onDragStart={handleBlockDragStart}
              onDragEnd={handleBlockDragEnd}
              onConnectionStart={handleConnectionStart}
              onConnectionEnd={handleConnectionEnd}
              isSelected={isSelected}
            />
          </div>
        );
      case 'condition':
        return (
          <div onClick={() => handleBlockClick(block.id)}>
            <ConditionBlock
              id={block.id}
              x={block.x}
              y={block.y}
              operator={block.data.operator as ConditionOperator}
              onDragStart={handleBlockDragStart}
              onDragEnd={handleBlockDragEnd}
              onConnectionStart={handleConnectionStart}
              onConnectionEnd={handleConnectionEnd}
              isSelected={isSelected}
            />
          </div>
        );
      case 'action':
        return (
          <div onClick={() => handleBlockClick(block.id)}>
            <ActionBlock
              id={block.id}
              x={block.x}
              y={block.y}
              actionType={block.data.actionType as ActionType}
              onDragStart={handleBlockDragStart}
              onDragEnd={handleBlockDragEnd}
              onConnectionStart={handleConnectionStart}
              onConnectionEnd={handleConnectionEnd}
              isSelected={isSelected}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      ref={canvasRef}
      className="flex-1 bg-dark-900 border border-dark-700 rounded-lg relative overflow-hidden"
      onDrop={handleCanvasDrop}
      onDragOver={handleCanvasDragOver}
      onMouseMove={handleCanvasMouseMove}
      onMouseUp={handleCanvasMouseUp}
    >
      {/* Render connections */}
      {connections.map(connection => (
        <ConnectionLine
          key={connection.id}
          id={connection.id}
          x1={0}
          y1={0}
          x2={100}
          y2={100}
          isSelected={selectedConnectionId === connection.id}
        />
      ))}
      
      {/* Render temporary connection */}
      {tempConnection && (
        <ConnectionLine
          id="temp"
          x1={tempConnection.x1}
          y1={tempConnection.y1}
          x2={tempConnection.x2}
          y2={tempConnection.y2}
        />
      )}
      
      {/* Render blocks */}
      {blocks.map(block => (
        <div key={block.id}>
          {renderBlock(block)}
        </div>
      ))}
      
      {blocks.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-dark-500">
            <div className="text-lg mb-2">Drag blocks here to start building your strategy</div>
            <div className="text-sm">Select blocks from the palette on the left</div>
          </div>
        </div>
      )}
    </div>
  );
}