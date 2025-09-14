import Insights from '@/components/admin/insights';
import Footer from '@/components/copasa/footer';
import Header from '@/components/copasa/header';
import FormLogin from '@/components/forms/formLogin';

export default async function Page() {
  return (
    <div className='relative flex min-h-screen w-full flex-col'>
      <Header />
      <main className='mb-[92px] flex w-full flex-col items-center justify-center gap-[30px] px-6 py-[23px]'>
        <FormLogin />
        <div className='mx-auto flex w-full max-w-[550px] flex-wrap items-center justify-center gap-2'>
          <a
            href='https://copasaportalprd.azurewebsites.net/Copasa.Portal/Login/ForgotPassword'
            target='_blank'
            type='button'
            className='flex h-[60px] w-fit items-center justify-center rounded bg-dadada px-3 py-[6px] text-center text-base font-normal text-15315e'
          >
            Esqueceu sua <br /> senha?
          </a>
          <a
            href='https://copasaportalprd.azurewebsites.net/Copasa.Portal/Login/FirstAccess?IgnoreLoggedInUser=0'
            target='_blank'
            type='button'
            className='flex h-[60px] w-fit items-center justify-center rounded bg-dadada px-3 py-[6px] text-center text-base font-normal text-15315e'
          >
            Primeiro acesso
          </a>
          <a
            href='https://copasaportalprd.azurewebsites.net/Copasa.Portal/Home/Article'
            target='_blank'
            type='button'
            className='flex h-[60px] w-fit items-center justify-center rounded bg-dadada px-3 py-[6px] text-center text-base font-normal text-15315e'
          >
            Como fazer o login e <br /> solicitar serviços
          </a>
        </div>
      </main>
      <Footer className='absolute left-0 top-full z-[5]' />
      <Insights page='Home' />
    </div>
  );
}
