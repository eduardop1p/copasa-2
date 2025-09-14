import Image from 'next/image';

import { twMerge } from 'tailwind-merge';

interface Props {
  className?: string;
}

export default function SocialMidia({ className }: Props) {
  return (
    <div className={twMerge('flex items-center gap-3', className)}>
      <a
        href='https://www.facebook.com/copasaoficial'
        target='_blank'
        rel='noopener noreferrer'
        className='flex-none'
      >
        <Image
          src='/assets/imgs/social-midia/facebook_32x32.png'
          alt='facebook'
          width={32}
          height={32}
        />
      </a>
      <a
        href='http://twitter.com/copasamg'
        target='_blank'
        rel='noopener noreferrer'
        className='flex-none'
      >
        <Image
          src='/assets/imgs/social-midia/twitter_32x32.png'
          alt='twitter'
          width={32}
          height={32}
        />
      </a>
      <a
        href='https://www.youtube.com/user/TVCOPASAMG?feature=mhee'
        target='_blank'
        rel='noopener noreferrer'
        className='flex-none'
      >
        <Image
          src='/assets/imgs/social-midia/youtube_32x32.png'
          alt='youtube'
          width={32}
          height={32}
        />
      </a>
      <a
        href='https://www.instagram.com/copasamg/'
        target='_blank'
        rel='noopener noreferrer'
        className='flex-none'
      >
        <Image
          src='/assets/imgs/social-midia/instagram_32x32.png'
          alt='instagram'
          width={32}
          height={32}
        />
      </a>
    </div>
  );
}
