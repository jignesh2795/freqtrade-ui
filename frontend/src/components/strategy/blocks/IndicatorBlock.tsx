import React from 'react';
import { BlockBase } from './BlockBase';
import type { IndicatorBlock as IIndicatorBlock, BlockPosition } from '../../../types/strategy';
import { INDICATOR_CONFIGS } from '../../../types/strategy';

interface IndicatorBlockProps {
  block: IIndicatorBlock;
  onPositionChange: (id: string, position: BlockPosition) => void;
  onDelete: (id: string) => void;
  onSettings: (id: string) => void;
}

export const IndicatorBlock: React.FC<IndicatorBlockProps> = ({
  block,
  onPositionChange,
  onDelete,
  onSettings
}) => {
  const config = INDICATOR_CONFIGS[block.indicatorType];

  return (
    <BlockBase
      block={block}
      color={config.color}
      icon={config.icon}
      label={config.label}
      outputs={config.outputs}
      onPositionChange={onPositionChange}
      onDelete={onDelete}
      onSettings={onSettings}
    >
      {/* Display Parameters */}
      <div className="space-y-1">
        {config.parameters.map(param => {
          const value = block.parameters[param.name];
          return (
            <div key={param.name} className="flex items-center justify-between text-xs">
              <span className="text-slate-400">{param.label}:</span>
              <span className="text-slate-200 font-medium">{value}</span>
            </div>
          );
        })}
      </div>

      {/* Output Labels */}
      {config.outputs > 1 && (
        <div className="mt-2 pt-2 border-t border-slate-700 space-y-1">
          {config.type === 'MACD' && (
            <>
              <div className="text-xs text-slate-400">• MACD Line</div>
              <div className="text-xs text-slate-400">• Signal Line</div>
              <div className="text-xs text-slate-400">• Histogram</div>
            </>
          )}
          {config.type === 'BB' && (
            <>
              <div className="text-xs text-slate-400">• Upper Band</div>
              <div className="text-xs text-slate-400">• Middle Band</div>
              <div className="text-xs text-slate-400">• Lower Band</div>
            </>
          )}
          {config.type === 'STOCH' && (
            <>
              <div className="text-xs text-slate-400">• %K Line</div>
              <div className="text-xs text-slate-400">• %D Line</div>
            </>
          )}
        </div>
      )}
    </BlockBase>
  );
};