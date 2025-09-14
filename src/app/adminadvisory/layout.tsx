import { GeistSans } from 'geist/font/sans';

import { Toaster } from '@/components/ui/toaster';
import AlertDialogContextProvider from '@/utils/admin/alertDialogContext/context';
import { ThemeProvider } from '@/utils/admin/themeProvider';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${GeistSans.className} w-full min-w-[1500px]`}>
      <ThemeProvider
        attribute='class'
        defaultTheme='system'
        enableSystem
        disableTransitionOnChange
      >
        <AlertDialogContextProvider>{children}</AlertDialogContextProvider>
        <Toaster />
      </ThemeProvider>
    </div>
  );
}
