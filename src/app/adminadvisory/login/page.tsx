import { Metadata } from 'next';

import FormLogin from '@/components/admin/login/formLogin';
import Header from '@/components/admin/login/header';

export const metadata: Metadata = {
  title: 'Login',
};

export default async function Page() {
  return (
    <>
      <Header />
      <main className='w-full h-full min-h-screen flex items-center justify-center px-6 pb-6 pt-[102px]'>
        <FormLogin />
      </main>
    </>
  );
}
