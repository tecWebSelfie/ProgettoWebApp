import { ICalCalendarMethod, ICalCalendarJSONData } from "ical-generator";
import { calendarModelName } from "./mongo_contract";
import { Schema } from "mongoose";
import { eventModelName } from "./mongo_contract";
import { schemaComposer } from "graphql-compose";
import { finalComposer, getMongooseResolvers } from "./graphqlComposeUtilities";

const calendarSchema = new Schema<ICalCalendarJSONData>({
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
  x: [{ key: String, value: String }],
});

export const calendarTC = finalComposer<ICalCalendarJSONData>(
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
