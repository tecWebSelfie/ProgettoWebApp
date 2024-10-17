import mongoose, { Schema } from "mongoose";
import {
  calendarModelName,
  groupModelName,
  resourceModelName,
  userModelName,
} from "./mongo_contract";

const groupSchema = new Schema({
  calendar: { type: Schema.Types.ObjectId, ref: calendarModelName },
  name: String,
  photo: Buffer,
  members: [{ type: Schema.Types.ObjectId, ref: userModelName }],
  resources: [{ type: Schema.Types.ObjectId, ref: resourceModelName }],
  is_project: {
    type: Boolean,
    default: false,
  },
});

const groupModel = mongoose.model(groupModelName, groupSchema);
