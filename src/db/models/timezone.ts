import { schemaComposer } from "@/lib/schemaComposer";
import { Schema } from "mongoose";
import { finalComposer, getMongooseResolvers } from "./graphqlComposeUtilities";

interface ITimezone {}

const timezoneSchema = new Schema<ITimezone>({});

/*
export const timezoneTC = finalComposer<ITimezone>(
  timezoneModelName,
  timezoneSchema
);


schemaComposer.Query.addFields({
  ...getMongooseResolvers(timezoneTC, "timezone_").queries,
});

schemaComposer.Mutation.addFields({
  ...getMongooseResolvers(timezoneTC, "timezone_").mutations,
});
*/

export const graphqlschema = schemaComposer.buildSchema();
