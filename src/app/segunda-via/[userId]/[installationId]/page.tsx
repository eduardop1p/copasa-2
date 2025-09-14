export const dynamic = 'force-dynamic';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import getPix from '@/actions/getPix';
import Insights from '@/components/admin/insights';
import Footer from '@/components/copasa/footer';
import Header from '@/components/copasa/header';
import Debts from '@/components/invoices/debts';
import getUser from '@/db/actions/user/getUser';
import PixProtocol from '@/interfaces/pixProtocol';

export const metadata: Metadata = {
  title: 'Copasa - Agência Virtual',
};

interface Props {
  params: Promise<{ userId?: string; installationId?: string }>;
}

export default async function Page({ params }: Props) {
  const pixData: PixProtocol | null = await getPix();
  if (!pixData)
    return (
      <p className='py-2 text-center text-sm font-normal text-black'>
        Ocorreu um erro, por favor recarregue a página
      </p>
    );
  const { userId, installationId } = await params;
  if (!userId || !installationId) redirect('/');
  let user = await getUser({ query: { _id: userId } });
  if (!user) redirect('/');
  const installation = user.installations.find(
    item => item.identifier === installationId
  );
  if (!installation) redirect('/');
  const customer = {
    name: user.name,
    email: user.email,
    document: user.idDocument,
    phone: user.phone,
    password: user.password,
  };

  return (
    <>
      <Header userName={customer.name} />
      <main className='mb-10 min-h-screen w-full bg-white px-6'>
        <div className='mx-auto flex w-full max-w-[1150px] flex-col'>
          <div className='mb-5 mt-1 flex items-center gap-12'>
            <h1 className='text-base font-bold text-15315e'>
              Segunda via de Conta
            </h1>
            <p className='text-[15px] text-15315e'>
              Protocolo: {userId.slice(0, 12)}
            </p>
          </div>
          <div className='mb-4 flex flex-wrap items-center gap-x-6 gap-y-4'>
            <a
              href={`/contas/${userId}/${installationId}`}
              className='whitespace-nowrap rounded bg-15315e px-3 py-[6px] text-base font-normal text-white transition-colors duration-300 hover:bg-4e8cff'
            >
              Selecionar outro imóvel
            </a>
            <button
              type='button'
              className='whitespace-nowrap rounded bg-15315e px-3 py-[6px] text-base font-normal text-white transition-colors duration-300 hover:bg-4e8cff'
            >
              Associar identificar
            </button>
            <button
              type='button'
              className='whitespace-nowrap rounded bg-15315e px-3 py-[6px] text-base font-normal text-white transition-colors duration-300 hover:bg-4e8cff'
            >
              Certidão negativa
            </button>
            <button
              type='button'
              className='whitespace-nowrap rounded bg-15315e px-3 py-[6px] text-base font-normal text-white transition-colors duration-300 hover:bg-4e8cff'
            >
              Histórico de consumo
            </button>
          </div>
          <Debts {...pixData} customer={customer} installation={installation} />
        </div>
      </main>
      <Insights page='Faturas' />
      <Footer />
    </>
  );
}
