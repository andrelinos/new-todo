import Image from 'next/image';

import logo from '@/assets/logo.svg';

export function Header() {
  return (
    <div className="flex h-48 items-center justify-center">
      <Image
        src={logo}
        alt=""
        priority
        style={{ width: 'auto' }}
        className="h-16"
      />
    </div>
  );
}
