'use client';

import { useContext } from 'react';

import { LoadingContext } from '../context';

export function useLoadingContext() {
  const { isLoading, setIsLoading } = useContext(LoadingContext);

  return { isLoading, setIsLoading };
}
