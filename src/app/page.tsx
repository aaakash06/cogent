import { Input } from "@/components/ui/input";
import { categories, capitalizeFirstLetter } from "@/lib/categories";
import { BiSearchAlt } from "react-icons/bi";
import { getAllPosts } from "@/database/actions.db";
import PostCarts from "@/components/home/PostCarts";
import { IPost } from "@/database/models.db";
import Link from "next/link";
import Footer from "@/components/Footer";

const Home = async () => {
  const category = "all";
  //@ts-ignore
  const posts: IPost[] = await getAllPosts()!;

  return (
    <div className="flex flex-col items-center justify-center w-full ">
      {/* <div className="absolute top-0 z-[-2] min-h-full w-[100%] bg-[radial-gradient(#ffffff33_1px,#010816_1px)] bg-[size:20px_20px] opacity-[0.6]" /> */}
      {/* <div className="absolute size-96 bg-neutral-700 top-0 rounded-full blur-[150px] -z-50 " /> */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-100"></div> */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter opacity-70 animate-blob animation-delay-4000"></div>
      </div>
      <div className="my-[60px] sm:my-40 flex flex-col gap-14 items-center justify-center text-center ">
        <h1 className="text-5xl md:w-[75%] md:text-6xl xl:text-7xl font-bold bg-clip-text dark:text-transparent dark:bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 leading-tight px-4 md:px-0">
          Start Sharing Your Voice Today!
        </h1>

        <p className="w-11/12 md:w-[70%] sm:text-xl dark:text-slate-400 ">
          Ignite your passion for writing and share your voice with the world
          through our{" "}
          <span className="dark:text-slate-100">
            intuitive blogging platform.
          </span>{" "}
          Unleash your creativity and join a community of fellow bloggers today.
        </p>
        <div className="w-4/5 md:w-[40%] relative">
          <Input
            type="text"
            placeholder="Search Blogs"
            className="rounded-xl h-12 bg-transparent backdrop-blur-sm"
          />
          <BiSearchAlt className="absolute h-11 top-1 right-5 text-xl" />
        </div>
      </div>
      {/* <div
        className="space-y-10 w-full md:w-[45rem] lg:w-[60rem] xl:w-[70rem]"
        id="blogs"
      >
        <h1 className="text-3xl sm:text-4xl">Categories</h1>
        <ul className="flex gap-4 flex-wrap leading-loose">
          {categories.map((item, index) => {
            return (
              <li key={index}>
                <Link
                  href={`/?category=${item}`}
                  className={`px-4 py-[6px] shadow-md rounded-full cursor-pointer ${
                    category === item
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
      </div> */}
      {/* <PostCarts posts={JSON.stringify(posts)}></PostCarts> */}
      <Footer />
    </div>
  );
};

export default Home;
