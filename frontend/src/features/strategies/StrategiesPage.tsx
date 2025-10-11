import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';

export default function StrategiesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-dark-50">Strategies</h1>
        <p className="text-dark-400 mt-1">
          View and configure trading strategies
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Strategy Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-dark-300">Strategy features coming in Phase 2</p>
        </CardContent>
      </Card>
    </div>
  );
}