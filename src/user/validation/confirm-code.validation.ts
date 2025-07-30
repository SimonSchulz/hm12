import { body } from "express-validator";

export const codeValidation = body("code")
  .isString()
  .trim()
  .notEmpty()
  .withMessage("code is required")
  .isUUID(4)
  .withMessage("Invalid confirmation code format");