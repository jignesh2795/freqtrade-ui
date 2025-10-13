import React from 'react';
import { BlockBase } from './BlockBase';
import type { ConditionBlock as IConditionBlock, BlockPosition } from '../../../types/strategy';
import { CONDITION_CONFIGS } from '../../../types/strategy';

interface ConditionBlockProps {
  block: IConditionBlock;
  onPositionChange: (id: string, position: BlockPosition) => void;
  onDelete: (id: string) => void;
  onSettings: (id: string) => void;
}

export const ConditionBlock: React.FC<ConditionBlockProps> = ({
  block,
  onPositionChange,
  onDelete,
  onSettings
}) => {
  const config = CONDITION_CONFIGS[block.conditionType];

  return (
    <BlockBase
      block={block}
      color={config.color}
      icon={config.symbol}
      label={config.label}
      inputs={block.inputs}
      outputs={block.outputs}
      onPositionChange={onPositionChange}
      onDelete={onDelete}
      onSettings={onSettings}
    >
      {/* Display Parameters */}
      <div className="space-y-1">
        {Object.entries(block.parameters).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between text-xs">
            <span className="text-slate-400">{key}:</span>
            <span className="text-slate-200 font-medium">{value}</span>
          </div>
        ))}
      </div>
    </BlockBase>
  );
};