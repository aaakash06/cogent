import React, { Fragment } from "react";
import Image from "next/image";
import { Blog } from "@/utils/type";
import image from "next/image";
import parse from "html-react-parser";
import { getUserById } from "@/database/actions.db";
import Link from "next/link";
import { htmlToText } from "@/utils/helper";

// const cheerio = require("cheerio");

const BlogCard = async ({ blog }: { blog: Blog }) => {
  const { title, content, createdAt, img } = blog;
  const author: any = await getUserById(blog.author!);
  return (
    <div className="flex flex-col md:flex-row items-start gap-4 py-6 border-b border-gray-200 ">
      <div className="flex-grow flex flex-col md:gap-2">
        <div className="flex items-center mb-2 ">
          <img
            src={author.picture}
            alt={"author_image"}
            className="w-4 h-4 max-sm:w-3 max-sm:h-3  rounded-full mr-2"
          />
          <span className="text-sm  max-md:text-[13px] font-poppins text-gray-600">
            {author.name}
          </span>
        </div>
        <h2 className="text-2xl  max-md:text-[23px] max-sm:text-[20px] font-spaceGrotesk font-bold mb-1">
          {title}
        </h2>

        <p className="text-gray-600 w-full  mb-2 max-md:text-[15px]  font-inter line-clamp-1  break-all ">
          {htmlToText(content)}
        </p>
      </div>
      {img && (
        <div className="w-40 h-40 max-w-40 max-h-40 relative ">
          <Image src={img} alt={title} className=" object-contain" fill />
        </div>
      )}
    </div>
  );
};

const BlogList = ({ blogs }: { blogs: string }) => {
  const blogss: Blog[] = JSON.parse(blogs);
  return (
    <div className="w-full mx-auto  px-4 relative">
      {blogss.map((item, index) => (
        <Fragment key={index}>
          <Link href={`/blog/${item._id}`}>
            <BlogCard blog={item} />
          </Link>
        </Fragment>
      ))}
    </div>
  );
};

export default BlogList;
