import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';

export default function ConfigurationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-dark-50">Configuration</h1>
        <p className="text-dark-400 mt-1">Configure bot settings and parameters</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bot Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-dark-300">Configuration editor coming in Phase 2</p>
        </CardContent>
      </Card>
    </div>
  );
}