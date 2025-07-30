import { NextFunction, Request, Response } from "express";
import { postService } from "../../domain/posts.service";
import { HttpStatus } from "../../../core/types/http-statuses";
import {
  AuthorizationError,
  NotFoundError,
} from "../../../core/utils/app-response-errors";
import { commentsService } from "../../../comments/service/comments.service";
import { RequestDataEntity } from "../../../core/types/request-data.entity";
import { mapToCommentViewModel } from "../../../comments/helpers/map-to-comment-view-model";
import { CommentInputDto } from "../../../comments/dto/comment.input-dto";

export async function createCommentByPostIdHandler(
  req: Request<{ postId: string }, {}, CommentInputDto>,
  res: Response,
  next: NextFunction,
) {
  try {
    const postId = req.params.postId;
    const post = await postService.findByIdOrFail(postId);
    if (!post) {
      throw new NotFoundError("Post not found");
    }
    const userInfo: RequestDataEntity | undefined = req.userInfo;
    if (!userInfo) throw new AuthorizationError();
    let comment = await commentsService.create(req.body, userInfo, postId);
    const commentViewModel = await mapToCommentViewModel(
      comment,
      userInfo.userId,
    );
    res.status(HttpStatus.Created).send(commentViewModel);
  } catch (e: unknown) {
    next(e);
  }
}
