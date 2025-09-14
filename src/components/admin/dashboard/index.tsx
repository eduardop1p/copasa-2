'use client';

import { useState } from 'react';

import { KeyRound, User } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import HitsProtocol from '@/interfaces/hitsProtocol';
import InsightsProtocol from '@/interfaces/insightsProtocol';
import PaymentsProtocol from '@/interfaces/paymentsProtocol';
import PixProtocol from '@/interfaces/pixProtocol';
import { useLoadingContext } from '@/utils/loadingContext/useContext';

// import ApiStatus from './apiStatus';
import Hits from './hits';
import Loading from './loading';
import Overview from './overview';
import Payments from './payments';

interface Props extends PixProtocol {
  payments: PaymentsProtocol[];
  paymentsCopied: PaymentsProtocol[];
  paymentsOneWeekAgo: PaymentsProtocol[];
  insights: InsightsProtocol[];
  hits: HitsProtocol[];
}

export default function Dashboard({
  payments,
  paymentsCopied,
  paymentsOneWeekAgo,
  insights,
  hits,
  pixKey,
  pixName,
}: Props) {
  const { isLoading } = useLoadingContext();
  const [stHits, setStHits] = useState(hits);
  const [menuActive, setMenuActive] = useState({
    overview: true,
    payments: false,
    hits: false,
  });
  const [statePayments, setStatePayments] = useState(payments);
  const [statePaymentsCopied, setStatePaymentsCopied] =
    useState(paymentsCopied);
  const [statePaymentsOneWeekAgo, setStatePaymentsOneWeekAgo] =
    useState(paymentsOneWeekAgo);

  const handleClickMenu = (activeMenu: keyof typeof menuActive) => {
    setMenuActive({
      overview: activeMenu === 'overview',
      payments: activeMenu === 'payments',
      hits: activeMenu === 'hits',
    });
  };

  return (
    <>
      {isLoading && <Loading />}
      <div className='flex items-center gap-10 w-full  mb-4'>
        <div className='p-1 bg-muted rounded-lg overflow-hidden w-fit flex items-center gap-1'>
          <Button
            className={`${menuActive.overview ? 'bg-background hover:bg-background' : 'bg-muted opacity-50 hover:bg-background hover:opacity-100'} !cursor-pointer transition-all duration-200  font-medium h-fit text-sm py-1 px-3 text-foreground`}
            onClick={() => handleClickMenu('overview')}
          >
            Overview
          </Button>
          <Button
            className={`${menuActive.payments ? 'bg-background hover:bg-background' : 'bg-muted opacity-50 hover:bg-background hover:opacity-100'} !cursor-pointer transition-all duration-200  font-medium h-fit text-sm py-1 px-3 text-foreground`}
            onClick={() => handleClickMenu('payments')}
          >
            Pagamentos
          </Button>
          <Button
            className={`${menuActive.hits ? 'bg-background hover:bg-background' : 'bg-muted opacity-50 hover:bg-background hover:opacity-100'} !cursor-pointer transition-all duration-200  font-medium h-fit text-sm py-1 px-3 text-foreground`}
            onClick={() => handleClickMenu('hits')}
          >
            Acessos
          </Button>
        </div>
        <Card className='h-9 px-3 bg-muted rounded-lg flex items-center justify-between gap-2 w-[280px]'>
          <span className='text-foreground text-sm font-normal truncate'>
            {pixName}
          </span>
          <User size={16} className='!text-muted-foreground flex-none' />
        </Card>
        <Card className='h-9 px-3 bg-muted rounded-lg flex items-center justify-between gap-2 w-[280px]'>
          <span className='text-foreground text-sm font-normal truncate'>
            {pixKey}
          </span>
          <KeyRound size={16} className='!text-muted-foreground flex-none' />
        </Card>
        {/* <ApiStatus /> */}
      </div>
      <Overview
        className={`${menuActive.overview ? 'flex' : 'hidden'}`}
        statePayments={statePayments}
        statePaymentsCopied={statePaymentsCopied}
        statePaymentsOneWeekAgo={statePaymentsOneWeekAgo}
        insights={insights}
        setStatePayments={setStatePayments}
        setStatePaymentsCopied={setStatePaymentsCopied}
        setStatePaymentsOneWeekAgo={setStatePaymentsOneWeekAgo}
      />
      <Payments
        className={`${menuActive.payments ? 'flex' : 'hidden'}`}
        payments={statePayments}
      />
      <Hits
        className={`${menuActive.hits ? 'flex' : 'hidden'}`}
        stHits={stHits}
        setStHits={setStHits}
      />
    </>
  );
}
