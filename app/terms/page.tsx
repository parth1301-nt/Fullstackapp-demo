import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { FileText, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms and conditions for using our platform'
};

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FileText className="size-6" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight">Terms of Service</h1>
            </div>
            <p className="text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="prose prose-gray max-w-none dark:prose-invert">
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Agreement to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing or using our multi-tenant subdomain platform, you agree to be bound 
                by these Terms of Service. If you do not agree to these terms, please do not use 
                our service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <CheckCircle className="size-5 text-green-600" />
                Acceptable Use
              </h2>
              <div className="space-y-3 text-muted-foreground">
                <p>You agree to use the platform for lawful purposes only. You may:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Create personal subdomains for legitimate purposes</li>
                  <li>Customize your subdomain with appropriate content</li>
                  <li>Share your subdomain with others</li>
                  <li>Use the platform for demos, portfolios, and projects</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <XCircle className="size-5 text-red-600" />
                Prohibited Activities
              </h2>
              <div className="space-y-3 text-muted-foreground">
                <p>You agree NOT to:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Use subdomains for illegal or harmful activities</li>
                  <li>Post offensive, inappropriate, or malicious content</li>
                  <li>Attempt to gain unauthorized access to the platform</li>
                  <li>Spam or harass other users</li>
                  <li>Violate any applicable laws or regulations</li>
                  <li>Impersonate others or misrepresent your identity</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Subdomain Ownership</h2>
              <div className="space-y-3 text-muted-foreground">
                <ul className="list-disc pl-6 space-y-1">
                  <li>Subdomains are available on a first-come, first-served basis</li>
                  <li>You do not own the subdomain name itself</li>
                  <li>We reserve the right to reclaim subdomains that violate these terms</li>
                  <li>Inactive subdomains may be removed after extended periods</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Content Responsibility</h2>
              <p className="text-muted-foreground leading-relaxed">
                You are solely responsible for all content you post on your subdomain. 
                We do not pre-screen or monitor user content, but we reserve the right 
                to remove content that violates these terms or is otherwise harmful.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <AlertCircle className="size-5 text-yellow-600" />
                Service Availability
              </h2>
              <div className="space-y-3 text-muted-foreground">
                <p>We strive to maintain high availability but do not guarantee:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Uninterrupted or error-free service</li>
                  <li>That defects will be corrected</li>
                  <li>The platform will be free of viruses or harmful components</li>
                  <li>Specific uptime or performance metrics</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                To the maximum extent permitted by law, we shall not be liable for any indirect, 
                incidental, special, consequential, or punitive damages arising from your use 
                of the platform. Our total liability shall not exceed the amount you paid, if any, 
                for the service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Termination</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to suspend or terminate your access to the platform at any 
                time, with or without cause, with or without notice. Upon termination, your right 
                to use the service will immediately cease.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may modify these terms at any time. Continued use of the platform after changes 
                constitutes acceptance of the new terms. We will notify users of significant changes 
                through the platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These terms shall be governed by and construed in accordance with applicable laws. 
                Any disputes arising under these terms shall be subject to the exclusive jurisdiction 
                of the courts in the applicable jurisdiction.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have questions about these Terms of Service, please contact us through 
                the platform or visit our contact page.
              </p>
            </section>

            <section className="rounded-lg border border-border bg-muted/30 p-6">
              <p className="text-sm text-muted-foreground">
                <strong>Note:</strong> This is a demo terms of service. For production use, 
                consult with legal professionals to ensure compliance with applicable laws 
                and regulations in your jurisdiction.
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <SiteFooter />
    </div>
  );
}
