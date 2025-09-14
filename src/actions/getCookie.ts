'use server';

import { cookies } from 'next/headers';

export default async function getCookie(name: string) {
  const cookie = await cookies();
  const cookieValue = cookie.get(name)?.value;
  return cookieValue ?? '';
}
