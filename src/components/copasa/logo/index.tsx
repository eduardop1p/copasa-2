/* eslint-disable @next/next/no-html-link-for-pages */
import Image from 'next/image';

import { twMerge } from 'tailwind-merge';

interface Props {
  className?: string;
  width: number;
  height: number;
}

export default function Logo({ className, width, height }: Props) {
  return (
    <a href='/' className={twMerge('flex-none', className)}>
      <Image
        src='/assets/imgs/copasa-logo.png'
        width={width}
        height={height}
        alt='logo-copasa'
      />
    </a>
  );
}
