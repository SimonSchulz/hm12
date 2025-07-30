import { Schema, model, Document } from "mongoose";

export interface DeviceSessionDocument extends Document {
  deviceId: string;
  userId: string;
  ip: string;
  title: string;
  lastActiveDate: string;
  expiresAt: string;
}

const DeviceSessionSchema = new Schema<DeviceSessionDocument>({
  deviceId: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  ip: { type: String, required: true },
  title: { type: String, required: true },
  lastActiveDate: { type: String, required: true },
  expiresAt: { type: String, required: true },
});

export const DeviceSessionModel = model<DeviceSessionDocument>(
  "DeviceSession",
  DeviceSessionSchema,
);
