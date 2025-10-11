import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { LucideIcon } from 'lucide-react';
import { clsx } from 'clsx';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  loading?: boolean;
  color?: 'primary' | 'success' | 'danger' | 'warning';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  loading,
  color = 'primary',
}) => {
  const colorStyles = {
    primary: 'text-primary-400',
    success: 'text-success-400',
    danger: 'text-danger-400',
    warning: 'text-warning-400',
  };

  return (
    <Card hover>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-dark-400">
            {title}
          </CardTitle>
          {Icon && (
            <div className="w-8 h-8 rounded-lg bg-dark-700 flex items-center justify-center">
              <Icon className="w-4 h-4 text-dark-300" />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            <div className="h-8 w-24 bg-dark-700 rounded animate-pulse" />
            {subtitle && <div className="h-4 w-16 bg-dark-800 rounded animate-pulse" />}
          </div>
        ) : (
          <>
            <div className={clsx('text-3xl font-bold mb-1', colorStyles[color])}>
              {value}
            </div>
            {(subtitle || trend) && (
              <div className="flex items-center gap-2">
                {subtitle && (
                  <span className="text-sm text-dark-400">{subtitle}</span>
                )}
                {trend && (
                  <span
                    className={clsx(
                      'text-sm font-medium',
                      trend.isPositive ? 'text-success-400' : 'text-danger-400'
                    )}
                  >
                    {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
                  </span>
                )}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};