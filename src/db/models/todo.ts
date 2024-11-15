import { schemaComposer } from "graphql-compose";
import {
  ICalDescription,
  ICalEventClass,
  ICalEventJSONRepeatingData,
  ICalGeo,
} from "ical-generator";
import { Schema, Types } from "mongoose";
import { finalComposer, getMongooseResolvers } from "./graphqlComposeUtilities";
import {
  todoModelName,
  iCalEventJSONRepeatingData,
  todoStatus,
  userModelName,
  resourceModelName,
  alarmModelName,
  iCalDescription,
  journalModelName,
} from "./mongo_contract";

interface ITodo {
  completed: boolean;
  status: todoStatus;
  created: string;
  description: ICalDescription;
  summary: string;
  start_date: string;
  geo_location: string;
  location: string;
  last_modified: string;
  organizer: Types.ObjectId;
  priority: number;
  recurrency_id: string;
  sequence: string;
  url: string;
  repeating: ICalEventJSONRepeatingData;
  due: string;
  resources: Types.ObjectId[];
  attendees: Types.ObjectId[];
  alarms: Types.ObjectId[];
  in_journals: Types.ObjectId[];
  out_journals: Types.ObjectId[];
  categories: string[];
  attachments: string[];
  class: ICalEventClass;
}

const todoSchema = new Schema<ITodo>({
  completed: { type: Boolean, default: false },
  status: { type: String, enum: todoStatus },
  created: { type: String, default: Date.now().toString },
  description: iCalDescription,
  summary: { type: String, required: true },
  start_date: { type: String, default: Date.now().toString },
  geo_location: { type: String },
  location: { type: String },
  last_modified: { type: String },
  organizer: { type: Schema.Types.ObjectId, ref: userModelName },
  priority: { type: Number },
  recurrency_id: { type: String },
  sequence: { type: String },
  url: { type: String },
  repeating: { type: iCalEventJSONRepeatingData },
  due: { type: String },
  resources: [{ type: Schema.Types.ObjectId, ref: resourceModelName }],
  attendees: [{ type: Schema.Types.ObjectId, ref: userModelName }],
  alarms: [{ type: Schema.Types.ObjectId, ref: alarmModelName }],
  in_journals: [{ type: Schema.Types.ObjectId, ref: journalModelName }],
  out_journals: [{ type: Schema.Types.ObjectId, ref: journalModelName }],
  categories: [{ type: String }],
  attachments: [{ type: String }],
  class: { type: String, enum: Object.values(ICalEventClass) },
});

export const todoTC = finalComposer<ITodo>(todoModelName, todoSchema);

schemaComposer.Query.addFields({
  ...getMongooseResolvers(todoTC, "todo_").queries,
});

schemaComposer.Mutation.addFields({
  ...getMongooseResolvers(todoTC, "todo_").mutations,
});

export const graphqlschema = schemaComposer.buildSchema();
