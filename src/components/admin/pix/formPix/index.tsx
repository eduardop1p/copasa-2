'use client';

import Link from 'next/link';

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
import PixProtocol from '@/interfaces/pixProtocol';
import { useAlertDialogContext } from '@/utils/admin/alertDialogContext/useContext';
import useFormPix from '@/utils/admin/formPix/useFormPix';
import { BodyProtocol } from '@/utils/admin/formPix/validation';
import { useLoadingContext } from '@/utils/loadingContext/useContext';

import Loading from '../../loading';

interface Props extends PixProtocol { } // eslint-disable-line

export default function FormPix({ pixKey, pixName }: Props) {
  const { handleSubmit, register, errors } = useFormPix({ pixKey, pixName });
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
        <CardTitle>Editar pix</CardTitle>
        <CardDescription>
          Edite a chave pix para receber pagamentos nela
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit} className='w-full'>
        <CardContent>
          <div className='grid w-full items-center gap-4'>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='nome'>Nome</Label>
              <Input
                id='name'
                placeholder='Nome da chave pix'
                {...register('pixName')}
              />
            </div>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='key'>Chave</Label>
              <Input id='key' placeholder='Chave pix' {...register('pixKey')} />
            </div>
          </div>
        </CardContent>
        <CardFooter className='flex flex-col gap-3 w-full'>
          <Button
            type='submit'
            className={`${isLoading ? 'pointer-events-none' : 'pointer-events-auto'} relative w-full`}
          >
            Alterar
          </Button>
          <Link href='/adminadvisory/dashboard' className='w-full'>
            <Button type='button' variant='outline' className={`w-full`}>
              Cancelar
            </Button>
          </Link>
        </CardFooter>
      </form>
    </Card>
  );
}
