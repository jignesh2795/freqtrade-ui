import { Spinner } from '@/components/ui';

interface LoadingProps {
  message?: string;
  fullScreen?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({
  message = 'Loading...',
  fullScreen = false,
}) => {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-dark-900/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="text-center">
          <Spinner size="xl" className="mx-auto mb-4" />
          <p className="text-dark-300 text-lg">{message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-12">
      <div className="text-center">
        <Spinner size="lg" className="mx-auto mb-4" />
        <p className="text-dark-400">{message}</p>
      </div>
    </div>
  );
};