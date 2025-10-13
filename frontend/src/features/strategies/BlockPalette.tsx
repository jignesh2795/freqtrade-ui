import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { IndicatorBlock, ConditionBlock, ActionBlock } from '@/features/strategies/blocks';
import { IndicatorType, ConditionType, ActionType } from '@/types/strategy';

interface BlockPaletteProps {
  onBlockDragStart: (e: React.DragEvent, blockType: string, blockData: any) => void;
  onConnectionStart?: (e: React.MouseEvent, id: string) => void;
  onConnectionEnd?: (e: React.MouseEvent, id: string) => void;
}

export function BlockPalette({ onBlockDragStart, onConnectionStart, onConnectionEnd }: BlockPaletteProps) {
  const handleDragStart = (e: React.DragEvent, blockType: string, blockData: any) => {
    e.dataTransfer.setData('blockType', blockType);
    e.dataTransfer.setData('blockData', JSON.stringify(blockData));
    onBlockDragStart(e, blockType, blockData);
  };

  return (
    <Card className="w-64 bg-dark-900 border-dark-700">
      <CardHeader>
        <CardTitle className="text-lg text-dark-50">Block Palette</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-dark-300 mb-3">Indicators</h3>
          <div className="space-y-3">
            <IndicatorBlock
              id="palette-sma"
              x={0}
              y={0}
              indicatorType="SMA"
              parameters={{ period: 20, source: 'close' }}
              outputs={1}
              onDragStart={(e) => handleDragStart(e, 'indicator', { indicatorType: 'SMA', parameters: { period: 20, source: 'close' }, outputs: 1 })}
              onDragEnd={() => {}}
              onConnectionStart={onConnectionStart}
              onConnectionEnd={onConnectionEnd}
            />
            <IndicatorBlock
              id="palette-ema"
              x={0}
              y={0}
              indicatorType="EMA"
              parameters={{ period: 20, source: 'close' }}
              outputs={1}
              onDragStart={(e) => handleDragStart(e, 'indicator', { indicatorType: 'EMA', parameters: { period: 20, source: 'close' }, outputs: 1 })}
              onDragEnd={() => {}}
              onConnectionStart={onConnectionStart}
              onConnectionEnd={onConnectionEnd}
            />
            <IndicatorBlock
              id="palette-rsi"
              x={0}
              y={0}
              indicatorType="RSI"
              parameters={{ period: 14 }}
              outputs={1}
              onDragStart={(e) => handleDragStart(e, 'indicator', { indicatorType: 'RSI', parameters: { period: 14 }, outputs: 1 })}
              onDragEnd={() => {}}
              onConnectionStart={onConnectionStart}
              onConnectionEnd={onConnectionEnd}
            />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-dark-300 mb-3">Conditions</h3>
          <div className="space-y-3">
            <ConditionBlock
              id="palette-gt"
              x={0}
              y={0}
              conditionType="greater"
              parameters={{}}
              inputs={2}
              outputs={1}
              onDragStart={(e) => handleDragStart(e, 'condition', { conditionType: 'greater', parameters: {}, inputs: 2, outputs: 1 })}
              onDragEnd={() => {}}
              onConnectionStart={onConnectionStart}
              onConnectionEnd={onConnectionEnd}
            />
            <ConditionBlock
              id="palette-lt"
              x={0}
              y={0}
              conditionType="less"
              parameters={{}}
              inputs={2}
              outputs={1}
              onDragStart={(e) => handleDragStart(e, 'condition', { conditionType: 'less', parameters: {}, inputs: 2, outputs: 1 })}
              onDragEnd={() => {}}
              onConnectionStart={onConnectionStart}
              onConnectionEnd={onConnectionEnd}
            />
            <ConditionBlock
              id="palette-crosses"
              x={0}
              y={0}
              conditionType="cross_above"
              parameters={{}}
              inputs={2}
              outputs={1}
              onDragStart={(e) => handleDragStart(e, 'condition', { conditionType: 'cross_above', parameters: {}, inputs: 2, outputs: 1 })}
              onDragEnd={() => {}}
              onConnectionStart={onConnectionStart}
              onConnectionEnd={onConnectionEnd}
            />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-dark-300 mb-3">Actions</h3>
          <div className="space-y-3">
            <ActionBlock
              id="palette-buy"
              x={0}
              y={0}
              actionType="buy"
              parameters={{}}
              inputs={1}
              onDragStart={(e) => handleDragStart(e, 'action', { actionType: 'buy', parameters: {}, inputs: 1 })}
              onDragEnd={() => {}}
              onConnectionStart={onConnectionStart}
              onConnectionEnd={onConnectionEnd}
            />
            <ActionBlock
              id="palette-sell"
              x={0}
              y={0}
              actionType="sell"
              parameters={{}}
              inputs={1}
              onDragStart={(e) => handleDragStart(e, 'action', { actionType: 'sell', parameters: {}, inputs: 1 })}
              onDragEnd={() => {}}
              onConnectionStart={onConnectionStart}
              onConnectionEnd={onConnectionEnd}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}