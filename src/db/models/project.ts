import mongoose, { Schema } from "mongoose";
import {
  groupModelName,
  projectModelName,
  todoModelName,
  userModelName,
} from "./mongo_contract";

const projectSchema = new Schema({
  pm_id: { type: Schema.Types.ObjectId, ref: userModelName },
  members: [{ type: Schema.Types.ObjectId, ref: userModelName }],
  todos: [{ type: Schema.Types.ObjectId, ref: todoModelName }],
  group_id: { type: Schema.Types.ObjectId, ref: groupModelName }, //required???
});

const projectModel = mongoose.model(projectModelName, projectSchema);
