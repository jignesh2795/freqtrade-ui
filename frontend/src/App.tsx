import { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Test API connection on mount
    fetch('/api/ping')
      .then((res) => res.json())
      .then((data) => {
        console.log('API Connection:', data);
      })
      .catch((err) => {
        console.error('API Connection Error:', err);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-5xl font-bold mb-4 text-gradient">
              FreqTrade UI
            </h1>
            <p className="text-xl text-dark-300">
              Professional Trading Bot Interface
            </p>
          </div>

          {/* Status Card */}
          <div className="glass-dark rounded-2xl p-8 mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="w-3 h-3 bg-success-500 rounded-full animate-pulse mr-3"></div>
              <span className="text-lg text-dark-100">
                Development Environment Ready
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-dark-800/50 rounded-lg p-4">
                <div className="text-sm text-dark-400 mb-1">Phase</div>
                <div className="text-2xl font-bold text-primary-400">0</div>
                <div className="text-xs text-dark-500 mt-1">Setup</div>
              </div>
              
              <div className="bg-dark-800/50 rounded-lg p-4">
                <div className="text-sm text-dark-400 mb-1">Progress</div>
                <div className="text-2xl font-bold text-accent-400">75%</div>
                <div className="text-xs text-dark-500 mt-1">Day 2/3</div>
              </div>
              
              <div className="bg-dark-800/50 rounded-lg p-4">
                <div className="text-sm text-dark-400 mb-1">Status</div>
                <div className="text-2xl font-bold text-success-400">✓</div>
                <div className="text-xs text-dark-500 mt-1">On Track</div>
              </div>
            </div>
          </div>

          {/* Completed Tasks */}
          <div className="glass-dark rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-dark-100">
              Completed Setup Tasks
            </h2>
            <div className="space-y-3 text-left">
              {[
                'FreqTrade repository cloned and configured',
                'API server enabled and tested',
                'React + TypeScript project initialized',
                'Tailwind CSS configured with custom design system',
                'Path aliases and build tools configured',
                'ESLint and Prettier setup',
                'Environment configuration files',
                'Project folder structure created',
                'Configuration files (API, App, Theme)',
                'TypeScript type definitions',
              ].map((task, index) => (
                <div
                  key={index}
                  className="flex items-center bg-dark-800/30 rounded-lg p-3"
                >
                  <div className="w-5 h-5 rounded-full bg-success-500/20 flex items-center justify-center mr-3 flex-shrink-0">
                    <svg
                      className="w-3 h-3 text-success-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-dark-200 text-sm">{task}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Next Steps */}
          <div className="glass-dark rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-dark-100">
              Next Steps
            </h2>
            <div className="space-y-3 text-left">
              {[
                'Create base UI components (Button, Card, Input, etc.)',
                'Build layout components (Sidebar, Header)',
                'Setup routing with React Router',
                'Create API service layer',
                'Setup state management with Zustand',
              ].map((task, index) => (
                <div
                  key={index}
                  className="flex items-center bg-dark-800/30 rounded-lg p-3"
                >
                  <div className="w-5 h-5 rounded-full bg-primary-500/20 flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-primary-400 text-xs font-bold">
                      {index + 1}
                    </span>
                  </div>
                  <span className="text-dark-200 text-sm">{task}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 text-dark-400 text-sm">
            <p>Check console for API connection status</p>
            <p className="mt-2">
              FreqTrade API: <code className="text-primary-400">http://localhost:8080/api/v1</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;