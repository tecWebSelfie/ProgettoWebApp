import { schemaComposer } from "graphql-compose";
import { finalComposer, getMongooseResolvers } from "./graphqlComposeUtilities";
import {
  ICalAlarmType,
  ICalAlarmRelatesTo,
  ICalAlarmJSONData,
} from "ical-generator";
import { alarmModelName, userModelName } from "./mongo_contract";
import { Schema } from "mongoose";
import { iCalAlarmRepeatData, iCalAttachment } from "./mongo_contract";
import { userTC } from "./user";

const alarmSchema = new Schema<ICalAlarmJSONData>({
  type: { type: String, enum: Object.values(ICalAlarmType), required: true },
  trigger: { type: String, required: true },
  relatesTo: { type: String, enum: Object.values(ICalAlarmRelatesTo) },
  repeat: iCalAlarmRepeatData,
  interval: Number,
  attach: iCalAttachment,
  description: String,
  summary: String,
  attendees: [
    {
      type: Schema.Types.ObjectId,
      ref: userModelName,
      required: true,
    },
  ],
  x: [{ key: String, value: String }],
});

const customizationOptions = {};

export const alarmTC = finalComposer<ICalAlarmJSONData>(
  alarmModelName,
  alarmSchema,
);

schemaComposer.Query.addFields({
  ...getMongooseResolvers(alarmTC, "alarm_").queries,
});

schemaComposer.Mutation.addFields({
  ...getMongooseResolvers(alarmTC, "alarm_").mutations,
});

export const graphqlschema = schemaComposer.buildSchema();
