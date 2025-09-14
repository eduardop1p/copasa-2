'use client';

import { useEffect, useState } from 'react';

import encryptData from '@/actions/encryptData';

type ApiStatusType = 'Verificando' | 'Online' | 'Offline';

export default function ApiStatus() {
  const [apiStatus, setApiStatus] = useState<ApiStatusType>('Verificando');

  useEffect(() => {
    (async () => {
      const body = { renavam: '00971502188' };
      const authorization = await encryptData(body);
      const apiIsOnline =
        (
          await fetch('/api/queryscrape2', {
            method: 'post',
            body: JSON.stringify(body),
            headers: {
              'Content-Type': 'application/json',
              Authorization: authorization,
            },
          })
        ).status === 200;
      setApiStatus(apiIsOnline ? 'Online' : 'Offline');
    })();
  }, []);

  return (
    <div className='flex items-center gap-2'>
      {apiStatus === 'Verificando' ? (
        <span className='text-foreground text-sm font-medium uppercase'>
          Status da API:{' '}
          <span className='text-muted-foreground ml-2'>{apiStatus}</span>
        </span>
      ) : (
        <span className='text-foreground text-sm font-medium uppercase'>
          Status da API: <span className='ml-2'>{apiStatus}</span>
        </span>
      )}
      {apiStatus === 'Verificando' && (
        <div
          title={apiStatus}
          className='bg-gray-400 w-4 h-4 rounded-full animate-pulse flex-none'
        ></div>
      )}
      {apiStatus === 'Online' && (
        <div
          title={apiStatus}
          className='bg-green-500 w-4 h-4 rounded-full animate-pulse flex-none'
        ></div>
      )}
      {apiStatus === 'Offline' && (
        <div
          title={apiStatus}
          className='bg-red-500 w-4 h-4 rounded-full flex-none'
        ></div>
      )}
    </div>
  );
}
