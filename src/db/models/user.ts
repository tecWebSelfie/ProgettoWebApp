import mongoose, { Schema, Types } from "mongoose";
import {
  alarmModelName,
  calendarModelName,
  freebusyModelName,
  groupModelName,
  journalModelName,
  notificationModelName,
  pomodoroModelName,
  projectModelName,
  resourceModelName,
  todoModelName,
  userModelName,
} from "./mongo_contract";
import { schemaComposer } from "graphql-compose";
import { finalComposer, getMongooseResolvers } from "./graphqlComposeUtilities";
import { ICalAttendeeJSONData } from "ical-generator";

interface IUser extends ICalAttendeeJSONData {
  username: string;
  email: string;
  password: string;
  name: string;
  surname: string;
  birthday: Date;
  residence: string;
  photo: Buffer;
  roles: "user" | "tech";
  owned_resources: Types.ObjectId[];
  freebusy: Types.ObjectId;
  timezone: string;
  journals: Types.ObjectId[];
  todos: Types.ObjectId[];
  pomodoros: Types.ObjectId[];
  notifications: Types.ObjectId[];
  pomodoro_tolerance_time: number;
  groups: Types.ObjectId[];
  calendar: Types.ObjectId;
  projects: Types.ObjectId[];
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    maxLength: 50,
  },
  surname: {
    type: String,
    maxLength: 50,
  },
  birthday: Date,
  residence: String,
  photo: Buffer,
  roles: {
    type: String,
    enum: ["user", "tech"],
    default: "user",
  },
  timezone: String,
  pomodoro_tolerance_time: Number,
  owned_resources: [{ type: Schema.Types.ObjectId, ref: resourceModelName }],
  freebusy: { type: Schema.Types.ObjectId, ref: freebusyModelName },
  journals: [{ type: Schema.Types.ObjectId, ref: journalModelName }],
  todos: [{ type: Schema.Types.ObjectId, ref: todoModelName }],
  pomodoros: [{ type: Schema.Types.ObjectId, ref: pomodoroModelName }],
  notifications: [{ type: Schema.Types.ObjectId, ref: notificationModelName }],
  groups: [{ type: Schema.Types.ObjectId, ref: groupModelName }],
  calendar: { type: Schema.Types.ObjectId, ref: calendarModelName },
  projects: [{ type: Schema.Types.ObjectId, ref: projectModelName }],
});

//used in auth.ts to check if the user is authenticated
export const userModel =
  (mongoose.models[userModelName] as mongoose.Model<IUser>) ||
  mongoose.model<IUser>(userModelName, userSchema);

export const userTC = finalComposer<IUser>(userModelName, userSchema);

schemaComposer.Query.addFields({
  ...getMongooseResolvers(userTC, "user_").queries,
});

schemaComposer.Mutation.addFields({
  ...getMongooseResolvers(userTC, "user_").mutations,
});

export const graphqlschema = schemaComposer.buildSchema();
