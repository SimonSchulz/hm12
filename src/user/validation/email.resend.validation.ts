import { body } from "express-validator";
import container from "../../core/container/container";
import TYPES from "../../core/container/types";
import { UsersRepository } from "../repositories/user.repository";

const usersRepository = container.get<UsersRepository>(TYPES.UsersRepository);
export const emailResendValidation = body("email")
  .isString()
  .trim()
  .isLength({ min: 1 })
  .isEmail()
  .withMessage("email is not correct")
  .custom(async (email: string) => {
    const user = await usersRepository.findByLoginOrEmail(email);
    if (!user) {
      throw new Error("email not exist");
    }
    return true;
  });
