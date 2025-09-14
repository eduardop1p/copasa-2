'use client';

import React, {
  createContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';

import AppAlertDialog from '@/components/admin/alertDialog';
import AlertDialogProtocol from '@/interfaces/alertDialogProtocol';

interface AlertDialogContextProtocol {
  alertDialog: AlertDialogProtocol;
  setAlertDialog: Dispatch<SetStateAction<AlertDialogProtocol>>;
}

const defaultState: AlertDialogProtocol = {
  show: false,
  title: '',
  message: 'Ocorreu um erro por favor revise os dados e tente novamente',
};

export const AlertDialogContext = createContext<AlertDialogContextProtocol>({
  alertDialog: defaultState,
  setAlertDialog: () => { }, // eslint-disable-line
});

export default function AlertDialogContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [alertDialog, setAlertDialog] =
    useState<AlertDialogProtocol>(defaultState);

  const handleClose = () => {
    setAlertDialog(state => ({ ...state, show: false }));
  };

  return (
    <AlertDialogContext.Provider value={{ alertDialog, setAlertDialog }}>
      {children}
      <AppAlertDialog {...alertDialog} handleClose={handleClose} />
    </AlertDialogContext.Provider>
  );
}
