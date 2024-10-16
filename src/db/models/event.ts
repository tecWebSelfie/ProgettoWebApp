import {
  eventModelName,
  pomodoroModelName,
  iCalLocationSchema,
  iCalEventJSONRepeatingDataSchema,
  iCalDescription,
  iCalOrganizer,
  iCalAttendee,
  iCalAlarm,
  iCalCategory,
} from "./mongo_contract";
import mongoose, { Schema, Types } from "mongoose";
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
  ICalEventJSONData,
} from "ical-generator";

interface IEvent extends ICalEventJSONData {
  pomodoro: Types.ObjectId;
}

const eventSchema = new Schema<IEvent>({
  sequence: { type: Number, required: true },
  start: { type: String, required: true },
  end: String,
  recurrenceId: String,
  timezone: String,
  stamp: { type: String, required: true },
  allDay: { type: Boolean, required: true },
  floating: { type: Boolean, required: true },
  summary: { type: String, required: true },
  priority: Number,
  url: String,
  attachments: { type: [String], required: true },
  created: String,
  lastModified: String,
  pomodoro: { type: Schema.Types.ObjectId, ref: pomodoroModelName },
  location: iCalLocationSchema,
  repeating: iCalEventJSONRepeatingDataSchema,
  description: iCalDescription,
  organizer: iCalOrganizer,
  attendees: { type: [iCalAttendee], required: true },
  alarms: { type: [iCalAlarm], required: true },
  categories: { type: [iCalCategory], required: true },
  status: { type: String, enum: Object.values(ICalEventStatus) },
  busystatus: { type: String, enum: Object.values(ICalEventBusyStatus) },
  transparency: { type: String, enum: Object.values(ICalEventTransparency) },
  x: { type: [Array], required: true }, //x: { key: string; value: string }[];
});

const eventModel = mongoose.model<IEvent>(eventModelName, eventSchema);
