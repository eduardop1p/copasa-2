import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import Footer from '@/components/copasa/footer';
import Header from '@/components/copasa/header';
import FormToken from '@/components/forms/formToken';

export default async function Page() {
  const cookieStore = await cookies();
  const idDocument = cookieStore.get('idDocument')?.value;
  const password = cookieStore.get('password')?.value;
  const contactid = cookieStore.get('contactid')?.value;
  const userSID = cookieStore.get('userSID')?.value;
  const aspNetCoreMvcCookieTempDataProvider = cookieStore.get(
    'aspNetCoreMvcCookieTempDataProvider'
  )?.value;
  const copasaPortalSession = cookieStore.get('copasaPortalSession')?.value;
  const ARRAffinity = cookieStore.get('ARRAffinity')?.value;
  const ARRAffinitySameSite = cookieStore.get('ARRAffinitySameSite')?.value;
  const aiUser = cookieStore.get('aiUser')?.value;
  const aiSession = cookieStore.get('aiSession')?.value;
  if (
    !idDocument ||
    !password ||
    !contactid ||
    !userSID ||
    !aspNetCoreMvcCookieTempDataProvider ||
    !copasaPortalSession ||
    !ARRAffinity ||
    !ARRAffinitySameSite ||
    !aiUser ||
    !aiSession
  ) {
    redirect('/');
  }

  return (
    <div className='relative flex min-h-screen w-full flex-col'>
      <Header />
      <main className='mb-[92px] flex w-full flex-col items-center justify-center gap-[30px] px-6 py-[23px]'>
        <FormToken />
      </main>
      <Footer className='absolute left-0 top-full z-[5]' />
    </div>
  );
}
