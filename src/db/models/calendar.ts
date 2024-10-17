import {
  ICalCalendarMethod,
  ICalEventJSONData,
  ICalCalendarJSONData,
} from "ical-generator";
import { calendarModelName } from "./mongo_contract";
import mongoose, { Schema } from "mongoose";

const calendarSchema = new Schema<ICalCalendarJSONData>({
  events: [{ type: Schema.Types.ObjectId, ref: "Event" }],
});

const calendarModel = mongoose.model<ICalCalendarJSONData>(
  calendarModelName,
  calendarSchema,
);
