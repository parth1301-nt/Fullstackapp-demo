'use server';

import { redis } from '@/lib/redis';
import { isValidIcon } from '@/lib/subdomains';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { rootDomain, protocol } from '@/lib/utils';

export async function createSubdomainAction(
  prevState: any,
  formData: FormData
) {
  const subdomain = formData.get('subdomain') as string;
  const icon = formData.get('icon') as string;

  if (!subdomain || !icon) {
    return { success: false, error: 'Subdomain and icon are required' };
  }

  if (!isValidIcon(icon)) {
    return {
      subdomain,
      icon,
      success: false,
      error: 'Please enter a valid emoji (maximum 10 characters)'
    };
  }

  const sanitizedSubdomain = subdomain.toLowerCase().replace(/[^a-z0-9-]/g, '');

  if (sanitizedSubdomain !== subdomain) {
    return {
      subdomain,
      icon,
      success: false,
      error:
        'Subdomain can only have lowercase letters, numbers, and hyphens. Please try again.'
    };
  }

  try {
    const subdomainAlreadyExists = await redis.get(
      `subdomain:${sanitizedSubdomain}`
    );
    if (subdomainAlreadyExists) {
      return {
        subdomain,
        icon,
        success: false,
        error: 'This subdomain is already taken'
      };
    }

    await redis.set(`subdomain:${sanitizedSubdomain}`, {
      emoji: icon,
      createdAt: Date.now()
    });

    redirect(`${protocol}://${sanitizedSubdomain}.${rootDomain}`);
  } catch (error) {
    console.error('Redis error during subdomain creation:', error);
    return {
      subdomain,
      icon,
      success: false,
      error: 'Failed to create subdomain. Please check your Redis configuration and try again.'
    };
  }
}

export async function deleteSubdomainAction(
  prevState: any,
  formData: FormData
) {
  const subdomain = formData.get('subdomain');
  try {
    await redis.del(`subdomain:${subdomain}`);
    revalidatePath('/admin');
    return { success: true, message: 'Domain deleted successfully' };
  } catch (error) {
    console.error('Redis error during subdomain deletion:', error);
    return { success: false, error: 'Failed to delete subdomain. Please check your Redis configuration and try again.' };
  }
}
