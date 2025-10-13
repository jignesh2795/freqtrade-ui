import React from 'react';
import { BlockBase } from './BlockBase';
import type { ActionBlock as IActionBlock, BlockPosition } from '../../../types/strategy';
import { ACTION_CONFIGS } from '../../../types/strategy';

interface ActionBlockProps {
  block: IActionBlock;
  onPositionChange: (id: string, position: BlockPosition) => void;
  onDelete: (id: string) => void;
  onSettings?: (id: string) => void;
}

export const ActionBlock: React.FC<ActionBlockProps> = ({
  block,
  onPositionChange,
  onDelete,
  onSettings
}) => {
  const config = ACTION_CONFIGS[block.actionType];

  return (
    <BlockBase
      block={block}
      color={config.color}
      icon={config.icon}
      label={config.label}
      inputs={block.inputs}
      onPositionChange={onPositionChange}
      onDelete={onDelete}
      onSettings={onSettings}
    >
      {/* Display Parameters */}
      {Object.keys(block.parameters).length > 0 && (
        <div className="space-y-1">
          {Object.entries(block.parameters).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between text-xs">
              <span className="text-slate-400">{key}:</span>
              <span className="text-slate-200 font-medium">{value}</span>
            </div>
          ))}
        </div>
      )}

      {/* Action Description */}
      <div className="mt-2 pt-2 border-t border-slate-700">
        <div className="text-xs text-slate-400">
          {block.actionType === 'buy' && 'Execute BUY order when condition is TRUE'}
          {block.actionType === 'sell' && 'Execute SELL order when condition is TRUE'}
          {block.actionType === 'exit' && 'Close position when condition is TRUE'}
        </div>
      </div>
    </BlockBase>
  );
};