import { Types, Document } from "mongoose";

export type PostVisibility = "public" | "private";

export interface IPost extends Document {
    author: Types.ObjectId;

    content: string;

    image?: string;

    visibility: PostVisibility;

    isDeleted: boolean;

    createdAt?: Date;
    updatedAt?: Date;

}