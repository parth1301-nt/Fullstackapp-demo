import { cookies } from 'next/headers';
import { redis } from '@/lib/redis';

const SESSION_COOKIE_NAME = 'admin_session';
const SESSION_DURATION = 60 * 60 * 24 * 7; // 7 days in seconds

// Simple password-based authentication (for demo purposes)
// In production, use a proper auth solution like NextAuth.js, Clerk, or Auth0
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

export async function createSession(password: string): Promise<boolean> {
  if (password !== ADMIN_PASSWORD) {
    return false;
  }

  const sessionId = crypto.randomUUID();
  const cookieStore = await cookies();
  
  // Store session in Redis
  await redis.set(`session:${sessionId}`, 'authenticated', {
    ex: SESSION_DURATION
  });
  
  // Set cookie
  cookieStore.set(SESSION_COOKIE_NAME, sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION,
    path: '/'
  });
  
  return true;
}

export async function verifySession(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  
  if (!sessionId) {
    return false;
  }
  
  const session = await redis.get(`session:${sessionId}`);
  return session === 'authenticated';
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  
  if (sessionId) {
    await redis.del(`session:${sessionId}`);
  }
  
  cookieStore.delete(SESSION_COOKIE_NAME);
}
