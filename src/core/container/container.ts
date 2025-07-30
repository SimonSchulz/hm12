import { Container } from "inversify";
import TYPES from "./types";
import { SessionDevicesRepository } from "../../security/devices/repositories/session-devices.repository";
import { SessionDevicesQueryRepository } from "../../security/devices/repositories/session-query.repository";
import { SessionDevicesService } from "../../security/devices/domain/session.devices.service";
import { DeviceSessionController } from "../../security/devices/controller/device-session.controller";
import { RefreshService } from "../../auth/domain/refresh.token.service";
import { JwtService } from "../../auth/domain/jwt.service";
import { BcryptService } from "../../auth/domain/bcrypt.service";
import { NodemailerService } from "../../auth/domain/nodemailer.service";
import { UsersRepository } from "../../user/repositories/user.repository";
import { RefreshTokenGuard } from "../../auth/routers/guards/refresh.token.guard";
import { UsersController } from "../../user/controller/user.controller";
import { UsersService } from "../../user/domain/user.service";
import { UsersQueryRepository } from "../../user/repositories/user.query.repository";
import { AuthService } from "../../auth/domain/auth.service";
import { LikesRepository } from "../../likes/repositories/likes.repository";
import { LikesService } from "../../likes/domain/likes.service";

const container = new Container();
//auth
container.bind<RefreshService>(TYPES.RefreshService).to(RefreshService);
container.bind<JwtService>(TYPES.JwtService).to(JwtService);
container
  .bind<BcryptService>(TYPES.BcryptService)
  .to(BcryptService)
  .inSingletonScope();
container
  .bind<NodemailerService>(TYPES.NodemailerService)
  .to(NodemailerService)
  .inSingletonScope();
container
  .bind<RefreshTokenGuard>(TYPES.RefreshTokenGuard)
  .to(RefreshTokenGuard);
container.bind<AuthService>(TYPES.AuthService).to(AuthService);
//blogs

//posts

//comments

//users
container.bind<UsersRepository>(TYPES.UsersRepository).to(UsersRepository);
container.bind<UsersController>(TYPES.UsersController).to(UsersController);
container.bind<UsersService>(TYPES.UsersService).to(UsersService);
container
  .bind<UsersQueryRepository>(TYPES.UsersQueryRepository)
  .to(UsersQueryRepository);
//sessions
container
  .bind<SessionDevicesRepository>(TYPES.SessionDevicesRepository)
  .to(SessionDevicesRepository)
  .inSingletonScope();
container
  .bind<SessionDevicesQueryRepository>(TYPES.SessionDevicesQueryRepository)
  .to(SessionDevicesQueryRepository)
  .inSingletonScope();
container
  .bind<SessionDevicesService>(TYPES.SessionDevicesService)
  .to(SessionDevicesService)
  .inSingletonScope();
container
  .bind<DeviceSessionController>(TYPES.DeviceSessionController)
  .to(DeviceSessionController)
  .inSingletonScope();

//likes
container
  .bind<LikesRepository>(TYPES.LikesRepository)
  .to(LikesRepository)
  .inSingletonScope();
container
  .bind<LikesService>(TYPES.LikesService)
  .to(LikesService)
  .inSingletonScope();

export default container;
