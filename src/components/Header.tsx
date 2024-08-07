// import Logo from "@/data/logo.svg";
import Link from "next/link";
import MobileNav from "./MobileNav";
import ThemeSwitch from "./ThemeSwitch";
import { IoSearchSharp } from "react-icons/io5";
// import MobileNav from "./MobileNav";
// import ThemeSwitch from "./ThemeSwitch";
// import SearchButton from "./SearchButton";

export const Header = () => {
  const headerNavLinks = [
    { href: "/blog", title: "Blog" },
    { href: "/tags", title: "Tags" },
    { href: "/projects", title: "Projects" },
    { href: "/about", title: "About" },
  ];

  return (
    <header className="flex items-center justify-between py-10">
      <div>
        <Link href="/home">
          <div className="flex items-center justify-between">
            <div className="mr-3">{/* <Logo /> */}</div>

            <div className="hidden h-6 text-2xl font-semibold sm:block">
              COGENT
            </div>
          </div>
        </Link>
      </div>
      <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
        {headerNavLinks
          .filter((link) => link.href !== "/")
          .map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="hidden font-medium text-gray-900 dark:text-gray-100 sm:block"
            >
              {link.title}
            </Link>
          ))}
        <span className="">
          <IoSearchSharp className="w-6 h-6 cursor-pointer" />
        </span>

        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  );
};

export default Header;
