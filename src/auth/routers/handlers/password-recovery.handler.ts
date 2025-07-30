import { addMinutes } from "date-fns";
import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import crypto from "crypto";
import container from "../../../core/container/container";
import { UsersRepository } from "../../../user/repositories/user.repository";
import TYPES from "../../../core/container/types";
import { NodemailerService } from "../../domain/nodemailer.service";
import { passwordRecovery } from "../../utils/password-recovery-message";
import { UsersService } from "../../../user/domain/user.service";

const usersRepository = container.get<UsersRepository>(TYPES.UsersRepository);
const usersService = container.get<UsersService>(TYPES.UsersService);
const nodemailerService = container.get<NodemailerService>(
  TYPES.NodemailerService,
);
export async function passwordRecoveryHandler(
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

    const newCode = crypto.randomUUID();
    const newExpiration = addMinutes(new Date(), 10).toISOString();

    await usersService.setPasswordRecovery(
      user._id.toString(),
      newCode,
      newExpiration,
    );

    await nodemailerService.sendEmail(
      user.email,
      newCode,
      passwordRecovery.recoveryMessage,
    );
    res.sendStatus(HttpStatus.NoContent);
  } catch (error) {
    next(error);
  }
}
