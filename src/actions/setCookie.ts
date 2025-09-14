'use server';

import { cookies } from 'next/headers';

export default async function setCookie(name: string, data: string) {
  const cookieStore = await cookies();
  cookieStore.set({
    name,
    value: data,
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 5, // 5 dias
    secure: true,
    sameSite: 'lax',
    priority: 'high',
    path: '/',
  });
}
