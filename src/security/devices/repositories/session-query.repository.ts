import { DeviceSessionModel } from "../schemas/device-session.schema";
import { DeviceSessionEntity } from "../types/device-session.entity";
import { injectable } from "inversify";

@injectable()
export class SessionDevicesQueryRepository {
  async findAllByUserId(userId: string): Promise<DeviceSessionEntity[]> {
    const docs = await DeviceSessionModel.find({ userId }).lean();
    return docs.map(
      (doc) =>
        new DeviceSessionEntity(
          doc.ip,
          doc.title,
          doc.userId,
          doc.deviceId,
          doc.lastActiveDate,
        ),
    );
  }

  async findSessionByDeviceId(
    deviceId: string,
  ): Promise<DeviceSessionEntity | null> {
    const doc = await DeviceSessionModel.findOne({ deviceId }).lean();
    if (!doc) return null;

    return new DeviceSessionEntity(
      doc.ip,
      doc.title,
      doc.userId,
      doc.deviceId,
      doc.lastActiveDate,
    );
  }
}
