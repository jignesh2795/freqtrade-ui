import { useState } from 'react';
import { Modal, ModalFooter, Button, Input, Select } from '@/components/ui';
import { useToast } from '@/hooks';
import { tradeService } from '@/services/freqtrade';
import { useTradeStore, useStrategyStore } from '@/store';

interface ForceEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ForceEntryModal: React.FC<ForceEntryModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [pair, setPair] = useState('');
  const [price, setPrice] = useState('');
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market');
  const [loading, setLoading] = useState(false);
  
  const { success, error } = useToast();
  const { fetchOpenTrades } = useTradeStore();
  const { availablePairs } = useStrategyStore();

  const handleSubmit = async () => {
    if (!pair) {
      error('Validation Error', 'Please select a trading pair');
      return;
    }

    if (orderType === 'limit' && !price) {
      error('Validation Error', 'Please enter a price for limit order');
      return;
    }

    setLoading(true);
    try {
      await tradeService.forceEnter({
        pair,
        price: price ? parseFloat(price) : undefined,
        ordertype: orderType,
      });

      success('Trade Opened', `Successfully opened trade for ${pair}`);
      fetchOpenTrades();
      onClose();
      
      // Reset form
      setPair('');
      setPrice('');
      setOrderType('market');
    } catch (err) {
      error('Failed to Open Trade', err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const pairOptions = availablePairs.map((p) => ({
    value: p.pair,
    label: p.pair,
  }));

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Force Entry Trade"
      description="Manually open a new trade position"
    >
      <div className="space-y-4">
        {/* Pair Selection */}
        <div>
          <label className="block text-sm font-medium text-dark-300 mb-2">
            Trading Pair *
          </label>
          <Select
            options={pairOptions}
            value={pair}
            onChange={setPair}
            placeholder="Select a pair"
          />
        </div>

        {/* Order Type */}
        <div>
          <label className="block text-sm font-medium text-dark-300 mb-2">
            Order Type
          </label>
          <Select
            options={[
              { value: 'market', label: 'Market Order' },
              { value: 'limit', label: 'Limit Order' },
            ]}
            value={orderType}
            onChange={(value) => setOrderType(value as 'market' | 'limit')}
          />
        </div>

        {/* Price (for limit orders) */}
        {orderType === 'limit' && (
          <div>
            <label className="block text-sm font-medium text-dark-300 mb-2">
              Limit Price *
            </label>
            <Input
              type="number"
              step="0.00000001"
              placeholder="0.00000000"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              helperText="Price at which to enter the trade"
            />
          </div>
        )}

        {/* Warning */}
        <div className="p-3 bg-warning-500/10 border border-warning-500/30 rounded-lg">
          <p className="text-sm text-warning-400">
            <strong>Warning:</strong> Forcing entry will bypass your strategy's
            entry signals. Use with caution.
          </p>
        </div>
      </div>

      <ModalFooter>
        <Button variant="secondary" onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} loading={loading}>
          Open Trade
        </Button>
      </ModalFooter>
    </Modal>
  );
};