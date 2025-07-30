import { Router } from "express";
import { authMiddleware } from "../../auth/middlewares/auth-middleware";
import { passwordValidation } from "../validation/password.validation";
import { loginValidation } from "../validation/login.validation";
import { emailValidation } from "../validation/email.validation";
import { inputValidationResultMiddleware } from "../../core/utils/input-validtion-result.middleware";
import { UsersController } from "../controller/user.controller";
import container from "../../core/container/container";
import TYPES from "../../core/container/types";

export function createUsersRouter(controller: UsersController): Router {
  const router = Router();

  router.get("/", authMiddleware, controller.getUsers);

  router.post(
    "/",
    authMiddleware,
    passwordValidation,
    loginValidation,
    emailValidation,
    inputValidationResultMiddleware,
    controller.createUser,
  );

  router.delete("/:id", authMiddleware, controller.deleteUser);

  return router;
}
const usersController = container.get<UsersController>(TYPES.UsersController);
export const usersRouter = createUsersRouter(usersController);
