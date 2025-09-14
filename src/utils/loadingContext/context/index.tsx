'use client';

import { usePathname } from 'next/navigation';

import React, {
  createContext,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';

interface LoadingContextProtocol {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const defaultState = false;

export const LoadingContext = createContext<LoadingContextProtocol>({
  isLoading: defaultState,
  setIsLoading: () => { }, // eslint-disable-line
});

export default function LoadingContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(defaultState);
  const pathName = usePathname();

  useEffect(() => {
    setIsLoading(defaultState);
  }, [pathName]);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}
