import mongoose, { Schema } from "mongoose";
import {
  calendarModelName,
  freebusyModelName,
  journalModelName,
  resourceModelName,
  timezoneModelName,
  userModelName,
} from "./mongo_contract";
import { schemaComposer } from "graphql-compose";
import { composeWithMongoose } from "graphql-compose-mongoose";
import { getMongooseResolvers } from "./graphqlComposeUtilities";

const resourceSchema = new Schema({
  nickname: String,
  description: String,
  location: String,
  geo_location: String,
  photo: Buffer,
  calendar: { type: Schema.Types.ObjectId, ref: calendarModelName },
  owners: [{ type: Schema.Types.ObjectId, ref: userModelName }],
  freebusy: { type: Schema.Types.ObjectId, ref: freebusyModelName },
  journals: [{ type: Schema.Types.ObjectId, ref: journalModelName }],
  timezone: { type: Schema.Types.ObjectId, ref: timezoneModelName },
});

const resourceModel = mongoose.model(resourceModelName, resourceSchema);

const customizationOptions = {};

const resourceTC = composeWithMongoose(resourceModel, customizationOptions);

schemaComposer.Query.addFields({
  ...getMongooseResolvers(resourceTC, "resource_").queries,
});

schemaComposer.Mutation.addFields({
  ...getMongooseResolvers(resourceTC, "resource_").mutations,
});
export const graphqlschema = schemaComposer.buildSchema();
