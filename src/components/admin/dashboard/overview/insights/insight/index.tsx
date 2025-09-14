'use client';

import { Activity, Trash } from 'lucide-react';

import { Card } from '@/components/ui/card';
import InsightsProtocol from '@/interfaces/insightsProtocol';
import getDataTheDay from '@/services/getDataTheDay';

interface Props {
  page: InsightsProtocol['page'];
  handleDeleteInsights(insightsPage: InsightsProtocol['page']): Promise<void>;
  stateInsights: InsightsProtocol[];
}

export default function Insight({
  page,
  handleDeleteInsights,
  stateInsights,
}: Props) {
  stateInsights = stateInsights.filter(item => item.page === page);
  const totalInsights = stateInsights.length;
  const insightsTheDay = getDataTheDay(stateInsights);
  const totalInsightsTheDay = insightsTheDay.length;

  return (
    <Card className='p-6 rounded-xl flex items-start justify-between'>
      <div className='flex flex-col'>
        <h2 className='text-sm font-medium h-fit text-foreground mb-2'>
          Clicks página {page}
        </h2>
        <h1 className='font-bold text-2xl text-foreground leading-[1.2] mb-1'>
          {totalInsights}
        </h1>
        <p className='text-xs text-muted-foreground font-normal'>
          {totalInsightsTheDay ? '+' : ''}
          {totalInsightsTheDay} cliks hoje
        </p>
      </div>
      <div className='h-full flex flex-col justify-between'>
        <Activity size={16} className='!text-muted-foreground' />
        {stateInsights.length > 0 && (
          <button
            type='button'
            title='Limpar'
            onClick={() => handleDeleteInsights(page)}
          >
            <Trash
              size={16}
              className='!text-muted-foreground hover:!text-red-500 hover:scale-105 transition-all duration-200'
            />
          </button>
        )}
      </div>
    </Card>
  );
}
