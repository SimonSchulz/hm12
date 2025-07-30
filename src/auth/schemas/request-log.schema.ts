import { Schema, model } from "mongoose";

const RequestLogSchema = new Schema({
  ip: { type: String, required: true },
  url: { type: String, required: true },
  date: { type: Date, required: true },
});

export const RequestLogModel = model("RequestLog", RequestLogSchema);
