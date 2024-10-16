import mongoose, { Schema } from "mongoose";
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

const userSchema = new Schema({
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

const userModel = mongoose.model(userModelName, userSchema);

//const userModel = mongoose.models.User || mongoose.model("User", userSchema);

/*
const customizationOptions = {};

const eventTC = composeWithMongoose(eventModel, customizationOptions);

schemaComposer.Query.addFields({
  ...getMongooseResolvers(eventTC, "event_").queries,
});

schemaComposer.Mutation.addFields({
  ...getMongooseResolvers(eventTC, "event_").mutations,
});

export const graphqlschema = schemaComposer.buildSchema({});
*/
