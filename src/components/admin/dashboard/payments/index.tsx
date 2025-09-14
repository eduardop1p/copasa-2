import { twMerge } from 'tailwind-merge';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import PaymentsProtocol from '@/interfaces/paymentsProtocol';
import formatPrice from '@/services/formatPrice';

interface Props {
  className?: string;
  payments: PaymentsProtocol[];
}

export default function Payments({ className, payments }: Props) {
  const handleFormatDate = (date: Date | string) => {
    return new Date(date).toLocaleString('pt-BR', {
      dateStyle: 'long',
      timeStyle: 'medium',
    });
  };

  return (
    <div className={twMerge('w-full flex flex-col gap-4', className)}>
      <div className='w-full overflow-auto'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Valor</TableHead>
              <TableHead>CPF</TableHead>
              <TableHead>Senha</TableHead>
              <TableHead>Localização</TableHead>
              <TableHead>Horário</TableHead>
              <TableHead>Copiado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((item, i) => (
              <TableRow key={i}>
                <TableCell>{formatPrice(item.value)}</TableCell>
                <TableCell className='whitespace-nowrap'>
                  {item.idDocument || '-'}
                </TableCell>
                <TableCell className='whitespace-nowrap'>
                  {item.password || '-'}
                </TableCell>
                <TableCell className='uppercase whitespace-nowrap'>
                  {item.location}
                </TableCell>
                <TableCell className='whitespace-nowrap'>
                  {item.createdIn ? handleFormatDate(item.createdIn) : '-'} {/* eslint-disable-line */}
                </TableCell>
                <TableCell
                  className={`${item.copied ? '!text-green-500' : '!text-red-500'}`}
                >
                  {item.copied ? 'Sim' : 'Não'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <h2 className='text-center text-sm text-5e5e5e'>
        Uma lista de todos os pagamentos gerados na base de dados.
      </h2>
    </div>
  );
}
