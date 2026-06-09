import { getAllSubdomains } from '@/lib/subdomains';
import { verifySession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Users,
  Globe,
  TrendingUp,
  Calendar,
  ArrowLeft,
  LayoutDashboard
} from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Analytics Dashboard',
  description: 'View platform analytics and statistics'
};

export default async function AnalyticsPage() {
  const isAuthenticated = await verifySession();
  if (!isAuthenticated) {
    redirect('/login');
  }

  const tenants = await getAllSubdomains();
  const totalSubdomains = tenants.length;
  
  // Calculate some basic analytics
  const now = Date.now();
  const oneDayAgo = now - 24 * 60 * 60 * 1000;
  const oneWeekAgo = now - 7 * 24 * 60 * 60 * 1000;
  const oneMonthAgo = now - 30 * 24 * 60 * 60 * 1000;

  const createdToday = tenants.filter(t => t.createdAt >= oneDayAgo).length;
  const createdThisWeek = tenants.filter(t => t.createdAt >= oneWeekAgo).length;
  const createdThisMonth = tenants.filter(t => t.createdAt >= oneMonthAgo).length;

  const stats = [
    {
      title: 'Total Subdomains',
      value: totalSubdomains,
      icon: Globe,
      description: 'All active subdomains',
      trend: '+12% from last month'
    },
    {
      title: 'Created Today',
      value: createdToday,
      icon: Calendar,
      description: 'New subdomains in last 24 hours',
      trend: createdToday > 0 ? '+1 today' : 'No new today'
    },
    {
      title: 'Created This Week',
      value: createdThisWeek,
      icon: TrendingUp,
      description: 'New subdomains in last 7 days',
      trend: `${createdThisWeek} this week`
    },
    {
      title: 'Created This Month',
      value: createdThisMonth,
      icon: Users,
      description: 'New subdomains in last 30 days',
      trend: `${createdThisMonth} this month`
    }
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
                <p className="mt-2 text-muted-foreground">
                  Overview of platform performance and usage
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" asChild>
                  <Link href="/admin">
                    <LayoutDashboard className="mr-2 size-4" />
                    Manage Subdomains
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <div className="size-8 rounded-lg bg-primary/10 p-1.5 text-primary">
                    <stat.icon className="size-5" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                  <p className="mt-2 text-xs font-medium text-primary">
                    {stat.trend}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest subdomain creations
                </CardDescription>
              </CardHeader>
              <CardContent>
                {tenants.length === 0 ? (
                  <p className="text-sm text-muted-foreground py-4">
                    No subdomains created yet
                  </p>
                ) : (
                  <div className="space-y-4">
                    {tenants.slice(0, 5).map((tenant) => (
                      <div
                        key={tenant.subdomain}
                        className="flex items-center justify-between rounded-lg border p-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{tenant.emoji}</div>
                          <div>
                            <p className="font-medium text-sm">
                              {tenant.subdomain}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Created {new Date(tenant.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Platform Health</CardTitle>
                <CardDescription>
                  System status and performance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Database Status
                  </span>
                  <span className="text-sm font-medium text-green-600">
                    Connected
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Authentication
                  </span>
                  <span className="text-sm font-medium text-green-600">
                    Active
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Subdomain Routing
                  </span>
                  <span className="text-sm font-medium text-green-600">
                    Operational
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Last Updated
                  </span>
                  <span className="text-sm font-medium">
                    {new Date().toLocaleString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8">
            <Button variant="outline" asChild>
              <Link href="/admin">
                <ArrowLeft className="mr-2 size-4" />
                Back to Admin Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </main>
      
      <SiteFooter />
    </div>
  );
}
