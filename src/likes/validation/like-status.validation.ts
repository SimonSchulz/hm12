import { body } from "express-validator";
import { LikeStatus } from "../types/likes.type";

export const likeStatusValidation = [
  body("likeStatus")
    .exists()
    .withMessage("likeStatus is required")
    .isString()
    .withMessage("likeStatus must be a string")
    .isIn(Object.values(LikeStatus))
    .withMessage(
      `likeStatus must be one of: ${Object.values(LikeStatus).join(", ")}`,
    ),
];
