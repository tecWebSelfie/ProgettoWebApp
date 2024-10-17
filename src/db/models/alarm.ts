import { schemaComposer } from "graphql-compose";
import { composeWithMongoose } from "graphql-compose-mongoose";
import { getMongooseResolvers } from "./graphqlComposeUtilities";
import {
  ICalAlarmType,
  ICalAlarmRelatesTo,
  ICalAlarmRepeatData,
  ICalAttendee,
  ICalAttachment,
  ICalAlarmJSONData,
} from "ical-generator";
import { alarmModelName, iCalAttendee } from "./mongo_contract";
import mongoose, { Schema } from "mongoose";
import {
  eventModelName,
  pomodoroModelName,
  iCalAlarmRepeatData,
  iCalAttachment,
} from "./mongo_contract";

const alarmSchema = new Schema<ICalAlarmJSONData>({
  type: { type: String, enum: Object.values(ICalAlarmType), required: true },
  trigger: { type: String, required: true },
  relatesTo: { type: String, enum: Object.values(ICalAlarmRelatesTo) },
  repeat: iCalAlarmRepeatData,
  interval: Number,
  attach: iCalAttachment,
  description: String,
  summary: String,
  attendees: { type: [iCalAttendee], required: true },
  x: [{ key: String, value: String }],
});

const alarmModel = mongoose.model<ICalAlarmJSONData>(
  alarmModelName,
  alarmSchema,
);

const customizationOptions = {};

const alarmTC = composeWithMongoose(alarmModel, customizationOptions);

schemaComposer.Query.addFields({
  ...getMongooseResolvers(alarmTC, "alarm_").queries,
});

schemaComposer.Mutation.addFields({
  ...getMongooseResolvers(alarmTC, "alarm_").mutations,
});
