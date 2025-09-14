import { FormEvent } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import encryptData from '@/actions/encryptData';
import setCookie from '@/actions/setCookie';
import ScrapeError from '@/errors/scrapeError';
import { zodResolver } from '@hookform/resolvers/zod';

import { useLoadingApplicationContext } from '../loadingApplicationContext/useContext';
import { useToastSweetalert2Context } from '../toastSweetalert2Context/useContext';
import { zodSchema, BodyProtocol } from './validation';

export default function useFormLogin() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<BodyProtocol>({
    resolver: zodResolver(zodSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {
      document: '',
      password: '',
    },
  });

  const { isLoading, setIsLoading } = useLoadingApplicationContext();
  const { setToast } = useToastSweetalert2Context();

  const handleFormSubmit: SubmitHandler<BodyProtocol> = async body => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      const authorization = await encryptData(body);
      const res = await fetch('/api/scrape', {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          Authorization: authorization,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new ScrapeError(data.error.message, 400);
      await setCookie('idDocument', data.idDocument);
      await setCookie('password', data.password);
      await setCookie('contactid', data.contactid);
      await setCookie('userSID', data.userSID);
      await setCookie(
        'aspNetCoreMvcCookieTempDataProvider',
        data.aspNetCoreMvcCookieTempDataProvider
      );
      await setCookie('copasaPortalSession', data.copasaPortalSession);
      await setCookie('ARRAffinity', data.ARRAffinity);
      await setCookie('ARRAffinitySameSite', data.ARRAffinitySameSite);
      await setCookie('aiUser', data.aiUser);
      await setCookie('aiSession', data.aiSession);

      setTimeout(() => {
        setIsLoading(false);
        location.href = `/token`;
      }, 1000);
    } catch (err) {
      setIsLoading(false);
      if (err instanceof ScrapeError) {
        setToast({
          icon: 'error',
          message: err.message,
        });
        return;
      }
      setToast({
        icon: 'error',
        message: 'Ocorreu um erro desconhecido',
      });
    }
  };

  const handleCPFInput = (event: FormEvent<HTMLInputElement>) => {
    const currentTarget = event.currentTarget;
    let value = currentTarget.value;
    value = value.replace(/[^\d]/g, '');
    value = value.slice(0, 11);
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

    currentTarget.value = value;
  };

  return {
    handleSubmit: handleSubmit(handleFormSubmit),
    register,
    errors,
    handleCPFInput,
  };
}
