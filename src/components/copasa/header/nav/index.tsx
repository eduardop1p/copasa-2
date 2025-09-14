import { twMerge } from 'tailwind-merge';

import Account from '../account';
import Search from '../search';

interface Props {
  className?: string;
  userName?: string;
}

export default function Nav({ className, userName }: Props) {
  return (
    <nav
      className={twMerge(
        'flex items-center gap-4 self-start max-[1300px]:hidden',
        className
      )}
    >
      <a
        href='/'
        target='_blank'
        rel='noopener noreferrer'
        className='flex-none text-sm font-normal text-white'
      >
        Agência virtual
      </a>
      <div className='h-6 w-[1px] flex-none bg-white'></div>
      <a
        href='/'
        target='_blank'
        rel='noopener noreferrer'
        className='flex-none text-sm font-normal text-white'
      >
        Ouvidoria
      </a>
      <div className='h-6 w-[1px] flex-none bg-white'></div>
      <a
        href='tel:0800 0300 115'
        target='_blank'
        rel='noopener noreferrer'
        className='flex-none text-sm font-normal text-white'
      >
        Telefone: 115 ou 0800 0300 115
      </a>
      <div className='h-6 w-[1px] flex-none bg-white'></div>
      <Search />
      <Account userName={userName} />
    </nav>
  );
}
