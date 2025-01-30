import { schemaComposer } from "graphql-compose";
import { finalComposer, getMongooseResolvers } from "./graphqlComposeUtilities";
import mongoose, { Model, Schema, Types } from "mongoose";
import { messageModelName } from "./mongo_contract";
import { pubSub } from "../pubSub";
import { QueryMessage_FindManyArgs } from "@/gql/resolvers-types";

//class
//rrule
//comment / contact / exdate / rdate

export interface IMessage {
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
    attendees: {
      type: [{ type: Types.ObjectId, required: true }],
      required: true,
    },
    attachments: [String],
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "last_modified" },
  },
);

export const messageModel =
  (mongoose.models[messageModelName] as Model<IMessage>) ||
  mongoose.model<IMessage>(messageModelName, messageSchema);

export const messageTC = finalComposer<IMessage>(
  messageModelName,
  messageSchema,
);

messageTC.addResolver({
  name: "messages",
  description: "get all messages sorted by creation date in descending order",
  type: [messageTC],
  args: {
    ...messageTC.getResolver<QueryMessage_FindManyArgs>("findMany").getArgs(),
  },
  resolve: async ({ args }) =>
    await messageModel.find({ ...args, sort: { created_at: "desc" } }).exec(),
});

schemaComposer.Query.addFields({
  ...getMongooseResolvers(messageTC, "message_").queries,
});

// resolvers that add new messages should also publish the new message to the pubsub
schemaComposer.Mutation.addFields({
  ...getMongooseResolvers(messageTC, "message_").mutations,
  message_createOne: messageTC
    .getResolver("createOne")
    .wrapResolve((next) => async (rp) => {
      const res = await next(rp);
      pubSub.publish("messages", res.record);
      return res;
    }),
  message_createMany: messageTC
    .getResolver("createMany")
    .wrapResolve((next) => async (rp) => {
      const res = await next(rp);
      res.record.forEach((record) => pubSub.publish("messages", record));
      return res;
    }),
});

schemaComposer.Subscription.addFields({
  newMessages: {
    type: messageTC,
    resolve: (payload) => payload,
    subscribe: () => pubSub.subscribe("messages"),
  },
});

export const graphqlschema = schemaComposer.buildSchema();
