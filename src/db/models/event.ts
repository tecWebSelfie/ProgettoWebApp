import { eventModelName, pomodoroModelName } from "./mongo_contract";
import mongoose, { Schema } from "mongoose";
import {
  ICalEventTransparency,
  ICalEventJSONRepeatingData,
  ICalLocation,
  ICalDescription,
  ICalOrganizer,
  ICalAlarm,
  ICalAttendee,
  ICalCategory,
  ICalEventStatus,
  ICalEventBusyStatus,
} from "ical-generator";

interface ICalEventJSONData {
  sequence: number;
  start: string;
  end: string | null;
  recurrenceId: string | null;
  timezone: string | null;
  stamp: string;
  allDay: boolean;
  floating: boolean;
  repeating: ICalEventJSONRepeatingData | string | null;
  summary: string;
  location: ICalLocation | null;
  description: ICalDescription | null;
  organizer: ICalOrganizer | null;
  attendees: ICalAttendee[];
  alarms: ICalAlarm[];
  categories: ICalCategory[];
  status: ICalEventStatus | null;
  busystatus: ICalEventBusyStatus | null;
  priority?: number | null;
  url: string | null;
  attachments: string[];
  transparency: ICalEventTransparency | null;
  created: string | null;
  lastModified: string | null;
  x: { key: string; value: string }[];
  pomodoro: null;
}

const eventSchema = new Schema<ICalEventJSONData>({
  pomodoro: { type: Schema.Types.ObjectId, ref: pomodoroModelName },
});

const eventModel = mongoose.model<ICalEventJSONData>(
  eventModelName,
  eventSchema,
);
