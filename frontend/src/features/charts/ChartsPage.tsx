import { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui';
import {
  TradingChart,
  TimeframeSelector,
  PairSelector,
  ChartControls,
} from '@/components/charts';
import { useMarketStore, useTradeStore, useStrategyStore } from '@/store';
import { strategyService } from '@/services/freqtrade';
import { Loading, EmptyState } from '@/components/common';
import { TrendingUp } from 'lucide-react';

export default function ChartsPage() {
  const [selectedPair, setSelectedPair] = useState<string>('');
  const [selectedTimeframe, setSelectedTimeframe] = useState('1h');
  const [showIndicators, setShowIndicators] = useState(false);
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState<any[]>([]);

  const { whitelist, fetchWhitelist } = useMarketStore();
  const { openTrades, closedTrades, fetchOpenTrades, fetchClosedTrades } = useTradeStore();
  const { fetchAvailablePairs } = useStrategyStore();

  useEffect(() => {
    fetchWhitelist();
    fetchAvailablePairs();
    fetchOpenTrades();
    fetchClosedTrades(50);
  }, [fetchWhitelist, fetchAvailablePairs, fetchOpenTrades, fetchClosedTrades]);

  useEffect(() => {
    if (whitelist.length > 0 && !selectedPair) {
      setSelectedPair(whitelist[0]);
    }
  }, [whitelist, selectedPair]);

  useEffect(() => {
    if (!selectedPair) return;

    const fetchChartData = async () => {
      setLoading(true);
      try {
        const data = await strategyService.getPairCandles({
          pair: selectedPair,
          timeframe: selectedTimeframe,
          limit: 500,
        });
        setChartData(data);
      } catch (error) {
        console.error('Failed to fetch chart data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, [selectedPair, selectedTimeframe]);

  const handleRefresh = async () => {
    if (!selectedPair) return;
    
    setLoading(true);
    try {
      const data = await strategyService.getPairCandles({
        pair: selectedPair,
        timeframe: selectedTimeframe,
        limit: 500,
      });
      setChartData(data);
    } catch (error) {
      console.error('Failed to refresh chart:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter trades for selected pair
  const pairTrades = [...openTrades, ...closedTrades].filter(
    (trade) => trade.pair === selectedPair
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-dark-50">Charts</h1>
        <p className="text-dark-400 mt-1">
          View price charts with trade markers and indicators
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <PairSelector
            pairs={whitelist}
            selected={selectedPair}
            onSelect={setSelectedPair}
          />
          <TimeframeSelector
            selected={selectedTimeframe}
            onSelect={setSelectedTimeframe}
          />
        </div>

        <ChartControls
          onRefresh={handleRefresh}
          onToggleIndicators={() => setShowIndicators(!showIndicators)}
          showIndicators={showIndicators}
          loading={loading}
        />
      </div>

      {/* Chart */}
      <Card>
        <CardContent className="p-0">
          {loading && chartData.length === 0 ? (
            <div className="p-12">
              <Loading message="Loading chart data..." />
            </div>
          ) : chartData.length === 0 ? (
            <div className="p-12">
              <EmptyState
                icon={TrendingUp}
                title="No Chart Data"
                description="Unable to load chart data for this pair"
              />
            </div>
          ) : (
            <TradingChart
              data={chartData}
              pair={selectedPair}
              trades={pairTrades}
              height={600}
              showVolume={true}
            />
          )}
        </CardContent>
      </Card>

      {/* Chart Info */}
      {chartData.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card variant="default" padding="sm">
            <CardContent>
              <div className="text-xs text-dark-400 mb-1">Candles</div>
              <div className="text-lg font-semibold text-dark-50">
                {chartData.length}
              </div>
            </CardContent>
          </Card>

          <Card variant="default" padding="sm">
            <CardContent>
              <div className="text-xs text-dark-400 mb-1">Trades</div>
              <div className="text-lg font-semibold text-dark-50">
                {pairTrades.length}
              </div>
            </CardContent>
          </Card>

          <Card variant="default" padding="sm">
            <CardContent>
              <div className="text-xs text-dark-400 mb-1">Open</div>
              <div className="text-lg font-semibold text-dark-50">
                {chartData[0]?.open.toFixed(8) || 'N/A'}
              </div>
            </CardContent>
          </Card>

          <Card variant="default" padding="sm">
            <CardContent>
              <div className="text-xs text-dark-400 mb-1">Close</div>
              <div className="text-lg font-semibold text-dark-50">
                {chartData[chartData.length - 1]?.close.toFixed(8) || 'N/A'}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}