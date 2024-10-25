import { schemaComposer } from "graphql-compose";
import { finalComposer, getMongooseResolvers } from "./graphqlComposeUtilities";
import {
  eventModelName,
  pomodoroModelName,
  iCalLocationSchema,
  iCalEventJSONRepeatingDataSchema,
  iCalDescription,
  iCalOrganizer,
  iCalCategory,
  userModelName,
  alarmModelName,
} from "./mongo_contract";
import { model, Schema, SchemaType, Types } from "mongoose";
import {
  ICalEventTransparency,
  ICalEventStatus,
  ICalEventBusyStatus,
  ICalEventJSONData,
} from "ical-generator";
import { pomodoroTC } from "./pomodoro";
import { userTC } from "./user";
import { alarmTC } from "./alarm";

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
  location: iCalLocationSchema,
  repeating: iCalEventJSONRepeatingDataSchema,
  description: iCalDescription,
  organizer: iCalOrganizer,
  attendees: [
    {
      type: Schema.Types.ObjectId,
      ref: userModelName,
      required: true,
    },
  ],
  alarms: [{ type: Schema.Types.ObjectId, ref: alarmModelName }],
  categories: { type: [iCalCategory], required: true },
  status: { type: String, enum: Object.values(ICalEventStatus) },
  busystatus: { type: String, enum: Object.values(ICalEventBusyStatus) },
  transparency: { type: String, enum: Object.values(ICalEventTransparency) },
  pomodoro: { type: Schema.Types.ObjectId, ref: pomodoroModelName },
  x: [{ key: String, value: String }],
});

export const eventTC = finalComposer<IEvent>(eventModelName, eventSchema);

/*
[
  {
    relTC: userTC,
    idField: "attendees",
    relField: "Attendees",
    resolver: "findByIds",
    prepareArgs: {
      _ids: (source) => source.attendees,
    },
  },
  {
    relTC: alarmTC,
    idField: "alarms",
    relField: "Alarms",
    resolver: "findByIds",
    prepareArgs: {
      _ids: (source) => source.alarms,
    },
  },
  {
    relTC: pomodoroTC,
    idField: "pomodoro",
    relField: "Pomodoro",
    resolver: "findById",
    prepareArgs: {
      _id: (source) => source.pomodoro,
    },
  },
]
  */

schemaComposer.Query.addFields({
  ...getMongooseResolvers(eventTC, "event_").queries,
});

schemaComposer.Mutation.addFields({
  ...getMongooseResolvers(eventTC, "event_").mutations,
});

export const graphqlschema = schemaComposer.buildSchema();
