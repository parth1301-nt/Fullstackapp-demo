'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Globe, TrendingUp, Calendar, Activity, RefreshCw, Download } from 'lucide-react';

type AnalyticsData = {
  totalSubdomains: number;
  totalUsers: number;
  pageViews: number;
  revenue: number;
  createdToday: number;
  createdThisWeek: number;
  createdThisMonth: number;
  activeUsers: number;
  bounceRate: number;
  avgSessionDuration: number;
};

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData>({
    totalSubdomains: 45,
    totalUsers: 1234,
    pageViews: 45200,
    revenue: 12450,
    createdToday: 3,
    createdThisWeek: 12,
    createdThisMonth: 28,
    activeUsers: 89,
    bounceRate: 32,
    avgSessionDuration: 245
  });

  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setData({
      ...data,
      totalSubdomains: data.totalSubdomains + Math.floor(Math.random() * 3),
      pageViews: data.pageViews + Math.floor(Math.random() * 100)
    });
    setIsLoading(false);
  };

  const handleExport = () => {
    const csvContent = `Metric,Value\nTotal Subdomains,${data.totalSubdomains}\nTotal Users,${data.totalUsers}\nPage Views,${data.pageViews}\nRevenue,$${data.revenue}\nCreated Today,${data.createdToday}\nCreated This Week,${data.createdThisWeek}\nCreated This Month,${data.createdThisMonth}\nActive Users,${data.activeUsers}\nBounce Rate,${data.bounceRate}%\nAvg Session Duration,${data.avgSessionDuration}s`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const stats = [
    {
      title: 'Total Subdomains',
      value: data.totalSubdomains,
      icon: Globe,
      description: 'All active subdomains',
      trend: '+12% from last month',
      color: 'blue'
    },
    {
      title: 'Total Users',
      value: data.totalUsers.toLocaleString(),
      icon: Users,
      description: 'Registered users',
      trend: '+8% from last month',
      color: 'green'
    },
    {
      title: 'Page Views',
      value: (data.pageViews / 1000).toFixed(1) + 'K',
      icon: Activity,
      description: 'Total page views',
      trend: '+15% from last month',
      color: 'purple'
    },
    {
      title: 'Revenue',
      value: '$' + data.revenue.toLocaleString(),
      icon: TrendingUp,
      description: 'Total revenue',
      trend: '+23% from last month',
      color: 'orange'
    }
  ];

  const engagementStats = [
    {
      title: 'Created Today',
      value: data.createdToday,
      icon: Calendar,
      description: 'New subdomains today',
      trend: data.createdToday > 0 ? '+1 today' : 'No new today',
      color: 'blue'
    },
    {
      title: 'Created This Week',
      value: data.createdThisWeek,
      icon: Calendar,
      description: 'New subdomains this week',
      trend: `${data.createdThisWeek} this week`,
      color: 'green'
    },
    {
      title: 'Active Users',
      value: data.activeUsers,
      icon: Users,
      description: 'Currently online',
      trend: 'Live count',
      color: 'purple'
    },
    {
      title: 'Bounce Rate',
      value: data.bounceRate + '%',
      icon: Activity,
      description: 'Average bounce rate',
      trend: '-2% from last week',
      color: 'orange'
    }
  ];

  const getColorClass = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-50 text-blue-600';
      case 'green': return 'bg-green-50 text-green-600';
      case 'purple': return 'bg-purple-50 text-purple-600';
      case 'orange': return 'bg-orange-50 text-orange-600';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-500 mt-1">Overview of platform performance and usage</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as '7d' | '30d' | '90d')}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <Button variant="outline" onClick={handleRefresh} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <div className={`h-8 w-8 rounded-lg p-1.5 ${getColorClass(stat.color)}`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="mt-1 text-xs text-gray-500">
                {stat.description}
              </p>
              <p className="mt-2 text-xs font-medium text-blue-600">
                {stat.trend}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Engagement Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {engagementStats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <div className={`h-8 w-8 rounded-lg p-1.5 ${getColorClass(stat.color)}`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="mt-1 text-xs text-gray-500">
                {stat.description}
              </p>
              <p className="mt-2 text-xs font-medium text-blue-600">
                {stat.trend}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Traffic Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Traffic Overview</CardTitle>
            <CardDescription>
              Website traffic patterns for selected period
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
                const height = Math.random() * 60 + 20;
                return (
                  <div key={day} className="flex items-center gap-3">
                    <span className="text-xs text-gray-500 w-8">{day}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-4">
                      <div 
                        className="bg-blue-500 h-4 rounded-full transition-all duration-500"
                        style={{ width: `${height}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 w-16 text-right">
                      {Math.floor(height * 10)} visits
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Platform Health */}
        <Card>
          <CardHeader>
            <CardTitle>Platform Health</CardTitle>
            <CardDescription>
              System status and performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                Database Status
              </span>
              <span className="text-sm font-medium text-green-600 flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                Connected
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                Authentication
              </span>
              <span className="text-sm font-medium text-green-600 flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                Active
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                Subdomain Routing
              </span>
              <span className="text-sm font-medium text-green-600 flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                Operational
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                Cache Hit Rate
              </span>
              <span className="text-sm font-medium text-blue-600">
                94.5%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                Avg Response Time
              </span>
              <span className="text-sm font-medium text-blue-600">
                45ms
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                Uptime
              </span>
              <span className="text-sm font-medium text-green-600">
                99.9%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                Last Updated
              </span>
              <span className="text-sm font-medium">
                {new Date().toLocaleString()}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
          <CardDescription>
            Key performance indicators over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{data.avgSessionDuration}s</div>
              <p className="text-sm text-gray-500 mt-1">Avg Session Duration</p>
              <p className="text-xs text-green-600 mt-1">+12% improvement</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{data.bounceRate}%</div>
              <p className="text-sm text-gray-500 mt-1">Bounce Rate</p>
              <p className="text-xs text-green-600 mt-1">-5% improvement</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">4.8/5</div>
              <p className="text-sm text-gray-500 mt-1">User Satisfaction</p>
              <p className="text-xs text-green-600 mt-1">+0.3 improvement</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
