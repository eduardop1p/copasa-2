export const dynamic = 'force-dynamic';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import Insights from '@/components/admin/insights';
import Footer from '@/components/copasa/footer';
import Header from '@/components/copasa/header';
import Invoices from '@/components/invoices';
import getUser from '@/db/actions/user/getUser';

export const metadata: Metadata = {
  title: 'Copasa - Agência Virtual',
};

interface Props {
  params: Promise<{ userId?: string; installationId?: string }>;
}

export default async function Page({ params }: Props) {
  const { userId, installationId } = await params;
  if (!userId || !installationId) redirect('/');
  let user = await getUser({ query: { _id: userId } });
  if (!user) redirect('/');
  const customer = {
    name: user.name,
    email: user.email,
    document: user.idDocument,
    phone: user.phone,
  };

  return (
    <>
      <Header userName={customer.name} />
      <main className='mb-10 min-h-screen w-full bg-white px-6'>
        <div className='mx-auto flex w-full max-w-[1150px] flex-col'>
          <p className='mb-10 w-fit border-x border-solid border-x-dee2e6 px-6 py-2 text-base font-normal text-495057'>
            Consulta por <br /> identificador
          </p>
          <div className='mb-[26px] flex w-full flex-wrap items-center justify-between gap-4'>
            <h2 className='text-base font-bold text-15315e'>
              Lista de Identificadores
            </h2>
            <p className='text-base font-normal text-15315e'>
              Protocolo: {userId.slice(0, 12)}
            </p>
            <p className='text-base font-normal text-15315e'>
              Associar Identificador
            </p>
            <p className='text-base font-normal text-15315e'>
              Matrícula centralizadora
            </p>
          </div>
          <Invoices
            installationId={installationId}
            installations={user.installations}
            userId={userId}
          />
        </div>
      </main>
      <Insights page='Instalações' />
      <Footer />
    </>
  );
}
