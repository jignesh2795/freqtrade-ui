import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';

export default function TradesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-dark-50">Trades</h1>
        <p className="text-dark-400 mt-1">Manage your open and closed trades</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Trade List</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-dark-300">Trade management coming in Phase 2</p>
        </CardContent>
      </Card>
    </div>
  );
}