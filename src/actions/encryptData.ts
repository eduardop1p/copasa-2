'use server';

import jwt from 'jsonwebtoken';

export default async function encryptData(data: any) {
  const encrypted = jwt.sign(data, process.env.SECRET as string);
  return encrypted;
}
