import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-dark-50">Analytics</h1>
        <p className="text-dark-400 mt-1">
          Detailed performance metrics and insights
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Performance Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-dark-300">Analytics features coming in Phase 2</p>
        </CardContent>
      </Card>
    </div>
  );
}