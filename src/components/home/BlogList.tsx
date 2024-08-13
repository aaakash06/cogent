"use client";
import BlogCard from "./BlogCard";

import { Fragment } from "react";
import { Blog } from "@/utils/type";

const BlogList = ({ blogs }: { blogs: string }) => {
  const blogss: Blog[] = JSON.parse(blogs);
  // const blogs = [
  //   {
  //     title: "First Post",
  //     description: "What do I do",
  //     date: "2024-08-13",
  //     category: "Tech",
  //     imageUrl: "https://via.placeholder.com/150",
  //   },
  //   {
  //     title: "First Post",
  //     description: "What do I do",
  //     date: "2024-08-13",
  //     category: "Tech",
  //     imageUrl: "https://via.placeholder.com/150",
  //   },
  //   {
  //     title: "First Post",
  //     description: "What do I do",
  //     date: "2024-08-13",
  //     category: "Tech",
  //     imageUrl: "https://via.placeholder.com/150",
  //   },
  //   // ...more blog posts
  // ];

  return (
    <div className="flex flex-col gap-5 w-full">
      {blogss.map((blog, index) => (
        <Fragment key={index}>
          <BlogCard blog={blog} />
        </Fragment>
      ))}
    </div>
  );
};

export default BlogList;
