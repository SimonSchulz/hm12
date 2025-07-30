import { Schema, model } from "mongoose";
import { EmailConfirmationSchema } from "./email-confirmation.schema";
import { PasswordRecoverySchema } from "./recovery-password.schema";

const UserSchema = new Schema({
  login: { type: String, required: true },
  email: { type: String, required: true },
  passwordHash: { type: String, required: true },
  createdAt: { type: String, required: true },
  emailConfirmation: { type: EmailConfirmationSchema, required: true },
  passwordRecovery: { type: PasswordRecoverySchema, default: () => ({}) },
});
export const UserModel = model("User", UserSchema);
