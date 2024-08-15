import { getAllPosts, getPostById, getUserById } from "@/database/actions.db";
import React from "react";
import Image from "next/image";
import parse from "html-react-parser/lib/index";
import { getTimeAgo } from "@/utils/helper";

const BlogPage = async ({ params }: { params: { id: string } }) => {
  const blog = await getPostById(params.id);
  const author: any = await getUserById(blog.author!);
  return (
    <section className=" bg-light-700 py-10 ">
      <div className="pl-10">
        {" "}
        <h1 className="text-3xl font-spaceGrotesk font-bold">{blog.title}</h1>
      </div>
      <div className="px-10 mt-5 flex justify-between">
        <div className="flex gap-2 items-center">
          <Image
            alt="avatar"
            src={author.picture}
            width={22}
            height={22}
            className="
      rounded-full"
          ></Image>
          <span className="text-[12px] font-poppins">{author.name}</span>
        </div>
        <span className="text-[12px] font-poppins">
          - {getTimeAgo(blog.createdAt)}
        </span>
      </div>
      <div className="flex justify-center thumnail mt-5">
        <div className=" relative h-80 w-80 ">
          <Image
            alt="thumnail"
            className="object-contain"
            src={blog.img}
            fill
          ></Image>
        </div>
      </div>
      <div className="font-inter  mt-5 pl-10">{parse(blog.content)}</div>
    </section>
  );
};

export default BlogPage;
