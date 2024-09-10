"use client";
import { deleteItem } from "@/database/actions.db";
import { Trash2 } from "lucide-react";
import React from "react";

const DeleteItem = ({ id }: { id: string }) => {
  return (
    <Trash2
      onClick={async () => {
        await deleteItem(id, "post");
      }}
      className="absolute w-5 h-5 hover:text-black transition-all ease-in-out text-red-900 cursor-pointer top-2 right-2 "
    ></Trash2>
  );
};

export default DeleteItem;
