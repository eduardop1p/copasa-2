'use client';

import { useEffect, useState } from 'react';

import { CalendarRange } from 'lucide-react';

import { Card } from '@/components/ui/card';
import formatDateMedium from '@/services/formatDateMedium';

export default function CurrentDate() {
  const [date, setDate] = useState(formatDateMedium());

  useEffect(() => {
    const timeId = setInterval(() => {
      setDate(formatDateMedium());
    }, 1000);

    return () => {
      clearInterval(timeId);
    };
  }, []);

  return (
    <Card className='h-fit rounded-md py-2 px-4 flex  items-center gap-3'>
      <CalendarRange size={16} />
      <span
        className='text-sm font-medium text-foreground'
        suppressHydrationWarning
      >
        {date}
      </span>
    </Card>
  );
}
