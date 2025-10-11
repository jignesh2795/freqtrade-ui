import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  action,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      {Icon && (
        <div className="w-16 h-16 rounded-full bg-dark-800 flex items-center justify-center mb-4">
          <Icon className="w-8 h-8 text-dark-500" />
        </div>
      )}
      
      <h3 className="text-xl font-semibold text-dark-200 mb-2">{title}</h3>
      
      {description && (
        <p className="text-dark-400 mb-6 max-w-md">{description}</p>
      )}
      
      {action && (
        <Button onClick={action.onClick}>{action.label}</Button>
      )}
    </div>
  );
};