import mongoose, { Schema } from "mongoose";
import { notificationModelName } from "./mongo_contract";

const notificationSchema = new Schema(
  {
    title: String,
    body: String,
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: { createdAt: "created_at" } },
);

const notificationModel = mongoose.model(
  notificationModelName,
  notificationSchema,
);
