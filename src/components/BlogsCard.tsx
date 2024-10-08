/* eslint-disable react/prop-types */
"use client";
import { IPost } from "@/database/models.db";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const BlogsCard = ({ data }: { data: IPost }) => {
  const date = data.createdAt;
  const router = useRouter();

  return (
    <motion.div
      className="w-4/5 md:w-[25rem] flex flex-col rounded-xl mb-20 bg-black"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring" }}
    >
      <Image
        src={data.img!}
        alt="thubmnail"
        className="aspect-video rounded-md cursor-pointer"
        width={40}
        height={40}
        onClick={() => router.push(`/blogs/${data._id}`)}
      />
      <div className="flex flex-col gap-2 py-6 px-5">
        <span className="py-1 px-4 bg-zinc-800 w-[fit-content] rounded-full text-white text-sm">
          {/* {data.categories data.category.toUpperCase()} */}
        </span>
        <h1
          className="text-2xl hover:underline cursor-pointer line-clamp-2"
          onClick={() => router.push(`/blogs/${data._id}`)}
        >
          {data.title}
        </h1>
        <Link
          className="text-gray-600 hover:underline"
          href={`/users/${data.author}`}
        >
          @{JSON.stringify(data.author)}
        </Link>
        {/* <span className="text-gray-600">{date && date.toString}</span> */}
      </div>
    </motion.div>
  );
};

export default BlogsCard;
