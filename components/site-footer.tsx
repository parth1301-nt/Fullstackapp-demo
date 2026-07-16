import Link from 'next/link';
import { Globe, Github, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { rootDomain, protocol } from '@/lib/utils';

// teest commanets
// teest commanets
// teest commanets
// teest commanets
// teest commanets
// teest commanets



const footerLinks = {
  product: [
    { href: '#features', label: 'Features' },
    { href: '#how-it-works', label: 'How it works' },
    { href: '#create', label: 'Create subdomain' }
  ],
  platform: [
    { href: '/admin', label: 'Admin dashboard' },
    { href: '/admin/analytics', label: 'Analytics' },
    { href: `${protocol}://${rootDomain}`, label: 'Home' }
  ],
  legal: [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' }
  ]
};

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-3 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                <Globe className="size-5" aria-hidden />
              </div>
              <div>
                <p className="font-semibold tracking-tight text-foreground">
                  {rootDomain}
                </p>
                <p className="text-sm text-muted-foreground">
                  Multi-tenant subdomain platform
                </p>
              </div>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Build and launch personalized subdomains with emoji branding.
              Powered by Next.js, designed for demos and scalable SaaS
              experiments.
            </p>
            <Button variant="outline" size="sm" className="mt-6" asChild>
              <a
                href="https://github.com/parth1301-nt"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="size-4" aria-hidden />
                View on GitHub
                <ArrowUpRight className="size-3.5 opacity-60" aria-hidden />
              </a>
            </Button>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-tight text-foreground">
              Product
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground motion-safe:transition-colors motion-safe:duration-200 hover:text-foreground focus-visible:outline-none focus-visible:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-tight text-foreground">
              Platform
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground motion-safe:transition-colors motion-safe:duration-200 hover:text-foreground focus-visible:outline-none focus-visible:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-tight text-foreground">
              Legal
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground motion-safe:transition-colors motion-safe:duration-200 hover:text-foreground focus-visible:outline-none focus-visible:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-center text-sm text-muted-foreground sm:text-left">
            © {year} Platforms Starter Kit · Built with Next.js
          </p>
          <p className="text-center text-sm text-muted-foreground sm:text-right">
            Running on{' '}
            <span className="font-medium text-foreground">{rootDomain}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
