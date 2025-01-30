import { schemaComposer } from "graphql-compose";
import { finalComposer, getMongooseResolvers } from "./graphqlComposeUtilities";
import {
  journalModelName,
  journalStatus,
  pomodoroModelName,
  todoModelName,
  userModelName,
} from "./mongo_contract";
import { Schema, Types } from "mongoose";
import { ICalEventClass } from "ical-generator";

//class
//rrule
//comment / contact / exdate / rdate

interface IJournal {
  start_date: string;
  last_modified: string;
  organizer: Types.ObjectId;
  recurrence_id: string;
  sequence: string;
  summary: string;
  description: string;
  url: string;
  status: journalStatus;
  categories: string[];
  attendees: Types.ObjectId[];

  //in_todos and out_todos are the todos that are related to the journal,
  //in_todos are todos that take this journal as input, out_todos are todos that produced this journal as output
  in_todos: Types.ObjectId[];
  out_todos: Types.ObjectId[];
  attachments: string[];
  request_status: string;
  class: ICalEventClass;
}

const journalSchema = new Schema<IJournal>(
  {
    //start_date: { type: String, required: true },
    //last_modified: { type: String, required: true },
    organizer: {
      type: Schema.Types.ObjectId,
      ref: userModelName,
      required: true,
    },
    recurrence_id: { type: String },
    sequence: { type: String },
    summary: { type: String },
    description: { type: String },
    url: { type: String },
    status: { type: String, enum: journalStatus },
    categories: [{ type: String }],
    attendees: [{ type: Schema.Types.ObjectId, ref: userModelName }],
    in_todos: [{ type: Schema.Types.ObjectId, ref: todoModelName }],
    out_todos: [{ type: Schema.Types.ObjectId, ref: todoModelName }],
    attachments: [{ type: String }],
    request_status: { type: String },
    class: { type: String, enum: Object.values(ICalEventClass) },
  },
  {
    timestamps: {
      createdAt: "start_date",
      updatedAt: "last_modified",
    },
  },
);

export const journalTC = finalComposer<IJournal>(
  journalModelName,
  journalSchema,
);

schemaComposer.Query.addFields({
  ...getMongooseResolvers(journalTC, "journal_").queries,
});

schemaComposer.Mutation.addFields({
  ...getMongooseResolvers(journalTC, "journal_").mutations,
});

export const graphqlschema = schemaComposer.buildSchema();
