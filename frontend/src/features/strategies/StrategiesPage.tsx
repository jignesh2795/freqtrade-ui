import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { Button } from '@/components/ui';
import { Link } from 'react-router-dom';

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
          <CardTitle>Strategy Builder</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-dark-300 mb-4">Visually create and test your trading strategies with our drag-and-drop builder.</p>
          <Link to="/strategies/builder">
            <Button>Open Strategy Builder</Button>
          </Link>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Strategy Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-dark-300">Manage your existing strategies, view performance, and optimize parameters.</p>
        </CardContent>
      </Card>
    </div>
  );
}