"use server";

import { connectToDB } from "./connect.db";
import { revalidatePath } from "next/cache";
import { Category, ICategory, ObjectIdType, Post, User } from "./models.db";
import { slugify } from "@/utils/slugify";
import { Tag } from "lucide-react";
import { FilterQuery } from "mongoose";
import { categories } from "@/lib/categories";
type PostType = {
  title: string;
  slug: string;
  content: string;
  img: string;
  categories: string[];
  author: string;
};

export async function dummyAction() {
  await connectToDB();
  console.log("dummy action");
}

export async function getAllUsers(filter?: string, page?: number) {
  try {
    let skips = (page! - 1) * 5 || 0;
    await connectToDB();

    let sortQuery = {};
    sortQuery = { joinAt: -1 };

    switch (filter) {
      case "new users":
        sortQuery = { joinAt: -1 };
        break;
      case "old users":
        sortQuery = { joinAt: 1 };
        break;

      case "top contributors":
        sortQuery = { reputations: 1 };
        break;

      default:
        break;
    }
    const users = await User.find().sort(sortQuery).skip(skips).limit(6);
    const noUsers = await User.countDocuments();
    return { users, noUsers };
  } catch (err) {
    console.log("eror occured during fetching all users from db");
    console.log(err);
  }
}

export async function createPost(data: PostType) {
  try {
    await connectToDB();
    //getUserinfo

    const categoryArray: ObjectIdType[] = [];
    const categorysArray: string[] = [...data.categories];
    const categoryDocs: ICategory[] = [];
    // console.log(data.categorys)

    // let categoryName;
    for (let categoryName of categorysArray) {
      let categoryFound = await Category.findOne({ title: categoryName });

      if (categoryFound) {
        console.log("seems category has been found ");
        console.log(categoryFound);
        categoryArray.push(categoryFound._id);
        categoryDocs.push(categoryFound);
        console.log("category added to the array");
      } else {
        console.log("coudn't find the category");
        console.log("creating new category");
        const newcategory = await Category.create({
          title: categoryName,
          slug: slugify(categoryName),
        });
        categoryDocs.push(newcategory);
        categoryArray.push(await newcategory._id);
        console.log("new category created");
      }
    }

    // console.log(categoryArray);
    const neww = await Post.create({
      ...data,
      categories: categoryArray,
      author: data.author,
    });

    const { _id } = neww;

    for (let categoryDoc of categoryDocs) {
      categoryDoc.posts.push(_id);
      await categoryDoc.save();
    }

    // console.log(neww);
    revalidatePath("/");
    //  return users;
  } catch (err) {
    console.log("coudn't create the Post");
    console.log(err);
    return 400;
  }
}

export const getAllPosts = async (
  searchParams?: string,
  filter?: string,
  page?: number
) => {
  try {
    const query: FilterQuery<typeof Post> = {};

    if (searchParams) {
      query.$or = [
        { title: { $regex: new RegExp(searchParams, "i") } },
        { content: { $regex: new RegExp(searchParams, "i") } },
      ];
    }
    let skips = (page! - 1) * 5 || 0;

    let sortQuery = {};
    sortQuery = { createdAt: -1 };
    // newest recommended frequent unanswered
    await connectToDB();
    switch (filter) {
      case "newest":
        sortQuery = { createdAt: -1 };
        break;
      case "frequent":
        sortQuery = { views: -1 };
        break;

      case "unanswered":
        query.answers = { $size: 0 };
        break;

      default:
        sortQuery = { createdAt: -1 };
        break;
    }

    let allPosts = await Post.find(query)
      .populate({ path: "categories", model: Category })
      .sort(sortQuery)
      .skip(skips)
      .limit(5);
    // console.log(allPosts)
    const noPosts = await Post.countDocuments(query);
    return { allPosts, noPosts };
  } catch (err) {
    console.log("coudn't fetch posts");
    console.log(err);
  }
};
