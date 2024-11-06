import mongoose, { Schema, Types } from "mongoose";
import {
  calendarModelName,
  freebusyModelName,
  iCalLocationSchema,
  journalModelName,
  resourceModelName,
  userModelName,
} from "./mongo_contract";
import { schemaComposer } from "graphql-compose";
import { finalComposer, getMongooseResolvers } from "./graphqlComposeUtilities";

interface IResource {
  nickname: string;
  description: string;
  location: string;
  geo_location: string;
  photo: Buffer;
  calendar: Types.ObjectId;
  owners: [Types.ObjectId];
  freebusy: Types.ObjectId;
  journals: [Types.ObjectId];
  timezone: string;
}

const resourceSchema = new Schema<IResource>({
  nickname: String,
  description: String,
  location: String,
  geo_location: String,
  photo: Buffer,
  calendar: { type: Schema.Types.ObjectId, ref: calendarModelName },
  owners: [{ type: Schema.Types.ObjectId, ref: userModelName }],
  freebusy: { type: Schema.Types.ObjectId, ref: freebusyModelName },
  journals: [{ type: Schema.Types.ObjectId, ref: journalModelName }],
  timezone: String,
});

export const resourceTC = finalComposer<IResource>(
  resourceModelName,
  resourceSchema,
);

schemaComposer.Query.addFields({
  ...getMongooseResolvers(resourceTC, "resource_").queries,
});

schemaComposer.Mutation.addFields({
  ...getMongooseResolvers(resourceTC, "resource_").mutations,
});

export const graphqlschema = schemaComposer.buildSchema();
