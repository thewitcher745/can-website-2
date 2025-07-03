import React, { useState } from "react";
import { HiX, HiMenu } from "react-icons/hi";
import Link from "next/link";
import Image from "next/image";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggle = () => setMenuOpen((open) => !open);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav
      className={`fixed w-full z-50 shadow-lg border-b-2 border-orange-400 transition-colors duration-300 bg-background`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex sm:translate-x-0 sm:relative flex-shrink-0 items-center absolute left-1/2 transform -translate-x-1/2">
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
          {/* Desktop Nav */}
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-8">
            <Link
              href="/#home"
              className="text-text-main hover:text-orange px-3 py-2 text-sm font-medium"
            >
              Home
            </Link>
            <Link
              href="/#services"
              className="text-text-main hover:text-orange px-3 py-2 text-sm font-medium"
            >
              Services
            </Link>
            <Link
              href="/analysis"
              className="text-text-main hover:text-orange px-3 py-2 text-sm font-medium"
            >
              Analysis
            </Link>
            <Link
              href="/#results"
              className="text-text-main hover:text-orange px-3 py-2 text-sm font-medium"
            >
              Results
            </Link>
            <Link
              href="/#pricing"
              className="text-text-main hover:text-orange px-3 py-2 text-sm font-medium"
            >
              Pricing
            </Link>
            <Link
              href="/blog"
              className="text-text-main hover:text-orange px-3 py-2 text-sm font-medium"
            >
              Blog
            </Link>
            <Link
              href="https://t.me/CryptoANalysis_CAN"
              className="text-primary hover:text-orange-500 underline text-text-main px-4 py-2 rounded-md text-sm font-medium hover:bg-orange transition"
            >
              Contact Us
            </Link>
          </div>
          {/* Mobile menu button */}
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
        </div>
      </div>
      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden bg-off-black px-4 pb-4 pt-2 shadow-lg border-b border-border-strong animate-slideDownFadeIn">
          <div className="flex flex-col space-y-2">
            <Link
              href="/#home"
              className="text-text-main hover:text-orange py-2 text-base font-medium"
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              href="/#services"
              className="text-text-main hover:text-orange py-2 text-base font-medium"
              onClick={closeMenu}
            >
              Services
            </Link>
            <Link
              href="/analysis"
              className="text-text-main hover:text-orange py-2 pb-4 text-base font-medium"
              onClick={closeMenu}
            >
              Analysis
            </Link>
            <Link
              href="/#results"
              className="text-text-main hover:text-orange py-2 text-base font-medium"
              onClick={closeMenu}
            >
              Results
            </Link>
            <Link
              href="/#pricing"
              className="text-text-main hover:text-orange py-2 text-base font-medium"
              onClick={closeMenu}
            >
              Pricing
            </Link>
            <Link
              href="/blog"
              className="text-text-main hover:text-orange py-2 pb-4 text-base font-medium"
              onClick={closeMenu}
            >
              Blog
            </Link>
            <Link
              href="https://t.me/CryptoANalysis_CAN"
              className="text-primary hover:text-orange-500 text-text-main py-2 pt-4 border-t-1 text-center text-base font-medium hover:bg-orange transition"
              onClick={closeMenu}
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
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
