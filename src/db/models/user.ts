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
  timezoneModelName,
  todoModelName,
  userModelName,
} from "./mongo_contract";
import { schemaComposer } from "graphql-compose";
import { composeWithMongoose } from "graphql-compose-mongoose";
import { getMongooseResolvers } from "./graphqlComposeUtilities";

interface IUser {
  nickname: String;
  email: String;
  name: String;
  surname: String;
  birthday: Date;
  residence: String;
  photo: Buffer;
  roles: "user" | "tech";
  owned_resources: [Types.ObjectId];
  freebusy: Types.ObjectId;
  user_timezone: Types.ObjectId;
  journals: [Types.ObjectId];
  todos: [Types.ObjectId];
  alarms: [Types.ObjectId];
  pomodoros: [Types.ObjectId];
  notification: Types.ObjectId;
  pomodoro_tolerance_time: Number;
  groups: [Types.ObjectId];
  private_calendar: Types.ObjectId;
  public_calendar: Types.ObjectId;
  projects: [Types.ObjectId];
}

const userSchema = new Schema<IUser>({
  nickname: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
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
  owned_resources: [{ type: Schema.Types.ObjectId, ref: resourceModelName }],
  freebusy: { type: Schema.Types.ObjectId, ref: freebusyModelName },
  user_timezone: { type: Schema.Types.ObjectId, ref: timezoneModelName },
  journals: [{ type: Schema.Types.ObjectId, ref: journalModelName }],
  todos: [{ type: Schema.Types.ObjectId, ref: todoModelName }],
  alarms: [{ type: Schema.Types.ObjectId, ref: alarmModelName }],
  pomodoros: [{ type: Schema.Types.ObjectId, ref: pomodoroModelName }],
  notification: [{ type: Schema.Types.ObjectId, ref: notificationModelName }],
  pomodoro_tolerance_time: Number,
  groups: [{ type: Schema.Types.ObjectId, ref: groupModelName }],
  private_calendar: { type: Schema.Types.ObjectId, ref: calendarModelName },
  public_calendar: { type: Schema.Types.ObjectId, ref: calendarModelName },
  projects: [{ type: Schema.Types.ObjectId, ref: projectModelName }],
});

const userModel = mongoose.model<IUser>(userModelName, userSchema);

const customizationOptions = {};

const userTC = composeWithMongoose(userModel, customizationOptions);

schemaComposer.Query.addFields({
  ...getMongooseResolvers(userTC, "user_").queries,
});

schemaComposer.Mutation.addFields({
  ...getMongooseResolvers(userTC, "user_").mutations,
});

export const graphqlschema = schemaComposer.buildSchema();
