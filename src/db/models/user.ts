import { Schema, Types } from "mongoose";
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
  nickname: string;
  email: string;
  name: string;
  surname: string;
  birthday: Date;
  residence: string;
  photo: Buffer;
  roles: "user" | "tech";
  owned_resources: [Types.ObjectId];
  freebusy: Types.ObjectId;
  timezone: string;
  journals: [Types.ObjectId];
  todos: [Types.ObjectId];
  alarms: [Types.ObjectId];
  pomodoros: [Types.ObjectId];
  notifications: [Types.ObjectId];
  pomodoro_tolerance_time: number;
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
  timezone: String,
  journals: [{ type: Schema.Types.ObjectId, ref: journalModelName }],
  todos: [{ type: Schema.Types.ObjectId, ref: todoModelName }],
  alarms: [{ type: Schema.Types.ObjectId, ref: alarmModelName }],
  pomodoros: [{ type: Schema.Types.ObjectId, ref: pomodoroModelName }],
  notifications: [{ type: Schema.Types.ObjectId, ref: notificationModelName }],
  pomodoro_tolerance_time: Number,
  groups: [{ type: Schema.Types.ObjectId, ref: groupModelName }],
  private_calendar: { type: Schema.Types.ObjectId, ref: calendarModelName },
  public_calendar: { type: Schema.Types.ObjectId, ref: calendarModelName },
  projects: [{ type: Schema.Types.ObjectId, ref: projectModelName }],
});

export const userTC = finalComposer<IUser>(userModelName, userSchema);

schemaComposer.Query.addFields({
  ...getMongooseResolvers(userTC, "user_").queries,
});

schemaComposer.Mutation.addFields({
  ...getMongooseResolvers(userTC, "user_").mutations,
});

export const graphqlschema = schemaComposer.buildSchema();
