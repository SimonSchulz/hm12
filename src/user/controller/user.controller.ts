import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { HttpStatus } from "../../core/types/http-statuses";
import { UsersService } from "../domain/user.service";
import { UsersRepository } from "../repositories/user.repository";
import { InputUserDto } from "../dto/user.input-dto";
import { UserViewModel } from "../dto/user.view-model";
import { mapToUserViewModel } from "../routers/mappers/map-to-user-view-model";
import {
  NotFoundError,
  ValidationError,
} from "../../core/utils/app-response-errors";
import TYPES from "../../core/container/types";
import { UsersQueryRepository } from "../repositories/user.query.repository";
import { setSortAndPagination } from "../../core/helpers/set-sort-and-pagination";
import { UserQueryInput } from "../types/user-query.input";

@injectable()
export class UsersController {
  constructor(
    @inject(TYPES.UsersService) private usersService: UsersService,
    @inject(TYPES.UsersRepository) private usersRepository: UsersRepository,
    @inject(TYPES.UsersQueryRepository)
    private usersQueryRepository: UsersQueryRepository,
  ) {}

  getUsers = async (req: Request, res: Response) => {
    const query = setSortAndPagination(req.query);
    const result = await this.usersQueryRepository.findAllUsers(
      query as UserQueryInput,
    );
    if (!result) throw new NotFoundError();
    res.status(HttpStatus.Ok).send(result);
  };

  createUser = async (
    req: Request<{}, {}, InputUserDto>,
    res: Response<UserViewModel>,
  ) => {
    const { login, password, email } = req.body;
    const userId = await this.usersService.create({ login, password, email });
    const newUser = await this.usersRepository.findById(userId);
    if (!newUser) throw new ValidationError("Invalid user data");
    await this.usersRepository.confirmEmail(userId);
    res.status(HttpStatus.Created).send(mapToUserViewModel(newUser));
  };

  deleteUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    const user = await this.usersService.delete(id);
    if (!user) throw new NotFoundError("User does not exist");
    res.sendStatus(HttpStatus.NoContent);
  };
}
