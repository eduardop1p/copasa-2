'use client';

import { useContext } from 'react';

import { ToastSweetalert2Context } from '../context';

export function useToastSweetalert2Context() {
  const { toast, setToast } = useContext(ToastSweetalert2Context);

  return { toast, setToast };
}
