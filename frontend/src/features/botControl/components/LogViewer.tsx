import { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, Input, Badge } from '@/components/ui';
import { RefreshCw, Download, Search, X } from 'lucide-react';
import { useApi } from '@/hooks';
import { logService } from '@/services/freqtrade';
import { clsx } from 'clsx';

interface LogEntry {
  timestamp: string;
  level: string;
  message: string;
  logger: string;
}

export const LogViewer = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [filter, setFilter] = useState('');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [autoScroll, setAutoScroll] = useState(true);
  const logContainerRef = useRef<HTMLDivElement>(null);

  const { data, loading, refetch } = useApi(
    async () => {
      const response = await logService.getLogs();
      return response;
    },
    { autoFetch: true }
  );

  useEffect(() => {
    if (data) {
      setLogs(data);
    }
  }, [data]);

  useEffect(() => {
    if (autoScroll && logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs, autoScroll]);

  const filteredLogs = logs.filter((log) => {
    if (levelFilter !== 'all' && log.level !== levelFilter) return false;
    if (filter && !log.message.toLowerCase().includes(filter.toLowerCase())) return false;
    return true;
  });

  const getLevelColor = (level: string) => {
    switch (level.toUpperCase()) {
      case 'ERROR':
        return 'text-danger-400 bg-danger-500/10';
      case 'WARNING':
        return 'text-warning-400 bg-warning-500/10';
      case 'INFO':
        return 'text-primary-400 bg-primary-500/10';
      case 'DEBUG':
        return 'text-dark-400 bg-dark-800';
      default:
        return 'text-dark-300 bg-dark-800';
    }
  };

  const handleDownload = () => {
    const logText = logs
      .map((log) => `[${log.timestamp}] ${log.level}: ${log.message}`)
      .join('\n');
    
    const blob = new Blob([logText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `freqtrade-logs-${new Date().toISOString()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Bot Logs</CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => refetch()}
              disabled={loading}
            >
              <RefreshCw className={clsx('w-4 h-4', loading && 'animate-spin')} />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleDownload}>
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Filters */}
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <Input
                placeholder="Search logs..."
                leftIcon={<Search className="w-4 h-4" />}
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                rightIcon={
                  filter && (
                    <button onClick={() => setFilter('')}>
                      <X className="w-4 h-4" />
                    </button>
                  )
                }
              />
            </div>

            <div className="flex gap-2">
              {['all', 'ERROR', 'WARNING', 'INFO', 'DEBUG'].map((level) => (
                <button
                  key={level}
                  onClick={() => setLevelFilter(level)}
                  className={clsx(
                    'px-3 py-1 rounded text-sm transition-colors',
                    levelFilter === level
                      ? 'bg-primary-600 text-white'
                      : 'bg-dark-800 text-dark-400 hover:text-dark-200'
                  )}
                >
                  {level}
                </button>
              ))}
            </div>

            <label className="flex items-center gap-2 text-sm text-dark-300">
              <input
                type="checkbox"
                checked={autoScroll}
                onChange={(e) => setAutoScroll(e.target.checked)}
                className="rounded"
              />
              Auto-scroll
            </label>
          </div>

          {/* Log Display */}
          <div
            ref={logContainerRef}
            className="h-96 overflow-y-auto bg-dark-900 rounded-lg p-4 font-mono text-sm"
          >
            {loading && logs.length === 0 ? (
              <div className="text-center text-dark-500 py-8">Loading logs...</div>
            ) : filteredLogs.length === 0 ? (
              <div className="text-center text-dark-500 py-8">
                {filter || levelFilter !== 'all' ? 'No logs match your filters' : 'No logs available'}
              </div>
            ) : (
              <div className="space-y-1">
                {filteredLogs.map((log, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 py-1 hover:bg-dark-800 px-2 -mx-2 rounded"
                  >
                    <span className="text-dark-500 text-xs flex-shrink-0">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </span>
                    <Badge
                      className={clsx('flex-shrink-0', getLevelColor(log.level))}
                      size="sm"
                    >
                      {log.level}
                    </Badge>
                    <span className="text-dark-200 break-all">{log.message}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-dark-400">
            <span>
              {filteredLogs.length} of {logs.length} logs
            </span>
            <span>Last updated: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};