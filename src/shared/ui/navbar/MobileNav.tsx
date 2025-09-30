import Link from "next/link";
import { HiMenu, HiX } from "react-icons/hi";

import ArticlesMenuButton from "./ArticlesMenu";

export const MobileNavButton = ({
  menuOpen,
  handleToggle,
}: {
  menuOpen: boolean;
  handleToggle: () => void;
}) => {
  return (
    <div className="flex items-center md:hidden">
      <button
        aria-label="Open main menu"
        onClick={handleToggle}
        className="text-text-main hover:text-orange focus:outline-none flex justify-center items-center"
      >
        {menuOpen ? (
          <HiX className="h-6 w-6" />
        ) : (
          <HiMenu className="h-6 w-6" />
        )}
      </button>
    </div>
  );
};

const MobileNav = ({
  menuOpen,
  setMenuOpen,
}: {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}) => {
  const closeMenu = () => setMenuOpen(false);

  return (
    menuOpen && (
      <div
        id="mobile-nav"
        className="md:hidden bg-off-black z-200 px-4 pb-4 pt-2 border-b border-border-strong animate-slideDownFadeIn"
      >
        <div className="flex flex-col space-y-2">
          <Link
            href="/analysis"
            className="flex justify-center sm:justify-start text-text-main hover:text-orange py-2 text-base font-medium"
            onClick={closeMenu}
          >
            Analysis
          </Link>
          <Link
            href="/results"
            className="flex justify-center sm:justify-start text-text-main hover:text-orange py-2 text-base font-medium"
            onClick={closeMenu}
          >
            Results
          </Link>
          <Link
            href="/coins/overview"
            className="flex justify-center sm:justify-start text-text-main hover:text-orange py-2 text-base font-medium"
            onClick={closeMenu}
          >
            Cryptocurrencies
          </Link>
          <ArticlesMenuButton isMobile={true} />
          <Link
            href="https://t.me/CryptoANalysis_CAN"
            className=" hover:text-orange-500 text-text-main py-2 pt-4 border-t-1 text-center text-base font-medium hover:bg-orange transition"
            onClick={closeMenu}
          >
            Contact Us
          </Link>
        </div>
      </div>
    )
  );
};

export default MobileNav;
