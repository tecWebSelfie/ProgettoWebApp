import mongoose, { Schema } from "mongoose";
import {
  calendarModelName,
  groupModelName,
  resourceModelName,
  userModelName,
} from "./mongo_contract";
import { schemaComposer } from "graphql-compose";
import { composeWithMongoose } from "graphql-compose-mongoose";
import { getMongooseResolvers } from "./graphqlComposeUtilities";

const groupSchema = new Schema({
  calendar: { type: Schema.Types.ObjectId, ref: calendarModelName },
  name: String,
  photo: Buffer,
  members: [{ type: Schema.Types.ObjectId, ref: userModelName }],
  resources: [{ type: Schema.Types.ObjectId, ref: resourceModelName }],
  is_project: {
    type: Boolean,
    default: false,
  },
});

const groupModel = mongoose.model(groupModelName, groupSchema);

const customizationOptions = {};

const groupTC = composeWithMongoose(groupModel, customizationOptions);

schemaComposer.Query.addFields({
  ...getMongooseResolvers(groupTC, "group_").queries,
});

schemaComposer.Mutation.addFields({
  ...getMongooseResolvers(groupTC, "group_").mutations,
});
export const graphqlschema = schemaComposer.buildSchema();
