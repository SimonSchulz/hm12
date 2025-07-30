import { Document, Types } from "mongoose";
import { RequestDataEntity } from "../../core/types/request-data.entity";

export interface Comment {
  content: string;
  commentatorInfo: RequestDataEntity;
  createdAt: string;
  postId: string;
}

export interface CommentDocument extends Comment, Document {
  _id: Types.ObjectId;
}
