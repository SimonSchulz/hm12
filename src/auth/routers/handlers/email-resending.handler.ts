import { addMinutes } from "date-fns";
import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import { emailExamples } from "../../utils/email-messages";
import crypto from "crypto";
import container from "../../../core/container/container";
import { UsersRepository } from "../../../user/repositories/user.repository";
import TYPES from "../../../core/container/types";
import { NodemailerService } from "../../domain/nodemailer.service";

const usersRepository = container.get<UsersRepository>(TYPES.UsersRepository);
const nodemailerService = container.get<NodemailerService>(
  TYPES.NodemailerService,
);
export async function resendConfirmationEmail(
  req: Request<{}, {}, { email: string }>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const email = req.body.email;
    const user = await usersRepository.findByLoginOrEmail(email);

    if (!user) {
      res.sendStatus(HttpStatus.NoContent);
      return;
    }

    if (user.emailConfirmation.isConfirmed) {
      res.status(HttpStatus.BadRequest).send({
        errorsMessages: [
          { field: "email", message: "Email is already confirmed" },
        ],
      });
      return;
    }

    const newCode = crypto.randomUUID();
    const newExpiration = addMinutes(new Date(), 10).toISOString();

    await usersRepository.updateConfirmation(
      user._id.toString(),
      newCode,
      newExpiration,
    );

    nodemailerService.sendEmail(
      user.email,
      newCode,
      emailExamples.registrationEmail,
    );

    res.sendStatus(HttpStatus.NoContent);
  } catch (error) {
    next(error);
  }
}
