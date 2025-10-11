import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { performanceService } from '@/services/freqtrade';
import { Loading } from '@/components/common';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

export const TradeStatistics = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const stats = await performanceService.getStats();
        
        // Process exit reasons
        const exitReasons = Object.entries(stats.exit_reasons || {}).map(
          ([reason, data]: [string, any]) => ({
            reason: reason.replace(/_/g, ' '),
            trades: data.trades,
            wins: data.wins,
            losses: data.losses,
            profit: data.profit_mean,
          })
        );

        setData({
          exitReasons: exitReasons.slice(0, 5), // Top 5 reasons
          durations: stats.durations,
        });
      } catch (error) {
        console.error('Failed to fetch statistics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-dark-800 border border-dark-700 rounded-lg p-3">
          <p className="text-sm font-medium text-dark-50 mb-2 capitalize">
            {data.reason}
          </p>
          <div className="space-y-1">
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs text-dark-400">Total:</span>
              <span className="text-sm text-dark-200">{data.trades}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs text-success-400">Wins:</span>
              <span className="text-sm text-success-400">{data.wins}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs text-danger-400">Losses:</span>
              <span className="text-sm text-danger-400">{data.losses}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Exit Reasons</CardTitle>
        </CardHeader>
        <CardContent>
          <Loading message="Loading statistics..." />
        </CardContent>
      </Card>
    );
  }

  if (!data || data.exitReasons.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Exit Reasons</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-dark-400 py-8">
            No statistics available yet
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Exit Reasons</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data.exitReasons}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis
              dataKey="reason"
              stroke="#64748b"
              style={{ fontSize: '12px' }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="trades" radius={[8, 8, 0, 0]}>
              {data.exitReasons.map((entry: any, index: number) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.wins > entry.losses ? '#22c55e' : '#ef4444'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};