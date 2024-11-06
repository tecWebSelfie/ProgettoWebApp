import { schemaComposer } from "graphql-compose";
import { finalComposer, getMongooseResolvers } from "./graphqlComposeUtilities";
import {
  journalModelName,
  journalStatus,
  pomodoroModelName,
  userModelName,
} from "./mongo_contract";
import { Schema, Types } from "mongoose";

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
  categories: [string];
  attendees: [Types.ObjectId];
  related: [Types.ObjectId];
  attachments: [string];
  request_status: string;
}

const journalSchema = new Schema<IJournal>({
  start_date: { type: String, required: true },
  last_modified: { type: String, required: true },
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
  related: [{ type: Schema.Types.ObjectId, ref: pomodoroModelName }],
  attachments: [{ type: String }],
  request_status: { type: String },
});

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
