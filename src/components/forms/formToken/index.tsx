'use client';

import { useEffect } from 'react';

import useFormToken from '@/utils/formToken/useFormToken';
import { BodyProtocol } from '@/utils/formToken/validation';
import { useToastSweetalert2Context } from '@/utils/toastSweetalert2Context/useContext';

export default function FormToken() {
  const { handleSubmit, register, errors } = useFormToken();
  const { setToast } = useToastSweetalert2Context();
  const error = errors[Object.keys(errors).sort()[0] as keyof BodyProtocol];

  useEffect(() => {
    if (error?.message) {
      setToast({
        icon: 'error',
        message: error.message,
      });
    }
  }, [error, setToast]);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className='mx-auto flex h-fit w-full max-w-[456px] flex-col border border-solid border-ccc bg-white px-3 pb-5 pt-3'
      >
        <h1 className='mb-2 text-left text-[20px] font-medium text-212529'>
          Token enviado para seu email com sucesso
        </h1>
        <p className='mb-3 text-left text-base font-medium text-212529'>
          Verifique o seu endereço de e-mail para confirmar seu acesso na
          Agência virtual.
        </p>
        <div className='mb-4 flex w-full flex-col gap-2'>
          <label className='text-base font-normal text-212529'>Token</label>
          <input
            type='text'
            className='h-[38px] w-full rounded border border-solid border-ced4da bg-transparent px-3 py-[6px] text-base font-normal text-495057 transition-all duration-300 focus:border-80bdff focus:shadow-form-login-input'
            {...register('token')}
          />
        </div>
        <button
          type='submit'
          className='w-fit rounded bg-15315e px-3 py-[6px] text-base font-normal text-white transition-colors duration-300 hover:bg-4e8cff'
        >
          Validar
        </button>
      </form>
    </>
  );
}
