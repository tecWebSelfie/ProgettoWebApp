import { ICalCalendarMethod, ICalCalendarJSONData } from "ical-generator";
import { calendarModelName } from "./mongo_contract";
import { Schema } from "mongoose";
import { eventModelName } from "./mongo_contract";
import { schemaComposer } from "graphql-compose";
import { finalComposer, getMongooseResolvers } from "./graphqlComposeUtilities";
import { eventTC } from "./event";

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

const customizationOptions = {};

export const calendarTC = finalComposer<ICalCalendarJSONData>(
  calendarModelName,
  calendarSchema,
);
/*
[
    {
      relTC: eventTC,
      idField: "events",
      relField: "Events",
      resolver: "findByIds",
      prepareArgs: {
        _ids: (source) => source.events,
      },
    },
  ]
  */

schemaComposer.Query.addFields({
  ...getMongooseResolvers(calendarTC, "calendar_").queries,
});

schemaComposer.Mutation.addFields({
  ...getMongooseResolvers(calendarTC, "calendar_").mutations,
});

export const graphqlschema = schemaComposer.buildSchema();
