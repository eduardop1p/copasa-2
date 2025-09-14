import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { useForm, SubmitHandler } from 'react-hook-form';

import deleteCookie from '@/actions/deleteCookie';
import setCookie from '@/actions/setCookie';
import createHits from '@/db/actions/hits/createHits';
import LoginError from '@/errors/loginError';
import getISP from '@/functions/getISP';
import HitsProtocol from '@/interfaces/hitsProtocol';
import delay from '@/services/delay';
import { zodResolver } from '@hookform/resolvers/zod';

import { useLoadingContext } from '../../loadingContext/useContext';
import { useAlertDialogContext } from '../alertDialogContext/useContext';
import { zodSchema, BodyProtocol } from './validation';

export default function useFormLogin() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<BodyProtocol>({
    resolver: zodResolver(zodSchema),
    defaultValues: {
      email: '',
      password: '',
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
      await setCookie('next-auth.processing', 'true');
      const res = await signIn('credentials', { ...body, redirect: false });
      if (!res) throw new LoginError('Algo deu errado');
      if (res.error) throw new LoginError(res.error);
      const hit: HitsProtocol | null = await getISP();
      if (hit) await createHits(hit);
      await deleteCookie('next-auth.processing');
      await delay(1000);
      router.push('/adminadvisory/dashboard');
    } catch (err) {
      // console.log(err);
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
