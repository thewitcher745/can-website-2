import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import DesktopNav from "./DesktopNav";
import MobileNav, { MobileNavButton } from "./MobileNav";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);
  const handleToggle = () => setMenuOpen((open) => !open);

  return (
    <nav
      className={`fixed px-6 w-full z-90 shadow-lg border-b-2 border-orange-400 transition-colors duration-300 bg-background flex justify-center`}
    >
      <div className="2xl:max-w-[100rem] xl:max-w-7xl max-w-6xl w-full px-2">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div
              className={
                "flex -translate-x-1/2 sm:translate-x-0 sm:relative flex-shrink-0 items-center absolute left-1/2 sm:left-auto transform " +
                (menuOpen ? "hidden" : "")
              }
            >
              <Link
                href="/"
                className="flex items-center gap-2 text-2xl font-bold gradient-text text-text-muted"
                onClick={closeMenu}
              >
                <Image
                  src="/images/logos/can-logo.png"
                  alt="CAN Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                  priority
                />
                <span>CAN</span>
              </Link>
            </div>
          </div>
          <DesktopNav />
          <MobileNavButton menuOpen={menuOpen} handleToggle={handleToggle} />
        </div>
      </div>
      <MobileNav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <style jsx global>{`
        @keyframes slideDownFadeIn {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDownFadeIn {
          animation: slideDownFadeIn 0.35s cubic-bezier(0.4, 0, 0.2, 1) both;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
