import type { Metadata } from 'next';

import './globals.css';
import LoadingApplicationContextProvider from '@/utils/loadingApplicationContext/context';
import LoadingContextProvider from '@/utils/loadingContext/context';
import ToastSweetalert2ContextProvider from '@/utils/toastSweetalert2Context/context';

export const metadata: Metadata = {
  title: 'Bem vindo à Agência Virtual',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='pt-BR' suppressHydrationWarning>
      <head>
        <meta charSet='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <link
          rel='shortcut icon'
          href='/assets/favicon-caesb.ico'
          type='image/x-icon'
          sizes='any'
        />
      </head>
      <body className='font-arial'>
        <ToastSweetalert2ContextProvider>
          <LoadingContextProvider>
            <LoadingApplicationContextProvider>
              {children}
            </LoadingApplicationContextProvider>
          </LoadingContextProvider>
        </ToastSweetalert2ContextProvider>
      </body>
    </html>
  );
}
