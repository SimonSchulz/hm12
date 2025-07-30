import { body } from "express-validator";

const titleValidation = body("title")
  .isString()
  .withMessage("title should be string")
  .trim()
  .isLength({ min: 2, max: 30 })
  .withMessage("Length of title is not correct");

const shortDescriptionValidation = body("shortDescription")
  .isString()
  .withMessage("shortDescription should be string")
  .trim()
  .isLength({ min: 2, max: 100 })
  .withMessage("Length of shortDescription is not correct");

const contentValidation = body("content")
  .isString()
  .withMessage("content should be string")
  .trim()
  .isLength({ min: 2, max: 1000 })
  .withMessage("Length of content is not correct");

export const blogIdValidation = body("blogId")
  .isString()
  .withMessage("blogId should be string");
const createdAtValidation = body("createdAt").isString();
export const postInputDtoValidation = [
  titleValidation,
  contentValidation,
  shortDescriptionValidation,
  blogIdValidation,
];
export const postInputDtoWithoutBlogIdValidation = [
  titleValidation,
  contentValidation,
  shortDescriptionValidation,
];
