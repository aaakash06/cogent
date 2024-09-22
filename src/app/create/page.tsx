import PostForm from "@/components/shared/PostForm";
import { getUserByClerkId } from "@/database/actions.db";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const Create = async () => {
  const { userId } = auth();
  const dbUser = await getUserByClerkId(userId!);
  return (
    <div className="my-10 max-sm:my-2 ">
      <PostForm dbUserId={JSON.stringify(dbUser._id)} type="submit"></PostForm>
    </div>
  );
};

export default Create;
