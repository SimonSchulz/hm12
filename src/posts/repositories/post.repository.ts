import { PostModel } from "../schemas/post.schema";
import { PostInputDto } from "../dto/post.input-dto";
import { PostQueryInput } from "../types/post-query.input";
import { Types } from "mongoose";
import { Post } from "../types/post";

export const postsRepository = {
  async findMany(queryDto: PostQueryInput) {
    const { pageNumber, pageSize, sortBy, sortDirection, searchNameTerm } =
      queryDto;
    const skip = (pageNumber - 1) * pageSize;
    const filter: any = {};

    if (searchNameTerm) {
      filter.title = { $regex: searchNameTerm, $options: "i" }; // поменял на title
    }

    const totalCount = await PostModel.countDocuments(filter);

    const items = await PostModel.find(filter)
      .sort({ [sortBy]: sortDirection === "asc" ? 1 : -1 })
      .skip(skip)
      .limit(pageSize)
      .lean();

    return { items, totalCount };
  },

  async findPostsByBlogId(blogId: string, queryDto: PostQueryInput) {
    const { pageNumber, pageSize, sortBy, sortDirection } = queryDto;
    const skip = (pageNumber - 1) * pageSize;
    const filter = { blogId };

    const totalCount = await PostModel.countDocuments(filter);

    const items = await PostModel.find(filter)
      .sort({ [sortBy]: sortDirection === "asc" ? 1 : -1 })
      .skip(skip)
      .limit(pageSize)
      .lean();

    return { items, totalCount };
  },

  async findByIdOrFail(id: string) {
    if (!Types.ObjectId.isValid(id)) return null;
    return PostModel.findById(id).lean();
  },

  async create(newPostData: Post) {
    const newPost = await PostModel.create(newPostData);
    return newPost.toObject();
  },

  async update(id: string, dto: PostInputDto): Promise<void> {
    const result = await PostModel.updateOne(
      { _id: id },
      {
        $set: {
          title: dto.title,
          shortDescription: dto.shortDescription,
          content: dto.content,
          blogId: dto.blogId,
        },
      },
    );

    if (result.matchedCount < 1) {
      throw new Error("Post not exist");
    }
  },

  async delete(id: string): Promise<void> {
    const result = await PostModel.deleteOne({ _id: id });

    if (result.deletedCount < 1) {
      throw new Error("Post not exist");
    }
  },
};
