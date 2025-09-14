/* eslint-disable @next/next/no-html-link-for-pages */
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import AlertDialogProtocol from '@/interfaces/alertDialogProtocol';

interface Props extends AlertDialogProtocol {
  handleClose(): void;
}

export default function AppAlertDialog({
  show,
  title,
  message,
  handleClose,
}: Props) {
  return (
    <AlertDialog open={show}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <a href='/'>Cancelar</a>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <button type='button' onClick={handleClose}>
              Continuar
            </button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
