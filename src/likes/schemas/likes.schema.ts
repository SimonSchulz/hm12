import { model, Schema } from "mongoose";
import { LikeStatus } from "../types/likes.type";

const LikesSchema = new Schema({
  createdAt: { type: Date, required: true },
  status: {
    type: String,
    enum: Object.values(LikeStatus),
    required: true,
  },
  userId: { type: String, required: true },
  targetId: { type: String, required: true },
});

export const LikesModel = model("Likes", LikesSchema);
