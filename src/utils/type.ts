import { IPost, ObjectIdType } from "@/database/models.db";

export interface Blog extends IPost {
  _id: ObjectIdType;
}
