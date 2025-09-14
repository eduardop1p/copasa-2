/* eslint-disable @next/next/no-html-link-for-pages */
'use client';

import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAlertDialogContext } from '@/utils/admin/alertDialogContext/useContext';
import useFormLogin from '@/utils/admin/formLogin/useFormLogin';
import { BodyProtocol } from '@/utils/admin/formLogin/validation';
import { useLoadingContext } from '@/utils/loadingContext/useContext';

import Loading from '../../loading';

export default function FormLogin() {
  const { handleSubmit, register, errors } = useFormLogin();
  const { setAlertDialog } = useAlertDialogContext();
  const { isLoading } = useLoadingContext();
  const error = errors[Object.keys(errors)[0] as keyof BodyProtocol];

  React.useEffect(() => {
    if (error) {
      setAlertDialog(state => ({
        ...state,
        show: true,
        title: error.message,
      }));
    }
  }, [error, setAlertDialog]);

  return (
    <Card className='w-full max-w-[450px]'>
      {isLoading && <Loading />}
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Faça login para acessar o painel operador
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit} className='w-full'>
        <CardContent>
          <div className='grid w-full items-center gap-4'>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                placeholder='Seu email de acesso'
                {...register('email')}
              />
            </div>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='password'>Senha</Label>
              <Input
                id='password'
                type='password'
                placeholder='Sua senha de acesso'
                {...register('password')}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className='flex flex-col gap-3 w-full'>
          <Button
            type='submit'
            className={`${isLoading ? 'pointer-events-none' : 'pointer-events-auto'} relative w-full`}
          >
            Login
          </Button>
          <a href='/' className='w-full'>
            <Button type='button' variant='outline' className={`w-full`}>
              Cancelar
            </Button>
          </a>
        </CardFooter>
      </form>
    </Card>
  );
}
