import { schemaComposer } from "graphql-compose";
import { finalComposer, getMongooseResolvers } from "./graphqlComposeUtilities";
import {
  ICalAlarmType,
  ICalAlarmRelatesTo,
  ICalAlarmJSONData,
} from "ical-generator";
import {
  alarmModelName,
  eventModelName,
  todoModelName,
  userModelName,
} from "./mongo_contract";
import { Schema, Types } from "mongoose";
import { iCalAlarmRepeatData, iCalAttachment } from "./mongo_contract";

interface IAlarm extends ICalAlarmJSONData {
  related_event: Types.ObjectId;
  related_todo: Types.ObjectId;
}

const alarmSchema = new Schema<IAlarm>({
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
  related_event: { type: Schema.Types.ObjectId, ref: eventModelName },
  related_todo: { type: Schema.Types.ObjectId, ref: todoModelName },
  x: [{ key: String, value: String }],
});

//const customizationOptions = {};
export const alarmTC = finalComposer<IAlarm>(alarmModelName, alarmSchema);

//export const alarmQueries = getMongooseResolvers(alarmTC, "alarm_").queries;
//export const alarmMutations = getMongooseResolvers(alarmTC, "alarm_").mutations;

schemaComposer.Query.addFields({
  ...getMongooseResolvers(alarmTC, "alarm_").queries,
});

schemaComposer.Mutation.addFields({
  ...getMongooseResolvers(alarmTC, "alarm_").mutations,
});

export const graphqlschema = schemaComposer.buildSchema();
