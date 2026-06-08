import Link from 'next/link';
import { Globe, LayoutDashboard, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { rootDomain } from '@/lib/utils';

const navLinks = [
  { href: '#features', label: 'Features' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#create', label: 'Get started' }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-border/60 bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
      <div className="border-b border-border/40 bg-muted/40">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 px-4 py-2 text-center text-xs text-muted-foreground sm:text-sm">
          <Sparkles className="size-3.5 shrink-0 text-chart-4" aria-hidden />
          <span>
            Claim your subdomain with a custom emoji — free and instant.
          </span>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-3 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm motion-safe:transition-transform motion-safe:duration-200 group-hover:scale-105 motion-reduce:group-hover:scale-100">
            <Globe className="size-5" aria-hidden />
          </div>
          <div className="min-w-0 text-left leading-tight">
            <span className="block truncate font-semibold tracking-tight text-foreground">
              {rootDomain}
            </span>
            <span className="hidden text-xs text-muted-foreground sm:block">
              Platforms Starter Kit
            </span>
          </div>
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-1 md:flex"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground motion-safe:transition-colors motion-safe:duration-200 hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex" asChild>
            <Link href="#create">Create</Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin">
              <LayoutDashboard className="size-4" aria-hidden />
              <span className="hidden sm:inline">Admin</span>
              <span className="sm:hidden">Admin</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
