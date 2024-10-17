import mongoose, { Schema } from "mongoose";
import { notificationModelName } from "./mongo_contract";
import { schemaComposer } from "graphql-compose";
import { composeWithMongoose } from "graphql-compose-mongoose";
import { getMongooseResolvers } from "./graphqlComposeUtilities";

const notificationSchema = new Schema(
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

const notificationModel = mongoose.model(
  notificationModelName,
  notificationSchema,
);

const customizationOptions = {};

const notificationTC = composeWithMongoose(
  notificationModel,
  customizationOptions,
);

schemaComposer.Query.addFields({
  ...getMongooseResolvers(notificationTC, "notification_").queries,
});

schemaComposer.Mutation.addFields({
  ...getMongooseResolvers(notificationTC, "notification_").mutations,
});
export const graphqlschema = schemaComposer.buildSchema();
