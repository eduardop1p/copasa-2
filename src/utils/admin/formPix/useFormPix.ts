import { useRouter } from 'next/navigation';

import { useForm, SubmitHandler } from 'react-hook-form';

import updatePix from '@/actions/updatePix';
import LoginError from '@/errors/loginError';
import PixProtocol from '@/interfaces/pixProtocol';
import { zodResolver } from '@hookform/resolvers/zod';

import { useLoadingContext } from '../../loadingContext/useContext';
import { useAlertDialogContext } from '../alertDialogContext/useContext';
import { zodSchema, BodyProtocol } from './validation';

interface Props extends PixProtocol { } // eslint-disable-line

export default function useFormPix({ pixKey, pixName }: Props) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<BodyProtocol>({
    resolver: zodResolver(zodSchema),
    defaultValues: {
      pixName,
      pixKey,
    },
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });
  const { isLoading, setIsLoading } = useLoadingContext();
  const { setAlertDialog } = useAlertDialogContext();
  const router = useRouter();

  const handleFormSubmit: SubmitHandler<BodyProtocol> = async body => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      await updatePix(body);
      router.push('/adminadvisory/dashboard');
    } catch (err) {
      setIsLoading(false);
      if (err instanceof LoginError) {
        setAlertDialog(state => ({
          ...state,
          show: true,
          title: err.message,
        }));
        return;
      }
      setAlertDialog(state => ({
        ...state,
        show: true,
        title: 'Algo deu errado',
      }));
    }
  };

  return { handleSubmit: handleSubmit(handleFormSubmit), register, errors };
}
