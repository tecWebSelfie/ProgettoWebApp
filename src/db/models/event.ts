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
  resourceModelName,
} from "./mongo_contract";
import { model, Schema, SchemaType, Types } from "mongoose";
import {
  ICalEventTransparency,
  ICalEventStatus,
  ICalEventBusyStatus,
  ICalEventJSONData,
  ICalEventClass,
} from "ical-generator";

interface IEvent extends ICalEventJSONData {
  pomodoros: Types.ObjectId[];
  resources: Types.ObjectId[];
  class: ICalEventClass;
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
  description: iCalDescription,
  priority: Number,
  url: String,
  attachments: { type: [String], required: true },
  created: String,
  lastModified: String,
  location: iCalLocationSchema,
  repeating: iCalEventJSONRepeatingDataSchema,
  organizer: iCalOrganizer,
  attendees: [
    {
      type: Schema.Types.ObjectId,
      ref: userModelName,
      required: true,
    },
  ],
  resources: [{ type: Schema.Types.ObjectId, ref: resourceModelName }],
  alarms: [{ type: Schema.Types.ObjectId, ref: alarmModelName }],
  categories: { type: [iCalCategory], required: true },
  status: { type: String, enum: Object.values(ICalEventStatus) },
  busystatus: { type: String, enum: Object.values(ICalEventBusyStatus) },
  transparency: { type: String, enum: Object.values(ICalEventTransparency) },
  pomodoros: [{ type: Schema.Types.ObjectId, ref: pomodoroModelName }],
  class: { type: String, enum: Object.values(ICalEventClass) },
  x: [{ key: String, value: String }],
});

export const eventTC = finalComposer<IEvent>(eventModelName, eventSchema);

schemaComposer.Query.addFields({
  ...getMongooseResolvers(eventTC, "event_").queries,
});

schemaComposer.Mutation.addFields({
  ...getMongooseResolvers(eventTC, "event_").mutations,
});

export const graphqlschema = schemaComposer.buildSchema();
