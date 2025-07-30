import { UsersQueryRepository } from "../../user/repositories/user.query.repository";
import { LikesRepository } from "../../likes/repositories/likes.repository";

const TYPES = {
  //auth
  AuthService: Symbol.for("AuthService"),
  RefreshService: Symbol.for("RefreshService"),
  JwtService: Symbol.for("JwtService"),
  BcryptService: Symbol.for("BcryptService"),
  NodemailerService: Symbol.for("NodemailerService"),
  RefreshTokenGuard: Symbol.for("RefreshTokenGuard"),
  AccessTokenGuard: Symbol.for("AccessTokenGuard"),
  //blogs

  //posts

  //comments

  //sessions
  SessionDevicesRepository: Symbol.for("SessionDevicesRepository"),
  SessionDevicesQueryRepository: Symbol.for("SessionDevicesQueryRepository"),
  SessionDevicesService: Symbol.for("SessionDevicesService"),
  DeviceSessionController: Symbol.for("DeviceSessionController"),
  //user
  UsersRepository: Symbol.for("UsersRepository"),
  UsersQueryRepository: Symbol.for("UsersQueryRepository"),
  UsersController: Symbol.for("UsersController"),
  UsersService: Symbol.for("UsersService"),

  //likes
  LikesRepository: Symbol.for("LikesRepository"),
  LikesService: Symbol.for("LikesService"),
};

export default TYPES;
