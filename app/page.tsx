import Link from 'next/link';
import {
  Globe,
  Sparkles,
  Shield,
  Zap,
  ArrowRight,
  LayoutDashboard
} from 'lucide-react';
import { SubdomainForm } from './subdomain-form';
import { rootDomain } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

const features = [
  {
    icon: Globe,
    title: 'Custom Subdomains',
    description:
      'Claim a unique subdomain on this platform and make it yours in seconds.'
  },
  {
    icon: Sparkles,
    title: 'Emoji Identity',
    description:
      'Pick an emoji that represents your space — a simple, personal touch for every tenant.'
  },
  {
    icon: Zap,
    title: 'Instant Setup',
    description:
      'No complex configuration. Enter a name, choose an icon, and your page goes live.'
  },
  {
    icon: Shield,
    title: 'Multi-Tenant Ready',
    description:
      'Built on Next.js with isolated subdomains, ready to scale as your project grows.'
  }
];

const steps = [
  {
    step: '01',
    title: 'Choose a name',
    description: 'Pick a short, memorable subdomain that reflects your brand or idea.'
  },
  {
    step: '02',
    title: 'Select an emoji',
    description: 'Add a visual identity that appears on your personalized landing page.'
  },
  {
    step: '03',
    title: 'Go live',
    description: `Visit your-subdomain.${rootDomain} and share it with the world.`
  }
];

export default async function HomePage() {
  return (
    <div className="relative min-h-screen bg-background">
      {/* Background decoration */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-1/3 -left-32 h-[400px] w-[400px] rounded-full bg-chart-2/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-[300px] w-[300px] rounded-full bg-chart-4/10 blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-border/60 bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Globe className="size-4" />
            </div>
            <span className="font-semibold tracking-tight">{rootDomain}</span>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin">
              <LayoutDashboard className="size-4" />
              Admin
            </Link>
          </Button>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        {/* Hero */}
        <section className="mb-16 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground">
            <Sparkles className="size-3.5 text-chart-4" />
            Multi-tenant subdomain platform
          </div>
          <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Launch your own space on{' '}
            <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
              {rootDomain}
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Create a personalized subdomain with a custom emoji in one click.
            Perfect for demos, portfolios, side projects, and multi-tenant SaaS
            experiments.
          </p>
        </section>

        {/* Main content grid */}
        <div className="grid gap-10 lg:grid-cols-[1fr_400px] lg:gap-12">
          {/* Left column — info */}
          <div className="space-y-10">
            {/* Features */}
            <section>
              <h2 className="mb-6 text-2xl font-semibold tracking-tight">
                Why use this platform?
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {features.map((feature) => (
                  <Card
                    key={feature.title}
                    className="border-border/80 transition-shadow hover:shadow-md"
                  >
                    <CardHeader className="pb-2">
                      <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <feature.icon className="size-5" />
                      </div>
                      <CardTitle className="text-base">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription className="text-sm leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* How it works */}
            <section>
              <h2 className="mb-6 text-2xl font-semibold tracking-tight">
                How it works
              </h2>
              <div className="space-y-4">
                {steps.map((item) => (
                  <div
                    key={item.step}
                    className="flex gap-4 rounded-xl border border-border/80 bg-card p-5 transition-colors hover:bg-muted/30"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted font-mono text-sm font-semibold text-muted-foreground">
                      {item.step}
                    </span>
                    <div>
                      <h3 className="font-medium text-foreground">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right column — form */}
          <aside className="lg:sticky lg:top-8 lg:self-start">
            <Card className="border-border shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Create your subdomain</CardTitle>
                <CardDescription>
                  Fill in the details below to claim your unique address on{' '}
                  {rootDomain}.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SubdomainForm />
              </CardContent>
            </Card>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              Subdomains are available on a first-come, first-served basis.
            </p>
          </aside>
        </div>

        {/* Footer CTA */}
        <section className="mt-20 rounded-2xl border border-border bg-muted/40 p-8 text-center sm:p-12">
          <h2 className="text-2xl font-semibold tracking-tight">
            Ready to explore?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
            Create a subdomain above or browse existing tenants from the admin
            dashboard.
          </p>
          <Button className="mt-6" asChild>
            <Link href="/admin">
              Open admin dashboard
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </section>
      </main>

      <footer className="relative z-10 border-t border-border/60 py-8 text-center text-sm text-muted-foreground">
        <p>
          Built with Next.js · Platforms Starter Kit ·{' '}
          <span className="font-medium text-foreground">{rootDomain}</span>
        </p>
      </footer>
    </div>
  );
}
