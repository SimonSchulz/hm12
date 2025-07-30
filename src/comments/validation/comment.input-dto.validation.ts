import { body } from "express-validator";

export const contentValidation = body("content")
    .isString()
    .withMessage("title should be string")
    .trim()
    .isLength({ min: 20, max: 300 })
    .withMessage("Length of content is not correct");