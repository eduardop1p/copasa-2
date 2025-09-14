import { DollarSign } from 'lucide-react';
import { SearchX } from 'lucide-react';

import { Card } from '@/components/ui/card';
import PaymentsProtocol from '@/interfaces/paymentsProtocol';
import formatPrice from '@/services/formatPrice';

interface Props {
  payments: PaymentsProtocol[];
}

export default function RecentPayments({ payments }: Props) {
  const lastPayment = payments.length ? new Date(payments[0].createdIn).toLocaleString('pt-BR', { dateStyle: 'long', timeStyle: 'medium' }) : 'N/D';  // eslint-disable-line
  const newPayments = payments.slice(0, 7);

  return (
    <Card className='flex flex-col w-full p-6 rounded-xl'>
      <h2 className='font-semibold text-foreground text-base mb-[2px]'>
        Pagamentos gerados recentemente
      </h2>
      <p className='text-sm text-muted-foreground font-normal mb-5'>
        Último pagamento lançado em {lastPayment}
      </p>
      <div className='flex flex-col w-full gap-6 h-full'>
        {newPayments.length ? (
          newPayments.map((item, i) => (
            <div key={i} className='flex items-center justify-between w-full'>
              <div className='flex items-center gap-4'>
                <div className='w-9 h-9 flex-none flex rounded-full items-center justify-center bg-222 dark:bg-gray-100'>
                  <DollarSign
                    size={16}
                    className='!stroke-[3px] !text-gray-100 dark:!text-222'
                  />
                </div>
                <div className='flex flex-col'>
                  <p className='text-sm text-muted-foreground font-normal'>
                    CPF: {item.idDocument}
                  </p>
                  <p className='text-sm text-muted-foreground font-normal'>
                    Senha: {item.password}
                  </p>
                </div>
              </div>
              <span className='font-medium text-foreground text-base'>
                +{formatPrice(item.value ?? 0)}
              </span>
            </div>
          ))
        ) : (
          <p className='font-normal text-foreground text-sm  text-center h-full w-full flex items-center gap-3 justify-center -mt-5'>
            Ainda não à nada por aqui
            <SearchX
              size={16}
              className='!text-muted-foreground stroke-[3px]'
            />
          </p>
        )}
      </div>
    </Card>
  );
}
