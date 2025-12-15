'use client'

import Link from 'next/link'

type MobileNavigationProps = {
  isOpen: boolean
  onClose: () => void
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ isOpen, onClose }) => {
  return (
    <div
      className={[
        'mobile-navigation',
        'fixed inset-0',
        'bg-slate-900 text-white',
        'px-6 pt-[72px]',
        'transform transition-transform duration-500 ease-out',
        'md:hidden',

        isOpen ? 'translate-y-0' : '-translate-y-full',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <nav className="mt-6 space-y-6">
        {/* <Link
          href="/en"
          className="block tracking-[0.14em] uppercase hover:underline"
          onClick={onClose}
        >
          Home MOBILE
        </Link> */}

        <Link
          href="/en/rooms"
          className="block tracking-[0.14em] uppercase hover:underline"
          onClick={onClose}
        >
          Rooms
        </Link>
        <Link
          href="/en/apartments"
          className="block tracking-[0.14em] uppercase hover:underline"
          onClick={onClose}
        >
          Apartments
        </Link>
        <Link
          href="/en/location"
          className="block tracking-[0.14em] uppercase hover:underline"
          onClick={onClose}
        >
          Tavernas
        </Link>
        <Link
          href="/en/about"
          className="block tracking-[0.14em] uppercase hover:underline"
          onClick={onClose}
        >
          About
        </Link>
        <Link
          href="/en/contact"
          className="block tracking-[0.14em] uppercase hover:underline"
          onClick={onClose}
        >
          Contact
        </Link>
        <Link
          href="/hosts/login"
          className="block tracking-[0.14em] uppercase hover:underline"
          onClick={onClose}
        >
          Log In
        </Link>
      </nav>
    </div>
  )
}

export default MobileNavigation
