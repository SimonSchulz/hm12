import { addSeconds } from "date-fns";

export class DeviceSessionEntity {
  deviceId: string;
  userId: string;
  ip: string;
  title: string;
  lastActiveDate: string;
  expiresAt: string;

  constructor(
    ip: string,
    title: string,
    userId: string,
    deviceId: string,
    iat: string,
  ) {
    this.deviceId = deviceId;
    this.userId = userId;
    this.ip = ip;
    this.title = title;
    this.lastActiveDate = iat;
    const date = new Date(iat);
    this.expiresAt = addSeconds(date, 20).toISOString();
  }
}
