import React, { useEffect } from 'react';
import { clsx } from 'clsx';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { createPortal } from 'react-dom';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  onClose: (id: string) => void;
}

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const styles = {
  success: 'bg-success-500/10 border-success-500/50 text-success-400',
  error: 'bg-danger-500/10 border-danger-500/50 text-danger-400',
  warning: 'bg-warning-500/10 border-warning-500/50 text-warning-400',
  info: 'bg-primary-500/10 border-primary-500/50 text-primary-400',
};

export const Toast: React.FC<ToastProps> = ({
  id,
  type,
  title,
  message,
  duration = 5000,
  onClose,
}) => {
  const Icon = icons[type];

  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        onClose(id);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [id, duration, onClose]);

  return (
    <div
      className={clsx(
        'flex items-start gap-3 p-4 rounded-lg border',
        'backdrop-blur-md shadow-lg',
        'animate-slide-in',
        styles[type]
      )}
    >
      <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
      
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-dark-50">{title}</h4>
        {message && (
          <p className="mt-1 text-sm text-dark-300">{message}</p>
        )}
      </div>

      <button
        onClick={() => onClose(id)}
        className="flex-shrink-0 p-1 rounded-lg hover:bg-dark-700/50 transition-colors"
      >
        <X className="w-4 h-4 text-dark-400" />
      </button>
    </div>
  );
};

export interface ToastContainerProps {
  toasts: ToastProps[];
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  position = 'top-right',
}) => {
  const positionStyles = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
  };

  if (toasts.length === 0) return null;

  return createPortal(
    <div
      className={clsx(
        'fixed z-50 flex flex-col gap-2 max-w-md w-full',
        positionStyles[position]
      )}
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>,
    document.body
  );
};