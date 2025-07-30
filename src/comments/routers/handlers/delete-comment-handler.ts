import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import {
  ForbiddenError,
  NotFoundError,
} from "../../../core/utils/app-response-errors";
import { commentsService } from "../../service/comments.service";

export async function deleteCommentHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = req.params.commentId;
    const comment = await commentsService.findByIdOrFail(id);
    if (!comment) {
      throw new NotFoundError("Comment not found");
    }
    const userId = req.userInfo?.userId;
    if (comment?.commentatorInfo?.userId !== userId) {
      throw new ForbiddenError("Access denied: not the comment owner");
    }
    await commentsService.delete(id);
    res.sendStatus(HttpStatus.NoContent);
  } catch (e: unknown) {
    next(e);
  }
}
