import { Spinner, Theme } from '@radix-ui/themes';

import '@radix-ui/themes/styles.css';

export default function Loading() {
  return (
    <Theme
      className='!fixed !inset-0 !w-screen !h-screen !z-20'
      hasBackground={false}
    >
      <div className='flex items-center justify-center w-full h-full bg-00000066'>
        <div className='flex flex-col bg-black dark:bg-white rounded-lg px-6 py-4 items-center gap-1'>
          <Spinner
            loading
            size='3'
            className='!w-8 !h-8 !text-gray-300 dark:!text-gray-700'
          ></Spinner>
          <h2 className='font-medium text-sm text-white dark:text-black'>
            Carregando
          </h2>
        </div>
      </div>
    </Theme>
  );
}
