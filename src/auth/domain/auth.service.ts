import { inject, injectable } from "inversify";
import { BcryptService } from "./bcrypt.service";
import { ValidationError } from "../../core/utils/app-response-errors";
import { JwtService } from "./jwt.service";
import { User } from "../../user/domain/user.entity";
import { NodemailerService } from "./nodemailer.service";
import { emailExamples } from "../utils/email-messages";
import TYPES from "../../core/container/types";
import { UsersRepository } from "../../user/repositories/user.repository";

@injectable()
export class AuthService {
  constructor(
    @inject(TYPES.UsersRepository)
    private readonly usersRepository: UsersRepository,
    @inject(TYPES.BcryptService)
    private readonly bcryptService: BcryptService,
    @inject(TYPES.JwtService)
    private readonly jwtService: JwtService,
    @inject(TYPES.NodemailerService)
    private readonly nodemailerService: NodemailerService,
  ) {}

  async loginUser(loginOrEmail: string, password: string) {
    const user = await this.checkUserCredentials(loginOrEmail, password);
    if (!user) return null;
    const accessToken = await this.jwtService.createAccessToken(
      user._id.toString(),
    );
    const refreshToken = await this.jwtService.createRefreshToken(
      user._id.toString(),
    );
    return { accessToken, refreshToken };
  }

  async checkUserCredentials(loginOrEmail: string, password: string) {
    const user = await this.usersRepository.findByLoginOrEmail(loginOrEmail);
    if (!user) return null;
    const isPassValid = await this.bcryptService.checkPassword(
      password,
      user.passwordHash,
    );
    if (!isPassValid) return null;
    return user;
  }

  async registerUser(
    login: string,
    pass: string,
    email: string,
  ): Promise<string> {
    const isUser = await this.usersRepository.checkExistByLoginOrEmail(
      login,
      email,
    );
    if (isUser)
      throw new ValidationError("User with this login or email exists");
    const passwordHash = await this.bcryptService.generateHash(pass);
    const newUser = new User(login, email, passwordHash);
    const id = await this.usersRepository.create(newUser);

    this.nodemailerService
      .sendEmail(
        newUser.email,
        newUser.emailConfirmation.confirmationCode,
        emailExamples.registrationEmail,
      )
      .catch((er) => console.error("error in send email:", er));

    return id;
  }
  async changePassword(email: string, newPassword: string): Promise<Boolean> {
    const passwordHash = await this.bcryptService.generateHash(newPassword);
    return await this.usersRepository.setNewPassword(email, passwordHash);
  }
}
