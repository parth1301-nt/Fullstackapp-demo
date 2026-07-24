'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileText, Download, Filter, Search, Trash2, RefreshCw } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';

type Log = {
  id: number;
  level: 'INFO' | 'WARNING' | 'ERROR' | 'DEBUG';
  message: string;
  timestamp: string;
  source: string;
};

export default function LogsPage() {
  const [logs, setLogs] = useState<Log[]>([
    {
      id: 1,
      level: 'INFO',
      message: 'User john@example.com logged in',
      timestamp: '2024-01-15 10:30:00',
      source: 'auth'
    },
    {
      id: 2,
      level: 'WARNING',
      message: 'High memory usage detected (85%)',
      timestamp: '2024-01-15 11:45:00',
      source: 'system'
    },
    {
      id: 3,
      level: 'ERROR',
      message: 'Failed to connect to Redis',
      timestamp: '2024-01-15 12:00:00',
      source: 'database'
    },
    {
      id: 4,
      level: 'INFO',
      message: 'New subdomain created: test-subdomain',
      timestamp: '2024-01-15 13:15:00',
      source: 'subdomain'
    },
    {
      id: 5,
      level: 'INFO',
      message: 'User jane@example.com logged out',
      timestamp: '2024-01-15 14:30:00',
      source: 'auth'
    },
    {
      id: 6,
      level: 'WARNING',
      message: 'Rate limit exceeded for IP 192.168.1.1',
      timestamp: '2024-01-15 15:45:00',
      source: 'security'
    },
    {
      id: 7,
      level: 'INFO',
      message: 'Cache cleared successfully',
      timestamp: '2024-01-15 16:00:00',
      source: 'cache'
    },
    {
      id: 8,
      level: 'DEBUG',
      message: 'API response time: 45ms',
      timestamp: '2024-01-15 16:15:00',
      source: 'api'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState<string>('ALL');
  const [sourceFilter, setSourceFilter] = useState<string>('ALL');
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState<Log | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'ERROR':
        return 'bg-red-100 text-red-700';
      case 'WARNING':
        return 'bg-yellow-100 text-yellow-700';
      case 'INFO':
        return 'bg-blue-100 text-blue-700';
      case 'DEBUG':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  // READ with filters
  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.source.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = levelFilter === 'ALL' || log.level === levelFilter;
    const matchesSource = sourceFilter === 'ALL' || log.source === sourceFilter;
    return matchesSearch && matchesLevel && matchesSource;
  });

  // DELETE
  const handleDeleteLog = (id: number) => {
    if (confirm('Are you sure you want to delete this log entry?')) {
      setLogs(logs.filter(log => log.id !== id));
    }
  };

  const handleClearLogs = () => {
    if (confirm('Are you sure you want to clear all logs?')) {
      setLogs([]);
    }
  };

  const handleExportLogs = () => {
    const logText = logs.map(log => 
      `[${log.timestamp}] [${log.level}] [${log.source}] ${log.message}`
    ).join('\n');
    
    const blob = new Blob([logText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `logs-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleRefreshLogs = () => {
    // Simulate fetching new logs
    const newLog: Log = {
      id: Date.now(),
      level: 'INFO',
      message: 'Logs refreshed',
      timestamp: new Date().toLocaleString(),
      source: 'system'
    };
    setLogs([newLog, ...logs]);
  };

  const uniqueSources = Array.from(new Set(logs.map(log => log.source)));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Logs</h1>
          <p className="text-gray-500 mt-1">Monitor system activity and events</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefreshLogs}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Dialog open={isFilterDialogOpen} onOpenChange={setIsFilterDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Filter Logs</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="level-filter">Log Level</Label>
                  <select
                    id="level-filter"
                    value={levelFilter}
                    onChange={(e) => setLevelFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="ALL">All Levels</option>
                    <option value="ERROR">Error</option>
                    <option value="WARNING">Warning</option>
                    <option value="INFO">Info</option>
                    <option value="DEBUG">Debug</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="source-filter">Source</Label>
                  <select
                    id="source-filter"
                    value={sourceFilter}
                    onChange={(e) => setSourceFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="ALL">All Sources</option>
                    {uniqueSources.map(source => (
                      <option key={source} value={source}>{source}</option>
                    ))}
                  </select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => {
                  setLevelFilter('ALL');
                  setSourceFilter('ALL');
                }}>Reset</Button>
                <Button onClick={() => setIsFilterDialogOpen(false)}>Apply</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="outline" onClick={handleExportLogs}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="destructive" onClick={handleClearLogs}>
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search logs by message or source..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          {(levelFilter !== 'ALL' || sourceFilter !== 'ALL') && (
            <div className="flex gap-2 mt-3">
              {levelFilter !== 'ALL' && (
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                  Level: {levelFilter}
                  <button
                    onClick={() => setLevelFilter('ALL')}
                    className="ml-1 hover:text-blue-900"
                  >
                    ×
                  </button>
                </span>
              )}
              {sourceFilter !== 'ALL' && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                  Source: {sourceFilter}
                  <button
                    onClick={() => setSourceFilter('ALL')}
                    className="ml-1 hover:text-green-900"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Log Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{logs.length}</div>
            <p className="text-xs text-gray-500 mt-1">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Errors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{logs.filter(l => l.level === 'ERROR').length}</div>
            <p className="text-xs text-gray-500 mt-1">Critical issues</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Warnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{logs.filter(l => l.level === 'WARNING').length}</div>
            <p className="text-xs text-gray-500 mt-1">Needs attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Info</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{logs.filter(l => l.level === 'INFO').length}</div>
            <p className="text-xs text-gray-500 mt-1">Normal activity</p>
          </CardContent>
        </Card>
      </div>

      {/* Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Logs ({filteredLogs.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredLogs.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-8">No logs match your filters</p>
          ) : (
            <div className="space-y-2">
              {filteredLogs.map((log) => (
                <div 
                  key={log.id} 
                  className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                  onClick={() => {
                    setSelectedLog(log);
                    setIsDetailDialogOpen(true);
                  }}
                >
                  <span className={`text-xs font-medium px-2 py-1 rounded ${getLevelColor(log.level)}`}>
                    {log.level}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm">{log.message}</p>
                    <p className="text-xs text-gray-500">{log.source}</p>
                  </div>
                  <span className="text-xs text-gray-400">{log.timestamp}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteLog(log.id);
                    }}
                    className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Log Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Log Details</DialogTitle>
          </DialogHeader>
          {selectedLog && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-600">Level</Label>
                  <p className="font-medium">{selectedLog.level}</p>
                </div>
                <div>
                  <Label className="text-gray-600">Source</Label>
                  <p className="font-medium">{selectedLog.source}</p>
                </div>
                <div>
                  <Label className="text-gray-600">Timestamp</Label>
                  <p className="font-medium">{selectedLog.timestamp}</p>
                </div>
                <div>
                  <Label className="text-gray-600">Log ID</Label>
                  <p className="font-medium">{selectedLog.id}</p>
                </div>
              </div>
              <div>
                <Label className="text-gray-600">Message</Label>
                <p className="font-medium bg-gray-50 p-3 rounded mt-1">{selectedLog.message}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
