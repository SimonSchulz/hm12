import { NextFunction, Request, Response } from "express";
import {
  AuthorizationError,
  NotFoundError,
} from "../../../core/utils/app-response-errors";
import { HttpStatus } from "../../../core/types/http-statuses";
import container from "../../../core/container/container";
import { LikesService } from "../../../likes/domain/likes.service";
import TYPES from "../../../core/container/types";

const likesService = container.get<LikesService>(TYPES.LikesService);
export async function putLikeStatusHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.userInfo?.userId;
    if (!userId) {
      throw new AuthorizationError();
    }
    const likeStatus = req.body.likeStatus;
    const id = req.params.commentId;
    await likesService.updateLikeStatus(userId, id, likeStatus);
    res.sendStatus(HttpStatus.NoContent);
  } catch (e: unknown) {
    next(e);
  }
}
