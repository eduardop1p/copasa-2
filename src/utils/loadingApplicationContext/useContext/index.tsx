'use client';

import { useContext } from 'react';

import { LoadingContext } from '../context';

export function useLoadingApplicationContext() {
  const { isLoading, setIsLoading } = useContext(LoadingContext);

  return { isLoading, setIsLoading };
}
