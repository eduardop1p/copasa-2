'use server';

import connectDb from '@/db/connect';
import screenModel from '@/db/models/screens';
import PixProtocol from '@/interfaces/pixProtocol';

export default async function getPix(): Promise<PixProtocol | null> {
  try {
    await connectDb();
    const data = await screenModel
      .findById(process.env.SCREEN_ID)
      .select(['pixKey', 'pixName']);
    if (!data) return null;
    const newData: PixProtocol = { pixKey: data.pixKey, pixName: data.pixName };
    return newData;
  } catch (err) {
    console.log(err);
    return null;
  }
}
