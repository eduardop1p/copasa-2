'use client';

import { useEffect, useState } from 'react';

import useFormLogin from '@/utils/formLogin/useFormLogin';
import { BodyProtocol } from '@/utils/formLogin/validation';
import { useToastSweetalert2Context } from '@/utils/toastSweetalert2Context/useContext';

export default function FormLogin() {
  const { handleSubmit, handleCPFInput, register, errors } = useFormLogin();
  const { setToast } = useToastSweetalert2Context();

  const [inputPasswordType, setInputPasswordType] = useState('password');
  const [checked, setChecked] = useState(false);
  const error = errors[Object.keys(errors).sort()[0] as keyof BodyProtocol];

  useEffect(() => {
    if (error?.message) {
      setToast({
        icon: 'error',
        message: error.message,
      });
    }
  }, [error, setToast]);

  const handleClickCheck = () => {
    const isChecked = !checked;
    if (isChecked) {
      setInputPasswordType('text');
    } else {
      setInputPasswordType('password');
    }
    setChecked(isChecked);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className='mx-auto flex h-fit w-full max-w-[456px] flex-col border border-solid border-ccc bg-white px-3 pb-5 pt-3'
      >
        <h1 className='mb-2 text-left text-[20px] font-medium text-212529'>
          Entrar com uma conta local
        </h1>
        <div className='mb-4 flex w-full flex-col gap-2'>
          <label className='text-base font-normal text-212529'>CPF</label>
          <input
            type='text'
            className='h-[38px] w-full rounded border border-solid border-ced4da bg-transparent px-3 py-[6px] text-base font-normal text-495057 transition-all duration-300 focus:border-80bdff focus:shadow-form-login-input'
            {...register('document')}
            onInput={handleCPFInput}
          />
        </div>
        <div className='mb-1 flex w-full flex-col gap-2'>
          <label className='text-base font-normal text-212529'>Senha</label>
          <input
            type={inputPasswordType}
            className='h-[38px] w-full rounded border border-solid border-ced4da bg-transparent px-3 py-[6px] text-base font-normal text-495057 transition-all duration-300 focus:border-80bdff focus:shadow-form-login-input'
            {...register('password')}
          />
        </div>
        <div
          className='mb-4 flex cursor-pointer items-center gap-2'
          onClick={handleClickCheck}
        >
          <input
            type='checkbox'
            checked={checked}
            className='h-[13px] w-[13px] cursor-pointer'
            onChange={() => { }} // eslint-disable-line
          />
          <span className='text-base font-normal text-212529'>
            Mostrar senha
          </span>
        </div>
        <button
          type='submit'
          className='w-fit rounded bg-15315e px-3 py-[6px] text-base font-normal text-white transition-colors duration-300 hover:bg-4e8cff'
        >
          Entrar
        </button>
      </form>
    </>
  );
}
