import { Request, Response, NextFunction } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import { LoginSuccessViewModel } from "../../types/login-success-view-model";
import container from "../../../core/container/container";
import { UsersRepository } from "../../../user/repositories/user.repository";
import TYPES from "../../../core/container/types";
import { RefreshService } from "../../domain/refresh.token.service";

const refreshService = container.get<RefreshService>(TYPES.RefreshService);
export async function refreshTokenHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const payload = req.deviceInfo!;
    const tokens = await refreshService.refreshToken(payload.deviceId);
    res
      .cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true,
        secure: true,
      })
      .status(HttpStatus.Ok)
      .send({ accessToken: tokens.accessToken } as LoginSuccessViewModel);
  } catch (error) {
    next(error);
  }
}
