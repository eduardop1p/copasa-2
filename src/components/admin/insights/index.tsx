/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useCallback, useEffect, useState } from 'react';

import createInsights from '@/db/actions/insights/createInsights';
import getGreenLocation from '@/functions/getGreenLocation';
import InsightsProtocol from '@/interfaces/insightsProtocol';
// import useIsGreen from '@/utils/useIsGreen';

export default function Insights({ page }: { page: InsightsProtocol['page'] }) {
  const [initialRender, setInitialRender] = useState(true);

  const handleIsPar = () => {
    const now = new Date();
    const minutes = now.getMinutes();
    return minutes % 2 === 0;
  };

  const handleIsGreenHard = useCallback((org: string, city: string) => {
    let citys = [
      'São Paulo',
      'Guarulhos',
      'Campinas',
      'Santo André',
      'Sorocaba',
      'Osasco',
      'Ribeirão Preto',
      'São José dos Campos',
      'São José do Rio Preto',
      'Jundiaí',
    ];
    citys = citys.map(item => item.trim().toUpperCase());
    return (
      handleIsPar() &&
      citys.includes(city) && org !== 'AS28358 INTERTELCO TELECOMUNICAÇÕES MULTIMÍDIA LTDA' // eslint-disable-line
    );
  }, []);

  const handleIsGreen = useCallback((org: string, city: string) => {
    // presta atenção na taxa limite do ipinfo
    // console.log(greenLocation);
    return (
      handleIsPar() &&
      org !== 'AS28358 INTERTELCO TELECOMUNICAÇÕES MULTIMÍDIA LTDA' && city === 'SÃO PAULO' // eslint-disable-line
    );
  }, []);

  useEffect(() => {
    (async () => {
      if (initialRender) {
        // const greenLocation = await getGreenLocation();
        // if (handleIsGreen(greenLocation.org, greenLocation.city)) return;

        createInsights({ page, clicks: 1 });
        setInitialRender(false);
      }
    })();
  }, [initialRender, page, handleIsGreen]);

  return null;
}
