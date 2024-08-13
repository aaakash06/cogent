// import React from "react";
// import Tag from "./Tag";
// import Image from "next/image";
// import { getTimeAgo, formatNumber } from "@/utils/helper"
// import { IQuestion, ITag } from "@/database/model.db";
// import { deleteItem, getUserById } from "@/database/actions.db";
// import mongoose from "mongoose";
// import Link from "next/link";
// import { SignIn, SignedIn, auth } from "@clerk/nextjs";
// import EditQuestionAnswer from "@/components/EditQuestionAnswer";

// export type PostType = {
//   _id: mongoose.Schema.Types.ObjectId;
//   title: string;
//   content: string;
//   tags: ITag[];
//   views: number;
//   upvotes: mongoose.Schema.Types.ObjectId[];
//   downvotes: mongoose.Schema.Types.ObjectId[];
//   author: mongoose.Schema.Types.ObjectId;
//   answers: mongoose.Schema.Types.ObjectId[];
//   createdAt: Date;
// };

// interface Prop {
//   post: PostType;
//   edit?: boolean;
// }

// const Cart = async ({ post, edit = false }: Prop) => {
//   const { userId } = auth();
//   const author: any = await getUserById(post.author!);
//   const authName: string = author?.name;

//   const editCondition = edit && userId == author.clerkId;

//   return (
//     <div className="flex flex-col gap-5 p-7 max-sm:px-4  background-light900_dark200 rounded-lg shadow-md  ">
//       <div className="flex items-center gap-1 md:hidden ">
//         {author && (
//           <Image
//             alt="avatar"
//             className="rounded-full"
//             src={author.picture}
//             width={25}
//             height={20}
//           ></Image>
//         )}

//         <span>
//           {authName || "Deleted"}
//           <span className="">
//             {" "}
//             - asked {getTimeAgo(post.createdAt)}
//           </span>{" "}
//         </span>
//       </div>

//       <div className="flex justify-between">
//         <h2 className="text-lg tracking-tighter max-sm:text-[18x] line-clamp-1 h3-semi-bold">
//           {" "}
//           <Link
//             className="hover:text-primary-500"
//             href={`/posts/${post._id}`}
//           >
//             {" "}
//             {post.title}{" "}
//           </Link>{" "}
//         </h2>
//         <SignedIn>
//           {editCondition && (
//             <EditpostAnswer
//               id={JSON.stringify(post._id)}
//               type="post"
//             ></EditpostAnswer>
//           )}
//         </SignedIn>
//       </div>

//       <div className="tags flex gap-3 max-sm:mr-4">
//         {post.tags.map((tag) => (
//           <Tag
//             key={tag.name}
//             item={tag}
//             rounded="sm"
//             otherStyle="max-sm:px-[10px]   min-w-[4rem] px-1 py-[.05rem] max-sm:text-[10px]"
//           />
//         ))}
//       </div>

//       <div className="bottom flex justify-between flex-wrap gap-y-5">
//         <div className="flex items-center gap-1 max-md:hidden ">
//           {author && (
//             <Image
//               alt="avatar"
//               className="rounded-full"
//               src={author.picture}
//               width={25}
//               height={20}
//             ></Image>
//           )}

//           <span className="">
//             {" "}
//             {authName || "Deleted"}{" "}
//             <span className="">- asked {getTimeAgo(post.createdAt)}</span>{" "}
//           </span>
//         </div>

//         <div className="stats flex gap-2 items-center max-sm:gap-[15px]">
//           <div className="like flex gap-1">
//             <Image
//               src="/assets/icons/like.svg"
//               width={15}
//               height={15}
//               alt="like-svg"
//             />
//             <span> {formatNumber(post.upvotes.length)} votes</span>
//           </div>
//           <div className="like flex gap-1">
//             <Image
//               src="/assets/icons/message.svg"
//               width={15}
//               height={15}
//               alt="like-svg"
//             />
//             <span>{formatNumber(post.answers.length)} Answers</span>
//           </div>
//           <div className="like flex gap-1">
//             <Image
//               src="/assets/icons/eye.svg"
//               width={15}
//               height={15}
//               alt="like-svg"
//             />
//             <span> {formatNumber(post.views)} views</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;
