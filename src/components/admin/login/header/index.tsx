'use client';

import ModeToggle from '@/components/admin/modeToggle';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

export default function Header() {
  return (
    <header className='fixed w-full z-10 inset-0 h-fit'>
      <Card className='rounded-none border-x-0 border-t-0'>
        <CardHeader className='flex flex-row items-center justify-between gap-4 p-4'>
          <div className='flex items-center gap-8'>
            <a href='/adminadvisory/login' className='flex items-center gap-2'>
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
              <CardTitle className='text-base font-bold'>
                admin<span className='px-[2px]'>/</span>login
              </CardTitle>
            </a>
          </div>
          <div className='flex-none flex items-center gap-4'>
            <ModeToggle />
          </div>
        </CardHeader>
      </Card>
    </header>
  );
}
