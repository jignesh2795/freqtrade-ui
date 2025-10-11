import { useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Badge, Button } from '@/components/ui';
import { useBotStore } from '@/store';
import { Activity, RefreshCw, Play, Square } from 'lucide-react';
import { clsx } from 'clsx';
import { formatDateTime } from '@/utils';

export const BotStatusCard = () => {
  const { status, isLoading, fetchStatus, startBot, stopBot } = useBotStore();

  useEffect(() => {
    fetchStatus();

    // Refresh every 5 seconds
    const interval = setInterval(() => {
      fetchStatus();
    }, 5000);

    return () => clearInterval(interval);
  }, [fetchStatus]);

  const isRunning = status?.state === 'running';
  const statusColor = isRunning ? 'success' : 'danger';

  const handleToggleBot = async () => {
    if (isRunning) {
      await stopBot();
    } else {
      await startBot();
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Bot Status</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => fetchStatus()}
            disabled={isLoading}
          >
            <RefreshCw className={clsx('w-4 h-4', isLoading && 'animate-spin')} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {status ? (
          <div className="space-y-4">
            {/* Status Indicator */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <Activity
                  className={clsx(
                    'w-12 h-12',
                    isRunning ? 'text-success-500' : 'text-danger-500'
                  )}
                />
                {isRunning && (
                  <span className="absolute top-0 right-0 w-3 h-3 bg-success-500 rounded-full animate-pulse" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg font-semibold text-dark-50">
                    {isRunning ? 'Running' : 'Stopped'}
                  </span>
                  <Badge variant={statusColor} dot>
                    {status.runmode}
                  </Badge>
                </div>
                <div className="text-sm text-dark-400">
                  {status.strategy}
                </div>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-dark-800 rounded-lg p-3">
                <div className="text-xs text-dark-400 mb-1">Timeframe</div>
                <div className="font-semibold text-dark-50">
                  {status.timeframe}
                </div>
              </div>

              <div className="bg-dark-800 rounded-lg p-3">
                <div className="text-xs text-dark-400 mb-1">Stake Amount</div>
                <div className="font-semibold text-dark-50">
                  {typeof status.stake_amount === 'number'
                    ? `${status.stake_amount} ${status.stake_currency}`
                    : status.stake_amount}
                </div>
              </div>

              <div className="bg-dark-800 rounded-lg p-3">
                <div className="text-xs text-dark-400 mb-1">Open Trades</div>
                <div className="font-semibold text-dark-50">
                  {status.open_trades} / {status.max_open_trades}
                </div>
              </div>

              <div className="bg-dark-800 rounded-lg p-3">
                <div className="text-xs text-dark-400 mb-1">Stop Loss</div>
                <div className="font-semibold text-dark-50">
                  {(status.stoploss * 100).toFixed(1)}%
                </div>
              </div>
            </div>

            {/* Start Time */}
            {status.bot_start_date && (
              <div className="text-xs text-dark-400 text-center">
                Started {formatDateTime(status.bot_start_date)}
              </div>
            )}

            {/* Control Button */}
            <Button
              fullWidth
              variant={isRunning ? 'danger' : 'success'}
              onClick={handleToggleBot}
              disabled={isLoading}
              className="flex items-center justify-center gap-2"
            >
              {isRunning ? (
                <>
                  <Square className="w-4 h-4" />
                  Stop Bot
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Start Bot
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="text-center text-dark-400 py-8">
            {isLoading ? 'Loading status...' : 'Unable to fetch bot status'}
          </div>
        )}
      </CardContent>
    </Card>
  );
};