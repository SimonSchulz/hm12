import { Schema } from "mongoose";

export const PasswordRecoverySchema = new Schema({
  recoveryCode: { type: String, default: null },
  expirationDate: { type: String, default: null },
});
