import { ObjectTypeComposer, schemaComposer } from "graphql-compose";
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

interface IEvent extends ICalEventJSONData {
  pomodoroId: Types.ObjectId;
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
  pomodoroId: { type: Schema.Types.ObjectId, ref: pomodoroModelName },
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
  x: [{ key: String, value: String }],
});

const eventTC = finalComposer<IEvent>(eventModelName, eventSchema);

eventTC.addRelation("pomodoro", {
  resolver: () => pomodoroTC.getResolver("findById"),
  prepareArgs: {
    _id: (event) => event.pomodoroId,
  },
  projection: {
    pomodoroId: true,
  },
});
schemaComposer.Query.addFields({
  ...getMongooseResolvers(eventTC, "event_").queries,
});

schemaComposer.Mutation.addFields({
  ...getMongooseResolvers(eventTC, "event_").mutations,
});
export const graphqlschema = schemaComposer.buildSchema();
