import { body } from "express-validator";
import container from "../../core/container/container";
import { UsersRepository } from "../repositories/user.repository";
import TYPES from "../../core/container/types";

const usersRepository = container.get<UsersRepository>(TYPES.UsersRepository);
export const emailValidation = body("email")
  .isString()
  .trim()
  .isLength({ min: 1 })
  .isEmail()
  .withMessage("email is not correct")
  .custom(async (email: string) => {
    const user = await usersRepository.findByLoginOrEmail(email);
    if (user) {
      throw new Error("email already exist");
    }
    return true;
  });
