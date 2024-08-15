// "use client";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-10 sm-[] md:w-[45rem] lg:w-[60rem] w-full flex flex-col items-center">
      <hr className="w-full" />
      <div className="py-10 px-10 sm:px-0 flex flex-col sm:flex-row gap-4 sm:gap-0 justify-evenly w-full sm:items-center dark:text-slate-400">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold dark:text-slate-100">Cogent</h1>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link href="/">Home</Link>
            <Link href="/sign-up">Sign Up</Link>
            <Link href="/sign-in">Login</Link>
            {/* <Link href="/users">Creators</Link> */}
            <Link href="/create">Create</Link>
          </div>
        </div>
        <hr className="border-gray-600" />
        <p>© 2024 by Cogent. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
