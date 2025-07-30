import { NextFunction, Request, Response } from "express";
import { postService } from "../../domain/posts.service";
import { setSortAndPagination } from "../../../core/helpers/set-sort-and-pagination";
import { HttpStatus } from "../../../core/types/http-statuses";
import {
  NotFoundError,
  ValidationError,
} from "../../../core/utils/app-response-errors";
import { commentsService } from "../../../comments/service/comments.service";
import { mapToCommentListModel } from "../../../comments/helpers/map-to-comment-list";
import { PaginationAndSorting } from "../../../core/types/pagination-and-sorting";
import { CommentSortField } from "../../../comments/types/comment-sort-field";

export async function getCommentsByPostIdHandler(
  req: Request<{ postId: string }>,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.userInfo?.userId;
    const postId = req.params.postId;
    const post = await postService.findByIdOrFail(postId);
    if (!post) {
      throw new NotFoundError("Post not found");
    }
    const query: PaginationAndSorting<CommentSortField> = setSortAndPagination(
      req.query,
    );
    const { items, totalCount } = await commentsService.findCommentsByPostId(
      postId,
      query,
    );
    const result = await mapToCommentListModel(
      items,
      totalCount,
      query,
      userId,
    );
    res.status(HttpStatus.Ok).send(result);
  } catch (e: unknown) {
    next(e);
  }
}
