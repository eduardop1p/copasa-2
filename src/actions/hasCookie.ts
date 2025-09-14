'use server';

import { cookies } from 'next/headers';

export default async function hasCookie(name: string) {
  const cookie = await cookies();
  return cookie.has(name);
}
