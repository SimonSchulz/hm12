import { randomUUID } from "crypto";
import { addMinutes } from "date-fns";

export class User {
  login: string;
  email: string;
  passwordHash: string;
  createdAt: string;
  emailConfirmation: {
    confirmationCode: string;
    expirationDate: string;
    isConfirmed: boolean;
  };
  passwordRecovery?: {
    recoveryCode: string | null;
    expirationDate: string | null;
  };

  constructor(login: string, email: string, passwordHash: string) {
    this.login = login;
    this.email = email;
    this.passwordHash = passwordHash;
    this.createdAt = new Date().toISOString();
    this.emailConfirmation = {
      expirationDate: addMinutes(new Date(), 10).toISOString(),
      confirmationCode: randomUUID(),
      isConfirmed: false,
    };
  }
}
