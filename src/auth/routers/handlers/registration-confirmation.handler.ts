import { ValidationError } from "../../../core/utils/app-response-errors";
import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import container from "../../../core/container/container";
import { UsersRepository } from "../../../user/repositories/user.repository";
import TYPES from "../../../core/container/types";
const usersRepository = container.get<UsersRepository>(TYPES.UsersRepository);
export async function confirmRegistration(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const code = req.body.code;
    const user = await usersRepository.findByConfirmationCode(code);

    if (!user) {
      res.status(HttpStatus.BadRequest).send({
        errorsMessages: [
          { field: "code", message: "Invalid confirmation code" },
        ],
      });
      return;
    }

    if (user.emailConfirmation.isConfirmed) {
      res.status(HttpStatus.BadRequest).send({
        errorsMessages: [{ field: "code", message: "Code already used" }],
      });
      return;
    }

    const expirationDate = new Date(user.emailConfirmation.expirationDate);
    if (expirationDate < new Date()) {
      res.status(HttpStatus.BadRequest).send({
        errorsMessages: [
          { field: "code", message: "Confirmation code expired" },
        ],
      });
      return;
    }

    const success = await usersRepository.confirmEmail(user._id.toString());
    if (!success) {
      throw new ValidationError("Failed to confirm user");
    }

    res.sendStatus(HttpStatus.NoContent);
  } catch (err) {
    next(err);
  }
}
