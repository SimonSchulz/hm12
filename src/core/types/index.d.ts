import { RequestDataEntity } from "./request-data.entity";
import { DeviceInfo } from "./request-data.entity";

declare global {
  namespace Express {
    interface Request {
      userInfo?: RequestDataEntity;
      deviceInfo?: DeviceInfo;
    }
  }
}
