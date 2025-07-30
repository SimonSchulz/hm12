import { inject, injectable } from "inversify";
import { AuthorizationError } from "../../core/utils/app-response-errors";
import { SessionDevicesService } from "../../security/devices/domain/session.devices.service";
import { SessionDevicesQueryRepository } from "../../security/devices/repositories/session-query.repository";
import { JwtService } from "./jwt.service";
import TYPES from "../../core/container/types";

@injectable()
export class RefreshService {
  constructor(
    @inject(TYPES.SessionDevicesService)
    private readonly sessionDevicesService: SessionDevicesService,

    @inject(TYPES.SessionDevicesQueryRepository)
    private readonly sessionDevicesQueryRepository: SessionDevicesQueryRepository,

    @inject(TYPES.JwtService)
    private readonly jwtService: JwtService,
  ) {}

  async refreshToken(deviceId: string) {
    if (!deviceId) {
      throw new AuthorizationError("Device ID is required");
    }

    const session =
      await this.sessionDevicesQueryRepository.findSessionByDeviceId(deviceId);
    if (!session) throw new AuthorizationError();

    const userId = session.userId;
    const newAccessToken = await this.jwtService.createAccessToken(userId);
    const newRefreshToken = await this.jwtService.createRefreshToken(
      userId,
      deviceId,
    );

    const iat = this.jwtService
      .getTokenIssuedAt(newRefreshToken)
      ?.toISOString();
    if (!iat) throw new Error("Can't extract issuedAt from new refresh token");

    await this.sessionDevicesService.updateLastActiveDate(deviceId, iat);

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }
}
