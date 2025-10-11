import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { clsx } from 'clsx';
import { Sidebar } from '../Sidebar';
import { Header } from '../Header';
import { Spinner } from '@/components/ui';
import { useUIStore } from '@/store';

export const MainLayout = () => {
  const { sidebarCollapsed } = useUIStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div
        className={clsx(
          'transition-all duration-300',
          sidebarCollapsed ? 'ml-16' : 'ml-64'
        )}
      >
        {/* Header */}
        <Header />

        {/* Page Content */}
        <main className="p-6">
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
                <div className="text-center">
                  <Spinner size="xl" className="mx-auto mb-4" />
                  <p className="text-dark-400">Loading...</p>
                </div>
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
};