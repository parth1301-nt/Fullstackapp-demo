import { redirect } from 'next/navigation';
import { getSubdomainData } from '@/lib/subdomains';
import { protocol, rootDomain } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { EmojiPicker } from '@/components/ui/emoji-picker';
import { ArrowLeft, Save, Globe } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export async function generateMetadata({
  params
}: {
  params: Promise<{ subdomain: string }>;
}): Promise<Metadata> {
  const { subdomain } = await params;
  return {
    title: `Edit ${subdomain}.${rootDomain}`,
    description: `Customize your subdomain page`
  };
}

export default async function EditSubdomainPage({
  params
}: {
  params: Promise<{ subdomain: string }>;
}) {
  const { subdomain } = await params;
  const subdomainData = await getSubdomainData(subdomain);

  if (!subdomainData) {
    redirect('/');
  }

  async function updateSubdomainAction(formData: FormData) {
    'use server';
    
    const { redis } = await import('@/lib/redis');
    const emoji = formData.get('emoji') as string;
    const bio = formData.get('bio') as string;
    const website = formData.get('website') as string;
    const twitter = formData.get('twitter') as string;
    const github = formData.get('github') as string;

    const currentData = await getSubdomainData(subdomain);
    if (!currentData) {
      redirect('/');
    }

    const updatedData = {
      emoji: emoji || currentData.emoji,
      bio: bio || '',
      website: website || '',
      twitter: twitter || '',
      github: github || '',
      createdAt: currentData.createdAt,
      updatedAt: Date.now()
    };

    await redis.set(`subdomain:${subdomain}`, updatedData);
    redirect(`${protocol}://${subdomain}.${rootDomain}`);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <Link
          href={`${protocol}://${subdomain}.${rootDomain}`}
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors mb-6"
        >
          <ArrowLeft className="size-4" />
          Back to {subdomain}.{rootDomain}
        </Link>

        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Globe className="size-5" />
              </div>
              <div>
                <CardTitle className="text-2xl">
                  Edit {subdomain}.{rootDomain}
                </CardTitle>
                <CardDescription>
                  Customize your subdomain page
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form action={updateSubdomainAction} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="emoji">Emoji Icon</Label>
                <Input
                  id="emoji"
                  name="emoji"
                  type="text"
                  defaultValue={subdomainData.emoji}
                  placeholder="🚀"
                  className="h-11 text-center text-2xl"
                  maxLength={10}
                />
                <p className="text-xs text-muted-foreground">
                  Enter an emoji that represents your space
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Input
                  id="bio"
                  name="bio"
                  type="text"
                  defaultValue={(subdomainData as any).bio || ''}
                  placeholder="Tell visitors about yourself or your project"
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website URL</Label>
                <Input
                  id="website"
                  name="website"
                  type="url"
                  defaultValue={(subdomainData as any).website || ''}
                  placeholder="https://yourwebsite.com"
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter/X Username</Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                    @
                  </span>
                  <Input
                    id="twitter"
                    name="twitter"
                    type="text"
                    defaultValue={(subdomainData as any).twitter || ''}
                    placeholder="username"
                    className="rounded-l-none h-11"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="github">GitHub Username</Label>
                <Input
                  id="github"
                  name="github"
                  type="text"
                  defaultValue={(subdomainData as any).github || ''}
                  placeholder="username"
                  className="h-11"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1 h-11" size="lg">
                  <Save className="mr-2 size-4" />
                  Save Changes
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="h-11"
                  asChild
                >
                  <Link href={`${protocol}://${subdomain}.${rootDomain}`}>
                    Cancel
                  </Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
