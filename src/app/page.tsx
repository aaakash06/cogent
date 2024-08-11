import { Input } from "@/components/ui/input";
import { categories, capitalizeFirstLetter } from "@/lib/categories";
import { useRef, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllPosts } from "@/database/actions.db";
import PostCarts from "@/components/PostCarts";
import { IPost, postSchema } from "@/database/models.db";

const Home = async () => {
  // const searchParams = useSearchParams();
  // const category = searchParams.get("category") || "all";
  // const search = useRef("");
  const category = "all";
  //@ts-ignore
  const posts: IPost[] = await getAllPosts()!;
  // console.log(posts);

  // getAllPosts().then((data) => {
  //   const { allPosts } = data!;
  //   dataRef.current = allPosts;
  //   setLoading(false);
  // });

  // const [searchRes, setSearchRes] = useState<
  //   | null
  //   | {
  //       _id: string;
  //       title: string;
  //     }[]
  // >(null);
  // const searchHandler = async () => {
  //   // const res = await fetchData(`/search/${search.current.value}`);

  //   await new Promise((r) => {
  //     setTimeout(r, 2000);
  //   });
  //   const res = [
  //     { _id: "123", title: "belori" },
  //     { _id: "124", title: "tyappe" },
  //     { _id: "122", title: "tyappe" },
  //     { _id: "1", title: "tyappe" },
  //     { _id: "123", title: "belori" },
  //     { _id: "124", title: "tyappe" },
  //     { _id: "122", title: "tyappe" },
  //     { _id: "1", title: "tyappe" },
  //   ];
  //   setSearchRes(res);
  //   res && res.length > 0 && setIsFocused(true);
  // };
  // const [isFocused, setIsFocused] = useState(false);
  // const handleInputBlur = () => {
  //   setTimeout(() => {
  //     setIsFocused(false);
  //   }, 200);
  //   // const data = [
  //   //   { _id: "123", title: "belori" },
  //   //   { _id: "124", title: "tyappe" },
  //   //   { _id: "122", title: "tyappe" },
  //   //   { _id: "1", title: "tyappe" },
  //   //   { _id: "123", title: "belori" },
  //   //   { _id: "124", title: "tyappe" },
  //   //   { _id: "122", title: "tyappe" },
  //   //   { _id: "1", title: "tyappe" },
  //   // ];
  // };
  return (
    <div className="flex flex-col items-center justify-center w-full ">
      {/* <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] -z-10 h-full w-full  bg-[size:6rem_4rem] opacity-[0.05]" /> */}
      <div className="absolute top-0 z-[-2] min-h-screen w-[97%] bg-[radial-gradient(#ffffff33_1px,#010816_1px)] bg-[size:20px_20px] opacity-[0.6]" />
      <div className="absolute size-96 bg-neutral-700 top-0 rounded-full blur-[150px] -z-50 " />
      <div className="my-[150px] sm:my-40 flex flex-col gap-14 items-center justify-center text-center">
        <h1 className="text-5xl md:w-[75%] md:text-6xl xl:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 leading-tight px-4 md:px-0">
          Start Sharing Your Voice Today!
        </h1>
        <p className="w-11/12 md:w-[70%] sm:text-xl text-slate-400">
          Ignite your passion for writing and share your voice with the world
          through our{" "}
          <span className="text-slate-100">intuitive blogging platform.</span>{" "}
          Unleash your creativity and join a community of fellow bloggers today.
        </p>
        <div className="w-4/5 md:w-[40%] relative">
          <Input
            type="text"
            placeholder="Search Blogs"
            className="rounded-xl h-12 bg-transparent backdrop-blur-sm"
            // ref={search}
            // onChange={searchHandler}
            // onFocus={() => setIsFocused(true)}
            // onBlur={handleInputBlur}
          />
          <BiSearchAlt className="absolute h-11 top-1 right-5 text-xl" />
          {/* {searchRes && searchRes.length > 0 && isFocused && (
            <motion.div
              className="absolute backdrop-blur-xl bg-slate-950 mt-5 p-5 rounded-xl max-h-80 overflow-y-scroll"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
            >
              <ul className="w-[30rem] flex flex-col gap-2 items-start">
                {searchRes.map((blogs) => {
                  return (
                    <li
                      key={blogs._id}
                      className="p-2 rounded-xl hover:bg-white hover:text-black flex items-center h-10 text-left"
                    >
                      <Link
                        href={`/blogs/${blogs._id}`}
                        className="cursor-pointer flex gap-2 items-center"
                      >
                        <BiSearchAlt />
                        <p className="line-clamp-1">{blogs.title}</p>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          )} */}
        </div>
      </div>
      <div className="space-y-10 w-[80%] md:w-[50rem] xl:w-[80rem]" id="blogs">
        <h1 className="text-3xl sm:text-4xl">Categories</h1>
        <ul className="flex gap-4 flex-wrap leading-loose">
          {categories.map((items, index) => {
            return (
              <li key={index}>
                <Link
                  href={`/?category=${items}`}
                  className={`px-4 py-[6px] shadow-md rounded-full cursor-pointer ${
                    category === items
                      ? "bg-white text-black"
                      : "text-white bg-zinc-800"
                  }`}
                >
                  {capitalizeFirstLetter(items)}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <PostCarts posts={JSON.stringify(posts)}></PostCarts>
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
