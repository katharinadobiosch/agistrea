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
        "fixed inset-0 z-40 lg:hidden", // nur mobile
        "bg-slate-900 text-white",
        "pt-[72px] px-6", // Platz für den Header
        "transform transition-transform duration-500 ease-out",
        isOpen ? "translate-y-0" : "-translate-y-full",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Menu Items */}
      <nav className="space-y-4 text-lg">
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
