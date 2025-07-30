import { DeviceViewModel } from "../../types/device-view-model";
import { DeviceSessionEntity } from "../../types/device-session.entity";
export function mapToDeviceViewModel(
  data: DeviceSessionEntity,
): DeviceViewModel {
  return {
    ip: data.ip,
    title: data.title,
    lastActiveDate: data.lastActiveDate,
    deviceId: data.deviceId,
  };
}
