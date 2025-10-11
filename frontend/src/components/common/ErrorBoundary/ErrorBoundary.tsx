import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-dark-800 rounded-2xl border border-dark-700 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-danger-500/10 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-danger-500" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-dark-50">
                  Something went wrong
                </h2>
                <p className="text-sm text-dark-400">
                  The application encountered an error
                </p>
              </div>
            </div>

            {this.state.error && (
              <div className="mb-6 p-4 bg-dark-900 rounded-lg border border-dark-700">
                <p className="text-sm text-danger-400 font-mono break-all">
                  {this.state.error.message}
                </p>
              </div>
            )}

            <div className="flex gap-3">
              <Button
                onClick={this.handleReset}
                className="flex-1 flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </Button>
              <Button
                variant="secondary"
                onClick={() => window.location.reload()}
                className="flex-1"
              >
                Reload Page
              </Button>
            </div>

            {import.meta.env.DEV && this.state.errorInfo && (
              <details className="mt-6">
                <summary className="text-sm text-dark-400 cursor-pointer hover:text-dark-300">
                  Error Details (Development Only)
                </summary>
                <pre className="mt-2 p-4 bg-dark-900 rounded-lg border border-dark-700 text-xs text-dark-400 overflow-auto max-h-48">
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}