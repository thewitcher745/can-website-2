import Link from "next/link";

import ArticlesMenuButton from "./ArticlesMenu";

const DesktopNav = () => {
  return (
    <div className="hidden md:ml-6 md:flex md:items-center md:space-x-8 mr-4">
      <Link
        href="/coins/overview"
        className="text-text-main hover:text-orange px-3 py-2 text-sm font-medium"
      >
        Cryptocurrencies
      </Link>
      <Link
        href="/analysis"
        className="text-text-main hover:text-orange px-3 py-2 text-sm font-medium"
      >
        Analysis
      </Link>
      <Link
        href="/results"
        className="text-text-main hover:text-orange px-3 py-2 text-sm font-medium"
      >
        Results
      </Link>
      <ArticlesMenuButton isMobile={false} />
      <Link
        href="https://t.me/CryptoANalysis_CAN"
        className=" hover:text-orange-500 underline text-text-main px-4 py-2 rounded-md text-sm font-medium hover:bg-orange transition"
      >
        Contact Us
      </Link>
    </div>
  );
};

export default DesktopNav;
