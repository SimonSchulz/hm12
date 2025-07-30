import mongoose from "mongoose";
import { SETTINGS } from "../core/setting/setting";

export async function runDB(uri: string): Promise<void> {
  try {
    await mongoose.connect(uri, {
      dbName: SETTINGS.DB_NAME,
    });
    console.log("✅ Connected to the database via Mongoose");
  } catch (e) {
    console.error("❌ Failed to connect to the database", e);
    await mongoose.disconnect();
    throw e;
  }
}

export async function stopDb(): Promise<void> {
  await mongoose.disconnect();
}
