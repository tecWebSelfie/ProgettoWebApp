import {
  ICalCalendarMethod,
  ICalCalendarJSONData,
  ICalEventJSONData,
} from "ical-generator";
import { calendarModelName, todoModelName } from "./mongo_contract";
import { Schema, Types } from "mongoose";
import { eventModelName } from "./mongo_contract";
import { schemaComposer } from "graphql-compose";
import { finalComposer, getMongooseResolvers } from "./graphqlComposeUtilities";

interface ICalendar extends ICalCalendarJSONData {
  todos: Types.ObjectId[];
}

const calendarSchema = new Schema<ICalendar>({
  prodId: { type: String, required: true },
  method: { type: String, enum: Object.values(ICalCalendarMethod) },
  name: String,
  description: String,
  timezone: String,
  source: String,
  url: String,
  scale: String,
  ttl: Number,
  events: [
    {
      type: Schema.Types.ObjectId,
      ref: eventModelName,
    },
  ],
  todos: [
    {
      type: Schema.Types.ObjectId,
      ref: todoModelName,
    },
  ],
  x: [{ key: String, value: String }],
});

export const calendarTC = finalComposer<ICalendar>(
  calendarModelName,
  calendarSchema,
);

schemaComposer.Query.addFields({
  ...getMongooseResolvers(calendarTC, "calendar_").queries,
});

schemaComposer.Mutation.addFields({
  ...getMongooseResolvers(calendarTC, "calendar_").mutations,
});

export const graphqlschema = schemaComposer.buildSchema();
