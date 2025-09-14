'use client';

import { useContext } from 'react';

import { AlertDialogContext } from '../context';

export function useAlertDialogContext() {
  const { alertDialog, setAlertDialog } = useContext(AlertDialogContext);

  return { alertDialog, setAlertDialog };
}
