import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { BlockPalette } from './BlockPalette';
import { StrategyCanvas } from './StrategyCanvas';

export default function StrategyBuilder() {
  const handleBlockDragStart = (e: React.DragEvent, blockType: string, blockData: any) => {
    // Handle block drag start from palette
    console.log('Dragging block:', blockType, blockData);
  };

  const handleConnectionStart = (e: React.MouseEvent, id: string) => {
    // Handle connection start
    console.log('Connection start:', id);
  };

  const handleConnectionEnd = (e: React.MouseEvent, id: string) => {
    // Handle connection end
    console.log('Connection end:', id);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-dark-50">Strategy Builder</h1>
        <p className="text-dark-400 mt-1">
          Visually create and test your trading strategies
        </p>
      </div>

      <Card className="bg-dark-900 border-dark-700">
        <CardHeader>
          <CardTitle className="text-xl text-dark-50">Visual Strategy Builder</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-6">
            <BlockPalette 
              onBlockDragStart={handleBlockDragStart}
              onConnectionStart={handleConnectionStart}
              onConnectionEnd={handleConnectionEnd}
            />
            <div className="flex-1">
              <StrategyCanvas />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}