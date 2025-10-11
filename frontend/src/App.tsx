import { useState } from 'react';
import { ComponentShowcase } from './ComponentShowcase';
import { Button } from '@/components/ui';

function App() {
  const [showShowcase, setShowShowcase] = useState(false);

  if (showShowcase) {
    return <ComponentShowcase />;
  }

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
                Phase 0 Complete! 🎉
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-dark-800/50 rounded-lg p-4">
                <div className="text-sm text-dark-400 mb-1">Phase</div>
                <div className="text-2xl font-bold text-primary-400">0</div>
                <div className="text-xs text-dark-500 mt-1">Setup Complete</div>
              </div>
              
              <div className="bg-dark-800/50 rounded-lg p-4">
                <div className="text-sm text-dark-400 mb-1">Progress</div>
                <div className="text-2xl font-bold text-success-400">100%</div>
                <div className="text-xs text-dark-500 mt-1">Day 3/3</div>
              </div>
              
              <div className="bg-dark-800/50 rounded-lg p-4">
                <div className="text-sm text-dark-400 mb-1">Components</div>
                <div className="text-2xl font-bold text-accent-400">15+</div>
                <div className="text-xs text-dark-500 mt-1">UI Components</div>
              </div>
            </div>
          </div>

          {/* Completed Tasks */}
          <div className="glass-dark rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-dark-100">
              Phase 0: Foundation Complete ✓
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-primary-400 mb-3">
                  Infrastructure
                </h3>
                {[
                  'FreqTrade API configured',
                  'React + TypeScript setup',
                  'Tailwind CSS design system',
                  'Path aliases configured',
                  'Environment variables',
                  'ESLint & Prettier',
                ].map((task, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <span className="text-success-400 mr-2">✓</span>
                    <span className="text-dark-200">{task}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-primary-400 mb-3">
                  UI Components
                </h3>
                {[
                  'Button, Card, Input',
                  'Select, Modal, Toast',
                  'Badge, Switch, Slider',
                  'Tabs, Spinner, Skeleton',
                  'Tooltip component',
                  'useToast hook',
                ].map((task, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <span className="text-success-400 mr-2">✓</span>
                    <span className="text-dark-200">{task}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Component Showcase Button */}
          <div className="glass-dark rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-dark-100">
              View Component Showcase
            </h2>
            <p className="text-dark-300 mb-6">
              See all UI components in action with live examples and interactions
            </p>
            <Button
              size="lg"
              onClick={() => setShowShowcase(true)}
              className="w-full md:w-auto"
            >
              Open Component Showcase →
            </Button>
          </div>

          {/* Next Phase */}
          <div className="glass-dark rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-dark-100">
              Ready for Phase 1: Core Infrastructure
            </h2>
            <div className="space-y-3 text-left">
              {[
                'API Service Layer - Connect to FreqTrade',
                'WebSocket Integration - Real-time updates',
                'State Management - Zustand stores',
                'Routing Setup - React Router',
                'Layout Components - Sidebar, Header',
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

          {/* Git Stats */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-dark-800/30 rounded-lg p-4">
              <div className="text-sm text-dark-400">Total Commits</div>
              <div className="text-2xl font-bold text-primary-400 mt-1">34</div>
            </div>
            <div className="bg-dark-800/30 rounded-lg p-4">
              <div className="text-sm text-dark-400">Branches</div>
              <div className="text-2xl font-bold text-accent-400 mt-1">3</div>
            </div>
            <div className="bg-dark-800/30 rounded-lg p-4">
              <div className="text-sm text-dark-400">Files Changed</div>
              <div className="text-2xl font-bold text-success-400 mt-1">50+</div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 text-dark-400 text-sm">
            <p>FreqTrade API: <code className="text-primary-400">http://localhost:8080/api/v1</code></p>
            <p className="mt-2">Frontend: <code className="text-primary-400">http://localhost:5173</code></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;