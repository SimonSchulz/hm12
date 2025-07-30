import {
  commentIdValidation,
  idValidation,
} from "../../core/utils/params-id.validation";
import { inputValidationResultMiddleware } from "../../core/utils/input-validtion-result.middleware";
import { Router } from "express";
import { contentValidation } from "../validation/comment.input-dto.validation";
import { deleteCommentHandler } from "./handlers/delete-comment-handler";
import { updateCommentHandler } from "./handlers/update-comment-handler";
import { getCommentHandler } from "./handlers/get-comment-handler";

import { likeStatusValidation } from "../../likes/validation/like-status.validation";
import { putLikeStatusHandler } from "./handlers/like-status.handler";
import { accessTokenGuard } from "../../auth/routers/guards/access.token.guard";
import { optionalAccessTokenMiddleware } from "../../auth/routers/guards/optional-access.token.guard";
export const commentsRouter = Router({});
commentsRouter
  .get(
    "/:id",
    optionalAccessTokenMiddleware,
    idValidation,
    inputValidationResultMiddleware,
    getCommentHandler,
  )

  .put(
    "/:commentId",
    accessTokenGuard,
    commentIdValidation,
    contentValidation,
    inputValidationResultMiddleware,
    updateCommentHandler,
  )
  .put(
    "/:commentId/like-status",
    accessTokenGuard,
    commentIdValidation,
    likeStatusValidation,
    inputValidationResultMiddleware,
    putLikeStatusHandler,
  )

  .delete(
    "/:commentId",
    accessTokenGuard,
    commentIdValidation,
    inputValidationResultMiddleware,
    deleteCommentHandler,
  );
