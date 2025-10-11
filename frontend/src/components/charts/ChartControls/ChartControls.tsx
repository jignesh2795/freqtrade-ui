import { Button } from '@/components/ui';
import { ZoomIn, ZoomOut, Maximize2, RefreshCw, TrendingUp } from 'lucide-react';
import { clsx } from 'clsx';

export interface ChartControlsProps {
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onReset?: () => void;
  onRefresh?: () => void;
  onToggleIndicators?: () => void;
  showIndicators?: boolean;
  loading?: boolean;
}

export const ChartControls: React.FC<ChartControlsProps> = ({
  onZoomIn,
  onZoomOut,
  onReset,
  onRefresh,
  onToggleIndicators,
  showIndicators = false,
  loading = false,
}) => {
  return (
    <div className="flex items-center gap-2">
      {/* Zoom Controls */}
      {onZoomIn && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onZoomIn}
          className="flex items-center gap-1"
        >
          <ZoomIn className="w-4 h-4" />
        </Button>
      )}

      {onZoomOut && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onZoomOut}
          className="flex items-center gap-1"
        >
          <ZoomOut className="w-4 h-4" />
        </Button>
      )}

      {/* Reset */}
      {onReset && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="flex items-center gap-1"
        >
          <Maximize2 className="w-4 h-4" />
        </Button>
      )}

      {/* Divider */}
      <div className="w-px h-6 bg-dark-700" />

      {/* Indicators Toggle */}
      {onToggleIndicators && (
        <Button
          variant={showIndicators ? 'primary' : 'ghost'}
          size="sm"
          onClick={onToggleIndicators}
          className="flex items-center gap-1"
        >
          <TrendingUp className="w-4 h-4" />
          Indicators
        </Button>
      )}

      {/* Refresh */}
      {onRefresh && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onRefresh}
          disabled={loading}
          className="flex items-center gap-1"
        >
          <RefreshCw className={clsx('w-4 h-4', loading && 'animate-spin')} />
        </Button>
      )}
    </div>
  );
};