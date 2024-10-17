import { Schema } from "mongoose";
import {
  ICalEventJSONRepeatingData,
  ICalLocation,
  ICalDescription,
  ICalOrganizer,
  ICalAlarm,
  ICalAttendee,
  ICalAttendeeJSONData,
  ICalAttendeeRole,
  ICalAttendeeStatus,
  ICalCategory,
  ICalGeo,
  ICalEventJSONData,
  ICalEventRepeatingFreq,
  ICalDateTimeValue,
  ICalWeekday,
  ICalAlarmJSONData,
  ICalAlarmType,
  ICalAlarmRelatesTo,
  ICalAttachment,
  ICalAlarmRepeatData,
  ICalCategoryJSONData,
  ICalEventStatus,
} from "ical-generator";

export const alarmModelName = "Alarm";
export const calendarModelName = "Calendar";
export const eventModelName = "Event";
export const freebusyModelName = "Freebusy";
export const groupModelName = "Group";
export const journalModelName = "Journal";
export const notificationModelName = "Notification";
export const pomodoroModelName = "Pomodoro";
export const projectModelName = "Project";
export const resourceModelName = "Resource";
export const timezoneModelName = "Timezone";
export const todoModelName = "Todo";
export const userModelName = "User";

const iCalGeo = new Schema<ICalGeo>({
  lat: { type: Number, require: true },
  lon: { type: Number, require: true },
});
export const iCalLocationSchema = new Schema<ICalLocation>({
  title: String,
  address: String,
  radius: String,
  geo: { type: iCalGeo, require: true },
});

export const iCalEventJSONRepeatingDataSchema =
  new Schema<ICalEventJSONRepeatingData>({
    freq: { type: String, enum: Object.values(ICalEventRepeatingFreq) },
    count: Number,
    interval: Number,
    until: Date,
    byDay: [{ type: String, enum: Object.values(ICalWeekday) }],
    byMonth: [Number],
    byMonthDay: [Number],
    bySetPos: [Number],
    exclude: [Date],
    startOfWeek: { type: String, enum: Object.values(ICalWeekday) },
  });

export const iCalDescription = new Schema<ICalDescription>({
  plain: String,
  html: String,
});

export const iCalOrganizer = new Schema<ICalOrganizer>({
  email: String,
  name: String,
  mailto: String,
  sentBy: String,
});

export const iCalAttendee = new Schema<ICalAttendeeJSONData>({
  email: { type: String, required: true },
  mailto: String,
  sentBy: String,
  rsvp: Boolean,
  name: String,
  delegatedFrom: String,
  delegatedTo: String,
  role: { type: String, enum: Object.values(ICalAttendeeRole) },
  status: { type: String, enum: Object.values(ICalAttendeeStatus) },
});

export const iCalAlarmRepeatData = new Schema<ICalAlarmRepeatData>({
  times: Number,
  interval: Number,
});
export const iCalAttachment = new Schema<ICalAttachment>({
  uri: String,
  mime: String,
});
export const iCalAlarm = new Schema<ICalAlarmJSONData>({
  type: { type: String, enum: Object.values(ICalAlarmType) },
  trigger: String,
  relatesTo: { type: String, enum: Object.values(ICalAlarmRelatesTo) },
  repeat: iCalAlarmRepeatData,
  interval: Number,
  attach: iCalAttachment,
  description: String,
  summary: String,
  attendees: [iCalAttendee],
  x: [Array], //x: { key: string; value: string }[];
});

export const iCalCategory = new Schema<ICalCategoryJSONData>({
  name: String,
});
