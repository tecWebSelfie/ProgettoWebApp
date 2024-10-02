import { composeWithMongoose } from "graphql-compose-mongoose";
import { schemaComposer } from "graphql-compose";
import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: String,
  id: Number,
});

const eventModel = mongoose.model("Event", eventSchema);

const customizationOptions = {};

const eventTC = composeWithMongoose(eventModel, customizationOptions);

schemaComposer.Query.addFields({
  eventById: eventTC.getResolver("findById"),
  eventOne: eventTC.getResolver("findOne"),
  events: eventTC.getResolver("findMany"),
});

schemaComposer.Mutation.addFields({
  eventCreateOne: eventTC.getResolver("createOne"),
});

export const graphqlschema = schemaComposer.buildSchema({});
