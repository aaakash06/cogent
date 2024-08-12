"use client";
import { IPost } from "@/database/models.db";
import { useState } from "react";
import { Skeleton } from "./ui/skeleton";
import BlogsCard from "./BlogsCard";
import CardComponent from "./Card";

const PostCarts = ({ posts }: { posts?: string }) => {
  posts = JSON.parse(posts!);
  const [loading] = useState<boolean>(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 justify-items-center mt-20 ">
      {loading ? (
        Array.from({ length: 9 }).map((items, index) => {
          return (
            <div
              className="flex flex-col space-y-3 px-3 w-[80vw] md:w-[25rem]"
              key={index}
            >
              <Skeleton className="h-[12rem] md:h-[14rem] w-full rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-4/5" />
                <div className="flex gap-2">
                  <Skeleton className="size-10 rounded-full" />
                  <div className="w-3/5 space-y-2">
                    <Skeleton className="w-3/5 h-3 " />
                    <Skeleton className="w-2/5 h-3   " />
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : posts && posts.length > 0 ? (
        posts.map((items) => {
          return <CardComponent></CardComponent>;
          // return <BlogsCard key={items._id} data={items} />;
        })
      ) : (
        <div className="col-span-3 flex justify-center items-center">
          <h1>Cannot find any blog.</h1>
        </div>
      )}
    </div>
  );
};

export default PostCarts;
