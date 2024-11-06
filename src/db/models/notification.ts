import mongoose, { Schema } from "mongoose";
import { notificationModelName } from "./mongo_contract";
import { schemaComposer } from "graphql-compose";
import { finalComposer, getMongooseResolvers } from "./graphqlComposeUtilities";

interface INotification {
  title: string;
  body: string;
  date: string;
}

const notificationSchema = new Schema<INotification>(
  {
    title: String,
    body: String,
    date: {
      type: String,
      default: Date.now().toString,
    },
  },
  { timestamps: { createdAt: "created_at" } },
);

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
