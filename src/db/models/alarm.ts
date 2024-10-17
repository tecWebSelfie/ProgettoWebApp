import {
  ICalAlarmType,
  ICalAlarmRelatesTo,
  ICalAlarmRepeatData,
  ICalAttendee,
  ICalAttachment,
} from "ical-generator";
import { alarmModelName } from "./mongo_contract";
import mongoose, { Schema } from "mongoose";

interface ICalAlarmJSONData {
  type: ICalAlarmType;
  trigger: string | number;
  relatesTo: ICalAlarmRelatesTo | null;
  repeat: ICalAlarmRepeatData | null;
  interval: number | null;
  attach: ICalAttachment | null;
  description: string | null;
  summary: string | null;
  attendees: ICalAttendee[];
  x: { key: string; value: string }[];
}

const alarmSchema = new Schema<ICalAlarmJSONData>({});

const alarmModel = mongoose.model<ICalAlarmJSONData>(
  alarmModelName,
  alarmSchema,
);
