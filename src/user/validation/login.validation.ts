import { body } from "express-validator";
import container from "../../core/container/container";
import { UsersRepository } from "../repositories/user.repository";
import TYPES from "../../core/container/types";

const usersRepository = container.get<UsersRepository>(TYPES.UsersRepository);
export const loginValidation = body("login")
  .isString()
  .trim()
  .isLength({ min: 3, max: 10 })
  .withMessage("Login must be between 3 and 10 characters")
  .matches(/^[a-zA-Z0-9_-]*$/)
  .withMessage(
    "Login can only contain letters, numbers, underscores, and hyphens",
  )
  .custom(async (login: string) => {
    const user = await usersRepository.findByLoginOrEmail(login);
    if (user) {
      throw new Error("login already exist");
    }
    return true;
  });
