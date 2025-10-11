import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-dark-50">Dashboard</h1>
        <p className="text-dark-400 mt-1">
          Monitor your bot performance and active trades
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-success-400">$0.00</div>
            <p className="text-sm text-dark-400 mt-1">0.00%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Open Trades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary-400">0</div>
            <p className="text-sm text-dark-400 mt-1">Active positions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Win Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent-400">0%</div>
            <p className="text-sm text-dark-400 mt-1">Success rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bot Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-dark-600"></div>
              <span className="text-dark-300">Offline</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-dark-300">
            Dashboard features will be implemented in Phase 2
          </p>
        </CardContent>
      </Card>
    </div>
  );
}