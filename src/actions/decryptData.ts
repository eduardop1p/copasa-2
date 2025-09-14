'use server';

import jwt from 'jsonwebtoken';

export default async function decryptData(code: string): Promise<any> {
  try {
    const decoded: any = jwt.verify(code, process.env.SECRET as string);
    return decoded;
  } catch {
    return null;
  }
}
