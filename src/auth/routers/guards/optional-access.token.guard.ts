import { NextFunction, Request, Response } from "express";
import container from "../../../core/container/container";
import { JwtService } from "../../domain/jwt.service";
import TYPES from "../../../core/container/types";
const jwtService = container.get<JwtService>(TYPES.JwtService);

export async function optionalAccessTokenMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next();
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = await jwtService.verifyAccessToken(token);
    if (!payload) {
      return next();
    }
    req.userInfo = { userId: payload.userId, userLogin: "" };
  } catch {}
  next();
}
