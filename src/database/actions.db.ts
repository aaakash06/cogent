"use server";

import { connectToDB } from "./connect.db";
import { revalidatePath } from "next/cache";
import { Category, ICategory, ObjectIdType, Post, User } from "./models.db";
type PostType = {
  title: string;
  slug: string;
  content: string;
  img?: string;
  categories: string[];
  author: ObjectIdType;
  createdAt: Date;
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
      let categoryFound = await Category.findOne({ name: categoryName });

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
          name: categoryName,
        });
        categoryDocs.push(newcategory);
        categoryArray.push(await newcategory._id);
        console.log("new category created");
      }
    }

    // console.log(categoryArray);
    const neww = await Post.create({
      ...data,
      categorys: categoryArray,
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
  }
}
