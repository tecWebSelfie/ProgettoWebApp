import { schemaComposer } from "graphql-compose";
import { ICalEventJSONRepeatingData, ICalGeo } from "ical-generator";
import { Schema, Types } from "mongoose";
import { finalComposer, getMongooseResolvers } from "./graphqlComposeUtilities";
import {
  todoModelName,
  iCalEventJSONRepeatingData,
  todoStatus,
  userModelName,
  resourceModelName,
} from "./mongo_contract";

interface ITodo {
  completed: boolean;
  status: todoStatus;
  created: string;
  description: string;
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
  resources: [Types.ObjectId];
  attendees: [Types.ObjectId];
  categories: [string];
  attachments: [string];
}

const todoSchema = new Schema<ITodo>({
  completed: { type: Boolean, default: false },
  status: { type: String, enum: todoStatus },
  created: { type: String, default: Date.now().toString },
  description: { type: String },
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
  resources: [{ type: Types.ObjectId, ref: resourceModelName }],
  attendees: [{ type: Types.ObjectId, ref: userModelName }],
  categories: [{ type: String }],
  attachments: [{ type: String }],
});

export const todoTC = finalComposer<ITodo>(todoModelName, todoSchema);

schemaComposer.Query.addFields({
  ...getMongooseResolvers(todoTC, "todo_").queries,
});

schemaComposer.Mutation.addFields({
  ...getMongooseResolvers(todoTC, "todo_").mutations,
});

export const graphqlschema = schemaComposer.buildSchema();
