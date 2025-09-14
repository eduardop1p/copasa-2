'use client';

import { useState } from 'react';
import { FiMenu } from 'react-icons/fi';

import { twMerge } from 'tailwind-merge';

import Account from '../account';
import Search from '../search';

interface Props {
  className?: string;
}

export default function MobileMenu({ className }: Props) {
  const [show, setShow] = useState(false);

  return (
    <div className={twMerge('hidden', className)}>
      <button
        type='button'
        className='rounded border border-solid border-ffffff1a px-3 py-1'
        onClick={() => setShow(!show)}
      >
        <FiMenu size={30} className='fill-gray-400 text-gray-400' />
      </button>
      <div
        className={`${show ? 'visible translate-x-0 opacity-100' : 'invisible -translate-x-full opacity-0'} absolute left-0 top-full flex w-full flex-col gap-4 border-y border-solid border-y-gray-600 bg-15315E px-6 py-4 transition-all duration-300`}
      >
        <a
          href='/copasa-home'
          target='_blank'
          rel='noopener noreferrer'
          className='flex-none text-sm font-normal text-white'
        >
          Agência virtual
        </a>
        <a
          href='/copasa-home'
          target='_blank'
          rel='noopener noreferrer'
          className='flex-none text-sm font-normal text-white'
        >
          Ouvidoria
        </a>
        <a
          href='tel:0800 0300 115'
          target='_blank'
          rel='noopener noreferrer'
          className='flex-none text-sm font-normal text-white'
        >
          Telefone: 115 ou 0800 0300 115
        </a>
        <Search />
        <Account />
      </div>
    </div>
  );
}
