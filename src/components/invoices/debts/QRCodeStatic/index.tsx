'use cliente';

import Image from 'next/image';

import { Dispatch, SetStateAction } from 'react';
import { FaLock } from 'react-icons/fa6';

import PixProtocol from '@/interfaces/pixProtocol';
import formatPrice from '@/services/formatPrice';
import useQRCode from '@/utils/useQRCode';

interface Props extends PixProtocol {
  value: number;
  setQRCodeStatic: Dispatch<SetStateAction<{ show: boolean; value: number }>>;
  client: {
    name: string;
    email: string;
    phone: string;
    total: number;
    maturity: string;
    idDocument: string;
    password: string;
  };
}

export default function QRCodePixStatic({
  pixKey,
  pixName,
  value,
  client,
  setQRCodeStatic,
}: Props) {
  const { QRData, handleCopy } = useQRCode({
    pixKey,
    pixName,
    value,
    idDocument: client.idDocument,
    password: client.password,
  });

  const handleCloseQRCode = () => {
    setQRCodeStatic(state => ({ ...state, show: false }));
  };

  return (
    <div
      className='fixed h-screen w-full z-40 bg-0006 flex items-center justify-center inset-0 font-roboto'
      onClick={handleCloseQRCode}
    >
      <div className='w-full max-w-[500px] px-6 relative'>
        <button
          type='button'
          className='self-end p-2 absolute -top-4 right-0 z-10'
          onClick={handleCloseQRCode}
        >
          <svg
            width={33}
            height={33}
            viewBox='0 0 33 33'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <rect
              x={1}
              y={1.00781}
              width={31}
              height={31}
              rx={15.5}
              fill='#fff'
            />
            <rect
              x={1}
              y={1.00781}
              width={31}
              height={31}
              rx={15.5}
              stroke='#231F20'
              strokeWidth={2}
            />
            <path
              d='M24 10.518l-1.51-1.51-5.99 5.99-5.99-5.99L9 10.518l5.99 5.99L9 22.498l1.51 1.51 5.99-5.99 5.99 5.99 1.51-1.51-5.99-5.99 5.99-5.99z'
              fill='#231F20'
            />
          </svg>
        </button>
        <div
          className='bg-white shadow-card-payment rounded-[4px] overflow-hidden w-full'
          onClick={event => event.stopPropagation()}
        >
          <div className='w-full max-h-[95vh] overflow-x-hidden overflow-y-auto flex flex-col bg-inherit items-center relative'>
            <div className='mb-2 bg-15315E w-full flex items-center justify-center'>
              <Image
                src='/assets/imgs/copasa-logo.png'
                width={128}
                height={32}
                alt='logo-copasa'
              />
            </div>
            <h2 className='text-sm text-black text-center font-semibold my-1'>
              PIX
            </h2>
            <div className='bg-e7f9f4 py-2 px-4 rounded-[30px] flex items-center gap-1 text-[10px] text-000000de mb-2'>
              <FaLock className='fill-green-500' size={13} />
              Você está em um ambiente de pagamento seguro
            </div>
            <div className='p-3 bg-f6f7f9 flex flex-col w-full'>
              <h2 className='text-base text-black font-semibold mb-1'>
                Resumo da fatura
              </h2>
              <div className='w-full bg-white rounded-2xl p-3 flex flex-col mb-2'>
                <div className='flex items-center justify-between text-black text-base font-bold mb-1'>
                  Cliente:{' '}
                  <span className='text-base font-semibold'>{client.name}</span>
                </div>
                <div className='flex items-center justify-between text-black text-base font-bold mb-1'>
                  Total da fatura:{' '}
                  <span className='text-base font-semibold'>
                    {formatPrice(client.total)}
                  </span>
                </div>
                <div className='flex items-center justify-between text-black text-base font-bold'>
                  Vencimento:{' '}
                  <span className='text-base font-semibold'>
                    {client.maturity}
                  </span>
                </div>
              </div>
              <div className='self-center flex-none mb-2'>
                {QRData.src && (
                  <Image
                    src={QRData.src}
                    alt='qrcode'
                    width={200}
                    height={200}
                  />
                )}
              </div>
              <button
                type='button'
                className='rounded bg-15315e px-3 py-[6px] text-base font-normal text-white transition-colors duration-300 hover:bg-4e8cff'
                onClick={handleCopy}
              >
                Copiar código pix
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
