import { body } from "express-validator";

export const recoveryPasswordEmailValidation = body("email")
  .isString()
  .withMessage("email must be a string")
  .trim()
  .isEmail()
  .withMessage("email is not correct");
