import { DeviceSessionEntity } from "../types/device-session.entity";
import { DeviceSessionModel } from "../schemas/device-session.schema";
import { injectable } from "inversify";

@injectable()
export class SessionDevicesRepository {
  async create(
    sessionDevice: DeviceSessionEntity,
  ): Promise<DeviceSessionEntity> {
    const created = await DeviceSessionModel.create(sessionDevice);
    return new DeviceSessionEntity(
      created.ip,
      created.title,
      created.userId,
      created.deviceId,
      created.lastActiveDate,
    );
  }

  async updateLastActiveDate(deviceId: string, iat: string): Promise<void> {
    await DeviceSessionModel.updateOne(
      { deviceId },
      { $set: { lastActiveDate: iat } },
    );
  }

  async deleteAllExcept(userId: string, deviceId: string): Promise<void> {
    await DeviceSessionModel.deleteMany({
      userId,
      deviceId: { $ne: deviceId },
    });
  }

  async deleteByDeviceId(deviceId: string): Promise<boolean> {
    const result = await DeviceSessionModel.deleteOne({ deviceId });
    return result.deletedCount === 1;
  }
}
