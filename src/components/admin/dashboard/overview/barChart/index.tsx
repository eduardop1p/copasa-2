'use client';

import { upperFirst } from 'lodash';
import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import PaymentsProtocol from '@/interfaces/paymentsProtocol';
import formatPrice from '@/services/formatPrice';

interface Props {
  paymentsOneWeekAgo: PaymentsProtocol[];
}

function weekDays() {
  const now = new Date();

  const weekDates = [];

  for (let i = 6; i >= 0; i--) {
    const currentDate = new Date(now);
    currentDate.setDate(now.getDate() - i);

    let dayName = currentDate.toLocaleDateString('pt-BR', {
      weekday: 'long',
    });
    dayName = dayName.replace('-feira', '');
    const formattedDate = dayName.toLowerCase();

    weekDates.push(formattedDate);
  }
  return weekDates;
}

export default function BarChartCP({ paymentsOneWeekAgo }: Props) {
  // Cria um objeto para armazenar a soma dos pagamentos por dia da semana
  const arrWeekDays = weekDays();
  const paymentsByDay = arrWeekDays.map(item => ({
    day: item,
    amount: 0,
  }));

  // Itera sobre os pagamentos e distribui o valor de cada pagamento no respectivo dia da semana
  paymentsOneWeekAgo.forEach(payment => {
    const paymentDate = new Date(payment.createdIn);
    const dayNameOfWeek = paymentDate
      .toLocaleDateString('pt-BR', { weekday: 'long' })
      .replace('-feira', '') // Remove "-feira" (opcional)
      .toLowerCase(); // Converte para minúsculas

    const findIndexPaymentsByDay = paymentsByDay.findIndex(
      item => item.day === dayNameOfWeek
    );

    if (findIndexPaymentsByDay !== -1) {
      const currentAmount = paymentsByDay[findIndexPaymentsByDay].amount ?? 0;
      const paymentTotal = currentAmount + payment.value;
      paymentsByDay[findIndexPaymentsByDay].amount = paymentTotal;
    }
  });

  // Converte o objeto `paymentsByDay` para um array formatado para o gráfico
  const chartData = paymentsByDay.map((data, index) => ({
    day: upperFirst(arrWeekDays[index]),
    amount: +data.amount.toFixed(2),
  }));

  const chartConfig = {
    amount: {
      label: 'Valor',
      color: 'hsl(var(--chart-1))',
    },
  } satisfies ChartConfig;

  return (
    <Card className='rounded-xl'>
      <CardContent className='pt-6'>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData} margin={{ left: 40 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='day'
              tickLine={false}
              tickMargin={5}
              axisLine={false}
              tickFormatter={value => value.slice(0, 3)}
            />
            <YAxis
              dataKey='amount'
              type='number'
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={value => formatPrice(value)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey='amount' fill='var(--color-amount)' radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='flex-col items-start gap-2 text-sm'>
        <div className='flex gap-2 font-medium leading-none'>
          Não copia comédia {new Date().getFullYear()}
          <TrendingUp className='h-4 w-4' />
        </div>
        <div className='leading-none text-muted-foreground'>
          Pagamentos dos últimos 7 dias
        </div>
      </CardFooter>
    </Card>
  );
}
