import { inject, injectable } from "inversify";
import { Request, Response, NextFunction } from "express";
import { AuthorizationError } from "../../../core/utils/app-response-errors";

import TYPES from "../../../core/container/types";
import { SessionDevicesQueryRepository } from "../../../security/devices/repositories/session-query.repository";
import { JwtService } from "../../domain/jwt.service";

@injectable()
export class RefreshTokenGuard {
  constructor(
    @inject(TYPES.JwtService)
    private jwtService: JwtService,
    @inject(TYPES.SessionDevicesQueryRepository)
    private queryRepository: SessionDevicesQueryRepository,
  ) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refreshToken = req.cookies?.refreshToken;
      if (!refreshToken) throw new AuthorizationError();

      const payload = await this.jwtService.verifyRefreshToken(refreshToken);
      if (!payload) throw new AuthorizationError();

      const session = await this.queryRepository.findSessionByDeviceId(
        payload.deviceId,
      );
      if (!session) throw new AuthorizationError();

      const tokenIat = this.jwtService.getTokenIssuedAt(refreshToken);
      const tokenIssuedAt = tokenIat.getTime();
      const sessionCreatedAt = new Date(session.lastActiveDate).getTime();

      if (tokenIssuedAt !== sessionCreatedAt) {
        throw new AuthorizationError("Stale or reused refresh token");
      }

      req.deviceInfo = {
        userId: payload.userId,
        deviceId: payload.deviceId,
      };

      next();
    } catch (err) {
      next(err);
    }
  };
}
