'use client';

import { Dispatch, SetStateAction } from 'react';

import { DollarSign } from 'lucide-react';
import { Activity } from 'lucide-react';
import { Trash } from 'lucide-react';
import { FilterQuery } from 'mongoose';
import { twMerge } from 'tailwind-merge';

import { Card } from '@/components/ui/card';
import deletePayments from '@/db/actions/payments/deletePayments';
import { PaymentsDocumentProtocol } from '@/db/models/payments';
import { useToast } from '@/hooks/use-toast';
import InsightsProtocol from '@/interfaces/insightsProtocol';
import PaymentsProtocol from '@/interfaces/paymentsProtocol';
import formatDateMedium from '@/services/formatDateMedium';
import formatPrice from '@/services/formatPrice';
import getDataTheDay from '@/services/getDataTheDay';
import reduceArray from '@/services/reduceArray';
import { useLoadingContext } from '@/utils/loadingContext/useContext';

import BarChartCP from './barChart';
import Insights from './insights/insights';
import RecentPayments from './recentPayments';

interface Props {
  className?: string;
  statePayments: PaymentsProtocol[];
  statePaymentsCopied: PaymentsProtocol[];
  statePaymentsOneWeekAgo: PaymentsProtocol[];
  insights: InsightsProtocol[];
  setStatePayments: Dispatch<SetStateAction<PaymentsProtocol[]>>;
  setStatePaymentsCopied: Dispatch<SetStateAction<PaymentsProtocol[]>>;
  setStatePaymentsOneWeekAgo: Dispatch<SetStateAction<PaymentsProtocol[]>>;
}

export default function Overview({
  className,
  statePayments,
  statePaymentsCopied,
  statePaymentsOneWeekAgo,
  insights,
  setStatePayments,
  setStatePaymentsCopied,
  setStatePaymentsOneWeekAgo,
}: Props) {
  const { toast } = useToast();
  const { isLoading, setIsLoading } = useLoadingContext();

  // payments
  const totalPayments = reduceArray(statePayments);
  const paymentsTheDay = getDataTheDay(statePayments);
  const totalPaymentsTheDay = reduceArray(paymentsTheDay);

  // payments copied
  const totalPaymentsCopied = reduceArray(statePaymentsCopied);
  const paymentsCopiedTheDay = getDataTheDay(statePaymentsCopied);
  const totalPaymentsCopiedTheDay = reduceArray(paymentsCopiedTheDay);

  const handleDeletePayment = async (
    query: FilterQuery<PaymentsDocumentProtocol>,
    typePayment: 'all' | 'copied'
  ) => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      const res = await deletePayments({ query });
      if (!res) throw new Error('Error ocurred');
      switch (typePayment) {
        case 'all': {
          setStatePayments([]);
          setStatePaymentsCopied([]);
          setStatePaymentsOneWeekAgo([]);
          break;
        }
        case 'copied': {
          const newStatePayments = statePayments.filter(item => !item.copied);
          const newStatePaymentsOneWeekAgo = statePaymentsOneWeekAgo.filter(
            item => !item.copied
          );
          setStatePaymentsCopied([]);
          setStatePayments(newStatePayments);
          setStatePaymentsOneWeekAgo(newStatePaymentsOneWeekAgo);
          break;
        }
        default: {
          break;
        }
      }
      toast({
        title: 'Selecionado foi excluido com sucesso.',
        description: formatDateMedium(),
      });
    } catch {
      toast({
        title: 'Ocorreu um erro, tente novalmente.',
        description: formatDateMedium(),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={twMerge('flex flex-col gap-4', className)}>
      <div className='grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-4 mb-4'>
        <Card className='p-6 rounded-xl flex items-start justify-between'>
          <div className='flex flex-col'>
            <h2 className='text-sm font-medium h-fit text-foreground mb-2'>
              Total pagamentos gerados
            </h2>
            <h1 className='font-bold text-2xl text-foreground leading-[1.2] mb-1'>
              {statePayments.length}
            </h1>
            <p className='text-xs text-muted-foreground font-normal'>
              {paymentsTheDay.length ? '+' : ''}
              {paymentsTheDay.length} gerados hoje
            </p>
          </div>
          <div className='h-full flex flex-col justify-between'>
            <Activity size={16} className='!text-muted-foreground' />
            {statePayments.length > 0 && (
              <button
                type='button'
                title='Limpar'
                onClick={() => handleDeletePayment({}, 'all')}
              >
                <Trash
                  size={16}
                  className='!text-muted-foreground hover:!text-red-500 hover:scale-105 transition-all duration-200'
                />
              </button>
            )}
          </div>
        </Card>

        <Card className='p-6 rounded-xl flex items-start justify-between'>
          <div className='flex flex-col'>
            <h2 className='text-sm font-medium h-fit text-foreground mb-2'>
              Total QR copiados gerados
            </h2>
            <h1 className='font-bold text-2xl text-foreground leading-[1.2] mb-1'>
              {statePaymentsCopied.length}
            </h1>
            <p className='text-xs text-muted-foreground font-normal'>
              {paymentsCopiedTheDay.length ? '+' : ''}
              {paymentsCopiedTheDay.length} gerados hoje
            </p>
          </div>
          <div className='h-full flex flex-col justify-between'>
            <Activity size={16} className='!text-muted-foreground' />
            {statePaymentsCopied.length > 0 && (
              <button
                type='button'
                title='Limpar'
                onClick={() => handleDeletePayment({ copied: true }, 'copied')}
              >
                <Trash
                  size={16}
                  className='!text-muted-foreground hover:!text-red-500 hover:scale-105 transition-all duration-200'
                />
              </button>
            )}
          </div>
        </Card>

        <Card className='p-6 rounded-xl flex items-start justify-between'>
          <div className='flex flex-col'>
            <h2 className='text-sm font-medium h-fit text-foreground mb-2'>
              Total pagamentos
            </h2>
            <h1 className='font-bold text-2xl text-foreground leading-[1.2] mb-1'>
              {formatPrice(totalPayments)}
            </h1>
            <p className='text-xs text-muted-foreground font-normal'>
              {totalPaymentsTheDay ? '+' : ''}
              {formatPrice(totalPaymentsTheDay)} recebidos hoje
            </p>
          </div>
          <div className='h-full flex flex-col justify-between'>
            <DollarSign size={16} className='!text-muted-foreground' />
          </div>
        </Card>

        <Card className='p-6 rounded-xl flex items-start justify-between'>
          <div className='flex flex-col'>
            <h2 className='text-sm font-medium h-fit text-foreground mb-2'>
              Total pix copiados
            </h2>
            <h1 className='font-bold text-2xl text-foreground leading-[1.2] mb-1'>
              {formatPrice(totalPaymentsCopied)}
            </h1>
            <p className='text-xs text-muted-foreground font-normal'>
              {totalPaymentsCopiedTheDay ? '+' : ''}
              {formatPrice(totalPaymentsCopiedTheDay)} recebidos hoje
            </p>
          </div>
          <div className='h-full flex flex-col justify-between'>
            <DollarSign size={16} className='!text-muted-foreground' />
          </div>
        </Card>

        <Insights insights={insights} />
      </div>
      <div className='grid grid-cols-[800px_1fr] gap-4'>
        <BarChartCP paymentsOneWeekAgo={statePaymentsOneWeekAgo} />
        <RecentPayments payments={statePayments} />
      </div>
    </div>
  );
}
