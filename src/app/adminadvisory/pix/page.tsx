export const dynamic = 'force-dynamic';

import { Metadata } from 'next';

import getPix from '@/actions/getPix';
import Header from '@/components/admin/dashboard/header';
import FormPix from '@/components/admin/pix/formPix';
import PixProtocol from '@/interfaces/pixProtocol';

export const metadata: Metadata = {
  title: 'Editar pix',
};

export default async function Page() {
  const pixtData: PixProtocol | null = await getPix();
  if (!pixtData)
    return (
      <p className='text-foreground py-2 text-center font-normal text-sm'>
        Ocorreu um erro, por favor recarregue a página
      </p>
    );

  return (
    <>
      <Header />
      <main className='w-full h-full min-h-screen flex items-center justify-center px-6 pb-6 pt-[102px]'>
        <FormPix {...pixtData} />
      </main>
    </>
  );
}
