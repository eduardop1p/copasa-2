import MobileMenu from '@/components/copasa/header/mobileMenu';
import Nav from '@/components/copasa/header/nav';

import Logo from '../logo';

interface Props {
  userName?: string;
}

export default function Header({ userName }: Props) {
  return (
    <header className='relative flex w-full justify-between bg-15315E px-6 pt-5 max-[1300px]:items-center max-[1300px]:pt-0'>
      <Logo
        width={317}
        height={126}
        className='-ml-7 max-w-[317px] self-center max-[600px]:flex-auto'
      />
      <Nav userName={userName} />
      <MobileMenu className='max-[1300px]:block' />
    </header>
  );
}
