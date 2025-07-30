import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import container from "../../../core/container/container";
import TYPES from "../../../core/container/types";
import { UsersQueryRepository } from "../../../user/repositories/user.query.repository";
import { ValidationError } from "../../../core/utils/app-response-errors";
import { AuthService } from "../../domain/auth.service";

const authService = container.get<AuthService>(TYPES.AuthService);
const usersQueryRepository = container.get<UsersQueryRepository>(
  TYPES.UsersQueryRepository,
);
export async function newPasswordHandler(
  req: Request<{}, {}, { newPassword: string; recoveryCode: string }>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const code = req.body.recoveryCode;
    const newPassword = req.body.newPassword;
    const user = await usersQueryRepository.findByRecoveryCode(code);
    if (!user) {
      res.status(400).send({
        errorsMessages: [
          { message: "Invalid recovery code", field: "recoveryCode" },
        ],
      });
      return;
    }
    await authService.changePassword(user.email, newPassword);
    res.sendStatus(HttpStatus.NoContent);
  } catch (error) {
    next(error);
  }
}
