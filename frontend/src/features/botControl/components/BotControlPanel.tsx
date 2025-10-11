import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge, Modal, ModalFooter } from '@/components/ui';
import { Play, Square, RotateCcw, Power, AlertTriangle } from 'lucide-react';
import { useBotStore } from '@/store';
import { useToast } from '@/hooks';
import { formatDateTime } from '@/utils';
import { clsx } from 'clsx';

export const BotControlPanel = () => {
  const [showStopConfirm, setShowStopConfirm] = useState(false);
  const [showStartConfirm, setShowStartConfirm] = useState(false);
  const [showReloadConfirm, setShowReloadConfirm] = useState(false);
  
  const { status, isLoading, startBot, stopBot, reloadConfig } = useBotStore();
  const { success, error } = useToast();

  const isRunning = status?.state === 'running';

  const handleStart = async () => {
    const result = await startBot();
    if (result) {
      success('Bot Started', 'Trading bot is now running');
    } else {
      error('Start Failed', 'Unable to start the bot');
    }
    setShowStartConfirm(false);
  };

  const handleStop = async () => {
    const result = await stopBot();
    if (result) {
      success('Bot Stopped', 'Trading bot has been stopped');
    } else {
      error('Stop Failed', 'Unable to stop the bot');
    }
    setShowStopConfirm(false);
  };

  const handleReload = async () => {
    const result = await reloadConfig();
    if (result) {
      success('Config Reloaded', 'Bot configuration has been reloaded');
    } else {
      error('Reload Failed', 'Unable to reload configuration');
    }
    setShowReloadConfirm(false);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Bot Control</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Status Display */}
            <div className="flex items-center justify-between p-4 bg-dark-800 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Power
                    className={clsx(
                      'w-8 h-8',
                      isRunning ? 'text-success-500' : 'text-dark-600'
                    )}
                  />
                  {isRunning && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-success-500 rounded-full animate-pulse" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold text-dark-50">
                      {isRunning ? 'Running' : 'Stopped'}
                    </span>
                    <Badge variant={isRunning ? 'success' : 'danger'}>
                      {status?.runmode || 'Unknown'}
                    </Badge>
                  </div>
                  {status?.bot_start_date && (
                    <span className="text-sm text-dark-400">
                      Started {formatDateTime(status.bot_start_date)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {!isRunning ? (
                <Button
                  variant="success"
                  fullWidth
                  onClick={() => setShowStartConfirm(true)}
                  disabled={isLoading}
                  className="flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4" />
                  Start Bot
                </Button>
              ) : (
                <Button
                  variant="danger"
                  fullWidth
                  onClick={() => setShowStopConfirm(true)}
                  disabled={isLoading}
                  className="flex items-center justify-center gap-2"
                >
                  <Square className="w-4 h-4" />
                  Stop Bot
                </Button>
              )}

              <Button
                variant="secondary"
                fullWidth
                onClick={() => setShowReloadConfirm(true)}
                disabled={isLoading || !isRunning}
                className="flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reload Config
              </Button>

              <Button
                variant="secondary"
                fullWidth
                disabled={true}
                className="flex items-center justify-center gap-2"
              >
                <AlertTriangle className="w-4 h-4" />
                Emergency Stop
              </Button>
            </div>

            {/* Bot Info */}
            {status && (
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-dark-700">
                <div>
                  <div className="text-xs text-dark-400 mb-1">Strategy</div>
                  <div className="font-medium text-dark-100">{status.strategy}</div>
                </div>
                <div>
                  <div className="text-xs text-dark-400 mb-1">Timeframe</div>
                  <div className="font-medium text-dark-100">{status.timeframe}</div>
                </div>
                <div>
                  <div className="text-xs text-dark-400 mb-1">Open Trades</div>
                  <div className="font-medium text-dark-100">
                    {status.open_trades} / {status.max_open_trades}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-dark-400 mb-1">Stake Currency</div>
                  <div className="font-medium text-dark-100">{status.stake_currency}</div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Start Confirmation Modal */}
      <Modal
        isOpen={showStartConfirm}
        onClose={() => setShowStartConfirm(false)}
        title="Start Trading Bot"
      >
        <div className="space-y-4">
          <p className="text-dark-300">
            Are you sure you want to start the trading bot? It will begin executing
            trades based on your configured strategy.
          </p>
          <div className="p-3 bg-success-500/10 border border-success-500/30 rounded-lg">
            <p className="text-sm text-success-400">
              The bot will start in <strong>{status?.runmode}</strong> mode.
            </p>
          </div>
        </div>
        <ModalFooter>
          <Button variant="secondary" onClick={() => setShowStartConfirm(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleStart} loading={isLoading}>
            Start Bot
          </Button>
        </ModalFooter>
      </Modal>

      {/* Stop Confirmation Modal */}
      <Modal
        isOpen={showStopConfirm}
        onClose={() => setShowStopConfirm(false)}
        title="Stop Trading Bot"
      >
        <div className="space-y-4">
          <p className="text-dark-300">
            Are you sure you want to stop the trading bot? Open trades will remain
            open but no new trades will be entered.
          </p>
          <div className="p-3 bg-warning-500/10 border border-warning-500/30 rounded-lg">
            <p className="text-sm text-warning-400">
              <strong>Warning:</strong> Stopping the bot will not close existing positions.
            </p>
          </div>
        </div>
        <ModalFooter>
          <Button variant="secondary" onClick={() => setShowStopConfirm(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleStop} loading={isLoading}>
            Stop Bot
          </Button>
        </ModalFooter>
      </Modal>

      {/* Reload Confirmation Modal */}
      <Modal
        isOpen={showReloadConfirm}
        onClose={() => setShowReloadConfirm(false)}
        title="Reload Configuration"
      >
        <div className="space-y-4">
          <p className="text-dark-300">
            Reloading the configuration will apply any changes you've made to the
            config file. The bot will continue running with the new settings.
          </p>
          <div className="p-3 bg-primary-500/10 border border-primary-500/30 rounded-lg">
            <p className="text-sm text-primary-400">
              <strong>Note:</strong> Strategy and some parameters cannot be changed
              while the bot is running.
            </p>
          </div>
        </div>
        <ModalFooter>
          <Button variant="secondary" onClick={() => setShowReloadConfirm(false)}>
            Cancel
          </Button>
          <Button onClick={handleReload} loading={isLoading}>
            Reload Config
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};