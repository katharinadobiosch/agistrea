"use client";

import Link from "next/link";

type DesktopNavigationProps = {
  isOpen: boolean;
  onClose: () => void;
};

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <div
      className={[
        "desktop-navigation",
        "hidden lg:block",
        "fixed top-0 left-[0px] h-screen w-[100%] z-40",
        "bg-slate-900/95 text-white",
        "pt-[100px] pl-[130px]",
        "transform transition-transform duration-500 ease-out",
        isOpen ? "translate-x-0" : "-translate-x-full",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <nav className="space-y-4 text-lg">
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

export default DesktopNavigation;
