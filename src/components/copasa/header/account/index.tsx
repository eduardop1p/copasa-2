/* eslint-disable @next/next/no-html-link-for-pages */
'use client';

import { useEffect, useRef, useState } from 'react';

interface Props {
  userName?: string;
}

export default function Account({ userName }: Props) {
  const [showSettings, setShowSettings] = useState(false);

  const containerSettingsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onmousedown = (event: Event) => {
      const elementTarget = event.target as HTMLElement;
      if (
        containerSettingsRef.current &&
        !containerSettingsRef.current.contains(elementTarget)
      ) {
        setShowSettings(false);
      }
    };

    window.addEventListener('mousedown', onmousedown);
    return () => {
      window.removeEventListener('mousedown', onmousedown);
    };
  }, []);

  return userName ? (
    <div
      className='relative h-[38px] w-[190px] flex-none'
      ref={containerSettingsRef}
    >
      <div
        className='flex h-full w-full cursor-pointer items-center justify-between gap-5 rounded bg-white px-3 py-[6px]'
        onClick={() => setShowSettings(!showSettings)}
      >
        <span className='w-full truncate text-base font-normal text-0056b3'>
          {userName}
        </span>
        <div className='flex items-center gap-1'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 512 512'
            width={24}
            height={24}
            fill='#0056b3'
            className='flex-none'
          >
            <path d='M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l73.4 73.4H192c-17.7 0-32 14.3-32 32s14.3 32 32 32h210.7l-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96C43 32 0 75 0 128v256c0 53 43 96 96 96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H96c-17.7 0-32-14.3-32-32V128c0-17.7 14.3-32 32-32h64z' />
          </svg>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 320 512'
            width={12}
            height={12}
            fill='#0056b3'
            className='flex-none'
          >
            <path d='M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9S301 191.9 288 191.9L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z' />
          </svg>
        </div>
      </div>
      <div
        className={`${showSettings ? 'flex' : 'hidden'} absolute top-10 z-[2] w-full flex-col rounded bg-white py-2 shadow-card-account`}
      >
        <button
          type='button'
          className='w-full flex-none bg-inherit px-6 py-[6px] text-left text-base font-normal text-0056b3 transition-colors duration-300 hover:bg-gray-200'
        >
          Editar meu perfil
        </button>
        <a
          href='https://copasaportalprd.azurewebsites.net/Copasa.Portal/Services/Termsofuse'
          target='_blank'
          className='w-full flex-none bg-inherit px-6 py-[6px] text-left text-base font-normal text-0056b3 transition-colors duration-300 hover:bg-gray-200'
        >
          Termos de uso
        </a>
        <a
          href='/'
          className='w-full flex-none bg-inherit px-6 py-[6px] text-left text-base font-normal text-0056b3 transition-colors duration-300 hover:bg-gray-200'
        >
          Sair
        </a>
      </div>
    </div>
  ) : (
    <a
      href='/'
      rel='noopener noreferrer'
      className='flex items-center gap-2 text-sm font-normal text-white'
    >
      Entrar
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 512 512'
        width={25}
        height={25}
        className='flex-none'
        fill='#fff'
      >
        <path d='M352 96h64c17.7 0 32 14.3 32 32v256c0 17.7-14.3 32-32 32h-64c-17.7 0-32 14.3-32 32s14.3 32 32 32h64c53 0 96-43 96-96V128c0-53-43-96-96-96h-64c-17.7 0-32 14.3-32 32s14.3 32 32 32zm-9.4 182.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l73.4 73.4H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h210.7l-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z' />
      </svg>
    </a>
  );
}
