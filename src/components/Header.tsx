"use client";
import Link from "next/link";
import { Link as LinkS } from "react-scroll";
import { SignedIn, UserButton, useSession, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

export const Header = () => {
  const user = useUser();
  const pathname = usePathname();

  return (
    <header className="flex items-center justify-between py-10">
      <div>
        <Link href="/">
          <div className="flex items-center justify-between">
            <div className="hidden  text-2xl font-semibold sm:block bg-">
              <h1 className="text-4xl font-spaceGrotesk font-extrabold text-gray-800 tracking-tight">
                Cogent
              </h1>
            </div>
          </div>
        </Link>
      </div>
      <div className="flex font-poppins items-center space-x-4 leading-5 sm:space-x-6">
        {pathname == "/" ? (
          <LinkS
            className="hidden font-medium text-gray-900 dark:text-gray-100 sm:block cursor-pointer"
            to="blogs"
            smooth={true}
            duration={500}
          >
            Blog
          </LinkS>
        ) : (
          <Link
            className="hidden font-medium text-gray-900 dark:text-gray-100 sm:block cursor-pointer"
            href="/"
          >
            Blog
          </Link>
        )}

        <Link
          key={"create"}
          href={"/create"}
          className="hidden font-medium text-gray-900 dark:text-gray-100 sm:block"
        >
          Create
        </Link>

        {!user.isSignedIn && (
          <>
            <Link
              key={"sign-in"}
              href={"/sign-in"}
              className="hidden font-medium text-gray-900 dark:text-gray-100 sm:block"
            >
              Login
            </Link>

            <Link
              key={"sign-up"}
              href={"/sign-up"}
              className="hidden font-medium text-gray-900 dark:text-gray-100 sm:block"
            >
              Register
            </Link>
          </>
        )}

        <SignedIn>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-7 w-7",
              },
              variables: {
                colorPrimary: "#FF7000",
              },
            }}
          ></UserButton>
        </SignedIn>
      </div>
    </header>
  );
};

export default Header;
