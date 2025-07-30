import { Schema, model } from "mongoose";

const CommentSchema = new Schema({
  content: { type: String, required: true },
  commentatorInfo: {
    userId: { type: String, required: true },
    userLogin: { type: String, required: true },
  },
  createdAt: { type: String, required: true },
  postId: { type: String, required: true },
});

export const CommentModel = model("Comments", CommentSchema);
