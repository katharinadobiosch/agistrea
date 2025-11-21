"use client";

import Link from "next/link";

type MobileNavigationProps = {
  isOpen: boolean;
  onClose: () => void;
};

const MobileNavigation: React.FC<MobileNavigationProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <div
      className={[
        "fixed z-40 inset-0",
        "bg-slate-900 text-white",
        "pt-[72px] px-6 lg:pt-[40px]",
        "transform transition-transform duration-500 ease-out",

        // MOBILE: from top
        // DESKTOP: from left
        isOpen
          ? "translate-y-0 lg:translate-y-0 lg:translate-x-0"
          : "-translate-y-full lg:translate-y-0 lg:-translate-x-full",

        // Desktop width
        "lg:w-[360px] lg:left-0 lg:right-auto lg:h-full",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <nav className="space-y-6 text-lg mt-6">
        <Link
          href="/en"
          className="block uppercase tracking-[0.14em] hover:underline hover:decoration-wavy"
          onClick={onClose}
        >
          Home
        </Link>
        <Link
          href="/en/about"
          className="block uppercase tracking-[0.14em] hover:underline hover:decoration-wavy"
          onClick={onClose}
        >
          About
        </Link>
        <Link
          href="/en/rooms"
          className="block uppercase tracking-[0.14em] hover:underline hover:decoration-wavy"
          onClick={onClose}
        >
          Rooms
        </Link>
        <Link
          href="/en/location"
          className="block uppercase tracking-[0.14em] hover:underline hover:decoration-wavy"
          onClick={onClose}
        >
          Location
        </Link>
        <Link
          href="/en/contact"
          className="block uppercase tracking-[0.14em] hover:underline hover:decoration-wavy"
          onClick={onClose}
        >
          Contact
        </Link>
      </nav>
    </div>
  );
};

export default MobileNavigation;
