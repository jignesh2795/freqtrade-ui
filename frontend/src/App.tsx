import { useState } from 'react';
import { ComponentShowcase } from './ComponentShowcase';
import { Button } from '@/components/ui';
import { useEffect } from 'react';
import { Router } from './app/Router';
import { ToastContainer } from '@/components/ui';
import { useToast } from '@/hooks';
import { useWebSocket } from '@/hooks';
import { useBotStore } from '@/store';

function App() {
  const { toasts } = useToast();
  const { updateStatus } = useBotStore();

  // Setup WebSocket connection
  const { subscribe } = useWebSocket({
    autoConnect: true,
    onConnect: () => {
      console.log('[App] WebSocket connected');
    },
    onDisconnect: () => {
      console.log('[App] WebSocket disconnected');
    },
    onError: (error) => {
      console.error('[App] WebSocket error:', error);
    },
  });

  // Subscribe to bot status updates
  useEffect(() => {
    const unsubscribe = subscribe('status', (data) => {
      console.log('[App] Status update:', data);
      updateStatus(data);
    });

    return () => {
      unsubscribe();
    };
  }, [subscribe, updateStatus]);

  return (
    <>
      <Router />
      <ToastContainer toasts={toasts} />
    </>
  );
}

export default App;
