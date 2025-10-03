import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiNews } from "react-icons/bi";
import { TbChartCandle } from "react-icons/tb";
import { FaPencilAlt } from "react-icons/fa";

const ArticlesMenuItems = ({ isMobile }: { isMobile: boolean }) => {
  return (
    <>
      <Link
        href="/news"
        className={`text-nowrap flex items-center gap-2 text-text-main hover:text-orange px-3 py-4 text-sm font-medium transition-all hover:text-primary ${
          isMobile ? "justify-center sm:justify-start" : ""
        }`}
      >
        <BiNews className="w-6 h-6" />
        <span>News</span>
      </Link>
      <Link
        href="/fundamental"
        className={`text-nowrap flex items-center gap-2 text-text-main hover:text-orange px-3 py-4 text-sm font-medium transition-all hover:text-primary ${
          isMobile ? "justify-center sm:justify-start" : ""
        }`}
      >
        <TbChartCandle className="w-6 h-6" />
        <span> Fundamental Analysis</span>
      </Link>
      <Link
        href="/blog"
        className={`text-nowrap flex items-center gap-2 text-text-main hover:text-orange px-3 py-4 text-sm font-medium transition-all hover:text-primary ${
          isMobile ? "justify-center sm:justify-start" : ""
        }`}
      >
        <FaPencilAlt className="w-6 h-6" />
        <span>Blog</span>
      </Link>
    </>
  );
};

const MobileArticlesMenu = ({
  articlesMenuOpen,
}: {
  articlesMenuOpen: boolean;
}) => {
  return (
    <div
      className={`flex flex-col w-100 transition-all duration-200 ease-in-out ${
        articlesMenuOpen
          ? "relative h-auto pointer-events-auto opacity-100 translate-y-0"
          : "relative h-0 pointer-events-none opacity-0 -translate-y-[20%]"
      }`}
    >
      <ArticlesMenuItems isMobile={true} />
    </div>
  );
};

const DesktopArticlesMenu = ({
  articlesMenuOpen,
}: {
  articlesMenuOpen: boolean;
}) => {
  return (
    <div
      className={`absolute bottom-0 bg-background rounded-md shadow-text-muted shadow-lg p-2 flex flex-col transition-all duration-200 ease-in-out ${
        articlesMenuOpen
          ? "pointer-events-auto opacity-100 translate-y-[calc(100%+1rem)]"
          : "pointer-events-none opacity-0 translate-y-[calc(80%-1rem)]"
      }`}
    >
      <ArticlesMenuItems isMobile={false} />
    </div>
  );
};

export const ArticlesMenuButton = ({ isMobile }: { isMobile: boolean }) => {
  const [articlesMenuOpen, setArticlesMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const toggleArticlesMenu = () => setArticlesMenuOpen((open) => !open);
  const closeArticlesMenu = () => setArticlesMenuOpen(false);
  const openArticlesMenu = () => setArticlesMenuOpen(true);

  // Avoid hover-triggered state changes during hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  if (isMobile) {
    return (
      <div
        onClick={toggleArticlesMenu}
        className="flex flex-col gap-2 items-center sm:items-start text-text-main hover:text-orange py-2 text-base font-medium cursor-pointer"
      >
        <div className="flex items-center gap-1 justify-center sm:justify-start">
          <span>Articles</span>
          <ChevronDown
            className={`h-4 w-4 text-text-main transition transform duration-300 ease-in-out ${
              articlesMenuOpen ? "rotate-180" : ""
            }`}
          />
        </div>
        <MobileArticlesMenu articlesMenuOpen={articlesMenuOpen} />
      </div>
    );
  }

  return (
    <>
      <div
        onMouseEnter={mounted ? openArticlesMenu : undefined}
        onMouseLeave={mounted ? closeArticlesMenu : undefined}
        className="relative h-full justify-center flex flex-col hover:text-orange py-2 text-sm font-medium cursor-pointer"
      >
        <div className="flex gap-2 items-center">
          <span>Articles</span>
          <ChevronDown
            className={`h-4 w-4 transition transform duration-300 ease-in-out ${
              articlesMenuOpen ? "rotate-180" : ""
            }`}
          />
          <div
            onMouseOver={mounted ? openArticlesMenu : undefined}
            className="h-full w-[120%] absolute translate-y-4"
          />
          {mounted && (
            <DesktopArticlesMenu articlesMenuOpen={articlesMenuOpen} />
          )}
        </div>
      </div>
    </>
  );
};

export default ArticlesMenuButton;
