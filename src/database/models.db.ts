import mongoose, { Schema, Document } from "mongoose";
export type ObjectIdType = mongoose.Schema.Types.ObjectId;

export interface IUser extends mongoose.Document {
  name: string;
  username?: string;
  email: string;
  emailVerified: Date;
  password?: string;
  bio?: string;
  picture?: string;
  portfolioWebSite?: string;
  saved?: ObjectIdType[];
  posts?: ObjectIdType[];
  comments?: ObjectIdType[];
  joinAt: Date;
  // account and session
}

export interface ICategory extends mongoose.Document {
  title: string;
  slug: string;
  img?: string;
  posts: ObjectIdType[];
}

export interface IPost extends mongoose.Document {
  title: string;
  slug: string;
  content: string;
  img?: string;
  categories: ObjectIdType[];
  views: number;
  upvotes: ObjectIdType[];
  downvotes: ObjectIdType[];
  author: ObjectIdType;
  comments: ObjectIdType[];
  createdAt: Date;
}

export interface IComment extends Document {
  upvotes: ObjectIdType[];
  downvotes: ObjectIdType[];
  author: ObjectIdType;
  content: string;
  post: ObjectIdType;
  createdAt: Date;
}

export interface IInteraction extends Document {
  user: ObjectIdType;
  type: string;
  question: ObjectIdType;
}

const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  emailVerified: { type: Date },
  password: { type: String },
  bio: { type: String },
  picture: { type: String },
  portfolioWebSite: { type: String },
  saved: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  joinAt: { type: Date, default: Date.now },
});

export const postSchema = new Schema<IPost>({
  title: {
    type: String,
    required: true,
  },
  slug: { type: String, required: true },
  content: {
    type: String,
    required: true,
  },
  img: { type: String },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  views: {
    type: Number,
    default: 0,
  },
  upvotes: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    default: [],
  },
  downvotes: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    default: [],
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  comments: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comments",
      },
    ],

    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const categorySchema = new Schema<ICategory>({
  title: { type: String, required: true, unique: true },
  slug: { type: String, default: "didn't provide any description" },
  posts: {
    type: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    default: [],
  },
  img: { type: String },
});

const commentSchema = new mongoose.Schema<IComment>({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  content: String,
  upvotes: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    default: [],
  },
  downvotes: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    default: [],
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const InteractionSchema = new mongoose.Schema<IInteraction>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  type: String,
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);

export const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export const Comment =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);

export const Interaction =
  mongoose.models.Interaction ||
  mongoose.model("Interaction", InteractionSchema);
