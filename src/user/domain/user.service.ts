import { injectable, inject } from "inversify";
import { InputUserDto } from "../dto/user.input-dto";
import { User } from "./user.entity";
import { UsersRepository } from "../repositories/user.repository";
import { BcryptService } from "../../auth/domain/bcrypt.service";
import TYPES from "../../core/container/types";

@injectable()
export class UsersService {
  constructor(
    @inject(TYPES.UsersRepository)
    private readonly usersRepository: UsersRepository,

    @inject(TYPES.BcryptService)
    private readonly bcryptService: BcryptService,
  ) {}

  async create(dto: InputUserDto): Promise<string> {
    const { login, password, email } = dto;
    const passwordHash = await this.bcryptService.generateHash(password);
    const newUser = new User(login, email, passwordHash);
    return this.usersRepository.create(newUser);
  }

  async delete(id: string): Promise<boolean> {
    const user = await this.usersRepository.findById(id);
    if (!user) return false;
    return this.usersRepository.delete(id);
  }
  async setPasswordRecovery(
    userId: string,
    recoveryCode: string,
    expirationDate: string,
  ) {
    await this.usersRepository.setPasswordRecovery(
      userId,
      recoveryCode,
      expirationDate,
    );
  }
}
