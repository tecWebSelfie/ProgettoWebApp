import mongoose, { Schema, Types } from "mongoose";
import {
  groupModelName,
  projectModelName,
  todoModelName,
  userModelName,
} from "./mongo_contract";
import {
  ObjectTypeComposer,
  ObjectTypeComposerRelationArgsMapper,
  Resolver,
  SchemaComposer,
  schemaComposer,
  ThunkWithSchemaComposer,
} from "graphql-compose";
import { composeWithMongoose } from "graphql-compose-mongoose";
import { finalComposer, getMongooseResolvers } from "./graphqlComposeUtilities";
import { calendarTC } from "./calendar";
import { resourceTC } from "./resource";
import { userTC } from "./user";
import { groupTC } from "./group";

interface IProject {
  pm_id: Types.ObjectId;
  members: [Types.ObjectId];
  todos: [Types.ObjectId];
  group_id: Types.ObjectId;
}

const projectSchema = new Schema({
  pm_id: { type: Schema.Types.ObjectId, ref: userModelName },
  members: [{ type: Schema.Types.ObjectId, ref: userModelName }],
  todos: [{ type: Schema.Types.ObjectId, ref: todoModelName }],
  group_id: { type: Schema.Types.ObjectId, ref: groupModelName }, //required???
});

const customizationOptions = {};

export const projectTC = finalComposer<IProject>(
  projectModelName,
  projectSchema,
);
/*
[
    {
      relTC: userTC,
      idField: "pm_id",
      relField: "Pm",
      resolver: "findById",
      prepareArgs: {
        _id: (source) => source.pm_id,
      },
    },
    {
      relTC: userTC,
      idField: "members",
      relField: "Members",
      resolver: "findByIds",
      prepareArgs: {
        _ids: (source) => source.members,
      },
    },
    {
      relTC: groupTC,
      idField: "group_id",
      relField: "Group",
      resolver: "findByIds",
      prepareArgs: {
        _ids: (source) => source.group_id,
      },
    },
  ]
  */

schemaComposer.Query.addFields({
  ...getMongooseResolvers(projectTC, "project_").queries,
});

schemaComposer.Mutation.addFields({
  ...getMongooseResolvers(projectTC, "project_").mutations,
});

export const graphqlschema = schemaComposer.buildSchema();
