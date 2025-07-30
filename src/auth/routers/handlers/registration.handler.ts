import { Request, Response, NextFunction } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import { ValidationError } from "../../../core/utils/app-response-errors";
import { emailExamples } from "../../utils/email-messages";
import container from "../../../core/container/container";
import { AuthService } from "../../domain/auth.service";
import TYPES from "../../../core/container/types";
import { JwtService } from "../../domain/jwt.service";
import { SessionDevicesService } from "../../../security/devices/domain/session.devices.service";
import { UsersRepository } from "../../../user/repositories/user.repository";
import { NodemailerService } from "../../domain/nodemailer.service";

const authService = container.get<AuthService>(TYPES.AuthService);
const usersRepository = container.get<UsersRepository>(TYPES.UsersRepository);
const nodemailerService = container.get<NodemailerService>(
  TYPES.NodemailerService,
);
export async function registrationHandler(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { login, email, password } = req.body;
    const id = await authService.registerUser(login, password, email);
    if (!id) throw new ValidationError("Invalid data");

    const user = await usersRepository.findById(id);
    if (!user) throw new ValidationError("Invalid data");

    nodemailerService.sendEmail(
      user.email,
      user.emailConfirmation.confirmationCode,
      emailExamples.registrationEmail,
    );

    res.sendStatus(HttpStatus.NoContent);
  } catch (e) {
    next(e);
  }
}
