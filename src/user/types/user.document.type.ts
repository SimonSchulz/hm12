import { Document, Types } from "mongoose";
import { User } from "../domain/user.entity";
export interface UserDocument extends User, Document {
  _id: Types.ObjectId;
}
