import { Card, CardHeader, CardTitle, CardContent, Switch } from '@/components/ui';
import { useUIStore } from '@/store';

export default function SettingsPage() {
  const { theme, toggleTheme, sidebarCollapsed, toggleSidebar } = useUIStore();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-dark-50">Settings</h1>
        <p className="text-dark-400 mt-1">Configure application preferences</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Switch
              checked={theme === 'dark'}
              onChange={toggleTheme}
              label="Dark Mode"
            />
            <Switch
              checked={!sidebarCollapsed}
              onChange={toggleSidebar}
              label="Expand Sidebar"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>More Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-dark-300">
            Additional settings will be added in Phase 2
          </p>
        </CardContent>
      </Card>
    </div>
  );
}