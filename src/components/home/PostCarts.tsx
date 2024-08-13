"use client";
import styles from "./card.module.css";
import Image from "next/image";
import Link from "next/link";
import ParseHTML from "../ParseHTML";

const PostCarts = ({ posts }: { posts?: string }) => {
  posts = JSON.parse(posts!);

  return (
    <div className="flex flex-col items-start  w-full gap-10 mt-20 ">
      {posts && posts.length > 0 ? (
        //@ts-ignore
        posts.map((item, index) => {
          return (
            <div
              className="border-white border-2 w-full flex items-center mb-[50px] gap-[50px]"
              key={item._id}
            >
              {item.img && (
                <div className="image  border-white relative flex-1 h-[250px]">
                  <Image
                    alt="thumbnail"
                    src={item.img}
                    className="object-contain"
                    fill
                  ></Image>
                </div>
              )}
              <div className="flex-1 flex flex-col gap-[30px]">
                <div className={styles.detail}>
                  <span className="text-gray-500">
                    date
                    {/* {item.createdAt.substring(0, 10)} -{" "} */}
                  </span>
                  <span className="text-red-600 font-bold">
                    {item.catSlug} haha
                  </span>
                </div>
                <Link href={`/posts/${item.slug}`}>
                  <h1>{item.title}</h1>
                </Link>

                {/* {item.desc.substring(0, 60)} */}
                <ParseHTML content={item.content}></ParseHTML>

                <div
                  className={styles.desc}
                  // dangerouslySetInnerHTML={{
                  //   __html: item?.desc.substring(0, 60),
                  // }}
                />
                <Link href={`/posts/${item.slug}`} className={styles.link}>
                  Read More
                </Link>
              </div>
            </div>
          );
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
