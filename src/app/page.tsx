import { Input } from "@/components/ui/input";
import { categories, capitalizeFirstLetter } from "@/lib/categories";
import { BiSearchAlt } from "react-icons/bi";
import { getAllPosts } from "@/database/actions.db";
import Link from "next/link";
import Footer from "@/components/Footer";
import Image from "next/image";
import BlogList from "@/components/home/BlogList";
import { Blog } from "@/utils/type";

const Home = async ({
  searchParams,
}: {
  searchParams: { q: string; category?: string; page: string };
}) => {
  // const category = "all";
  //@ts-ignore
  const posts: Blog[] = await getAllPosts(
    searchParams.q,
    searchParams.category,
    +searchParams.page
  )!;
  const noPosts = posts.length;

  return (
    <div className="flex flex-col items-center justify-center w-full ">
      {/* <div className="absolute top-0 z-[-2] min-h-full w-[100%] bg-[radial-gradient(#ffffff33_1px,#010816_1px)] bg-[size:20px_20px] opacity-[0.6]" /> */}
      {/* <div className="absolute size-96 bg-neutral-700 top-0 rounded-full blur-[150px] -z-50 " /> */}
      <div className="absolute -z-10 inset-0 overflow-hidden pointer-events-none bg-gray-50">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute w-60 h-60 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full mix-blend-multiply filter  opacity-70 animate-floatA"></div>
            <div className="absolute top-[10rem] right-0 w-96 h-96 bg-gradient-to-br from-pink-700 to-red-700 rounded-full mix-blend-multiply filter  opacity-70 animate-floatB animation-delay-2000"></div>
          </div>
          <div className="absolute inset-0 bg-grid-indigo-100/[0.03] bg-[size:20px_20px]"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80"></div>
      </div>

      <div className="my-[60px] sm:my-40 flex flex-col gap-14 items-center justify-center text-center ">
        <h1 className="text-5xl md:w-[75%] md:text-6xl xl:text-7xl font-bold bg-clip-text dark:text-transparent  dark:bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 leading-tight px-4 md:px-0  font-inter">
          Start Sharing Your Voice Today!
        </h1>

        <p className="w-11/12 font-inter md:w-[70%] sm:text-xl dark:text-slate-400 ">
          Ignite your passion for writing and share your voice with the world
          through our{" "}
          <span className="dark:text-slate-100">
            intuitive blogging platform.
          </span>{" "}
          Unleash your creativity and join a community of fellow bloggers today.
        </p>
        {/* <div className="w-4/5 md:w-[40%] relative">
          <Input
            type="text"
            placeholder="Search Blogs"
            className="rounded-xl h-12 bg-transparent backdrop-blur-sm"
          />
          <BiSearchAlt className="absolute h-11 top-1 right-5 text-xl" />
        </div> */}
      </div>
      <div
        className="space-y-10 w-full md:w-[45rem] mb-20 max-sm:mb-10 lg:w-[60rem] xl:w-[70rem] "
        id="blogs"
      >
        <h1 className="text-3xl sm:text-4xl">Categories</h1>
        <ul className="flex gap-4 max-sm:gap-2 flex-wrap leading-loose font-poppins">
          {categories.map((item, index) => {
            return (
              <li key={index}>
                <Link
                  href={`/?category=${item}`}
                  className={`px-4 py-[6px] max-sm:text-[12px] shadow-md rounded-full cursor-pointer ${
                    (searchParams.category?.toUpperCase() || "ALL") ===
                    item.toUpperCase()
                      ? "bg-white text-black"
                      : "text-white bg-zinc-800"
                  }`}
                >
                  {capitalizeFirstLetter(item)}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      {noPosts > 0 ? (
        <div className="w-full md:w-[45rem] mb-20 lg:w-[60rem] xl:w-[70rem] flex justify-center">
          <BlogList blogs={JSON.stringify(posts)}></BlogList>
        </div>
      ) : (
        <div className="">No posts found</div>
      )}

      <Footer />
    </div>
  );
};

export default Home;
