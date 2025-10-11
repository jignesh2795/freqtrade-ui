import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { performanceService } from '@/services/freqtrade';
import { Loading } from '@/components/common';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { formatCurrency, formatDate } from '@/utils';

export const DailyProfitChart = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(30);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const dailyData = await performanceService.getDaily(days);
        const chartData = dailyData.map((entry) => ({
          date: formatDate(entry.date),
          profit: entry.abs_profit,
          fiatValue: entry.fiat_value,
          trades: entry.trade_count,
        }));
        setData(chartData);
      } catch (error) {
        console.error('Failed to fetch daily profit:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [days]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-dark-800 border border-dark-700 rounded-lg p-3">
          <p className="text-sm font-medium text-dark-50 mb-2">
            {payload[0].payload.date}
          </p>
          <div className="space-y-1">
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs text-dark-400">Profit:</span>
              <span className="text-sm font-semibold text-success-400">
                {formatCurrency(payload[0].value)}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs text-dark-400">Trades:</span>
              <span className="text-sm text-dark-200">
                {payload[0].payload.trades}
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Daily Profit</CardTitle>
          <div className="flex gap-2">
            {[7, 30, 90].map((d) => (
              <button
                key={d}
                onClick={() => setDays(d)}
                className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                  days === d
                    ? 'bg-primary-600 text-white'
                    : 'bg-dark-800 text-dark-400 hover:text-dark-200'
                }`}
              >
                {d}d
              </button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Loading message="Loading chart..." />
        ) : data.length === 0 ? (
          <div className="text-center text-dark-400 py-12">
            No daily profit data available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis
                dataKey="date"
                stroke="#64748b"
                style={{ fontSize: '12px' }}
              />
              <YAxis
                stroke="#64748b"
                style={{ fontSize: '12px' }}
                tickFormatter={(value) => formatCurrency(value)}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="profit"
                stroke="#22c55e"
                strokeWidth={2}
                fill="url(#profitGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};