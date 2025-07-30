import { injectable } from "inversify";
import { UserModel } from "../schemas/user.schema";
import { User } from "../domain/user.entity";
import { ObjectId } from "mongodb";
import { UserDocument } from "../types/user.document.type";

@injectable()
export class UsersRepository {
  async create(user: User): Promise<string> {
    const createdUser = await UserModel.create(user);
    return createdUser._id.toString();
  }

  async findById(id: string): Promise<UserDocument | null> {
    return UserModel.findById(id);
  }

  async findByLoginOrEmail(loginOrEmail: string): Promise<UserDocument | null> {
    return UserModel.findOne({
      $or: [{ login: loginOrEmail }, { email: loginOrEmail }],
    });
  }

  async delete(id: string): Promise<boolean> {
    const result = await UserModel.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount === 1;
  }

  async updateConfirmation(
    userId: string,
    code: string,
    expiration: string,
  ): Promise<void> {
    await UserModel.updateOne(
      { _id: userId },
      {
        $set: {
          "emailConfirmation.confirmationCode": code,
          "emailConfirmation.expirationDate": expiration,
        },
      },
    );
  }
  async findByConfirmationCode(code: string): Promise<UserDocument | null> {
    return UserModel.findOne({ "emailConfirmation.confirmationCode": code });
  }
  async checkExistByLoginOrEmail(
    login: string,
    email: string,
  ): Promise<boolean> {
    const user = await UserModel.findOne({
      $or: [{ email }, { login }],
    }).lean();
    return !!user;
  }
  async confirmEmail(userId: string): Promise<boolean> {
    const result = await UserModel.updateOne(
      { _id: userId },
      { $set: { "emailConfirmation.isConfirmed": true } },
    );
    return result.modifiedCount === 1;
  }
  async setNewPassword(email: string, newPassword: string): Promise<Boolean> {
    const result = await UserModel.updateOne(
      { email: email },
      { $set: { passwordHash: newPassword } },
    );
    return result.modifiedCount === 1;
  }
  async setPasswordRecovery(
    userId: string,
    recoveryCode: string,
    expirationDate: string,
  ): Promise<void> {
    await UserModel.updateOne(
      { _id: userId },
      {
        $set: {
          "passwordRecovery.recoveryCode": recoveryCode,
          "passwordRecovery.expirationDate": expirationDate,
        },
      },
    );
  }
}
