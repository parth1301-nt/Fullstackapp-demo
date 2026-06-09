import { destroySession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export async function POST() {
  await destroySession();
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  redirect('/login');
}
