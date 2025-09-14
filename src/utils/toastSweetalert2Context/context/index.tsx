'use client';

import React, {
  createContext,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';

import Swal, { SweetAlertIcon } from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

interface ToastSweetalert2Protocol {
  icon: SweetAlertIcon;
  message: string;
}

interface ToastSweetalert2ContextProtocol {
  toast: ToastSweetalert2Protocol;
  setToast: Dispatch<SetStateAction<ToastSweetalert2Protocol>>;
}

const defaultState: ToastSweetalert2Protocol = {
  icon: 'error',
  message: '',
};

export const ToastSweetalert2Context =
  createContext<ToastSweetalert2ContextProtocol>({
    toast: defaultState,
    setToast: () => { }, // eslint-disable-line
  });

export default function ToastSweetalert2ContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toast, setToast] = useState(defaultState);

  useEffect(() => {
    if (toast.message) {
      MySwal.fire({
        icon: toast.icon,
        title: toast.message,
      });
    }
  }, [toast]);

  return (
    <ToastSweetalert2Context.Provider value={{ toast, setToast }}>
      {children}
    </ToastSweetalert2Context.Provider>
  );
}
