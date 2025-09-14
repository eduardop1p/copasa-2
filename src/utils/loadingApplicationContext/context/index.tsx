/* eslint-disable prettier/prettier */
'use client';

import { usePathname } from 'next/navigation';

import React, {
  createContext,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

interface LoadingContextProtocol {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const defaultState = false;

export const LoadingContext = createContext<LoadingContextProtocol>({
  isLoading: defaultState,
  setIsLoading: () => { },
});

export default function LoadingApplicationContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(defaultState);
  const pathName = usePathname();

  useEffect(() => {
    setIsLoading(defaultState);
    MySwal.close();
  }, [pathName]);

  useEffect(() => {
    if (isLoading) {
      MySwal.fire({
        // title: 'Aguarde enquanto processamos...',
        title:
          pathName === '/'
            // ? 'Aguarde enquanto processamos...'
            ? 'Aguarde, isso pode demorar até 2 minutos...' :
            'Carregando...',
        allowOutsideClick: false,
        didOpen: () => {
          MySwal.showLoading();
        },
      });
    } else {
      MySwal.close();
    }
  }, [isLoading, pathName]);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}
