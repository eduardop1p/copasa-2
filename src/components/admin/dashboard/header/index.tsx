'use client';

import { signOut } from 'next-auth/react';
import Image from 'next/image';

import { Power } from 'lucide-react';

import ModeToggle from '@/components/admin/modeToggle';
import { Card, CardHeader } from '@/components/ui/card';

import Menu from './menu';

export default function Header() {
  const handleSignOut = () => {
    signOut({ redirect: true, callbackUrl: '/adminadvisory/login' });
  };

  return (
    <header className='fixed w-full z-10 inset-0 h-fit'>
      <Card className='rounded-none border-x-0 border-t-0'>
        <CardHeader className='flex flex-row items-center justify-between gap-4 px-4 py-3'>
          <div className='flex items-center gap-8'>
            <div className='flex items-center gap-2 '>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 256 256'
                className='h-6 w-6'
              >
                <path fill='none' d='M0 0H256V256H0z' />
                <path
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={16}
                  d='M208 128L128 208'
                />
                <path
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={16}
                  d='M192 40L40 192'
                />
              </svg>
              <button
                type='button'
                className='hover:scale-105 transition-transform duration-300 cursor-pointer'
                onClick={handleSignOut}
              >
                <Card className='w-[200px] h-fit py-2 px-4 flex items-center justify-between'>
                  <div className='flex items-center gap-3 flex-none'>
                    <div className='w-5 h-5 rounded-full overflow-hidden relative'>
                      <Image
                        src='/assets/imgs/nota-de-dolar-do-lobo-de-wall-street-a1zuxkrj9ww5s6el.webp'
                        sizes='100%'
                        fill
                        alt='rick and morty'
                        className='flex-none object-cover object-center'
                      />
                    </div>
                    <span className='text-sm font-medium h-fit text-foreground'>
                      Sair
                    </span>
                  </div>
                  <Power size={10} className='opacity-50' />
                </Card>
              </button>
            </div>
            <Menu />
          </div>
          <div className='flex items-center gap-4'>
            <ModeToggle />
            <div className='w-8 h-8 rounded-full overflow-hidden relative'>
              <Image
                src='/assets/imgs/nota-de-dolar-do-lobo-de-wall-street-a1zuxkrj9ww5s6el.webp'
                sizes='100%'
                fill
                alt='rick and morty'
                className='flex-none object-cover object-center'
              />
            </div>
          </div>
        </CardHeader>
      </Card>
    </header>
  );
}
