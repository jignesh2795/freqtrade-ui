import { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, Switch } from '@/components/ui';
import {
  TradingChart,
  TimeframeSelector,
  PairSelector,
  ChartControls,
  PriceInfo,
} from '@/components/charts';
import { useMarketStore, useTradeStore, useStrategyStore } from '@/store';
import { strategyService } from '@/services/freqtrade';
import { Loading, EmptyState } from '@/components/common';
import { TrendingUp } from 'lucide-react';

export default function ChartsPage() {
  const [selectedPair, setSelectedPair] = useState<string>('');
  const [selectedTimeframe, setSelectedTimeframe] = useState('1h');
  const [showIndicators, setShowIndicators] = useState(false);
  const [showVolume, setShowVolume] = useState(true);
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
          View price charts with trade markers and technical indicators
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

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch
              checked={showVolume}
              onChange={setShowVolume}
              label="Volume"
            />
          </div>
          <div className="flex items-center gap-2">
            <Switch
              checked={showIndicators}
              onChange={setShowIndicators}
              label="Indicators"
            />
          </div>
          <ChartControls
            onRefresh={handleRefresh}
            loading={loading}
          />
        </div>
      </div>

      {/* Price Info */}
      {chartData.length > 0 && (
        <PriceInfo data={chartData} pair={selectedPair} />
      )}

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
              showVolume={showVolume}
              showMA={showIndicators}
              maPeriods={{ sma: 20, ema: 50 }}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}