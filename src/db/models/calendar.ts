import {
  ICalCalendarMethod,
  ICalEventJSONData,
  ICalCalendarJSONData,
} from "ical-generator";
import { calendarModelName } from "./mongo_contract";
import mongoose, { Schema } from "mongoose";
import {
  eventModelName,
  pomodoroModelName,
  iCalAlarmRepeatData,
  iCalAttachment,
} from "./mongo_contract";
import { composeWithMongoose } from "graphql-compose-mongoose";
import { schemaComposer } from "graphql-compose";
import { getMongooseResolvers } from "./graphqlComposeUtilities";

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

const calendarModel = mongoose.model<ICalCalendarJSONData>(
  calendarModelName,
  calendarSchema,
);

const customizationOptions = {};

const calendarTC = composeWithMongoose(calendarModel, customizationOptions);

schemaComposer.Query.addFields({
  ...getMongooseResolvers(calendarTC, "calendar_").queries,
});

schemaComposer.Mutation.addFields({
  ...getMongooseResolvers(calendarTC, "calendar_").mutations,
});
