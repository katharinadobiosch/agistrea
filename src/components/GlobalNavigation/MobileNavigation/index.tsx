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
        "mobile-navigation",
        "fixed z-40 inset-0",
        "bg-slate-900 text-white",
        "pt-[72px] px-6",
        "transform transition-transform duration-500 ease-out",

        // MOBILE: from top
        // DESKTOP: from left
        isOpen ? "translate-y-0" : "-translate-y-full",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <nav className="space-y-6 mt-6">
        <Link
          href="/en"
          className="block uppercase tracking-[0.14em] hover:underline"
          onClick={onClose}
        >
          Home
        </Link>
        <Link
          href="/en/about"
          className="block uppercase tracking-[0.14em] hover:underline"
          onClick={onClose}
        >
          About
        </Link>
        <Link
          href="/en/rooms"
          className="block uppercase tracking-[0.14em] hover:underline"
          onClick={onClose}
        >
          Rooms
        </Link>
        <Link
          href="/en/location"
          className="block uppercase tracking-[0.14em] hover:underline"
          onClick={onClose}
        >
          Location
        </Link>
        <Link
          href="/en/contact"
          className="block uppercase tracking-[0.14em] hover:underline"
          onClick={onClose}
        >
          Contact
        </Link>
      </nav>
    </div>
  );
};

export default MobileNavigation;
