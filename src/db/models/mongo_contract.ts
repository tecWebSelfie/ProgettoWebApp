import { Schema } from "mongoose";
import {
  ICalEventJSONRepeatingData,
  ICalLocation,
  ICalDescription,
  ICalOrganizer,
  ICalGeo,
  ICalEventRepeatingFreq,
  ICalWeekday,
  ICalAttachment,
  ICalAlarmRepeatData,
  ICalCategoryJSONData,
  ICalAttendeeJSONData,
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
export const credentialModelName = "Credential";

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

export const iCalAlarmRepeatData = new Schema<ICalAlarmRepeatData>({
  times: Number,
  interval: Number,
});
export const iCalAttachment = new Schema<ICalAttachment>({
  uri: String,
  mime: String,
});

export const iCalCategory = new Schema<ICalCategoryJSONData>({
  name: String,
});
