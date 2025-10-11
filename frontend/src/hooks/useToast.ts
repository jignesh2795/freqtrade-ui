import { useState, useCallback } from 'react';
import { ToastProps, ToastType } from '../components/ui/Toast';

let toastId = 0;

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const addToast = useCallback(
    (type: ToastType, title: string, message?: string, duration?: number) => {
      const id = `toast-${++toastId}`;
      
      const newToast: ToastProps = {
        id,
        type,
        title,
        message,
        duration,
        onClose: (toastId: string) => {
          setToasts((prev) => prev.filter((t) => t.id !== toastId));
        },
      };

      setToasts((prev) => [...prev, newToast]);
    },
    []
  );

  const success = useCallback(
    (title: string, message?: string, duration?: number) => {
      addToast('success', title, message, duration);
    },
    [addToast]
  );

  const error = useCallback(
    (title: string, message?: string, duration?: number) => {
      addToast('error', title, message, duration);
    },
    [addToast]
  );

  const warning = useCallback(
    (title: string, message?: string, duration?: number) => {
      addToast('warning', title, message, duration);
    },
    [addToast]
  );

  const info = useCallback(
    (title: string, message?: string, duration?: number) => {
      addToast('info', title, message, duration);
    },
    [addToast]
  );

  return {
    toasts,
    success,
    error,
    warning,
    info,
  };
};