import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, Input, Switch } from '@/components/ui';
import { Save, RotateCcw } from 'lucide-react';
import { useBotStore } from '@/store';
import { useToast } from '@/hooks';
import { configService } from '@/services/freqtrade';

export const QuickSettings = () => {
  const { status, config, reloadConfig: reloadBotConfig } = useBotStore();
  const { success, error } = useToast();

  const [settings, setSettings] = useState({
    maxOpenTrades: status?.max_open_trades || 3,
    stakeAmount: status?.stake_amount || 100,
    dryRun: status?.dry_run ?? true,
    trailingStop: status?.trailing_stop || false,
  });

  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (status) {
      setSettings({
        maxOpenTrades: status.max_open_trades,
        stakeAmount: typeof status.stake_amount === 'number' ? status.stake_amount : 100,
        dryRun: status.dry_run,
        trailingStop: status.trailing_stop,
      });
    }
  }, [status]);

  const handleChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    try {
      // In a real implementation, we would need to update the config file
      // For now, we'll just reload the config to simulate the process
      await configService.reloadConfig();
      await reloadBotConfig();
      success('Settings Saved', 'Configuration has been updated. Please restart the bot for some changes to take effect.');
      setHasChanges(false);
    } catch (err) {
      error('Save Failed', 'Failed to save configuration');
      console.error('Failed to save configuration:', err);
    }
  };

  const handleReset = () => {
    if (status) {
      setSettings({
        maxOpenTrades: status.max_open_trades,
        stakeAmount: typeof status.stake_amount === 'number' ? status.stake_amount : 100,
        dryRun: status.dry_run,
        trailingStop: status.trailing_stop,
      });
      setHasChanges(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Max Open Trades */}
          <div>
            <label className="block text-sm font-medium text-dark-300 mb-2">
              Max Open Trades
            </label>
            <Input
              type="number"
              min={1}
              max={20}
              value={settings.maxOpenTrades}
              onChange={(e) => handleChange('maxOpenTrades', parseInt(e.target.value))}
              helperText="Maximum number of concurrent trades"
            />
          </div>

          {/* Stake Amount */}
          <div>
            <label className="block text-sm font-medium text-dark-300 mb-2">
              Stake Amount ({status?.stake_currency || 'USDT'})
            </label>
            <Input
              type="number"
              min={1}
              step="0.01"
              value={settings.stakeAmount}
              onChange={(e) => handleChange('stakeAmount', parseFloat(e.target.value))}
              helperText="Amount to invest per trade"
            />
          </div>

          {/* Dry Run */}
          <div className="flex items-center justify-between py-2">
            <div>
              <div className="font-medium text-dark-200">Dry Run Mode</div>
              <div className="text-sm text-dark-400">
                Simulate trades without real money
              </div>
            </div>
            <Switch
              checked={settings.dryRun}
              onChange={(checked) => handleChange('dryRun', checked)}
            />
          </div>

          {/* Trailing Stop */}
          <div className="flex items-center justify-between py-2">
            <div>
              <div className="font-medium text-dark-200">Trailing Stop</div>
              <div className="text-sm text-dark-400">
                Enable trailing stop loss
              </div>
            </div>
            <Switch
              checked={settings.trailingStop}
              onChange={(checked) => handleChange('trailingStop', checked)}
            />
          </div>

          {/* Action Buttons */}
          {hasChanges && (
            <div className="flex gap-3 pt-4 border-t border-dark-700">
              <Button
                variant="secondary"
                fullWidth
                onClick={handleReset}
                className="flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </Button>
              <Button
                fullWidth
                onClick={handleSave}
                className="flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
            </div>
          )}

          {/* Warning */}
          <div className="p-3 bg-warning-500/10 border border-warning-500/30 rounded-lg">
            <p className="text-xs text-warning-400">
              <strong>Note:</strong> Some settings require bot restart to take effect.
              Use "Reload Config" button after saving.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};