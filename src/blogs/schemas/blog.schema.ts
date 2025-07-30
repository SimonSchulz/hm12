import { Schema, model } from "mongoose";

const BlogSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  websiteUrl: { type: String, required: true },
  isMembership: { type: Boolean, required: true },
  createdAt: { type: String, required: true },
});

export const BlogModel = model("Blog", BlogSchema);
