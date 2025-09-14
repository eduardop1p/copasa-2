'use client';

import { useState } from 'react';

import deleteInsights from '@/db/actions/insights/deleteInsights';
import { useToast } from '@/hooks/use-toast';
import InsightsProtocol from '@/interfaces/insightsProtocol';
import formatDateMedium from '@/services/formatDateMedium';
import insightsPages from '@/services/insightsPages';
import { useLoadingContext } from '@/utils/loadingContext/useContext';

import Insight from './insight';

interface Props {
  insights: InsightsProtocol[];
}

export default function Insights({ insights }: Props) {
  const { isLoading, setIsLoading } = useLoadingContext();
  const { toast } = useToast();
  const [stateInsights, setStateInsights] = useState(insights);

  const handleDeleteInsights = async (
    insightsPage: InsightsProtocol['page']
  ) => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      const res = await deleteInsights({ query: { page: insightsPage } });
      if (!res) throw new Error('Error ocurred');
      const newInsights = stateInsights.filter(
        item => item.page !== insightsPage
      );
      setStateInsights(newInsights);
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

  return insightsPages.map((item, i) => (
    <Insight
      key={i}
      page={item}
      handleDeleteInsights={handleDeleteInsights}
      stateInsights={stateInsights}
    />
  ));
}
