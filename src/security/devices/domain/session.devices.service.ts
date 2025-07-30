import { DeviceSessionEntity } from "../types/device-session.entity";
import { SessionDevicesRepository } from "../repositories/session-devices.repository";
import { SessionDevicesQueryRepository } from "../repositories/session-query.repository";
import { inject, injectable } from "inversify";
import TYPES from "../../../core/container/types";

@injectable()
export class SessionDevicesService {
  constructor(
    @inject(TYPES.SessionDevicesRepository)
    private readonly repository: SessionDevicesRepository,
    @inject(TYPES.SessionDevicesQueryRepository)
    private readonly queryRepository: SessionDevicesQueryRepository,
  ) {}

  async getAllSessions(userId: string): Promise<DeviceSessionEntity[]> {
    return this.queryRepository.findAllByUserId(userId);
  }

  async getSessionByDeviceId(
    deviceId: string,
  ): Promise<DeviceSessionEntity | null> {
    return this.queryRepository.findSessionByDeviceId(deviceId);
  }

  async updateLastActiveDate(deviceId: string, iat: string): Promise<void> {
    await this.repository.updateLastActiveDate(deviceId, iat);
  }

  async createSession(
    ip: string,
    title: string,
    userId: string,
    deviceId: string,
    iat: string,
  ): Promise<DeviceSessionEntity> {
    const session = new DeviceSessionEntity(ip, title, userId, deviceId, iat);
    return this.repository.create(session);
  }

  async deleteOtherSessions(
    userId: string,
    currentDeviceId: string,
  ): Promise<void> {
    await this.repository.deleteAllExcept(userId, currentDeviceId);
  }

  async deleteSessionByDeviceId(deviceId: string): Promise<boolean> {
    return this.repository.deleteByDeviceId(deviceId);
  }
}
