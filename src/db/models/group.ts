import mongoose, { Schema, Types } from "mongoose";
import {
  calendarModelName,
  groupModelName,
  resourceModelName,
  userModelName,
} from "./mongo_contract";
import { schemaComposer } from "graphql-compose";
import { composeWithMongoose } from "graphql-compose-mongoose";
import { finalComposer, getMongooseResolvers } from "./graphqlComposeUtilities";
import { calendarTC } from "./calendar";
import { userTC } from "./user";
import { resourceTC } from "./resource";

interface IGroup {
  calendar: Types.ObjectId;
  name: string;
  photo: Buffer;
  members: [Types.ObjectId];
  resources: [Types.ObjectId];
  is_project: boolean;
}

const groupSchema = new Schema<IGroup>({
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

const customizationOptions = {};

export const groupTC = finalComposer<IGroup>(groupModelName, groupSchema);

/*
[
  {
    relTC: calendarTC,
    idField: "calendar",
    relField: "Calendar",
    resolver: "findById",
    prepareArgs: {
      _id: (source) => source.calendar,
    },
  },
  {
    relTC: userTC,
    idField: "members",
    relField: "Users",
    resolver: "findByIds",
    prepareArgs: {
      _ids: (source) => source.members,
    },
  },
  {
    relTC: resourceTC,
    idField: "resources",
    relField: "Resources",
    resolver: "findByIds",
    prepareArgs: {
      _ids: (source) => source.resources,
    },
  },
]
  */

schemaComposer.Query.addFields({
  ...getMongooseResolvers(groupTC, "group_").queries,
});

schemaComposer.Mutation.addFields({
  ...getMongooseResolvers(groupTC, "group_").mutations,
});

export const graphqlschema = schemaComposer.buildSchema();
