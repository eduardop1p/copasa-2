export const dynamic = 'force-dynamic';

import { Metadata } from 'next';

import getPix from '@/actions/getPix';
import Dashboard from '@/components/admin/dashboard';
import CurrentDate from '@/components/admin/dashboard/currentDate';
import Header from '@/components/admin/dashboard/header';
import getHits from '@/db/actions/hits/getHits';
import getInsights from '@/db/actions/insights/getInsights';
import getPayments from '@/db/actions/payments/getPayments';
import PixProtocol from '@/interfaces/pixProtocol';

export const metadata: Metadata = {
  title: 'Painel Copasa',
};

export default async function Page() {
  const pixData: PixProtocol | null = await getPix();
  if (!pixData)
    return (
      <p className='text-foreground py-2 text-center font-normal text-sm'>
        Ocorreu um erro, por favor recarregue a página
      </p>
    );

  const payments = await getPayments({ query: {} });
  const paymentsCopied = await getPayments({ query: { copied: true } });
  const insights = await getInsights({ query: {} });
  const hits = await getHits({ query: {} });

  // let apiIsOnline = !!(await apiNfse({ idDocument: '55640193000137' }));

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const paymentsOneWeekAgo = await getPayments({
    query: {
      createdIn: {
        $gte: oneWeekAgo,
      },
    },
  });

  return (
    <>
      <Header />
      <main className='w-full px-6 pb-6 pt-[100px] min-h-screen'>
        <div className='h-full w-full flex flex-col overflow-hidden'>
          <div className='px-0 min-h-screen w-full flex flex-col'>
            <div className='w-full flex items-center justify-between mb-4'>
              <h1 className='text-3xl font-bold tracking-tight text-foreground'>
                Dashboard Copasa
              </h1>
              <CurrentDate />
            </div>
            <Dashboard
              payments={payments}
              paymentsCopied={paymentsCopied}
              paymentsOneWeekAgo={paymentsOneWeekAgo}
              insights={insights}
              hits={hits}
              {...pixData}
            />
          </div>
        </div>
      </main>
    </>
  );
}
