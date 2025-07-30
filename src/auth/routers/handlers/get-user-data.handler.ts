import { Response, Request } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import { AuthorizationError } from "../../../core/utils/app-response-errors";
import container from "../../../core/container/container";
import TYPES from "../../../core/container/types";
import { UsersQueryRepository } from "../../../user/repositories/user.query.repository";

const usersQueryRepository = container.get<UsersQueryRepository>(
  TYPES.UsersQueryRepository,
);
export async function getUserDataHandler(req: Request, res: Response) {
  const userId = req.userInfo?.userId;
  if (!userId) {
    throw new AuthorizationError();
  }
  const me = await usersQueryRepository.findById(userId);
  res
    .status(HttpStatus.Ok)
    .send({ userId: me?.id, login: me?.login, email: me?.email });
}
