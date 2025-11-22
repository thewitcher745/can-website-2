import Link from "next/link";
import { useRouter } from "next/router";
import ArticlesMenuButton from "./ArticlesMenu";

const NavDesktopLink = ({
  href,
  linksToMatch,
  isLink = true,
  children,
}: {
  href: string;
  linksToMatch?: string[] | string;
  isLink?: boolean;
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const currentPath = router.pathname;

  let isCurrentPath = false;
  if (linksToMatch) {
    if (Array.isArray(linksToMatch)) {
      linksToMatch.forEach((link) => {
        if (currentPath.includes(link)) {
          isCurrentPath = true;
        }
      });
    } else {
      isCurrentPath = linksToMatch === currentPath;
    }
  } else {
    isCurrentPath = href === currentPath;
  }

  if (isLink) {
    return (
      <Link
        href={href}
        className={`flex items-center justify-center h-full hover:text-orange sm:px-3 lg:px-6 py-2 text-sm font-medium ${
          isCurrentPath
            ? "border-b-4 text-primary border-orange-400"
            : "text-text-main"
        }`}
      >
        {children}
      </Link>
    );
  } else {
    return (
      <div
        className={`flex items-center justify-center h-full hover:text-orange sm:px-3 lg:px-6 py-2 text-sm font-medium ${
          isCurrentPath
            ? "border-b-4 text-primary border-orange-400"
            : "text-text-main"
        }`}
      >
        {children}
      </div>
    );
  }
};

const DesktopNav = () => {
  return (
    <div className="hidden md:ml-6 md:flex md:items-center mr-6">
      <NavDesktopLink linksToMatch="/coins/[[...tab]]" href="/coins/overview">
        <span className="text-center">Cryptocurrencies</span>
      </NavDesktopLink>
      <NavDesktopLink href="/analysis">
        <span className="text-center">Technical Analysis</span>
      </NavDesktopLink>
      <NavDesktopLink href="/vip">
        <span className="text-center">VIP Signals</span>
      </NavDesktopLink>
      <NavDesktopLink href="/results">
        <span className="text-center">VIP Results</span>
      </NavDesktopLink>
      <NavDesktopLink
        isLink={false}
        linksToMatch={["/news", "/blog", "/fundamental"]}
        href="#"
      >
        <ArticlesMenuButton isMobile={false} />
      </NavDesktopLink>
      <NavDesktopLink href="/telegram">Contact Us</NavDesktopLink>
    </div>
  );
};

export default DesktopNav;
