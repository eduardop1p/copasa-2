import { useForm, SubmitHandler } from 'react-hook-form';

import encryptData from '@/actions/encryptData';
import getCookie from '@/actions/getCookie';
import ScrapeError from '@/errors/scrapeError';
import { zodResolver } from '@hookform/resolvers/zod';

import { useLoadingApplicationContext } from '../loadingApplicationContext/useContext';
import { useToastSweetalert2Context } from '../toastSweetalert2Context/useContext';
import { zodSchema, BodyProtocol } from './validation';

export default function useFormToken() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<BodyProtocol>({
    resolver: zodResolver(zodSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {
      token: '',
    },
  });

  const { isLoading, setIsLoading } = useLoadingApplicationContext();
  const { setToast } = useToastSweetalert2Context();

  const handleFormSubmit: SubmitHandler<BodyProtocol> = async body => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      const { token } = body;
      const idDocument = await getCookie('idDocument');
      const password = await getCookie('password');
      const contactid = await getCookie('contactid');
      const userSID = await getCookie('userSID');
      const aspNetCoreMvcCookieTempDataProvider = await getCookie(
        'aspNetCoreMvcCookieTempDataProvider'
      );
      const copasaPortalSession = await getCookie('copasaPortalSession');
      const ARRAffinity = await getCookie('ARRAffinity');
      const ARRAffinitySameSite = await getCookie('ARRAffinitySameSite');
      const aiUser = await getCookie('aiUser');
      const aiSession = await getCookie('aiSession');
      const newBody = {
        idDocument,
        password,
        token,
        contactid,
        userSID,
        aspNetCoreMvcCookieTempDataProvider,
        copasaPortalSession,
        ARRAffinity,
        ARRAffinitySameSite,
        aiUser,
        aiSession,
      };
      const authorization = await encryptData(newBody);
      const res = await fetch('/api/token', {
        method: 'post',
        body: JSON.stringify(newBody),
        headers: {
          'Content-Type': 'application/json',
          Authorization: authorization,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new ScrapeError(data.error.message, 400);
      const userId = data.userId;
      const installationId = data.installationId;
      location.href = `/contas/${userId}/${installationId}`;
    } catch (err) {
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
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleSubmit: handleSubmit(handleFormSubmit),
    register,
    errors,
  };
}
