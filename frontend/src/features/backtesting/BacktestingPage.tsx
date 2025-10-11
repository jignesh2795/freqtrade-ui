import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';

export default function BacktestingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-dark-50">Backtesting</h1>
        <p className="text-dark-400 mt-1">
          Test strategies with historical data
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Backtest Runner</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-dark-300">Backtesting features coming in Phase 2</p>
        </CardContent>
      </Card>
    </div>
  );
}