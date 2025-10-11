import { clsx } from 'clsx';

export interface TimeframeSelectorProps {
  selected: string;
  onSelect: (timeframe: string) => void;
  timeframes?: string[];
}

const DEFAULT_TIMEFRAMES = ['1m', '5m', '15m', '30m', '1h', '4h', '1d'];

export const TimeframeSelector: React.FC<TimeframeSelectorProps> = ({
  selected,
  onSelect,
  timeframes = DEFAULT_TIMEFRAMES,
}) => {
  return (
    <div className="flex items-center gap-1 bg-dark-800 p-1 rounded-lg border border-dark-700">
      {timeframes.map((tf) => (
        <button
          key={tf}
          onClick={() => onSelect(tf)}
          className={clsx(
            'px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
            selected === tf
              ? 'bg-primary-600 text-white'
              : 'text-dark-400 hover:text-dark-200 hover:bg-dark-700'
          )}
        >
          {tf}
        </button>
      ))}
    </div>
  );
};