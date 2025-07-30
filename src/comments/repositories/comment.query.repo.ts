import { CommentModel } from "../schemas/comment.schema"; // путь к твоей схеме комментария
import { CommentQueryInput } from "../types/comment-query.input";
import { Types } from "mongoose";

export const commentsQueryRepository = {
  async findByIdOrFail(id: string) {
    if (!Types.ObjectId.isValid(id)) return null;
    return CommentModel.findById(id).lean();
  },

  async findCommentsByPostId(
    postId: string,
    queryDto: CommentQueryInput,
  ): Promise<{ items: any[]; totalCount: number }> {
    const { pageNumber, pageSize, sortBy, sortDirection } = queryDto;
    const skip = (pageNumber - 1) * pageSize;

    const filter = { postId };

    const items = await CommentModel.find(filter)
      .sort({ [sortBy]: sortDirection === "asc" ? 1 : -1 })
      .skip(skip)
      .limit(pageSize)
      .lean();

    const totalCount = await CommentModel.countDocuments(filter);

    return { items, totalCount };
  },
};
