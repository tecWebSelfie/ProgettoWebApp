import mongoose, { Schema } from "mongoose";
import { notificationModelName } from "./mongo_contract";
import { schemaComposer } from "graphql-compose";
import { composeWithMongoose } from "graphql-compose-mongoose";
import { finalComposer, getMongooseResolvers } from "./graphqlComposeUtilities";

interface INotification {
  title: string;
  body: string;
  date: Date;
}

const notificationSchema = new Schema<INotification>(
  {
    title: String,
    body: String,
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: { createdAt: "created_at" } },
);

const customizationOptions = {};

export const notificationTC = finalComposer<INotification>(
  notificationModelName,
  notificationSchema,
);

schemaComposer.Query.addFields({
  ...getMongooseResolvers(notificationTC, "notification_").queries,
});

schemaComposer.Mutation.addFields({
  ...getMongooseResolvers(notificationTC, "notification_").mutations,
});
export const graphqlschema = schemaComposer.buildSchema();
