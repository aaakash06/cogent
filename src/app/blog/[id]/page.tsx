import {
  deleteItem,
  getAllPosts,
  getPostById,
  getUserById,
} from "@/database/actions.db";
import React from "react";
import Image from "next/image";
import { getTimeAgo, htmlToText } from "@/utils/helper";
import DeleteItem from "@/components/DeleteItem";
import { auth } from "@clerk/nextjs/server";

const BlogPage = async ({ params }: { params: { id: string } }) => {
  const { userId } = auth();
  const blog = await getPostById(params.id);
  if (!blog)
    return (
      <section className="w-full bg-light-500 py-20 text-center text-white text-2xl">
        {" "}
        <h2>No post found with this id</h2>
      </section>
    );
  const author: any = await getUserById(blog.author!);
  return (
    <section className=" bg-light-700 py-10 relative ">
      {userId?.trim() == "user_2kgNAEYs0uKpSpC3g5jZe3WrMnV" && (
        <DeleteItem id={params.id}></DeleteItem>
      )}

      <div className="pl-10 max-sm:pl-5">
        {" "}
        <h1 className="text-3xl max-sm:text-2xl font-spaceGrotesk font-bold">
          {blog.title}
        </h1>
      </div>
      <div className="px-10 max-sm:px-5 mt-5 flex justify-between">
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
      <p className="font-inter break-all  mt-5 pl-10 max-sm:pl-5">
        {htmlToText(blog.content)}
      </p>
    </section>
  );
};

export default BlogPage;
