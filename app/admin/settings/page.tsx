'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Globe, Bell, Lock, Database, Save, CheckCircle } from 'lucide-react';

type Settings = {
  siteName: string;
  siteUrl: string;
  description: string;
  emailNotifications: boolean;
  subdomainAlerts: boolean;
  securityAlerts: boolean;
  adminEmail: string;
  cacheTTL: number;
  connectionPool: number;
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    siteName: 'localhost:3000',
    siteUrl: 'http://localhost:3000',
    description: '',
    emailNotifications: true,
    subdomainAlerts: true,
    securityAlerts: true,
    adminEmail: '',
    cacheTTL: 3600,
    connectionPool: 10
  });

  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  // UPDATE (Save settings)
  const handleSaveSettings = async (category: string) => {
    setSaveStatus('saving');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSaveStatus('saved');
    setTimeout(() => setSaveStatus('idle'), 2000);
    
    console.log(`Saving ${category} settings:`, settings);
  };

  const handleInputChange = (field: keyof Settings, value: string | number | boolean) => {
    setSettings({ ...settings, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-500 mt-1">Configure platform settings and preferences</p>
        </div>
        {saveStatus === 'saved' && (
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle className="h-5 w-5" />
            <span>Settings saved successfully</span>
          </div>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              General Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="site-name">Site Name</Label>
              <Input
                id="site-name"
                value={settings.siteName}
                onChange={(e) => handleInputChange('siteName', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="site-url">Site URL</Label>
              <Input
                id="site-url"
                value={settings.siteUrl}
                onChange={(e) => handleInputChange('siteUrl', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={settings.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Enter site description"
              />
            </div>
            <Button onClick={() => handleSaveSettings('general')} disabled={saveStatus === 'saving'}>
              {saveStatus === 'saving' ? 'Saving...' : <><Save className="h-4 w-4 mr-2" />Save Changes</>}
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-gray-500">Receive email updates</p>
              </div>
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => handleInputChange('emailNotifications', e.target.checked)}
                className="h-4 w-4"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">New Subdomain Alerts</p>
                <p className="text-sm text-gray-500">Get notified of new subdomains</p>
              </div>
              <input
                type="checkbox"
                checked={settings.subdomainAlerts}
                onChange={(e) => handleInputChange('subdomainAlerts', e.target.checked)}
                className="h-4 w-4"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Security Alerts</p>
                <p className="text-sm text-gray-500">Security related notifications</p>
              </div>
              <input
                type="checkbox"
                checked={settings.securityAlerts}
                onChange={(e) => handleInputChange('securityAlerts', e.target.checked)}
                className="h-4 w-4"
              />
            </div>
            <Button onClick={() => handleSaveSettings('notifications')} disabled={saveStatus === 'saving'}>
              {saveStatus === 'saving' ? 'Saving...' : <><Save className="h-4 w-4 mr-2" />Update Preferences</>}
            </Button>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="admin-email">Admin Email</Label>
              <Input
                id="admin-email"
                type="email"
                value={settings.adminEmail}
                onChange={(e) => handleInputChange('adminEmail', e.target.value)}
                placeholder="admin@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" placeholder="Enter current password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" placeholder="Enter new password" />
            </div>
            <Button onClick={() => handleSaveSettings('security')} disabled={saveStatus === 'saving'}>
              {saveStatus === 'saving' ? 'Saving...' : <><Save className="h-4 w-4 mr-2" />Update Security</>}
            </Button>
          </CardContent>
        </Card>

        {/* Database Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Database
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Redis Status</Label>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                <span className="text-sm text-gray-600">Connected</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cache-ttl">Cache TTL (seconds)</Label>
              <Input
                id="cache-ttl"
                type="number"
                value={settings.cacheTTL}
                onChange={(e) => handleInputChange('cacheTTL', parseInt(e.target.value) || 0)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="connection-pool">Connection Pool</Label>
              <Input
                id="connection-pool"
                type="number"
                value={settings.connectionPool}
                onChange={(e) => handleInputChange('connectionPool', parseInt(e.target.value) || 0)}
              />
            </div>
            <Button onClick={() => handleSaveSettings('database')} disabled={saveStatus === 'saving'}>
              {saveStatus === 'saving' ? 'Saving...' : <><Save className="h-4 w-4 mr-2" />Configure Database</>}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
