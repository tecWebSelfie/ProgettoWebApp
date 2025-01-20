import { schemaComposer } from "graphql-compose";
import { finalComposer, getMongooseResolvers } from "./graphqlComposeUtilities";
import { Schema, Types } from "mongoose";
import { messageModelName } from "./mongo_contract";

//class
//rrule
//comment / contact / exdate / rdate

interface IMessage {
  created_at: string;
  last_modified: string;
  organizer: Types.ObjectId;
  summary: string;
  attendees: Types.ObjectId[];
  attachments: string[];
}

const messageSchema = new Schema<IMessage>(
  {
    organizer: { type: Schema.Types.ObjectId, required: true },
    summary: { type: String, required: true },
    attendees: { type: [Types.ObjectId], required: true },
    attachments: [String],
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "last_modified" },
  },
);

export const messageTC = finalComposer<IMessage>(
  messageModelName,
  messageSchema,
);

schemaComposer.Query.addFields({
  ...getMongooseResolvers(messageTC, "message_").queries,
});

schemaComposer.Mutation.addFields({
  ...getMongooseResolvers(messageTC, "message_").mutations,
});

export const graphqlschema = schemaComposer.buildSchema();
