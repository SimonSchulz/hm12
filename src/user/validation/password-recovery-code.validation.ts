import { body } from "express-validator";

export const recoveryCodeValidation = body("recoveryCode")
  .isString()
  .withMessage("Recovery code must be a string")
  .trim()
  .notEmpty()
  .withMessage("code is required")
  .isUUID(4)
  .withMessage("Invalid recovery code format");
