import { Request, Response, NextFunction } from "express";
import { AuthorizationError } from "../../../core/utils/app-response-errors";
import container from "../../../core/container/container";
import TYPES from "../../../core/container/types";
import { JwtService } from "../../domain/jwt.service";
import { UsersRepository } from "../../../user/repositories/user.repository";

const jwtService = container.get<JwtService>(TYPES.JwtService);
const usersRepository = container.get<UsersRepository>(TYPES.UsersRepository);

export const accessTokenGuard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw new AuthorizationError();

    const [authType, token] = authHeader.split(" ");
    if (authType !== "Bearer" || !token) throw new AuthorizationError();
    console.log(token);
    const payload = await jwtService.verifyAccessToken(token);
    if (!payload)
      throw new AuthorizationError("Access token expired or invalid");

    const user = await usersRepository.findById(payload.userId);
    if (!user) throw new AuthorizationError();
    req.userInfo = {
      userId: user._id.toString(),
      userLogin: user.login,
    };
    console.log(user);
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};
