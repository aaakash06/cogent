"use server";

import { connectToDB } from "./connect.db";
import { revalidatePath } from "next/cache";
import {
  Category,
  Comment,
  ICategory,
  IPost,
  ObjectIdType,
  Post,
  postSchema,
  User,
} from "./models.db";
import { slugify } from "@/utils/slugify";
import { Tag } from "lucide-react";
import { FilterQuery } from "mongoose";
import { categories } from "@/lib/categories";
import mongoose from "mongoose";

type PostType = {
  title: string;
  slug: string;
  content: string;
  img: string;
  categories: string[];
  author: ObjectIdType;
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
        // console.log(categoryFound);
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
  } catch (err) {
    console.log("coudn't create the Post");
    console.log(err);
    return 400;
  }
}

export const getAllPosts = async (
  searchParams?: string,
  category?: string,
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
    // switch (filter) {
    //   case "newest":
    //     sortQuery = { createdAt: -1 };
    //     break;
    //   case "frequent":
    //     sortQuery = { views: -1 };
    //     break;

    //   case "unanswered":
    //     query.answers = { $size: 0 };
    //     break;

    //   default:
    //     sortQuery = { createdAt: -1 };
    //     break;
    // }
    if (category && category != "all") {
      const tag = await Category.findOne({ title: category });
      if (tag) {
        const postsId = tag.posts;

        const posts = [];
        for (let id of postsId) {
          const thePost = await Post.findById(id);

          posts.push(thePost);
        }
        return posts;
      } else {
        console.log("category not found");
        return [];
      }
    }

    let allPosts: IPost[] = await Post.find(query)
      .populate({ path: "categories", model: Category })
      .sort(sortQuery)
      .skip(skips);
    // .limit(5);
    // console.log(allPosts)
    const noPosts = await Post.countDocuments(query);
    return allPosts;
  } catch (err) {
    console.log("coudn't fetch posts");
    console.log(err);
  }
};

export const getUserByClerkId = async (id: string) => {
  try {
    await connectToDB();
    const user = await User.findOne({ clerkId: id });
    if (!user) {
      const user = await User.findOne({
        clerkId: "user_2ef9jMdNJEPcQjbIky6MBXJc79L",
      });
      return user;
    }
    return user;
  } catch (err) {
    console.log("error occured during fetching user by clerk id ");
  }
};

export async function getUserById(userId: ObjectIdType) {
  try {
    await connectToDB();
    const user = await User.findById(userId);
    // console.log(user);
    return user;
  } catch (err) {
    console.log("not find user with the given user id ");
  }
}

export const getUserByClerkIdAndPopulate = async (id: string) => {
  try {
    await connectToDB();
    const user = await User.findOne({ clerkId: id });
    const posts = await Post.find({ author: user._id }).populate("tags");
    const comments = await Comment.find({ author: user._id }).populate({
      path: "posts",
      model: Post,
    });

    return { user, posts, comments };
  } catch (err) {
    console.log(err);
    console.log("error occured during fetching user by clerk id ");
  }
};

export const deleteUserByClerkId = async (id: string) => {
  try {
    connectToDB();
    const user = await User.findOneAndDelete({ clerkId: id });
    if (!user) {
      console.log("no user found to delete in db");
      return "no user found to delete in db";
    }
    return user;
  } catch (err) {
    console.log("error occured during fetching user and deleting by id ");
    console.log(err);
  }
};

export async function getUserNameById(userId: mongoose.Schema.Types.ObjectId) {
  try {
    // console.log(userId)
    await connectToDB();
    const user = await User.findById(userId);
    // console.log('the required user is ')
    //   console.log('user got')
    // console.log(user)
    return user.name;
  } catch (err) {
    console.log("not find username with the given id ");
  }
}
interface CreateUserClerkType {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  picture: string;
}
export async function createUserByClerk(user: CreateUserClerkType) {
  try {
    await connectToDB();

    console.log(user);

    const mongoUser = await User.create(user);
    return mongoUser;
  } catch (err) {
    console.log("couldn't create user in the database with clerkId");
    console.log(err);
  }
}

export async function updateUserByClerk(
  id: string,
  toUpdate: {
    name: string;
    username: string;
    email: string;
    picture: string;
  }
) {
  try {
    await connectToDB();

    const mongoUser = await User.findOneAndUpdate({ clerkId: id }, toUpdate, {
      new: true,
    });
    return mongoUser;
  } catch (err) {
    console.log("couldn't create user in the database with clerkId");
    console.log(err);
  }
}

export async function getPostById(id: string) {
  try {
    await connectToDB();
    const post = await Post.findById(id);
    return post;
  } catch (err) {
    console.log("couldn't find the post with the given id");
    console.log(err);
  }
}
