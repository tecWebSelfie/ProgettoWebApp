import { ICalCalendarMethod, ICalEventJSONData } from "ical-generator";
import { calendarModelName } from "./mongo_contract";
import mongoose, { Schema } from "mongoose";

interface ICalCalendarJSONData {
  prodId: string;
  method: ICalCalendarMethod | null;
  name: string | null;
  description: string | null;
  timezone: string | null;
  source: string | null;
  url: string | null;
  scale: string | null;
  ttl: number | null;
  events: ICalEventJSONData[];
  x: { key: string; value: string }[];
}

const calendarSchema = new Schema<ICalCalendarJSONData>({});

const calendarModel = mongoose.model<ICalCalendarJSONData>(
  calendarModelName,
  calendarSchema,
);
