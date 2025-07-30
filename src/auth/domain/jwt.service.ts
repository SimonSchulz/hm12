import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { SETTINGS } from "../../core/setting/setting";
import { ValidationError } from "../../core/utils/app-response-errors";
import { randomUUID } from "crypto";
import { injectable } from "inversify";

@injectable()
export class JwtService {
  async createAccessToken(userId: string): Promise<string> {
    return jwt.sign({ userId }, SETTINGS.AC_SECRET, {
      expiresIn: SETTINGS.AC_TIME as number,
    });
  }

  async createRefreshToken(userId: string, deviceId?: string): Promise<string> {
    const finalDeviceId = deviceId ?? randomUUID();
    return jwt.sign({ userId, deviceId: finalDeviceId }, SETTINGS.RF_SECRET, {
      expiresIn: SETTINGS.RF_TIME as number,
    });
  }

  async verifyAccessToken(token: string): Promise<{ userId: string } | null> {
    try {
      return jwt.verify(token, SETTINGS.AC_SECRET) as { userId: string };
    } catch (error) {
      if (
        error instanceof TokenExpiredError ||
        error instanceof JsonWebTokenError
      ) {
        return null;
      }
      throw error;
    }
  }

  async verifyRefreshToken(
    token: string,
  ): Promise<{ userId: string; deviceId: string } | null> {
    try {
      return jwt.verify(token, SETTINGS.RF_SECRET) as {
        userId: string;
        deviceId: string;
      };
    } catch (error) {
      if (
        error instanceof TokenExpiredError ||
        error instanceof JsonWebTokenError
      ) {
        return null;
      }
      throw error;
    }
  }

  getTokenExpiration(token: string): string {
    const decoded = jwt.decode(token) as { exp?: number } | null;
    if (!decoded || !decoded.exp)
      throw new ValidationError("Token expiration does not match");
    return new Date(decoded.exp * 1000).toISOString();
  }

  getTokenIssuedAt(token: string): Date {
    const decoded = jwt.decode(token) as { iat?: number } | null;
    if (!decoded || !decoded.iat)
      throw new ValidationError("Token issuedAt does not match");
    return new Date(decoded.iat * 1000);
  }
}
