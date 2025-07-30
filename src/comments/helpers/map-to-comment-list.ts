import { WithId } from "mongodb";
import { PaginatedOutput } from "../../core/types/paginated.output";
import { CommentQueryInput } from "../types/comment-query.input";
import { mapToCommentViewModel } from "./map-to-comment-view-model";
import { CommentEntity } from "../dto/comment.entity";

export async function mapToCommentListModel(
  comments: WithId<CommentEntity>[],
  totalCount: number,
  query: CommentQueryInput,
  userId?: string,
): Promise<PaginatedOutput> {
  const { pageNumber: page, pageSize } = query;
  const pagesCount = Math.ceil(totalCount / pageSize);
  return {
    pagesCount,
    page,
    pageSize,
    totalCount,
    items: await Promise.all(
      comments.map((s) => mapToCommentViewModel(s, userId)),
    ),
  };
}
