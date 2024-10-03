import { composeWithMongoose } from "graphql-compose-mongoose";
import { schemaComposer } from "graphql-compose";
import { getMongooseResolvers } from "./graphqlComposeUtilities";
import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: String,
  id: Number,
});

const eventModel = mongoose.model("Event", eventSchema);

const customizationOptions = {};

const eventTC = composeWithMongoose(eventModel, customizationOptions);

schemaComposer.Query.addFields({
  ...getMongooseResolvers(eventTC, "event_").queries,
});

schemaComposer.Mutation.addFields({
  ...getMongooseResolvers(eventTC, "event_").mutations,
});

export const graphqlschema = schemaComposer.buildSchema({});
