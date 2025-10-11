import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { Cpu, HardDrive, Activity, Wifi } from 'lucide-react';
import { clsx } from 'clsx';
import { useApi } from '@/hooks';
import { systemService } from '@/services/freqtrade';

interface SystemStats {
  cpu: number;
  memory: number;
  disk: number;
  uptime: number;
}

export const SystemMonitor = () => {
  const [stats, setStats] = useState<SystemStats>({
    cpu: 0,
    memory: 0,
    disk: 0,
    uptime: 0,
  });

  const { data, loading, error, refetch } = useApi(
    async () => {
      const response = await systemService.getSystemInfo();
      return response;
    },
    { autoFetch: true }
  );

  useEffect(() => {
    if (data) {
      // FreqTrade only provides CPU and RAM info
      // For disk usage and uptime, we'll keep using mock data for now
      setStats(prev => ({
        ...prev,
        cpu: Array.isArray(data.cpu_pct) && data.cpu_pct.length > 0 
          ? data.cpu_pct.reduce((a, b) => a + b, 0) / data.cpu_pct.length 
          : 0,
        memory: data.ram_pct || 0,
      }));
    }
  }, [data]);

  // Update stats every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
      
      // Update mock data for disk and uptime
      setStats(prev => ({
        ...prev,
        disk: 60 + Math.random() * 10,
        uptime: Date.now() - new Date().setHours(0, 0, 0, 0),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, [refetch]);

  const formatUptime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ${hours % 24}h`;
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m`;
    return `${seconds}s`;
  };

  const getUsageColor = (value: number) => {
    if (value >= 80) return 'bg-danger-500';
    if (value >= 60) return 'bg-warning-500';
    return 'bg-success-500';
  };

  const UsageBar = ({ value, label, icon: Icon }: { value: number; label: string; icon: any }) => (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-dark-400" />
          <span className="text-sm text-dark-300">{label}</span>
        </div>
        <span className="text-sm font-semibold text-dark-100">
          {value.toFixed(1)}%
        </span>
      </div>
      <div className="h-2 bg-dark-900 rounded-full overflow-hidden">
        <div
          className={clsx('h-full transition-all duration-500', getUsageColor(value))}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>System Monitor</CardTitle>
          <div className="flex items-center gap-2">
            <Wifi className="w-4 h-4 text-success-500" />
            <span className="text-xs text-dark-400">Connected</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <UsageBar value={stats.cpu} label="CPU Usage" icon={Cpu} />
          <UsageBar value={stats.memory} label="Memory Usage" icon={HardDrive} />
          <UsageBar value={stats.disk} label="Disk Usage" icon={Activity} />

          {/* Uptime */}
          <div className="pt-4 border-t border-dark-700">
            <div className="flex items-center justify-between text-sm">
              <span className="text-dark-400">System Uptime</span>
              <span className="font-semibold text-dark-100">
                {formatUptime(stats.uptime)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};