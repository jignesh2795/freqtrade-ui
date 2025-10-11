import { Modal, ModalFooter, Button, Badge, Card, CardContent } from '@/components/ui';
import { Trade } from '@/types';
import {
  formatCurrency,
  formatPercent,
  formatDateTime,
  formatDuration,
} from '@/utils';
import { TrendingUp, TrendingDown, Clock, DollarSign, Target, Activity } from 'lucide-react';
import { clsx } from 'clsx';

interface TradeDetailsModalProps {
  trade: Trade | null;
  isOpen: boolean;
  onClose: () => void;
  onForceExit?: (tradeId: number) => void;
}

export const TradeDetailsModal: React.FC<TradeDetailsModalProps> = ({
  trade,
  isOpen,
  onClose,
  onForceExit,
}) => {
  if (!trade) return null;

  const profitPercent = (trade.profit_ratio || 0) * 100;
  const isProfit = profitPercent >= 0;
  const duration = trade.close_date
    ? new Date(trade.close_date).getTime() - new Date(trade.open_date).getTime()
    : Date.now() - new Date(trade.open_date).getTime();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Trade Details: ${trade.pair}`}
      size="lg"
    >
      <div className="space-y-6">
        {/* Status and Profit Banner */}
        <div
          className={clsx(
            'p-4 rounded-lg',
            isProfit ? 'bg-success-500/10' : 'bg-danger-500/10'
          )}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isProfit ? (
                <TrendingUp className="w-8 h-8 text-success-400" />
              ) : (
                <TrendingDown className="w-8 h-8 text-danger-400" />
              )}
              <div>
                <div
                  className={clsx(
                    'text-2xl font-bold',
                    isProfit ? 'text-success-400' : 'text-danger-400'
                  )}
                >
                  {formatPercent(profitPercent / 100)}
                </div>
                <div className="text-sm text-dark-400">
                  {formatCurrency(trade.profit_abs || 0)} profit
                </div>
              </div>
            </div>
            <Badge variant={trade.is_open ? 'primary' : 'default'} size="lg">
              {trade.is_open ? 'Open' : 'Closed'}
            </Badge>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card variant="default" padding="sm">
            <CardContent>
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-primary-400" />
                <span className="text-xs text-dark-400">Entry Price</span>
              </div>
              <div className="text-lg font-semibold text-dark-50">
                {formatCurrency(trade.open_rate)}
              </div>
            </CardContent>
          </Card>

          <Card variant="default" padding="sm">
            <CardContent>
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-accent-400" />
                <span className="text-xs text-dark-400">
                  {trade.is_open ? 'Current' : 'Exit'} Price
                </span>
              </div>
              <div className="text-lg font-semibold text-dark-50">
                {formatCurrency(trade.close_rate || trade.open_rate)}
              </div>
            </CardContent>
          </Card>

          <Card variant="default" padding="sm">
            <CardContent>
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-success-400" />
                <span className="text-xs text-dark-400">Amount</span>
              </div>
              <div className="text-lg font-semibold text-dark-50">
                {trade.amount.toFixed(4)}
              </div>
            </CardContent>
          </Card>

          <Card variant="default" padding="sm">
            <CardContent>
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-warning-400" />
                <span className="text-xs text-dark-400">Duration</span>
              </div>
              <div className="text-lg font-semibold text-dark-50">
                {formatDuration(Math.floor(duration / 1000))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trade Information */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-dark-50">Trade Information</h3>
          
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex justify-between py-2 border-b border-dark-800">
              <span className="text-dark-400">Trade ID</span>
              <span className="text-dark-100 font-medium">{trade.trade_id}</span>
            </div>

            <div className="flex justify-between py-2 border-b border-dark-800">
              <span className="text-dark-400">Strategy</span>
              <span className="text-dark-100 font-medium">{trade.strategy}</span>
            </div>

            <div className="flex justify-between py-2 border-b border-dark-800">
              <span className="text-dark-400">Opened</span>
              <span className="text-dark-100 font-medium">
                {formatDateTime(trade.open_date)}
              </span>
            </div>

            {trade.close_date && (
              <div className="flex justify-between py-2 border-b border-dark-800">
                <span className="text-dark-400">Closed</span>
                <span className="text-dark-100 font-medium">
                  {formatDateTime(trade.close_date)}
                </span>
              </div>
            )}

            <div className="flex justify-between py-2 border-b border-dark-800">
              <span className="text-dark-400">Stake Amount</span>
              <span className="text-dark-100 font-medium">
                {formatCurrency(trade.stake_amount)}
              </span>
            </div>

            <div className="flex justify-between py-2 border-b border-dark-800">
              <span className="text-dark-400">Stop Loss</span>
              <span className="text-dark-100 font-medium">
                {trade.stop_loss_abs
                  ? formatCurrency(trade.stop_loss_abs)
                  : 'N/A'}
              </span>
            </div>

            {trade.buy_tag && (
              <div className="flex justify-between py-2 border-b border-dark-800">
                <span className="text-dark-400">Buy Tag</span>
                <span className="text-dark-100 font-medium">{trade.buy_tag}</span>
              </div>
            )}

            {trade.sell_reason && (
              <div className="flex justify-between py-2 border-b border-dark-800">
                <span className="text-dark-400">Sell Reason</span>
                <span className="text-dark-100 font-medium">{trade.sell_reason}</span>
              </div>
            )}
          </div>
        </div>

        {/* Fee Information */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-dark-50">Fees</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex justify-between py-2">
              <span className="text-dark-400">Open Fee</span>
              <span className="text-dark-100">
                {formatPercent(trade.fee_open)}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-dark-400">Close Fee</span>
              <span className="text-dark-100">
                {formatPercent(trade.fee_close)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <ModalFooter>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        {trade.is_open && onForceExit && (
          <Button
            variant="danger"
            onClick={() => {
              onForceExit(trade.trade_id);
              onClose();
            }}
          >
            Force Exit
          </Button>
        )}
      </ModalFooter>
    </Modal>
  );
};