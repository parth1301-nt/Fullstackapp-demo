import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Shield, Eye, Lock, Database } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn how we protect your data and privacy'
};

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Shield className="size-6" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
            </div>
            <p className="text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="prose prose-gray max-w-none dark:prose-invert">
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                We value your privacy and are committed to protecting your personal data. 
                This privacy policy explains how we collect, use, and safeguard your information 
                when you use our multi-tenant subdomain platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Database className="size-5" />
                Information We Collect
              </h2>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  <strong>Subdomain Information:</strong> When you create a subdomain, we store:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Your chosen subdomain name</li>
                  <li>Your selected emoji icon</li>
                  <li>Optional bio, website, and social media links</li>
                  <li>Creation and update timestamps</li>
                </ul>
                <p>
                  <strong>Session Data:</strong> For admin access, we store encrypted session tokens.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Eye className="size-5" />
                How We Use Your Information
              </h2>
              <div className="space-y-3 text-muted-foreground">
                <ul className="list-disc pl-6 space-y-1">
                  <li>To provide and maintain your subdomain service</li>
                  <li>To display your custom subdomain page to visitors</li>
                  <li>To authenticate admin access to the dashboard</li>
                  <li>To analyze platform usage and improve our services</li>
                  <li>To detect and prevent technical issues</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Lock className="size-5" />
                Data Security
              </h2>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  We implement appropriate security measures to protect your data:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>All data is stored securely in Redis with encryption</li>
                  <li>Session tokens are HTTP-only and secure</li>
                  <li>Admin access requires authentication</li>
                  <li>Regular security updates and monitoring</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Data Retention</h2>
              <p className="text-muted-foreground leading-relaxed">
                We retain your subdomain data for as long as your subdomain exists. 
                You can request deletion of your subdomain at any time through the admin dashboard. 
                Session data is automatically deleted after 7 days of inactivity.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Third-Party Services</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use the following third-party services:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground mt-3">
                <li><strong>Redis (via Upstash):</strong> For data storage and caching</li>
                <li><strong>Vercel Analytics:</strong> For anonymous usage analytics</li>
                <li><strong>Vercel Speed Insights:</strong> For performance monitoring</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground mt-3">
                <li>Access your subdomain data</li>
                <li>Modify your subdomain information</li>
                <li>Delete your subdomain and associated data</li>
                <li>Request information about data processing</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about this privacy policy or our data practices, 
                please contact us through the platform or visit our contact page.
              </p>
            </section>

            <section className="rounded-lg border border-border bg-muted/30 p-6">
              <p className="text-sm text-muted-foreground">
                <strong>Note:</strong> This is a demo privacy policy. For production use, 
                consult with legal professionals to ensure compliance with applicable laws 
                such as GDPR, CCPA, and other privacy regulations.
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <SiteFooter />
    </div>
  );
}
