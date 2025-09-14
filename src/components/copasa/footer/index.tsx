import { twMerge } from 'tailwind-merge';

import SocialMidia from '../../socialMidia';

interface Props {
  className?: string;
}

export default function Footer({ className }: Props) {
  return (
    <footer
      className={twMerge(
        'flex w-full items-center justify-between gap-4 bg-15315e p-[10px] max-[880px]:flex-col max-[880px]:gap-2',
        className
      )}
    >
      <div className='flex flex-col max-[880px]:self-start'>
        <p className='text-base font-bold text-white'>
          Cia de Saneamento de Minas Gerais – Copasa MG
        </p>
        <p className='text-base font-normal text-white'>
          Sede: Rua Mar de Espanha, 525 - Bairro Santo Antônio - CEP 30.330-900
          - Belo Horizonte - MG
        </p>
        <p className='text-base font-normal text-white'>
          CNPJ: 17.281.106/0001-03
        </p>
      </div>
      <SocialMidia className='max-[880px]:self-end' />
    </footer>
  );
}
